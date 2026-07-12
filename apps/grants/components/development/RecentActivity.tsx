import Link from "next/link";
import type { DevelopmentLogItem } from "./LatestCommit";

type RecentActivityProps = {
  logs: DevelopmentLogItem[];
};

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();
  const difference = Math.max(
    0,
    Math.floor((Date.now() - pushedAt) / 1000),
  );

  if (difference < 60) return "just now";

  const minutes = Math.floor(difference / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getShortSha(commitSha: string) {
  return commitSha.slice(0, 7);
}

function getCategoryClasses(category: string) {
  const value = category.toLowerCase();

  if (value === "feature") {
    return "bg-[#7d5ce7]/20 text-[#c6b5ff]";
  }

  if (value === "fix") {
    return "bg-[#ef9e35]/20 text-[#ffd18a]";
  }

  if (value === "security") {
    return "bg-[#ee6c60]/20 text-[#ffaaa3]";
  }

  if (value === "docs") {
    return "bg-[#398dcc]/20 text-[#8ed6ff]";
  }

  if (value === "infrastructure") {
    return "bg-[#4aa36c]/20 text-[#9de6b8]";
  }

  return "bg-white/10 text-white/70";
}

export function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <section className="overflow-hidden rounded-[clamp(0.65rem,1.2vw,0.95rem)] border border-white/10 bg-[#141b16]">
      <div className="flex items-center justify-between gap-[clamp(0.4rem,0.9vw,0.7rem)] border-b border-white/[0.07] px-[clamp(0.65rem,1.25vw,0.95rem)] py-[clamp(0.5rem,0.9vw,0.7rem)]">
        <div>
          <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.08em] text-[#8fa095]">
            Recent Activity
          </p>
        </div>

        <span className="font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] text-[#6f7d73]">
          {logs.length} updates
        </span>
      </div>

      {logs.length ? (
        <div>
          {logs.map((log, index) => {
            const content = (
              <article
                className={[
                  "group px-[clamp(0.65rem,1.25vw,0.95rem)] py-[clamp(0.55rem,1vw,0.78rem)] transition hover:bg-white/[0.035]",
                  index !== logs.length - 1
                    ? "border-b border-white/[0.06]"
                    : "",
                ].join(" ")}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-[clamp(0.4rem,0.9vw,0.7rem)]">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 break-words font-mono text-[clamp(0.46rem,0.8vw,0.68rem)] font-semibold leading-[1.45] text-[#edf2ed]">
                      {log.commit_message}
                    </h3>

                    <div className="mt-[clamp(0.22rem,0.45vw,0.34rem)] flex flex-wrap items-center gap-[clamp(0.22rem,0.45vw,0.34rem)]">
                      <span
                        className={`rounded-[clamp(0.2rem,0.4vw,0.32rem)] px-[clamp(0.3rem,0.55vw,0.44rem)] py-[clamp(0.08rem,0.2vw,0.14rem)] font-mono text-[clamp(0.28rem,0.5vw,0.42rem)] font-black ${getCategoryClasses(log.category)}`}
                      >
                        {log.category.toLowerCase()}
                      </span>

                      <span className="truncate font-mono text-[clamp(0.28rem,0.5vw,0.42rem)] text-[#87958b]">
                        {log.app_area}
                      </span>

                      <span className="font-mono text-[clamp(0.28rem,0.5vw,0.42rem)] text-[#66736a]">
                        {getShortSha(log.commit_sha)}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 whitespace-nowrap font-mono text-[clamp(0.28rem,0.5vw,0.42rem)] text-[#98a39b]">
                    {formatRelativeTime(log.pushed_at)}
                  </span>
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
        <div className="px-[clamp(0.65rem,1.25vw,0.95rem)] py-[clamp(0.75rem,1.4vw,1rem)]">
          <p className="font-mono text-[clamp(0.42rem,0.72vw,0.62rem)] text-white/55">
            No additional public activity yet.
          </p>
        </div>
      )}
    </section>
  );
}
