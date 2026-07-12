import Image from "next/image";
import Link from "next/link";

import { GrantsNavbar } from "@/components/GrantsNavbar";

type StatAccent = "green" | "blue" | "gold" | "purple";

type ProjectStat = {
  label: string;
  value: string;
  detail: string;
  accent: StatAccent;
};

const projectStats: ProjectStat[] = [
  {
    label: "Current Phase",
    value: "Beta Development",
    detail: "Active product integration",
    accent: "green",
  },
  {
    label: "Public Game Build",
    value: "Alpha Available",
    detail: "Playable for public review",
    accent: "blue",
  },
  {
    label: "Previous Grant",
    value: "$5,000",
    detail: "Superteam Indonesia",
    accent: "purple",
  },
  {
    label: "Current Request",
    value: "$10,000",
    detail: "8–12 week milestone plan",
    accent: "gold",
  },
];

function getAccentClasses(accent: StatAccent) {
  if (accent === "blue") {
    return {
      dot: "bg-[#54b9eb]",
      label: "text-[#9bdfff]",
      value: "text-white",
      glow: "bg-[#54b9eb]/10",
    };
  }

  if (accent === "gold") {
    return {
      dot: "bg-[#f2bd32]",
      label: "text-[#ffd66b]",
      value: "text-[#ffd44f]",
      glow: "bg-[#f2bd32]/10",
    };
  }

  if (accent === "purple") {
    return {
      dot: "bg-[#a389f1]",
      label: "text-[#cfc0ff]",
      value: "text-white",
      glow: "bg-[#a389f1]/10",
    };
  }

  return {
    dot: "bg-[#82d45e]",
    label: "text-[#b7ec9e]",
    value: "text-white",
    glow: "bg-[#82d45e]/10",
  };
}

export function GrantHero() {
  return (
    <header
      id="overview"
      className="relative overflow-hidden bg-[#f8f2e7]"
    >
      <GrantsNavbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(118deg,#fff8e9_0%,rgba(255,250,239,0.97)_40%,rgba(184,231,250,0.68)_70%,rgba(79,181,229,0.78)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(31,87,39,0.56),transparent)]" />

        <div className="absolute left-[44%] top-[3%] size-[clamp(12rem,27vw,23rem)] rounded-full bg-white/50 blur-[clamp(2.5rem,5vw,4.8rem)]" />

        <div className="absolute -left-[8%] top-[4%] size-[clamp(9rem,20vw,18rem)] rounded-full bg-[#fff0b0]/48 blur-[clamp(2.5rem,5vw,4.5rem)]" />

        <div className="grants-grid-pattern absolute inset-0 opacity-25" />

        <div className="grants-container relative z-10 pb-[clamp(1.2rem,2.5vw,2rem)] pt-[clamp(2rem,4.5vw,4rem)]">
          <div className="grid items-center gap-[clamp(1.5rem,4vw,4rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
            <div className="relative z-20 min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4f853d]/18 bg-[#edf6e6]/90 px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.13em] text-[#4b7a3c] shadow-[0_0.5rem_1.5rem_rgba(53,93,47,0.07)] backdrop-blur">
                <span className="size-2 rounded-full bg-[#69b84b]" />
                Solana Ecosystem Funding Proposal
              </span>

              <h1 className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[14ch] text-[clamp(2.4rem,5.1vw,5rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#172016]">
                Building a connected{" "}
                <span className="text-[#397c37]">
                  cozy world
                </span>{" "}
                powered by Solana.
              </h1>

              <p className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[43rem] text-[clamp(0.98rem,1.2vw,1.16rem)] font-medium leading-[1.75] text-[#554f43]">
                Lifetopia World combines a playable life-simulation game, a
                community platform, and a future marketplace into one connected
                ecosystem that introduces players to Web3 through familiar
                experiences.
              </p>

              <div className="mt-[clamp(1rem,1.8vw,1.4rem)] rounded-[clamp(0.8rem,1.3vw,1rem)] border border-[#5c8c4b]/16 bg-white/58 px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.8rem,1.3vw,1rem)] shadow-[0_0.8rem_2.4rem_rgba(55,77,39,0.07)] backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <span className="mt-[0.42rem] size-2.5 shrink-0 rounded-full bg-[#68b849] shadow-[0_0_0.7rem_rgba(104,184,73,0.4)]" />

                  <p className="text-[clamp(0.86rem,0.98vw,1.04rem)] font-semibold leading-[1.65] text-[#4f5f47]">
                    The overall project is currently in{" "}
                    <strong className="text-[#39743a]">
                      Beta development
                    </strong>
                    , while the publicly accessible playable game remains the
                    previous Alpha build.
                  </p>
                </div>
              </div>

              <div className="mt-[clamp(1.1rem,2vw,1.5rem)] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#products"
                  className="grants-button-primary"
                >
                  Review Live Products
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link
                  href="#roadmap"
                  className="grants-button-secondary"
                >
                  Review Funding Plan
                  <span aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[clamp(23rem,42vw,35rem)] min-w-0 items-end justify-center">
              <div className="absolute bottom-[3%] left-1/2 h-[34%] w-[105%] -translate-x-1/2 rounded-[50%] bg-[#4b9e46]/35 blur-[clamp(1.8rem,4vw,3.8rem)]" />

              <div className="absolute left-[12%] top-[16%] size-[clamp(4rem,8vw,7rem)] rounded-full border border-white/25 bg-white/18 blur-[0.1rem]" />

              <div className="absolute right-[6%] top-[24%] size-[clamp(2.5rem,5vw,4.5rem)] rounded-full border border-white/20 bg-white/12" />

              <Image
                src="/brand/lifetopia-character.png"
                alt="Main Lifetopia World farmer character"
                width={800}
                height={1000}
                priority
                className="relative z-10 max-h-[clamp(24rem,43vw,38rem)] w-auto object-contain drop-shadow-[0_2rem_2.6rem_rgba(40,68,33,0.22)]"
              />
            </div>
          </div>

          <div className="relative z-20 mt-[clamp(1rem,2vw,1.6rem)]">
            <div className="grid grid-cols-2 overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-white/15 bg-[#10261b]/94 shadow-[0_1.3rem_3.5rem_rgba(12,32,19,0.32)] backdrop-blur-xl lg:grid-cols-4">
              {projectStats.map((stat, index) => {
                const accent = getAccentClasses(stat.accent);

                return (
                  <article
                    key={stat.label}
                    className={[
                      `relative min-w-0 overflow-hidden px-[clamp(0.9rem,1.6vw,1.25rem)] py-[clamp(0.85rem,1.5vw,1.15rem)] ${accent.glow}`,
                      index % 2 !== 0
                        ? "border-l border-white/10"
                        : "",
                      index >= 2
                        ? "border-t border-white/10 lg:border-t-0"
                        : "",
                      index > 0
                        ? "lg:border-l lg:border-white/10"
                        : "",
                    ].join(" ")}
                  >
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-3xl ${accent.glow}`}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 shrink-0 rounded-full ${accent.dot}`}
                        />

                        <p
                          className={`truncate text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em] ${accent.label}`}
                        >
                          {stat.label}
                        </p>
                      </div>

                      <p
                        className={`mt-2 text-[clamp(1.05rem,1.45vw,1.35rem)] font-black leading-[1.15] ${accent.value}`}
                      >
                        {stat.value}
                      </p>

                      <p className="mt-1.5 text-[clamp(0.74rem,0.84vw,0.9rem)] font-semibold leading-[1.45] text-white/58">
                        {stat.detail}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}