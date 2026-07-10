export function GrantHero() {
  return (
    <section className="relative overflow-hidden px-[clamp(1rem,5vw,5rem)] pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(1.4rem,4vw,3rem)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[clamp(18rem,34vw,30rem)] w-[clamp(18rem,34vw,30rem)] rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-24 h-[clamp(18rem,36vw,32rem)] w-[clamp(18rem,36vw,32rem)] rounded-full bg-[#ffd58a]/35 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-[clamp(1.4rem,3vw,2.4rem)]">
        <nav className="flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/65 px-[clamp(0.9rem,2vw,1.4rem)] py-[clamp(0.65rem,1.2vw,0.9rem)] shadow-[0_18px_50px_rgba(74,50,22,0.08)] backdrop-blur-xl">
          <span className="font-black text-[#2f1b12]">
            Lifetopia World
          </span>
          <span className="rounded-full bg-[#edf7df] px-3 py-1 text-xs font-black text-[#4f8124]">
            Grant Portal
          </span>
        </nav>

        <div className="lt-grants-card rounded-[clamp(1.4rem,3vw,2.4rem)] p-[clamp(1.1rem,4vw,3rem)]">
          <div className="flex flex-col gap-[clamp(1rem,2.2vw,1.7rem)]">
            <span className="lt-grants-badge">Grant Reviewer Portal</span>

            <h1 className="max-w-5xl text-[clamp(2.4rem,7vw,6.2rem)] font-black leading-[0.92] tracking-[-0.065em] text-[#2f1b12]">
              Building the cozy social layer for Web3 gaming.
            </h1>

            <p className="max-w-4xl text-[clamp(0.98rem,1.35vw,1.22rem)] leading-[1.8] text-[#7a5635]">
              Lifetopia World is an active cozy fantasy life-sim and social
              sandbox platform powered by Solana, combining player identity,
              community, gameplay, and future on-chain ownership into one
              connected experience.
            </p>

            <div className="flex flex-wrap gap-[clamp(0.6rem,1.2vw,0.9rem)]">
              {[
                "Live Product",
                "Beta Phase",
                "Playable Game",
                "Community Platform",
                "Previously Funded",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#d9c99f] bg-[#fff8e8] px-[clamp(0.7rem,1.3vw,1rem)] py-[clamp(0.35rem,0.7vw,0.5rem)] text-[clamp(0.68rem,0.9vw,0.82rem)] font-black text-[#7a5635]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-[clamp(0.75rem,1.5vw,1rem)] sm:grid-cols-3">
              <div className="rounded-[clamp(1rem,2vw,1.4rem)] bg-[#2f1b12] p-[clamp(0.9rem,1.8vw,1.2rem)] text-white">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-white/55">
                  Grant Request
                </p>
                <p className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-black">
                  $10,000
                </p>
              </div>

              <div className="rounded-[clamp(1rem,2vw,1.4rem)] bg-[#edf7df] p-[clamp(0.9rem,1.8vw,1.2rem)]">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#4f8124]/70">
                  Timeline
                </p>
                <p className="mt-2 text-[clamp(1.2rem,2.4vw,1.7rem)] font-black text-[#4f8124]">
                  8–12 weeks
                </p>
              </div>

              <div className="rounded-[clamp(1rem,2vw,1.4rem)] bg-[#fff8e8] p-[clamp(0.9rem,1.8vw,1.2rem)]">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#7a5635]/70">
                  Previous Support
                </p>
                <p className="mt-2 text-[clamp(1.2rem,2.4vw,1.7rem)] font-black text-[#2f1b12]">
                  $5,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}