import { CheckCircle2 } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { completedQuests } from "@/data/quest";

export function CompletedQuestSection() {
  return (
    <SectionCard
      title="Completed Quests"
      description="Your finished milestones in Lifetopia Community."
      icon={CheckCircle2}
    >
      <div className="space-y-3">
        {completedQuests.map((quest) => (
          <div
            key={quest.id}
            className="flex items-center justify-between gap-4 rounded-[22px] bg-[#edf7df] p-4"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-white text-[#4f8124]">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="font-black text-[#2f2418]">{quest.title}</p>
                <p className="text-sm font-bold text-[#7a5635]">
                  Reward claimed
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#4f8124]">
              {quest.reward}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}