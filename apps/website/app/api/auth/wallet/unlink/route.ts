import {
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  NextResponse,
} from "next/server";

import {
  hasTrustedWalletOrigin,
  isUuid,
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
    body = null;
  }

  const walletId =
    isRecord(body) &&
    isUuid(body.walletId)
      ? body.walletId
      : null;

  const confirmed =
    isRecord(body) &&
    body.confirm === "UNLINK";

  if (!walletId || !confirmed) {
    return NextResponse.json(
      {
        success: false,
        code:
          "unlink_confirmation_required",
        error:
          "Explicit wallet unlink confirmation is required.",
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
    data,
    error,
  } = await admin.rpc(
    "unlink_solana_wallet",
    {
      p_user_id:
        session.user.id,
      p_wallet_id: walletId,
      p_request_id: requestId,
    },
  );

  if (
    error ||
    !Array.isArray(data) ||
    !data[0]
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "wallet_unlink_failed",
        error:
          "The linked wallet could not be removed.",
        requestId,
      },
      {
        status: error
          ? 409
          : 500,
        headers:
          noStoreHeaders(),
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
      status: "wallet_unlinked",
      requestId,
    },
    {
      status: 200,
      headers:
        noStoreHeaders(),
    },
  );
}
