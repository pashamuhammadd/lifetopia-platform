import {
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import nacl from "tweetnacl";
import bs58 from "bs58";
import {
  NextResponse,
} from "next/server";

import {
  hasTrustedWalletOrigin,
  isUuid,
  normalizeSolanaAddress,
} from "@/lib/auth/wallet-linking";
import {
  getWalletSecuritySession,
} from "@/lib/auth/wallet-session";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

type WalletChallengeRow = {
  id: string;
  address: string;
  message: string;
  expires_at: string;
  consumed_at: string | null;
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

  if (!challengeId || !signature) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_proof",
        error:
          "A valid wallet challenge and signature are required.",
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
    .from("wallet_link_challenges")
    .select(
      "id,address,message,expires_at,consumed_at",
    )
    .eq("id", challengeId)
    .eq("user_id", session.user.id)
    .eq("chain", "solana")
    .maybeSingle();

  const challenge =
    challengeData as
      | WalletChallengeRow
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
          "The wallet signing request is invalid, expired, or already used.",
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
          "The wallet signing request could not be verified.",
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

  const verified =
    nacl.sign.detached.verify(
      new TextEncoder().encode(
        challenge.message,
      ),
      signature,
      publicKey,
    );

  if (!verified) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_wallet_signature",
        error:
          "The wallet signature is invalid.",
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
    data: walletData,
    error: finalizeError,
  } = await admin.rpc(
    "finalize_solana_wallet_link",
    {
      p_user_id:
        session.user.id,
      p_challenge_id:
        challengeId,
      p_address: address,
      p_request_id: requestId,
    },
  );

  if (finalizeError) {
    const conflict =
      /already|used|expired/i.test(
        finalizeError.message,
      );

    return NextResponse.json(
      {
        success: false,
        code: conflict
          ? "wallet_link_conflict"
          : "wallet_link_failed",
        error: conflict
          ? "This wallet or challenge can no longer be used."
          : "The verified wallet could not be linked.",
        requestId,
      },
      {
        status: conflict
          ? 409
          : 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  const wallet =
    Array.isArray(walletData)
      ? walletData[0]
      : null;

  if (!wallet) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_link_failed",
        error:
          "The verified wallet could not be loaded.",
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
      wallet: {
        id: wallet.wallet_id,
        address:
          wallet.wallet_address,
        linkedAt:
          wallet.wallet_linked_at,
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
