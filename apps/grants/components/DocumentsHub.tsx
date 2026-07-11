"use client";

import Link from "next/link";
import { useState } from "react";

type ReviewDocument = {
  index: string;
  title: string;
  description: string;
  type: string;
  status: "Live" | "Draft" | "Preparing";
  href?: string;
  accent: "green" | "blue" | "purple" | "orange" | "gold";
  summary: string;
  highlights: string[];
};

const documents: ReviewDocument[] = [
  {
    index: "01",
    title: "Project Overview",
    description:
      "Core vision, product scope, ecosystem structure, and current development phase.",
    type: "Overview",
    status: "Live",
    href: "#overview",
    accent: "green",
    summary:
      "Lifetopia World is a cozy fantasy life-sim and social sandbox ecosystem combining a playable game, community platform, shared player identity, and future Solana-powered ownership.",
    highlights: [
      "Playable game prototype",
      "Live community platform",
      "Shared account foundation",
      "Active Beta development",
    ],
  },
  {
    index: "02",
    title: "Grant Milestone Plan",
    description:
      "Three milestone delivery plan covering platform security, Solana identity, and beta onboarding.",
    type: "Milestones",
    status: "Live",
    href: "#grant-request",
    accent: "blue",
    summary:
      "The requested grant will be delivered through three measurable milestones over an estimated 8–12 week development cycle.",
    highlights: [
      "Platform security and community hardening",
      "Solana identity and wallet integration",
      "Game account synchronization",
      "Public Beta onboarding",
    ],
  },
  {
    index: "03",
    title: "Budget Breakdown",
    description:
      "Planned allocation of the requested $10,000 grant across product and ecosystem development.",
    type: "Finance",
    status: "Draft",
    accent: "gold",
    summary:
      "The $10,000 grant request is designed to fund platform hardening, game-account integration, Solana identity infrastructure, onboarding, and technical operations.",
    highlights: [
      "$3,000 platform security and community",
      "$2,500 game-account integration",
      "$2,000 Solana identity layer",
      "$1,500 UI, assets, and onboarding",
      "$1,000 infrastructure and testing",
    ],
  },
  {
    index: "04",
    title: "Technical Architecture",
    description:
      "Monorepo, shared account system, Supabase infrastructure, and cross-app platform architecture.",
    type: "Technical",
    status: "Preparing",
    accent: "purple",
    summary:
      "Lifetopia uses a Turborepo monorepo architecture with independently deployed applications and shared packages for reusable platform logic.",
    highlights: [
      "Next.js monorepo powered by Turborepo",
      "Shared Supabase authentication",
      "Reusable services, types, and UI systems",
      "Independent website, community, grants, and docs apps",
    ],
  },
  {
    index: "05",
    title: "Live Development Log",
    description:
      "Automatically synchronized development history from GitHub Actions and Supabase.",
    type: "Changelog",
    status: "Live",
    href: "#development",
    accent: "orange",
    summary:
      "Every production push is automatically processed through GitHub Actions, sent to the Lifetopia API, stored in Supabase, and displayed publicly.",
    highlights: [
      "Automatic GitHub commit synchronization",
      "Secure server API endpoint",
      "Public Supabase development history",
      "Reusable across all Lifetopia applications",
    ],
  },
  {
    index: "06",
    title: "Media & Brand Kit",
    description:
      "Official Lifetopia World logo, game icon, character artwork, screenshots, and brand materials.",
    type: "Assets",
    status: "Preparing",
    accent: "green",
    summary:
      "The media kit will provide official visual assets for ecosystem partners, grant reviewers, publishers, and media coverage.",
    highlights: [
      "Official Lifetopia World logo",
      "Game icon and main character",
      "Product screenshots",
      "Brand usage guidelines",
    ],
  },
];

