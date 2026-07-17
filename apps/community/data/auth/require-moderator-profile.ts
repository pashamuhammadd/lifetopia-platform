import { notFound } from "next/navigation";

import {
  requireCurrentProfile,
} from "@/data/auth/require-current-profile";
import type { CurrentProfile } from "@/data/profile/current-profile";

const MODERATION_ROLES = new Set([
  "founder",
  "admin",
  "moderator",
]);

export function hasModerationAccess(
  role: string | null | undefined,
) {
  return MODERATION_ROLES.has(
    role?.trim().toLowerCase() ?? "",
  );
}

export async function requireModeratorProfile(
  pathname: string,
): Promise<CurrentProfile> {
  const profile =
    await requireCurrentProfile(
      pathname,
    );

  if (
    !hasModerationAccess(
      profile.role,
    )
  ) {
    notFound();
  }

  return profile;
}
