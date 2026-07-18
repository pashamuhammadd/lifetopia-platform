import {
  getLifetopiaRoleDefinition,
  sortLifetopiaBadges,
  type LifetopiaProfileBadge,
  type LifetopiaRole,
} from "@repo/lib/identity";

type ProfileIdentityBadgesProps = {
  role: LifetopiaRole;
  badges?: LifetopiaProfileBadge[];
  compact?: boolean;
};

export function ProfileIdentityBadges({
  role,
  badges = [],
  compact = false,
}: ProfileIdentityBadgesProps) {
  const roleDefinition =
    getLifetopiaRoleDefinition(
      role,
    );

  const visibleBadges =
    sortLifetopiaBadges(
      badges,
    ).filter(
      (badge) =>
        badge.code !== role,
    );

  const sizeClass = compact
    ? "px-2.5 py-1 text-[10px]"
    : "px-3 py-1 text-[11px]";

  return (
    <div className="flex flex-wrap gap-2">
      <span
        title={
          roleDefinition.description
        }
        className={`inline-flex items-center rounded-full border font-black ${sizeClass} ${roleDefinition.className}`}
      >
        {roleDefinition.label}
      </span>

      {visibleBadges.map(
        (badge) => (
          <span
            key={badge.code}
            title={
              badge.description
            }
            className={`inline-flex items-center rounded-full border font-black ${sizeClass} ${badge.className}`}
          >
            {badge.label}
          </span>
        ),
      )}
    </div>
  );
}
