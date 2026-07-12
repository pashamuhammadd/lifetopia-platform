import {
  ImpactCard,
  type ImpactCardData,
} from "./ImpactCard";

const impactMetrics: ImpactCardData[] = [
  {
    label: "Beta Participants",
    value: "100+",
    description:
      "Target number of players participating across the game and community platform during the public Beta period.",
    measurement:
      "Unique registered participants with recorded platform or gameplay activity.",
    icon: "mdi:account-group-outline",
    accent: "green",
  },
  {
    label: "Verified Testers",
    value: "50+",
    description:
      "A structured testing group contributing usable feedback across gameplay, platform stability, and onboarding.",
    measurement:
      "Approved tester roster with submitted testing reports or structured feedback.",
    icon: "mdi:clipboard-check-outline",
    accent: "blue",
  },
  {
    label: "Connected Wallets",
    value: "50+",
    description:
      "Players introduced to Solana wallet connectivity through Lifetopia's connected identity and ecosystem features.",
    measurement:
      "Unique wallets successfully connected during the Beta testing period.",
    icon: "mdi:wallet-outline",
    accent: "purple",
  },
  {
    label: "Devnet Interactions",
    value: "500+",
    description:
      "Target Solana activity generated through wallet testing, identity flows, and marketplace foundation experiments.",
    measurement:
      "Recorded successful devnet transactions and verified blockchain interactions.",
    icon: "mdi:swap-horizontal",
    accent: "gold",
  },
];

const reportingMethods = [
  {
    number: "01",
    title: "Product Analytics",
    description:
      "Registered accounts, active participation, feature usage, and onboarding completion.",
  },
  {
    number: "02",
    title: "Testing Records",
    description:
      "Verified tester participation, submitted feedback, issue reports, and resolved findings.",
  },
  {
    number: "03",
    title: "Blockchain Evidence",
    description:
      "Connected wallet counts and verifiable Solana devnet activity.",
  },
  {
    number: "04",
    title: "Milestone Evidence",
    description:
      "Completed deliverables, public development records, and milestone acceptance results.",
  },
];

export function ImpactMetrics() {
  return (
    <div>
      <div className="grid gap-[clamp(0.75rem,1.4vw,1.05rem)] sm:grid-cols-2 xl:grid-cols-4">
        {impactMetrics.map((item) => (
          <ImpactCard
            key={item.label}
            item={item}
          />
        ))}
      </div>

      <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9c9a8] bg-white shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
        <header className="border-b border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.7vw,1.35rem)] py-[clamp(0.9rem,1.4vw,1.1rem)]">
          <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
            Measurement Framework
          </p>

          <h3 className="mt-2 text-[clamp(1.3rem,1.9vw,1.8rem)] font-black tracking-[-0.03em] text-[#2f2118]">
            Every target has a defined verification method
          </h3>

          <p className="mt-3 max-w-[48rem] text-[clamp(0.86rem,0.96vw,1.02rem)] leading-[1.65] text-[#706452]">
            Reported impact will be based on recorded product activity,
            testing evidence, blockchain data, and completed milestone
            deliverables.
          </p>
        </header>

        <div className="grid gap-px bg-[#eadfc8] sm:grid-cols-2">
          {reportingMethods.map((method) => (
            <article
              key={method.number}
              className="bg-white p-[clamp(1rem,1.7vw,1.35rem)]"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-[clamp(2.3rem,3.5vw,2.9rem)] shrink-0 items-center justify-center rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#75ac5d]/20 bg-[#edf6e7] font-mono text-[clamp(0.74rem,0.86vw,0.9rem)] font-black text-[#4f803b]">
                  {method.number}
                </span>

                <div className="min-w-0">
                  <h4 className="text-[clamp(1rem,1.15vw,1.22rem)] font-black text-[#30251c]">
                    {method.title}
                  </h4>

                  <p className="mt-2 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.65] text-[#706452]">
                    {method.description}
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