export const LIFETOPIA_ROLES = [
  "founder",
  "admin",
  "moderator",
  "developer",
  "artist",
  "alpha_tester",
  "beta_tester",
  "lifetopian",
] as const;

export type LifetopiaRole =
  (typeof LIFETOPIA_ROLES)[number];

export const LIFETOPIA_BADGES = [
  "founder",
  "admin",
  "moderator",
  "developer",
  "artist",
  "alpha_tester",
  "beta_tester",
  "lifetopian",
] as const;

export type LifetopiaBadgeCode =
  (typeof LIFETOPIA_BADGES)[number];

export type LifetopiaIdentityDefinition = {
  code:
    | LifetopiaRole
    | LifetopiaBadgeCode;
  label: string;
  description: string;
  className: string;
  priority: number;
};

export type LifetopiaProfileBadge = {
  code: LifetopiaBadgeCode;
  label: string;
  description: string;
  className: string;
  grantedAt?: string | null;
};

const ROLE_DEFINITIONS: Record<
  LifetopiaRole,
  LifetopiaIdentityDefinition
> = {
  founder: {
    code: "founder",
    label: "Founder",
    description:
      "Founder of Lifetopia World.",
    className:
      "border-[#e5b942] bg-[#fff4ce] text-[#8a5a00]",
    priority: 10,
  },
  admin: {
    code: "admin",
    label: "Admin",
    description:
      "Lifetopia platform administrator.",
    className:
      "border-[#d4b5ff] bg-[#f3eaff] text-[#7041ad]",
    priority: 20,
  },
  moderator: {
    code: "moderator",
    label: "Moderator",
    description:
      "Lifetopia community moderator.",
    className:
      "border-[#9fd8b1] bg-[#e7f7ec] text-[#2f7a45]",
    priority: 30,
  },
  developer: {
    code: "developer",
    label: "Developer",
    description:
      "Lifetopia development contributor.",
    className:
      "border-[#a9d3f5] bg-[#eaf5ff] text-[#2d6f9f]",
    priority: 40,
  },
  artist: {
    code: "artist",
    label: "Artist",
    description:
      "Lifetopia visual-art contributor.",
    className:
      "border-[#f2b9d2] bg-[#fff0f7] text-[#a33e70]",
    priority: 50,
  },
  alpha_tester: {
    code: "alpha_tester",
    label: "Alpha Tester",
    description:
      "Participated in Lifetopia Alpha testing.",
    className:
      "border-[#c8b7f5] bg-[#f1edff] text-[#684db0]",
    priority: 60,
  },
  beta_tester: {
    code: "beta_tester",
    label: "Beta Tester",
    description:
      "Participated in Lifetopia Beta testing.",
    className:
      "border-[#9ed7df] bg-[#e9fbfd] text-[#267887]",
    priority: 70,
  },
  lifetopian: {
    code: "lifetopian",
    label: "Lifetopian",
    description:
      "Member of the Lifetopia World community.",
    className:
      "border-[#d8d0bf] bg-[#f8f3e8] text-[#6b5b4a]",
    priority: 80,
  },
};

const BADGE_DEFINITIONS: Record<
  LifetopiaBadgeCode,
  LifetopiaIdentityDefinition
> = {
  ...ROLE_DEFINITIONS,
};

export function isLifetopiaRole(
  value: unknown,
): value is LifetopiaRole {
  return (
    typeof value === "string" &&
    (
      LIFETOPIA_ROLES as readonly string[]
    ).includes(value)
  );
}

export function isLifetopiaBadgeCode(
  value: unknown,
): value is LifetopiaBadgeCode {
  return (
    typeof value === "string" &&
    (
      LIFETOPIA_BADGES as readonly string[]
    ).includes(value)
  );
}

export function normalizeLifetopiaRole(
  value: unknown,
): LifetopiaRole {
  if (value === "player") {
    return "lifetopian";
  }

  return isLifetopiaRole(value)
    ? value
    : "lifetopian";
}

export function getLifetopiaRoleDefinition(
  role: unknown,
): LifetopiaIdentityDefinition {
  return ROLE_DEFINITIONS[
    normalizeLifetopiaRole(role)
  ];
}

export function getLifetopiaRoleLabel(
  role: unknown,
): string {
  return getLifetopiaRoleDefinition(
    role,
  ).label;
}

export function getLifetopiaBadgeDefinition(
  code: unknown,
): LifetopiaIdentityDefinition | null {
  return isLifetopiaBadgeCode(code)
    ? BADGE_DEFINITIONS[code]
    : null;
}

export function sortLifetopiaBadges(
  badges: LifetopiaProfileBadge[],
): LifetopiaProfileBadge[] {
  return [...badges].sort(
    (first, second) => {
      const firstPriority =
        getLifetopiaBadgeDefinition(
          first.code,
        )?.priority ?? 999;

      const secondPriority =
        getLifetopiaBadgeDefinition(
          second.code,
        )?.priority ?? 999;

      return (
        firstPriority -
        secondPriority
      );
    },
  );
}
