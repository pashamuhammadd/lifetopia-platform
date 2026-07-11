"use client";

import { useEffect, useRef, useState } from "react";

type PillarAccent = "green" | "purple" | "gold" | "blue";

type EcosystemPillar = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  accent: PillarAccent;
};

const ecosystemPillars: EcosystemPillar[] = [
  {
    number: "01",
    title: "Play",
    subtitle: "Game",
    description:
      "A cozy life simulation where players farm, fish, explore, complete missions, and build a second life.",
    symbol: "✦",
    accent: "green",
  },
  {
    number: "02",
    title: "Connect",
    subtitle: "Community",
    description:
      "A dedicated social platform where Lifetopians meet friends, share stories, and build lasting relationships.",
    symbol: "◎",
    accent: "purple",
  },
  {
    number: "03",
    title: "Trade",
    subtitle: "Marketplace",
    description:
      "A player-driven economy where premium items and digital assets create real opportunities for players.",
    symbol: "◇",
    accent: "gold",
  },
  {
    number: "04",
    title: "Own",
    subtitle: "Identity & Wallet",
    description:
      "Solana wallets become the foundation for player identity, ownership, and connected economic activity.",
    symbol: "◆",
    accent: "blue",
  },
];

function getPillarAccent(accent: PillarAccent) {
  if (accent === "purple") {
    return {
      icon: "bg-[#eee8ff] text-[#7457c9]",
      line: "bg-[#896bdc]",
      glow: "bg-[#9879eb]/18",
      border: "border-[#896bdc]/18",
      activeBorder: "hover:border-[#896bdc]/34",
    };
  }

  if (accent === "gold") {
    return {
      icon: "bg-[#fff2c9] text-[#b77d12]",
      line: "bg-[#dea827]",
      glow: "bg-[#f0c451]/22",
      border: "border-[#dea827]/20",
      activeBorder: "hover:border-[#dea827]/36",
    };
  }

  if (accent === "blue") {
    return {
      icon: "bg-[#e2f3ff] text-[#347cad]",
      line: "bg-[#4b9bd0]",
      glow: "bg-[#6fc1ec]/20",
      border: "border-[#4b9bd0]/18",
      activeBorder: "hover:border-[#4b9bd0]/34",
    };
  }

  return {
    icon: "bg-[#e7f3d9] text-[#4a8233]",
    line: "bg-[#62a247]",
    glow: "bg-[#8fcf5c]/20",
    border: "border-[#62a247]/18",
    activeBorder: "hover:border-[#62a247]/34",
  };
}

function animationClass(
  isVisible: boolean,
  hiddenTransform = "translate-y-3 scale-[0.985]",
) {
  return [
    "transition-all duration-700 ease-out",
    isVisible
      ? "translate-y-0 scale-100 opacity-100"
      : `${hiddenTransform} opacity-0`,
  ].join(" ");
}

