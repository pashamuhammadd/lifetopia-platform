import {
  createHash,
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  AUTH_SESSION_PERSISTENCE_COOKIE,
  getAuthSessionPersistenceCookieOptions,
  type AuthSessionPersistence,
} from "@repo/lib/supabase/cookie-options";
import {
  createClient as createSupabaseServerClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";
import {
  cookies,
} from "next/headers";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_CREDENTIAL_ERROR =
  "Username/email or password is incorrect.";

const MAX_REQUEST_BODY_BYTES =
  16 * 1024;

type UnknownRecord =
  Record<string, unknown>;

type AccountStatus =
  | "active"
  | "suspended"
  | "banned"
  | "deleted";

type AccountStateRow = {
  account_status:
    AccountStatus;
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

function getFakeEmail(
  identifier: string,
): string {
  const digest =
    createHash("sha256")
      .update(identifier)
      .digest("hex")
      .slice(0, 24);

  return (
    `unavailable-${digest}` +
    "@invalid.lifetopia.local"
  );
}

function normalizeIdentifier(
  value: string,
): {
  value: string;
  isEmail: boolean;
} {
  const trimmed =
    value.trim();
  const isEmail =
    trimmed.includes("@");

  return {
    value: trimmed.toLowerCase(),
    isEmail,
  };
}

function genericCredentialResponse(
  requestId: string,
) {
  return NextResponse.json(
    {
      success: false,
      code:
        "invalid_credentials",
      error:
        GENERIC_CREDENTIAL_ERROR,
      requestId,
    },
    {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
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

  const contentLength =
    Number(
      request.headers.get(
        "content-length",
      ) ?? 0,
    );

  if (
    Number.isFinite(contentLength) &&
    contentLength >
      MAX_REQUEST_BODY_BYTES
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "payload_too_large",
        error:
          "Request body is too large.",
        requestId,
      },
      {
        status: 413,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  let unknownBody: unknown;

  try {
    unknownBody =
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

  if (!isRecord(unknownBody)) {
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

  const identifier =
    typeof unknownBody.identifier ===
      "string"
      ? unknownBody.identifier
      : "";

  const password =
    typeof unknownBody.password ===
      "string"
      ? unknownBody.password
      : "";

  if (
    !identifier.trim() ||
    !password
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "credentials_required",
        error:
          "Username/email and password are required.",
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

  if (
    identifier.length > 320 ||
    password.length > 72
  ) {
    return genericCredentialResponse(
      requestId,
    );
  }

  const normalized =
    normalizeIdentifier(identifier);

  const rememberMe =
    unknownBody.rememberMe ===
    true;

  const persistence:
    AuthSessionPersistence =
      rememberMe
        ? "remember"
        : "session";

  const rawNext =
    typeof unknownBody.next ===
      "string"
      ? unknownBody.next
      : "/";

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
    );

  let email =
    normalized.value;

  if (!normalized.isEmail) {
    const admin =
      createAdminClient();

    const {
      data: profile,
      error: profileError,
    } = await admin
      .from("profiles")
      .select("id")
      .eq(
        "username",
        normalized.value,
      )
      .maybeSingle();

    if (profileError) {
      console.error(
        "[auth-login] username lookup failed",
        {
          requestId,
          code:
            profileError.code,
        },
      );

      return NextResponse.json(
        {
          success: false,
          code:
            "authentication_unavailable",
          error:
            "Login is temporarily unavailable.",
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

    if (profile?.id) {
      const {
        data: userData,
        error: userError,
      } =
        await admin.auth.admin
          .getUserById(
            profile.id,
          );

      if (userError) {
        console.error(
          "[auth-login] user resolution failed",
          {
            requestId,
            code:
              userError.name,
          },
        );

        return NextResponse.json(
          {
            success: false,
            code:
              "authentication_unavailable",
            error:
              "Login is temporarily unavailable.",
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

      email =
        userData.user?.email ??
        getFakeEmail(
          normalized.value,
        );
    } else {
      email =
        getFakeEmail(
          normalized.value,
        );
    }
  }

  const supabase =
    await createSupabaseServerClient(
      persistence,
    );

  const {
    error: signInError,
  } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (signInError) {
    return genericCredentialResponse(
      requestId,
    );
  }

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
    console.error(
      "[auth-login] account state resolution failed",
      {
        requestId,
        accountStateCode:
          accountStateResult.error
            ?.code,
        requiredActionsCode:
          requiredActionsResult
            .error?.code,
      },
    );

    await supabase.auth.signOut();

    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "Login succeeded, but the account state could not be verified.",
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
    await supabase.auth.signOut();

    return NextResponse.json(
      {
        success: false,
        code:
          "account_state_unavailable",
        error:
          "Login succeeded, but the account state could not be verified.",
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

  if (
    accountState.account_status ===
      "deleted" ||
    !requiredActions.can_read
  ) {
    await supabase.auth.signOut();

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

  const cookieStore =
    await cookies();

  cookieStore.set(
    AUTH_SESSION_PERSISTENCE_COOKIE,
    persistence,
    getAuthSessionPersistenceCookieOptions(
      persistence,
    ),
  );

  const restricted =
    accountState.account_status ===
      "suspended" ||
    accountState.account_status ===
      "banned";

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
