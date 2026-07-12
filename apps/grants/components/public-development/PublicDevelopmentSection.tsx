import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

import { TechnologyIcon } from "@/components/TechnologyIcon";
import { DevelopmentActivity } from "./DevelopmentActivity";
import {
  LatestCommit,
  type PublicDevelopmentLog,
} from "./LatestCommit";

type FeedAvailability = "available" | "unavailable";

type DevelopmentFeedResult = {
  logs: PublicDevelopmentLog[];
  availability: FeedAvailability;
};

type VerificationTone =
  | "green"
  | "blue"
  | "gold"
  | "neutral";

type VerificationItem = {
  label: string;
  value: string;
  description: string;
  tone: VerificationTone;
};

const repositoryUrl =
  "https://github.com/pashamuhammadd/lifetopia-platform";

const workflowSteps = [
  {
    label: "GitHub",
    command: "git push origin main",
    description:
      "Source code and public commit history are stored in the project repository.",
    icon: "mdi:github",
  },
  {
    label: "Synchronization",
    command: "record public development",
    description:
      "Approved development records are synchronized into the public log database.",
    icon: "mdi:sync",
  },
  {
    label: "Review Portal",
    command: "present verifiable evidence",
    description:
      "The latest available records are displayed for reviewers and community members.",
    icon: "mdi:web",
  },
];

function getVerificationClasses(tone: VerificationTone) {
  if (tone === "blue") {
    return {
      dot: "bg-[#55a9dc]",
      value: "text-[#9bdcff]",
      badge:
        "border-[#55a9dc]/20 bg-[#55a9dc]/10 text-[#9bdcff]",
    };
  }

  if (tone === "gold") {
    return {
      dot: "bg-[#e7ad3f]",
      value: "text-[#ffd486]",
      badge:
        "border-[#e7ad3f]/20 bg-[#e7ad3f]/10 text-[#ffd486]",
    };
  }

  if (tone === "neutral") {
    return {
      dot: "bg-white/35",
      value: "text-white/62",
      badge:
        "border-white/10 bg-white/[0.05] text-white/58",
    };
  }

  return {
    dot: "bg-[#80d85f]",
    value: "text-[#9bec7b]",
    badge:
      "border-[#7edb5d]/20 bg-[#7edb5d]/10 text-[#9af07a]",
  };
}

async function getPublicDevelopmentLogs(): Promise<DevelopmentFeedResult> {
  try {
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
      .order("pushed_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      return {
        logs: [],
        availability: "unavailable",
      };
    }

    return {
      logs: (data ?? []) as PublicDevelopmentLog[],
      availability: "available",
    };
  } catch {
    return {
      logs: [],
      availability: "unavailable",
    };
  }
}

