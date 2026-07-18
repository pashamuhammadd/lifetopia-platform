import type {
  CookieOptions,
} from "@supabase/ssr";

export const AUTH_SESSION_PERSISTENCE_COOKIE =
  "lifetopia-auth-persistence";

export const REMEMBER_ME_MAX_AGE_SECONDS =
  60 * 60 * 24 * 7;

export type AuthSessionPersistence =
  | "session"
  | "remember";

export function normalizeAuthSessionPersistence(
  value: string | null | undefined,
): AuthSessionPersistence {
  return value === "remember"
    ? "remember"
    : "session";
}

function getCommonCookieOptions(): CookieOptions {
  const cookieDomain =
    process.env
      .NEXT_PUBLIC_AUTH_COOKIE_DOMAIN
      ?.trim();

  return {
    path: "/",
    sameSite: "lax",
    secure:
      process.env.NODE_ENV ===
      "production",
    ...(cookieDomain
      ? { domain: cookieDomain }
      : {}),
  };
}

export function getSupabaseCookieOptions(
  persistence: AuthSessionPersistence =
    "session",
): CookieOptions {
  return {
    ...getCommonCookieOptions(),
    ...(persistence === "remember"
      ? {
          maxAge:
            REMEMBER_ME_MAX_AGE_SECONDS,
        }
      : {}),
  };
}

export function applySupabaseCookiePersistence(
  generatedOptions:
    CookieOptions | undefined,
  persistence: AuthSessionPersistence,
): CookieOptions {
  const options: CookieOptions = {
    ...(generatedOptions ?? {}),
    ...getCommonCookieOptions(),
  };

  const isRemoval =
    generatedOptions?.maxAge === 0;

  delete options.expires;
  delete options.maxAge;

  if (isRemoval) {
    options.maxAge = 0;
    return options;
  }

  if (persistence === "remember") {
    options.maxAge =
      REMEMBER_ME_MAX_AGE_SECONDS;
  }

  return options;
}

export function getAuthSessionPersistenceCookieOptions(
  persistence: AuthSessionPersistence,
): CookieOptions {
  return {
    ...getCommonCookieOptions(),
    httpOnly: false,
    ...(persistence === "remember"
      ? {
          maxAge:
            REMEMBER_ME_MAX_AGE_SECONDS,
        }
      : {}),
  };
}