function getDocumentAccent(accent: ReviewDocument["accent"]) {
  if (accent === "blue") {
    return {
      icon: "bg-[#e4f2fc] text-[#317cac]",
      line: "bg-[#4a9ed0]",
      preview: "from-[#dff3ff] to-[#f5fbff]",
    };
  }

  if (accent === "purple") {
    return {
      icon: "bg-[#eee8ff] text-[#7459c6]",
      line: "bg-[#896bdb]",
      preview: "from-[#eee9ff] to-[#faf8ff]",
    };
  }

  if (accent === "orange") {
    return {
      icon: "bg-[#fff0df] text-[#cb7618]",
      line: "bg-[#e89429]",
      preview: "from-[#fff0dc] to-[#fffaf3]",
    };
  }

  if (accent === "gold") {
    return {
      icon: "bg-[#fff4cf] text-[#bd8810]",
      line: "bg-[#e2ad25]",
      preview: "from-[#fff3c9] to-[#fffaf0]",
    };
  }

  return {
    icon: "bg-[#e9f4dc] text-[#4f872f]",
    line: "bg-[#69a544]",
    preview: "from-[#e8f4dc] to-[#f9fcf4]",
  };
}

function getStatusClasses(status: ReviewDocument["status"]) {
  if (status === "Live") {
    return "border-[#65a34b]/20 bg-[#e8f4dc] text-[#477f2f]";
  }

  if (status === "Draft") {
    return "border-[#d9a52c]/20 bg-[#fff3cc] text-[#a97812]";
  }

  return "border-[#77649f]/15 bg-[#eee9f7] text-[#6c568d]";
}

function DocumentIcon({
  accent,
}: {
  accent: ReviewDocument["accent"];
}) {
  const styles = getDocumentAccent(accent);

  return (
    <span
      className={`relative flex size-[clamp(1.2rem,2.4vw,2rem)] shrink-0 items-center justify-center rounded-[clamp(0.35rem,0.75vw,0.6rem)] ${styles.icon}`}
    >
      <span className="relative block h-[55%] w-[44%] rounded-[0.08rem] border-[clamp(0.06rem,0.12vw,0.1rem)] border-current">
        <span className="absolute left-[18%] top-[27%] h-[8%] w-[62%] rounded-full bg-current opacity-65" />
        <span className="absolute left-[18%] top-[49%] h-[8%] w-[48%] rounded-full bg-current opacity-45" />
      </span>
    </span>
  );
}

