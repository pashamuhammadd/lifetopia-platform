import { redirect } from "next/navigation";
import { PlayerHero } from "@/components/dashboard/PlayerHero";
import { DailyQuestCard } from "@/components/dashboard/DailyQuestCard";
import { CommunityActivity } from "@/components/dashboard/CommunityActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { VerifyEmailBanner } from "@/components/dashboard/VerifyEmailBanner";
import { dashboardStats, quickActions } from "@repo/data/dashboard";
import { createClient } from "@repo/lib/supabase/server";
import type { DashboardProfile } from "@repo/types/dashboard";
import { InventoryPreview } from "@/components/dashboard/InventoryPreview";
import { WalletOverview } from "@/components/dashboard/WalletOverview";
import { LatestNewsPreview } from "@/components/dashboard/LatestNewsPreview";
import { ComingSoonFeatures } from "@/components/dashboard/ComingSoonFeatures";
import { SettingsCard } from "@/components/dashboard/SettingsCard";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<DashboardProfile>();

  if (!profile) redirect("/login");

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(14px,5vw,80px)] py-[clamp(18px,3vw,42px)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-[clamp(12px,1.8vw,24px)]">
        <PlayerHero profile={profile} />

        <VerifyEmailBanner isEmailVerified={Boolean(user.email_confirmed_at)} />

        <StatsGrid stats={dashboardStats} />

        <div className="grid grid-cols-2 gap-[clamp(12px,1.8vw,24px)] max-lg:grid-cols-1">
          <DailyQuestCard />
          <CommunityActivity />
           <InventoryPreview />
          <WalletOverview />
          <ComingSoonFeatures />
          <SettingsCard />
        </div>

        <LatestNewsPreview />
        <QuickActions actions={quickActions} />
      </div>
    </main>
  );
}