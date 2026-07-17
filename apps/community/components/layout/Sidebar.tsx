import Image from "next/image";

import { AuthenticatedLink } from "@/components/auth/AuthenticatedLink";
import type { CurrentProfile } from "@/data/profile/current-profile";

import { SidebarNav } from "./SidebarNav";

type SidebarProps = {
  profile: CurrentProfile | null;
};

function formatRole(role: string) {
  if (role === "founder") return "World Keeper";
  if (role === "admin") return "World Creator";
  if (role === "developer") return "World Builder";
  if (role === "moderator") return "Guardian";
  if (role === "artist") return "Realm Artist";
  if (role === "alpha_tester") return "Alpha Pioneer";
  if (role === "beta_tester") return "Beta Explorer";
  return "Lifetopian";
}

export function Sidebar({ profile }: SidebarProps) {
  const displayName = profile?.displayName ?? "Guest Lifetopian";
  const username = profile?.username ? `@${profile.username}` : "Explore as guest";
  const avatarSrc = profile?.avatarSrc;
  const initials = displayName.charAt(0).toUpperCase();
  const role = profile ? formatRole(profile.role) : "Visitor";
  const profileHref = profile ? `/user/${profile.username}` : "/my-world";

  return (
    <aside className="hidden rounded-[28px] border border-[#ead9b8] bg-white/80 p-4 shadow-[0_18px_45px_rgba(88,60,28,0.12)] backdrop-blur md:block">
      <div className="flex items-center justify-center px-3 pb-3 pt-1">
        <Image
          src="/images/logo/logo-lifetopia-world.png"
          alt="Lifetopia World"
          width={132}
          height={88}
          priority
          className="h-auto w-[120px] object-contain drop-shadow-[0_8px_16px_rgba(47,36,24,0.16)]"
        />
      </div>

      <div className="mt-3 rounded-[24px] border border-[#ead9b8] bg-[#fffaf0] p-3.5">
        <AuthenticatedLink
          href={profileHref}
          requiresAuth={!profile}
          className="flex items-center gap-3 rounded-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[#6fa83a] focus-visible:ring-offset-2"
        >
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={displayName}
              width={52}
              height={52}
              className="size-[52px] rounded-full object-cover ring-2 ring-white/80"
            />
          ) : (
            <div className="grid size-[52px] place-items-center rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] text-lg font-black text-white">
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-base font-black text-[#2f2418] transition hover:text-[#4f8124]">
              {displayName}
            </p>
            <p className="truncate text-xs font-bold text-[#7a5635]">
              {username}
            </p>
          </div>
        </AuthenticatedLink>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#ead9b8] bg-white/80 px-3 py-1 text-[11px] font-black text-[#9b6635]">
            {role}
          </span>

          {!profile ? (
            <span className="rounded-full border border-[#dfeec9] bg-[#edf7df] px-3 py-1 text-[11px] font-black text-[#4f8124]">
              Login to participate
            </span>
          ) : null}
        </div>
      </div>

      <SidebarNav />

      <div className="mt-5 rounded-[22px] border border-[#dfeec9] bg-gradient-to-br from-[#edf7df] to-[#fff7e8] p-4">
        <p className="text-sm font-black text-[#2f2418]">Harmony Journey</p>
        <p className="mt-1 text-xs font-bold leading-5 text-[#7a5635]">
          Community quests and Harmony rewards are being prepared with real
          progression data.
        </p>
        <span className="mt-3 inline-flex rounded-full border border-[#cfe2bd] bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#4f8124]">
          In Preparation
        </span>
      </div>
    </aside>
  );
}
