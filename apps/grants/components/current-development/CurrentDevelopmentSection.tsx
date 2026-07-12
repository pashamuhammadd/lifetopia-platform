import { CurrentDevelopmentStats } from "./CurrentDevelopmentStats";
import { CurrentDevelopmentTimeline } from "./CurrentDevelopmentTimeline";

export function CurrentDevelopmentSection() {
  return (
    <section
      id="current-development"
      className="bg-[#fff8ec] py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="grants-container">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8caa7] bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#8b7045] shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#67b547]" />
            Current Development
          </span>

          <h2 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight tracking-[-0.04em] text-[#2f2118]">
            Building the Beta Foundation of Lifetopia World
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.2vw,1.2rem)] leading-8 text-[#6f6554]">
            We are currently developing the Beta version that connects the game,
            community platform, and Solana blockchain into one seamless
            ecosystem. This phase focuses on stability, gameplay depth, and
            real-world player interaction.
          </p>
        </div>

        <div className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-[#dfd0ad] bg-white shadow-[0_20px_60px_rgba(74,55,28,0.08)]">
            <div className="border-b border-[#efe3c7] bg-[#faf5ea] px-8 py-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8b7045]">
                    Beta Progress
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-[#2f2118]">
                    68% Complete
                  </h3>
                </div>

                <div className="w-full max-w-sm">
                  <div className="h-4 overflow-hidden rounded-full bg-[#eadfc7]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#69b74b] to-[#4f8f35]"
                      style={{ width: "68%" }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-sm font-semibold text-[#7a6a55]">
                    <span>Started</span>
                    <span>Beta Release</span>
                  </div>
                </div>
              </div>
            </div>

           <div className="p-[clamp(1rem,2vw,2rem)]">
  <CurrentDevelopmentStats />
  <CurrentDevelopmentTimeline />
</div>
          </div>
        </div>
      </div>
    </section>
  );
}