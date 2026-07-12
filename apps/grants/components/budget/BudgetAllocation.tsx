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

export function BudgetAllocation({
  items,
}: BudgetAllocationProps) {
  return (
    <section className="rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#ddcfaf] bg-white p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
      <div>
        <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
          Funding Allocation
        </p>

        <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em] text-[#2f2118]">
          How the $10,000 grant will be used
        </h3>

        <p className="mt-3 max-w-[46rem] text-[clamp(0.9rem,1vw,1.06rem)] leading-[1.7] text-[#706452]">
          The budget prioritizes product development, infrastructure,
          testing, and community readiness across the Beta delivery period.
        </p>
      </div>

      <div className="mt-[clamp(1.2rem,2vw,1.6rem)] grid gap-[clamp(1rem,1.8vw,1.4rem)] lg:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.28fr)] lg:items-center">
        <div className="flex justify-center">
          <div
            className="relative flex size-[clamp(12rem,20vw,16rem)] items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#69ad49 0deg 198deg, #4a9ed4 198deg 270deg, #e4a43b 270deg 315deg, #8c75db 315deg 360deg)",
            }}
          >
            <div className="flex size-[70%] flex-col items-center justify-center rounded-full border border-[#e4d9c2] bg-[#fffaf0] text-center shadow-[inset_0_0_2rem_rgba(73,54,29,0.04)]">
              <p className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-black text-[#2f2118]">
                $10K
              </p>

              <p className="mt-1 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.09em] text-[#81715a]">
                Total Request
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-[clamp(0.65rem,1.1vw,0.85rem)]">
          {items.map((item) => (
            <article
              key={item.label}
              className="rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#e5d9c0] bg-[#fcf8f0] px-[clamp(0.8rem,1.35vw,1.05rem)] py-[clamp(0.7rem,1.2vw,0.95rem)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="mt-1 size-[clamp(0.7rem,1vw,0.9rem)] shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="min-w-0">
                    <h4 className="text-[clamp(0.95rem,1.05vw,1.12rem)] font-black text-[#30251c]">
                      {item.label}
                    </h4>

                    <p className="mt-1 text-[clamp(0.8rem,0.9vw,0.96rem)] leading-[1.55] text-[#776b58]">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[clamp(0.95rem,1.1vw,1.18rem)] font-black text-[#2f2118]">
                    {item.amount}
                  </p>

                  <p className="mt-1 text-[clamp(0.7rem,0.78vw,0.84rem)] font-bold text-[#81745f]">
                    {item.percentage}%
                  </p>
                </div>
              </div>

              <div className="mt-[clamp(0.55rem,0.9vw,0.72rem)] h-[0.55rem] overflow-hidden rounded-full bg-[#e8dfcd]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}