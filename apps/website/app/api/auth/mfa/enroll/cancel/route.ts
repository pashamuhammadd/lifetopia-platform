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

export async function POST(
  request: Request,
) {
  const requestId =
    randomUUID();

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
      "unverified"
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_enrollment_unavailable",
        error:
          "The incomplete authenticator setup is unavailable.",
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
      .unenroll({
        factorId,
      });

  await recordMfaEvent({
    userId: user.id,
    factorId,
    eventType:
      "enrollment_cancelled",
    success: !error,
    errorCode:
      error
        ? getMfaErrorCode(error)
        : null,
  });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_cancel_failed",
        error:
          "The incomplete authenticator setup could not be removed.",
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

  return NextResponse.json(
    {
      success: true,
      status:
        "enrollment_cancelled",
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
