import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  NextResponse,
} from "next/server";

import {
  hasTrustedWalletOrigin,
  normalizeSolanaAddress,
} from "@/lib/auth/wallet-linking";
import {
  buildWalletLoginMessage,
  WALLET_LOGIN_FINGERPRINT_LIMIT,
  WALLET_LOGIN_LIMIT,
  WALLET_LOGIN_TTL_MS,
  WALLET_LOGIN_WINDOW_MS,
} from "@/lib/auth/wallet-login";

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

function getRequestFingerprint(
  request: Request,
): string {
  const forwardedFor =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim() ?? "unknown";

  const userAgent =
    request.headers.get(
      "user-agent",
    ) ?? "unknown";

  return createHash("sha256")
    .update(
      `${forwardedFor}\n${userAgent}`,
      "utf8",
    )
    .digest("hex");
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

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return NextResponse.json(
      {
        success: false,
        code:
          "already_authenticated",
        error:
          "Sign out before starting a different wallet login.",
        requestId,
      },
      {
        status: 409,
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
          "wallet_login_unavailable",
        error:
          "Wallet login is unavailable for this address.",
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
    "cleanup_wallet_login_challenges",
  );

  const windowStart =
    new Date(
      Date.now() -
        WALLET_LOGIN_WINDOW_MS,
    ).toISOString();

  const requestFingerprint =
    getRequestFingerprint(request);

  const [
    addressRateResult,
    fingerprintRateResult,
  ] = await Promise.all([
    admin
      .from(
        "wallet_login_challenges",
      )
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("address", address)
      .gte("created_at", windowStart),
    admin
      .from(
        "wallet_login_challenges",
      )
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq(
        "request_fingerprint",
        requestFingerprint,
      )
      .gte("created_at", windowStart),
  ]);

  if (
    addressRateResult.error ||
    fingerprintRateResult.error
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_login_service_unavailable",
        error:
          "Wallet login security checks are temporarily unavailable.",
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
    (addressRateResult.count ?? 0) >=
      WALLET_LOGIN_LIMIT ||
    (fingerprintRateResult.count ??
      0) >=
      WALLET_LOGIN_FINGERPRINT_LIMIT
  ) {
    return NextResponse.json(
      {
        success: false,
        code: "rate_limited",
        error:
          "Too many wallet login requests. Please wait before trying again.",
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

  const challengeId =
    randomUUID();

  const nonce =
    randomBytes(24).toString(
      "base64url",
    );

  const issuedAt = new Date();
  const expiresAt = new Date(
    issuedAt.getTime() +
      WALLET_LOGIN_TTL_MS,
  );

  const origin =
    new URL(
      request.headers.get(
        "origin",
      )!,
    ).origin;

  const message =
    buildWalletLoginMessage({
      address,
      nonce,
      requestId,
      origin,
      issuedAt:
        issuedAt.toISOString(),
      expiresAt:
        expiresAt.toISOString(),
    });

  const { error: insertError } =
    await admin
      .from(
        "wallet_login_challenges",
      )
      .insert({
        id: challengeId,
        chain: "solana",
        address,
        nonce,
        message,
        request_fingerprint:
          requestFingerprint,
        expires_at:
          expiresAt.toISOString(),
      });

  if (insertError) {
    return NextResponse.json(
      {
        success: false,
        code:
          "challenge_creation_failed",
        error:
          "The wallet login request could not be created.",
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
          expiresAt.toISOString(),
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
