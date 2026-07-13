import { TechnologyIcon } from "@/components/TechnologyIcon";

type BudgetAccent =
  | "green"
  | "blue"
  | "purple"
  | "gold";

type BudgetCategory = {
  title: string;
  amount: number;
  percentage: number;
  purpose: string;
  icon: string;
  accent: BudgetAccent;
};

const totalBudget = 10_000;

const budgetCategories: BudgetCategory[] = [
  {
    title: "Product Development",
    amount: 5_500,
    percentage: 55,
    purpose:
      "Game, community, shared identity, and ecosystem integration.",
    icon: "mdi:hammer-wrench",
    accent: "green",
  },
  {
    title: "Infrastructure",
    amount: 2_000,
    percentage: 20,
    purpose:
      "Hosting, backend services, deployment, and technical operations.",
    icon: "mdi:server-network",
    accent: "blue",
  },
  {
    title: "Quality Assurance",
    amount: 1_500,
    percentage: 15,
    purpose:
      "Testing, stabilization, bug resolution, and Beta readiness.",
    icon: "mdi:shield-check-outline",
    accent: "purple",
  },
  {
    title: "Community & Onboarding",
    amount: 1_000,
    percentage: 10,
    purpose:
      "Tester onboarding, documentation, feedback, and participation.",
    icon: "mdi:account-group-outline",
    accent: "gold",
  },
];

