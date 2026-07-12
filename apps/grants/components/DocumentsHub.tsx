"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type DocumentStatus = "Live" | "Preparing" | "Planned";

type DocumentAccent =
  | "green"
  | "blue"
  | "purple"
  | "gold"
  | "orange";

type ReviewDocument = {
  index: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  highlights: string[];
  status: DocumentStatus;
  href?: string;
  external?: boolean;
  icon: string;
  accent: DocumentAccent;
};

type DocumentSelectorButtonProps = {
  document: ReviewDocument;
  isActive: boolean;
  compact?: boolean;
  onSelect: () => void;
};

const documents: ReviewDocument[] = [
  {
    index: "01",
    title: "Project Overview",
    category: "Project",
    description:
      "The problem, Lifetopia's solution, ecosystem model, and product direction.",
    summary:
      "Lifetopia World lowers the barrier to Web3 adoption through a familiar cozy game, a community platform, and a future connected marketplace. These products gradually introduce players to wallets, digital ownership, and the Solana ecosystem.",
    highlights: [
      "Problem and solution",
      "Connected product ecosystem",
      "Web3 onboarding approach",
      "Long-term product direction",
    ],
    status: "Live",
    href: "#problem-solution",
    icon: "mdi:file-document-outline",
    accent: "green",
  },
  {
    index: "02",
    title: "Beta Roadmap",
    category: "Delivery",
    description:
      "The three-milestone delivery plan for completing the connected Beta ecosystem.",
    summary:
      "The Beta roadmap divides the funding period into three sequential milestones covering community platform completion, playable Beta expansion, and connected Solana ecosystem delivery.",
    highlights: [
      "Three sequential milestones",
      "8–12 week delivery window",
      "Defined acceptance outcomes",
      "Milestone-linked funding",
    ],
    status: "Live",
    href: "#roadmap",
    icon: "mdi:map-marker-path",
    accent: "blue",
  },
  {
    index: "03",
    title: "Budget & Allocation",
    category: "Finance",
    description:
      "The complete allocation of the requested grant across four defined cost categories.",
    summary:
      "The $10,000 grant request prioritizes product development while reserving dedicated resources for infrastructure, quality assurance, and community onboarding.",
    highlights: [
      "55% product development",
      "20% infrastructure",
      "15% quality assurance",
      "10% community and onboarding",
    ],
    status: "Live",
    href: "#budget",
    icon: "mdi:chart-donut",
    accent: "gold",
  },
  {
    index: "04",
    title: "Technical Architecture",
    category: "Technical",
    description:
      "The monorepo, authentication, backend, application, and deployment architecture.",
    summary:
      "Lifetopia uses a Turborepo monorepo with independently deployed applications and shared packages for authentication, services, data types, and reusable platform logic.",
    highlights: [
      "Next.js and Turborepo",
      "Shared Supabase authentication",
      "Independent applications",
      "Reusable services and types",
    ],
    status: "Preparing",
    icon: "mdi:server-network",
    accent: "purple",
  },
  {
    index: "05",
    title: "GitHub Repository",
    category: "Source Code",
    description:
      "Public source code, project structure, commit history, and development workflows.",
    summary:
      "The Lifetopia repository provides independently reviewable evidence of active development, application structure, public commits, and ongoing technical delivery.",
    highlights: [
      "Public commit history",
      "Monorepo project structure",
      "Development workflows",
      "Continuous product delivery",
    ],
    status: "Live",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
    external: true,
    icon: "mdi:github",
    accent: "orange",
  },
  {
    index: "06",
    title: "Pitch Deck",
    category: "Presentation",
    description:
      "A concise presentation covering the opportunity, execution, funding, and impact.",
    summary:
      "The pitch deck will give grant reviewers and ecosystem partners a concise presentation of Lifetopia World's products, progress, roadmap, budget, and expected Beta impact.",
    highlights: [
      "Project opportunity",
      "Product ecosystem",
      "Execution evidence",
      "Funding and expected impact",
    ],
    status: "Preparing",
    icon: "mdi:presentation",
    accent: "blue",
  },
  {
    index: "07",
    title: "Whitepaper",
    category: "Research",
    description:
      "A future document covering the player economy, ownership model, and broader ecosystem.",
    summary:
      "The whitepaper will be completed after the Beta systems, marketplace foundation, and player economy have been sufficiently validated through real product testing.",
    highlights: [
      "Ecosystem architecture",
      "Player economy",
      "Digital ownership model",
      "Long-term development strategy",
    ],
    status: "Planned",
    icon: "mdi:book-open-page-variant-outline",
    accent: "green",
  },
];

