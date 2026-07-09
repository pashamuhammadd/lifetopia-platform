import { UserRound } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

export function ProfileSettings() {
  return (
    <SectionCard
      title="Profile"
      description="Update your public Lifetopia identity."
      icon={UserRound}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start">
        <Avatar
          initials="P"
          src="/images/avatars/avatar-01.jpg"
          alt="Pasha"
          size={86}
        />

        <div className="grid flex-1 gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-black text-[#7a5635]">
              Display Name
            </span>
            <input
              defaultValue="Pasha"
              className="h-12 w-full rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 font-bold outline-none focus:border-[#6fa83a]"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-black text-[#7a5635]">
              Username
            </span>
            <input
              defaultValue="pashamuhammad"
              className="h-12 w-full rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 font-bold outline-none focus:border-[#6fa83a]"
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-black text-[#7a5635]">Bio</span>
            <textarea
              defaultValue="Building Lifetopia World, a cozy social life simulation game connected with community, quests, and Harmony Points."
              className="min-h-28 w-full resize-none rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3 font-bold outline-none focus:border-[#6fa83a]"
            />
          </label>

          <div className="md:col-span-2">
            <Button className="rounded-full">Save Profile</Button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}