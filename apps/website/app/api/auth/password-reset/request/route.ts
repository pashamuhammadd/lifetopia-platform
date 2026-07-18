import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import {
  sendPasswordResetEmail,
} from "@/lib/auth/password-reset-email";
import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  normalizeEmail,
  sanitizeAuthRedirectValue,
  validateEmail,
} from "@repo/services/auth-validation";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_MESSAGE =
  "If an account exists for this email, a password reset message has been requested.";

type UnknownRecord =
  Record<string, unknown>;

type PasswordResetRequestRow = {
  request_id: string | null;
  allowed: boolean;
  retry_after_seconds: number;
  resolved_email: string | null;
  display_name: string | null;
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

function firstRow(
  data: unknown,
): PasswordResetRequestRow | null {
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

  return first as PasswordResetRequestRow;
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

  let unknownBody: unknown;

  try {
    unknownBody =
      await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_json",
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
        code:
          "invalid_body",
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

  const emailValue =
    typeof unknownBody.email ===
      "string"
      ? unknownBody.email
      : "";

  const validation =
    validateEmail(emailValue);

  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          validation.message,
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
        30 * 60 * 1000,
    ).toISOString();

  const admin =
    createAdminClient();

  const { data, error } =
    await admin.rpc(
      "create_lifetopia_password_reset_request",
      {
        p_email:
          normalizeEmail(
            validation.value,
          ),
        p_token_hash:
          tokenHash,
        p_expires_at:
          expiresAt,
        p_return_path:
          next,
      },
    );

  if (error) {
    console.error(
      "[password-reset] request reservation failed",
      {
        requestId,
        code: error.code,
      },
    );

    return NextResponse.json(
      {
        success: true,
        message:
          GENERIC_MESSAGE,
        retryAfterSeconds: 180,
        requestId,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      },
    );
  }

  const result =
    firstRow(data);

  if (
    result?.allowed &&
    result.request_id &&
    result.resolved_email &&
    result.display_name
  ) {
    try {
      await sendPasswordResetEmail({
        email:
          result.resolved_email,
        displayName:
          result.display_name,
        token:
          rawToken,
        requestUrl:
          request.url,
      });

      await admin.rpc(
        "complete_lifetopia_password_reset_delivery",
        {
          p_request_id:
            result.request_id,
          p_success: true,
          p_error_code:
            null,
        },
      );
    } catch (deliveryError) {
      console.error(
        "[password-reset] email delivery failed",
        {
          requestId,
          message:
            deliveryError instanceof Error
              ? deliveryError.message
              : "unknown",
        },
      );

      await admin.rpc(
        "complete_lifetopia_password_reset_delivery",
        {
          p_request_id:
            result.request_id,
          p_success: false,
          p_error_code:
            "smtp_delivery_failed",
        },
      );
    }
  }

  return NextResponse.json(
    {
      success: true,
      message:
        GENERIC_MESSAGE,
      retryAfterSeconds:
        Math.max(
          1,
          result
            ?.retry_after_seconds ??
            180,
        ),
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
