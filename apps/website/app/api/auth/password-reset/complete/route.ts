import {
  createHash,
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
import {
  validatePassword,
} from "@repo/services/auth-validation";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UnknownRecord =
  Record<string, unknown>;

type ResetPreviewRow = {
  valid: boolean;
  user_id: string | null;
  email: string | null;
  username: string | null;
  return_path: string | null;
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

function firstRow(
  data: unknown,
): ResetPreviewRow | null {
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

  return first as ResetPreviewRow;
}

export async function POST(
  request: Request,
) {
  const requestId =
    randomUUID();

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

  const token =
    typeof unknownBody.token ===
      "string"
      ? unknownBody.token
      : "";

  const password =
    typeof unknownBody.password ===
      "string"
      ? unknownBody.password
      : "";

  const confirmPassword =
    typeof unknownBody
      .confirmPassword === "string"
      ? unknownBody.confirmPassword
      : "";

  if (
    token.length < 32 ||
    !password ||
    !confirmPassword
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          "Reset token and password fields are required.",
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

  if (
    password !== confirmPassword
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "password_mismatch",
        error:
          "Password confirmation does not match.",
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

  const tokenHash =
    createHash("sha256")
      .update(token)
      .digest("hex");

  const admin =
    createAdminClient();

  const {
    data: previewData,
    error: previewError,
  } = await admin.rpc(
    "preview_lifetopia_password_reset",
    {
      p_token_hash:
        tokenHash,
    },
  );

  const preview =
    firstRow(previewData);

  if (
    previewError ||
    !preview?.valid ||
    !preview.user_id ||
    !preview.email ||
    !preview.username
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "reset_link_unavailable",
        error:
          "This password reset link is invalid, expired, or already used.",
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

  const passwordValidation =
    validatePassword(
      password,
      {
        username:
          preview.username,
        email:
          preview.email,
      },
    );

  if (!passwordValidation.valid) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          passwordValidation.message,
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

  const {
    error: updateError,
  } =
    await admin.auth.admin
      .updateUserById(
        preview.user_id,
        {
          password:
            passwordValidation.value,
        },
      );

  if (updateError) {
    console.error(
      "[password-reset] password update failed",
      {
        requestId,
        status:
          updateError.status,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "password_update_failed",
        error:
          "The password could not be updated.",
        requestId,
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const {
    error: completionError,
  } = await admin.rpc(
    "complete_lifetopia_password_reset",
    {
      p_token_hash:
        tokenHash,
    },
  );

  if (completionError) {
    console.error(
      "[password-reset] completion audit failed",
      {
        requestId,
        code:
          completionError.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "password_reset_incomplete",
        error:
          "The password changed, but the reset request could not be finalized. Contact contact@lifetopiaworld.io.",
        requestId,
      },
      {
        status: 500,
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
        "password_reset_complete",
      next:
        preview.return_path ??
        "/",
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
