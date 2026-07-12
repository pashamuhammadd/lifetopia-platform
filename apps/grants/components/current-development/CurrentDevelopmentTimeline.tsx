const developmentPhases = [
  {
    phase: "MVP",
    period: "February 2026",
    status: "Completed",
    progress: 100,
    description:
      "Validated the core cozy life-sim concept with an early playable web version.",
    deliverables: [
      "Core gameplay loop",
      "Playable web build",
      "Initial player testing",
    ],
  },
  {
    phase: "Alpha",
    period: "April 2026",
    status: "Completed",
    progress: 100,
    description:
      "Built the first complete world foundation, player systems, and persistent game data.",
    deliverables: [
      "Player identity",
      "Inventory and farming",
      "Multiple playable maps",
    ],
  },
  {
    phase: "Beta",
    period: "Current Phase",
    status: "In Development",
    progress: 68,
    description:
      "Expanding gameplay depth while connecting the game, community platform, and Solana.",
    deliverables: [
      "Community integration",
      "Expanded gameplay",
      "Solana connectivity",
    ],
  },
  {
    phase: "Public Release",
    period: "Next Phase",
    status: "Planned",
    progress: 0,
    description:
      "Launch a stable public experience supported by measurable player activity and feedback.",
    deliverables: [
      "Public onboarding",
      "Production stability",
      "Ecosystem growth",
    ],
  },
];

function getPhaseStyle(status: string) {
  if (status === "Completed") {
    return {
      marker: "border-[#5d9f3f] bg-[#67ad49] text-white",
      badge: "bg-[#e4f3d9] text-[#477d31]",
      progress: "bg-[#68aa49]",
      card: "border-[#79ad62]/25 bg-[#f7fbf3]",
    };
  }

  if (status === "In Development") {
    return {
      marker:
        "border-[#3c91c5] bg-[#49a5d9] text-white shadow-[0_0_0_0.4rem_rgba(73,165,217,0.12)]",
      badge: "bg-[#e1f2fc] text-[#347da8]",
      progress: "bg-[#49a5d9]",
      card: "border-[#5ca7d3]/30 bg-[#f4fbff]",
    };
  }

  return {
    marker: "border-[#c8ad6d] bg-[#fff7e3] text-[#9a782a]",
    badge: "bg-[#fff2cf] text-[#9a7422]",
    progress: "bg-[#d2b15f]",
    card: "border-[#d7bd80]/30 bg-[#fffdf7]",
  };
}

export function CurrentDevelopmentTimeline() {
  return (
    <div className="mt-[clamp(1.25rem,2.5vw,2rem)]">
      <div className="mb-[clamp(0.8rem,1.5vw,1.1rem)]">
        <p className="text-[clamp(0.78rem,0.9vw,0.92rem)] font-black uppercase tracking-[0.12em] text-[#7b684c]">
          Development Journey
        </p>

        <h3 className="mt-2 text-[clamp(1.45rem,2.2vw,2rem)] font-black tracking-[-0.03em] text-[#2f2118]">
          From early validation to public release
        </h3>

        <p className="mt-3 max-w-3xl text-[clamp(0.92rem,1vw,1.05rem)] leading-[1.7] text-[#706452]">
          Lifetopia World has moved through validated development stages, with
          Beta now becoming the foundation for a connected public ecosystem.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-[clamp(1.35rem,2.4vw,1.9rem)] hidden h-[0.18rem] rounded-full bg-[#dfd3b8] lg:block" />

        <div className="grid gap-[clamp(0.75rem,1.4vw,1.05rem)] lg:grid-cols-4">
          {developmentPhases.map((phase, index) => {
            const style = getPhaseStyle(phase.status);

            return (
              <article
                key={phase.phase}
                className={`relative min-w-0 rounded-[clamp(0.9rem,1.5vw,1.2rem)] border p-[clamp(0.85rem,1.4vw,1.1rem)] shadow-[0_0.8rem_2.5rem_rgba(66,49,26,0.06)] ${style.card}`}
              >
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div
                    className={`flex size-[clamp(2.7rem,4vw,3.3rem)] shrink-0 items-center justify-center rounded-full border-[0.2rem] text-[clamp(0.78rem,1vw,0.92rem)] font-black ${style.marker}`}
                  >
                    {phase.status === "Completed" ? "✓" : index + 1}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-[clamp(0.68rem,0.76vw,0.78rem)] font-black ${style.badge}`}
                  >
                    {phase.status}
                  </span>
                </div>

                <div className="mt-[clamp(0.65rem,1.1vw,0.85rem)]">
                  <p className="text-[clamp(0.72rem,0.8vw,0.84rem)] font-black uppercase tracking-[0.08em] text-[#8a785d]">
                    {phase.period}
                  </p>

                  <h4 className="mt-2 text-[clamp(1.15rem,1.5vw,1.45rem)] font-black text-[#2e251c]">
                    {phase.phase}
                  </h4>

                  <p className="mt-3 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.6] text-[#6d6252]">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-[clamp(0.7rem,1.2vw,0.95rem)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[clamp(0.72rem,0.8vw,0.84rem)] font-bold text-[#7b6d5a]">
                      Progress
                    </span>

                    <span className="text-[clamp(0.75rem,0.85vw,0.9rem)] font-black text-[#3e4b39]">
                      {phase.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-[0.55rem] overflow-hidden rounded-full bg-[#e8dfcd]">
                    <div
                      className={`h-full rounded-full ${style.progress}`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>

                <ul className="mt-[clamp(0.7rem,1.2vw,0.95rem)] space-y-2">
                  {phase.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[clamp(0.76rem,0.84vw,0.9rem)] font-semibold leading-[1.45] text-[#665b4b]"
                    >
                      <span className="mt-[0.42rem] size-1.5 shrink-0 rounded-full bg-[#72a958]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}