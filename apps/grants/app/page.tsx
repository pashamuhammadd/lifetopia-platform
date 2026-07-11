import { DevelopmentGrantSection } from "@/components/DevelopmentGrantSection";
import { DocumentsHub } from "@/components/DocumentsHub";
import { GrantHero } from "@/components/GrantHero";
import { GrantsFooter } from "@/components/GrantsFooter";
import { ProjectSnapshot } from "@/components/ProjectSnapshot";
import { ProjectPurposeSection } from "@/components/ProjectPurposeSection";
import { ProjectVisionSection } from "@/components/ProjectVisionSection";

export default function GrantsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <GrantHero />
      <ProjectSnapshot />
      <ProjectVisionSection />
      <DevelopmentGrantSection />
      <DocumentsHub />
      <ProjectPurposeSection />
      <GrantsFooter />
    </main>
  );
}