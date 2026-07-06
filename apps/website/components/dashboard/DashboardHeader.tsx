import Link from "next/link";
import type { DashboardProfile } from "@repo/types/dashboard";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

type DashboardHeaderProps = {
  profile: DashboardProfile;
};

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <header className="rounded-[clamp(22px,3vw,38px)] border border-white/80 bg-white/60 p-[clamp(16px,2.5vw,34px)] shadow-[0_24px_80px_rgba(88,60,28,0.12)] backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <span className="lt-badge w-fit">Lifetopian Dashboard 🍃</span>

          <h1 className="mt-3 text-[clamp(1.55rem,4vw,4.25rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f1b12]">
            Welcome back,
            <span className="block text-[#4f8124]">
              {profile.display_name || "Lifetopian"}.
            </span>
          </h1>

          <p className="mt-3 max-w-[clamp(20rem,55vw,44rem)] text-[clamp(0.72rem,1vw,1rem)] font-semibold leading-[1.7] text-[#7a5635]">
            This is your cozy player hub. Manage your identity, prepare your
            journey, and get ready for the next chapter of Lifetopia World.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="lt-button-secondary px-[clamp(14px,1.5vw,24px)] py-[clamp(8px,0.9vw,13px)] text-[clamp(0.62rem,0.85vw,0.92rem)]"
          >
            Back to Home
          </Link>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}