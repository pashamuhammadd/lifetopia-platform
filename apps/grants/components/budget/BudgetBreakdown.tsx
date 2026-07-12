export type BudgetBreakdownItem = {
  category: string;
  amount: string;
  items: string[];
};

type BudgetBreakdownProps = {
  items: BudgetBreakdownItem[];
};

export function BudgetBreakdown({
  items,
}: BudgetBreakdownProps) {
  return (
    <section className="rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#ddcfaf] bg-[#173b21] p-[clamp(1rem,1.8vw,1.5rem)] text-white shadow-[0_1rem_3.5rem_rgba(31,64,37,0.16)]">
      <div>
        <p className="font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
          Budget Breakdown
        </p>

        <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em]">
          What each allocation supports
        </h3>

        <p className="mt-3 max-w-[44rem] text-[clamp(0.88rem,0.98vw,1.04rem)] leading-[1.7] text-white/65">
          Every allocation is tied directly to product delivery, technical
          operations, and public Beta readiness.
        </p>
      </div>

      <div className="mt-[clamp(1.2rem,2vw,1.6rem)] grid gap-[clamp(0.7rem,1.2vw,0.95rem)] sm:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={item.category}
            className="rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-white/10 bg-white/[0.06] p-[clamp(0.8rem,1.35vw,1.05rem)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-[clamp(2.2rem,3.4vw,2.8rem)] shrink-0 items-center justify-center rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#99e27a]/15 bg-[#99e27a]/10 font-mono text-[clamp(0.74rem,1vw,0.9rem)] font-black text-[#a9eb8e]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h4 className="text-[clamp(0.95rem,1.08vw,1.15rem)] font-black">
                  {item.category}
                </h4>
              </div>

              <span className="shrink-0 rounded-full border border-[#9ae579]/15 bg-[#9ae579]/10 px-3 py-1.5 font-mono text-[clamp(0.72rem,0.8vw,0.86rem)] font-black text-[#a9ed8c]">
                {item.amount}
              </span>
            </div>

            <ul className="mt-[clamp(0.75rem,1.2vw,0.95rem)] space-y-2.5">
              {item.items.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-[clamp(0.8rem,0.9vw,0.96rem)] font-medium leading-[1.55] text-white/72"
                >
                  <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#8fe16e]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-[clamp(0.9rem,1.5vw,1.2rem)] rounded-[clamp(0.7rem,1.1vw,0.88rem)] border border-white/10 bg-black/10 px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)]">
        <p className="font-mono text-[clamp(0.72rem,0.8vw,0.86rem)] leading-[1.6] text-[#a8df8f]">
          funding_policy: all spending will be documented through milestone
          updates and public development reporting
        </p>
      </div>
    </section>
  );
}