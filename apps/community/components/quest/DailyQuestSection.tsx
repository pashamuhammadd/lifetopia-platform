import { Sparkles } from "lucide-react";

import { Progress } from "@/components/ui/Progress";
import { SectionCard } from "@/components/ui/SectionCard";
import { dailyQuests } from "@/data/quest";

export function DailyQuestSection() {
  return (
    <SectionCard
      title="Daily Quests"
      description="Small daily actions to keep your Lifetopia journey alive."
      icon={Sparkles}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {dailyQuests.map((quest) => {
          const progressValue = Math.min(
            100,
            Math.round((quest.progress / quest.max) * 100),
          );

          return (
            <article
              key={quest.id}
              className="rounded-[22px] bg-[#fffaf0] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-[#2f2418]">{quest.title}</h3>
                  <p className="mt-1 text-sm font-bold text-[#7a5635]">
                    {quest.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#edf7df] px-3 py-1 text-xs font-black text-[#4f8124]">
                  {quest.reward}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-black text-[#7a5635]">
                <span>
                  {quest.progress} / {quest.max}
                </span>
                <span>{progressValue}%</span>
              </div>

              <div className="mt-2">
                <Progress value={progressValue} />
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}