import { LogOut } from "lucide-react";

import { logout } from "@/app/actions/auth";
import { SectionCard } from "@/components/ui/SectionCard";

export function LogoutSection() {
  return (
    <SectionCard
      title="Account"
      description="Sign out from this device."
      icon={LogOut}
    >
      <form action={logout}>
        <button
          type="submit"
          className="rounded-full bg-[#fff0f0] px-5 py-2.5 text-sm font-black text-[#c24141] transition hover:bg-[#ffe3e3]"
        >
          Logout
        </button>
      </form>
    </SectionCard>
  );
}