export function ProjectVisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative -mt-[clamp(1.5rem,3.2vw,3rem)] overflow-hidden px-[clamp(0.6rem,2vw,1.3rem)] pb-[clamp(2.8rem,6vw,5.5rem)] pt-[clamp(1.2rem,2.8vw,2.2rem)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[4%] size-[clamp(11rem,26vw,23rem)] rounded-full bg-[#dff0c7]/50 blur-[clamp(3rem,7vw,6rem)]" />
        <div className="absolute -right-[8%] bottom-[2%] size-[clamp(12rem,28vw,25rem)] rounded-full bg-[#dceffa]/55 blur-[clamp(3rem,7vw,6rem)]" />
        <div className="grants-grid-pattern absolute inset-0 opacity-30" />
      </div>

      <div className="grants-container relative">
        <div
          className={animationClass(
            isVisible,
            "translate-y-4 scale-100",
          )}
        >
          <div className="mx-auto max-w-[58rem] text-center">
            <span className="grants-eyebrow mx-auto">
              <span aria-hidden="true">✦</span>
              Why Lifetopia Exists
            </span>

            <h2 className="mt-[clamp(0.7rem,1.6vw,1.15rem)] text-[clamp(1.7rem,4vw,3.7rem)] font-extrabold leading-[0.99] tracking-[-0.052em] text-[#172016]">
              People already live on the internet.
              <span className="mt-[clamp(0.12rem,0.35vw,0.25rem)] block text-[#397c37]">
                We&apos;re building a world worth living in.
              </span>
            </h2>

            <p className="mx-auto mt-[clamp(0.7rem,1.5vw,1.05rem)] max-w-[46rem] text-[clamp(0.72rem,1vw,0.94rem)] font-medium leading-[1.7] text-[#625b4d]">
              Lifetopia World connects gameplay, friendship, digital identity,
              and a player-driven economy into one digital society powered by
              Solana.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-[clamp(1.2rem,2.7vw,2.1rem)] max-w-[72rem]">
          <div className="overflow-x-auto rounded-[clamp(1rem,2vw,1.55rem)] border border-[#66583f]/12 bg-[#fffaf1]/90 shadow-[0_1.5rem_5rem_rgba(62,47,27,0.1)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative min-w-[46rem] px-[clamp(1rem,2.4vw,2rem)] pb-[clamp(1.2rem,2.7vw,2.1rem)] pt-[clamp(1rem,2.2vw,1.7rem)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[clamp(5.45rem,9vw,7.2rem)] h-[clamp(1.55rem,2.8vw,2.2rem)] w-[clamp(0.1rem,0.16vw,0.13rem)] -translate-x-1/2 overflow-hidden rounded-full bg-[#d9e4d2]">
                  <span
                    className={[
                      "block h-full w-full origin-top rounded-full bg-[#65994f] transition-transform duration-500 ease-out delay-300",
                      isVisible ? "scale-y-100" : "scale-y-0",
                    ].join(" ")}
                  />
                </div>

                <div className="absolute left-[12.5%] right-[12.5%] top-[clamp(7rem,11.8vw,9.4rem)] h-[clamp(0.1rem,0.16vw,0.13rem)] overflow-hidden rounded-full bg-[#d9e4d2]">
                  <span
                    className={[
                      "block h-full w-full origin-center rounded-full bg-[#65994f] transition-transform duration-700 ease-out delay-500",
                      isVisible ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </div>

                {[12.5, 37.5, 62.5, 87.5].map((left, index) => (
                  <div
                    key={left}
                    className="absolute top-[clamp(7rem,11.8vw,9.4rem)] h-[clamp(2.1rem,4vw,3.2rem)] w-[clamp(0.1rem,0.16vw,0.13rem)] -translate-x-1/2 overflow-hidden rounded-full bg-[#d9e4d2]"
                    style={{ left: `${left}%` }}
                  >
                    <span
                      className={[
                        "block h-full w-full origin-top rounded-full bg-[#65994f] transition-transform duration-500 ease-out",
                        isVisible ? "scale-y-100" : "scale-y-0",
                      ].join(" ")}
                      style={{ transitionDelay: `${700 + index * 90}ms` }}
                    />
                  </div>
                ))}

                {[12.5, 37.5, 62.5, 87.5].map((left, index) => (
                  <div
                    key={`bottom-${left}`}
                    className="absolute bottom-[clamp(6.45rem,10.7vw,8.2rem)] h-[clamp(2rem,3.7vw,2.9rem)] w-[clamp(0.1rem,0.16vw,0.13rem)] -translate-x-1/2 overflow-hidden rounded-full bg-[#d9e4d2]"
                    style={{ left: `${left}%` }}
                  >
                    <span
                      className={[
                        "block h-full w-full origin-bottom rounded-full bg-[#65994f] transition-transform duration-500 ease-out",
                        isVisible ? "scale-y-100" : "scale-y-0",
                      ].join(" ")}
                      style={{ transitionDelay: `${1180 + index * 90}ms` }}
                    />
                  </div>
                ))}

                <div className="absolute bottom-[clamp(6.45rem,10.7vw,8.2rem)] left-[12.5%] right-[12.5%] h-[clamp(0.1rem,0.16vw,0.13rem)] overflow-hidden rounded-full bg-[#d9e4d2]">
                  <span
                    className={[
                      "block h-full w-full origin-center rounded-full bg-[#65994f] transition-transform duration-700 ease-out delay-[1450ms]",
                      isVisible ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </div>

                <div className="absolute bottom-[clamp(4rem,6.8vw,5.2rem)] left-1/2 h-[clamp(2.45rem,4.2vw,3.2rem)] w-[clamp(0.1rem,0.16vw,0.13rem)] -translate-x-1/2 overflow-hidden rounded-full bg-[#d9e4d2]">
                  <span
                    className={[
                      "block h-full w-full origin-top rounded-full bg-[#65994f] transition-transform duration-500 ease-out delay-[1700ms]",
                      isVisible ? "scale-y-100" : "scale-y-0",
                    ].join(" ")}
                  />
                </div>
              </div>

              <div
                className={animationClass(
                  isVisible,
                  "translate-y-3 scale-[0.97]",
                )}
                style={{ transitionDelay: "150ms" }}
              >
                <div className="relative mx-auto flex w-fit flex-col items-center">
                  <span className="relative flex size-[clamp(3rem,5.5vw,4.4rem)] items-center justify-center rounded-full border border-[#5f923f]/22 bg-[#e7f3da] text-[clamp(1rem,1.8vw,1.45rem)] font-black text-[#4f8437] shadow-[0_0.8rem_2rem_rgba(80,132,55,0.14)]">
                    ◎
                    <span className="absolute inset-[-0.35rem] -z-10 rounded-full border border-[#74a85f]/20 opacity-80 animate-ping [animation-duration:3.8s]" />
                  </span>

                  <p className="mt-[clamp(0.3rem,0.7vw,0.5rem)] text-[clamp(0.68rem,1vw,0.9rem)] font-extrabold text-[#243022]">
                    Player
                  </p>

                  <p className="text-[clamp(0.42rem,0.65vw,0.57rem)] font-medium text-[#857966]">
                    One persistent identity
                  </p>
                </div>
              </div>

              <div className="relative mt-[clamp(3.3rem,6vw,4.7rem)] grid grid-cols-4 gap-[clamp(0.55rem,1.2vw,0.95rem)]">
                {ecosystemPillars.map((pillar, index) => {
                  const accent = getPillarAccent(pillar.accent);

                  return (
                    <article
                      key={pillar.title}
                      className={[
                        animationClass(
                          isVisible,
                          "translate-y-4 scale-[0.97]",
                        ),
                        "group relative min-w-0 overflow-hidden rounded-[clamp(0.7rem,1.3vw,1rem)] border bg-white/78 p-[clamp(0.65rem,1.2vw,0.95rem)] shadow-[0_0.45rem_1.5rem_rgba(55,42,24,0.06)] hover:-translate-y-[clamp(0.1rem,0.25vw,0.2rem)] hover:bg-white hover:shadow-[0_0.9rem_2.2rem_rgba(55,42,24,0.1)]",
                        accent.border,
                        accent.activeBorder,
                      ].join(" ")}
                      style={{
                        transitionDelay: `${780 + index * 100}ms`,
                      }}
                    >
                      <div
                        className={`pointer-events-none absolute -right-[18%] -top-[28%] size-[55%] rounded-full blur-[clamp(1.5rem,3vw,2.5rem)] ${accent.glow}`}
                      />

                      <div className="relative flex items-start justify-between gap-2">
                        <span
                          className={`flex size-[clamp(1.6rem,2.7vw,2.15rem)] shrink-0 items-center justify-center rounded-[clamp(0.42rem,0.75vw,0.58rem)] text-[clamp(0.62rem,1vw,0.84rem)] font-black ${accent.icon}`}
                        >
                          {pillar.symbol}
                        </span>

                        <span className="font-mono text-[clamp(0.3rem,0.52vw,0.46rem)] font-bold text-[#a09480]">
                          {pillar.number}
                        </span>
                      </div>

                      <div
                        className={`relative mt-[clamp(0.42rem,0.85vw,0.65rem)] h-[clamp(0.1rem,0.18vw,0.14rem)] w-[clamp(1.1rem,1.8vw,1.45rem)] rounded-full ${accent.line}`}
                      />

                      <p className="relative mt-[clamp(0.32rem,0.7vw,0.52rem)] text-[clamp(0.48rem,0.75vw,0.66rem)] font-extrabold uppercase tracking-[0.07em] text-[#728064]">
                        {pillar.subtitle}
                      </p>

                      <h3 className="relative mt-[clamp(0.08rem,0.2vw,0.15rem)] text-[clamp(0.76rem,1.2vw,1.05rem)] font-extrabold text-[#20281f]">
                        {pillar.title}
                      </h3>

                      <p className="relative mt-[clamp(0.28rem,0.6vw,0.46rem)] text-[clamp(0.42rem,0.68vw,0.58rem)] font-medium leading-[1.58] text-[#6b6253]">
                        {pillar.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div
                className={[
                  animationClass(
                    isVisible,
                    "translate-y-4 scale-[0.97]",
                  ),
                  "relative mx-auto mt-[clamp(3.1rem,5.6vw,4.4rem)] max-w-[34rem]",
                ].join(" ")}
                style={{ transitionDelay: "1850ms" }}
              >
                <div className="relative rounded-[clamp(0.8rem,1.5vw,1.15rem)] border border-[#3d7742]/18 bg-[#173b24] px-[clamp(0.85rem,1.6vw,1.3rem)] py-[clamp(0.7rem,1.4vw,1.05rem)] text-center shadow-[0_1rem_2.8rem_rgba(23,59,36,0.2)]">
                  <span className="absolute left-1/2 top-0 size-[clamp(0.5rem,0.8vw,0.65rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#d7efc9] bg-[#75b457] shadow-[0_0_1rem_rgba(117,180,87,0.7)]" />

                  <p className="font-mono text-[clamp(0.34rem,0.55vw,0.48rem)] font-bold uppercase tracking-[0.1em] text-[#a9df8d]">
                    Final Outcome
                  </p>

                  <h3 className="mt-[clamp(0.18rem,0.4vw,0.3rem)] text-[clamp(0.9rem,1.55vw,1.3rem)] font-extrabold text-white">
                    One Connected Digital Society
                  </h3>

                  <p className="mx-auto mt-[clamp(0.22rem,0.5vw,0.38rem)] max-w-[29rem] text-[clamp(0.46rem,0.72vw,0.62rem)] font-medium leading-[1.55] text-white/62">
                    Gameplay, relationships, ownership, and economic activity
                    all contribute to one evolving world.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-[clamp(0.45rem,0.9vw,0.7rem)] text-center text-[clamp(0.34rem,0.56vw,0.48rem)] font-medium text-[#8c816e] md:hidden">
            Swipe horizontally to explore the complete ecosystem tree.
          </p>
        </div>

        <blockquote
          className={[
            animationClass(isVisible, "translate-y-4 scale-100"),
            "mx-auto mt-[clamp(1.1rem,2.5vw,1.9rem)] max-w-[54rem] border-l-[clamp(0.18rem,0.35vw,0.28rem)] border-[#5a963f] pl-[clamp(0.8rem,1.8vw,1.3rem)]",
          ].join(" ")}
          style={{ transitionDelay: "2050ms" }}
        >
          <p className="text-[clamp(0.78rem,1.35vw,1.15rem)] font-extrabold leading-[1.45] tracking-[-0.022em] text-[#263226]">
            Lifetopia isn&apos;t just building another blockchain game.
            <span className="block text-[#4d8438]">
              We&apos;re building a digital society people genuinely want to
              live in.
            </span>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
