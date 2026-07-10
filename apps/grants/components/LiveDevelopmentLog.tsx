import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

type DevelopmentLogRow = {
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

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();
  const diffInSeconds = Math.max(0, Math.floor((Date.now() - pushedAt) / 1000));

  if (diffInSeconds < 60) return "just now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getShortSha(commitSha: string) {
  return commitSha.slice(0, 7);
}

async function getLatestDevelopmentLogs() {
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

  if (error || !data) return [];

  return data as DevelopmentLogRow[];
}

export async function LiveDevelopmentLog() {
  const logs = await getLatestDevelopmentLogs();

  return (
    <section className="px-[clamp(1rem,5vw,5rem)] py-[clamp(2.8rem,6vw,4.8rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-[clamp(1.2rem,2.6vw,2rem)]">
        <div>
          <span className="lt-grants-badge">Live Development Log</span>
          <h2 className="mt-4 text-[clamp(1.8rem,4.5vw,3.7rem)] font-black leading-[1] tracking-[-0.045em] text-[#2f1b12]">
            Active development, synced from GitHub.
          </h2>
          <p className="mt-4 max-w-3xl text-[clamp(0.9rem,1.2vw,1.08rem)] leading-[1.8] text-[#7a5635]">
            Every push is automatically tracked through GitHub Actions,
            Lifetopia API, and Supabase to provide transparent proof of
            development activity.
          </p>
        </div>

        <div className="overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-[#2f1b12]/90 bg-[#11120f] shadow-[0_24px_80px_rgba(47,27,18,0.22)]">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#191b15] px-[clamp(0.8rem,1.6vw,1.1rem)] py-[clamp(0.6rem,1.1vw,0.82rem)]">
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-[#ff6b6b]" />
              <span className="size-2 rounded-full bg-[#ffd36a]" />
              <span className="size-2 rounded-full bg-[#9be564]" />
            </div>
            <p className="font-mono text-[clamp(0.58rem,0.78vw,0.72rem)] font-bold text-[#d7f5bd]/75">
              lifetopia-platform / latest=5
            </p>
          </div>

          <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.7rem)] p-[clamp(0.8rem,1.6vw,1.1rem)]">
            {logs.length ? (
              logs.map((log, index) => {
                const row = (
                  <article className="rounded-[clamp(0.7rem,1.3vw,1rem)] border border-white/10 bg-white/[0.035] px-[clamp(0.75rem,1.4vw,1rem)] py-[clamp(0.65rem,1.2vw,0.85rem)] transition hover:border-[#9be564]/40 hover:bg-white/[0.06]">
                    <div className="flex flex-wrap gap-2 font-mono text-[clamp(0.56rem,0.75vw,0.68rem)]">
                      <span className="text-[#7a8f68]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[#9be564]">{log.category}</span>
                      <span className="text-[#7a8f68]">/</span>
                      <span className="text-[#f4ead4]">{log.app_area}</span>
                      <span className="text-[#7a8f68]">/</span>
                      <span className="text-[#8fd8ff]">
                        {formatRelativeTime(log.pushed_at)}
                      </span>
                    </div>

                    <h3 className="mt-2 break-words font-mono text-[clamp(0.74rem,1vw,0.92rem)] font-bold leading-[1.55] text-[#f8ffe9]">
                      <span className="text-[#7a8f68]">commit:</span>{" "}
                      {log.commit_message}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2 font-mono text-[clamp(0.56rem,0.75vw,0.68rem)] text-[#9aa98a]">
                      <span>branch:{log.branch}</span>
                      <span>sha:{getShortSha(log.commit_sha)}</span>
                      {log.author_username ? (
                        <span>author:@{log.author_username}</span>
                      ) : null}
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
              })
            ) : (
              <p className="font-mono text-sm text-[#d7f5bd]">
                No logs synced yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}