import Link from "next/link";
import { TechnologyIcon } from "@/components/TechnologyIcon";

export type DevelopmentLogItem = {
  id: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  author_username: string | null;
  app_area: string;
  category: string;
  pushed_at: string;
};

type LeftDashboardProps = {
  logs: DevelopmentLogItem[];
};

const pipelineSteps = [
  {
    name: "GitHub",
    description: "Source code pushed",
    icon: "mdi:github",
    status: "Connected",
  },
  {
    name: "GitHub Actions",
    description: "Build and deployment triggered",
    icon: "simple-icons:githubactions",
    status: "Automated",
  },
  {
    name: "Supabase",
    description: "Development data synchronized",
    icon: "simple-icons:supabase",
    status: "Synced",
  },
  {
    name: "Grants Portal",
    description: "Progress published publicly",
    icon: "mdi:web",
    status: "Live",
  },
];

const executionStatuses = [
  {
    label: "Repository",
    value: "Connected",
    icon: "mdi:source-repository",
  },
  {
    label: "Auto Deployment",
    value: "Enabled",
    icon: "mdi:rocket-launch-outline",
  },
  {
    label: "Development Log",
    value: "Synced",
    icon: "mdi:sync",
  },
];

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();

  if (Number.isNaN(pushedAt)) {
    return "";
  }

  const difference = Math.max(
    0,
    Math.floor((Date.now() - pushedAt) / 1000),
  );

  if (difference < 60) {
    return "just now";
  }

  const minutes = Math.floor(difference / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

function getShortSha(commitSha: string) {
  return commitSha.slice(0, 7);
}

function getCategoryClasses(category: string) {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === "feature") {
    return "border-[#7e62e9]/20 bg-[#7e62e9]/12 text-[#c9baff]";
  }

  if (normalizedCategory === "fix") {
    return "border-[#f0a542]/20 bg-[#f0a542]/12 text-[#ffd18e]";
  }

  if (normalizedCategory === "security") {
    return "border-[#ef7168]/20 bg-[#ef7168]/12 text-[#ffaaa4]";
  }

  if (normalizedCategory === "docs") {
    return "border-[#54a8e4]/20 bg-[#54a8e4]/12 text-[#9cdcff]";
  }

  if (normalizedCategory === "infrastructure") {
    return "border-[#67cb79]/20 bg-[#67cb79]/12 text-[#a9edb4]";
  }

  return "border-white/10 bg-white/[0.05] text-white/65";
}

function CommitContent({
  log,
  compact = false,
}: {
  log: DevelopmentLogItem;
  compact?: boolean;
}) {
  return (
    <article
      className={[
        "group transition duration-200",
        compact
          ? "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(0.45rem,0.8vw,0.65rem)] px-[clamp(0.65rem,1.1vw,0.85rem)] py-[clamp(0.55rem,0.9vw,0.7rem)] hover:bg-white/[0.025]"
          : "rounded-[clamp(0.65rem,1vw,0.82rem)] border border-white/[0.08] bg-[#0a140d] px-[clamp(0.7rem,1.2vw,0.95rem)] py-[clamp(0.65rem,1.1vw,0.9rem)] hover:border-[#8fea63]/20 hover:bg-[#0d1810]",
      ].join(" ")}
    >
      {compact ? (
        <div className="flex size-[clamp(1.65rem,2.6vw,2rem)] items-center justify-center rounded-full border border-[#8eea61]/15 bg-[#8eea61]/[0.07]">
          <TechnologyIcon icon="mdi:source-commit" label="Commit" />
        </div>
      ) : null}

      <div className="min-w-0">
        <h4
          className={[
            "break-words font-mono font-bold text-white",
            compact
              ? "line-clamp-1 text-[clamp(0.4rem,0.68vw,0.58rem)]"
              : "text-[clamp(0.58rem,0.92vw,0.78rem)] leading-[1.45]",
          ].join(" ")}
        >
          {log.commit_message}
        </h4>

        <div className="mt-[clamp(0.2rem,0.4vw,0.32rem)] flex flex-wrap items-center gap-[clamp(0.22rem,0.42vw,0.34rem)]">
          <span
            className={`rounded-full border px-[clamp(0.3rem,0.52vw,0.42rem)] py-[clamp(0.08rem,0.17vw,0.13rem)] font-mono text-[clamp(0.25rem,0.44vw,0.37rem)] font-black ${getCategoryClasses(
              log.category,
            )}`}
          >
            {log.category.toLowerCase()}
          </span>

          <span className="truncate font-mono text-[clamp(0.26rem,0.46vw,0.39rem)] text-white/38">
            {log.branch}
          </span>

          <span className="font-mono text-[clamp(0.26rem,0.46vw,0.39rem)] text-white/28">
            {getShortSha(log.commit_sha)}
          </span>

          {!compact && log.author_username ? (
            <span className="truncate font-mono text-[clamp(0.26rem,0.46vw,0.39rem)] text-white/38">
              {log.author_username}
            </span>
          ) : null}
        </div>
      </div>

      {compact ? (
        <span className="shrink-0 whitespace-nowrap font-mono text-[clamp(0.26rem,0.46vw,0.39rem)] text-white/35">
          {formatRelativeTime(log.pushed_at)}
        </span>
      ) : null}
    </article>
  );
}