export async function PublicDevelopmentSection() {
  const feed = await getPublicDevelopmentLogs();

  const isFeedAvailable =
    feed.availability === "available";

  const hasPublicLogs =
    isFeedAvailable && feed.logs.length > 0;

  const latestCommit = hasPublicLogs
    ? feed.logs[0]
    : undefined;

  const recentActivity = hasPublicLogs
    ? feed.logs.slice(1)
    : [];

  const verificationItems: VerificationItem[] = [
    {
      label: "Public Feed",
      value: !isFeedAvailable
        ? "Unavailable"
        : hasPublicLogs
          ? "Verified"
          : "Connected",
      description: !isFeedAvailable
        ? "The database feed could not be verified during this request."
        : hasPublicLogs
          ? "Public development records were retrieved successfully."
          : "The feed is reachable but currently contains no public records.",
      tone: !isFeedAvailable
        ? "gold"
        : hasPublicLogs
          ? "green"
          : "blue",
    },
    {
      label: "Records Loaded",
      value: isFeedAvailable
        ? String(feed.logs.length)
        : "N/A",
      description: isFeedAvailable
        ? "Latest public records returned for this page."
        : "No record count is shown while the feed is unavailable.",
      tone: isFeedAvailable
        ? "blue"
        : "neutral",
    },
    {
      label: "Source Repository",
      value: "Public",
      description:
        "Source code and commit history can be reviewed directly on GitHub.",
      tone: "green",
    },
  ];

  const panelStatus = !isFeedAvailable
    ? {
        label: "Feed unavailable",
        classes:
          "border-[#e3ad47]/20 bg-[#e3ad47]/10 text-[#ffd180]",
        dot: "bg-[#e7ad3f]",
      }
    : hasPublicLogs
      ? {
          label: "Evidence available",
          classes:
            "border-[#7edb5d]/20 bg-[#7edb5d]/10 text-[#9af07a]",
          dot: "bg-[#80d85f]",
        }
      : {
          label: "No public records",
          classes:
            "border-[#55a9dc]/20 bg-[#55a9dc]/10 text-[#9bdcff]",
          dot: "bg-[#55a9dc]",
        };

  return (
    <section
      id="public-development"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,92,49,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,92,49,0.06) 1px, transparent 1px)",
          backgroundSize:
            "clamp(2rem,3vw,2.8rem) clamp(2rem,3vw,2.8rem)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[3rem] size-[22rem] rounded-full bg-[#dcefd0]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[1rem] right-[-9rem] size-[24rem] rounded-full bg-[#d9edfa]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b8cea8] bg-[#edf7e6] px-4 py-2 font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.13em] text-[#4f7b3c]">
              <span
                className={[
                  "size-2 rounded-full",
                  hasPublicLogs
                    ? "animate-pulse bg-[#68ad4a]"
                    : isFeedAvailable
                      ? "bg-[#55a9dc]"
                      : "bg-[#e2a73a]",
                ].join(" ")}
              />

              Public Development Evidence
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[50rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2e2118]">
              Development progress reviewers can verify directly.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Public development records are surfaced from Lifetopia&apos;s
              synchronized log feed. Reviewers can inspect the latest available
              entries here and verify the source repository directly.
            </p>
          </div>

          <aside className="overflow-hidden rounded-[clamp(0.9rem,1.4vw,1.1rem)] border border-[#203526]/15 bg-[#102016] shadow-[0_1.2rem_3.5rem_rgba(28,54,34,0.14)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#17291c] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#e66d62]" />
                  <span className="size-2.5 rounded-full bg-[#e9b049]" />
                  <span className="size-2.5 rounded-full bg-[#70c758]" />
                </div>

                <p className="truncate font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-bold text-white/65">
                  evidence_status.json
                </p>
              </div>

              <span
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 font-mono text-[clamp(0.66rem,0.74vw,0.8rem)] font-black ${panelStatus.classes}`}
              >
                <span
                  className={`size-2 rounded-full ${panelStatus.dot}`}
                />

                {panelStatus.label}
              </span>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {verificationItems.map((item) => {
                const classes = getVerificationClasses(
                  item.tone,
                );

                return (
                  <article
                    key={item.label}
                    className="px-4 py-3.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] text-white/48">
                        {item.label}
                      </p>

                      <span
                        className={`flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[clamp(0.66rem,0.74vw,0.8rem)] font-black ${classes.badge}`}
                      >
                        <span
                          className={`size-2 rounded-full ${classes.dot}`}
                        />

                        {item.value}
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-[clamp(0.66rem,0.74vw,0.8rem)] leading-[1.55] text-white/34">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </aside>
        </header>

        <section className="mt-[clamp(2rem,4vw,3rem)] overflow-hidden rounded-[clamp(0.95rem,1.6vw,1.25rem)] border border-[#d7c9aa] bg-white shadow-[0_1.2rem_4rem_rgba(62,46,25,0.08)]">
          <div className="flex flex-col gap-3 border-b border-[#e9dec7] bg-[#faf6ec] px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.8rem,1.3vw,1rem)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.1em] text-[#5c7d4d]">
                development_evidence_pipeline
              </p>

              <p className="mt-1 text-[clamp(0.8rem,0.9vw,0.96rem)] text-[#766b59]">
                How source activity becomes reviewable public evidence
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#d9cdae] bg-[#f4eddf] px-3 py-1.5 font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-black text-[#74674f]">
              documented workflow
            </span>
          </div>

          <div className="grid gap-[clamp(0.65rem,1.2vw,0.9rem)] p-[clamp(0.8rem,1.4vw,1.1rem)] md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article
                key={step.label}
                className="relative min-w-0 rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-[#e3d7be] bg-[#fcf9f2] p-[clamp(0.8rem,1.3vw,1rem)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-[clamp(2.8rem,4vw,3.35rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.82rem)] bg-[#183e22] text-white">
                    <TechnologyIcon
                      icon={step.icon}
                      label={step.label}
                    />
                  </span>

                  <div className="min-w-0">
                    <p className="font-mono text-[clamp(0.66rem,0.74vw,0.8rem)] font-black text-[#6b875e]">
                      STEP {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-1 text-[clamp(0.98rem,1.08vw,1.14rem)] font-black text-[#2f241c]">
                      {step.label}
                    </h3>

                    <p className="mt-1 break-words font-mono text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#5b8750]">
                      $ {step.command}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.6] text-[#746957]">
                  {step.description}
                </p>

                {index < workflowSteps.length - 1 ? (
                  <span className="absolute -right-[clamp(0.9rem,1.45vw,1.15rem)] top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[clamp(1.1rem,1.6vw,1.4rem)] font-black text-[#7f9b71] md:block">
                    →
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {!isFeedAvailable ? (
          <section className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(0.9rem,1.5vw,1.2rem)] border border-[#e0b45e]/35 bg-[#fff7e4] p-[clamp(1rem,1.7vw,1.35rem)] shadow-[0_0.8rem_2.5rem_rgba(95,67,20,0.06)]">
            <div className="flex items-start gap-3">
              <span className="flex size-[clamp(2.7rem,4vw,3.2rem)] shrink-0 items-center justify-center rounded-[0.8rem] border border-[#deb45d]/30 bg-[#ffedbf] font-black text-[#9b701e]">
                !
              </span>

              <div className="min-w-0">
                <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-[#987020]">
                  Public Feed Temporarily Unavailable
                </p>

                <h3 className="mt-2 text-[clamp(1.1rem,1.4vw,1.35rem)] font-black text-[#3d3020]">
                  Live records could not be verified during this request.
                </h3>

                <p className="mt-2 max-w-[48rem] text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#79694f]">
                  The portal does not display a healthy or synchronized status
                  when the database query fails. Reviewers can still inspect
                  the public repository and commit history directly.
                </p>

                <Link
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-[2.8rem] items-center justify-center gap-2 rounded-[0.75rem] bg-[#173b21] px-4 text-[clamp(0.76rem,0.86vw,0.92rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-[#24502d]"
                >
                  Review GitHub Repository
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <>
            <div className="mt-[clamp(1rem,2vw,1.5rem)]">
              <LatestCommit log={latestCommit} />
            </div>

            <DevelopmentActivity
              logs={recentActivity}
            />
          </>
        )}

        <footer className="mt-[clamp(1.2rem,2.2vw,1.8rem)] flex flex-col gap-5 rounded-[clamp(0.95rem,1.5vw,1.2rem)] border border-[#d7c8a8] bg-[#fffaf0] p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_1rem_3rem_rgba(58,42,22,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[46rem]">
            <p className="font-mono text-[clamp(0.7rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.09em] text-[#628052]">
              verify_development
            </p>

            <h3 className="mt-2 text-[clamp(1.1rem,1.45vw,1.35rem)] font-black text-[#30251c]">
              Review the source repository and verify development activity
              independently.
            </h3>

            <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
              The repository remains the primary source of truth for code,
              commits, project structure, and ongoing technical delivery.
            </p>
          </div>

          <Link
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2 rounded-[0.8rem] bg-[#173b21] px-5 text-[clamp(0.78rem,0.88vw,0.94rem)] font-black text-white shadow-[0_0.7rem_1.8rem_rgba(31,64,37,0.16)] transition hover:-translate-y-0.5 hover:bg-[#24502d]"
          >
            Open Public Repository
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}