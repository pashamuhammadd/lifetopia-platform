import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

import { TechnologyIcon } from "@/components/TechnologyIcon";
import { DevelopmentActivity } from "./DevelopmentActivity";
import {
  LatestCommit,
  type PublicDevelopmentLog,
} from "./LatestCommit";

const workflowSteps = [
  {
    label: "GitHub",
    command: "git push origin main",
    description: "Source code and commits are pushed",
    icon: "mdi:github",
  },
  {
    label: "Auto Sync",
    command: "sync development_logs",
    description: "Public commit data is synchronized",
    icon: "mdi:sync",
  },
  {
    label: "Grants Portal",
    command: "publish public updates",
    description: "Development progress appears here",
    icon: "mdi:web",
  },
];

const systemStatus = [
  {
    label: "repository",
    value: "connected",
  },
  {
    label: "auto_sync",
    value: "enabled",
  },
  {
    label: "public_log",
    value: "live",
  },
];

async function getPublicDevelopmentLogs() {
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
    .order("pushed_at", { ascending: false })
    .limit(5);

  if (error || !data) {
    return [];
  }

  return data as PublicDevelopmentLog[];
}

export async function PublicDevelopmentSection() {
  const logs = await getPublicDevelopmentLogs();

  const latestCommit = logs[0];
  const recentActivity = logs.slice(1);

  return (
    <section
      id="public-development"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,92,49,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,92,49,0.06) 1px, transparent 1px)",
          backgroundSize:
            "clamp(2rem,3vw,2.8rem) clamp(2rem,3vw,2.8rem)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[3rem] size-[22rem] rounded-full bg-[#dcefd0]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[1rem] right-[-9rem] size-[24rem] rounded-full bg-[#d9edfa]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.62fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b8cea8] bg-[#edf7e6] px-4 py-2 font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.13em] text-[#4f7b3c]">
              <span className="size-2 animate-pulse rounded-full bg-[#68ad4a]" />
              Public Development
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[48rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2e2118]">
              Built in public, verified through real development activity.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[46rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Every public commit is synchronized from GitHub so reviewers and
              community members can follow Lifetopia World&apos;s development
              progress transparently.
            </p>
          </div>

          <aside className="overflow-hidden rounded-[clamp(0.9rem,1.4vw,1.1rem)] border border-[#203526]/15 bg-[#102016] shadow-[0_1.2rem_3.5rem_rgba(28,54,34,0.14)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#17291c] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#e66d62]" />
                <span className="size-2.5 rounded-full bg-[#e9b049]" />
                <span className="size-2.5 rounded-full bg-[#70c758]" />
              </div>

              <p className="font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-bold text-white/65">
                development_status.json
              </p>
            </div>

            <div className="space-y-3 p-4">
              {systemStatus.map((status) => (
                <div
                  key={status.label}
                  className="flex items-center justify-between gap-4 font-mono"
                >
                  <span className="text-[clamp(0.72rem,0.8vw,0.86rem)] text-white/48">
                    &quot;{status.label}&quot;:
                  </span>

                  <span className="flex items-center gap-2 text-[clamp(0.72rem,0.8vw,0.86rem)] font-black text-[#9bec7b]">
                    <span className="size-2 rounded-full bg-[#80d85f]" />
                    &quot;{status.value}&quot;
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section className="mt-[clamp(2rem,4vw,3rem)] overflow-hidden rounded-[clamp(0.95rem,1.6vw,1.25rem)] border border-[#d7c9aa] bg-white shadow-[0_1.2rem_4rem_rgba(62,46,25,0.08)]">
          <div className="flex items-center justify-between gap-4 border-b border-[#e9dec7] bg-[#faf6ec] px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.7rem,1.2vw,0.95rem)]">
            <div>
              <p className="font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.1em] text-[#5c7d4d]">
                development_pipeline
              </p>

              <p className="mt-1 text-[clamp(0.8rem,0.9vw,0.96rem)] text-[#766b59]">
                From source code to public reporting
              </p>
            </div>

            <span className="rounded-full bg-[#eaf5e2] px-3 py-1.5 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black text-[#558340]">
              operational
            </span>
          </div>

          <div className="grid gap-[clamp(0.65rem,1.2vw,0.9rem)] p-[clamp(0.8rem,1.4vw,1.1rem)] md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article
                key={step.label}
                className="relative min-w-0 rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-[#e3d7be] bg-[#fcf9f2] p-[clamp(0.8rem,1.3vw,1rem)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-[clamp(2.8rem,4vw,3.35rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.82rem)] bg-[#183e22] text-white">
                    <TechnologyIcon icon={step.icon} label={step.label} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[clamp(0.95rem,1.05vw,1.1rem)] font-black text-[#2f241c]">
                      {step.label}
                    </h3>

                    <p className="mt-1 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#5b8750]">
                      $ {step.command}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[clamp(0.8rem,0.9vw,0.96rem)] leading-[1.55] text-[#746957]">
                  {step.description}
                </p>

                {index < workflowSteps.length - 1 ? (
                  <span className="absolute -right-[clamp(0.9rem,1.45vw,1.15rem)] top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[clamp(1.1rem,1.6vw,1.4rem)] font-black text-[#7f9b71] md:block">
                    →
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <div className="mt-[clamp(1rem,2vw,1.5rem)]">
          <LatestCommit log={latestCommit} />
        </div>

        <DevelopmentActivity logs={recentActivity} />

        <footer className="mt-[clamp(1.2rem,2.2vw,1.8rem)] flex flex-col gap-5 rounded-[clamp(0.95rem,1.5vw,1.2rem)] border border-[#d7c8a8] bg-[#fffaf0] p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_1rem_3rem_rgba(58,42,22,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[44rem]">
            <p className="font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.09em] text-[#628052]">
              verify_development
            </p>

            <h3 className="mt-2 text-[clamp(1.1rem,1.45vw,1.35rem)] font-black text-[#30251c]">
              Review the repository and verify every public development update.
            </h3>

            <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
              Commit history, development consistency, and product progress are
              available directly through the Lifetopia World repository.
            </p>
          </div>

          <Link
            href="https://github.com/pashamuhammadd/lifetopia-platform"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] bg-[#173e22] px-[clamp(1rem,1.8vw,1.4rem)] py-[clamp(0.72rem,1.1vw,0.92rem)] font-mono text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-white shadow-[0_0.8rem_2rem_rgba(23,62,34,0.2)] transition hover:-translate-y-0.5 hover:bg-[#245b31]"
          >
            open repository
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}