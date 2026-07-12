export type BudgetAllocationItem = {
  label: string;
  description: string;
  percentage: number;
  amount: string;
  color: string;
};

type BudgetAllocationProps = {
  items: BudgetAllocationItem[];
};

function parseCurrencyAmount(amount: string) {
  const parsedAmount = Number(
    amount.replace(/[^0-9.-]+/g, ""),
  );

  return Number.isFinite(parsedAmount)
    ? parsedAmount
    : 0;
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildConicGradient(
  items: BudgetAllocationItem[],
  totalPercentage: number,
) {
  if (!items.length || totalPercentage <= 0) {
    return "conic-gradient(#e8dfcd 0% 100%)";
  }

  let currentPosition = 0;

  const segments = items.map((item) => {
    const normalizedPercentage =
      (Math.max(0, item.percentage) /
        totalPercentage) *
      100;

    const startPosition = currentPosition;

    const endPosition = Math.min(
      100,
      currentPosition + normalizedPercentage,
    );

    currentPosition = endPosition;

    return `${item.color} ${startPosition.toFixed(
      2,
    )}% ${endPosition.toFixed(2)}%`;
  });

  if (currentPosition < 100) {
    segments.push(
      `#e8dfcd ${currentPosition.toFixed(2)}% 100%`,
    );
  }

  return `conic-gradient(${segments.join(", ")})`;
}

export function BudgetAllocation({
  items,
}: BudgetAllocationProps) {
  const totalPercentage = items.reduce(
    (total, item) =>
      total + Math.max(0, item.percentage),
    0,
  );

  const totalAmount = items.reduce(
    (total, item) =>
      total + parseCurrencyAmount(item.amount),
    0,
  );

  const formattedTotalAmount =
    formatUsd(totalAmount);

  const chartBackground = buildConicGradient(
    items,
    totalPercentage,
  );

  const isFullyAllocated =
    Math.abs(totalPercentage - 100) < 0.01;

  const chartLabel = items
    .map(
      (item) =>
        `${item.label}: ${item.percentage}%`,
    )
    .join(", ");

  return (
    <section className="overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#ddcfaf] bg-white shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
      <header className="border-b border-[#eadfc8] bg-[#faf6ed] p-[clamp(1rem,1.8vw,1.5rem)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
              Funding Allocation
            </p>

            <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em] text-[#2f2118]">
              How the {formattedTotalAmount} grant will be used
            </h3>

            <p className="mt-3 max-w-[48rem] text-[clamp(0.9rem,1vw,1.06rem)] leading-[1.7] text-[#706452]">
              The budget prioritizes product
              development while reserving dedicated
              resources for infrastructure, quality
              assurance, and community onboarding.
            </p>
          </div>

          <span
            className={[
              "inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black",
              isFullyAllocated
                ? "border-[#cce0c0] bg-[#edf7e7] text-[#477a34]"
                : "border-[#ead5a1] bg-[#fff5da] text-[#956c1c]",
            ].join(" ")}
          >
            <span
              className={[
                "size-2 rounded-full",
                isFullyAllocated
                  ? "bg-[#68ad4a]"
                  : "bg-[#dca43a]",
              ].join(" ")}
            />

            {isFullyAllocated
              ? "100% Allocated"
              : `${totalPercentage}% Configured`}
          </span>
        </div>
      </header>

      <div className="grid gap-[clamp(1.2rem,2.5vw,2rem)] p-[clamp(1rem,1.8vw,1.5rem)] lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:items-center">
        <div className="flex flex-col items-center">
          <div
            role="img"
            aria-label={`Budget allocation chart. ${chartLabel}`}
            className="relative flex size-[clamp(13rem,22vw,17rem)] items-center justify-center rounded-full shadow-[0_1rem_3rem_rgba(68,51,27,0.12)]"
            style={{
              background: chartBackground,
            }}
          >
            <div className="flex size-[68%] flex-col items-center justify-center rounded-full border border-[#e4d9c2] bg-[#fffaf0] px-4 text-center shadow-[inset_0_0_2rem_rgba(73,54,29,0.05),0_0.5rem_1.5rem_rgba(62,47,27,0.08)]">
              <p className="text-[clamp(1.45rem,2.5vw,2.25rem)] font-black tracking-[-0.04em] text-[#2f2118]">
                {formattedTotalAmount}
              </p>

              <p className="mt-1 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.09em] text-[#81715a]">
                Total Request
              </p>

              <div className="mt-3 h-px w-12 bg-[#ded1b7]" />

              <p className="mt-3 text-[clamp(0.72rem,0.82vw,0.88rem)] font-bold text-[#668255]">
                {items.length} cost categories
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-[#e4d9c1] bg-[#faf7ef] px-3 py-1.5"
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#6f6250]">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-[clamp(0.65rem,1.1vw,0.85rem)]">
          {items.map((item, index) => (
            <article
              key={item.label}
              className="rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-[#e5d9c0] bg-[#fcf8f0] px-[clamp(0.85rem,1.4vw,1.1rem)] py-[clamp(0.8rem,1.3vw,1rem)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="flex size-[clamp(2.25rem,3.3vw,2.75rem)] shrink-0 items-center justify-center rounded-[clamp(0.55rem,0.85vw,0.7rem)] font-mono text-[clamp(0.7rem,0.82vw,0.86rem)] font-black text-white shadow-[0_0.45rem_1.2rem_rgba(62,47,27,0.1)]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <div className="min-w-0">
                    <h4 className="text-[clamp(0.98rem,1.08vw,1.15rem)] font-black text-[#30251c]">
                      {item.label}
                    </h4>

                    <p className="mt-1.5 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.6] text-[#776b58]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[clamp(1rem,1.15vw,1.22rem)] font-black text-[#2f2118]">
                    {item.amount}
                  </p>

                  <p
                    className="mt-1 text-[clamp(0.72rem,0.8vw,0.86rem)] font-black"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.percentage}%
                  </p>
                </div>
              </div>

              <div className="mt-[clamp(0.7rem,1.1vw,0.85rem)] h-[0.6rem] overflow-hidden rounded-full bg-[#e8dfcd]">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        item.percentage,
                      ),
                    )}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(0.85rem,1.4vw,1.1rem)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold leading-[1.6] text-[#706452]">
            Every category contributes directly to
            milestone delivery and public Beta
            readiness.
          </p>

          <p className="shrink-0 font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#527d40]">
            Total: {totalPercentage}%
          </p>
        </div>
      </footer>
    </section>
  );
}