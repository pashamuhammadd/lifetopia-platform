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
    <section className="overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#203d28]/15 bg-[#173b21] text-white shadow-[0_1rem_3.5rem_rgba(31,64,37,0.16)]">
      <header className="border-b border-white/10 px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(0.9rem,1.5vw,1.2rem)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
              Cost Coverage
            </p>

            <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em]">
              What each budget category directly supports
            </h3>
          </div>

          <p className="max-w-[32rem] text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.6] text-white/58">
            Each cost category is connected to concrete product delivery rather
            than general operational spending.
          </p>
        </div>
      </header>

      <div className="divide-y divide-white/10">
        {items.map((item, index) => (
          <article
            key={item.category}
            className="grid gap-4 px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(1rem,1.6vw,1.3rem)] md:grid-cols-[auto_minmax(12rem,0.7fr)_minmax(0,1.3fr)_auto] md:items-start"
          >
            <span className="flex size-[clamp(2.4rem,3.6vw,3rem)] shrink-0 items-center justify-center rounded-[clamp(0.6rem,0.95vw,0.78rem)] border border-[#99e27a]/15 bg-[#99e27a]/10 font-mono text-[clamp(0.74rem,0.9vw,0.88rem)] font-black text-[#a9eb8e]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.08em] text-white/38">
                Budget Category
              </p>

              <h4 className="mt-2 text-[clamp(1rem,1.2vw,1.25rem)] font-black text-white">
                {item.category}
              </h4>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {item.items.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 rounded-[clamp(0.65rem,1vw,0.82rem)] border border-white/[0.08] bg-white/[0.05] px-[clamp(0.75rem,1.2vw,0.95rem)] py-[clamp(0.7rem,1.1vw,0.88rem)]"
                >
                  <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#8fe16e]" />

                  <span className="text-[clamp(0.8rem,0.9vw,0.96rem)] font-medium leading-[1.55] text-white/68">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>

            <span className="w-fit shrink-0 rounded-full border border-[#9ae579]/15 bg-[#9ae579]/10 px-3 py-2 font-mono text-[clamp(0.76rem,0.86vw,0.92rem)] font-black text-[#a9ed8c]">
              {item.amount}
            </span>
          </article>
        ))}
      </div>

      <footer className="border-t border-white/10 bg-[#102d19] px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(0.85rem,1.4vw,1.1rem)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold leading-[1.6] text-white/62">
            Spending will be reviewed against completed milestone outputs and
            documented through public development updates.
          </p>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#afe794]">
            milestone-linked
          </span>
        </div>
      </footer>
    </section>
  );
}