const chartSegments = [
  {
    percentage: 55,
    offset: 0,
    stroke: "#68ad4a",
  },
  {
    percentage: 20,
    offset: -55,
    stroke: "#55a9dc",
  },
  {
    percentage: 15,
    offset: -75,
    stroke: "#9177dc",
  },
  {
    percentage: 10,
    offset: -90,
    stroke: "#e4aa3b",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getCategoryClasses(accent: BudgetAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#75afd1]/30 bg-[#f3fafe]",
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      bar: "bg-[#55a9dc]",
      percentage: "text-[#347ca6]",
      glow: "bg-[#72c5eb]/18",
      dot: "bg-[#55a9dc]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/30 bg-[#faf8ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      bar: "bg-[#9177dc]",
      percentage: "text-[#6d50b4]",
      glow: "bg-[#9b7de5]/18",
      dot: "bg-[#9177dc]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/35 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#9e741d]",
      bar: "bg-[#e4aa3b]",
      percentage: "text-[#9e741d]",
      glow: "bg-[#f4c45e]/20",
      dot: "bg-[#e4aa3b]",
    };
  }

  return {
    card: "border-[#79ad62]/30 bg-[#f7fcf3]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    bar: "bg-[#68ad4a]",
    percentage: "text-[#4f8239]",
    glow: "bg-[#9fd969]/20",
    dot: "bg-[#68ad4a]",
  };
}

function BudgetCategoryCard({
  category,
}: {
  category: BudgetCategory;
}) {
  const classes = getCategoryClasses(category.accent);

  return (
    <article
      className={`group relative min-w-0 overflow-hidden rounded-[0.9rem] border p-[clamp(0.75rem,1.1vw,0.95rem)] shadow-[0_0.65rem_2rem_rgba(61,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1rem_2.8rem_rgba(61,47,27,0.1)] ${classes.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 size-32 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${classes.glow}`}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={`flex size-[clamp(2.45rem,3.4vw,2.9rem)] shrink-0 items-center justify-center rounded-[0.7rem] border transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${classes.icon}`}
        >
          <TechnologyIcon
            icon={category.icon}
            label={category.title}
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[clamp(0.82rem,0.94vw,1rem)] font-black leading-[1.2] text-[#30251c]">
                {category.title}
              </h3>

              <p className="mt-1 text-[clamp(0.65rem,0.74vw,0.8rem)] font-semibold leading-[1.4] text-[#7c705e]">
                {category.purpose}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p
                className={`text-[clamp(1rem,1.2vw,1.2rem)] font-black leading-none ${classes.percentage}`}
              >
                {category.percentage}%
              </p>

              <p className="mt-1 text-[0.64rem] font-black text-[#786c59]">
                {formatCurrency(category.amount)}
              </p>
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80 shadow-inner">
            <div
              className={`h-full origin-left rounded-full transition-all duration-700 group-hover:brightness-110 ${classes.bar}`}
              style={{
                width: `${category.percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function BudgetSection() {
  return (
    <section
      id="budget"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-4 size-80 rounded-full bg-[#f2dfbd]/45 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,rgba(119,174,88,0.11),transparent)]"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.12]" />

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.25rem,2.5vw,2rem)] lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ddc995] bg-[#fff5dc] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#926b1e]">
              <span className="size-2 rounded-full bg-[#e4aa3b]" />
              Funding Allocation
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[16ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Every dollar supports Beta delivery.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.55] text-[#706452]">
              The $10,000 request prioritizes product execution while
              reserving resources for infrastructure, testing, and public
              onboarding.
            </p>

            <div className="mt-[clamp(1rem,1.6vw,1.25rem)] flex justify-center lg:justify-start">
              <div className="group relative flex size-[clamp(15rem,23vw,19rem)] items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-[10%] animate-pulse rounded-full bg-[#f7d993]/20 blur-2xl"
                />

                <svg
                  viewBox="0 0 120 120"
                  role="img"
                  aria-label="Budget allocation chart showing 55 percent product development, 20 percent infrastructure, 15 percent quality assurance, and 10 percent community onboarding"
                  className="relative size-full -rotate-90 drop-shadow-[0_1rem_2rem_rgba(76,55,27,0.12)] transition duration-500 group-hover:scale-[1.025]"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#eee4d2"
                    strokeWidth="13"
                    pathLength="100"
                  />

                  {chartSegments.map((segment) => (
                    <circle
                      key={`${segment.percentage}-${segment.offset}`}
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      stroke={segment.stroke}
                      strokeWidth="13"
                      strokeLinecap="round"
                      pathLength="100"
                      strokeDasharray={`${segment.percentage - 1.5} ${
                        100 - segment.percentage + 1.5
                      }`}
                      strokeDashoffset={segment.offset}
                      className="transition-[stroke-width,filter] duration-300 hover:[filter:brightness(1.08)] hover:stroke-[15]"
                    />
                  ))}
                </svg>

                <div className="absolute inset-[25%] flex flex-col items-center justify-center rounded-full border border-[#e2d3b7] bg-[#fffaf0]/95 text-center shadow-[0_0.7rem_2.2rem_rgba(61,47,27,0.08)] backdrop-blur">
                  <p className="text-[clamp(0.62rem,0.72vw,0.78rem)] font-black uppercase tracking-[0.1em] text-[#8d806b]">
                    Total Request
                  </p>

                  <p className="mt-1.5 text-[clamp(1.55rem,2.4vw,2.15rem)] font-black leading-none text-[#315d32]">
                    $10K
                  </p>

                  <p className="mt-1.5 text-[clamp(0.62rem,0.7vw,0.76rem)] font-bold text-[#8c7e68]">
                    8–12 weeks
                  </p>
                </div>

                {budgetCategories.map((category, index) => {
                  const classes = getCategoryClasses(
                    category.accent,
                  );

                  const positions = [
                    "left-[3%] top-[14%]",
                    "right-[0%] top-[25%]",
                    "bottom-[13%] right-[5%]",
                    "bottom-[4%] left-[13%]",
                  ];

                  return (
                    <span
                      key={category.title}
                      aria-hidden="true"
                      className={`absolute hidden size-3 rounded-full border-2 border-white shadow-md sm:block ${positions[index]} ${classes.dot}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <header className="flex flex-col gap-3 border-b border-[#e4d7bf] pb-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.1em] text-[#668255]">
                  Allocation Overview
                </p>

                <h3 className="mt-1.5 text-[clamp(1.05rem,1.35vw,1.32rem)] font-black text-[#30251c]">
                  Four focused delivery categories
                </h3>
              </div>

              <span className="w-fit rounded-full border border-[#d4c7ac] bg-white/70 px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#6e624f]">
                Total: {formatCurrency(totalBudget)}
              </span>
            </header>

            <div className="mt-3 grid gap-2.5">
              {budgetCategories.map((category) => (
                <BudgetCategoryCard
                  key={category.title}
                  category={category}
                />
              ))}
            </div>

            <footer className="mt-3 overflow-hidden rounded-[0.88rem] border border-[#244e2e]/15 bg-[#173b21] text-white shadow-[0_0.8rem_2.4rem_rgba(31,64,37,0.14)]">
              <div className="grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
                <div className="flex items-center justify-center border-b border-white/10 bg-[#102d19] px-4 py-3 sm:border-b-0 sm:border-r">
                  <span className="flex size-10 items-center justify-center rounded-[0.7rem] border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                    <TechnologyIcon
                      icon="mdi:check-decagram-outline"
                      label="Delivery focused budget"
                    />
                  </span>
                </div>

                <div className="px-4 py-3">
                  <p className="text-[0.64rem] font-black uppercase tracking-[0.09em] text-[#a8df8f]">
                    Funding Principle
                  </p>

                  <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold leading-[1.45] text-white/62">
                    Spending is tied to measurable Beta delivery,
                    infrastructure reliability, testing, and user
                    participation.
                  </p>
                </div>

                <div className="hidden border-l border-white/10 px-4 py-3 sm:block">
                  <span className="rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[0.68rem] font-black text-[#afe994]">
                    100% allocated
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}