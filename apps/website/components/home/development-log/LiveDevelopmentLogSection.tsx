// apps/website/components/home/development-log/LiveDevelopmentLogSection.tsx

import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

type DevelopmentLogRow = {
  id: string;
  repo: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  author_name: string | null;
  author_username: string | null;
  app_area: string;
  category: string;
  pushed_at: string;
};

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();
  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - pushedAt) / 1000));

  if (diffInSeconds < 60) return "just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getShortSha(commitSha: string) {
  return commitSha.slice(0, 7);
}

function getCategoryTone(category: string) {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === "feature") return "text-[#9be564]";
  if (normalizedCategory === "fix") return "text-[#ffd36a]";
  if (normalizedCategory === "security") return "text-[#ff9b7a]";
  if (normalizedCategory === "docs") return "text-[#8fd8ff]";
  if (normalizedCategory === "infrastructure") return "text-[#c6a7ff]";

  return "text-[#d7f5bd]";
}

async function getLatestDevelopmentLogs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("development_logs")
    .select(
      `
      id,
      repo,
      branch,
      commit_sha,
      commit_message,
      commit_url,
      author_name,
      author_username,
      app_area,
      category,
      pushed_at
    `,
    )
    .eq("is_public", true)
    .order("pushed_at", { ascending: false })
    .limit(6);

  if (error || !data) {
    return [];
  }

  return data as DevelopmentLogRow[];
}

