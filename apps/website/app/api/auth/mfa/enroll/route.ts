import {
  randomUUID,
} from "node:crypto";

import {
  getMfaErrorCode,
  recordMfaEvent,
} from "@/lib/auth/mfa-audit";
import {
  mapTotpFactors,
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

function validateFriendlyName(
  value: string,
): string | null {
  const normalized =
    value.trim().replace(
      /\s+/g,
      " ",
    );

  if (
    normalized.length < 2 ||
    normalized.length > 32
  ) {
    return null;
  }

  if (
    !/^[A-Za-z0-9 _-]+$/.test(
      normalized,
    )
  ) {
    return null;
  }

  return normalized;
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

  const friendlyName =
    validateFriendlyName(
      typeof body.friendlyName ===
        "string"
        ? body.friendlyName
        : "",
    );

  if (!friendlyName) {
    return NextResponse.json(
      {
        success: false,
        code:
          "validation_failed",
        error:
          "Authenticator name must contain 2–32 letters, numbers, spaces, underscores, or hyphens.",
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

  const [
    factorsResult,
    assuranceResult,
  ] = await Promise.all([
    supabase.auth.mfa.listFactors(),
    supabase.auth.mfa
      .getAuthenticatorAssuranceLevel(),
  ]);

  if (
    factorsResult.error ||
    assuranceResult.error
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_state_unavailable",
        error:
          "Authenticator status could not be loaded.",
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

  const factors =
    mapTotpFactors(
      factorsResult.data,
    );

  const verifiedCount =
    factors.filter(
      (factor) =>
        factor.status ===
        "verified",
    ).length;

  if (
    verifiedCount > 0 &&
    assuranceResult.data
      ?.currentLevel !== "aal2"
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_reauthentication_required",
        error:
          "Verify an existing authenticator before adding another.",
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

  if (factors.length >= 10) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_factor_limit_reached",
        error:
          "The maximum number of authenticator factors has been reached.",
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

  const { data, error } =
    await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName,
    });

  if (error || !data.totp) {
    await recordMfaEvent({
      userId: user.id,
      factorId:
        data?.id ?? null,
      eventType:
        "enrollment_started",
      success: false,
      errorCode:
        getMfaErrorCode(error),
    });

    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_enrollment_failed",
        error:
          "Authenticator enrollment could not be started.",
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

  await recordMfaEvent({
    userId: user.id,
    factorId: data.id,
    eventType:
      "enrollment_started",
    success: true,
  });

  return NextResponse.json(
    {
      success: true,
      factor: {
        id: data.id,
        friendlyName,
        qrCode:
          data.totp.qr_code,
        secret:
          data.totp.secret,
        uri:
          data.totp.uri,
      },
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
