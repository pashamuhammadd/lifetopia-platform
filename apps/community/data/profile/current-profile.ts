import {
  getLifetopiaBadgeDefinition,
  normalizeLifetopiaRole,
  sortLifetopiaBadges,
  type LifetopiaProfileBadge,
  type LifetopiaRole,
} from "@repo/lib/identity";
import {
  createClient,
} from "@repo/lib/supabase/server";

type BadgeRow = {
  badge_code: string;
  granted_at: string;
};

export type CurrentProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarId: string;
  avatarSrc: string;
  role: LifetopiaRole;
  badges: LifetopiaProfileBadge[];
  accountType: string;
};

export async function getCurrentProfile():
  Promise<CurrentProfile | null> {
  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (
    userError ||
    !user
  ) {
    return null;
  }

  const [
    profileResult,
    badgesResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id, username, display_name, avatar_id, role, account_type",
      )
      .eq("id", user.id)
      .single(),
    supabase
      .from("profile_badges")
      .select(
        "badge_code, granted_at",
      )
      .eq("user_id", user.id),
  ]);

  const profile =
    profileResult.data;

  if (
    profileResult.error ||
    !profile
  ) {
    return null;
  }

  const badges =
    (
      (
        badgesResult.data ??
        []
      ) as BadgeRow[]
    )
      .map((row) => {
        const definition =
          getLifetopiaBadgeDefinition(
            row.badge_code,
          );

        if (!definition) {
          return null;
        }

        return {
          code:
            definition.code,
          label:
            definition.label,
          description:
            definition.description,
          className:
            definition.className,
          grantedAt:
            row.granted_at,
        } as LifetopiaProfileBadge;
      })
      .filter(
        (
          badge,
        ): badge is LifetopiaProfileBadge =>
          badge !== null,
      );

  return {
    id: profile.id,
    username:
      profile.username,
    displayName:
      profile.display_name,
    avatarId:
      profile.avatar_id,
    avatarSrc:
      `/images/avatars/${profile.avatar_id}.jpg`,
    role:
      normalizeLifetopiaRole(
        profile.role,
      ),
    badges:
      sortLifetopiaBadges(
        badges,
      ),
    accountType:
      profile.account_type,
  };
}
