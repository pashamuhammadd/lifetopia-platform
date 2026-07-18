import {
  randomBytes,
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  NextResponse,
} from "next/server";

import {
  buildWalletLinkMessage,
  hasTrustedWalletOrigin,
  normalizeSolanaAddress,
  WALLET_CHAIN,
  WALLET_CHALLENGE_LIMIT,
  WALLET_CHALLENGE_TTL_MS,
  WALLET_CHALLENGE_WINDOW_MS,
} from "@/lib/auth/wallet-linking";
import {
  getWalletSecuritySession,
} from "@/lib/auth/wallet-session";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function noStoreHeaders() {
  return {
    "Cache-Control":
      "no-store, max-age=0",
  };
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
          "The wallet request origin is not trusted.",
        requestId,
      },
      {
        status: 403,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const session =
    await getWalletSecuritySession();

  if (!session.ok) {
    return NextResponse.json(
      {
        success: false,
        code: session.code,
        error: session.error,
        requestId,
      },
      {
        status: session.status,
        headers:
          noStoreHeaders(),
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "invalid_json",
        error:
          "Invalid request body.",
        requestId,
      },
      {
        status: 400,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const address =
    isRecord(body)
      ? normalizeSolanaAddress(
          body.address,
        )
      : null;

  if (!address) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_address",
        error:
          "A valid Solana wallet address is required.",
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

  await admin.rpc(
    "cleanup_wallet_link_challenges",
  );

  const windowStart =
    new Date(
      Date.now() -
        WALLET_CHALLENGE_WINDOW_MS,
    ).toISOString();

  const {
    count: recentChallengeCount,
    error: rateError,
  } = await admin
    .from("wallet_link_challenges")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("user_id", session.user.id)
    .gte("created_at", windowStart);

  if (rateError) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_service_unavailable",
        error:
          "Wallet security checks are temporarily unavailable.",
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
    (recentChallengeCount ?? 0) >=
    WALLET_CHALLENGE_LIMIT
  ) {
    return NextResponse.json(
      {
        success: false,
        code: "rate_limited",
        error:
          "Too many wallet requests. Please wait before trying again.",
        requestId,
      },
      {
        status: 429,
        headers: {
          ...noStoreHeaders(),
          "Retry-After": "600",
        },
      },
    );
  }

  const [
    accountWalletResult,
    addressOwnerResult,
  ] = await Promise.all([
    admin
      .from("account_wallets")
      .select("id,address")
      .eq("user_id", session.user.id)
      .eq("chain", WALLET_CHAIN)
      .maybeSingle(),
    admin
      .from("account_wallets")
      .select("user_id")
      .eq("chain", WALLET_CHAIN)
      .eq("address", address)
      .maybeSingle(),
  ]);

  if (
    accountWalletResult.error ||
    addressOwnerResult.error
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_service_unavailable",
        error:
          "Wallet ownership could not be checked.",
        requestId,
      },
      {
        status: 503,
        headers:
          noStoreHeaders(),
      },
    );
  }

  if (accountWalletResult.data) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_already_linked",
        error:
          "This account already has a linked Solana wallet.",
        requestId,
      },
      {
        status: 409,
        headers:
          noStoreHeaders(),
      },
    );
  }

  if (addressOwnerResult.data) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_owned_by_another_account",
        error:
          "This wallet is already linked to a Lifetopia account.",
        requestId,
      },
      {
        status: 409,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const challengeId =
    randomUUID();

  const nonce =
    randomBytes(24).toString(
      "base64url",
    );

  const issuedAtDate =
    new Date();

  const expiresAtDate =
    new Date(
      issuedAtDate.getTime() +
        WALLET_CHALLENGE_TTL_MS,
    );

  const origin =
    new URL(
      request.headers.get(
        "origin",
      )!,
    ).origin;

  const message =
    buildWalletLinkMessage({
      address,
      accountId:
        session.user.id,
      nonce,
      requestId,
      origin,
      issuedAt:
        issuedAtDate.toISOString(),
      expiresAt:
        expiresAtDate.toISOString(),
    });

  const { error: insertError } =
    await admin
      .from(
        "wallet_link_challenges",
      )
      .insert({
        id: challengeId,
        user_id: session.user.id,
        chain: WALLET_CHAIN,
        address,
        nonce,
        message,
        expires_at:
          expiresAtDate.toISOString(),
      });

  if (insertError) {
    return NextResponse.json(
      {
        success: false,
        code:
          "challenge_creation_failed",
        error:
          "The wallet signing request could not be created.",
        requestId,
      },
      {
        status: 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
      challenge: {
        id: challengeId,
        message,
        expiresAt:
          expiresAtDate.toISOString(),
      },
      requestId,
    },
    {
      status: 200,
      headers:
        noStoreHeaders(),
    },
  );
}
