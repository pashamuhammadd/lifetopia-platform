import Image from "next/image";
import Link from "next/link";

export function FounderNoteSection() {
  return (
    <section
      id="founder-note"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(2.6rem,4.2vw,3.8rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9rem] top-[-7rem] size-[22rem] rounded-full bg-[#e2f1d7]/60 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-9rem] right-[-8rem] size-[23rem] rounded-full bg-[#e1eef9]/50 blur-[7rem]"
      />

      <div className="grants-container relative">
        <div className="overflow-hidden rounded-[clamp(1rem,1.6vw,1.35rem)] border border-[#23462b]/20 bg-[#173b21] text-white shadow-[0_1.2rem_3.8rem_rgba(31,64,37,0.16)]">
          <div className="grid lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1.38fr)]">
            <aside className="relative overflow-hidden border-b border-white/10 bg-[#102d19] p-[clamp(1rem,2vw,1.5rem)] lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-12 -top-14 size-48 rounded-full bg-[#8edc69]/10 blur-3xl"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                  <div className="relative size-[clamp(5rem,7vw,6.4rem)] shrink-0 overflow-hidden rounded-[clamp(0.9rem,1.3vw,1.15rem)] border-2 border-[#a9df91]/30 bg-[#204b2b] shadow-[0_0.8rem_2rem_rgba(0,0,0,0.18)]">
                    <Image
                      src="/images/team/pasha-muhammad.png"
                      alt="Pasha Muhammad, Founder of Lifetopia World"
                      fill
                      sizes="104px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[clamp(1.05rem,1.35vw,1.3rem)] font-black leading-[1.2] text-white">
                      Pasha Muhammad
                    </p>

                    <p className="mt-1.5 text-[clamp(0.7rem,0.8vw,0.84rem)] font-black uppercase tracking-[0.07em] text-[#a8df8f]">
                      Founder & Project Lead
                    </p>

                    <p className="mt-1 text-[clamp(0.7rem,0.8vw,0.84rem)] text-white/42">
                      Lifetopia World
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[clamp(0.68rem,0.76vw,0.8rem)] font-black uppercase tracking-[0.1em] text-white/38">
                    Founder Background
                  </p>

                  <p className="mt-2 text-[clamp(0.78rem,0.88vw,0.92rem)] leading-[1.6] text-white/62">
                    Founder of Lumix Creative Studio since 2023, based in
                    Cianjur, Indonesia.
                  </p>
                </div>

                <div className="mt-auto grid gap-2 pt-5">
                  <Link
                    href="https://pashamuhammad.me"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#9adf78] px-4 text-[clamp(0.74rem,0.84vw,0.88rem)] font-black text-[#173b21] transition hover:-translate-y-0.5 hover:bg-[#afe994]"
                  >
                    Founder Website
                    <span aria-hidden="true">↗</span>
                  </Link>

                  <Link
                    href="mailto:contact@lifetopiaworld.io"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-4 text-[clamp(0.74rem,0.84vw,0.88rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                  >
                    Contact Founder
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </aside>

            <div className="relative overflow-hidden p-[clamp(1.2rem,2.8vw,2.2rem)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-[-4rem] size-64 rounded-full bg-[#7ac7ef]/10 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3.5 py-1.5 text-[clamp(0.65rem,0.74vw,0.78rem)] font-black uppercase tracking-[0.12em] text-[#afe794]">
                  <span className="size-1.5 rounded-full bg-[#8ee46a]" />
                  Founder Note
                </span>

                <h2 className="mt-3 max-w-[43rem] text-[clamp(1.7rem,2.8vw,2.7rem)] font-black leading-[1.08] tracking-[-0.04em] text-white">
                  Building a world that makes Web3 feel welcoming.
                </h2>

                <blockquote className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[48rem] border-l-2 border-[#8ee46a] pl-4">
                  <p className="text-[clamp(1rem,1.3vw,1.25rem)] font-bold leading-[1.55] text-white/88">
                    “Lifetopia World began with a simple belief: players should
                    be able to discover digital ownership through an experience
                    they genuinely enjoy.”
                  </p>
                </blockquote>

                <div className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[49rem] space-y-3">
                  <p className="text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.68] text-white/66">
                    My goal is not to build a product that feels technical or
                    intimidating. I want Lifetopia World to feel like a warm,
                    social, and accessible place where blockchain supports the
                    experience without becoming the experience itself.
                  </p>

                  <p className="text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.68] text-white/66">
                    We have already invested significant time in turning that
                    idea into a real product foundation. The next stage is about
                    improving quality, connecting the experience, and proving
                    that a small focused team can build something meaningful
                    for players and the Solana ecosystem.
                  </p>
                </div>

                <div className="mt-[clamp(1rem,1.8vw,1.4rem)] flex flex-col gap-3 border-t border-white/10 pt-[clamp(1rem,1.6vw,1.25rem)] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[clamp(0.8rem,0.9vw,0.94rem)] font-black text-white">
                      Pasha Muhammad
                    </p>

                    <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.82rem)] text-white/42">
                      Founder, Lifetopia World
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3.5 py-2 text-[clamp(0.66rem,0.76vw,0.8rem)] font-black text-[#afe794]">
                    Available for reviewer questions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}