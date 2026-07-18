import {
  randomUUID,
} from "node:crypto";

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
    body = await request.json();
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

  const sessionId =
    typeof body.sessionId ===
      "string"
      ? body.sessionId
      : "";

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      sessionId,
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "invalid_session_id",
        error:
          "The session identifier is invalid.",
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

  const { data, error } =
    await supabase.rpc(
      "revoke_my_lifetopia_session",
      {
        p_session_id:
          sessionId,
      },
    );

  if (error) {
    console.error(
      "[auth-sessions] revoke failed",
      {
        requestId,
        code: error.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "session_revoke_failed",
        error:
          error.message.includes(
            "current session",
          )
            ? "Use Sign Out This Device for the current session."
            : "The session could not be signed out.",
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

  if (data !== true) {
    return NextResponse.json(
      {
        success: false,
        code:
          "session_not_found",
        error:
          "The session is no longer active.",
        requestId,
      },
      {
        status: 404,
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
        "session_revoked",
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