function getAccentClasses(accent: DocumentAccent) {
  if (accent === "blue") {
    return {
      icon: "border-[#65a9d2]/25 bg-[#e7f4fc] text-[#347ca6]",
      active: "border-[#65a9d2]/35 bg-[#f1f9fd]",
      line: "bg-[#4f9fca]",
      soft: "bg-[#edf7fd]",
      text: "text-[#357ca5]",
    };
  }

  if (accent === "purple") {
    return {
      icon: "border-[#9278d7]/25 bg-[#eee9ff] text-[#6d50b4]",
      active: "border-[#9b84dc]/35 bg-[#f8f5ff]",
      line: "bg-[#8c72d6]",
      soft: "bg-[#f3efff]",
      text: "text-[#6b4eaf]",
    };
  }

  if (accent === "gold") {
    return {
      icon: "border-[#d9aa49]/25 bg-[#fff0cb] text-[#9d741d]",
      active: "border-[#ddb866]/40 bg-[#fffaf0]",
      line: "bg-[#dda438]",
      soft: "bg-[#fff6df]",
      text: "text-[#946c1c]",
    };
  }

  if (accent === "orange") {
    return {
      icon: "border-[#df9847]/25 bg-[#fff0df] text-[#b96b18]",
      active: "border-[#e3a052]/35 bg-[#fff8ef]",
      line: "bg-[#e28a27]",
      soft: "bg-[#fff2e4]",
      text: "text-[#ae6518]",
    };
  }

  return {
    icon: "border-[#72aa59]/25 bg-[#e8f4de] text-[#4e8039]",
    active: "border-[#79ad62]/35 bg-[#f4faf0]",
    line: "bg-[#67aa4b]",
    soft: "bg-[#edf7e6]",
    text: "text-[#4c7e38]",
  };
}

function getStatusClasses(status: DocumentStatus) {
  if (status === "Live") {
    return "border-[#70aa58]/25 bg-[#e8f4de] text-[#477b34]";
  }

  if (status === "Preparing") {
    return "border-[#d2aa4e]/25 bg-[#fff3d5] text-[#987020]";
  }

  return "border-[#9380bc]/20 bg-[#f0ebf8] text-[#705d98]";
}

function getStatusDescription(status: DocumentStatus) {
  if (status === "Live") {
    return "Available now";
  }

  if (status === "Preparing") {
    return "In preparation";
  }

  return "Planned resource";
}

