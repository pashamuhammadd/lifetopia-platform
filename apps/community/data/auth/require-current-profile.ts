import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  getCurrentProfile,
  type CurrentProfile,
} from "@/data/profile/current-profile";

const MAIN_APP_URL =
  process.env.NEXT_PUBLIC_MAIN_APP_URL ?? "https://lifetopiaworld.io";

async function getCurrentRequestUrl(pathname: string) {
  const requestHeaders = await headers();

  const forwardedHost = requestHeaders
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();

  const host =
    forwardedHost ??
    requestHeaders.get("host") ??
    "community.lifetopiaworld.io";

  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();

  const protocol =
    forwardedProtocol ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${protocol}://${host}${pathname}`;
}

export async function requireCurrentProfile(
  pathname: string,
): Promise<CurrentProfile> {
  const profile = await getCurrentProfile();

  if (profile) {
    return profile;
  }

  const returnUrl = await getCurrentRequestUrl(pathname);
  const loginUrl = new URL("/login", MAIN_APP_URL);
  loginUrl.searchParams.set("next", returnUrl);

  redirect(loginUrl.toString());
}
