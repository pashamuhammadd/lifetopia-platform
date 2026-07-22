import {
  randomUUID,
} from "node:crypto";

import bs58 from "bs58";
import nacl from "tweetnacl";
import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";
import {
  NextResponse,
} from "next/server";

import {
  hasTrustedWalletOrigin,
  isUuid,
  normalizeSolanaAddress,
} from "@/lib/auth/wallet-linking";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

type WalletLoginChallengeRow = {
  id: string;
  address: string;
  message: string;
  expires_at: string;
  consumed_at: string | null;
};

type AccountStateRow = {
  account_status:
    | "active"
    | "suspended"
    | "banned"
    | "deleted";
  suspended_until:
    string | null;
  restriction_reason:
    string | null;
};

type RequiredActionRow = {
  next_action:
    string | null;
  can_read:
    boolean;
  can_interact:
    boolean;
  can_receive_rewards:
    boolean;
  can_link_wallet:
    boolean;
};

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function firstRow<T>(
  value: T[] | T | null,
): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

function noStoreHeaders() {
  return {
    "Cache-Control":
      "no-store, max-age=0",
  };
}

function decodeSignature(
  value: unknown,
): Uint8Array | null {
  if (
    typeof value !== "string" ||
    value.length < 80 ||
    value.length > 100
  ) {
    return null;
  }

  try {
    const signature =
      Buffer.from(value, "base64");

    if (signature.length !== 64) {
      return null;
    }

    return new Uint8Array(
      signature,
    );
  } catch {
    return null;
  }
}

