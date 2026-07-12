const web3Barriers = [
  {
    title: "Complex Onboarding",
    description:
      "Wallet setup, network selection, and unfamiliar transaction flows can feel overwhelming for first-time users.",
  },
  {
    title: "Unfamiliar Terminology",
    description:
      "Seed phrases, gas fees, tokens, and blockchain terminology often create confusion before users can begin.",
  },
  {
    title: "Fear of Making Mistakes",
    description:
      "New users may worry about losing assets, choosing the wrong network, or interacting with unfamiliar applications.",
  },
  {
    title: "Disconnected Experiences",
    description:
      "Games, communities, marketplaces, and wallets frequently exist as separate products with fragmented user journeys.",
  },
];

export function ProblemCard() {
  return (
    <article className="relative overflow-hidden rounded-[clamp(1rem,1.8vw,1.45rem)] border border-[#dfc9b7] bg-[#fff8f2] p-[clamp(1rem,2vw,1.7rem)] shadow-[0_1.2rem_4rem_rgba(87,49,30,0.08)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-[-5rem] size-[14rem] rounded-full bg-[#f5cfc1]/35 blur-[4rem]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.12em] text-[#a2634e]">
              The Challenge
            </p>

            <h3 className="mt-3 max-w-[34rem] text-[clamp(1.55rem,2.6vw,2.35rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#3c241c]">
              Web3 still feels difficult and intimidating for many newcomers.
            </h3>
          </div>

          <span className="flex size-[clamp(3rem,4.5vw,3.8rem)] shrink-0 items-center justify-center rounded-[clamp(0.75rem,1.2vw,1rem)] border border-[#dda998]/35 bg-[#f9e0d6] text-[clamp(1.2rem,1.8vw,1.55rem)]">
            !
          </span>
        </div>

        <p className="mt-[clamp(0.8rem,1.4vw,1.1rem)] max-w-[42rem] text-[clamp(0.9rem,1.02vw,1.08rem)] leading-[1.75] text-[#75594d]">
          Many people are interested in Web3, but the first step often feels
          too technical. Instead of exploring the ecosystem, they stop before
          reaching a product they can genuinely enjoy.
        </p>

        <div className="mt-[clamp(1rem,1.8vw,1.4rem)] grid gap-[clamp(0.65rem,1.1vw,0.85rem)] sm:grid-cols-2">
          {web3Barriers.map((barrier, index) => (
            <section
              key={barrier.title}
              className="rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-[#ead7ca] bg-white/75 p-[clamp(0.75rem,1.2vw,0.95rem)]"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-[clamp(2rem,3vw,2.45rem)] shrink-0 items-center justify-center rounded-full bg-[#f4ddd3] text-[clamp(0.72rem,0.9vw,0.84rem)] font-black text-[#a05f49]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h4 className="text-[clamp(0.95rem,1.08vw,1.15rem)] font-black text-[#432b22]">
                    {barrier.title}
                  </h4>

                  <p className="mt-2 text-[clamp(0.8rem,0.92vw,0.98rem)] leading-[1.6] text-[#796055]">
                    {barrier.description}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-[clamp(1rem,1.7vw,1.3rem)] rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-[#dcbcac] bg-[#f8e9e1] px-[clamp(0.8rem,1.4vw,1.1rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
          <p className="text-[clamp(0.86rem,0.98vw,1.04rem)] font-bold leading-[1.65] text-[#794d3e]">
            The result: potential users never reach the point where Web3 can
            provide meaningful value.
          </p>
        </div>
      </div>
    </article>
  );
}