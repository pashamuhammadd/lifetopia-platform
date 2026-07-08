import { CheckCircle2, Flame, Sparkles, UsersRound } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { dailyQuests, suggestedPlayers, trends } from "@/data/sidebar";

export function RightSidebar() {
  return (
    <aside className="hidden space-y-4 md:block">
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-[#4f8124]" />
          <h2 className="font-black text-[#2f2418]">Trending</h2>
        </div>

        <div className="mt-4 space-y-3">
          {trends.map((trend) => (
            <button
              key={trend.id}
              className="block w-full rounded-[18px] bg-[#fff7e8] px-4 py-3 text-left transition hover:bg-[#edf7df]"
            >
              <p className="text-sm font-black text-[#4f8124]">
                {trend.label}
              </p>
              <p className="mt-1 text-xs font-bold text-[#7a5635]">
                {trend.posts}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#4f8124]" />
          <h2 className="font-black text-[#2f2418]">Today&apos;s Quest</h2>
        </div>

        <div className="mt-4 space-y-3">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className="flex items-center gap-3 rounded-[18px] bg-[#fff7e8] px-4 py-3"
            >
              <CheckCircle2
                size={18}
                className={
                  quest.completed ? "text-[#4f8124]" : "text-[#d9c99f]"
                }
              />
              <p className="text-sm font-bold text-[#7a5635]">
                {quest.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-[18px] bg-[#edf7df] p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#4f8124]">
            Reward
          </p>
          <p className="mt-1 text-lg font-black text-[#2f2418]">
            +20 Harmony
          </p>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2">
          <UsersRound size={18} className="text-[#4f8124]" />
          <h2 className="font-black text-[#2f2418]">Suggested Players</h2>
        </div>

        <div className="mt-4 space-y-3">
          {suggestedPlayers.map((player) => (
            <div key={player.id} className="flex items-center gap-3">
              <Avatar initials={player.initials} size={40} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#2f2418]">
                  {player.name}
                </p>
                <p className="text-xs font-bold text-[#7a5635]">
                  {player.username}
                </p>
              </div>

              <button className="rounded-full bg-[#fff7e8] px-3 py-1.5 text-xs font-black text-[#4f8124]">
                Follow
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[#dff7ff] via-[#fff7e8] to-[#edf7df] p-5">
          <Badge>Guild Spotlight</Badge>

          <h2 className="mt-3 text-lg font-black leading-tight text-[#2f2418]">
            Sky Farmers Guild
          </h2>

          <p className="mt-2 text-sm font-bold leading-6 text-[#7a5635]">
            Join cozy guilds, complete quests, and grow together with other
            Lifetopians.
          </p>

          <Button className="mt-4 w-full">Explore Guilds</Button>
        </div>
      </Card>
    </aside>
  );
}