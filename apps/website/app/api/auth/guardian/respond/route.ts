import {
  createHash,
  randomUUID,
} from "node:crypto";

import { createAdminClient } from "@repo/lib/supabase/admin";
import { NextResponse } from "next/server";

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
  const requestId = randomUUID();

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

  const token =
    typeof body.token === "string"
      ? body.token
      : "";

  const decision =
    body.decision === "approved" ||
    body.decision === "rejected"
      ? body.decision
      : "";

  const termsAccepted =
    body.termsAccepted === true;

  const privacyAccepted =
    body.privacyAccepted === true;

  if (
    token.length < 32 ||
    !decision
  ) {
    return NextResponse.json(
      {
        success: false,
        code: "validation_failed",
        error:
          "The guardian response is invalid.",
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
    decision === "approved" &&
    (
      !termsAccepted ||
      !privacyAccepted
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "legal_acceptance_required",
        error:
          "Review and accept both legal documents before approving.",
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

  const tokenHash =
    createHash("sha256")
      .update(token)
      .digest("hex");

  const admin = createAdminClient();

  const { data, error } =
    await admin.rpc(
      "respond_lifetopia_guardian_consent",
      {
        p_token_hash: tokenHash,
        p_decision: decision,
      },
    );

  if (error) {
    console.error(
      "[guardian-consent] response failed",
      {
        requestId,
        code: error.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "guardian_link_unavailable",
        error:
          "This guardian link is invalid, expired, or already used.",
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

  const result =
    Array.isArray(data)
      ? data[0]
      : data;

  return NextResponse.json(
    {
      success: true,
      status:
        result?.guardian_status ??
        decision,
      childUsername:
        result?.child_username,
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
