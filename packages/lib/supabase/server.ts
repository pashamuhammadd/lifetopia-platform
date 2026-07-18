import {
  createServerClient,
} from "@supabase/ssr";
import {
  cookies,
} from "next/headers";

import {
  applySupabaseCookiePersistence,
  AUTH_SESSION_PERSISTENCE_COOKIE,
  getSupabaseCookieOptions,
  normalizeAuthSessionPersistence,
  type AuthSessionPersistence,
} from "./cookie-options";

export async function createClient(
  persistenceOverride?:
    AuthSessionPersistence,
) {
  const cookieStore =
    await cookies();

  const persistence =
    persistenceOverride ??
    normalizeAuthSessionPersistence(
      cookieStore.get(
        AUTH_SESSION_PERSISTENCE_COOKIE,
      )?.value,
    );

  return createServerClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions:
        getSupabaseCookieOptions(
          persistence,
        ),
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                cookieStore.set(
                  name,
                  value,
                  applySupabaseCookiePersistence(
                    options,
                    persistence,
                  ),
                );
              },
            );
          } catch {
            // Server Components cannot
            // always set cookies directly.
          }
        },
      },
    },
  );
}
