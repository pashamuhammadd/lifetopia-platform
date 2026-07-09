
import type { CookieOptions } from "@supabase/ssr";

export function getSupabaseCookieOptions(): CookieOptions {
  const cookieDomain = process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN?.trim();

  return {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  };
}