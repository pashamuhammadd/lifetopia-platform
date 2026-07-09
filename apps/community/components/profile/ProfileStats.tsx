import { CalendarDays, MessageCircle, ShieldCheck, UserRound } from "lucide-react";

import type { PublicProfileData } from "@/data/profile/public-profile";

import { StatCard } from "@/components/ui/StatCard";

type ProfileStatsProps = {
  profile: PublicProfileData;
};

export function ProfileStats({ profile }: ProfileStatsProps) {
  const stats = [
    {
      label: "Posts",
      value: String(profile.postsCount),
      helper: "Community posts",
      icon: MessageCircle,
      tone: "blue" as const,
    },
    {
      label: "Role",
      value: profile.role,
      helper: "Lifetopia identity",
      icon: ShieldCheck,
      tone: "gold" as const,
    },
    {
      label: "Account",
      value: profile.accountType,
      helper: "Account type",
      icon: UserRound,
      tone: "green" as const,
    },
    {
      label: "Joined",
      value: profile.joinedAt,
      helper: "Member since",
      icon: CalendarDays,
      tone: "purple" as const,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}