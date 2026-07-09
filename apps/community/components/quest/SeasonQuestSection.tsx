import { Trophy } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { seasonQuest } from "@/data/quest";

export function SeasonQuestSection() {
  return (
    <Card className="overflow-hidden">
      <div className="relative bg-gradient-to-br from-[#7dd3fc] via-[#dff7ff] to-[#8bc34a] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.85),transparent_32rem)]" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-black text-[#4f8124] backdrop-blur">
              <Trophy size={16} />
              Season Quest
            </div>

            <h2 className="mt-4 text-3xl font-black text-white drop-shadow md:text-4xl">
              {seasonQuest.title}
            </h2>

            <p className="mt-2 max-w-2xl font-bold leading-7 text-white drop-shadow">
              {seasonQuest.description}
            </p>
          </div>

          <div className="rounded-[24px] bg-white/80 p-5 backdrop-blur md:min-w-[220px]">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9b6635]">
              Reward
            </p>
            <p className="mt-1 text-2xl font-black text-[#2f2418]">
              {seasonQuest.reward}
            </p>

            <Button className="mt-4 w-full rounded-full">View Progress</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}