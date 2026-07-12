import Link from "next/link";

import type { PublicDevelopmentLog } from "./LatestCommit";

type DevelopmentActivityProps = {
  logs: PublicDevelopmentLog[];
};

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();

  if (Number.isNaN(pushedAt)) {
    return "recently";
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
  const value = category.toLowerCase();

  if (value === "feature") {
    return "border-[#8d77dc]/25 bg-[#8d77dc]/12 text-[#cdbfff]";
  }

  if (value === "fix") {
    return "border-[#e9a646]/25 bg-[#e9a646]/12 text-[#ffd18b]";
  }

  if (value === "security") {
    return "border-[#e3746b]/25 bg-[#e3746b]/12 text-[#ffaaa4]";
  }

  if (value === "docs") {
    return "border-[#4ba1d5]/25 bg-[#4ba1d5]/12 text-[#9ddcff]";
  }

  if (value === "infrastructure") {
    return "border-[#62ad72]/25 bg-[#62ad72]/12 text-[#a7ecb4]";
  }

  return "border-white/10 bg-white/[0.05] text-white/65";
}

function ActivityRow({
  log,
  index,
}: {
  log: PublicDevelopmentLog;
  index: number;
}) {
  return (
    <article className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-[clamp(0.65rem,1vw,0.85rem)] px-[clamp(0.8rem,1.4vw,1.05rem)] py-[clamp(0.7rem,1.2vw,0.92rem)] transition hover:bg-white/[0.025]">
      <span className="mt-[0.15rem] font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-white/25">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h4 className="line-clamp-2 break-words font-mono text-[clamp(0.82rem,0.94vw,1rem)] font-bold leading-[1.5] text-[#edf3ec]">
          {log.commit_message}
        </h4>

        <div className="mt-[clamp(0.35rem,0.6vw,0.48rem)] flex flex-wrap items-center gap-2">
          <span
            className={`rounded-[0.4rem] border px-2.5 py-1 font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] font-black ${getCategoryClasses(
              log.category,
            )}`}
          >
            {log.category.toLowerCase()}
          </span>

          <span className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] text-white/38">
            {log.app_area}
          </span>

          <span className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] text-[#80c966]">
            {getShortSha(log.commit_sha)}
          </span>

          <span className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] text-white/28">
            {log.branch}
          </span>
        </div>
      </div>

      <span className="shrink-0 whitespace-nowrap font-mono text-[clamp(0.66rem,0.74vw,0.8rem)] font-bold text-white/36">
        {formatRelativeTime(log.pushed_at)}
      </span>
    </article>
  );
}

export function DevelopmentActivity({
  logs,
}: DevelopmentActivityProps) {
  return (
    <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(0.9rem,1.5vw,1.2rem)] border border-white/10 bg-[#101713] shadow-[0_1.2rem_3.5rem_rgba(11,24,15,0.16)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#151f18] px-[clamp(0.8rem,1.4vw,1.05rem)] py-[clamp(0.65rem,1.1vw,0.85rem)]">
        <div className="min-w-0">
          <p className="font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.09em] text-white/72">
            recent_activity.log
          </p>

          <p className="mt-1 font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] text-white/34">
            latest synchronized public updates
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-[#7edb5d]/20 bg-[#7edb5d]/10 px-3 py-1 font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#9af07a]">
          {logs.length} entries
        </span>
      </div>

      {logs.length ? (
        <div className="divide-y divide-white/[0.07]">
          {logs.map((log, index) => {
            const content = <ActivityRow log={log} index={index} />;

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
        <div className="px-[clamp(0.8rem,1.4vw,1.05rem)] py-[clamp(1rem,1.8vw,1.4rem)]">
          <p className="font-mono text-[clamp(0.76rem,0.84vw,0.9rem)] text-white/45">
            $ no additional public activity found
          </p>
        </div>
      )}

      <div className="border-t border-white/[0.08] bg-[#0d1410] px-[clamp(0.8rem,1.4vw,1.05rem)] py-[clamp(0.55rem,0.95vw,0.72rem)]">
        <p className="font-mono text-[clamp(0.62rem,0.7vw,0.76rem)] text-white/28">
          showing latest {logs.length} synchronized commits
        </p>
      </div>
    </section>
  );
}