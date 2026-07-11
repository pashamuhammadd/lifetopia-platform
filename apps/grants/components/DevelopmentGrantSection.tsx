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

const milestones = [
  {
    number: "1",
    title: "Platform Security & Community Beta Foundation",
    amount: "$3,000",
    duration: "2–3 weeks",
    status: "In Progress",
    progress: 60,
    accent: "green",
    items: [
      "Community action hardening",
      "RLS policy review",
      "Guest vs logged-in behavior",
      "Profile and session stability",
    ],
  },
  {
    number: "2",
    title: "Solana Identity & Game Account Integration",
    amount: "$4,000",
    duration: "3–4 weeks",
    status: "Upcoming",
    progress: 0,
    accent: "blue",
    items: [
      "Wallet connection foundation",
      "Account-to-game identity sync",
      "Inventory data structure",
      "Badge and NFT detection foundation",
    ],
  },
  {
    number: "3",
    title: "Public Beta Onboarding & Ecosystem Impact",
    amount: "$3,000",
    duration: "3–4 weeks",
    status: "Upcoming",
    progress: 0,
    accent: "orange",
    items: [
      "Public beta onboarding",
      "Community testing campaign",
      "Feedback collection",
      "Final progress report",
    ],
  },
];

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

function getMilestoneAccent(accent: string) {
  if (accent === "blue") {
    return {
      number: "bg-[#2d83c5]",
      border: "border-[#78b9e8]",
      soft: "bg-[#e8f4fc]",
      text: "text-[#2874ae]",
      progress: "bg-[#378fcf]",
    };
  }

  if (accent === "orange") {
    return {
      number: "bg-[#e98816]",
      border: "border-[#efb362]",
      soft: "bg-[#fff1df]",
      text: "text-[#ca7110]",
      progress: "bg-[#e98a1d]",
    };
  }

  return {
    number: "bg-[#4f922e]",
    border: "border-[#8fc26c]",
    soft: "bg-[#eaf4df]",
    text: "text-[#477f2b]",
    progress: "bg-[#4f922e]",
  };
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

  if (error || !data) {
    return [];
  }

  return data as DevelopmentLogRow[];
}

