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
  validateUsername,
} from "@repo/services/auth-validation";
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

  const usernameValue =
    typeof unknownBody.username ===
      "string"
      ? unknownBody.username
      : "";

  const validation =
    validateUsername(
      usernameValue,
    );

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

  const admin =
    createAdminClient();

  const { data, error } =
    await admin.rpc(
      "complete_lifetopia_required_username_selection",
      {
        p_user_id: user.id,
        p_new_username:
          validation.value,
      },
    );

  if (error) {
    const conflict =
      error.code === "23505";

    console.error(
      "[account-access] username selection failed",
      {
        requestId,
        code: error.code,
        conflict,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code: conflict
          ? "username_taken"
          : "username_selection_failed",
        error: conflict
          ? "Username is already taken."
          : "The username could not be updated.",
        requestId,
      },
      {
        status:
          conflict ? 409 : 400,
        headers: {
          "Cache-Control":
            "no-store",
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
        "username_selected",
      username:
        result?.username ??
        validation.value,
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
