import {
  randomUUID,
} from "node:crypto";

import {
  createAdminClient,
} from "@repo/lib/supabase/admin";
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

  const termsAccepted =
    unknownBody.termsAccepted ===
    true;

  const privacyAccepted =
    unknownBody.privacyAccepted ===
    true;

  const termsVersion =
    typeof unknownBody
      .termsVersion === "string"
      ? unknownBody.termsVersion
      : "";

  const privacyVersion =
    typeof unknownBody
      .privacyVersion === "string"
      ? unknownBody.privacyVersion
      : "";

  if (
    !termsAccepted ||
    !privacyAccepted ||
    !termsVersion ||
    !privacyVersion
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "legal_acceptance_required",
        error:
          "Review and accept both current legal documents.",
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

  const admin =
    createAdminClient();

  const { error } =
    await admin.rpc(
      "complete_lifetopia_legal_reconsent",
      {
        p_user_id: user.id,
        p_terms_version:
          termsVersion,
        p_privacy_version:
          privacyVersion,
        p_source_app:
          "website",
      },
    );

  if (error) {
    console.error(
      "[account-access] legal consent failed",
      {
        requestId,
        code: error.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "legal_acceptance_failed",
        error:
          "The current legal documents could not be accepted.",
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

  return NextResponse.json(
    {
      success: true,
      status:
        "legal_accepted",
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
