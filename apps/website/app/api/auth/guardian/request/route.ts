import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import {
  sendGuardianConsentEmail,
} from "@/lib/auth/guardian-consent-email";
import { createAdminClient } from "@repo/lib/supabase/admin";
import { createClient } from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
  validateEmail,
} from "@repo/services/auth-validation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

type RequestResult = {
  request_id: string | null;
  allowed: boolean;
  retry_after_seconds: number;
  expires_at: string | null;
  child_display_name: string | null;
  child_username: string | null;
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

function getRequestResult(
  data: unknown,
): RequestResult | null {
  if (!Array.isArray(data)) {
    return null;
  }

  const first = data[0];

  if (
    typeof first !== "object" ||
    first === null
  ) {
    return null;
  }

  return first as RequestResult;
}

export async function POST(
  request: Request,
) {
  const requestId = randomUUID();

  if (!isRequestOriginAllowed(request)) {
    return NextResponse.json(
      {
        success: false,
        code: "origin_not_allowed",
        error:
          "Request origin is not allowed.",
        requestId,
      },
      {
        status: 403,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        code: "authentication_required",
        error:
          "Login is required.",
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

  let unknownBody: unknown;

  try {
    unknownBody =
      await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "invalid_json",
        error: "Invalid request body.",
        requestId,
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (!isRecord(unknownBody)) {
    return NextResponse.json(
      {
        success: false,
        code: "invalid_body",
        error: "Invalid request body.",
        requestId,
      },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const guardianEmail =
    typeof unknownBody.guardianEmail ===
      "string"
      ? unknownBody.guardianEmail
      : "";

  const emailValidation =
    validateEmail(guardianEmail);

  if (!emailValidation.valid) {
    return NextResponse.json(
      {
        success: false,
        code: "validation_failed",
        error:
          emailValidation.message,
        requestId,
      },
      {
        status: 422,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (
    user.email &&
    user.email.toLowerCase() ===
      emailValidation.value
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_email_matches_account",
        error:
          "Guardian email must be different from the account email.",
        requestId,
      },
      {
        status: 422,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const rawNext =
    typeof unknownBody.next === "string"
      ? unknownBody.next
      : "/";

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
    );

  const rawToken =
    randomBytes(32).toString(
      "base64url",
    );

  const tokenHash =
    createHash("sha256")
      .update(rawToken)
      .digest("hex");

  const expiresAt =
    new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000,
    ).toISOString();

  const admin = createAdminClient();

  const {
    data: requestData,
    error: requestError,
  } = await admin.rpc(
    "create_lifetopia_guardian_consent_request",
    {
      p_user_id: user.id,
      p_guardian_email:
        emailValidation.value,
      p_token_hash: tokenHash,
      p_expires_at: expiresAt,
    },
  );

  if (requestError) {
    console.error(
      "[guardian-consent] request failed",
      {
        requestId,
        code: requestError.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_request_unavailable",
        error:
          "Guardian approval cannot be requested for this account yet.",
        requestId,
      },
      {
        status: 409,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const requestResult =
    getRequestResult(requestData);

  if (!requestResult) {
    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_request_unavailable",
        error:
          "Guardian approval is temporarily unavailable.",
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

  if (!requestResult.allowed) {
    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_request_cooldown",
        error:
          "Please wait before requesting another guardian email.",
        retryAfterSeconds:
          requestResult
            .retry_after_seconds,
        requestId,
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (
    !requestResult.request_id ||
    !requestResult.expires_at ||
    !requestResult
      .child_display_name ||
    !requestResult.child_username
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_request_invalid",
        error:
          "Guardian approval is temporarily unavailable.",
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

  try {
    await sendGuardianConsentEmail({
      guardianEmail:
        emailValidation.value,
      childDisplayName:
        requestResult
          .child_display_name,
      childUsername:
        requestResult.child_username,
      token: rawToken,
      expiresAt:
        requestResult.expires_at,
      requestUrl: request.url,
    });

    await admin.rpc(
      "complete_lifetopia_guardian_consent_delivery",
      {
        p_request_id:
          requestResult.request_id,
        p_success: true,
        p_error_code: null,
      },
    );
  } catch (error) {
    console.error(
      "[guardian-consent] email delivery failed",
      {
        requestId,
        message:
          error instanceof Error
            ? error.message
            : "unknown",
      },
    );

    await admin.rpc(
      "complete_lifetopia_guardian_consent_delivery",
      {
        p_request_id:
          requestResult.request_id,
        p_success: false,
        p_error_code:
          "smtp_delivery_failed",
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_email_delivery_failed",
        error:
          "The guardian request was created, but the email could not be delivered. Try again after the cooldown.",
        retryAfterSeconds: 180,
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

  return NextResponse.json(
    {
      success: true,
      status: "guardian_email_sent",
      next,
      expiresAt:
        requestResult.expires_at,
      retryAfterSeconds: 180,
      requestId,
    },
    {
      status: 201,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
        "X-Content-Type-Options":
          "nosniff",
      },
    },
  );
}
