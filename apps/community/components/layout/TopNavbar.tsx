import { Bell, Compass, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AuthenticatedLink } from "@/components/auth/AuthenticatedLink";
import type { CurrentProfile } from "@/data/profile/current-profile";

type TopNavbarProps = {
  profile: CurrentProfile | null;
};

export function TopNavbar({ profile }: TopNavbarProps) {
  const displayName = profile?.displayName ?? "Guest";
  const avatarSrc = profile?.avatarSrc;
  const profileHref = profile ? `/user/${profile.username}` : "/my-world";

  return (
    <header className="sticky top-3 z-30 mb-4 rounded-[24px] border border-[#ead9b8] bg-white/88 p-3 shadow-[0_18px_45px_rgba(88,60,28,0.10)] backdrop-blur-xl md:top-4 md:p-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="md:hidden" aria-label="Lifetopia Community home">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={76}
            height={50}
            priority
            className="h-auto w-[74px] object-contain"
          />
        </Link>

        <Link
          href="/explore"
          className="hidden min-h-11 flex-1 items-center gap-3 rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 text-sm font-bold text-[#9b6635] transition hover:border-[#6fa83a] hover:bg-white md:flex"
        >
          <Compass size={18} className="text-[#7a5635]" />
          <span>Search posts and explore Lifetopia topics</span>
        </Link>

        <div className="ml-auto hidden rounded-full border border-[#dfeec9] bg-[#edf7df] px-4 py-2 text-xs font-black text-[#4f8124] lg:block">
          Beta Community
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <AuthenticatedLink
            href="/notifications"
            requiresAuth
            aria-label="Open notifications"
            className="grid size-11 place-items-center rounded-full bg-[#fff7e8] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
          >
            <Bell size={19} />
          </AuthenticatedLink>

          <Link
            href="/messages"
            aria-label="Open messages"
            className="relative grid size-11 place-items-center rounded-full bg-[#fff7e8] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]"
          >
            <MessageCircle size={19} />
            <span className="sr-only">Messages are in preparation</span>
          </Link>

          <AuthenticatedLink
            href={profileHref}
            requiresAuth={!profile}
            aria-label={profile ? `Open ${displayName}'s profile` : "Login to Lifetopia"}
            className="rounded-full transition hover:scale-105"
          >
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={displayName}
                width={44}
                height={44}
                className="size-11 rounded-full object-cover ring-2 ring-white/80"
              />
            ) : (
              <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#8bc34a] to-[#4f8124] font-black text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </AuthenticatedLink>
        </div>
      </div>
    </header>
  );
}
