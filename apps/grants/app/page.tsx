import { BudgetSection } from "@/components/budget";
import { CurrentDevelopmentSection } from "@/components/current-development";
import { ImpactSection } from "@/components/impact";
import { PublicDevelopmentSection } from "@/components/public-development";
import { RoadmapSection } from "@/components/roadmap";
import { TeamSection } from "@/components/team";
import { WhySupportSection } from "@/components/why-support";
import { FounderNoteSection } from "@/components/founder-note";
import { ProblemSolutionSection } from "@/components/problem-solution";

import { DocumentsHub } from "@/components/DocumentsHub";
import { GrantHero } from "@/components/GrantHero";
import { GrantsFooter } from "@/components/GrantsFooter";
import { ProjectSnapshot } from "@/components/ProjectSnapshot";

export default function GrantsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GrantHero />

      <ProjectSnapshot />

      <ProblemSolutionSection />

      <CurrentDevelopmentSection />

      <PublicDevelopmentSection />

      <RoadmapSection />

      <BudgetSection />

      <ImpactSection />

      <WhySupportSection />

      <DocumentsHub />

      <TeamSection />

      <FounderNoteSection />

      <GrantsFooter />
    </main>
  );
}