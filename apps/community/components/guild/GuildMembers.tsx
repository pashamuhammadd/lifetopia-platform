import { UsersRound } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { SectionCard } from "@/components/ui/SectionCard";
import { guildMembers } from "@/data/guild";

export function GuildMembers() {
  return (
    <SectionCard
      title="Guild Members"
      description="Active members of Sky Farmers."
      icon={UsersRound}
    >
      <div className="space-y-4">
        {guildMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar
              initials={member.name.charAt(0)}
              src={member.avatarSrc}
              alt={member.name}
              size={48}
            />

            <div className="min-w-0 flex-1">
              <p className="font-black text-[#2f2418]">{member.name}</p>
              <p className="text-sm font-bold text-[#7a5635]">
                {member.username} · {member.role}
              </p>
            </div>

            <button className="rounded-full bg-[#edf7df] px-4 py-2 text-xs font-black text-[#4f8124]">
              View
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}