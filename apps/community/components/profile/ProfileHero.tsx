import { MapPin } from "lucide-react";

import type { PublicProfileData } from "@/data/profile/public-profile";
import { Avatar } from "@/components/ui/Avatar";
import { FollowButton } from "./FollowButton";

type ProfileHeroProps = { profile: PublicProfileData };

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#ead9b8] bg-white/85 shadow-[0_18px_45px_rgba(88,60,28,0.10)]">
      <div className="relative h-44 bg-gradient-to-br from-[#7dd3fc] via-[#dff7ff] to-[#8bc34a] md:h-56">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.85),transparent_32rem)]" />
      </div>
      <div className="relative px-5 pb-6 md:px-6">
        <div className="-mt-16 flex flex-col gap-5 md:-mt-20 md:flex-row md:items-end">
          <Avatar initials={profile.displayName.charAt(0)} src={profile.avatarSrc} alt={profile.displayName} size={132} />
          <div className="min-w-0 flex-1">
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#2f2418]">{profile.displayName}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-bold text-[#7a5635]">
              <span>@{profile.username}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={15} />Lifetopia World</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1 text-xs font-black text-[#9b6635]">{profile.role}</span>
              <span className="rounded-full border border-[#dfeec9] bg-[#edf7df] px-3 py-1 text-xs font-black text-[#4f8124]">{profile.accountType}</span>
            </div>
          </div>
          <FollowButton targetProfileId={profile.id} initialIsFollowing={profile.viewerIsFollowing} isOwnProfile={profile.isOwnProfile} />
        </div>
      </div>
    </section>
  );
}
