
const DEFAULT_REDIRECT_AFTER_LOGIN = "/dashboard";

const DEFAULT_ALLOWED_REDIRECT_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://lifetopiaworld.io",
  "https://www.lifetopiaworld.io",
  "https://community.lifetopiaworld.io",
  "https://play.lifetopiaworld.io",
  "https://marketplace.lifetopiaworld.io",
];

function getAllowedRedirectOrigins() {
  const configuredOrigins =
    process.env.NEXT_PUBLIC_AUTH_ALLOWED_REDIRECT_ORIGINS
      ?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [];

  return Array.from(
    new Set([...DEFAULT_ALLOWED_REDIRECT_ORIGINS, ...configuredOrigins]),
  );
}

function isAuthPagePath(path: string) {
  return (
    path === "/login" ||
    path.startsWith("/login?") ||
    path === "/register" ||
    path.startsWith("/register?")
  );
}

export function sanitizeAuthRedirect(
  value: string | null | undefined,
  fallback = DEFAULT_REDIRECT_AFTER_LOGIN,
) {
  if (!value) return fallback;

  const trimmedValue = value.trim();

  if (!trimmedValue) return fallback;

  if (trimmedValue.startsWith("/") && !trimmedValue.startsWith("//")) {
    return isAuthPagePath(trimmedValue) ? fallback : trimmedValue;
  }

  try {
    const url = new URL(trimmedValue);
    const isAllowedProtocol = url.protocol === "https:" || url.protocol === "http:";
    const isLocalHttp =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (!isAllowedProtocol) return fallback;
    if (url.protocol === "http:" && !isLocalHttp) return fallback;
    if (!getAllowedRedirectOrigins().includes(url.origin)) return fallback;
    if (isAuthPagePath(`${url.pathname}${url.search}`)) return fallback;

    return url.toString();
  } catch {
    return fallback;
  }
}

export function isAbsoluteAuthRedirect(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}