export function LeftDashboard({ logs }: LeftDashboardProps) {
  const latestCommit = logs[0];
  const recentActivity = logs.slice(1, 5);

  return (
    <section className="min-w-0 overflow-hidden rounded-[clamp(0.9rem,1.5vw,1.2rem)] border border-white/10 bg-[#0a140d]/95 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-[clamp(0.8rem,1.4vw,1.1rem)] py-[clamp(0.7rem,1.2vw,0.95rem)]">
        <div className="min-w-0">
          <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.1em] text-[#91ec65]">
            Execution Session
          </p>

          <h3 className="mt-1 truncate text-[clamp(0.72rem,1.08vw,0.94rem)] font-extrabold text-white">
            Live public development activity
          </h3>
        </div>

        <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#80eb58]/20 bg-[#80eb58]/10 px-3 py-1 font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] font-black text-[#92fb6c]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#89f263]" />
          LIVE
        </span>
      </div>

      <div className="flex flex-col gap-[clamp(0.7rem,1.2vw,0.95rem)] p-[clamp(0.7rem,1.25vw,1rem)]">
        <section className="overflow-hidden rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/[0.08] bg-[#0d1810]">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-[clamp(0.65rem,1.1vw,0.85rem)] py-[clamp(0.55rem,0.9vw,0.72rem)]">
            <div>
              <p className="font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-black uppercase tracking-[0.09em] text-[#8ea397]">
                Execution Pipeline
              </p>

              <p className="mt-1 font-mono text-[clamp(0.26rem,0.45vw,0.38rem)] text-white/35">
                From source code to public delivery
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-[#7be654]/10 px-2.5 py-1 font-mono text-[clamp(0.25rem,0.43vw,0.36rem)] font-bold text-[#8df26a]">
              <span className="size-1 rounded-full bg-[#83ef5f]" />
              LIVE
            </span>
          </div>

          <div className="relative p-[clamp(0.65rem,1.1vw,0.85rem)]">
            <div className="absolute bottom-[2rem] left-[clamp(1.75rem,2.8vw,2.2rem)] top-[2rem] w-px bg-gradient-to-b from-[#8fe966]/60 via-[#8fe966]/30 to-[#8fe966]/10" />

            <div className="relative flex flex-col">
              {pipelineSteps.map((step, index) => (
                <div
                  key={step.name}
                  className={[
                    "relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(0.55rem,0.9vw,0.72rem)] px-[clamp(0.55rem,0.95vw,0.75rem)] py-[clamp(0.55rem,0.9vw,0.72rem)]",
                    index !== pipelineSteps.length - 1
                      ? "border-b border-white/[0.06]"
                      : "",
                  ].join(" ")}
                >
                  <div className="relative z-10 flex size-[clamp(2rem,3.2vw,2.5rem)] items-center justify-center rounded-full border border-[#87eb61]/20 bg-[#87eb61]/[0.06] shadow-[0_0_1.4rem_rgba(135,235,97,0.05)]">
                    <TechnologyIcon icon={step.icon} label={step.name} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-mono text-[clamp(0.4rem,0.68vw,0.58rem)] font-black text-white">
                        {step.name}
                      </p>

                      <span className="rounded-full bg-[#87eb61]/10 px-2 py-0.5 font-mono text-[clamp(0.24rem,0.42vw,0.35rem)] font-bold text-[#8ded6b]">
                        {step.status}
                      </span>
                    </div>

                    <p className="mt-1 truncate font-mono text-[clamp(0.27rem,0.46vw,0.39rem)] text-white/36">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-mono text-[clamp(0.24rem,0.42vw,0.35rem)] text-white/22">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex size-4 items-center justify-center rounded-full border border-[#87eb61]/20 bg-[#87eb61]/10">
                      <span className="size-1 rounded-full bg-[#87eb61]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.07] p-[clamp(0.65rem,1.1vw,0.85rem)]">
            <div className="mb-[clamp(0.45rem,0.8vw,0.62rem)] flex items-center justify-between gap-3">
              <p className="font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] font-black uppercase tracking-[0.08em] text-[#8ea397]">
                Execution Status
              </p>

              <span className="flex items-center gap-1.5 font-mono text-[clamp(0.25rem,0.43vw,0.36rem)] font-bold text-[#8bea66]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#84ed61]" />
                Operational
              </span>
            </div>

            <div className="grid gap-[clamp(0.35rem,0.65vw,0.5rem)] sm:grid-cols-3">
              {executionStatuses.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[clamp(0.5rem,0.8vw,0.65rem)] border border-white/[0.07] bg-black/10 px-[clamp(0.5rem,0.85vw,0.68rem)] py-[clamp(0.45rem,0.75vw,0.6rem)]"
                >
                  <div className="flex items-center gap-2 text-white/40">
                    <TechnologyIcon icon={item.icon} label={item.label} />

                    <span className="truncate font-mono text-[clamp(0.24rem,0.42vw,0.35rem)] uppercase tracking-[0.06em]">
                      {item.label}
                    </span>
                  </div>

                  <p className="mt-1.5 truncate font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-black text-[#8cea68]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/[0.08] bg-[#0d1810] p-[clamp(0.65rem,1.1vw,0.85rem)]">
          <div className="mb-[clamp(0.45rem,0.8vw,0.62rem)] flex items-center justify-between gap-3">
            <p className="font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-black uppercase tracking-[0.09em] text-[#8ea397]">
              Latest Commit
            </p>

            <span className="flex items-center gap-1.5 rounded-full bg-[#80e75a]/10 px-2.5 py-1 font-mono text-[clamp(0.25rem,0.43vw,0.36rem)] font-black text-[#91ef70]">
              <span className="size-1 animate-pulse rounded-full bg-[#88ee65]" />
              NEW
            </span>
          </div>

          {latestCommit ? (
            <div>
              {latestCommit.commit_url ? (
                <Link
                  href={latestCommit.commit_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <CommitContent log={latestCommit} />
                </Link>
              ) : (
                <CommitContent log={latestCommit} />
              )}

              <div className="mt-2 flex justify-end">
                <span className="font-mono text-[clamp(0.26rem,0.45vw,0.38rem)] text-white/35">
                  {formatRelativeTime(latestCommit.pushed_at)}
                </span>
              </div>
            </div>
          ) : (
            <p className="rounded-[clamp(0.6rem,0.9vw,0.75rem)] border border-white/[0.07] bg-black/10 px-4 py-5 font-mono text-[clamp(0.38rem,0.62vw,0.52rem)] text-white/45">
              Waiting for the next public GitHub push...
            </p>
          )}
        </section>

        <section className="overflow-hidden rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/[0.08] bg-[#0d1810]">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-[clamp(0.65rem,1.1vw,0.85rem)] py-[clamp(0.55rem,0.9vw,0.72rem)]">
            <p className="font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-black uppercase tracking-[0.09em] text-[#8ea397]">
              Recent Activity
            </p>

            <span className="font-mono text-[clamp(0.25rem,0.43vw,0.36rem)] text-white/30">
              {recentActivity.length} updates
            </span>
          </div>

          {recentActivity.length ? (
            <div>
              {recentActivity.map((log, index) => {
                const content = <CommitContent log={log} compact />;

                if (!log.commit_url) {
                  return (
                    <div
                      key={log.id}
                      className={
                        index !== recentActivity.length - 1
                          ? "border-b border-white/[0.06]"
                          : ""
                      }
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={log.id}
                    href={log.commit_url}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      index !== recentActivity.length - 1
                        ? "block border-b border-white/[0.06]"
                        : "block"
                    }
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="px-4 py-5 font-mono text-[clamp(0.38rem,0.62vw,0.52rem)] text-white/45">
              No additional public activity yet.
            </p>
          )}
        </section>

        <Link
          href="https://github.com/pashamuhammadd/lifetopia-platform"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 px-1 font-mono text-[clamp(0.38rem,0.64vw,0.54rem)] font-black text-[#91eb65] transition hover:translate-x-1 hover:text-[#b0ff8c]"
        >
          View full development history
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}