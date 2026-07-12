import { TechnologyIcon } from "@/components/TechnologyIcon";

type DevelopmentAccent = "green" | "blue" | "gold" | "purple";

type DevelopmentItem = {
  title: string;
  description: string;
  status: string;
  icon: string;
  accent: DevelopmentAccent;
};

const deliveredFoundations: DevelopmentItem[] = [
  {
    title: "Playable Game Foundation",
    description:
      "The MVP and Alpha phases validated the core cozy life-sim concept, player movement, world exploration, farming, inventory, quests, and persistent player data.",
    status: "Delivered",
    icon: "mdi:gamepad-variant-outline",
    accent: "green",
  },
  {
    title: "Community Platform",
    description:
      "A working social platform already supports player accounts, profiles, posts, comments, likes, bookmarks, and community interaction.",
    status: "Live Beta",
    icon: "mdi:account-group-outline",
    accent: "blue",
  },
  {
    title: "Shared Platform Foundation",
    description:
      "The website, community platform, and grant portal are managed through one monorepo with shared authentication, services, types, and reusable infrastructure.",
    status: "Operational",
    icon: "mdi:source-branch",
    accent: "purple",
  },
];

const activeBetaWork: DevelopmentItem[] = [
  {
    title: "Community Completion",
    description:
      "Improving authentication stability, player interaction, notifications, account synchronization, and Android distribution readiness.",
    status: "In Progress",
    icon: "mdi:account-cog-outline",
    accent: "blue",
  },
  {
    title: "Gameplay Expansion",
    description:
      "Expanding farming, fishing, exploration, quests, progression, social activities, locations, and long-term replayability.",
    status: "In Progress",
    icon: "mdi:island",
    accent: "green",
  },
  {
    title: "Connected Player Experience",
    description:
      "Connecting game identity, community profiles, player progress, and future marketplace activity into one consistent ecosystem.",
    status: "In Progress",
    icon: "mdi:link-variant",
    accent: "purple",
  },
  {
    title: "Solana & Marketplace Foundation",
    description:
      "Preparing wallet connectivity, devnet transactions, player ownership, and the foundation for a connected digital marketplace.",
    status: "Next Integration",
    icon: "mdi:wallet-outline",
    accent: "gold",
  },
];

const technologies = [
  {
    name: "Unity",
    category: "Game",
    icon: "logos:unity",
  },
  {
    name: "Next.js",
    category: "Platform",
    icon: "logos:nextjs-icon",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "logos:typescript-icon",
  },
  {
    name: "Turborepo",
    category: "Monorepo",
    icon: "logos:turborepo-icon",
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: "logos:supabase-icon",
  },
  {
    name: "Solana",
    category: "Blockchain",
    icon: "logos:solana",
  },
  {
    name: "Vercel",
    category: "Deployment",
    icon: "logos:vercel-icon",
  },
  {
    name: "GitHub",
    category: "Source",
    icon: "mdi:github",
  },
];

function getAccentClasses(accent: DevelopmentAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#73afd1]/25 bg-[#f2f9fd]",
      icon: "border-[#5da5cf]/20 bg-[#e4f4fc] text-[#347ba5]",
      status: "border-[#c8e2f1] bg-[#e9f6fd] text-[#347ba5]",
      title: "text-[#2f7399]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/30 bg-[#fffaf0]",
      icon: "border-[#d7aa48]/20 bg-[#fff0ca] text-[#9c731c]",
      status: "border-[#ead6a4] bg-[#fff4d8] text-[#946b1b]",
      title: "text-[#8d681b]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/25 bg-[#f8f5ff]",
      icon: "border-[#9178d5]/20 bg-[#eee9ff] text-[#6c4fb2]",
      status: "border-[#dad0f1] bg-[#f2edff] text-[#674aab]",
      title: "text-[#674aab]",
    };
  }

  return {
    card: "border-[#79ad62]/25 bg-[#f4faf0]",
    icon: "border-[#6da954]/20 bg-[#e7f4dd] text-[#4e8039]",
    status: "border-[#d1e4c7] bg-[#edf7e7] text-[#477a34]",
    title: "text-[#477a34]",
  };
}

function DevelopmentCard({
  item,
}: {
  item: DevelopmentItem;
}) {
  const accent = getAccentClasses(item.accent);

  return (
    <article
      className={`min-w-0 rounded-[clamp(0.9rem,1.5vw,1.2rem)] border p-[clamp(1rem,1.6vw,1.3rem)] shadow-[0_0.8rem_2.5rem_rgba(64,48,27,0.06)] ${accent.card}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-[clamp(2.8rem,4.2vw,3.5rem)] shrink-0 items-center justify-center rounded-[clamp(0.7rem,1.1vw,0.9rem)] border ${accent.icon}`}
        >
          <TechnologyIcon
            icon={item.icon}
            label={item.title}
          />
        </span>

        <span
          className={`rounded-full border px-3 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black ${accent.status}`}
        >
          {item.status}
        </span>
      </div>

      <h3
        className={`mt-[clamp(0.8rem,1.3vw,1rem)] text-[clamp(1.05rem,1.25vw,1.28rem)] font-black leading-[1.3] ${accent.title}`}
      >
        {item.title}
      </h3>

      <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#706452]">
        {item.description}
      </p>
    </article>
  );
}

