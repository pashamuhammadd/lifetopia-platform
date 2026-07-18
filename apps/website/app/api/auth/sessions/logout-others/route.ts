import {
  randomUUID,
} from "node:crypto";

import {
  getCurrentMfaSessionState,
} from "@/lib/auth/mfa-session";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


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

  const mfaState =
    await getCurrentMfaSessionState();

  if (!mfaState) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_state_unavailable",
        error:
          "Account security status could not be verified.",
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

  if (
    mfaState.requiresChallenge
  ) {
    return NextResponse.json(
      {
        success: false,
        code:
          "mfa_required",
        error:
          "Complete two-factor authentication before managing sessions.",
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

  const { error } =
    await supabase.auth.signOut({
      scope: "others",
    });

  if (error) {
    console.error(
      "[auth-sessions] logout others failed",
      {
        requestId,
        code: error.code,
      },
    );

    return NextResponse.json(
      {
        success: false,
        code:
          "logout_others_failed",
        error:
          "Other devices could not be signed out.",
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
        "other_sessions_revoked",
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
