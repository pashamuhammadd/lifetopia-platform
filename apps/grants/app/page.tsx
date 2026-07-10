import { DocumentsHub } from "@/components/DocumentsHub";
import { GrantHero } from "@/components/GrantHero";
import { GrantRequestSection } from "@/components/GrantRequestSection";
import { GrantsFooter } from "@/components/GrantsFooter";
import { LiveDevelopmentLog } from "@/components/LiveDevelopmentLog";
import { ProjectSnapshot } from "@/components/ProjectSnapshot";

export default function GrantsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <GrantHero />
      <ProjectSnapshot />
      <LiveDevelopmentLog />
      <GrantRequestSection />
      <DocumentsHub />
      <GrantsFooter />
    </main>
  );
}