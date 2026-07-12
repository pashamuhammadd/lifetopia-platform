import { ImpactMetrics } from "./ImpactMetrics";

const impactPrinciples = [
  {
    label: "Target Based",
    value: "Defined before delivery",
  },
  {
    label: "Evidence Based",
    value: "Supported by records",
  },
  {
    label: "Publicly Reported",
    value: "Visible to reviewers",
  },
  {
    label: "Beta Focused",
    value: "Measured during testing",
  },
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
              Expected Beta Impact
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Clear adoption targets with verifiable measurement.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              The Beta phase will be evaluated through participant activity,
              structured testing, connected wallets, and verifiable Solana
              devnet interactions—not through unsupported growth claims.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
              Reporting Standard
            </p>

            <h3 className="mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-black leading-[1.25]">
              Targets are reported as targets until independently achieved.
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {impactPrinciples.map((principle) => (
                <article
                  key={principle.label}
                  className="rounded-[clamp(0.6rem,0.95vw,0.78rem)] border border-white/10 bg-white/[0.06] px-3 py-3"
                >
                  <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-[#afe794]">
                    {principle.label}
                  </p>

                  <p className="mt-1.5 text-[clamp(0.66rem,0.76vw,0.82rem)] leading-[1.5] text-white/48">
                    {principle.value}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)]">
          <ImpactMetrics />
        </div>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#173b21] p-[clamp(1rem,1.8vw,1.5rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.15)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[52rem]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
                Final Impact Report
              </p>

              <h3 className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-black">
                Final results will compare achieved outcomes against the
                original Beta targets.
              </h3>

              <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-white/66">
                Any target that is not fully achieved will remain clearly
                identified rather than being presented as completed impact.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#afe794]">
                  4
                </p>

                <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-white/42">
                  Beta Targets
                </p>
              </div>

              <div className="rounded-[0.75rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-center">
                <p className="text-[clamp(1rem,1.3vw,1.2rem)] font-black text-[#afe794]">
                  Public
                </p>

                <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] text-white/42">
                  Reporting
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}