export async function DevelopmentGrantSection() {
  const logs = await getLatestDevelopmentLogs();

  return (
    <section
      id="development"
      className="relative px-[clamp(0.6rem,2vw,1.3rem)] py-[clamp(2.2rem,5vw,4.5rem)]"
    >
      <div className="grants-container">
        <div className="grid grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] gap-[clamp(0.45rem,1.5vw,1.25rem)]">
          <div className="min-w-0 overflow-hidden rounded-[clamp(0.75rem,1.8vw,1.45rem)] border border-white/10 bg-[#101713] shadow-[0_1.5rem_4rem_rgba(13,29,18,0.25)]">
            <div className="flex items-center justify-between gap-[clamp(0.4rem,1vw,0.8rem)] border-b border-white/10 bg-[#172019] px-[clamp(0.55rem,1.5vw,1.15rem)] py-[clamp(0.5rem,1.1vw,0.85rem)]">
              <div className="flex min-w-0 items-center gap-[clamp(0.3rem,0.7vw,0.55rem)]">
                <span className="text-[clamp(0.52rem,0.9vw,0.78rem)]">
                  🌿
                </span>

                <h2 className="truncate font-mono text-[clamp(0.5rem,0.95vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#f1cf52]">
                  Live Development Log
                </h2>
              </div>

              <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.5vw,0.4rem)] rounded-full bg-[#59bd39]/15 px-[clamp(0.35rem,0.75vw,0.6rem)] py-[clamp(0.16rem,0.35vw,0.28rem)] font-mono text-[clamp(0.38rem,0.65vw,0.55rem)] font-bold text-[#7ae259]">
                <span className="size-[clamp(0.25rem,0.45vw,0.38rem)] rounded-full bg-[#67dc43]" />
                LIVE
              </span>
            </div>

            <div className="p-[clamp(0.55rem,1.5vw,1.1rem)]">
              <div className="overflow-hidden rounded-[clamp(0.55rem,1.2vw,0.9rem)] border border-white/10 bg-[#141b16]">
                {logs.length ? (
                  logs.map((log, index) => {
                    const row = (
                      <article
                        className={[
                          "group px-[clamp(0.5rem,1.2vw,0.9rem)] py-[clamp(0.5rem,1vw,0.78rem)] transition hover:bg-white/[0.035]",
                          index !== logs.length - 1
                            ? "border-b border-white/[0.07]"
                            : "",
                        ].join(" ")}
                      >
                        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-[clamp(0.3rem,0.8vw,0.6rem)]">
                          <span className="mt-[0.1rem] font-mono text-[clamp(0.4rem,0.7vw,0.6rem)] text-[#829087]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0">
                            <h3 className="line-clamp-2 break-words font-mono text-[clamp(0.48rem,0.88vw,0.75rem)] font-semibold leading-[1.45] text-[#f0f4ef]">
                              {log.commit_message}
                            </h3>

                            <div className="mt-[clamp(0.22rem,0.5vw,0.4rem)] flex flex-wrap items-center gap-[clamp(0.2rem,0.5vw,0.4rem)]">
                              <span
                                className={`rounded-[clamp(0.2rem,0.45vw,0.35rem)] px-[clamp(0.28rem,0.55vw,0.45rem)] py-[clamp(0.08rem,0.2vw,0.15rem)] font-mono text-[clamp(0.32rem,0.58vw,0.5rem)] font-bold ${getCategoryClasses(log.category)}`}
                              >
                                {log.category.toLowerCase()}
                              </span>

                              <span className="truncate font-mono text-[clamp(0.32rem,0.58vw,0.5rem)] text-[#87968b]">
                                {log.app_area}
                              </span>

                              <span className="font-mono text-[clamp(0.32rem,0.58vw,0.5rem)] text-[#657269]">
                                {getShortSha(log.commit_sha)}
                              </span>
                            </div>
                          </div>

                          <span className="whitespace-nowrap font-mono text-[clamp(0.34rem,0.6vw,0.52rem)] text-[#9ca79f]">
                            {formatRelativeTime(log.pushed_at)}
                          </span>
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
                  <div className="p-[clamp(0.8rem,1.8vw,1.3rem)]">
                    <p className="font-mono text-[clamp(0.52rem,0.85vw,0.72rem)] text-white/65">
                      Waiting for the next GitHub push...
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] grid grid-cols-[repeat(4,minmax(0,1fr))] items-center gap-[clamp(0.2rem,0.6vw,0.45rem)] rounded-[clamp(0.55rem,1.1vw,0.85rem)] border border-white/10 bg-[#141b16] p-[clamp(0.45rem,1vw,0.75rem)]">
                {[
                  {
                    name: "GitHub",
                    status: "Pushed",
                    symbol: "◆",
                  },
                  {
                    name: "Actions",
                    status: "Building",
                    symbol: "◈",
                  },
                  {
                    name: "API",
                    status: "Synced",
                    symbol: "◎",
                  },
                  {
                    name: "Supabase",
                    status: "Database",
                    symbol: "✚",
                  },
                ].map((step, index) => (
                  <div
                    key={step.name}
                    className="relative min-w-0 text-center"
                  >
                    <div className="mx-auto flex size-[clamp(1.15rem,2.3vw,1.8rem)] items-center justify-center rounded-[clamp(0.3rem,0.7vw,0.55rem)] bg-white/[0.07] font-mono text-[clamp(0.48rem,0.85vw,0.72rem)] text-[#8edc72]">
                      {step.symbol}
                    </div>

                    <p className="mt-[clamp(0.2rem,0.5vw,0.38rem)] truncate font-mono text-[clamp(0.36rem,0.62vw,0.54rem)] font-bold text-white">
                      {step.name}
                    </p>

                    <p className="truncate font-mono text-[clamp(0.3rem,0.52vw,0.46rem)] text-white/45">
                      {step.status}
                    </p>

                    {index < 3 ? (
                      <span className="absolute right-[-0.28rem] top-[clamp(0.35rem,0.8vw,0.62rem)] text-[clamp(0.42rem,0.7vw,0.6rem)] text-[#7ba56c]">
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <Link
                href="https://github.com/pashamuhammadd/lifetopia-platform"
                target="_blank"
                rel="noreferrer"
                className="mt-[clamp(0.55rem,1.2vw,0.9rem)] inline-flex items-center gap-[clamp(0.25rem,0.55vw,0.45rem)] font-mono text-[clamp(0.42rem,0.72vw,0.62rem)] font-bold text-[#e6c74d] transition hover:translate-x-1"
              >
                View full changelog
                <span>→</span>
              </Link>
            </div>
          </div>

          <div
            id="grant-request"
            className="min-w-0 rounded-[clamp(0.75rem,1.8vw,1.45rem)] border border-[#695a40]/12 bg-[#fffaf0] p-[clamp(0.55rem,1.5vw,1.15rem)] shadow-[0_1rem_3.5rem_rgba(67,50,28,0.09)]"
          >
            <div className="flex items-center justify-between gap-[clamp(0.4rem,1vw,0.8rem)]">
              <div className="flex min-w-0 items-center gap-[clamp(0.3rem,0.7vw,0.55rem)]">
                <span className="text-[clamp(0.52rem,0.9vw,0.78rem)]">
                  🌿
                </span>

                <h2 className="truncate text-[clamp(0.54rem,1vw,0.86rem)] font-black uppercase tracking-[0.06em] text-[#3c572d]">
                  Milestone Plan
                </h2>
              </div>

              <span className="shrink-0 text-[clamp(0.36rem,0.65vw,0.56rem)] font-bold text-[#74664e]">
                3 Milestones • 8–12 Weeks
              </span>
            </div>

            <div className="relative mt-[clamp(0.65rem,1.4vw,1rem)] flex flex-col">
              <div className="absolute bottom-[3%] left-[clamp(0.66rem,1.3vw,1rem)] top-[3%] w-[clamp(0.08rem,0.18vw,0.14rem)] bg-[#d8c9aa]" />

              {milestones.map((milestone, index) => {
                const accent = getMilestoneAccent(milestone.accent);

                return (
                  <article
                    key={milestone.number}
                    className={[
                      "relative grid grid-cols-[auto_minmax(0,1fr)_minmax(4.2rem,0.54fr)] gap-[clamp(0.35rem,1vw,0.8rem)] py-[clamp(0.6rem,1.3vw,0.95rem)]",
                      index !== milestones.length - 1
                        ? "border-b border-[#756245]/10"
                        : "",
                    ].join(" ")}
                  >
                    <span
                      className={`relative z-10 flex size-[clamp(1.35rem,2.6vw,2rem)] items-center justify-center rounded-full text-[clamp(0.5rem,0.85vw,0.72rem)] font-black text-white shadow-sm ${accent.number}`}
                    >
                      {milestone.number}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-[clamp(0.48rem,0.9vw,0.76rem)] font-extrabold leading-[1.25] text-[#20251d]">
                        {milestone.title}
                      </h3>

                      <div className="mt-[clamp(0.3rem,0.65vw,0.5rem)] flex flex-wrap items-center gap-[clamp(0.25rem,0.55vw,0.45rem)]">
                        <span
                          className={`rounded-full px-[clamp(0.35rem,0.7vw,0.55rem)] py-[clamp(0.1rem,0.25vw,0.18rem)] text-[clamp(0.32rem,0.55vw,0.48rem)] font-extrabold ${accent.soft} ${accent.text}`}
                        >
                          {milestone.status}
                        </span>

                        <span className="text-[clamp(0.32rem,0.55vw,0.48rem)] font-bold text-[#8a7c65]">
                          {milestone.amount}
                        </span>

                        <span className="text-[clamp(0.32rem,0.55vw,0.48rem)] font-medium text-[#9a8d77]">
                          {milestone.duration}
                        </span>
                      </div>

                      <ul className="mt-[clamp(0.35rem,0.75vw,0.6rem)] flex flex-col gap-[clamp(0.14rem,0.35vw,0.28rem)]">
                        {milestone.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-[clamp(0.2rem,0.45vw,0.36rem)] text-[clamp(0.34rem,0.62vw,0.52rem)] font-medium leading-[1.35] text-[#615846]"
                          >
                            <span className={`${accent.text}`}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`self-center rounded-[clamp(0.5rem,1vw,0.8rem)] border ${accent.border}/35 ${accent.soft} p-[clamp(0.4rem,0.9vw,0.7rem)]`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[clamp(0.3rem,0.55vw,0.46rem)] font-extrabold ${accent.text}`}>
                          {milestone.status}
                        </span>

                        <span className="rounded-full bg-white/70 px-[clamp(0.25rem,0.5vw,0.4rem)] py-[clamp(0.05rem,0.16vw,0.12rem)] text-[clamp(0.28rem,0.5vw,0.44rem)] font-extrabold text-[#625844]">
                          {milestone.progress}%
                        </span>
                      </div>

                      <div className="mt-[clamp(0.3rem,0.65vw,0.5rem)] h-[clamp(0.18rem,0.35vw,0.28rem)] overflow-hidden rounded-full bg-[#cfc4ae]/55">
                        <div
                          className={`h-full rounded-full ${accent.progress}`}
                          style={{
                            width: `${milestone.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] grid grid-cols-3 overflow-hidden rounded-[clamp(0.55rem,1.1vw,0.85rem)] border border-[#67563a]/12 bg-[#f4ecdc]">
              {[
                {
                  label: "Total Request",
                  value: "$10,000",
                },
                {
                  label: "Delivery",
                  value: "8–12 Weeks",
                },
                {
                  label: "Previous Support",
                  value: "$5,000",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={[
                    "min-w-0 p-[clamp(0.4rem,1vw,0.75rem)] text-center",
                    index !== 0 ? "border-l border-[#67563a]/10" : "",
                  ].join(" ")}
                >
                  <p className="truncate text-[clamp(0.28rem,0.52vw,0.45rem)] font-extrabold uppercase tracking-[0.06em] text-[#85765d]">
                    {item.label}
                  </p>

                  <p className="mt-[clamp(0.16rem,0.35vw,0.28rem)] truncate text-[clamp(0.48rem,0.9vw,0.76rem)] font-black text-[#355f31]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}