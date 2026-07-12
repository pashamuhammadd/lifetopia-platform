import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

import {
  LeftDashboard,
  type DevelopmentLogItem,
} from "./development/LeftDashboard";
import { RightDashboard } from "./development/RightDashboard";

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

  return data as DevelopmentLogItem[];
}

const overviewStats = [
  {
    label: "Funding",
    value: "$10K",
    icon: "$",
  },
  {
    label: "Timeline",
    value: "8–12 Weeks",
    icon: "◫",
  },
  {
    label: "Milestones",
    value: "3",
    icon: "⚑",
  },
];

export async function DevelopmentGrantSection() {
  const logs = await getLatestDevelopmentLogs();

  return (
    <section
      id="development"
    className="development-readable relative overflow-hidden bg-[#050b07] px-[clamp(0.65rem,2vw,1.35rem)] py-[clamp(2.8rem,6vw,5.5rem)] text-white"
>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(126,240,77,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(126,240,77,0.07) 1px, transparent 1px)",
          backgroundSize:
            "clamp(2rem,3.5vw,3rem) clamp(2rem,3.5vw,3rem)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-[3%] size-[clamp(17rem,35vw,32rem)] rounded-full bg-[#79e84e]/[0.07] blur-[clamp(5rem,10vw,9rem)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] size-[clamp(16rem,30vw,28rem)] rounded-full bg-[#26a85a]/[0.06] blur-[clamp(5rem,10vw,9rem)]"
      />

      <div className="grants-container relative">
        <div className="rounded-[clamp(0.95rem,1.7vw,1.35rem)] border border-white/[0.08] bg-[#07100a]/80 p-[clamp(0.75rem,1.45vw,1.15rem)] shadow-[0_2rem_6rem_rgba(0,0,0,0.32)] backdrop-blur-sm">
          <header className="grid gap-[clamp(0.9rem,1.8vw,1.4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.13em] text-[#92ef68]">
                  Development & Delivery
                </p>

                <span className="size-[clamp(0.35rem,0.6vw,0.48rem)] rounded-full bg-[#91ed62] shadow-[0_0_0.8rem_rgba(145,237,98,0.7)]" />
              </div>

              <h2 className="mt-[clamp(0.35rem,0.7vw,0.55rem)] max-w-[48rem] text-[clamp(1.45rem,3.2vw,2.9rem)] font-black leading-[1.02] tracking-[-0.045em] text-white">
                Public execution, measurable progress, and a clear path to
                Beta.
              </h2>

              <p className="mt-[clamp(0.45rem,0.85vw,0.65rem)] max-w-[41rem] text-[clamp(0.48rem,0.8vw,0.7rem)] font-medium leading-[1.65] text-white/55">
                Every milestone is connected to visible development activity,
                product delivery, and transparent reporting.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[clamp(0.35rem,0.75vw,0.58rem)]">
              {overviewStats.map((stat) => (
                <article
                  key={stat.label}
                  className="min-w-0 rounded-[clamp(0.6rem,1vw,0.8rem)] border border-white/[0.08] bg-[#0c1710] px-[clamp(0.45rem,0.9vw,0.7rem)] py-[clamp(0.55rem,1vw,0.8rem)] text-center shadow-[0_0.8rem_2rem_rgba(0,0,0,0.14)]"
                >
                  <span className="mx-auto flex size-[clamp(1.45rem,2.4vw,1.9rem)] items-center justify-center rounded-full border border-[#8eea5d]/20 bg-[#8eea5d]/[0.07] font-mono text-[clamp(0.42rem,0.7vw,0.6rem)] font-black text-[#93ef68]">
                    {stat.icon}
                  </span>

                  <p className="mt-[clamp(0.3rem,0.55vw,0.42rem)] truncate font-mono text-[clamp(0.25rem,0.43vw,0.36rem)] font-black uppercase tracking-[0.08em] text-white/38">
                    {stat.label}
                  </p>

                  <p className="mt-1 truncate text-[clamp(0.55rem,0.9vw,0.76rem)] font-black text-[#92ef68]">
                    {stat.value}
                  </p>
                </article>
              ))}
            </div>
          </header>

          <div className="mt-[clamp(0.9rem,1.7vw,1.3rem)] grid items-start gap-[clamp(0.75rem,1.4vw,1.05rem)] xl:grid-cols-[minmax(0,0.93fr)_minmax(0,1.07fr)]">
            <LeftDashboard logs={logs} />
            <RightDashboard />
          </div>

          <footer className="mt-[clamp(0.8rem,1.5vw,1.15rem)] flex flex-col gap-4 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/[0.08] bg-[#0a140d] px-[clamp(0.7rem,1.25vw,1rem)] py-[clamp(0.65rem,1.1vw,0.88rem)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-[clamp(0.5rem,0.9vw,0.7rem)]">
              <span className="flex size-[clamp(2rem,3vw,2.4rem)] shrink-0 items-center justify-center rounded-[clamp(0.5rem,0.8vw,0.65rem)] border border-[#8fe965]/20 bg-[#8fe965]/[0.07] text-[clamp(0.75rem,1.2vw,1rem)] text-[#93ef68]">
                ◇
              </span>

              <div className="min-w-0">
                <p className="text-[clamp(0.52rem,0.85vw,0.72rem)] font-extrabold leading-[1.4] text-white">
                  Every development update is publicly tracked and synchronized
                  from GitHub.
                </p>

                <p className="mt-1 text-[clamp(0.32rem,0.54vw,0.46rem)] text-white/38">
                  Built in public · Weekly updates · GitHub · Community
                  transparency
                </p>
              </div>
            </div>

            <Link
              href="https://github.com/pashamuhammadd/lifetopia-platform"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[clamp(0.5rem,0.85vw,0.7rem)] bg-[#8eea45] px-[clamp(0.9rem,1.45vw,1.2rem)] py-[clamp(0.55rem,0.9vw,0.75rem)] text-[clamp(0.42rem,0.7vw,0.6rem)] font-black text-[#071008] shadow-[0_0.7rem_2rem_rgba(142,234,69,0.17)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#a4f669]"
            >
              View Development Log
              <span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}