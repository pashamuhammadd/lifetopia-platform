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

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<DashboardProfile>();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#fff7e8] px-[clamp(0.75rem,4vw,5rem)] py-[clamp(3rem,8vw,7rem)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-[clamp(1.2rem,3vw,2.5rem)]">
        <DashboardHeader profile={profile} />

        <VerifyEmailBanner isEmailVerified={Boolean(user.email_confirmed_at)} />

        <div className="grid grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.4fr)] gap-[clamp(0.8rem,2vw,1.5rem)]">
          <ProfileCard profile={profile} email={user.email ?? ""} />

          <div className="flex flex-col gap-[clamp(0.8rem,2vw,1.5rem)]">
            <StatsGrid stats={dashboardStats} />
            <QuickActions actions={quickActions} />
          </div>
        </div>
      </div>
    </main>
  );
}