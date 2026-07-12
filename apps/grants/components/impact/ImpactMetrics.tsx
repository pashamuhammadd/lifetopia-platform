import {
  ImpactCard,
  type ImpactCardData,
} from "./ImpactCard";

const impactMetrics: ImpactCardData[] = [
  {
    label: "Active Users",
    value: "100+",
    description:
      "Initial target for active Beta participants across the game and community platform.",
    icon: "👥",
    accent: "green",
  },
  {
    label: "Connected Wallets",
    value: "50+",
    description:
      "Players onboarded through wallet connectivity and Solana-based identity features.",
    icon: "◎",
    accent: "purple",
  },
  {
    label: "Verified Testers",
    value: "50+",
    description:
      "A focused tester group providing structured gameplay and platform feedback.",
    icon: "✓",
    accent: "blue",
  },
  {
    label: "Devnet Transactions",
    value: "500+",
    description:
      "Target transaction activity generated through wallet and ecosystem testing.",
    icon: "↗",
    accent: "gold",
  },
];

const productOutputs = [
  {
    title: "Community Platform",
    description:
      "A social platform where Lifetopians can create profiles, publish posts, interact, and follow game development.",
  },
  {
    title: "Playable Beta",
    description:
      "An expanded game experience featuring farming, fishing, exploration, quests, and social activities.",
  },
  {
    title: "Android Distribution",
    description:
      "A mobile-ready community application prepared for distribution through the Google Play ecosystem.",
  },
  {
    title: "Connected Solana Layer",
    description:
      "A foundation for wallet identity, devnet transactions, and synchronized game-community experiences.",
  },
];

export function ImpactMetrics() {
  return (
    <div>
      <div className="grid gap-[clamp(0.7rem,1.3vw,1rem)] sm:grid-cols-2 xl:grid-cols-4">
        {impactMetrics.map((item) => (
          <ImpactCard key={item.label} item={item} />
        ))}
      </div>

      <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9c9a8] bg-white shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
        <div className="border-b border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.7vw,1.35rem)] py-[clamp(0.8rem,1.3vw,1rem)]">
          <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
            Product Outputs
          </p>

          <h3 className="mt-2 text-[clamp(1.3rem,1.9vw,1.8rem)] font-black tracking-[-0.03em] text-[#2f2118]">
            Tangible products delivered through the grant
          </h3>
        </div>

        <div className="grid gap-px bg-[#eadfc8] sm:grid-cols-2">
          {productOutputs.map((output, index) => (
            <article
              key={output.title}
              className="bg-white p-[clamp(1rem,1.7vw,1.35rem)]"
            >
              <div className="flex items-start gap-[clamp(0.7rem,1.1vw,0.9rem)]">
                <span className="flex size-[clamp(2.3rem,3.5vw,2.9rem)] shrink-0 items-center justify-center rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#75ac5d]/20 bg-[#edf6e7] text-[clamp(0.78rem,1.1vw,0.96rem)] font-black text-[#4f803b]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h4 className="text-[clamp(1rem,1.15vw,1.22rem)] font-black text-[#30251c]">
                    {output.title}
                  </h4>

                  <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#706452]">
                    {output.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}