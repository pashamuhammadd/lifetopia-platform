import Image from "next/image";
import Link from "next/link";
import { ProfileIdentityBadges } from "@/components/identity/ProfileIdentityBadges";
import { Progress } from "@/components/ui/Progress";
import type { CurrentProfile } from "@/data/profile/current-profile";
import { SidebarNav } from "./SidebarNav";
export function Sidebar({ profile }: { profile: CurrentProfile | null }) {
  const displayName = profile?.displayName ?? "Guest";
  const username = profile?.username ? `@${profile.username}` : "Not logged in";
  const profileHref = profile ? `/user/${profile.username}` : "/login";
  return (
    <aside className="hidden rounded-[28px] border border-[#ead9b8] bg-white/80 p-5 shadow-[0_18px_45px_rgba(88,60,28,0.12)] backdrop-blur md:block">
      <div className="flex items-center justify-center px-3 pb-4 pt-1">
        <Image
          src="/images/logo/logo-lifetopia-world.png"
          alt="Lifetopia World"
          width={132}
          height={88}
          priority
          className="h-auto w-[132px] object-contain"
        />
      </div>
      <div className="mt-5 rounded-[26px] border border-[#ead9b8] bg-[#fffaf0] p-4">
        <Link href={profileHref} className="flex items-center gap-3">
          {profile?.avatarSrc ? (
            <Image
              src={profile.avatarSrc}
              alt={displayName}
              width={56}
              height={56}
              className="size-14 rounded-full object-cover ring-2 ring-white/80"
            />
          ) : (
            <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] text-lg font-black text-white">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-black text-[#2f2418]">{displayName}</p>
            <p className="truncate text-xs font-bold text-[#7a5635]">{username}</p>
          </div>
        </Link>
        <Link
          href="/quest"
          className="mt-4 block rounded-[18px] bg-white/70 p-3 transition hover:bg-white"
        >
          <div className="flex items-center justify-between text-xs font-black text-[#7a5635]">
            <span>Harmony Lv. {profile?.harmonyLevel ?? 1}</span>
            <span>
              {profile?.harmonyLevelProgress ?? 0} / {profile?.harmonyLevelTarget ?? 500} XP
            </span>
          </div>
          <div className="mt-2">
            <Progress
              value={
                profile ? (profile.harmonyLevelProgress / profile.harmonyLevelTarget) * 100 : 0
              }
            />
          </div>
          <p className="mt-2 text-xs font-black text-[#4f8124]">
            {(profile?.harmonyPoints ?? 0).toLocaleString()} Harmony
          </p>
        </Link>
        <div className="mt-3">
          {profile ? (
            <ProfileIdentityBadges role={profile.role} badges={profile.badges} compact />
          ) : (
            <span className="rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1 text-[11px] font-black text-[#9b6635]">
              Visitor
            </span>
          )}
        </div>
      </div>
      <SidebarNav />
      <div className="mt-5 rounded-[24px] border border-[#ead9b8] bg-gradient-to-br from-[#fff7e8] to-[#fff1d2] p-4">
        <p className="text-sm font-black text-[#2f2418]">Daily Community Quest</p>
        <p className="mt-1 text-xs font-bold leading-5 text-[#7a5635]">
          Complete meaningful activities and earn Harmony.
        </p>
        <Link
          href="/quest"
          className="mt-3 inline-flex rounded-full bg-[#4f8124] px-4 py-2 text-xs font-black text-white"
        >
          Open Quest
        </Link>
      </div>
    </aside>
  );
}