export async function POST(
  request: Request,
) {
  const requestId =
    randomUUID();

  if (
    !hasTrustedWalletOrigin(
      request,
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        code: "untrusted_origin",
        error:
          "The wallet login origin is not trusted.",
        requestId,
      },
      {
        status: 403,
        headers:
          noStoreHeaders(),
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const challengeId =
    isRecord(body) &&
    isUuid(body.challengeId)
      ? body.challengeId
      : null;

  const signature =
    isRecord(body)
      ? decodeSignature(
          body.signature,
        )
      : null;

  const next =
    sanitizeAuthRedirectValue(
      isRecord(body) &&
        typeof body.next ===
          "string"
        ? body.next
        : undefined,
      "/dashboard",
    );

  if (!challengeId || !signature) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_proof",
        error:
          "A valid wallet login challenge and signature are required.",
        requestId,
      },
      {
        status: 400,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const admin =
    await createAdminClient();

  const {
    data: challengeData,
    error: challengeError,
  } = await admin
    .from("wallet_login_challenges")
    .select(
      "id,address,message,expires_at,consumed_at",
    )
    .eq("id", challengeId)
    .eq("chain", "solana")
    .maybeSingle();

  const challenge =
    challengeData as
      | WalletLoginChallengeRow
      | null;

  if (
    challengeError ||
    !challenge ||
    challenge.consumed_at ||
    new Date(
      challenge.expires_at,
    ).getTime() <= Date.now()
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "challenge_unavailable",
        error:
          "The wallet login request is invalid, expired, or already used.",
        requestId,
      },
      {
        status: 409,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const address =
    normalizeSolanaAddress(
      challenge.address,
    );

  if (!address) {
    return NextResponse.json(
      {
        success: false,
        code:
          "challenge_corrupted",
        error:
          "The wallet login request could not be verified.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  let publicKey: Uint8Array;

  try {
    publicKey =
      bs58.decode(address);
  } catch {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_address",
        error:
          "The Solana public key is invalid.",
        requestId,
      },
      {
        status: 400,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const signatureIsValid =
    nacl.sign.detached.verify(
      new TextEncoder().encode(
        challenge.message,
      ),
      signature,
      publicKey,
    );

  if (!signatureIsValid) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_signature",
        error:
          "The wallet login signature is invalid.",
        requestId,
      },
      {
        status: 400,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const {
    data: proofData,
    error: proofError,
  } = await admin.rpc(
    "finalize_solana_wallet_login",
    {
      p_challenge_id:
        challenge.id,
      p_address: address,
      p_request_id: requestId,
    },
  );

  const proof =
    Array.isArray(proofData)
      ? proofData[0]
      : null;

  if (proofError || !proof) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_login_unavailable",
        error:
          "Wallet login could not be completed for this account.",
        requestId,
      },
      {
        status: 409,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const userId =
    proof.authenticated_user_id as
      string;

  const walletId =
    proof.authenticated_wallet_id as
      string;

  async function recordResult(
    success: boolean,
    errorCode: string | null,
  ) {
    return admin.rpc(
      "record_solana_wallet_login_result",
      {
        p_user_id: userId,
        p_wallet_id: walletId,
        p_challenge_id:
          challengeId,
        p_request_id: requestId,
        p_success: success,
        p_error_code: errorCode,
      },
    );
  }

  const {
    data: authUserData,
    error: authUserError,
  } = await admin.auth.admin
    .getUserById(userId);

  const email =
    authUserData.user?.email;

  if (authUserError || !email) {
    await recordResult(
      false,
      "auth_user_unavailable",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "session_exchange_failed",
        error:
          "A secure account session could not be created.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const {
    data: linkData,
    error: linkError,
  } = await admin.auth.admin
    .generateLink({
      type: "magiclink",
      email,
    });

  const tokenHash =
    linkData?.properties
      ?.hashed_token;

  if (linkError || !tokenHash) {
    await recordResult(
      false,
      "session_token_failed",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "session_exchange_failed",
        error:
          "A secure account session could not be created.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const supabase =
    await createClient();

  const { error: sessionError } =
    await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "magiclink",
    });

  if (sessionError) {
    await recordResult(
      false,
      "session_verification_failed",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "session_exchange_failed",
        error:
          "A secure account session could not be created.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const assuranceResult =
    await supabase.auth.mfa
      .getAuthenticatorAssuranceLevel();

  if (
    assuranceResult.error ||
    !assuranceResult.data
  ) {
    await supabase.auth.signOut({
      scope: "local",
    });

    await recordResult(
      false,
      "security_session_unavailable",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "security_session_unavailable",
        error:
          "The account security level could not be established.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  // Wallet login uses the same account-state gate as password login
  // (app/api/auth/login/route.ts) so that suspended/banned accounts are
  // handled identically across both sign-in paths: they are allowed to
  // establish a session and are reported as `restricted`, while deleted
  // or unreadable accounts are rejected here.
  const [
    accountStateResult,
    requiredActionsResult,
  ] = await Promise.all([
    supabase.rpc(
      "get_my_account_state",
    ),
    supabase.rpc(
      "get_my_required_account_actions",
    ),
  ]);

  if (
    accountStateResult.error ||
    requiredActionsResult.error
  ) {
    await supabase.auth.signOut({
      scope: "local",
    });

    await recordResult(
      false,
      "account_state_unavailable",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "Wallet login succeeded, but the account state could not be verified.",
        requestId,
      },
      {
        status: 503,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const accountState =
    firstRow<AccountStateRow>(
      accountStateResult.data,
    );

  const requiredActions =
    firstRow<RequiredActionRow>(
      requiredActionsResult.data,
    );

  if (
    !accountState ||
    !requiredActions
  ) {
    await supabase.auth.signOut({
      scope: "local",
    });

    await recordResult(
      false,
      "account_state_unavailable",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "Wallet login succeeded, but the account state could not be verified.",
        requestId,
      },
      {
        status: 503,
        headers:
          noStoreHeaders(),
      },
    );
  }

  if (
    accountState.account_status ===
      "deleted" ||
    !requiredActions.can_read
  ) {
    await supabase.auth.signOut({
      scope: "local",
    });

    await recordResult(
      false,
      "account_unavailable",
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "account_unavailable",
        error:
          "This Lifetopia account is unavailable.",
        requestId,
      },
      {
        status: 403,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const restricted =
    accountState.account_status ===
      "suspended" ||
    accountState.account_status ===
      "banned";

  const resultAudit =
    await recordResult(true, null);

  if (resultAudit.error) {
    await supabase.auth.signOut({
      scope: "local",
    });

    return NextResponse.json(
      {
        success: false,
        code:
          "session_audit_failed",
        error:
          "The wallet session could not be safely finalized.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const requiresMfa =
    assuranceResult.data
      .nextLevel === "aal2" &&
    assuranceResult.data
      .currentLevel !== "aal2";

  const destination = requiresMfa
    ? `/mfa-challenge?next=${encodeURIComponent(
        next,
      )}`
    : next;

  return NextResponse.json(
    {
      success: true,
      status:
        accountState.account_status,
      restricted,
      restrictionReason:
        accountState
          .restriction_reason,
      suspendedUntil:
        accountState
          .suspended_until,
      nextAction:
        requiredActions.next_action,
      permissions: {
        canRead:
          requiredActions.can_read,
        canInteract:
          requiredActions.can_interact,
        canReceiveRewards:
          requiredActions
            .can_receive_rewards,
        canLinkWallet:
          requiredActions
            .can_link_wallet,
      },
      requiresMfa,
      next: destination,
      requestId,
    },
    {
      status: 200,
      headers:
        noStoreHeaders(),
    },
  );
}