export async function LiveDevelopmentLogSection() {
  const logs = await getLatestDevelopmentLogs();
  const latestLog = logs[0];

  return (
    <section className="relative overflow-hidden bg-[#fff8e8] px-[clamp(1rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-[clamp(18rem,35vw,30rem)] w-[clamp(18rem,35vw,30rem)] rounded-full bg-[#6fa83a]/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-10rem] h-[clamp(20rem,38vw,34rem)] w-[clamp(20rem,38vw,34rem)] rounded-full bg-[#ffd58a]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-[clamp(1.4rem,3vw,2.6rem)]">
        <div className="flex flex-col gap-[clamp(0.8rem,1.6vw,1.2rem)]">
          <span className="w-fit rounded-full border border-[#4f8124]/25 bg-[#edf7df] px-[clamp(0.8rem,1.4vw,1rem)] py-[clamp(0.35rem,0.8vw,0.5rem)] font-mono text-[clamp(0.66rem,0.85vw,0.78rem)] font-black uppercase tracking-[0.18em] text-[#4f8124]">
            Built in Public
          </span>

          <div className="flex flex-col gap-[clamp(0.7rem,1.4vw,1rem)]">
            <h2 className="font-mono text-[clamp(2rem,5vw,4.6rem)] font-black leading-[0.95] tracking-[-0.06em] text-[#2f1b12]">
              Live Dev Log
            </h2>

            <p className="max-w-4xl text-[clamp(0.92rem,1.3vw,1.15rem)] leading-[1.8] text-[#7a5635]">
              A real-time development feed synced from GitHub. Every push helps
              reviewers, players, and ecosystem partners see that Lifetopia
              World is actively being shipped.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[clamp(1.1rem,2.4vw,2rem)] border border-[#2f1b12]/90 bg-[#11120f] shadow-[0_28px_90px_rgba(47,27,18,0.24)]">
          <div className="flex items-center justify-between gap-[clamp(0.75rem,1.6vw,1.2rem)] border-b border-white/10 bg-[#191b15] px-[clamp(0.9rem,2vw,1.4rem)] py-[clamp(0.75rem,1.4vw,1rem)]">
            <div className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)]">
              <span className="size-[clamp(0.55rem,1vw,0.75rem)] rounded-full bg-[#ff6b6b]" />
              <span className="size-[clamp(0.55rem,1vw,0.75rem)] rounded-full bg-[#ffd36a]" />
              <span className="size-[clamp(0.55rem,1vw,0.75rem)] rounded-full bg-[#9be564]" />
            </div>

            <p className="truncate font-mono text-[clamp(0.68rem,0.9vw,0.82rem)] font-bold text-[#d7f5bd]/80">
              lifetopia-platform / development_logs
            </p>
          </div>

          <div className="grid gap-[clamp(0.75rem,1.6vw,1rem)] border-b border-white/10 bg-[#0d0f0b] px-[clamp(0.9rem,2vw,1.4rem)] py-[clamp(0.9rem,1.8vw,1.25rem)]">
            <div className="flex flex-wrap items-center gap-[clamp(0.55rem,1vw,0.8rem)] font-mono text-[clamp(0.72rem,1vw,0.9rem)]">
              <span className="text-[#7a8f68]">$</span>
              <span className="text-[#d7f5bd]">git status</span>
              <span className="text-[#7a8f68]">--lifetopia</span>
            </div>

            <div className="grid gap-[clamp(0.55rem,1vw,0.75rem)]">
              <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,0.75rem)] font-mono text-[clamp(0.72rem,1vw,0.9rem)]">
                <span className="text-[#9be564]">●</span>
                <span className="text-[#d7f5bd]">active_development</span>
                <span className="text-[#7a8f68]">=</span>
                <span className="text-[#9be564]">true</span>
              </div>

              <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,0.75rem)] font-mono text-[clamp(0.72rem,1vw,0.9rem)]">
                <span className="text-[#8fd8ff]">latest_push</span>
                <span className="text-[#7a8f68]">=</span>
                <span className="text-[#f4ead4]">
                  {latestLog ? formatRelativeTime(latestLog.pushed_at) : "waiting"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-[clamp(0.5rem,1vw,0.75rem)] font-mono text-[clamp(0.72rem,1vw,0.9rem)]">
                <span className="text-[#c6a7ff]">synced_updates</span>
                <span className="text-[#7a8f68]">=</span>
                <span className="text-[#f4ead4]">{logs.length}</span>
              </div>
            </div>
          </div>

          <div className="px-[clamp(0.9rem,2vw,1.4rem)] py-[clamp(0.9rem,1.8vw,1.25rem)]">
            {logs.length ? (
              <div className="flex flex-col gap-[clamp(0.65rem,1.3vw,0.9rem)]">
                {logs.map((log, index) => {
                  const row = (
                    <article className="group rounded-[clamp(0.8rem,1.6vw,1.15rem)] border border-white/10 bg-white/[0.035] px-[clamp(0.8rem,1.6vw,1.1rem)] py-[clamp(0.75rem,1.4vw,1rem)] transition hover:border-[#9be564]/40 hover:bg-white/[0.06]">
                      <div className="flex flex-col gap-[clamp(0.55rem,1vw,0.75rem)]">
                        <div className="flex flex-wrap items-center gap-[clamp(0.45rem,0.9vw,0.7rem)] font-mono text-[clamp(0.66rem,0.85vw,0.78rem)]">
                          <span className="text-[#7a8f68]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className={getCategoryTone(log.category)}>
                            {log.category.toLowerCase()}
                          </span>

                          <span className="text-[#7a8f68]">/</span>

                          <span className="text-[#f4ead4]">{log.app_area}</span>

                          <span className="text-[#7a8f68]">/</span>

                          <span className="text-[#8fd8ff]">
                            {formatRelativeTime(log.pushed_at)}
                          </span>
                        </div>

                        <h3 className="break-words font-mono text-[clamp(0.85rem,1.25vw,1.05rem)] font-bold leading-[1.55] text-[#f8ffe9]">
                          <span className="text-[#7a8f68]">commit:</span>{" "}
                          {log.commit_message}
                        </h3>

                        <div className="flex flex-wrap items-center gap-[clamp(0.45rem,0.9vw,0.7rem)] font-mono text-[clamp(0.66rem,0.85vw,0.78rem)] text-[#9aa98a]">
                          <span>branch:{log.branch}</span>
                          <span>sha:{getShortSha(log.commit_sha)}</span>
                          {log.author_username ? (
                            <span>author:@{log.author_username}</span>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );

                  if (!log.commit_url) {
                    return <div key={log.id}>{row}</div>;
                  }

                  return (
                    <Link
                      key={log.id}
                      href={log.commit_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      {row}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[clamp(0.8rem,1.6vw,1.15rem)] border border-white/10 bg-white/[0.035] px-[clamp(0.8rem,1.6vw,1.1rem)] py-[clamp(0.8rem,1.6vw,1.1rem)]">
                <p className="font-mono text-[clamp(0.8rem,1vw,0.95rem)] leading-[1.7] text-[#d7f5bd]">
                  No logs synced yet. The next GitHub push will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#191b15] px-[clamp(0.9rem,2vw,1.4rem)] py-[clamp(0.75rem,1.4vw,1rem)]">
            <p className="font-mono text-[clamp(0.66rem,0.85vw,0.78rem)] leading-[1.7] text-[#9aa98a]">
              Synced via GitHub Actions → Lifetopia API → Supabase
              development_logs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}