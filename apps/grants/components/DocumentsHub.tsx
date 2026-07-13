"use client";

import {
  getDocumentCategory,
  getDocuments,
  type DocumentStatus,
} from "@repo/docs-data";
import Link from "next/link";
import { useState } from "react";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type DocumentAccent =
  | "green"
  | "blue"
  | "purple"
  | "gold"
  | "orange";

type DocumentPresentation = {
  icon: string;
  accent: DocumentAccent;
  buttonLabel: string;
};

type HubResource = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: DocumentStatus;
  href: string;
  icon: string;
  accent: DocumentAccent;
  highlights: string[];
  buttonLabel: string;
  updatedAt?: string;
  readingTime?: number;
  version?: string;
};

const docsBaseUrl = (
  process.env.NEXT_PUBLIC_DOCS_URL ??
  "https://docs.lifetopiaworld.io"
).replace(/\/$/, "");

const githubRepositoryUrl =
  "https://github.com/pashamuhammadd/lifetopia-platform";

const documentPresentation: Record<
  string,
  DocumentPresentation
> = {
  "project-overview": {
    icon: "mdi:file-document-outline",
    accent: "green",
    buttonLabel: "Open Project Overview",
  },
  "beta-roadmap": {
    icon: "mdi:map-marker-path",
    accent: "blue",
    buttonLabel: "Open Beta Roadmap",
  },
  "technical-architecture": {
    icon: "mdi:server-network",
    accent: "purple",
    buttonLabel: "Open Architecture",
  },
  "pitch-deck": {
    icon: "mdi:presentation-play",
    accent: "gold",
    buttonLabel: "Review Pitch Deck",
  },
  whitepaper: {
    icon: "mdi:book-open-page-variant-outline",
    accent: "purple",
    buttonLabel: "Open Whitepaper",
  },
};

const fallbackPresentation: DocumentPresentation = {
  icon: "mdi:file-document-outline",
  accent: "green",
  buttonLabel: "Open Document",
};

const sharedDocumentResources: HubResource[] =
  getDocuments("en").map((document) => {
    const presentation =
      documentPresentation[document.slug] ??
      fallbackPresentation;

    const category = getDocumentCategory(
      document.category,
      "en",
    );

    return {
      id: document.slug,
      title: document.title,
      description: document.description,
      category:
        category?.label ?? "Documentation",
      status: document.status,
      href: `${docsBaseUrl}/${document.slug}`,
      icon: presentation.icon,
      accent: presentation.accent,
      highlights: document.sections
        .slice(0, 4)
        .map((section) => section.title),
      buttonLabel: presentation.buttonLabel,
      updatedAt: document.updatedAt,
      readingTime: document.readingTime,
      version: document.version,
    };
  });

const githubResource: HubResource = {
  id: "github-repository",
  title: "GitHub Repository",
  description:
    "Public source code, repository structure, commit history, and development evidence for independent technical verification.",
  category: "Source Code",
  status: "Live",
  href: githubRepositoryUrl,
  icon: "mdi:github",
  accent: "orange",
  highlights: [
    "Public monorepo structure",
    "Verifiable commit history",
    "Application source code",
    "Continuous development evidence",
  ],
  buttonLabel: "Review Repository",
};

const resources: HubResource[] = [
  ...sharedDocumentResources,
  githubResource,
];

const defaultResourceId =
  resources[0]?.id ?? "project-overview";

