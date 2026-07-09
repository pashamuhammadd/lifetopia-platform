import { Gem, MessageCircle, UsersRound, UserRoundCheck } from "lucide-react";

import { StatCard } from "@/components/ui/StatCard";
import { publicProfile } from "@/data/profile";

const stats = [
  {
    label: "Harmony",
    value: publicProfile.harmony,
    helper: "Total points",
    icon: Gem,
    tone: "green" as const,
  },
  {
    label: "Posts",
    value: publicProfile.posts,
    helper: "Community posts",
    icon: MessageCircle,
    tone: "blue" as const,
  },
  {
    label: "Followers",
    value: publicProfile.followers,
    helper: "Lifetopians",
    icon: UsersRound,
    tone: "purple" as const,
  },
  {
    label: "Following",
    value: publicProfile.following,
    helper: "Connections",
    icon: UserRoundCheck,
    tone: "gold" as const,
  },
];

export function ProfileStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}