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
      "Core engineering, gameplay systems, community platform completion, and Solana integration.",
    percentage: 55,
    amount: "$5,500",
    color: "#69ad49",
  },
  {
    label: "Infrastructure",
    description:
      "Hosting, database, deployment, monitoring, development tools, and technical operations.",
    percentage: 20,
    amount: "$2,000",
    color: "#4a9ed4",
  },
  {
    label: "Quality Assurance",
    description:
      "Testing, bug fixing, performance optimization, and public Beta preparation.",
    percentage: 15,
    amount: "$1,500",
    color: "#e4a43b",
  },
  {
    label: "Community & Onboarding",
    description:
      "Beta testing programs, player onboarding, feedback collection, and reporting.",
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
      "Beta gameplay system development",
      "Game and community account synchronization",
      "Solana wallet and devnet integration",
      "Developer and artist compensation",
    ],
  },
  {
    category: "Infrastructure",
    amount: "$2,000",
    items: [
      "Database and backend services",
      "Application hosting and deployment",
      "Development tooling and monitoring",
      "Asset delivery and storage requirements",
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
      "Public Beta testing campaign",
      "Player onboarding materials",
      "Community feedback collection",
      "Milestone and impact reporting",
    ],
  },
];

const budgetPrinciples = [
  "Milestone-based spending",
  "Public progress reporting",
  "Product-first allocation",
  "Transparent delivery",
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
              A practical budget focused on product delivery and public Beta
              readiness.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[46rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              The $10,000 grant request is allocated across development,
              infrastructure, quality assurance, and community onboarding, with
              every category tied directly to measurable delivery.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#d8c9a9] bg-white p-[clamp(1rem,1.6vw,1.25rem)] shadow-[0_1rem_3rem_rgba(62,47,27,0.07)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#7f6f58]">
              Total Grant Request
            </p>

            <p className="mt-2 text-[clamp(2rem,3.2vw,3rem)] font-black tracking-[-0.04em] text-[#477d34]">
              $10,000
            </p>

            <div className="mt-4 h-[0.6rem] overflow-hidden rounded-full bg-[#e8dfcd]">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#69ad49] via-[#4a9ed4] to-[#8c75db]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {budgetPrinciples.map((principle) => (
                <span
                  key={principle}
                  className="rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#e4d9c1] bg-[#faf6ed] px-3 py-2 text-center text-[clamp(0.7rem,0.8vw,0.86rem)] font-bold text-[#6c604e]"
                >
                  {principle}
                </span>
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

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#fffaf0] p-[clamp(1rem,1.8vw,1.5rem)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[48rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
                Financial Accountability
              </p>

              <h3 className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-black text-[#30251c]">
                Spending will follow milestone delivery and be documented
                through public updates.
              </h3>

              <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
                Budget usage, completed outputs, and meaningful changes will be
                communicated throughout the grant period.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <div className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#d8e6cb] bg-[#edf6e7] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#718363]">
                  Delivery
                </p>

                <p className="mt-1 text-[clamp(0.95rem,1.1vw,1.18rem)] font-black text-[#4f803c]">
                  3 Milestones
                </p>
              </div>

              <div className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#d8e6cb] bg-[#edf6e7] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#718363]">
                  Reporting
                </p>

                <p className="mt-1 text-[clamp(0.95rem,1.1vw,1.18rem)] font-black text-[#4f803c]">
                  Public
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}