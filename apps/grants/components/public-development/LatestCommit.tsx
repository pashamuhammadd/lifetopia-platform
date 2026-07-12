import Link from "next/link";

export type PublicDevelopmentLog = {
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

type LatestCommitProps = {
  log?: PublicDevelopmentLog;
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

function CommitContent({ log }: { log: PublicDevelopmentLog }) {
  return (
    <article className="group relative overflow-hidden rounded-[clamp(0.9rem,1.5vw,1.2rem)] border border-white/10 bg-[#101713] shadow-[0_1.2rem_3.5rem_rgba(11,24,15,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#79c85e]/25 hover:shadow-[0_1.5rem_4rem_rgba(11,24,15,0.24)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(126,220,92,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(126,220,92,0.14) 1px, transparent 1px)",
          backgroundSize: "2rem 2rem",
        }}
      />

      <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#151f18] px-[clamp(0.75rem,1.4vw,1.1rem)] py-[clamp(0.65rem,1.1vw,0.85rem)]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#e96f62]" />
            <span className="size-2.5 rounded-full bg-[#e9b149]" />
            <span className="size-2.5 rounded-full bg-[#72c85a]" />
          </div>

          <p className="truncate font-mono text-[clamp(0.72rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em] text-white/72">
            latest_commit
          </p>
        </div>

        <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#7edb5d]/20 bg-[#7edb5d]/10 px-3 py-1 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black text-[#9af07a]">
          <span className="size-2 animate-pulse rounded-full bg-[#85e863]" />
          LIVE
        </span>
      </div>

      <div className="relative p-[clamp(1rem,1.8vw,1.5rem)]">
        <div className="flex items-start gap-[clamp(0.65rem,1vw,0.85rem)]">
          <span className="mt-1 shrink-0 font-mono text-[clamp(0.95rem,1.4vw,1.2rem)] font-black text-[#8be469]">
            $
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-[clamp(0.74rem,0.84vw,0.9rem)] font-bold text-[#91a398]">
              git log -1 --oneline
            </p>

            <h3 className="mt-[clamp(0.6rem,1vw,0.8rem)] break-words font-mono text-[clamp(1.05rem,1.65vw,1.45rem)] font-black leading-[1.45] text-[#f1f5f0]">
              {log.commit_message}
            </h3>

            <div className="mt-[clamp(0.8rem,1.3vw,1rem)] flex flex-wrap items-center gap-2">
              <span
                className={`rounded-[0.45rem] border px-3 py-1.5 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black ${getCategoryClasses(
                  log.category,
                )}`}
              >
                {log.category.toLowerCase()}
              </span>

              <span className="rounded-[0.45rem] border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-white/62">
                {log.app_area}
              </span>

              <span className="rounded-[0.45rem] border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#8edb70]">
                {getShortSha(log.commit_sha)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(1rem,1.6vw,1.3rem)] grid gap-[clamp(0.55rem,1vw,0.8rem)] border-t border-white/[0.08] pt-[clamp(0.8rem,1.3vw,1rem)] sm:grid-cols-3">
          <div className="min-w-0">
            <p className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] uppercase tracking-[0.08em] text-white/32">
              author
            </p>

            <p className="mt-1 truncate font-mono text-[clamp(0.76rem,0.84vw,0.9rem)] font-bold text-white/75">
              {log.author_username || "Lifetopia Team"}
            </p>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] uppercase tracking-[0.08em] text-white/32">
              branch
            </p>

            <p className="mt-1 truncate font-mono text-[clamp(0.76rem,0.84vw,0.9rem)] font-bold text-white/75">
              {log.branch}
            </p>
          </div>

          <div className="min-w-0 sm:text-right">
            <p className="font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] uppercase tracking-[0.08em] text-white/32">
              pushed
            </p>

            <p className="mt-1 font-mono text-[clamp(0.76rem,0.84vw,0.9rem)] font-bold text-[#91e773]">
              {formatRelativeTime(log.pushed_at)}
            </p>
          </div>
        </div>

        {log.commit_url ? (
          <div className="mt-[clamp(1rem,1.6vw,1.3rem)] flex justify-end">
            <span className="inline-flex items-center gap-2 font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#91e773] transition group-hover:translate-x-1">
              view commit
              <span aria-hidden="true">↗</span>
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function LatestCommit({ log }: LatestCommitProps) {
  if (!log) {
    return (
      <div className="overflow-hidden rounded-[clamp(0.9rem,1.5vw,1.2rem)] border border-white/10 bg-[#101713] shadow-[0_1.2rem_3.5rem_rgba(11,24,15,0.18)]">
        <div className="flex items-center gap-3 border-b border-white/[0.08] bg-[#151f18] px-[clamp(0.75rem,1.4vw,1.1rem)] py-[clamp(0.65rem,1.1vw,0.85rem)]">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#e96f62]" />
            <span className="size-2.5 rounded-full bg-[#e9b149]" />
            <span className="size-2.5 rounded-full bg-[#72c85a]" />
          </div>

          <p className="font-mono text-[clamp(0.72rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em] text-white/72">
            latest_commit
          </p>
        </div>

        <div className="p-[clamp(1rem,1.8vw,1.5rem)]">
          <p className="font-mono text-[clamp(0.78rem,0.88vw,0.94rem)] text-[#91a398]">
            $ waiting for the next public GitHub push...
          </p>
        </div>
      </div>
    );
  }

  if (!log.commit_url) {
    return <CommitContent log={log} />;
  }

  return (
    <Link
      href={log.commit_url}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <CommitContent log={log} />
    </Link>
  );
}