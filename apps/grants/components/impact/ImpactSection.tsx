import { ImpactMetrics } from "./ImpactMetrics";

const impactPrinciples = [
  "Measurable adoption",
  "Real product usage",
  "Public reporting",
  "Solana ecosystem growth",
];

export function ImpactSection() {
  return (
    <section
      id="impact"
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
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Expected Impact
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Measurable outcomes for players, products, and the Solana
              ecosystem.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[46rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              The grant is designed to produce tangible products, active user
              participation, wallet onboarding, and verifiable development
              activity during the Beta phase.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#d8c9a9] bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
              Impact Objective
            </p>

            <h3 className="mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-black leading-[1.25]">
              Turn development funding into visible product adoption.
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {impactPrinciples.map((principle) => (
                <span
                  key={principle}
                  className="rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-white/10 bg-white/[0.06] px-3 py-2 text-center text-[clamp(0.68rem,0.78vw,0.84rem)] font-bold text-white/75"
                >
                  {principle}
                </span>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <ImpactMetrics />
        </div>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#f7f0e3] p-[clamp(1rem,1.8vw,1.5rem)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[48rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
                Impact Reporting
              </p>

              <h3 className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-black text-[#30251c]">
                Results will be measured through user activity, product
                delivery, testing participation, and Solana usage.
              </h3>

              <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#746753]">
                Final reporting will compare completed outputs and achieved
                metrics against the original milestone targets.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <div className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#d8e6cb] bg-[#edf6e7] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#718363]">
                  Metrics
                </p>

                <p className="mt-1 text-[clamp(0.95rem,1.1vw,1.18rem)] font-black text-[#4f803c]">
                  Public
                </p>
              </div>

              <div className="rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#d8e6cb] bg-[#edf6e7] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#718363]">
                  Evaluation
                </p>

                <p className="mt-1 text-[clamp(0.95rem,1.1vw,1.18rem)] font-black text-[#4f803c]">
                  Milestone-based
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}