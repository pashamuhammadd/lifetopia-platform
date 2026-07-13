import Link from "next/link";
import { cache } from "react";
import { createClient } from "@repo/lib/supabase/server";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type DevelopmentLog = {
  id: string;
  branch: string | null;
  commit_sha: string | null;
  commit_message: string | null;
  commit_url: string | null;
  author_username: string | null;
  app_area: string | null;
  category: string | null;
  pushed_at: string | null;
};

type DevelopmentFeedResult = {
  logs: DevelopmentLog[];
  availability: "available" | "unavailable";
};

const repositoryUrl =
  "https://github.com/pashamuhammadd/lifetopia-platform";

const evidencePoints = [
  {
    title: "Public Repository",
    description: "Source code and commit history",
    icon: "mdi:github",
  },
  {
    title: "Recorded Activity",
    description: "Development updates from the team",
    icon: "mdi:source-commit",
  },
  {
    title: "Independent Review",
    description: "Evidence can be verified directly",
    icon: "mdi:shield-check-outline",
  },
];

const getDevelopmentLogs = cache(
  async (): Promise<DevelopmentFeedResult> => {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("development_logs")
        .select(
          `
          id,
          branch,
          commit_sha,
          commit_message,
          commit_url,
          author_username,
          app_area,
          category,
          pushed_at
        `,
        )
        .eq("is_public", true)
        .order("pushed_at", {
          ascending: false,
        })
        .limit(4);

      if (error) {
        return {
          logs: [],
          availability: "unavailable",
        };
      }

      return {
        logs: (data ?? []) as DevelopmentLog[],
        availability: "available",
      };
    } catch {
      return {
        logs: [],
        availability: "unavailable",
      };
    }
  },
);

function formatDate(value: string | null) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getShortSha(value: string | null) {
  return value?.slice(0, 7) ?? "unknown";
}

