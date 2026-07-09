import Image from "next/image";
import Link from "next/link";
import { Bell, MessageCircle, Search, Zap } from "lucide-react";

import { getCurrentProfile } from "@/data/profile/current-profile";

export async function TopNavbar() {
  const profile = await getCurrentProfile();

  const displayName = profile?.displayName ?? "Guest";
  const avatarSrc = profile?.avatarSrc;
  const profileHref = profile ? `/user/${profile.username}` : "/login";

  return (
    <header className="sticky top-4 z-10 mb-4 rounded-[24px] border border-[#ead9b8] bg-white/85 p-4 shadow-[0_18px_45px_rgba(88,60,28,0.10)] backdrop-blur">
      <div className="flex items-center gap-3">
        <label className="hidden h-11 flex-1 items-center gap-3 rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 transition focus-within:border-[#6fa83a] focus-within:bg-white md:flex">
          <Search size={18} className="text-[#7a5635]" />
          <input
            placeholder="Search Lifetopia Community..."
            className="w-full bg-transparent text-sm font-bold text-[#2f2418] outline-none placeholder:text-[#9b6635]/70"
          />
        </label>

        <div className="md:hidden">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={76}
            height={50}
            priority
            className="h-auto w-[76px] object-contain"
          />
        </div>

        <div className="ml-auto hidden items-center gap-2 rounded-full border border-[#dfeec9] bg-[#edf7df] px-4 py-2 text-sm font-black text-[#4f8124] md:flex">
          <Zap size={16} />
          <span>240 Harmony</span>
        </div>

        <div className="ml-auto flex gap-2 md:ml-0">
          <button className="relative grid size-11 place-items-center rounded-full bg-[#fff7e8] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]">
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-[#e85d4a] text-[10px] font-black leading-none text-white">
              3
            </span>
          </button>

          <button className="relative grid size-11 place-items-center rounded-full bg-[#fff7e8] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]">
            <MessageCircle size={19} />
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-[#4f8124] text-[10px] font-black leading-none text-white">
              2
            </span>
          </button>

          <Link href={profileHref} className="rounded-full transition hover:scale-105">
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
          </Link>
        </div>
      </div>
    </header>
  );
}