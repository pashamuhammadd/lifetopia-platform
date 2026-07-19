import Link from "next/link";
import { ShieldCheck, Trash2, UserRound } from "lucide-react";

import type { CurrentProfile } from "@/data/profile/current-profile";

import { Avatar } from "@/components/ui/Avatar";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { LogoutSection } from "./LogoutSection";

type SettingsProps = {
  profile: CurrentProfile;
};

export function Settings({ profile }: SettingsProps) {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Settings"
        description="Review the real identity currently connected to your Lifetopia account."
      />

      <SectionCard
        title="Current Identity"
        description="Profile editing will be connected only after its real update and validation flow is ready."
        icon={UserRound}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar
            initials={profile.displayName.charAt(0)}
            src={profile.avatarSrc}
            alt={profile.displayName}
            size={88}
          />

          <dl className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Display Name
              </dt>
              <dd className="mt-1 truncate font-black text-[#2f2418]">
                {profile.displayName}
              </dd>
            </div>

            <div className="rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Username
              </dt>
              <dd className="mt-1 truncate font-black text-[#2f2418]">
                @{profile.username}
              </dd>
            </div>

            <div className="rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Role
              </dt>
              <dd className="mt-1 truncate font-black text-[#2f2418]">
                {profile.role || "Lifetopian"}
              </dd>
            </div>

            <div className="rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3">
              <dt className="text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
                Account Type
              </dt>
              <dd className="mt-1 truncate font-black text-[#2f2418]">
                {profile.accountType || "Community"}
              </dd>
            </div>
          </dl>
        </div>
      </SectionCard>

      <SectionCard
        title="Security Features"
        description="Wallet connection and password-management controls will appear only when their secure flows are connected."
        icon={ShieldCheck}
      >
        <p className="rounded-[18px] border border-[#d9c7ff] bg-[#f3edff] px-4 py-3 text-sm font-black leading-6 text-[#6d4cc2]">
          Solana wallet verification is coming later with a one-time +500 Harmony
          bonus and a minimum verified Harmony Level of 5.
        </p>
      </SectionCard>

      <SectionCard
        title="Danger Zone"
        description="Permanently remove your CommunityHub account and associated personal data."
        icon={Trash2}
      >
        <div className="rounded-[20px] border border-[#f1aaaa] bg-[#fff7f7] p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <div>
            <p className="font-black text-[#8f1e1e]">Delete CommunityHub account</p>
            <p className="mt-1 text-sm font-bold leading-6 text-[#9f4b4b]">
              This action permanently removes your login, profile, posts, messages,
              linked wallet record, and CommunityHub progress.
            </p>
          </div>
          <Link
            href="/account-deletion"
            className="mt-4 inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#c12626] px-5 font-black text-white transition hover:bg-[#a51616] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c12626] focus-visible:ring-offset-2 sm:mt-0 sm:w-auto"
          >
            Delete account
          </Link>
        </div>
      </SectionCard>

      <LogoutSection />
    </div>
  );
}
