import { PageHeader } from "@/components/ui/PageHeader";
import { CompletedQuestSection } from "./CompletedQuestSection";
import { DailyQuestSection } from "./DailyQuestSection";
import { SeasonQuestSection } from "./SeasonQuestSection";
import { WeeklyQuestSection } from "./WeeklyQuestSection";

export function Quest() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Quest"
        description="Complete community quests, earn Harmony Points, and grow your Lifetopia identity."
      />

      <SeasonQuestSection />
      <DailyQuestSection />
      <WeeklyQuestSection />
      <CompletedQuestSection />
    </div>
  );
}