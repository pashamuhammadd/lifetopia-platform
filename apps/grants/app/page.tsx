import { BudgetSection } from "@/components/budget";
import { CurrentDevelopmentSection } from "@/components/current-development";
import { FounderNoteSection } from "@/components/founder-note";
import { ImpactSection } from "@/components/impact";
import { ProblemSolutionSection } from "@/components/problem-solution";
import { PublicDevelopmentSection } from "@/components/public-development";
import { RoadmapSection } from "@/components/roadmap";
import { TeamSection } from "@/components/team";
import { WhySupportSection } from "@/components/why-support";

import { DocumentsHub } from "@/components/DocumentsHub";
import { GrantHero } from "@/components/GrantHero";
import { GrantsFooter } from "@/components/GrantsFooter";
import { GrantsNavbar } from "@/components/GrantsNavbar";
import { ProjectSnapshot } from "@/components/ProjectSnapshot";

export default function GrantsPage() {
  return (
    <>
      <GrantsNavbar />

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
    </>
  );
}