export function CurrentDevelopmentSection() {
  return (
    <section
      id="current-development"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[4rem] size-[22rem] rounded-full bg-[#e2f1d7]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2rem] right-[-9rem] size-[24rem] rounded-full bg-[#e1eef9]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 animate-pulse rounded-full bg-[#68ad4a]" />
              Current Development
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Existing foundations are now becoming one connected Beta
              ecosystem.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Lifetopia World has completed its early validation phases. Current
              development is focused on connecting the game, community
              platform, marketplace, and Solana infrastructure into a stable
              public experience.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
                  Current Project Phase
                </p>

                <p className="mt-2 text-[clamp(1.7rem,2.5vw,2.3rem)] font-black leading-none text-white">
                  Beta
                </p>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-[#98e477]/15 bg-[#98e477]/10 px-3 py-1.5 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#afe994]">
                <span className="size-2 animate-pulse rounded-full bg-[#8ee46a]" />
                Active
              </span>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-white/68">
                The overall project is in Beta development. The publicly
                accessible game remains the previous Alpha build while the
                connected Beta is being completed.
              </p>
            </div>
          </aside>
        </header>

        <section className="mt-[clamp(2rem,4vw,3.2rem)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
                Delivered Foundations
              </p>

              <h3 className="mt-2 text-[clamp(1.45rem,2.2vw,2rem)] font-black tracking-[-0.03em] text-[#2f2118]">
                The project is already beyond the idea stage.
              </h3>
            </div>

            <p className="max-w-[34rem] text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
              These foundations reduce execution risk and allow grant funding
              to focus on integration, expansion, testing, and public delivery.
            </p>
          </div>

          <div className="mt-[clamp(1rem,1.8vw,1.4rem)] grid gap-[clamp(0.75rem,1.4vw,1.05rem)] md:grid-cols-3">
            {deliveredFoundations.map((item) => (
              <DevelopmentCard
                key={item.title}
                item={item}
              />
            ))}
          </div>
        </section>

        <section className="mt-[clamp(1.5rem,3vw,2.4rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#203d28]/15 bg-[#173b21] text-white shadow-[0_1.2rem_3.5rem_rgba(31,64,37,0.16)]">
          <div className="border-b border-white/10 p-[clamp(1rem,1.8vw,1.5rem)]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
              Active Beta Work
            </p>

            <h3 className="mt-2 text-[clamp(1.4rem,2.1vw,1.95rem)] font-black tracking-[-0.03em]">
              What the team is building now
            </h3>

            <p className="mt-3 max-w-[48rem] text-[clamp(0.88rem,0.98vw,1.04rem)] leading-[1.7] text-white/65">
              Current development is concentrated on product integration and
              public readiness rather than starting new disconnected
              experiments.
            </p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {activeBetaWork.map((item, index) => (
              <article
                key={item.title}
                className="bg-[#173b21] p-[clamp(1rem,1.7vw,1.35rem)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-[clamp(2.7rem,4vw,3.3rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#9be879]/15 bg-[#9be879]/10 text-[#a9ed8d]">
                    <TechnologyIcon
                      icon={item.icon}
                      label={item.title}
                    />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#91df72]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[clamp(0.66rem,0.76vw,0.82rem)] font-black text-white/64">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="mt-2 text-[clamp(1.02rem,1.2vw,1.24rem)] font-black text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.65] text-white/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9c9a8] bg-white shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
          <div className="border-b border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.7vw,1.35rem)] py-[clamp(0.8rem,1.3vw,1rem)]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
              Technical Foundation
            </p>

            <h3 className="mt-2 text-[clamp(1.3rem,1.9vw,1.8rem)] font-black tracking-[-0.03em] text-[#2f2118]">
              Built with production-ready tools and shared infrastructure
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#eadfc8] sm:grid-cols-4 xl:grid-cols-8">
            {technologies.map((technology) => (
              <article
                key={technology.name}
                className="flex min-w-0 items-center gap-3 bg-white p-[clamp(0.8rem,1.3vw,1rem)]"
              >
                <span className="flex size-[clamp(2.3rem,3.4vw,2.8rem)] shrink-0 items-center justify-center rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#ded4c0] bg-[#faf7f0]">
                  <TechnologyIcon
                    icon={technology.icon}
                    label={technology.name}
                  />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-[#30251c]">
                    {technology.name}
                  </p>

                  <p className="mt-1 truncate text-[clamp(0.68rem,0.76vw,0.82rem)] font-bold text-[#8a7b64]">
                    {technology.category}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}