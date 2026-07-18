import Image from "next/image";
import Link from "next/link";

import {
  ProfileIdentityBadges,
} from "@/components/identity/ProfileIdentityBadges";
import {
  Progress,
} from "@/components/ui/Progress";
import type {
  CurrentProfile,
} from "@/data/profile/current-profile";

import {
  SidebarNav,
} from "./SidebarNav";

type SidebarProps = {
  profile: CurrentProfile | null;
};

export function Sidebar({
  profile,
}: SidebarProps) {
  const displayName =
    profile?.displayName ??
    "Guest";

  const username =
    profile?.username
      ? `@${profile.username}`
      : "Not logged in";

  const avatarSrc =
    profile?.avatarSrc;

  const initials =
    displayName
      .charAt(0)
      .toUpperCase();

  const profileHref =
    profile
      ? `/user/${profile.username}`
      : "/login";

  return (
    <aside className="hidden rounded-[28px] border border-[#ead9b8] bg-white/80 p-5 shadow-[0_18px_45px_rgba(88,60,28,0.12)] backdrop-blur md:block">
      <div className="flex items-center justify-center px-3 pb-4 pt-1">
        <Image
          src="/images/logo/logo-lifetopia-world.png"
          alt="Lifetopia World"
          width={132}
          height={88}
          priority
          className="h-auto w-[132px] object-contain drop-shadow-[0_8px_16px_rgba(47,36,24,0.16)]"
        />
      </div>

      <div className="mt-5 rounded-[26px] border border-[#ead9b8] bg-[#fffaf0] p-4">
        <Link
          href={profileHref}
          className="flex items-center gap-3"
        >
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={displayName}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover ring-2 ring-white/80"
            />
          ) : (
            <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] text-lg font-black text-white">
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-lg font-black text-[#2f2418] transition hover:text-[#4f8124]">
              {displayName}
            </p>

            <p className="truncate text-xs font-bold text-[#7a5635]">
              {username}
            </p>
          </div>
        </Link>

        <div className="mt-4 rounded-[18px] bg-white/70 p-3">
          <div className="flex items-center justify-between text-xs font-black text-[#7a5635]">
            <span>
              Harmony Lv. 1
            </span>

            <span>
              240 / 500 XP
            </span>
          </div>

          <div className="mt-2">
            <Progress value={48} />
          </div>
        </div>

        <div className="mt-3">
          {profile ? (
            <ProfileIdentityBadges
              role={profile.role}
              badges={
                profile.badges
              }
              compact
            />
          ) : (
            <span className="rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1 text-[11px] font-black text-[#9b6635]">
              Visitor
            </span>
          )}
        </div>
      </div>

      <SidebarNav />

      <div className="mt-5 rounded-[24px] border border-[#ead9b8] bg-gradient-to-br from-[#fff7e8] to-[#fff1d2] p-4">
        <p className="text-sm font-black text-[#2f2418]">
          Guild Spotlight
        </p>

        <p className="mt-1 text-xs font-bold leading-5 text-[#7a5635]">
          Join cozy guilds, complete
          quests, and grow together.
        </p>

        <button className="mt-3 rounded-full bg-[#4f8124] px-4 py-2 text-xs font-black text-white">
          Explore Guilds
        </button>
      </div>
    </aside>
  );
}