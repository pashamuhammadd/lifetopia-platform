import { CalendarDays, MessageCircle, UserCheck, Users } from "lucide-react";
import Link from "next/link";

import type { PublicProfileData } from "@/data/profile/public-profile";
import { StatCard } from "@/components/ui/StatCard";

export function ProfileStats({ profile }: { profile: PublicProfileData }) {
  const base = `/user/${encodeURIComponent(profile.username)}`;
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Posts" value={String(profile.postsCount)} helper="Community posts" icon={MessageCircle} tone="blue" />
      <Link href={`${base}/followers`} aria-label={`View ${profile.followersCount} followers`}>
        <StatCard label="Followers" value={String(profile.followersCount)} helper="Lifetopians following" icon={Users} tone="green" />
      </Link>
      <Link href={`${base}/following`} aria-label={`View ${profile.followingCount} following`}>
        <StatCard label="Following" value={String(profile.followingCount)} helper="Lifetopians followed" icon={UserCheck} tone="gold" />
      </Link>
      <StatCard label="Joined" value={profile.joinedAt} helper="Member since" icon={CalendarDays} tone="purple" />
    </div>
  );
}
