import {
  CircleDot,
  Gamepad2,
  Sparkles,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { roadmapItems } from "@repo/data/roadmap";
import type {
  RoadmapStatus,
} from "@repo/types/roadmap";

type RoadmapVisual = {
  Icon: LucideIcon;
  iconClass: string;
  cardClass: string;
  numberClass: string;
};

const statusStyles: Record<
  RoadmapStatus,
  string
> = {
  Completed:
    "border-[#bdd8ad] bg-[#eaf6e2] text-[#477a34]",
  Current:
    "border-[#e5c66e] bg-[#fff2c5] text-[#946914]",
  Planned:
    "border-[#bddceb] bg-[#eaf6fc] text-[#347ba5]",
  Future:
    "border-[#d8cdef] bg-[#f3effd] text-[#674aab]",
};

const roadmapVisuals: Record<
  string,
  RoadmapVisual
> = {
  "community-platform": {
    Icon: UsersRound,
    iconClass:
      "border-[#c9dfbd] bg-[#edf7e7] text-[#4f8124]",
    cardClass:
      "border-[#c9dfbd] bg-[linear-gradient(145deg,#ffffff,#f3faef)]",
    numberClass:
      "border-[#c9dfbd] bg-[#edf7e7] text-[#4f8124]",
  },
  "playable-beta": {
    Icon: Gamepad2,
    iconClass:
      "border-[#c5ddea] bg-[#edf7fc] text-[#347ba5]",
    cardClass:
      "border-[#c5ddea] bg-[linear-gradient(145deg,#ffffff,#f2f9fd)]",
    numberClass:
      "border-[#c5ddea] bg-[#edf7fc] text-[#347ba5]",
  },
  "solana-ecosystem": {
    Icon: WalletCards,
    iconClass:
      "border-[#d8ceef] bg-[#f3effd] text-[#674aab]",
    cardClass:
      "border-[#d8ceef] bg-[linear-gradient(145deg,#ffffff,#f8f5ff)]",
    numberClass:
      "border-[#d8ceef] bg-[#f3effd] text-[#674aab]",
  },
  "future-expansion": {
    Icon: Sparkles,
    iconClass:
      "border-[#ead7a5] bg-[#fff6df] text-[#946b1b]",
    cardClass:
      "border-[#ead7a5] bg-[linear-gradient(145deg,#ffffff,#fffaf0)]",
    numberClass:
      "border-[#ead7a5] bg-[#fff6df] text-[#946b1b]",
  },
};

const fallbackVisual: RoadmapVisual = {
  Icon: CircleDot,
  iconClass:
    "border-[#d8c9aa] bg-[#fffaf0] text-[#6f8124]",
  cardClass:
    "border-[#d8c9aa] bg-white",
  numberClass:
    "border-[#d8c9aa] bg-[#fffaf0] text-[#6f8124]",
};

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#f3f8ed_0%,#fff8e8_52%,#eef8fd_100%)] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-[-7rem] size-[22rem] rounded-full bg-[#a7d988]/22 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-[-7rem] size-[23rem] rounded-full bg-[#86d0ef]/20 blur-[7rem]"
      />

      <div className="lt-container relative">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46rem]">
            <span className="lt-badge border-[#c7dcb9] bg-white/78 text-[#527d40]">
              <span className="size-1.5 rounded-full bg-[#6fac4f]" />
              Product Roadmap
            </span>

            <h2
              id="roadmap-title"
              className="lt-section-title mt-3 max-w-[18ch]"
            >
              The next chapters of Lifetopia World.
            </h2>

            <p className="lt-section-copy mt-3 max-w-[43rem]">
              The current roadmap focuses on completing the
              community experience, expanding the playable Beta,
              and connecting the ecosystem through Solana before
              moving into broader world expansion.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-[#d8c9aa] bg-white/72 px-4 py-3 shadow-[0_0.65rem_1.8rem_rgba(88,60,28,0.07)] backdrop-blur-sm">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.09em] text-[#8a7b66]">
              Current Focus
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#d9a42d] shadow-[0_0_0.8rem_rgba(217,164,45,0.5)]" />

              <p className="text-[clamp(0.76rem,0.86vw,0.9rem)] font-black text-[#5b4935]">
                Community Platform
              </p>
            </div>
          </div>
        </header>

        <div className="relative mt-[clamp(1.35rem,2.2vw,1.8rem)]">
          <div
            aria-hidden="true"
            className="absolute left-[6%] right-[6%] top-[2.05rem] hidden border-t-2 border-dashed border-[#d7c8aa] xl:block"
          />

          <div className="relative grid gap-[clamp(0.7rem,1.2vw,0.95rem)] sm:grid-cols-2 xl:grid-cols-4">
            {roadmapItems.map((item, index) => {
              const visual =
                roadmapVisuals[item.id] ??
                fallbackVisual;

              const Icon = visual.Icon;

              return (
                <article
                  key={item.id}
                  className={`lt-animate-fade-up group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[clamp(0.95rem,1.4vw,1.2rem)] border p-[clamp(0.9rem,1.3vw,1.1rem)] shadow-[0_0.8rem_2.5rem_rgba(69,53,31,0.065)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.1rem_3rem_rgba(69,53,31,0.11)] ${visual.cardClass}`}
                  style={{
                    animationDelay: `${index * 90}ms`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-white/60 blur-3xl"
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${visual.iconClass}`}
                      >
                        <Icon className="size-5" />
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[0.64rem] font-black ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[0.62rem] font-black ${visual.numberClass}`}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <p className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-[#84745f]">
                        {item.phase}
                      </p>
                    </div>

                    <h3 className="mt-3 text-[clamp(1rem,1.2vw,1.18rem)] font-black leading-[1.25] tracking-[-0.025em] text-[#33251b]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-[clamp(0.76rem,0.84vw,0.88rem)] leading-[1.55] text-[#716453]">
                      {item.description}
                    </p>

                    <div className="mt-4 grid gap-2">
                      {item.items.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-2.5 rounded-lg border border-[#ded2ba] bg-white/64 px-3 py-2.5"
                        >
                          <CircleDot className="mt-0.5 size-3.5 shrink-0 text-[#6d9f50]" />

                          <p className="text-[clamp(0.7rem,0.78vw,0.82rem)] font-bold leading-[1.4] text-[#655847]">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <footer className="mt-[clamp(0.9rem,1.5vw,1.2rem)] flex flex-col gap-2 rounded-xl border border-[#d8c9aa] bg-white/65 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[clamp(0.72rem,0.8vw,0.84rem)] leading-[1.5] text-[#756754]">
            Completed development history is documented in
            the Development Journey above.
          </p>

          <Link
            href="https://docs.lifetopiaworld.io/beta-roadmap"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit shrink-0 text-[clamp(0.7rem,0.78vw,0.82rem)] font-black text-[#527d40] transition hover:text-[#3f6c2e] hover:underline"
          >
            View detailed roadmap
          </Link>
        </footer>
      </div>
    </section>
  );
}