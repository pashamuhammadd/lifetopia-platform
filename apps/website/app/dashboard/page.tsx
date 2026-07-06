import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { VerifyEmailBanner } from "@/components/dashboard/VerifyEmailBanner";
import { dashboardStats, quickActions } from "@repo/data/dashboard";
import { createClient } from "@repo/lib/supabase/server";
import type { DashboardProfile } from "@repo/types/dashboard";

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
    <main className="min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(14px,5vw,80px)] py-[clamp(24px,4vw,56px)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-[clamp(14px,2vw,26px)]">
        <DashboardHeader profile={profile} />

        <VerifyEmailBanner isEmailVerified={Boolean(user.email_confirmed_at)} />

        <div className="grid grid-cols-[minmax(17rem,0.85fr)_minmax(0,1.45fr)] gap-[clamp(12px,1.8vw,24px)] max-lg:grid-cols-1">
          <ProfileCard profile={profile} email={user.email ?? ""} />

          <div className="flex flex-col gap-[clamp(12px,1.8vw,24px)]">
            <StatsGrid stats={dashboardStats} />
            <QuickActions actions={quickActions} />
          </div>
        </div>
      </div>
    </main>
  );
}