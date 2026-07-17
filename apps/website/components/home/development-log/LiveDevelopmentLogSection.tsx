import {
  ExternalLink,
  GitBranch,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { createClient } from "@repo/lib/supabase/server";

const GITHUB_REPOSITORY_URL =
  "https://github.com/pashamuhammadd/lifetopia-platform";

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

type DevelopmentLogResult =
  | {
      status: "ready";
      logs: DevelopmentLogRow[];
    }
  | {
      status: "empty" | "error";
      logs: [];
    };

function formatRelativeTime(dateString: string) {
  const pushedAt = new Date(dateString).getTime();

  if (!Number.isFinite(pushedAt)) {
    return "date unavailable";
  }

  const differenceInSeconds = Math.max(
    0,
    Math.floor((Date.now() - pushedAt) / 1000),
  );

  if (differenceInSeconds < 60) {
    return "just now";
  }

  const differenceInMinutes = Math.floor(
    differenceInSeconds / 60,
  );

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m ago`;
  }

  const differenceInHours = Math.floor(
    differenceInMinutes / 60,
  );

  if (differenceInHours < 24) {
    return `${differenceInHours}h ago`;
  }

  const differenceInDays = Math.floor(
    differenceInHours / 24,
  );

  if (differenceInDays < 30) {
    return `${differenceInDays}d ago`;
  }

  return formatAbsoluteTime(dateString);
}

function formatAbsoluteTime(dateString: string) {
  const date = new Date(dateString);

  if (!Number.isFinite(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function getShortSha(commitSha: string) {
  return commitSha.slice(0, 7);
}

function getCategoryTone(category: string) {
  const normalizedCategory =
    category.trim().toLowerCase();

  if (normalizedCategory === "feature") {
    return "text-[#9be564]";
  }

  if (normalizedCategory === "fix") {
    return "text-[#ffd36a]";
  }

  if (normalizedCategory === "security") {
    return "text-[#ff9b7a]";
  }

  if (normalizedCategory === "docs") {
    return "text-[#8fd8ff]";
  }

  if (normalizedCategory === "infrastructure") {
    return "text-[#c6a7ff]";
  }

  if (normalizedCategory === "refactor") {
    return "text-[#f6a7ff]";
  }

  return "text-[#d7f5bd]";
}

function getSafeCommitUrl(commitUrl: string | null) {
  if (!commitUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(commitUrl);

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "github.com"
    ) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

async function getLatestDevelopmentLogs(): Promise<DevelopmentLogResult> {
  try {
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
      .order("pushed_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      console.error(
        "[development-log] Failed to load public logs:",
        error.message,
      );

      return {
        status: "error",
        logs: [],
      };
    }

    const logs = (data ?? []) as DevelopmentLogRow[];

    if (!logs.length) {
      return {
        status: "empty",
        logs: [],
      };
    }

    return {
      status: "ready",
      logs,
    };
  } catch (error) {
    console.error(
      "[development-log] Unexpected loading error:",
      error,
    );

    return {
      status: "error",
      logs: [],
    };
  }
}

function TerminalFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[clamp(1rem,1.5vw,1.35rem)] border border-[#2f1b12]/90 bg-[#11120f] shadow-[0_1.25rem_4rem_rgba(47,27,18,0.2)]">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/10 bg-[#191b15] px-4 py-2.5">
        <div
          aria-hidden="true"
          className="flex items-center gap-2"
        >
          <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-2.5 rounded-full bg-[#ffd36a]" />
          <span className="size-2.5 rounded-full bg-[#9be564]" />
        </div>

        <p className="truncate font-mono text-[clamp(0.68rem,0.74vw,0.76rem)] font-bold text-[#d7f5bd]/75">
          lifetopia-platform / development_log
        </p>
      </div>

      <div className="border-b border-white/10 bg-[#0d0f0b] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[clamp(0.7rem,0.8vw,0.82rem)]">
          <span className="text-[#7a8f68]">$</span>
          <span className="text-[#d7f5bd]">
            lifetopia devlog
          </span>
          <span className="text-[#7a8f68]">
            --limit=5 --public
          </span>
        </div>
      </div>

      {children}

      <div className="border-t border-white/10 bg-[#191b15] px-4 py-2.5">
        <p className="font-mono text-[clamp(0.66rem,0.72vw,0.74rem)] leading-[1.55] text-[#9aa98a]">
          GitHub Actions → secure website endpoint →
          Supabase development_logs
        </p>
      </div>
    </div>
  );
}

function DevelopmentLogLoading() {
  return (
    <TerminalFrame>
      <div
        aria-label="Loading development updates"
        className="grid gap-2.5 px-4 py-4"
      >
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"
          >
            <div className="h-3 w-32 rounded bg-white/10 motion-safe:animate-pulse" />
            <div className="mt-3 h-4 w-4/5 rounded bg-white/10 motion-safe:animate-pulse" />
            <div className="mt-3 h-3 w-48 rounded bg-white/10 motion-safe:animate-pulse" />
          </div>
        ))}
      </div>
    </TerminalFrame>
  );
}

function DevelopmentLogState({
  type,
}: {
  type: "empty" | "error";
}) {
  const isError = type === "error";

  return (
    <TerminalFrame>
      <div className="px-4 py-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-4">
          <p className="font-mono text-[clamp(0.76rem,0.86vw,0.9rem)] font-bold text-[#f8ffe9]">
            {isError
              ? "Development updates are temporarily unavailable."
              : "No public development updates are available yet."}
          </p>

          <p className="mt-2 font-mono text-[clamp(0.68rem,0.76vw,0.8rem)] leading-[1.6] text-[#9aa98a]">
            {isError
              ? "The website remains available. Development activity can still be reviewed directly on GitHub."
              : "New public commits will appear here after they are synchronized."}
          </p>

          <Link
            href={GITHUB_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#9be564]/30 bg-[#9be564]/10 px-4 font-mono text-[0.75rem] font-black text-[#9be564] transition hover:border-[#9be564]/55 hover:bg-[#9be564]/15"
          >
            <GitBranch className="size-4" />
            Open GitHub
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>
    </TerminalFrame>
  );
}

async function DevelopmentLogFeed() {
  const result =
    await getLatestDevelopmentLogs();

  if (result.status !== "ready") {
    return (
      <DevelopmentLogState
        type={result.status}
      />
    );
  }

  return (
    <TerminalFrame>
      <div className="grid gap-2.5 px-4 py-4">
        {result.logs.map((log, index) => {
          const commitUrl =
            getSafeCommitUrl(log.commit_url);

          const content = (
            <article className="group rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:border-[#9be564]/40 hover:bg-white/[0.06]">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[clamp(0.66rem,0.72vw,0.75rem)]">
                <span className="text-[#7a8f68]">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span
                  className={getCategoryTone(
                    log.category,
                  )}
                >
                  {log.category.toLowerCase()}
                </span>

                <span className="text-[#7a8f68]">
                  /
                </span>

                <span className="text-[#f4ead4]">
                  {log.app_area}
                </span>
              </div>

              <h3 className="mt-2 break-words font-mono text-[clamp(0.8rem,0.92vw,0.96rem)] font-bold leading-[1.55] text-[#f8ffe9]">
                <span className="text-[#7a8f68]">
                  commit:
                </span>{" "}
                {log.commit_message}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[clamp(0.66rem,0.72vw,0.75rem)] text-[#9aa98a]">
                <span>
                  branch:{log.branch}
                </span>

                <span title={log.commit_sha}>
                  sha:
                  {getShortSha(
                    log.commit_sha,
                  )}
                </span>

                {log.author_username ? (
                  <span>
                    author:@
                    {log.author_username}
                  </span>
                ) : log.author_name ? (
                  <span>
                    author:{log.author_name}
                  </span>
                ) : null}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2">
                <time
                  dateTime={log.pushed_at}
                  title={formatAbsoluteTime(
                    log.pushed_at,
                  )}
                  className="font-mono text-[clamp(0.66rem,0.72vw,0.75rem)] text-[#8fd8ff]"
                >
                  {formatRelativeTime(
                    log.pushed_at,
                  )}
                </time>

                <span className="font-mono text-[clamp(0.64rem,0.7vw,0.72rem)] text-[#7a8f68]">
                  {formatAbsoluteTime(
                    log.pushed_at,
                  )}{" "}
                  UTC
                </span>
              </div>
            </article>
          );

          if (!commitUrl) {
            return (
              <div key={log.id}>
                {content}
              </div>
            );
          }

          return (
            <Link
              key={log.id}
              href={commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open GitHub commit: ${log.commit_message}`}
              className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9be564] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11120f]"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </TerminalFrame>
  );
}

