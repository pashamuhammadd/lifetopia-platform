import { grantMilestones } from "@/data/grants";

export function GrantRequestSection() {
  return (
    <section className="px-[clamp(1rem,5vw,5rem)] py-[clamp(2.8rem,6vw,4.8rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-[clamp(1.2rem,2.8vw,2.2rem)]">
        <div>
          <span className="lt-grants-badge">Grant Request</span>
          <h2 className="mt-4 text-[clamp(1.8rem,4.5vw,3.7rem)] font-black leading-[1] tracking-[-0.045em] text-[#2f1b12]">
            $10,000 for Lifetopia World Beta completion.
          </h2>
          <p className="mt-4 max-w-3xl text-[clamp(0.9rem,1.2vw,1.08rem)] leading-[1.8] text-[#7a5635]">
            The grant will fund a milestone-based delivery plan focused on
            community platform hardening, Solana identity, game-account
            integration, and public beta onboarding.
          </p>
        </div>

        <div className="grid gap-[clamp(0.85rem,1.8vw,1.2rem)] lg:grid-cols-3">
          {grantMilestones.map((milestone) => (
            <article
              key={milestone.title}
              className="lt-grants-card rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,2vw,1.4rem)]"
            >
              <p className="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#4f8124]">
                {milestone.amount}
              </p>
              <h3 className="mt-3 text-[clamp(1rem,1.5vw,1.25rem)] font-black leading-tight text-[#2f1b12]">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm font-bold text-[#7a5635]">
                {milestone.duration}
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {milestone.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[0.9rem] bg-[#fff8e8] px-3 py-2 text-sm font-bold leading-snug text-[#7a5635]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}