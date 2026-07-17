import { Code2, ExternalLink, ScrollText, Sparkles } from "lucide-react";
import Link from "next/link";

import { createClient } from "@repo/lib/supabase/server";

import { Card } from "@/components/ui/Card";

type DevelopmentLog = {
  id: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  app_area: string;
  pushed_at: string;
};

async function getLatestDevelopmentLogs(): Promise<DevelopmentLog[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("development_logs")
      .select("id, commit_sha, commit_message, commit_url, app_area, pushed_at")
      .eq("is_public", true)
      .order("pushed_at", { ascending: false })
      .limit(3);

    if (error || !data) return [];

    return data as DevelopmentLog[];
  } catch {
    return [];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Recent update";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatArea(value: string) {
  return value.replace(/[-_]+/g, " ");
}

export async function RightSidebar() {
  const developmentLogs = await getLatestDevelopmentLogs();

  return (
    <aside className="hidden space-y-4 2xl:block">
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <ScrollText size={18} className="text-[#4f8124]" />
          <h2 className="font-black text-[#2f2418]">Community Quest</h2>
        </div>

        <p className="mt-3 text-sm font-semibold leading-6 text-[#7a5635]">
          Daily social quests and real Harmony rewards are being prepared.
          Progress will only appear after the quest system is connected.
        </p>

        <span className="mt-4 inline-flex rounded-full border border-[#cfe2bd] bg-[#edf7df] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#4f8124]">
          In Preparation
        </span>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-[#4f8124]" />
            <h2 className="font-black text-[#2f2418]">Development Log</h2>
          </div>

          <Link
            href="https://github.com/pashamuhammadd/lifetopia-platform/commits/main"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Lifetopia development on GitHub"
            className="text-[#7a5635] transition hover:text-[#4f8124]"
          >
            <ExternalLink size={16} />
          </Link>
        </div>

        {developmentLogs.length ? (
          <div className="mt-4 space-y-3">
            {developmentLogs.map((log) => {
              const content = (
                <article className="rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-3.5 py-3 transition hover:border-[#b8d89e] hover:bg-[#f5faef]">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-wide text-[#9b6635]">
                    <span className="truncate">{formatArea(log.app_area)}</span>
                    <time dateTime={log.pushed_at}>{formatDate(log.pushed_at)}</time>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs font-bold leading-5 text-[#2f2418]">
                    {log.commit_message}
                  </p>

                  <p className="mt-2 font-mono text-[10px] font-bold text-[#4f8124]">
                    {log.commit_sha.slice(0, 7)}
                  </p>
                </article>
              );

              return log.commit_url ? (
                <Link
                  key={log.id}
                  href={log.commit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </Link>
              ) : (
                <div key={log.id}>{content}</div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] p-4">
            <p className="text-xs font-bold leading-5 text-[#7a5635]">
              Public development updates are temporarily unavailable. The full
              commit history remains available on GitHub.
            </p>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[#dff7ff] via-[#fff7e8] to-[#edf7df] p-5">
          <Sparkles size={20} className="text-[#4f8124]" />

          <h2 className="mt-3 text-lg font-black leading-tight text-[#2f2418]">
            More community systems are growing.
          </h2>

          <p className="mt-2 text-sm font-semibold leading-6 text-[#7a5635]">
            Trending topics, suggested Lifetopians, and guild discovery will be
            activated with real community data.
          </p>
        </div>
      </Card>
    </aside>
  );
}
