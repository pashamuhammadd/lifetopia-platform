const DEFAULT_REDIRECT_AFTER_LOGIN = "/dashboard";

const PRODUCTION_ALLOWED_REDIRECT_ORIGINS = [
  "https://lifetopiaworld.io",
  "https://www.lifetopiaworld.io",
  "https://community.lifetopiaworld.io",
  "https://play.lifetopiaworld.io",
  "https://grants.lifetopiaworld.io",
  "https://docs.lifetopiaworld.io",
  "https://marketplace.lifetopiaworld.io",
];

const DEVELOPMENT_ALLOWED_REDIRECT_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
];

function normalizeAllowedOrigin(value: string): string | null {
  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function getAllowedRedirectOrigins() {
  const configuredOrigins =
    process.env.NEXT_PUBLIC_AUTH_ALLOWED_REDIRECT_ORIGINS
      ?.split(",")
      .map(normalizeAllowedOrigin)
      .filter(
        (origin): origin is string =>
          Boolean(origin),
      ) ?? [];

  const defaultOrigins = [
    ...PRODUCTION_ALLOWED_REDIRECT_ORIGINS,
    ...(process.env.NODE_ENV !== "production"
      ? DEVELOPMENT_ALLOWED_REDIRECT_ORIGINS
      : []),
  ];

  return Array.from(
    new Set([
      ...defaultOrigins,
      ...configuredOrigins,
    ]),
  );
}

function isAuthPagePath(path: string) {
  const pathname =
    path.split("?")[0]?.split("#")[0] ?? path;

  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/")
  );
}

export function sanitizeAuthRedirect(
  value: string | null | undefined,
  fallback = DEFAULT_REDIRECT_AFTER_LOGIN,
) {
  if (!value) {
    return fallback;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return fallback;
  }

  /*
   * Allow internal application paths, but reject
   * protocol-relative URLs such as //example.com.
   */
  if (
    trimmedValue.startsWith("/") &&
    !trimmedValue.startsWith("//")
  ) {
    return isAuthPagePath(trimmedValue)
      ? fallback
      : trimmedValue;
  }

  try {
    const url = new URL(trimmedValue);

    const isHttpProtocol =
      url.protocol === "http:";

    const isHttpsProtocol =
      url.protocol === "https:";

    const isLocalHttp =
      isHttpProtocol &&
      (url.hostname === "localhost" ||
        url.hostname === "127.0.0.1");

    if (!isHttpProtocol && !isHttpsProtocol) {
      return fallback;
    }

    /*
     * Plain HTTP is only permitted for local
     * development and never for production domains.
     */
    if (isHttpProtocol && !isLocalHttp) {
      return fallback;
    }

    if (
      !getAllowedRedirectOrigins().includes(
        url.origin,
      )
    ) {
      return fallback;
    }

    if (isAuthPagePath(url.pathname)) {
      return fallback;
    }

    return url.toString();
  } catch {
    return fallback;
  }
}

export function isAbsoluteAuthRedirect(
  value: string,
) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}