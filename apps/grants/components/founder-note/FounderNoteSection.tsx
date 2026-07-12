import Link from "next/link";

const founderCommitments = [
  {
    number: "01",
    title: "Responsible Delivery",
    description:
      "Grant funding will be used only for the defined Beta milestones, budget categories, and documented project outcomes.",
  },
  {
    number: "02",
    title: "Transparent Reporting",
    description:
      "Development progress, milestone results, challenges, and incomplete targets will be communicated honestly throughout the funding period.",
  },
  {
    number: "03",
    title: "Long-Term Ownership",
    description:
      "Lifetopia World is being developed as a long-term product ecosystem, not as a short-term grant submission or temporary experiment.",
  },
];

export function FounderNoteSection() {
  return (
    <section
      id="founder-note"
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
        <div className="overflow-hidden rounded-[clamp(1.1rem,2vw,1.6rem)] border border-[#203d28]/15 bg-[#173b21] text-white shadow-[0_1.5rem_4.5rem_rgba(31,64,37,0.18)]">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
            <div className="relative overflow-hidden p-[clamp(1.2rem,3vw,2.5rem)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-[#8edc69]/10 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 right-[-3rem] size-64 rounded-full bg-[#7ac7ef]/10 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.13em] text-[#afe794]">
                  <span className="size-2 rounded-full bg-[#8ee46a]" />
                  Founder Statement
                </span>

                <blockquote className="mt-[clamp(1.2rem,2.2vw,1.8rem)] max-w-[50rem]">
                  <p className="text-[clamp(1.45rem,2.8vw,2.55rem)] font-black leading-[1.18] tracking-[-0.035em] text-white">
                    “Lifetopia World is my commitment to building a product
                    where players can discover Web3 through experiences that
                    feel welcoming, useful, and enjoyable.”
                  </p>
                </blockquote>

                <div className="mt-[clamp(1.2rem,2.2vw,1.8rem)] max-w-[48rem] space-y-4">
                  <p className="text-[clamp(0.92rem,1.06vw,1.12rem)] leading-[1.75] text-white/70">
                    The project has grown from an early playable concept into a
                    broader ecosystem consisting of a game, community platform,
                    shared account foundation, and future marketplace.
                  </p>

                  <p className="text-[clamp(0.92rem,1.06vw,1.12rem)] leading-[1.75] text-white/70">
                    This funding request is intended to help the team connect
                    those existing foundations into a stable public Beta. I
                    remain directly accountable for the roadmap, funding
                    communication, milestone coordination, and final reporting.
                  </p>
                </div>

                <div className="mt-[clamp(1.4rem,2.5vw,2rem)] grid gap-3 md:grid-cols-3">
                  {founderCommitments.map((commitment) => (
                    <article
                      key={commitment.number}
                      className="rounded-[clamp(0.75rem,1.2vw,0.95rem)] border border-white/10 bg-white/[0.06] p-[clamp(0.85rem,1.4vw,1.1rem)]"
                    >
                      <span className="font-mono text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#9fe680]">
                        {commitment.number}
                      </span>

                      <h3 className="mt-2 text-[clamp(0.96rem,1.08vw,1.14rem)] font-black text-white">
                        {commitment.title}
                      </h3>

                      <p className="mt-2 text-[clamp(0.78rem,0.88vw,0.94rem)] leading-[1.6] text-white/55">
                        {commitment.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-[#102d19] p-[clamp(1.2rem,3vw,2.2rem)] lg:border-l lg:border-t-0">
              <div className="flex items-center gap-4">
                <span className="flex size-[clamp(3.8rem,6vw,5rem)] shrink-0 items-center justify-center rounded-full border border-[#a2e882]/20 bg-[#a2e882]/10 text-[clamp(1.1rem,1.8vw,1.5rem)] font-black text-[#afe994] shadow-[0_0.8rem_2rem_rgba(0,0,0,0.12)]">
                  PM
                </span>

                <div className="min-w-0">
                  <p className="text-[clamp(1.1rem,1.45vw,1.35rem)] font-black text-white">
                    Pasha Muhammad
                  </p>

                  <p className="mt-1 text-[clamp(0.78rem,0.88vw,0.94rem)] font-bold text-[#a8df8f]">
                    Founder & Product Lead
                  </p>

                  <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] text-white/42">
                    Lifetopia World
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-white/38">
                  Founder Accountability
                </p>

                <div className="mt-3 space-y-2">
                  {[
                    "Grant and milestone communication",
                    "Product scope and delivery coordination",
                    "Public progress reporting",
                    "Final funding and impact report",
                  ].map((responsibility) => (
                    <div
                      key={responsibility}
                      className="flex items-start gap-3 rounded-[0.7rem] border border-white/[0.08] bg-white/[0.045] px-3 py-2.5"
                    >
                      <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-[#8fe16e]" />

                      <p className="text-[clamp(0.78rem,0.88vw,0.94rem)] font-semibold leading-[1.55] text-white/62">
                        {responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href="https://pashamuhammad.me"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] bg-[#9adf78] px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-[#173b21] transition duration-200 hover:-translate-y-0.5 hover:bg-[#afe994]"
                >
                  Review Founder Profile
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link
                  href="mailto:hello@lifetopiaworld.com"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] border border-white/12 bg-white/[0.06] px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  Contact the Founder
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="mt-5 rounded-[0.8rem] border border-[#9be879]/12 bg-[#9be879]/[0.07] px-4 py-3">
                <div className="flex items-start gap-3">
                  <span className="mt-[0.35rem] size-2 shrink-0 rounded-full bg-[#8ee46a]" />

                  <p className="text-[clamp(0.76rem,0.86vw,0.92rem)] font-semibold leading-[1.6] text-white/58">
                    Available for reviewer questions, technical clarification,
                    and additional due-diligence requests.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}