export async function PublicDevelopmentSection() {
  const feed = await getDevelopmentLogs();

  const isAvailable =
    feed.availability === "available";

  const latestCommit = feed.logs[0];
  const recentActivity = feed.logs.slice(1);

  const status = !isAvailable
    ? {
        label: "Feed unavailable",
        dot: "bg-[#e4aa3b]",
        badge:
          "border-[#e4aa3b]/20 bg-[#e4aa3b]/10 text-[#ffd27f]",
      }
    : latestCommit
      ? {
          label: "Evidence available",
          dot: "bg-[#81d65f]",
          badge:
            "border-[#81d65f]/20 bg-[#81d65f]/10 text-[#afe994]",
        }
      : {
          label: "Feed connected",
          dot: "bg-[#55a9dc]",
          badge:
            "border-[#55a9dc]/20 bg-[#55a9dc]/10 text-[#9bdcff]",
        };

  return (
    <section
      id="public-development"
      className="relative flex overflow-hidden bg-[#fff9ef] py-[clamp(3rem,5vw,4.5rem)] lg:min-h-[calc(100svh-3.75rem)] lg:items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 size-80 rounded-full bg-[#dceefa]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[23%] bg-[linear-gradient(to_top,rgba(118,172,87,0.12),transparent)]"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.12]" />

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.2rem,2.5vw,2rem)] lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span
                className={`size-2 rounded-full ${status.dot}`}
              />
              Public Development
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[16ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Development activity reviewers can verify.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.6] text-[#706452]">
              Lifetopia publishes development evidence so progress can be
              reviewed through real commits, source code, and repository
              activity.
            </p>

            <div className="mt-[clamp(0.9rem,1.5vw,1.15rem)] grid gap-2">
              {evidencePoints.map((point) => (
                <article
                  key={point.title}
                  className="group flex items-center gap-3 rounded-[0.78rem] border border-[#ded2ba] bg-white/70 px-3 py-2.5 transition duration-200 hover:translate-x-1 hover:border-[#9fbe8d] hover:bg-white"
                >
                  <span className="flex size-[2.5rem] shrink-0 items-center justify-center rounded-[0.65rem] border border-[#cce0c0] bg-[#eaf5e3] text-[#4f803b] transition duration-200 group-hover:scale-105">
                    <TechnologyIcon
                      icon={point.icon}
                      label={point.title}
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[clamp(0.78rem,0.88vw,0.94rem)] font-black text-[#3f5636]">
                      {point.title}
                    </h3>

                    <p className="mt-0.5 text-[clamp(0.66rem,0.74vw,0.8rem)] font-semibold text-[#7e725f]">
                      {point.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[0.75rem] bg-[#173b21] px-4 text-[clamp(0.74rem,0.84vw,0.9rem)] font-black text-white shadow-[0_0.7rem_1.8rem_rgba(31,64,37,0.16)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
            >
              Review GitHub Repository
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.1rem] border border-[#263e2c]/15 bg-[#102016] text-white shadow-[0_1.2rem_3.8rem_rgba(25,50,31,0.18)]">
            <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#17291c] px-[clamp(0.85rem,1.4vw,1.1rem)] py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  aria-hidden="true"
                  className="flex shrink-0 gap-1.5"
                >
                  <span className="size-2.5 rounded-full bg-[#e66d62]" />
                  <span className="size-2.5 rounded-full bg-[#e9b049]" />
                  <span className="size-2.5 rounded-full bg-[#70c758]" />
                </div>

                <p className="truncate font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-white/58">
                  public-development.log
                </p>
              </div>

              <span
                className={`flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-[clamp(0.62rem,0.7vw,0.76rem)] font-black ${status.badge}`}
              >
                <span
                  className={`size-2 rounded-full ${status.dot}`}
                />
                {status.label}
              </span>
            </header>

            <div className="p-[clamp(0.85rem,1.4vw,1.1rem)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] font-black uppercase tracking-[0.08em] text-[#a8df8f]">
                    Latest Commit
                  </p>

                  <h3 className="mt-1.5 text-[clamp(1rem,1.25vw,1.2rem)] font-black">
                    Most recent public activity
                  </h3>
                </div>

                <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.7rem] border border-white/10 bg-white/[0.06] text-[#afe994]">
                  <TechnologyIcon
                    icon="mdi:source-commit"
                    label="Latest public commit"
                  />
                </span>
              </div>

              {!isAvailable ? (
                <div className="mt-3 rounded-[0.8rem] border border-[#e4aa3b]/22 bg-[#e4aa3b]/10 p-3">
                  <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#ffd27f]">
                    Live development records could not be loaded.
                  </p>

                  <p className="mt-1.5 text-[clamp(0.68rem,0.76vw,0.82rem)] leading-[1.5] text-white/52">
                    The portal does not display a healthy status when the
                    database feed fails. The repository remains available for
                    direct verification.
                  </p>
                </div>
              ) : latestCommit ? (
                <Link
                  href={latestCommit.commit_url ?? repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 block rounded-[0.82rem] border border-[#9be879]/13 bg-[#173b21] p-[clamp(0.8rem,1.2vw,1rem)] transition duration-200 hover:-translate-y-0.5 hover:border-[#9be879]/25 hover:bg-[#204b2a]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-2.5 py-1 font-mono text-[0.66rem] font-black text-[#afe994]">
                      {getShortSha(latestCommit.commit_sha)}
                    </span>

                    <span className="truncate text-[0.68rem] font-bold text-white/42">
                      {latestCommit.app_area ?? "Platform"}
                    </span>
                  </div>

                  <p className="mt-3 text-[clamp(0.88rem,1vw,1.06rem)] font-black leading-[1.4] text-white">
                    {latestCommit.commit_message ??
                      "Development update"}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <span className="font-mono text-[0.66rem] text-white/38">
                      {latestCommit.branch ?? "main"}
                    </span>

                    <span className="text-[0.66rem] font-semibold text-white/42">
                      {formatDate(latestCommit.pushed_at)}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="mt-3 rounded-[0.8rem] border border-[#55a9dc]/20 bg-[#55a9dc]/10 p-3">
                  <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#9bdcff]">
                    The feed is connected.
                  </p>

                  <p className="mt-1.5 text-[clamp(0.68rem,0.76vw,0.82rem)] leading-[1.5] text-white/52">
                    No public development records are currently available.
                  </p>
                </div>
              )}

              {recentActivity.length > 0 ? (
                <section className="mt-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] font-black uppercase tracking-[0.08em] text-white/40">
                      Recent Activity
                    </p>

                    <span className="text-[0.64rem] font-bold text-white/28">
                      {recentActivity.length} records
                    </span>
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {recentActivity.map((log) => (
                      <Link
                        key={log.id}
                        href={log.commit_url ?? repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group min-w-0 rounded-[0.72rem] border border-white/[0.08] bg-white/[0.045] p-2.5 transition hover:-translate-y-0.5 hover:border-[#9be879]/18 hover:bg-white/[0.075]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="size-2 shrink-0 rounded-full bg-[#68ad4a]" />

                          <span className="truncate font-mono text-[0.62rem] font-black text-[#a8df8f]">
                            {getShortSha(log.commit_sha)}
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-[clamp(0.68rem,0.76vw,0.82rem)] font-black leading-[1.4] text-white/70 group-hover:text-white">
                          {log.commit_message ??
                            "Development update"}
                        </p>

                        <p className="mt-2 text-[0.6rem] font-semibold text-white/30">
                          {formatDate(log.pushed_at)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <footer className="flex flex-col gap-2 border-t border-white/10 bg-[#0d1911] px-[clamp(0.85rem,1.4vw,1.1rem)] py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-semibold text-white/38">
                GitHub remains the primary source of truth.
              </p>

              <Link
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[clamp(0.66rem,0.74vw,0.8rem)] font-black text-[#afe994] hover:underline"
              >
                Verify independently
                <span aria-hidden="true">↗</span>
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}