function getAccentClasses(
  accent: DocumentAccent,
) {
  if (accent === "blue") {
    return {
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      active:
        "border-[#74afd1]/45 bg-[#eef8fd] text-[#347ca6]",
      dot: "bg-[#55a9dc]",
      preview:
        "border-[#74afd1]/25 bg-[linear-gradient(145deg,#ffffff,#f1f9fd)]",
      glow: "bg-[#72c5eb]/18",
      text: "text-[#347ca6]",
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
      text: "text-[#674aab]",
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
      text: "text-[#946c1c]",
    };
  }

  if (accent === "orange") {
    return {
      icon: "border-[#df9847]/20 bg-[#fff0df] text-[#b96b18]",
      active:
        "border-[#e3a052]/45 bg-[#fff3e6] text-[#ae6518]",
      dot: "bg-[#e28a27]",
      preview:
        "border-[#e3a052]/25 bg-[linear-gradient(145deg,#ffffff,#fff7ed)]",
      glow: "bg-[#f0a14a]/18",
      text: "text-[#ae6518]",
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
    text: "text-[#477a34]",
  };
}

function getStatusClasses(
  status: DocumentStatus,
) {
  if (status === "Live") {
    return "border-[#bdd6ae] bg-[#e9f6e1] text-[#477a34]";
  }

  if (status === "Public Draft") {
    return "border-[#c9dfea] bg-[#eaf5fa] text-[#477893]";
  }

  if (status === "In Preparation") {
    return "border-[#e5cf91] bg-[#fff4d7] text-[#936d1f]";
  }

  if (status === "Archived") {
    return "border-[#d7cec2] bg-[#eee8df] text-[#827462]";
  }

  return "border-[#d4cae9] bg-[#f2edfb] text-[#715b9f]";
}

function getStatusDescription(
  status: DocumentStatus,
) {
  if (status === "Live") {
    return "Available now";
  }

  if (status === "Public Draft") {
    return "Public working draft";
  }

  if (status === "In Preparation") {
    return "Currently being prepared";
  }

  if (status === "Archived") {
    return "Archived document";
  }

  return "Planned documentation";
}

function formatUpdatedDate(
  value: string | undefined,
) {
  if (!value) {
    return undefined;
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function DocumentsHub() {
  const [activeResourceId, setActiveResourceId] =
    useState(defaultResourceId);

  const activeResource =
    resources.find(
      (resource) =>
        resource.id === activeResourceId,
    ) ?? resources[0];

  if (!activeResource) {
    return null;
  }

  const activeClasses = getAccentClasses(
    activeResource.accent,
  );

  const sharedDocumentCount =
    sharedDocumentResources.length;

  const publishedCount =
    sharedDocumentResources.filter(
      (resource) =>
        resource.status === "Live" ||
        resource.status === "Public Draft",
    ).length;

  const formattedUpdatedAt =
    formatUpdatedDate(
      activeResource.updatedAt,
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
              Documentation status and content are
              synchronized directly with the official
              Lifetopia documentation portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="grid grid-cols-2 overflow-hidden rounded-[0.72rem] border border-[#d8cbb2] bg-white/68">
              <article className="min-w-[5.8rem] px-3 py-2 text-center">
                <p className="text-[0.58rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Documents
                </p>

                <p className="mt-1 text-[0.9rem] font-black text-[#395d34]">
                  {sharedDocumentCount}
                </p>
              </article>

              <article className="min-w-[5.8rem] border-l border-[#e4d8c2] px-3 py-2 text-center">
                <p className="text-[0.58rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Published
                </p>

                <p className="mt-1 text-[0.9rem] font-black text-[#395d34]">
                  {publishedCount}
                </p>
              </article>
            </div>

            <Link
              href={docsBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-[0.72rem] border border-[#254e2e]/15 bg-[#173b21] px-4 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-white shadow-[0_0.7rem_1.8rem_rgba(31,64,37,0.14)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
            >
              Open Docs Portal
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </header>

        <div className="mt-[clamp(1.2rem,2vw,1.7rem)] grid gap-[clamp(0.9rem,1.6vw,1.25rem)] lg:grid-cols-[minmax(14rem,0.65fr)_minmax(0,1.35fr)]">
          <aside className="min-w-0">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
              {resources.map((resource) => {
                const classes =
                  getAccentClasses(
                    resource.accent,
                  );

                const isActive =
                  resource.id === activeResource.id;

                return (
                  <button
                    key={resource.id}
                    type="button"
                    onClick={() => {
                      setActiveResourceId(
                        resource.id,
                      );
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
                        icon={resource.icon}
                        label={resource.title}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[clamp(0.74rem,0.84vw,0.9rem)] font-black">
                        {resource.title}
                      </span>

                      <span className="mt-1 block truncate text-[clamp(0.62rem,0.7vw,0.76rem)] font-semibold opacity-65">
                        {resource.category}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-1 text-[0.56rem] font-black ${getStatusClasses(
                        resource.status,
                      )}`}
                    >
                      {resource.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

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
                    icon={activeResource.icon}
                    label={activeResource.title}
                  />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[clamp(1rem,1.3vw,1.28rem)] font-black leading-[1.2] text-[#30251c]">
                      {activeResource.title}
                    </h3>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-black ${getStatusClasses(
                        activeResource.status,
                      )}`}
                    >
                      {activeResource.status}
                    </span>
                  </div>

                  <p
                    className={`mt-1.5 text-[0.65rem] font-black uppercase tracking-[0.08em] ${activeClasses.text}`}
                  >
                    {activeResource.category}
                  </p>

                  <p className="mt-1.5 max-w-[39rem] text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold leading-[1.5] text-[#796e5d]">
                    {activeResource.description}
                  </p>
                </div>
              </div>

              <Link
                href={activeResource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.65rem] shrink-0 items-center justify-center gap-2 rounded-[0.7rem] bg-[#173b21] px-4 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-white shadow-[0_0.6rem_1.6rem_rgba(31,64,37,0.13)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
              >
                {activeResource.buttonLabel}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/65 px-2.5 py-2">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Status
                </p>

                <p className="mt-1 truncate text-[0.7rem] font-black text-[#4f5c47]">
                  {getStatusDescription(
                    activeResource.status,
                  )}
                </p>
              </div>

              <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/65 px-2.5 py-2">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Updated
                </p>

                <p className="mt-1 truncate text-[0.7rem] font-black text-[#4f5c47]">
                  {formattedUpdatedAt ?? "External"}
                </p>
              </div>

              <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/65 px-2.5 py-2">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Reading
                </p>

                <p className="mt-1 truncate text-[0.7rem] font-black text-[#4f5c47]">
                  {activeResource.readingTime
                    ? `${activeResource.readingTime} min`
                    : "Repository"}
                </p>
              </div>

              <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/65 px-2.5 py-2">
                <p className="text-[0.56rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  Version
                </p>

                <p className="mt-1 truncate text-[0.7rem] font-black text-[#4f5c47]">
                  {activeResource.version
                    ? `v${activeResource.version}`
                    : "Public"}
                </p>
              </div>
            </div>

            <section className="relative mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.64rem] font-black uppercase tracking-[0.09em] text-[#668255]">
                  Document Coverage
                </p>

                <span className="text-[0.62rem] font-bold text-[#8a7c66]">
                  {
                    activeResource.highlights
                      .length
                  }{" "}
                  sections
                </span>
              </div>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {activeResource.highlights.map(
                  (highlight, index) => (
                    <div
                      key={highlight}
                      className="group flex items-center gap-3 rounded-[0.72rem] border border-[#ded2ba] bg-white/68 px-3 py-2.5 transition hover:border-[#9fbe8d] hover:bg-white"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e8f3df] font-mono text-[0.6rem] font-black text-[#4f803b]">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <p className="text-[clamp(0.68rem,0.77vw,0.84rem)] font-bold leading-[1.4] text-[#675d4e]">
                        {highlight}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </section>

            <footer className="relative mt-4 flex flex-col gap-2 border-t border-[#ded2ba] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[clamp(0.64rem,0.72vw,0.78rem)] font-semibold text-[#847764]">
                Documentation metadata is synchronized
                from the shared monorepo package.
              </p>

              <span className="inline-flex items-center gap-2 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#557f43]">
                <span
                  className={`size-2 rounded-full ${activeClasses.dot}`}
                />
                Shared source of truth
              </span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}