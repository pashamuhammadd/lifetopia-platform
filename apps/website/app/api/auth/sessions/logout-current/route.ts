import {
  randomUUID,
} from "node:crypto";

import {
  AUTH_SESSION_PERSISTENCE_COOKIE,
  getAuthSessionPersistenceCookieOptions,
} from "@repo/lib/supabase/cookie-options";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  cookies,
} from "next/headers";
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

  const { error } =
    await supabase.auth.signOut({
      scope: "local",
    });

  if (error) {
    return NextResponse.json(
      {
        success: false,
        code:
          "logout_current_failed",
        error:
          "This device could not be signed out.",
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

  const cookieStore =
    await cookies();

  cookieStore.set(
    AUTH_SESSION_PERSISTENCE_COOKIE,
    "",
    {
      ...getAuthSessionPersistenceCookieOptions(
        "session",
      ),
      maxAge: 0,
    },
  );

  return NextResponse.json(
    {
      success: true,
      status:
        "current_session_revoked",
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
