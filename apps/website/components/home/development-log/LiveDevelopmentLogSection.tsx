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

  if (diffInSeconds < 60) return "Just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
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

function getCategoryLabel(category: string) {
  if (!category) return "Update";
  return category;
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
    .limit(5);

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
        <div className="absolute left-[-8rem] top-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#ffd58a]/35 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="lt-badge">Built in Public</span>

          <h2 className="lt-title mt-[clamp(1rem,2vw,1.5rem)]">
            Live Development Log
          </h2>

          <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-2xl text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.8] text-[#7a5635]">
            Lifetopia World is actively shipped in public. Every meaningful
            product update is automatically synced from GitHub to show real
            development progress across the platform.
          </p>

          <div className="mt-[clamp(1.4rem,2.4vw,2rem)] grid gap-3 sm:grid-cols-3">
            <div className="rounded-[clamp(1rem,1.8vw,1.4rem)] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(74,50,22,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5635]/70">
                Status
              </p>
              <p className="mt-2 text-sm font-black text-[#4f8124]">
                Active Development
              </p>
            </div>

            <div className="rounded-[clamp(1rem,1.8vw,1.4rem)] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(74,50,22,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5635]/70">
                Latest Push
              </p>
              <p className="mt-2 text-sm font-black text-[#2f1b12]">
                {latestLog ? formatRelativeTime(latestLog.pushed_at) : "No logs yet"}
              </p>
            </div>

            <div className="rounded-[clamp(1rem,1.8vw,1.4rem)] border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(74,50,22,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a5635]/70">
                Recent Updates
              </p>
              <p className="mt-2 text-sm font-black text-[#2f1b12]">
                {logs.length} synced
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[clamp(1.4rem,3vw,2.2rem)] border border-white/80 bg-white/80 p-[clamp(1rem,2vw,1.5rem)] shadow-[0_24px_80px_rgba(74,50,22,0.12)]">
          <div className="flex items-center justify-between gap-4 border-b border-[#d9c99f]/70 pb-4">
            <div>
              <p className="text-sm font-black text-[#2f1b12]">
                Latest GitHub Updates
              </p>
              <p className="mt-1 text-xs font-bold text-[#7a5635]">
                Synced automatically after every push.
              </p>
            </div>

            <span className="rounded-full bg-[#edf7df] px-3 py-1 text-xs font-black text-[#4f8124]">
              Live
            </span>
          </div>

          {logs.length ? (
            <div className="mt-4 flex flex-col gap-3">
              {logs.map((log) => {
                const content = (
                  <article className="rounded-[clamp(1rem,1.8vw,1.35rem)] border border-[#ead9b8] bg-[#fffaf0] p-[clamp(0.9rem,1.6vw,1.15rem)] transition hover:-translate-y-0.5 hover:bg-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-black text-[#4f8124]">
                        {getCategoryLabel(log.category)}
                      </span>

                      <span className="rounded-full bg-[#f4ead4] px-2.5 py-1 text-[0.68rem] font-black text-[#7a5635]">
                        {log.app_area}
                      </span>

                      <span className="text-[0.72rem] font-bold text-[#7a5635]/75">
                        {formatRelativeTime(log.pushed_at)}
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-[clamp(0.9rem,1.1vw,1.05rem)] font-black leading-snug text-[#2f1b12]">
                      {log.commit_message}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-[#7a5635]">
                      <span>{log.branch}</span>
                      <span>•</span>
                      <span>{getShortSha(log.commit_sha)}</span>
                      {log.author_username ? (
                        <>
                          <span>•</span>
                          <span>@{log.author_username}</span>
                        </>
                      ) : null}
                    </div>
                  </article>
                );

                if (!log.commit_url) {
                  return <div key={log.id}>{content}</div>;
                }

                return (
                  <Link
                    key={log.id}
                    href={log.commit_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-[clamp(1rem,1.8vw,1.35rem)] border border-[#ead9b8] bg-[#fffaf0] p-5">
              <p className="font-bold text-[#7a5635]">
                No development logs yet. The next GitHub push will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}