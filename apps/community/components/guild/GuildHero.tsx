import { ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { guildStats } from "@/data/guild";

export function GuildHero() {
  return (
    <Card className="overflow-hidden">
      <div className="relative bg-gradient-to-br from-[#7dd3fc] via-[#dff7ff] to-[#8bc34a] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.85),transparent_32rem)]" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-black text-[#4f8124] backdrop-blur">
              <ShieldCheck size={16} />
              Active Guild
            </div>

            <h2 className="mt-4 text-4xl font-black text-white drop-shadow">
              Sky Farmers
            </h2>

            <p className="mt-2 max-w-2xl font-bold leading-7 text-white drop-shadow">
              A cozy farming guild for Lifetopians who love community quests,
              harvesting, crafting, and peaceful adventures.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:min-w-[360px]">
            {guildStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-[22px] bg-white/80 p-4 text-center backdrop-blur"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9b6635]">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-black text-[#2f2418]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          <Button className="rounded-full">
            <Sparkles size={16} className="mr-2" />
            Join Guild
          </Button>

          <button className="rounded-full bg-white/80 px-5 py-2.5 text-sm font-black text-[#4f8124] backdrop-blur">
            View Guild Quest
          </button>
        </div>
      </div>
    </Card>
  );
}