import { BudgetSection } from "@/components/budget";
import { CurrentDevelopmentSection } from "@/components/current-development";
import { ImpactSection } from "@/components/impact";
import { PublicDevelopmentSection } from "@/components/public-development";
import { RoadmapSection } from "@/components/roadmap";

import { DocumentsHub } from "@/components/DocumentsHub";
import { GrantHero } from "@/components/GrantHero";
import { GrantRequestSection } from "@/components/GrantRequestSection";
import { GrantsFooter } from "@/components/GrantsFooter";
import { ProjectPurposeSection } from "@/components/ProjectPurposeSection";
import { ProjectSnapshot } from "@/components/ProjectSnapshot";
import { ProjectVisionSection } from "@/components/ProjectVisionSection";

export default function GrantsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <GrantHero />

      <ProjectSnapshot />

      <ProjectPurposeSection />

      <ProjectVisionSection />

      <CurrentDevelopmentSection />

      <PublicDevelopmentSection />

      <RoadmapSection />

      <BudgetSection />

      <ImpactSection />

      <GrantRequestSection />

      <DocumentsHub />

      <GrantsFooter />
    </main>
  );
}