export function DocumentsHub() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedDocument =
    documents[selectedIndex] ?? documents[0]!;

  const selectedAccent = getDocumentAccent(
    selectedDocument.accent,
  );

  return (
    <section
      id="documents"
      className="relative px-[clamp(0.6rem,2vw,1.3rem)] py-[clamp(2.5rem,5.5vw,5rem)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[8%] top-[10%] size-[clamp(10rem,24vw,21rem)] rounded-full bg-[#dff0c5]/40 blur-[clamp(2.5rem,6vw,5rem)]" />
        <div className="absolute -right-[7%] bottom-[3%] size-[clamp(11rem,26vw,23rem)] rounded-full bg-[#d9eef9]/45 blur-[clamp(2.5rem,6vw,5rem)]" />
      </div>

      <div className="grants-container relative">
        <div className="flex items-end justify-between gap-[clamp(0.7rem,2vw,1.5rem)]">
          <div>
            <span className="grants-eyebrow">
              <span aria-hidden="true">▣</span>
              Reviewer Resources
            </span>

            <h2 className="mt-[clamp(0.7rem,1.5vw,1.1rem)] text-[clamp(1.5rem,3.6vw,3rem)] font-extrabold leading-[1] tracking-[-0.045em] text-[#172016]">
              Project Documents Hub
            </h2>

            <p className="mt-[clamp(0.45rem,1vw,0.75rem)] max-w-[46rem] text-[clamp(0.68rem,1vw,0.94rem)] font-medium leading-[1.65] text-[#6b6253]">
              A structured review room containing Lifetopia&apos;s proposal,
              architecture, milestones, budget, development history, and media
              resources.
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-[#5f8a45]/15 bg-[#eaf4df] px-[clamp(0.5rem,1vw,0.8rem)] py-[clamp(0.22rem,0.45vw,0.34rem)] text-[clamp(0.42rem,0.68vw,0.58rem)] font-extrabold text-[#4b7e35]">
            6 Resources
          </span>
        </div>

        <div className="mt-[clamp(1rem,2.2vw,1.7rem)] grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] overflow-hidden rounded-[clamp(0.85rem,2vw,1.55rem)] border border-[#64563e]/12 bg-[#fffaf1] shadow-[0_1.5rem_5rem_rgba(62,47,27,0.11)]">
          <aside className="min-w-0 border-r border-[#64563e]/10 bg-[#f4ecde]">
            <div className="border-b border-[#64563e]/10 px-[clamp(0.5rem,1.3vw,1rem)] py-[clamp(0.45rem,1vw,0.75rem)]">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-mono text-[clamp(0.4rem,0.72vw,0.62rem)] font-black uppercase tracking-[0.08em] text-[#4d543f]">
                  Project Files
                </p>

                <span className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] text-[#8e826d]">
                  lifetopia/
                </span>
              </div>
            </div>

            <div className="p-[clamp(0.35rem,0.9vw,0.7rem)]">
              {documents.map((document, index) => {
                const accent = getDocumentAccent(document.accent);
                const isActive = index === selectedIndex;

                const content = (
                  <article
                    className={[
                      "group relative flex min-w-0 items-center gap-[clamp(0.35rem,0.85vw,0.65rem)] rounded-[clamp(0.45rem,1vw,0.8rem)] px-[clamp(0.4rem,1vw,0.8rem)] py-[clamp(0.42rem,1vw,0.75rem)] transition",
                      isActive
                        ? "bg-white shadow-[0_0.4rem_1.4rem_rgba(55,42,24,0.08)]"
                        : "hover:bg-white/55",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <span
                        className={`absolute inset-y-[18%] left-0 w-[clamp(0.1rem,0.22vw,0.16rem)] rounded-full ${accent.line}`}
                      />
                    ) : null}

                    <DocumentIcon accent={document.accent} />

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center gap-[clamp(0.25rem,0.6vw,0.45rem)]">
                        <span className="font-mono text-[clamp(0.32rem,0.56vw,0.48rem)] font-bold text-[#a09581]">
                          {document.index}
                        </span>

                        <h3 className="truncate text-[clamp(0.48rem,0.9vw,0.75rem)] font-extrabold text-[#242a21]">
                          {document.title}
                        </h3>
                      </div>

                      <p className="mt-[clamp(0.1rem,0.25vw,0.2rem)] truncate text-[clamp(0.34rem,0.6vw,0.52rem)] font-medium text-[#857966]">
                        {document.type}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-[clamp(0.28rem,0.55vw,0.42rem)] py-[clamp(0.08rem,0.18vw,0.14rem)] text-[clamp(0.28rem,0.5vw,0.43rem)] font-extrabold ${getStatusClasses(document.status)}`}
                    >
                      {document.status}
                    </span>
                  </article>
                );

                return (
  <button
    key={document.title}
    type="button"
    onClick={() => setSelectedIndex(index)}
    className="block w-full text-left"
    aria-pressed={isActive}
  >
    {content}
  </button>
);
              })}
            </div>

            <div className="border-t border-[#64563e]/10 p-[clamp(0.45rem,1vw,0.75rem)]">
              <div className="flex items-center justify-between rounded-[clamp(0.45rem,0.9vw,0.7rem)] bg-[#e9dfcf] px-[clamp(0.4rem,0.9vw,0.7rem)] py-[clamp(0.32rem,0.7vw,0.55rem)]">
                <div>
                  <p className="text-[clamp(0.34rem,0.62vw,0.52rem)] font-extrabold text-[#524a3d]">
                    Portal completeness
                  </p>

                  <p className="text-[clamp(0.28rem,0.5vw,0.43rem)] font-medium text-[#8b7f6b]">
                    3 of 6 resources live
                  </p>
                </div>

                <span className="text-[clamp(0.5rem,0.9vw,0.75rem)] font-black text-[#4d8135]">
                  50%
                </span>
              </div>
            </div>
          </aside>

          <div className="relative min-w-0 bg-[#fffdf7]">
            <div className="flex items-center justify-between gap-[clamp(0.4rem,1vw,0.8rem)] border-b border-[#64563e]/10 bg-white/75 px-[clamp(0.55rem,1.5vw,1.2rem)] py-[clamp(0.45rem,1vw,0.75rem)]">
              <div className="flex min-w-0 items-center gap-[clamp(0.3rem,0.7vw,0.55rem)]">
                <span className="size-[clamp(0.36rem,0.65vw,0.52rem)] rounded-full bg-[#65a544]" />

                <p className="truncate font-mono text-[clamp(0.38rem,0.72vw,0.62rem)] font-bold text-[#5d604f]">
                  {selectedDocument.index.toLowerCase()}-
                  {selectedDocument.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}
                  .md
                </p>
              </div>

              <div className="flex items-center gap-[clamp(0.25rem,0.55vw,0.4rem)]">
                <span className="rounded-full bg-[#edf4e7] px-[clamp(0.35rem,0.7vw,0.55rem)] py-[clamp(0.1rem,0.23vw,0.17rem)] font-mono text-[clamp(0.28rem,0.52vw,0.45rem)] font-bold text-[#558139]">
                  READ ONLY
                </span>

                <span className="font-mono text-[clamp(0.4rem,0.72vw,0.62rem)] text-[#948875]">
                  •••
                </span>
              </div>
            </div>

            <div className="relative min-h-[clamp(14rem,30vw,25rem)] overflow-hidden p-[clamp(0.7rem,2vw,1.7rem)]">
              <div
                className={`pointer-events-none absolute -right-[12%] -top-[24%] size-[clamp(8rem,22vw,18rem)] rounded-full bg-gradient-to-br blur-[clamp(2rem,5vw,4rem)] ${selectedAccent.preview}`}
              />

              <div className="relative mx-auto max-w-[44rem]">
                <div className="flex items-start gap-[clamp(0.5rem,1.2vw,0.9rem)]">
                  <DocumentIcon accent={selectedDocument.accent} />

                  <div>
                    <span
                      className={`inline-flex rounded-full border px-[clamp(0.38rem,0.8vw,0.6rem)] py-[clamp(0.12rem,0.28vw,0.2rem)] text-[clamp(0.32rem,0.58vw,0.5rem)] font-extrabold ${getStatusClasses(selectedDocument.status)}`}
                    >
                      {selectedDocument.status} Document
                    </span>

                    <h3 className="mt-[clamp(0.4rem,0.9vw,0.7rem)] text-[clamp(0.9rem,2.2vw,1.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#1d251c]">
                      {selectedDocument.title}
                    </h3>

                    <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] max-w-[38rem] text-[clamp(0.48rem,0.86vw,0.74rem)] font-medium leading-[1.65] text-[#6b6253]">
                      {selectedDocument.description}
                    </p>
                  </div>
                </div>

                <div className="mt-[clamp(0.75rem,1.6vw,1.2rem)] grid grid-cols-3 gap-[clamp(0.3rem,0.8vw,0.6rem)]">
                  {[
                    {
                      label: "Current Phase",
                      value: "Beta",
                    },
                    {
                      label: "Grant Request",
                      value: "$10,000",
                    },
                    {
                      label: "Delivery Plan",
                      value: "8–12 Weeks",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="min-w-0 rounded-[clamp(0.45rem,1vw,0.8rem)] border border-[#695a40]/10 bg-white/72 px-[clamp(0.4rem,1vw,0.75rem)] py-[clamp(0.38rem,0.9vw,0.7rem)] shadow-[0_0.35rem_1.4rem_rgba(56,44,26,0.05)]"
                    >
                      <p className="truncate text-[clamp(0.28rem,0.52vw,0.45rem)] font-extrabold uppercase tracking-[0.06em] text-[#968a76]">
                        {item.label}
                      </p>

                      <p className="mt-[clamp(0.18rem,0.4vw,0.3rem)] truncate text-[clamp(0.48rem,0.92vw,0.76rem)] font-black text-[#3b7137]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-[clamp(0.7rem,1.5vw,1.1rem)] rounded-[clamp(0.55rem,1.15vw,0.9rem)] border border-[#695a40]/10 bg-[#f5efe3] p-[clamp(0.5rem,1.3vw,1rem)]">
                  <p className="font-mono text-[clamp(0.34rem,0.62vw,0.54rem)] font-bold uppercase tracking-[0.08em] text-[#678052]">
                    Executive Summary
                  </p>

                  <p className="mt-[clamp(0.3rem,0.7vw,0.5rem)] text-[clamp(0.44rem,0.78vw,0.68rem)] font-medium leading-[1.7] text-[#625a4b]">
  {selectedDocument.summary}
</p>
                </div>

                  <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] grid grid-cols-2 gap-[clamp(0.3rem,0.7vw,0.55rem)]">
  {selectedDocument.highlights.map((highlight) => (
    <div
      key={highlight}
      className="flex min-w-0 items-start gap-[clamp(0.2rem,0.5vw,0.4rem)] rounded-[clamp(0.42rem,0.9vw,0.7rem)] border border-[#695a40]/10 bg-white/65 px-[clamp(0.4rem,0.9vw,0.7rem)] py-[clamp(0.35rem,0.8vw,0.6rem)]"
    >
      <span className="mt-[0.05rem] shrink-0 text-[clamp(0.36rem,0.62vw,0.52rem)] font-black text-[#5b963d]">
        ✓
      </span>

      <span className="text-[clamp(0.36rem,0.66vw,0.56rem)] font-semibold leading-[1.4] text-[#625a4b]">
        {highlight}
      </span>
    </div>
  ))}
</div>

                <div className="mt-[clamp(0.65rem,1.4vw,1rem)] flex flex-wrap gap-[clamp(0.35rem,0.8vw,0.6rem)]">
                  <Link
  href={selectedDocument.href ?? "#documents"}
  className="grants-button-primary min-h-[clamp(2rem,3.4vw,2.65rem)] px-[clamp(0.7rem,1.4vw,1rem)] text-[clamp(0.48rem,0.78vw,0.68rem)]"
>
  {selectedDocument.href
    ? `Open ${selectedDocument.type}`
    : "Document Preparing"}

  <span aria-hidden="true">
    {selectedDocument.href ? "↗" : "•"}
  </span>
</Link>

                  <Link
                    href="#development"
                    className="grants-button-secondary min-h-[clamp(2rem,3.4vw,2.65rem)] px-[clamp(0.7rem,1.4vw,1rem)] text-[clamp(0.48rem,0.78vw,0.68rem)]"
                  >
                    View Development
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#64563e]/10 bg-[#f6efe3] px-[clamp(0.5rem,1.2vw,0.9rem)] py-[clamp(0.35rem,0.8vw,0.6rem)]">
              <p className="truncate font-mono text-[clamp(0.28rem,0.52vw,0.45rem)] text-[#8e826f]">
                grants.lifetopiaworld.io / documents
              </p>

              <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.45vw,0.35rem)] font-mono text-[clamp(0.28rem,0.52vw,0.45rem)] font-bold text-[#4f7d39]">
                <span className="size-[clamp(0.24rem,0.42vw,0.34rem)] rounded-full bg-[#67ac48]" />
                Reviewer-ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}