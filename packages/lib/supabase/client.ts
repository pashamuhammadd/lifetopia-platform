import {
  createBrowserClient,
} from "@supabase/ssr";

import {
  AUTH_SESSION_PERSISTENCE_COOKIE,
  getSupabaseCookieOptions,
  normalizeAuthSessionPersistence,
} from "./cookie-options";

function readPersistenceCookie() {
  if (
    typeof document === "undefined"
  ) {
    return "session" as const;
  }

  const value =
    document.cookie
      .split("; ")
      .find((entry) =>
        entry.startsWith(
          `${AUTH_SESSION_PERSISTENCE_COOKIE}=`,
        ),
      )
      ?.split("=")
      .slice(1)
      .join("=");

  return normalizeAuthSessionPersistence(
    value
      ? decodeURIComponent(value)
      : undefined,
  );
}

export function createClient() {
  const persistence =
    readPersistenceCookie();

  return createBrowserClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions:
        getSupabaseCookieOptions(
          persistence,
        ),
    },
  );
}
