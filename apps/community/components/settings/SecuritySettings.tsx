import { ShieldCheck, Wallet } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

export function SecuritySettings() {
  return (
    <SectionCard
      title="Security"
      description="Manage wallet, password, and account access."
      icon={ShieldCheck}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-[22px] bg-[#fffaf0] p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-[18px] bg-[#f3edff] text-[#6d4cc2]">
              <Wallet size={24} />
            </div>

            <div>
              <p className="font-black text-[#2f2418]">Wallet</p>
              <p className="text-sm font-bold text-[#7a5635]">
                Not connected yet
              </p>
            </div>
          </div>

          <Button className="mt-4 rounded-full">Connect Wallet</Button>
        </div>

        <div className="rounded-[22px] bg-[#fffaf0] p-4">
          <p className="font-black text-[#2f2418]">Password</p>
          <p className="mt-1 text-sm font-bold text-[#7a5635]">
            Update your account password.
          </p>

          <button className="mt-4 rounded-full bg-[#edf7df] px-5 py-2.5 text-sm font-black text-[#4f8124]">
            Change Password
          </button>
        </div>
      </div>
    </SectionCard>
  );
}