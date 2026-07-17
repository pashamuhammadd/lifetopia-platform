import { CalendarDays, ExternalLink, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";

import type { CurrentProfile } from "@/data/profile/current-profile";

import { Avatar } from "@/components/ui/Avatar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";

type MyWorldProps = {
  profile: CurrentProfile;
};

export function MyWorld({ profile }: MyWorldProps) {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="My World"
        description="Your private Lifetopia account dashboard, built only from connected account data."
      />

      <section className="relative overflow-hidden rounded-[30px] border border-[#ead9b8] bg-white/88 p-5 shadow-[0_18px_45px_rgba(88,60,28,0.10)] sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#7dd3fc]/55 via-[#dff7ff]/75 to-[#8bc34a]/45"
        />

        <div className="relative flex flex-col gap-5 pt-8 sm:flex-row sm:items-end">
          <Avatar
            initials={profile.displayName.charAt(0)}
            src={profile.avatarSrc}
            alt={profile.displayName}
            size={112}
          />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f8124]">
              Connected Lifetopian Identity
            </p>
            <h1 className="mt-1 truncate text-[clamp(1.8rem,4vw,2.7rem)] font-black text-[#2f2418]">
              {profile.displayName}
            </h1>
            <p className="mt-1 truncate font-black text-[#7a5635]">
              @{profile.username}
            </p>
          </div>

          <Link
            href={`/user/${encodeURIComponent(profile.username)}`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#cfe5ba] bg-[#edf7df] px-5 text-sm font-black text-[#4f8124] transition hover:bg-white"
          >
            View Public Profile
            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard
          title="Account Identity"
          description="Real information shared across the Lifetopia platform."
          icon={UserRound}
        >
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Role
              </dt>
              <dd className="mt-1 font-black text-[#2f2418]">
                {profile.role || "Lifetopian"}
              </dd>
            </div>
            <div className="rounded-[18px] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Account Type
              </dt>
              <dd className="mt-1 font-black text-[#2f2418]">
                {profile.accountType || "Community"}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard
          title="Connected Systems"
          description="Only systems with real synchronized data will appear here."
          icon={ShieldCheck}
        >
          <div className="flex items-start gap-3 rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] p-4">
            <CalendarDays className="mt-0.5 size-5 shrink-0 text-[#6fa83a]" />
            <p className="text-sm font-black leading-6 text-[#5f4a35]">
              Game level, XP, inventory, currency, achievements, guild, and
              gameplay time remain hidden until the real game synchronization is
              available.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
