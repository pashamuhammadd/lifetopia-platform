import { Trophy } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { guildLeaderboard } from "@/data/guild";

export function GuildLeaderboard() {
  return (
    <SectionCard
      title="Guild Leaderboard"
      description="Top nearby guilds by Harmony contribution."
      icon={Trophy}
    >
      <div className="space-y-3">
        {guildLeaderboard.map((guild) => (
          <div
            key={guild.id}
            className="flex items-center justify-between rounded-[22px] bg-[#fffaf0] p-4"
          >
            <div>
              <p className="font-black text-[#2f2418]">{guild.name}</p>
              <p className="text-sm font-bold text-[#7a5635]">
                {guild.points} Harmony
              </p>
            </div>

            <span className="rounded-full bg-[#fff4dc] px-4 py-2 text-sm font-black text-[#b87912]">
              {guild.rank}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}