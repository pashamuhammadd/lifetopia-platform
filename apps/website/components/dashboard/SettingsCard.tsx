"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@repo/lib/supabase/client";

export function SettingsCard() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4">
        <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
          ⚙️ Settings
        </h2>

        <p className="text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-[#7a5635]">
          Manage your account settings and session.
        </p>
      </div>

      <div className="space-y-3">
        <SettingRow title="Account" desc="Profile settings coming soon." />
        <SettingRow title="Wallet" desc="Solana wallet settings coming soon." />
        <SettingRow title="Notifications" desc="Notification settings coming soon." />

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 w-full rounded-[clamp(14px,1.6vw,22px)] border border-red-200 bg-red-50 px-[clamp(12px,1.5vw,18px)] py-[clamp(10px,1.2vw,14px)] text-left transition hover:-translate-y-0.5 hover:bg-red-100"
        >
          <p className="text-[clamp(0.72rem,1vw,0.95rem)] font-black text-red-700">
            Logout
          </p>
          <p className="mt-1 text-[clamp(0.56rem,0.78vw,0.82rem)] font-semibold text-red-600">
            Sign out from your Lifetopia account.
          </p>
        </button>
      </div>
    </section>
  );
}

function SettingRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[clamp(14px,1.6vw,22px)] border border-[#eadfbd] bg-[#fff8e8]/75 px-[clamp(12px,1.5vw,18px)] py-[clamp(10px,1.2vw,14px)]">
      <p className="text-[clamp(0.72rem,1vw,0.95rem)] font-black text-[#2f1b12]">
        {title}
      </p>

      <p className="mt-1 text-[clamp(0.56rem,0.78vw,0.82rem)] font-semibold text-[#7a5635]">
        {desc}
      </p>
    </div>
  );
}