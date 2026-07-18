import {
  randomUUID,
} from "node:crypto";

import {
  getFactorById,
} from "@/lib/auth/mfa-factors";
import {
  getMfaErrorCode,
  recordMfaEvent,
} from "@/lib/auth/mfa-audit";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

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

function isRequestOriginAllowed(
  request: Request,
): boolean {
  const origin =
    request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return (
      new URL(origin).origin ===
      new URL(request.url).origin
    );
  } catch {
    return false;
  }
}

export async function POST(
  request: Request,
) {
  const requestId =
    randomUUID();

  if (
    !isRequestOriginAllowed(request)
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "origin_not_allowed",
        error:
          "Request origin is not allowed.",
        requestId,
      },
      {
        status: 403,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        code:
          "authentication_required",
        error:
          "Login again to continue.",
        requestId,
      },
      {
        status: 401,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  let body: unknown;

  try {
    body =
      await request.json();
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
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      {
        success: false,
        code: "invalid_body",
        error:
          "Invalid request body.",
        requestId,
      },
      {
        status: 400,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const factorId =
    typeof body.factorId ===
      "string"
      ? body.factorId
      : "";

  const code =
    typeof body.code ===
      "string"
      ? body.code.trim()
      : "";

  const next =
    sanitizeAuthRedirectValue(
      typeof body.next ===
        "string"
        ? body.next
        : "/",
      "/",
    );

  if (
    !factorId ||
    !/^\d{6}$/.test(code)
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          "Enter the six-digit code from your authenticator app.",
        requestId,
      },
      {
        status: 422,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const factorsResult =
    await supabase.auth.mfa
      .listFactors();

  const factor =
    getFactorById(
      factorsResult.data,
      factorId,
    );

  if (
    factorsResult.error ||
    !factor ||
    factor.status !==
      "verified"
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_factor_unavailable",
        error:
          "The selected authenticator is unavailable.",
        requestId,
      },
      {
        status: 409,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const {
    error: verifyError,
  } =
    await supabase.auth.mfa
      .challengeAndVerify({
        factorId,
        code,
      });

  if (verifyError) {
    await recordMfaEvent({
      userId: user.id,
      factorId,
      eventType:
        "challenge_failed",
      success: false,
      errorCode:
        getMfaErrorCode(
          verifyError,
        ),
    });

    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_mfa_code",
        error:
          "The authenticator code is incorrect or expired.",
        requestId,
      },
      {
        status: 401,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const assuranceResult =
    await supabase.auth.mfa
      .getAuthenticatorAssuranceLevel();

  if (
    assuranceResult.error ||
    assuranceResult.data
      ?.currentLevel !== "aal2"
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_verification_incomplete",
        error:
          "Multi-factor verification could not be confirmed.",
        requestId,
      },
      {
        status: 503,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  await recordMfaEvent({
    userId: user.id,
    factorId,
    eventType:
      "challenge_succeeded",
    success: true,
  });

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
    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "MFA succeeded, but the account state could not be verified.",
        requestId,
      },
      {
        status: 503,
        headers: {
          "Cache-Control":
            "no-store",
        },
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
    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "MFA succeeded, but the account state could not be verified.",
        requestId,
      },
      {
        status: 503,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const restricted =
    accountState.account_status ===
      "suspended" ||
    accountState.account_status ===
      "banned";

  if (
    accountState.account_status ===
      "deleted" ||
    !requiredActions.can_read
  ) {
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
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

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
      next,
      requestId,
    },
    {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
        "X-Content-Type-Options":
          "nosniff",
      },
    },
  );
}
