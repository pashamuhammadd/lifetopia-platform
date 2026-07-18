"use server";

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
  redirect,
} from "next/navigation";

export async function logout() {
  const supabase =
    await createClient();

  await supabase.auth.signOut({
    scope: "local",
  });

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

  redirect("/");
}
