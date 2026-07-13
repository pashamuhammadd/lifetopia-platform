"use client";

import Link from "next/link";
import { useState } from "react";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type DocumentStatus = "Live" | "Preparing" | "Planned";
type DocumentAccent = "green" | "blue" | "purple" | "gold";

type DocumentItem = {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  href: string;
  icon: string;
  accent: DocumentAccent;
  contents: string[];
  externalLabel: string;
};

const documents: DocumentItem[] = [
  {
    id: "project-overview",
    title: "Project Overview",
    description:
      "A concise introduction to Lifetopia World, its products, current phase, and funding request.",
    status: "Live",
    href: "https://docs.lifetopiaworld.io/project-overview",
    icon: "mdi:file-document-outline",
    accent: "green",
    contents: [
      "Project vision and product ecosystem",
      "Current development status",
      "Existing public products",
      "Grant request and intended outcome",
    ],
    externalLabel: "Open Project Overview",
  },
  {
    id: "beta-roadmap",
    title: "Beta Roadmap",
    description:
      "The milestone-based delivery plan for completing the connected Lifetopia Beta.",
    status: "Live",
    href: "https://docs.lifetopiaworld.io/beta-roadmap",
    icon: "mdi:map-marker-path",
    accent: "blue",
    contents: [
      "Three funded milestones",
      "Delivery timeline",
      "Core deliverables",
      "Reviewable milestone outcomes",
    ],
    externalLabel: "Open Beta Roadmap",
  },
  {
    id: "technical-architecture",
    title: "Technical Architecture",
    description:
      "An overview of the game, community platform, backend, shared identity, and Solana integration.",
    status: "Live",
    href: "https://docs.lifetopiaworld.io/technical-architecture",
    icon: "mdi:server-network",
    accent: "purple",
    contents: [
      "Product and monorepo architecture",
      "Authentication and shared identity",
      "Backend and data foundation",
      "Blockchain integration direction",
    ],
    externalLabel: "Open Architecture",
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck",
    description:
      "A visual presentation of Lifetopia’s opportunity, progress, team, funding, and Beta strategy.",
    status: "Preparing",
    href: "https://docs.lifetopiaworld.io/pitch-deck",
    icon: "mdi:presentation-play",
    accent: "gold",
    contents: [
      "Problem and opportunity",
      "Product demonstrations",
      "Roadmap and funding",
      "Team and expected impact",
    ],
    externalLabel: "Review Pitch Deck",
  },
  {
    id: "whitepaper",
    title: "Whitepaper",
    description:
      "The long-form product, ecosystem, economy, and Web3 participation document.",
    status: "Planned",
    href: "https://docs.lifetopiaworld.io/whitepaper",
    icon: "mdi:book-open-page-variant-outline",
    accent: "purple",
    contents: [
      "Game and community ecosystem",
      "Player identity and ownership",
      "Economy and marketplace direction",
      "Long-term development vision",
    ],
    externalLabel: "Open Whitepaper",
  },
  {
    id: "github",
    title: "GitHub Repository",
    description:
      "Public source code and development history for independent technical verification.",
    status: "Live",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
    icon: "mdi:github",
    accent: "green",
    contents: [
      "Public monorepo structure",
      "Commit history",
      "Application source code",
      "Development evidence",
    ],
    externalLabel: "Review Repository",
  },
];

function getDocumentClasses(accent: DocumentAccent) {
  if (accent === "blue") {
    return {
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      active:
        "border-[#74afd1]/45 bg-[#eef8fd] text-[#347ca6]",
      dot: "bg-[#55a9dc]",
      preview:
        "border-[#74afd1]/25 bg-[linear-gradient(145deg,#ffffff,#f1f9fd)]",
      glow: "bg-[#72c5eb]/18",
    };
  }

  if (accent === "purple") {
    return {
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      active:
        "border-[#9b84dc]/45 bg-[#f3efff] text-[#674aab]",
      dot: "bg-[#9177dc]",
      preview:
        "border-[#9b84dc]/25 bg-[linear-gradient(145deg,#ffffff,#f7f4ff)]",
      glow: "bg-[#9b7de5]/18",
    };
  }

  if (accent === "gold") {
    return {
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#9e741d]",
      active:
        "border-[#ddb866]/45 bg-[#fff5dc] text-[#946c1c]",
      dot: "bg-[#e4aa3b]",
      preview:
        "border-[#ddb866]/25 bg-[linear-gradient(145deg,#ffffff,#fff8e8)]",
      glow: "bg-[#f4c45e]/20",
    };
  }

  return {
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    active:
      "border-[#79ad62]/45 bg-[#edf7e7] text-[#477a34]",
    dot: "bg-[#68ad4a]",
    preview:
      "border-[#79ad62]/25 bg-[linear-gradient(145deg,#ffffff,#f4faf0)]",
    glow: "bg-[#9fd969]/20",
  };
}

function getStatusClasses(status: DocumentStatus) {
  if (status === "Live") {
    return "border-[#bcd8ad] bg-[#e9f6e1] text-[#477a34]";
  }

  if (status === "Preparing") {
    return "border-[#e5cf91] bg-[#fff4d7] text-[#936d1f]";
  }

  return "border-[#d4cae9] bg-[#f2edfb] text-[#715b9f]";
}

