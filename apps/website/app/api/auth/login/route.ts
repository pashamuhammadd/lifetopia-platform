import {
  createHash,
  randomUUID,
} from "node:crypto";

import {
  completeLoginAttempt,
  createLoginRiskContext,
  reserveLoginAttempt,
  validateTurnstileToken,
} from "@/lib/auth/login-abuse";
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

function securityUnavailableResponse(
  requestId: string,
) {
  return NextResponse.json(
    {
      success: false,
      code:
        "security_check_unavailable",
      error:
        "Login security is temporarily unavailable.",
      requestId,
    },
    {
      status: 503,
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

  let riskContext;

  try {
    riskContext =
      createLoginRiskContext(
        request,
        normalized.value,
      );
  } catch {
    return securityUnavailableResponse(
      requestId,
    );
  }

  const turnstileToken =
    typeof unknownBody
      .turnstileToken === "string"
      ? unknownBody.turnstileToken
      : "";

  let captchaPassed = false;

  if (turnstileToken) {
    const turnstileValidation =
      await validateTurnstileToken({
        token: turnstileToken,
        clientIp:
          riskContext.clientIp,
        requestId,
      });

    if (
      turnstileValidation.status ===
      "unavailable"
    ) {
      return securityUnavailableResponse(
        requestId,
      );
    }

    captchaPassed =
      turnstileValidation.status ===
      "passed";
  }

  const reservation =
    await reserveLoginAttempt({
      riskContext,
      captchaSupplied:
        Boolean(turnstileToken),
      captchaPassed,
    });

  if (!reservation) {
    return securityUnavailableResponse(
      requestId,
    );
  }

  if (!reservation.allowed) {
    if (
      reservation
        .retryAfterSeconds > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          code:
            "too_many_attempts",
          error:
            "Too many login attempts. Wait before trying again.",
          retryAfterSeconds:
            reservation
              .retryAfterSeconds,
          captchaRequired:
            reservation
              .captchaRequired,
          requestId,
        },
        {
          status: 429,
          headers: {
            "Cache-Control":
              "no-store, max-age=0",
            "Retry-After":
              String(
                reservation
                  .retryAfterSeconds,
              ),
          },
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        code: turnstileToken
          ? "captcha_invalid"
          : "captcha_required",
        error: turnstileToken
          ? "The security check was not accepted. Complete it again."
          : "Complete the security check to continue.",
        captchaRequired: true,
        requestId,
      },
      {
        status: 403,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      },
    );
  }

  if (!reservation.attemptId) {
    return securityUnavailableResponse(
      requestId,
    );
  }

  const attemptId =
    reservation.attemptId;

  async function completeAttempt(
    outcome:
      | "success"
      | "invalid_credentials"
      | "email_verification_required"
      | "mfa_required"
      | "restricted"
      | "account_unavailable"
      | "system_error",
    userId?: string | null,
  ) {
    return completeLoginAttempt({
      attemptId,
      outcome,
      userId,
    });
  }

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
  let resolvedUserId:
    string | null = null;

  const admin =
    createAdminClient();

  if (!normalized.isEmail) {
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
      await completeAttempt(
        "system_error",
      );

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
      resolvedUserId =
        profile.id;

      const {
        data: userData,
        error: userError,
      } =
        await admin.auth.admin
          .getUserById(
            profile.id,
          );

      if (userError) {
        await completeAttempt(
          "system_error",
          profile.id,
        );

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
    data: signInData,
    error: signInError,
  } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (signInError) {
    const errorCode =
      "code" in signInError &&
      typeof signInError.code ===
        "string"
        ? signInError.code
        : "";

    const emailVerificationRequired =
      errorCode ===
        "email_not_confirmed" ||
      /email not confirmed/i.test(
        signInError.message,
      );

    const completed =
      await completeAttempt(
        emailVerificationRequired
          ? "email_verification_required"
          : "invalid_credentials",
        resolvedUserId,
      );

    if (!completed) {
      return securityUnavailableResponse(
        requestId,
      );
    }

    if (
      emailVerificationRequired
    ) {
      return NextResponse.json(
        {
          success: false,
          code:
            "email_verification_required",
          error:
            "Verify your email before continuing.",
          email,
          next,
          requestId,
        },
        {
          status: 403,
          headers: {
            "Cache-Control":
              "no-store, max-age=0",
          },
        },
      );
    }

    return genericCredentialResponse(
      requestId,
    );
  }

  resolvedUserId =
    signInData.user?.id ??
    resolvedUserId;

  const {
    data: assuranceLevel,
    error: assuranceLevelError,
  } =
    await supabase.auth.mfa
      .getAuthenticatorAssuranceLevel();

  if (
    assuranceLevelError ||
    !assuranceLevel
  ) {
    await completeAttempt(
      "system_error",
      resolvedUserId,
    );

    await supabase.auth.signOut({
      scope: "local",
    });

    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_state_unavailable",
        error:
          "Login succeeded, but multi-factor status could not be verified.",
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

  const mfaRequired =
    assuranceLevel.currentLevel !==
      "aal2" &&
    assuranceLevel.nextLevel ===
      "aal2";

  if (mfaRequired) {
    const completed =
      await completeAttempt(
        "mfa_required",
        resolvedUserId,
      );

    if (!completed) {
      await supabase.auth.signOut({
        scope: "local",
      });

      return securityUnavailableResponse(
        requestId,
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

    return NextResponse.json(
      {
        success: true,
        status: "mfa_required",
        mfaRequired: true,
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
    await completeAttempt(
      "system_error",
      resolvedUserId,
    );

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
    await completeAttempt(
      "system_error",
      resolvedUserId,
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

  if (
    accountState.account_status ===
      "deleted" ||
    !requiredActions.can_read
  ) {
    const completed =
      await completeAttempt(
        "account_unavailable",
        resolvedUserId,
      );

    await supabase.auth.signOut();

    if (!completed) {
      return securityUnavailableResponse(
        requestId,
      );
    }

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

  const completed =
    await completeAttempt(
      restricted
        ? "restricted"
        : "success",
      resolvedUserId,
    );

  if (!completed) {
    await supabase.auth.signOut();

    return securityUnavailableResponse(
      requestId,
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
