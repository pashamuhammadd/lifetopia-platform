import { AdoptionDiagram } from "./AdoptionDiagram";
import { ProblemCard } from "./ProblemCard";
import { SolutionCard } from "./SolutionCard";

const ecosystemPillars = [
  {
    number: "01",
    title: "Game",
    description:
      "A familiar and enjoyable entry point where players explore, progress, and build a digital life.",
  },
  {
    number: "02",
    title: "Community Platform",
    description:
      "A social layer where players form identities, communicate, publish content, and build relationships.",
  },
  {
    number: "03",
    title: "Marketplace",
    description:
      "A connected economy for virtual items, player-created value, and future digital ownership.",
  },
];

export function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[4rem] size-[22rem] rounded-full bg-[#f2ddd2]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[2rem] right-[-9rem] size-[24rem] rounded-full bg-[#dcefd0]/60 blur-[7rem]"
      />

      <div className="grants-container relative">
        <header className="mx-auto max-w-[58rem] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd8bc] bg-[#eef6e8] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
            <span className="size-2 rounded-full bg-[#68ad4a]" />
            Problem & Solution
          </span>

          <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
            Making Web3 accessible through experiences people already enjoy.
          </h2>

          <p className="mx-auto mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[48rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
            Lifetopia World lowers the barrier to Web3 adoption by combining a
            game, a community platform, and a marketplace into one connected
            ecosystem built around familiar digital behavior.
          </p>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)] grid gap-[clamp(0.9rem,1.7vw,1.3rem)] xl:grid-cols-2">
          <ProblemCard />
          <SolutionCard />
        </div>

        <div className="mt-[clamp(1rem,2vw,1.5rem)]">
          <AdoptionDiagram />
        </div>

        <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.8vw,1.45rem)] border border-[#d7c8a8] bg-[#173b21] text-white shadow-[0_1.4rem_4rem_rgba(31,64,37,0.16)]">
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="border-b border-white/10 p-[clamp(1rem,2vw,1.7rem)] lg:border-b-0 lg:border-r">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.12em] text-[#a8df8f]">
                The Lifetopia Model
              </p>

              <h3 className="mt-3 text-[clamp(1.5rem,2.5vw,2.3rem)] font-black leading-[1.1] tracking-[-0.035em]">
                Three familiar products. One connected path into Web3.
              </h3>

              <p className="mt-4 text-[clamp(0.9rem,1.02vw,1.08rem)] leading-[1.75] text-white/65">
                Users are not required to understand blockchain before they can
                enjoy Lifetopia. Web3 features are introduced gradually as part
                of the experience.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-3">
              {ecosystemPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="bg-[#173b21] p-[clamp(1rem,1.7vw,1.35rem)]"
                >
                  <span className="font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#9be47d]">
                    {pillar.number}
                  </span>

                  <h4 className="mt-3 text-[clamp(1rem,1.2vw,1.25rem)] font-black">
                    {pillar.title}
                  </h4>

                  <p className="mt-2 text-[clamp(0.82rem,0.92vw,0.98rem)] leading-[1.65] text-white/62">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d8c8a7] bg-[#fffaf0] p-[clamp(1rem,1.8vw,1.5rem)] text-center">
          <p className="mx-auto max-w-[56rem] text-[clamp(1.1rem,1.6vw,1.45rem)] font-black leading-[1.5] text-[#30251c]">
            We do not ask people to learn Web3 first. We build experiences that
            naturally lead them there.
          </p>

          <p className="mx-auto mt-3 max-w-[46rem] text-[clamp(0.86rem,0.98vw,1.04rem)] leading-[1.7] text-[#746753]">
            The goal is to introduce wallets, digital ownership, and the Solana
            ecosystem through products that people genuinely want to use.
          </p>
        </footer>
      </div>
    </section>
  );
}