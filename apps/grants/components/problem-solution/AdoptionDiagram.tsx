const traditionalFlow = [
  "User",
  "Wallet Setup",
  "Blockchain Knowledge",
  "Application",
];

const lifetopiaFlow = [
  "User",
  "Game + Community + Marketplace",
  "Natural Wallet Interaction",
  "Solana Ecosystem",
];

export function AdoptionDiagram() {
  return (
    <section className="overflow-hidden rounded-[clamp(1rem,1.8vw,1.45rem)] border border-[#d8c9aa] bg-white shadow-[0_1.2rem_4rem_rgba(62,47,27,0.07)]">
      <div className="border-b border-[#eadfc8] bg-[#faf6ed] px-[clamp(1rem,1.8vw,1.5rem)] py-[clamp(0.8rem,1.3vw,1rem)]">
        <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#668255]">
          Adoption Journey
        </p>

        <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em] text-[#2f2118]">
          A more natural path into Web3
        </h3>

        <p className="mt-3 max-w-[46rem] text-[clamp(0.9rem,1vw,1.06rem)] leading-[1.7] text-[#706452]">
          Lifetopia reverses the usual onboarding flow by starting with familiar
          experiences before introducing blockchain interaction.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <article className="border-b border-[#eadfc8] p-[clamp(1rem,1.8vw,1.5rem)] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#9d6957]">
                Traditional Web3
              </p>

              <h4 className="mt-2 text-[clamp(1.15rem,1.55vw,1.45rem)] font-black text-[#3b281f]">
                Technology first
              </h4>
            </div>

            <span className="rounded-full border border-[#e4c7ba] bg-[#fff0e9] px-3 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#9b5f49]">
              Higher friction
            </span>
          </div>

          <div className="mt-[clamp(1rem,1.8vw,1.4rem)] flex flex-col items-center">
            {traditionalFlow.map((step, index) => (
              <div
                key={step}
                className="flex w-full flex-col items-center"
              >
                <div className="w-full rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#ead4c8] bg-[#fff8f3] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-center">
                  <p className="text-[clamp(0.88rem,0.98vw,1.04rem)] font-black text-[#4a3127]">
                    {step}
                  </p>
                </div>

                {index < traditionalFlow.length - 1 ? (
                  <span className="my-2 text-[clamp(1rem,1.4vw,1.25rem)] font-black text-[#c4937e]">
                    ↓
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-[clamp(0.9rem,1.5vw,1.2rem)] rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#ecd3c7] bg-[#fff2ec] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-semibold leading-[1.65] text-[#805647]">
            Users must understand the technology before reaching the experience.
          </p>
        </article>

        <article className="p-[clamp(1rem,1.8vw,1.5rem)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#5c8449]">
                Lifetopia World
              </p>

              <h4 className="mt-2 text-[clamp(1.15rem,1.55vw,1.45rem)] font-black text-[#283820]">
                Experience first
              </h4>
            </div>

            <span className="rounded-full border border-[#bfd8ae] bg-[#edf7e6] px-3 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#4f7d3b]">
              Lower friction
            </span>
          </div>

          <div className="mt-[clamp(1rem,1.8vw,1.4rem)] flex flex-col items-center">
            {lifetopiaFlow.map((step, index) => (
              <div
                key={step}
                className="flex w-full flex-col items-center"
              >
                <div className="w-full rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#cfe0c3] bg-[#f5faf1] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-center">
                  <p className="text-[clamp(0.88rem,0.98vw,1.04rem)] font-black text-[#334d29]">
                    {step}
                  </p>
                </div>

                {index < lifetopiaFlow.length - 1 ? (
                  <span className="my-2 text-[clamp(1rem,1.4vw,1.25rem)] font-black text-[#76aa5e]">
                    ↓
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-[clamp(0.9rem,1.5vw,1.2rem)] rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#c9dfbb] bg-[#edf7e6] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-semibold leading-[1.65] text-[#587348]">
            Users discover Web3 naturally while enjoying products they already
            understand.
          </p>
        </article>
      </div>
    </section>
  );
}