export function DocumentsHub() {
  const [activeDocumentId, setActiveDocumentId] =
    useState(documents[0]!.id);

  const activeDocument =
    documents.find(
      (document) => document.id === activeDocumentId,
    ) ?? documents[0]!;

  const activeClasses = getDocumentClasses(
    activeDocument.accent,
  );

  return (
    <section
      id="documents"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 size-80 rounded-full bg-[#dcefd0]/50 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#e8dff7]/45 blur-[7rem]"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.11]" />

      <div className="grants-container relative">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[45rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Reviewer Documents
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[19ch] text-[clamp(1.7rem,2.8vw,2.7rem)] font-black leading-[1.03] tracking-[-0.04em] text-[#2f2118]">
              Review the project beyond the landing page.
            </h2>

            <p className="mt-[clamp(0.5rem,0.9vw,0.75rem)] max-w-[42rem] text-[clamp(0.82rem,0.94vw,0.98rem)] leading-[1.55] text-[#706452]">
              Detailed documents are published through the Lifetopia
              documentation portal for direct and independent review.
            </p>
          </div>

          <Link
            href="https://docs.lifetopiaworld.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.75rem] w-fit items-center justify-center gap-2 rounded-[0.72rem] border border-[#254e2e]/15 bg-[#173b21] px-4 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-white shadow-[0_0.7rem_1.8rem_rgba(31,64,37,0.14)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
          >
            Open Documentation Portal
            <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <div className="mt-[clamp(1.2rem,2vw,1.7rem)] grid gap-[clamp(0.9rem,1.6vw,1.25rem)] lg:grid-cols-[minmax(14rem,0.65fr)_minmax(0,1.35fr)]">
          <div className="min-w-0">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
              {documents.map((document) => {
                const classes = getDocumentClasses(
                  document.accent,
                );

                const isActive =
                  document.id === activeDocument.id;

                return (
                  <button
                    key={document.id}
                    type="button"
                    onClick={() => {
                      setActiveDocumentId(document.id);
                    }}
                    aria-pressed={isActive}
                    className={[
                      "group flex min-w-[15rem] items-center gap-3 rounded-[0.82rem] border px-3 py-2.5 text-left shadow-[0_0.5rem_1.6rem_rgba(61,47,27,0.045)] transition duration-200 lg:min-w-0",
                      isActive
                        ? `${classes.active} -translate-y-0.5 shadow-[0_0.8rem_2rem_rgba(61,47,27,0.08)]`
                        : "border-[#ddd1ba] bg-white/68 text-[#625747] hover:-translate-y-0.5 hover:border-[#aabe99] hover:bg-white",
                    ].join(" ")}
                  >
                    <span
                      className={`flex size-[2.45rem] shrink-0 items-center justify-center rounded-[0.65rem] border transition duration-200 group-hover:scale-105 ${classes.icon}`}
                    >
                      <TechnologyIcon
                        icon={document.icon}
                        label={document.title}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[clamp(0.74rem,0.84vw,0.9rem)] font-black">
                        {document.title}
                      </span>

                      <span className="mt-1 block truncate text-[clamp(0.62rem,0.7vw,0.76rem)] font-semibold opacity-65">
                        {document.description}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-1 text-[0.58rem] font-black ${getStatusClasses(
                        document.status,
                      )}`}
                    >
                      {document.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className={`relative min-w-0 overflow-hidden rounded-[1rem] border p-[clamp(0.9rem,1.5vw,1.2rem)] shadow-[0_1rem_3.2rem_rgba(61,47,27,0.08)] ${activeClasses.preview}`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-3xl ${activeClasses.glow}`}
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`flex size-[clamp(2.8rem,4vw,3.4rem)] shrink-0 items-center justify-center rounded-[0.78rem] border ${activeClasses.icon}`}
                >
                  <TechnologyIcon
                    icon={activeDocument.icon}
                    label={activeDocument.title}
                  />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[clamp(1rem,1.3vw,1.28rem)] font-black leading-[1.2] text-[#30251c]">
                      {activeDocument.title}
                    </h3>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-black ${getStatusClasses(
                        activeDocument.status,
                      )}`}
                    >
                      {activeDocument.status}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-[39rem] text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold leading-[1.5] text-[#796e5d]">
                    {activeDocument.description}
                  </p>
                </div>
              </div>

              <Link
                href={activeDocument.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.65rem] shrink-0 items-center justify-center gap-2 rounded-[0.7rem] bg-[#173b21] px-4 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-white shadow-[0_0.6rem_1.6rem_rgba(31,64,37,0.13)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
              >
                {activeDocument.externalLabel}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
              {activeDocument.contents.map((content, index) => (
                <div
                  key={content}
                  className="group flex items-center gap-3 rounded-[0.72rem] border border-[#ded2ba] bg-white/68 px-3 py-2.5 transition hover:border-[#9fbe8d] hover:bg-white"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e8f3df] font-mono text-[0.62rem] font-black text-[#4f803b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-[clamp(0.68rem,0.77vw,0.84rem)] font-bold leading-[1.4] text-[#675d4e]">
                    {content}
                  </p>
                </div>
              ))}
            </div>

            <footer className="relative mt-4 flex flex-col gap-2 border-t border-[#ded2ba] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[clamp(0.64rem,0.72vw,0.78rem)] font-semibold text-[#847764]">
                Hosted independently at docs.lifetopiaworld.io
              </p>

              <span className="inline-flex items-center gap-2 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#557f43]">
                <span
                  className={`size-2 rounded-full ${activeClasses.dot}`}
                />
                Reviewer-accessible route
              </span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}