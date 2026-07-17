import { Shield } from "lucide-react";

import { FeaturePreparation } from "@/components/system/FeaturePreparation";

export function Guild() {
  return (
    <FeaturePreparation
      title="Guilds"
      description="Shared groups that will connect Lifetopia Community with the game world."
      eyebrow="Community + Game"
      icon={Shield}
      note="Guilds will be implemented with real membership, roles, join requests, shared activity, and game synchronization. No fictional guild statistics are shown while that backend is being prepared."
      features={[
        "Public guild profiles and real member lists",
        "Guild roles and join-request management",
        "Community and game activity synchronization",
        "Guild quests after the Harmony system is stable",
      ]}
    />
  );
}
