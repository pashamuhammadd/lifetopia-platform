import Link from "next/link";

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

type LatestCommitProps = {
  log?: DevelopmentLogItem;
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

export function LatestCommit({ log }: LatestCommitProps) {
  if (!log) {
    return (
      <section className="rounded-[clamp(0.65rem,1.2vw,0.95rem)] border border-white/10 bg-[#141b16] p-[clamp(0.7rem,1.35vw,1rem)]">
        <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.08em] text-[#8fa095]">
          Latest Commit
        </p>

        <p className="mt-[clamp(0.45rem,0.85vw,0.65rem)] font-mono text-[clamp(0.5rem,0.82vw,0.7rem)] text-white/60">
          Waiting for the next GitHub push...
        </p>
      </section>
    );
  }

  const content = (
    <article className="group relative overflow-hidden rounded-[clamp(0.65rem,1.2vw,0.95rem)] border border-[#77c35d]/18 bg-[#141b16] p-[clamp(0.7rem,1.35vw,1rem)] transition duration-300 hover:-translate-y-[0.08rem] hover:border-[#77c35d]/30 hover:bg-[#172019]">
      <div className="absolute right-0 top-0 h-[clamp(3.5rem,7vw,5.5rem)] w-[clamp(3.5rem,7vw,5.5rem)] rounded-full bg-[#69cf47]/[0.045] blur-2xl" />

      <div className="relative flex items-center justify-between gap-[clamp(0.45rem,1vw,0.8rem)]">
        <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.08em] text-[#8fa095]">
          Latest Commit
        </p>

        <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.4vw,0.32rem)] rounded-full bg-[#64c746]/14 px-[clamp(0.4rem,0.7vw,0.55rem)] py-[clamp(0.12rem,0.26vw,0.2rem)] font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] font-black text-[#80df61]">
          <span className="size-[clamp(0.24rem,0.42vw,0.34rem)] animate-pulse rounded-full bg-[#72db50]" />
          NEW
        </span>
      </div>

      <h3 className="relative mt-[clamp(0.55rem,1vw,0.78rem)] break-words font-mono text-[clamp(0.72rem,1.18vw,1rem)] font-bold leading-[1.45] text-[#f3f7f2]">
        {log.commit_message}
      </h3>

      <div className="relative mt-[clamp(0.55rem,1vw,0.78rem)] flex flex-wrap items-center gap-[clamp(0.28rem,0.55vw,0.42rem)]">
        <span
          className={`rounded-[clamp(0.22rem,0.42vw,0.34rem)] px-[clamp(0.34rem,0.6vw,0.48rem)] py-[clamp(0.1rem,0.22vw,0.16rem)] font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] font-black ${getCategoryClasses(log.category)}`}
        >
          {log.category.toLowerCase()}
        </span>

        <span className="font-mono text-[clamp(0.32rem,0.56vw,0.48rem)] text-[#96a39a]">
          {log.app_area}
        </span>

        <span className="font-mono text-[clamp(0.32rem,0.56vw,0.48rem)] text-[#6f7c73]">
          {getShortSha(log.commit_sha)}
        </span>
      </div>

      <div className="relative mt-[clamp(0.65rem,1.15vw,0.9rem)] flex flex-wrap items-center justify-between gap-[clamp(0.35rem,0.8vw,0.6rem)] border-t border-white/[0.07] pt-[clamp(0.5rem,0.9vw,0.7rem)]">
        <div className="min-w-0">
          <p className="truncate font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] text-[#7f8d83]">
            {log.author_username || "Lifetopia Team"} · {log.branch}
          </p>
        </div>

        <span className="shrink-0 font-mono text-[clamp(0.3rem,0.52vw,0.44rem)] text-[#9ba69f]">
          {formatRelativeTime(log.pushed_at)}
        </span>
      </div>
    </article>
  );

  if (!log.commit_url) {
    return content;
  }

  return (
    <Link
      href={log.commit_url}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      {content}
    </Link>
  );
}