function DocumentSelectorButton({
  document,
  isActive,
  compact = false,
  onSelect,
}: DocumentSelectorButtonProps) {
  const accent = getAccentClasses(document.accent);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={[
        "relative flex min-w-0 items-center gap-3 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border px-[clamp(0.75rem,1.2vw,0.95rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-left transition duration-200",
        compact
          ? "w-[16rem] shrink-0 snap-start"
          : "w-full",
        isActive
          ? `${accent.active} shadow-[0_0.6rem_1.8rem_rgba(54,42,24,0.07)]`
          : "border-transparent bg-white/25 hover:border-[#d8cab0] hover:bg-white/60",
      ].join(" ")}
    >
      {isActive ? (
        <span
          aria-hidden="true"
          className={`absolute inset-y-[20%] left-0 w-1 rounded-full ${accent.line}`}
        />
      ) : null}

      <span
        className={`flex size-[clamp(2.5rem,3.8vw,3rem)] shrink-0 items-center justify-center rounded-[clamp(0.6rem,0.95vw,0.78rem)] border ${accent.icon}`}
      >
        <TechnologyIcon
          icon={document.icon}
          label={document.title}
        />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black text-[#9a8d76]">
            {document.index}
          </span>

          <h3 className="truncate text-[clamp(0.86rem,0.96vw,1.02rem)] font-black text-[#30271e]">
            {document.title}
          </h3>
        </div>

        <p className="mt-1 truncate text-[clamp(0.72rem,0.82vw,0.88rem)] font-medium text-[#7c705d]">
          {document.category}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full border px-2.5 py-1 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black ${getStatusClasses(
          document.status,
        )}`}
      >
        {document.status}
      </span>
    </button>
  );
}

function DataRoomAvailability({
  liveDocuments,
}: {
  liveDocuments: number;
}) {
  const availabilityPercentage = Math.round(
    (liveDocuments / documents.length) * 100,
  );

  return (
    <div className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#d8cab0] bg-[#eadfce] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#4f473b]">
            Data room availability
          </p>

          <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] text-[#7c705d]">
            {liveDocuments} of {documents.length} resources available
          </p>
        </div>

        <span className="text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#4f7e3a]">
          {availabilityPercentage}%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d6cab5]">
        <div
          className="h-full rounded-full bg-[#69a94c] transition-[width] duration-500"
          style={{
            width: `${availabilityPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export function DocumentsHub() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const previewRef = useRef<HTMLElement>(null);

  const selectedDocument =
    documents[selectedIndex] ?? documents[0]!;

  const selectedAccent = getAccentClasses(
    selectedDocument.accent,
  );

  const liveDocuments = documents.filter(
    (document) => document.status === "Live",
  ).length;

  function handleDocumentSelect(index: number) {
    setSelectedIndex(index);

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      window.requestAnimationFrame(() => {
        previewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <section
      id="documents"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[4rem] size-[22rem] rounded-full bg-[#e2f1d7]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2rem] right-[-9rem] size-[24rem] rounded-full bg-[#e1eef9]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Grant Review Data Room
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Supporting information for a complete project review.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Review Lifetopia&apos;s strategy, delivery plan, funding
              allocation, technical foundation, source code, and supporting
              materials from one organized data room.
            </p>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-[clamp(0.8rem,1.3vw,1rem)] border border-[#d8c9a9] bg-white shadow-[0_1rem_3rem_rgba(62,47,27,0.07)]">
            <article className="min-w-0 px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-center">
              <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#897a63]">
                Resources
              </p>

              <p className="mt-1 text-[clamp(1.05rem,1.4vw,1.3rem)] font-black text-[#477c35]">
                {documents.length}
              </p>
            </article>

            <article className="min-w-0 border-l border-[#eadfc8] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-center">
              <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#897a63]">
                Available Now
              </p>

              <p className="mt-1 text-[clamp(1.05rem,1.4vw,1.3rem)] font-black text-[#477c35]">
                {liveDocuments}
              </p>
            </article>
          </div>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <div className="overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9caa9] bg-[#f4ecde] shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)] lg:hidden">
            <div className="flex items-center justify-between gap-4 border-b border-[#dfd2b9] px-4 py-3">
              <div>
                <p className="font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.09em] text-[#536044]">
                  Select Resource
                </p>

                <p className="mt-1 text-[clamp(0.76rem,0.86vw,0.92rem)] text-[#7b6e59]">
                  Swipe horizontally to view all resources
                </p>
              </div>

              <span className="rounded-full bg-[#e8dfcf] px-3 py-1 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#756953]">
                {selectedDocument.index}/{documents.length}
              </span>
            </div>

            <div
              aria-label="Project resource selector"
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto p-3"
            >
              {documents.map((document, index) => (
                <DocumentSelectorButton
                  key={document.title}
                  document={document}
                  isActive={selectedIndex === index}
                  compact
                  onSelect={() => {
                    handleDocumentSelect(index);
                  }}
                />
              ))}
            </div>

            <div className="border-t border-[#dfd2b9] p-3">
              <DataRoomAvailability
                liveDocuments={liveDocuments}
              />
            </div>
          </div>

          <div className="mt-3 grid gap-[clamp(0.9rem,1.7vw,1.3rem)] lg:mt-0 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
            <aside className="hidden overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9caa9] bg-[#f4ecde] shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)] lg:block">
              <div className="flex items-center justify-between gap-4 border-b border-[#dfd2b9] px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
                <div>
                  <p className="font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.09em] text-[#536044]">
                    Project Resources
                  </p>

                  <p className="mt-1 text-[clamp(0.78rem,0.88vw,0.94rem)] text-[#7b6e59]">
                    Select a resource to preview
                  </p>
                </div>

                <span className="rounded-full bg-[#e8dfcf] px-3 py-1 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#756953]">
                  lifetopia/
                </span>
              </div>

              <div className="space-y-2 p-[clamp(0.6rem,1vw,0.8rem)]">
                {documents.map((document, index) => (
                  <DocumentSelectorButton
                    key={document.title}
                    document={document}
                    isActive={selectedIndex === index}
                    onSelect={() => {
                      handleDocumentSelect(index);
                    }}
                  />
                ))}
              </div>

              <div className="border-t border-[#dfd2b9] p-[clamp(0.7rem,1.1vw,0.9rem)]">
                <DataRoomAvailability
                  liveDocuments={liveDocuments}
                />
              </div>
            </aside>

            <article
              ref={previewRef}
              aria-live="polite"
              className="scroll-mt-24 overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9caa9] bg-white shadow-[0_1.2rem_4rem_rgba(62,47,27,0.08)]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#e8dcc4] bg-[#faf6ed] px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 gap-1.5"
                  >
                    <span className="size-2.5 rounded-full bg-[#e46c62]" />
                    <span className="size-2.5 rounded-full bg-[#e5ae43]" />
                    <span className="size-2.5 rounded-full bg-[#6ebc55]" />
                  </div>

                  <p className="truncate font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-bold text-[#635c4f]">
                    {selectedDocument.index}-
                    {selectedDocument.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}
                    .md
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[clamp(0.68rem,0.76vw,0.82rem)] font-black ${getStatusClasses(
                    selectedDocument.status,
                  )}`}
                >
                  {getStatusDescription(selectedDocument.status)}
                </span>
              </div>

              <div className="p-[clamp(1rem,2vw,1.7rem)]">
                <div className="flex flex-col gap-[clamp(0.8rem,1.4vw,1.1rem)] sm:flex-row sm:items-start">
                  <span
                    className={`flex size-[clamp(3.5rem,5.5vw,4.5rem)] shrink-0 items-center justify-center rounded-[clamp(0.8rem,1.3vw,1rem)] border ${selectedAccent.icon}`}
                  >
                    <TechnologyIcon
                      icon={selectedDocument.icon}
                      label={selectedDocument.title}
                    />
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] ${selectedAccent.text}`}
                    >
                      {selectedDocument.category}
                    </p>

                    <h3 className="mt-2 text-[clamp(1.55rem,2.7vw,2.5rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#2f2118]">
                      {selectedDocument.title}
                    </h3>

                    <p className="mt-3 max-w-[46rem] text-[clamp(0.9rem,1.02vw,1.08rem)] leading-[1.7] text-[#706452]">
                      {selectedDocument.description}
                    </p>
                  </div>
                </div>

                <section
                  className={`mt-[clamp(1rem,1.8vw,1.4rem)] rounded-[clamp(0.8rem,1.3vw,1rem)] border border-[#ded2b9] p-[clamp(0.85rem,1.5vw,1.15rem)] ${selectedAccent.soft}`}
                >
                  <p
                    className={`font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.09em] ${selectedAccent.text}`}
                  >
                    Executive Summary
                  </p>

                  <p className="mt-3 text-[clamp(0.88rem,1vw,1.06rem)] leading-[1.75] text-[#62594b]">
                    {selectedDocument.summary}
                  </p>
                </section>

                <section className="mt-[clamp(1rem,1.8vw,1.4rem)]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-[#6a7f58]">
                      Key Information
                    </p>

                    <span className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-bold text-[#897c67]">
                      {selectedDocument.highlights.length} highlights
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {selectedDocument.highlights.map(
                      (highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-3 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#e7dcc5] bg-[#fcf8f0] px-[clamp(0.75rem,1.2vw,0.95rem)] py-[clamp(0.7rem,1.1vw,0.88rem)]"
                        >
                          <span
                            className={`mt-[0.4rem] size-2 shrink-0 rounded-full ${selectedAccent.line}`}
                          />

                          <span className="text-[clamp(0.82rem,0.92vw,0.98rem)] font-semibold leading-[1.55] text-[#62594b]">
                            {highlight}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </section>

                <div className="mt-[clamp(1.1rem,2vw,1.5rem)] flex flex-col gap-3 sm:flex-row sm:items-center">
                  {selectedDocument.status === "Live" &&
                  selectedDocument.href ? (
                    <Link
                      href={selectedDocument.href}
                      target={
                        selectedDocument.external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        selectedDocument.external
                          ? "noreferrer"
                          : undefined
                      }
                      className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] bg-[#173e22] px-[clamp(1rem,1.8vw,1.4rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-white shadow-[0_0.8rem_2rem_rgba(23,62,34,0.18)] transition hover:-translate-y-0.5 hover:bg-[#245b31]"
                    >
                      Open {selectedDocument.title}

                      <span aria-hidden="true">
                        {selectedDocument.external
                          ? "↗"
                          : "→"}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex min-h-[3rem] cursor-not-allowed items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#d5c8ae] bg-[#eee6d8] px-[clamp(1rem,1.8vw,1.4rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-[#8a7d68]"
                    >
                      {selectedDocument.status === "Preparing"
                        ? "Document in Preparation"
                        : "Planned Resource"}
                    </button>
                  )}

                  <Link
                    href="mailto:contact@lifetopiaworld.io"
                    className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#d5c8ae] bg-[#fffaf0] px-[clamp(1rem,1.8vw,1.4rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-[#4f4436] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Request More Information
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-[#e8dcc4] bg-[#f6efe3] px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.65rem,1vw,0.8rem)] sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] text-[#8b7e6a]">
                  grants.lifetopiaworld.io / data-room
                </p>

                <span className="flex items-center gap-2 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#4f7d39]">
                  <span className="size-2 rounded-full bg-[#67ac48]" />
                  Reviewer access enabled
                </span>
              </div>
            </article>
          </div>
        </div>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] flex flex-col gap-4 rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#f7f0e3] p-[clamp(1rem,1.8vw,1.5rem)] sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[46rem]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
              Additional Due Diligence
            </p>

            <h3 className="mt-2 text-[clamp(1.1rem,1.5vw,1.4rem)] font-black text-[#30251c]">
              Need a specific document or technical explanation?
            </h3>

            <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
              Additional supporting materials can be prepared when required
              during the grant review process.
            </p>
          </div>

          <Link
            href="mailto:contact@lifetopiaworld.io"
            className="inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] bg-[#173e22] px-[clamp(1rem,1.8vw,1.4rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-white shadow-[0_0.8rem_2rem_rgba(23,62,34,0.18)] transition hover:-translate-y-0.5 hover:bg-[#245b31]"
          >
            Contact the Founder
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}