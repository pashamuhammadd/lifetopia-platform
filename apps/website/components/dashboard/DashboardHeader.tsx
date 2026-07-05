import type { DashboardProfile } from "@repo/types/dashboard";

type DashboardHeaderProps = {
  profile: DashboardProfile;
};

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.8rem)]">
      <span className="lt-badge w-fit">Player Dashboard</span>

      <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-[-0.04em] text-[#2f1b12]">
        Welcome back, {profile.display_name}.
      </h1>

      <p className="max-w-[clamp(20rem,55vw,44rem)] text-[clamp(0.8rem,1.15vw,1.1rem)] leading-[1.7] text-[#7a5635]">
        This is your Lifetopia player hub. Your profile, wallet, inventory,
        quests, and game progress will grow from here.
      </p>
    </div>
  );
}