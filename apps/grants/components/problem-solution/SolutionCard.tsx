const ecosystemPillars = [
  {
    title: "Game",
    description:
      "A cozy life-simulation experience where players can explore, farm, fish, complete quests, and build a digital life.",
    icon: "🎮",
    accent: "green",
  },
  {
    title: "Community Platform",
    description:
      "A social layer where players create identities, publish updates, discuss the game, and build lasting relationships.",
    icon: "💬",
    accent: "blue",
  },
  {
    title: "Marketplace",
    description:
      "A connected space for virtual items, player-created value, and future digital ownership inside the Lifetopia ecosystem.",
    icon: "🛒",
    accent: "gold",
  },
];

function getPillarClasses(accent: string) {
  if (accent === "blue") {
    return {
      card: "border-[#7cb8d8]/25 bg-[#f1f9fd]",
      icon: "border-[#65a9cf]/20 bg-[#e5f5fc]",
      title: "text-[#347ca4]",
      dot: "bg-[#4f9fcb]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#dfbd70]/30 bg-[#fffaf0]",
      icon: "border-[#d9ab4d]/20 bg-[#fff0cf]",
      title: "text-[#9b741f]",
      dot: "bg-[#dda438]",
    };
  }

  return {
    card: "border-[#7cad66]/25 bg-[#f4faf0]",
    icon: "border-[#6eaa56]/20 bg-[#e6f3dc]",
    title: "text-[#4e7e39]",
    dot: "bg-[#66a94a]",
  };
}

export function SolutionCard() {
  return (
    <article className="relative overflow-hidden rounded-[clamp(1rem,1.8vw,1.45rem)] border border-[#c9d8bb] bg-[#f7fbf3] p-[clamp(1rem,2vw,1.7rem)] shadow-[0_1.2rem_4rem_rgba(48,76,40,0.08)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-5rem] top-[-5rem] size-[15rem] rounded-full bg-[#dcefd0]/55 blur-[4.5rem]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.12em] text-[#5b8249]">
              Our Approach
            </p>

            <h3 className="mt-3 max-w-[38rem] text-[clamp(1.55rem,2.6vw,2.35rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#26351f]">
              We introduce Web3 through experiences people already understand
              and enjoy.
            </h3>
          </div>

          <span className="flex size-[clamp(3rem,4.5vw,3.8rem)] shrink-0 items-center justify-center rounded-[clamp(0.75rem,1.2vw,1rem)] border border-[#8fbd79]/30 bg-[#e2f2d8] text-[clamp(1.2rem,1.8vw,1.55rem)]">
            ✓
          </span>
        </div>

        <p className="mt-[clamp(0.8rem,1.4vw,1.1rem)] max-w-[44rem] text-[clamp(0.9rem,1.02vw,1.08rem)] leading-[1.75] text-[#65725d]">
          Instead of asking newcomers to learn blockchain first, Lifetopia
          World meets them through familiar digital habits: playing games,
          joining communities, and participating in a marketplace.
        </p>

        <div className="mt-[clamp(1rem,1.8vw,1.4rem)] grid gap-[clamp(0.65rem,1.1vw,0.85rem)] lg:grid-cols-3">
          {ecosystemPillars.map((pillar) => {
            const classes = getPillarClasses(pillar.accent);

            return (
              <section
                key={pillar.title}
                className={`rounded-[clamp(0.8rem,1.3vw,1rem)] border p-[clamp(0.8rem,1.35vw,1.05rem)] ${classes.card}`}
              >
                <div
                  className={`flex size-[clamp(2.6rem,4vw,3.2rem)] items-center justify-center rounded-[clamp(0.65rem,1vw,0.85rem)] border text-[clamp(1.1rem,1.6vw,1.4rem)] ${classes.icon}`}
                >
                  {pillar.icon}
                </div>

                <div className="mt-[clamp(0.65rem,1.1vw,0.85rem)] flex items-center gap-2">
                  <span
                    className={`size-2 shrink-0 rounded-full ${classes.dot}`}
                  />

                  <h4
                    className={`text-[clamp(1rem,1.15vw,1.22rem)] font-black ${classes.title}`}
                  >
                    {pillar.title}
                  </h4>
                </div>

                <p className="mt-2 text-[clamp(0.82rem,0.94vw,1rem)] leading-[1.65] text-[#68705f]">
                  {pillar.description}
                </p>
              </section>
            );
          })}
        </div>

        <div className="mt-[clamp(1rem,1.7vw,1.3rem)] rounded-[clamp(0.8rem,1.3vw,1rem)] border border-[#bfd5b0] bg-[#eaf5e2] px-[clamp(0.85rem,1.5vw,1.15rem)] py-[clamp(0.8rem,1.3vw,1rem)]">
          <p className="text-[clamp(0.9rem,1vw,1.06rem)] font-black leading-[1.6] text-[#466f36]">
            Game + Community Platform + Marketplace
          </p>

          <p className="mt-2 text-[clamp(0.84rem,0.96vw,1.02rem)] leading-[1.65] text-[#607357]">
            Together, these three pillars create one connected ecosystem that
            gradually introduces users to wallets, digital ownership, and
            Solana without overwhelming them with blockchain complexity.
          </p>
        </div>
      </div>
    </article>
  );
}