import {
  BudgetAllocation,
  type BudgetAllocationItem,
} from "./BudgetAllocation";
import {
  BudgetBreakdown,
  type BudgetBreakdownItem,
} from "./BudgetBreakdown";

const allocationItems: BudgetAllocationItem[] = [
  {
    label: "Product Development",
    description:
      "Core engineering, gameplay systems, platform integration, marketplace foundations, and Solana connectivity.",
    percentage: 55,
    amount: "$5,500",
    color: "#69ad49",
  },
  {
    label: "Infrastructure",
    description:
      "Database services, hosting, deployment, storage, monitoring, and technical operations.",
    percentage: 20,
    amount: "$2,000",
    color: "#4a9ed4",
  },
  {
    label: "Quality Assurance",
    description:
      "Testing, bug fixing, performance optimization, balancing, and public Beta verification.",
    percentage: 15,
    amount: "$1,500",
    color: "#e4a43b",
  },
  {
    label: "Community & Onboarding",
    description:
      "Tester onboarding, feedback collection, documentation, public reporting, and community preparation.",
    percentage: 10,
    amount: "$1,000",
    color: "#8c75db",
  },
];

const breakdownItems: BudgetBreakdownItem[] = [
  {
    category: "Product Development",
    amount: "$5,500",
    items: [
      "Community platform feature completion",
      "Playable Beta system development",
      "Game and community synchronization",
      "Marketplace and Solana foundations",
    ],
  },
  {
    category: "Infrastructure",
    amount: "$2,000",
    items: [
      "Database and backend services",
      "Application hosting and deployment",
      "Monitoring and development tooling",
      "Media storage and asset delivery",
    ],
  },
  {
    category: "Quality Assurance",
    amount: "$1,500",
    items: [
      "Cross-platform functionality testing",
      "Gameplay balancing and bug fixing",
      "Performance and stability optimization",
      "Pre-release verification",
    ],
  },
  {
    category: "Community & Onboarding",
    amount: "$1,000",
    items: [
      "Public Beta tester onboarding",
      "Player guidance and documentation",
      "Structured feedback collection",
      "Milestone and impact reporting",
    ],
  },
];

const fundingPrinciples = [
  {
    label: "Product First",
    description:
      "Most funding is directed toward features and integration.",
  },
  {
    label: "Milestone Linked",
    description:
      "Spending follows the three-stage delivery roadmap.",
  },
  {
    label: "Publicly Reported",
    description:
      "Progress and delivery activity remain reviewable.",
  },
  {
    label: "Fully Allocated",
    description:
      "Every requested dollar has a defined delivery purpose.",
  },
];

export function BudgetSection() {
  return (
    <section
      id="budget"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[4rem] size-[22rem] rounded-full bg-[#e3f2d8]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2rem] right-[-9rem] size-[24rem] rounded-full bg-[#e0eef9]/55 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Budget & Allocation
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              A fully allocated budget tied directly to Beta delivery.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              The $10,000 request prioritizes product development while
              reserving defined resources for infrastructure, testing, and
              community onboarding across the complete milestone period.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
                  Total Grant Request
                </p>

                <p className="mt-2 text-[clamp(2rem,3.2vw,3rem)] font-black leading-none tracking-[-0.04em]">
                  $10,000
                </p>
              </div>

              <span className="rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#afe794]">
                100% allocated
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {fundingPrinciples.map((principle) => (
                <article
                  key={principle.label}
                  className="rounded-[clamp(0.6rem,0.95vw,0.78rem)] border border-white/10 bg-white/[0.06] px-3 py-3"
                >
                  <p className="text-[clamp(0.74rem,0.84vw,0.9rem)] font-black text-[#afe794]">
                    {principle.label}
                  </p>

                  <p className="mt-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] leading-[1.5] text-white/48">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <BudgetAllocation items={allocationItems} />
        </div>

        <div className="mt-[clamp(1rem,2vw,1.5rem)]">
          <BudgetBreakdown items={breakdownItems} />
        </div>
      </div>
    </section>
  );
}