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
  verifyCurrentPassword,
} from "@/lib/auth/password-reauth";
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

  if (
    !user ||
    !user.email
  ) {
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

  const verificationFactorId =
    typeof body
      .verificationFactorId ===
      "string"
      ? body.verificationFactorId
      : "";

  const password =
    typeof body.password ===
      "string"
      ? body.password
      : "";

  const code =
    typeof body.code ===
      "string"
      ? body.code.trim()
      : "";

  if (
    !factorId ||
    !verificationFactorId ||
    !password ||
    !/^\d{6}$/.test(code)
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          "Current password and a six-digit authenticator code are required.",
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

  const factorToRemove =
    getFactorById(
      factorsResult.data,
      factorId,
    );

  const verificationFactor =
    getFactorById(
      factorsResult.data,
      verificationFactorId,
    );

  if (
    factorsResult.error ||
    !factorToRemove ||
    factorToRemove.status !==
      "verified" ||
    !verificationFactor ||
    verificationFactor.status !==
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

  const passwordValid =
    await verifyCurrentPassword({
      email: user.email,
      password,
    });

  if (!passwordValid) {
    return NextResponse.json(
      {
        success: false,
        code:
          "reauthentication_failed",
        error:
          "Current password or authenticator code is incorrect.",
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

  const {
    error: challengeError,
  } =
    await supabase.auth.mfa
      .challengeAndVerify({
        factorId:
          verificationFactorId,
        code,
      });

  if (challengeError) {
    await recordMfaEvent({
      userId: user.id,
      factorId:
        verificationFactorId,
      eventType:
        "challenge_failed",
      success: false,
      errorCode:
        getMfaErrorCode(
          challengeError,
        ),
    });

    return NextResponse.json(
      {
        success: false,
        code:
          "reauthentication_failed",
        error:
          "Current password or authenticator code is incorrect.",
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

  const { error: removeError } =
    await supabase.auth.mfa
      .unenroll({
        factorId,
      });

  await recordMfaEvent({
    userId: user.id,
    factorId,
    eventType:
      "factor_removed",
    success: !removeError,
    errorCode:
      removeError
        ? getMfaErrorCode(
            removeError,
          )
        : null,
  });

  if (removeError) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_unenroll_failed",
        error:
          "The authenticator could not be removed.",
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

  await supabase.auth
    .refreshSession();

  return NextResponse.json(
    {
      success: true,
      status:
        "factor_removed",
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
