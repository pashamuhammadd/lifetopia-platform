"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@repo/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-[#d9c99f] bg-white/70 px-[clamp(14px,1.5vw,24px)] py-[clamp(8px,0.9vw,13px)] text-[clamp(0.62rem,0.85vw,0.92rem)] font-black text-[#7a5635] transition hover:-translate-y-0.5 hover:bg-white"
    >
      Logout
    </button>
  );
}