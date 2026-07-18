import { randomUUID } from "node:crypto";

import {
  sendLifetopiaVerificationEmail,
} from "@/lib/auth/verification-email";
import {
  normalizeEmail,
  sanitizeAuthRedirectValue,
  validateEmail,
} from "@repo/services/auth-validation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_MESSAGE =
  "If an unverified account exists for this email, a verification message has been requested.";

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

  let body: unknown;

  try {
    body = await request.json();
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

  if (!isRecord(body)) {
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

  const emailValue =
    typeof body.email === "string"
      ? body.email
      : "";

  const emailValidation =
    validateEmail(emailValue);

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

  const rawNext =
    typeof body.next === "string"
      ? body.next
      : "/";

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/",
    );

  const delivery =
    await sendLifetopiaVerificationEmail({
      email:
        normalizeEmail(
          emailValidation.value,
        ),
      next,
      reason: "resend",
      requestId,
      requestUrl: request.url,
    });

  return NextResponse.json(
    {
      success: true,
      message: GENERIC_MESSAGE,
      retryAfterSeconds:
        Math.max(
          1,
          delivery.retryAfterSeconds ||
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