export function LiveDevelopmentLogSection() {
  return (
    <section
      id="development-log"
      aria-labelledby="development-log-title"
      className="relative overflow-hidden bg-[#fff8e8] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[-8rem] size-[24rem] rounded-full bg-[#6fa83a]/16 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-[-8rem] size-[25rem] rounded-full bg-[#ffd58a]/24 blur-[7rem]"
      />

      <div className="lt-container relative">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[47rem]">
            <span className="lt-badge border-[#c7dcb9] bg-white/78 text-[#527d40]">
              <TerminalSquare className="size-3.5" />
              Built in Public
            </span>

            <h2
              id="development-log-title"
              className="lt-section-title mt-3"
            >
              Latest Development Updates
            </h2>

            <p className="lt-section-copy mt-3 max-w-[43rem]">
              The five most recent public development
              records synchronized from the Lifetopia
              repository, including the affected product
              area and direct commit evidence.
            </p>
          </div>

          <Link
            href={GITHUB_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lt-button-secondary w-fit shrink-0 gap-2 px-4"
          >
            <GitBranch className="size-4" />
            View Development on GitHub
            <ExternalLink className="size-3.5" />
          </Link>
        </header>

        <div className="mt-[clamp(1.25rem,2vw,1.65rem)]">
          <Suspense
            fallback={
              <DevelopmentLogLoading />
            }
          >
            <DevelopmentLogFeed />
          </Suspense>
        </div>
      </div>
    </section>
  );
}