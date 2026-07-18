import {
  randomUUID,
} from "node:crypto";

import {
  getMfaErrorCode,
  recordMfaEvent,
} from "@/lib/auth/mfa-audit";
import {
  getFactorById,
} from "@/lib/auth/mfa-factors";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
          "Login is required.",
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
    factor.status ===
      "verified"
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_enrollment_unavailable",
        error:
          "The pending authenticator setup is unavailable.",
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

  const { error } =
    await supabase.auth.mfa
      .challengeAndVerify({
        factorId,
        code,
      });

  if (error) {
    await recordMfaEvent({
      userId: user.id,
      factorId,
      eventType:
        "enrollment_verified",
      success: false,
      errorCode:
        getMfaErrorCode(error),
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

  await recordMfaEvent({
    userId: user.id,
    factorId,
    eventType:
      "enrollment_verified",
    success: true,
  });

  return NextResponse.json(
    {
      success: true,
      status:
        "mfa_enabled",
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
