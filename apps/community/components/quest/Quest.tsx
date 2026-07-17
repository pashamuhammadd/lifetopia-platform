import { Sparkles } from "lucide-react";

import { FeaturePreparation } from "@/components/system/FeaturePreparation";

export function Quest() {
  return (
    <FeaturePreparation
      title="Community Quests"
      description="Complete meaningful activities and grow your Harmony progression."
      eyebrow="Harmony Progression"
      icon={Sparkles}
      note="Quest progress and Harmony rewards must be calculated from verified activity. Demonstration progress, fake completed quests, and claim buttons have been removed until the real ledger is connected."
      features={[
        "Daily login and meaningful participation quests",
        "Anti-spam rules for posts and comments",
        "A permanent Harmony reward transaction ledger",
        "Community and selected game-activity synchronization",
      ]}
    />
  );
}
