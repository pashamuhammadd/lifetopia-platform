import { Compass } from "lucide-react";

import { FeaturePreparation } from "@/components/system/FeaturePreparation";

export function Explore() {
  return (
    <FeaturePreparation
      title="Explore"
      description="Discover conversations, topics, and Lifetopians across the community."
      eyebrow="Discovery System"
      icon={Compass}
      note="The previous Explore page used demonstration content. It has been replaced with an honest preparation state until search and discovery use real community data."
      features={[
        "Search public posts by words or phrases",
        "Discover the final Lifetopia post categories",
        "Find public Lifetopian profiles",
        "Surface trending posts without fabricated activity",
      ]}
    />
  );
}
