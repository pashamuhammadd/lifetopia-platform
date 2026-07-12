import Link from "next/link";

const grantHighlights = [
  {
    label: "Grant Request",
    value: "$10,000",
  },
  {
    label: "Delivery Period",
    value: "8–12 Weeks",
  },
  {
    label: "Milestones",
    value: "3",
  },
];

const fundingOutcomes = [
  "Complete the Lifetopia community platform",
  "Expand the playable Beta experience",
  "Connect game identity with Solana infrastructure",
  "Prepare public testing and measurable onboarding",
];

export function GrantRequestSection() {
  return (
    <section
      id="grant-request"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(4rem,8vw,7rem)]"
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
        <div className="overflow-hidden rounded-[clamp(1.1rem,2vw,1.6rem)] border border-[#203d28]/15 bg-[#173b21] text-white shadow-[0_1.8rem_5rem_rgba(27,62,34,0.18)]">
          <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)]">
            <div className="p-[clamp(1.3rem,3vw,2.7rem)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#b6e5a1]">
                <span className="size-2 rounded-full bg-[#88df65]" />
                Grant Request
              </span>

              <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[48rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em]">
                $10,000 to complete the connected Lifetopia World Beta.
              </h2>

              <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[44rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-white/68">
                Lifetopia World has already completed its MVP and Alpha phases.
                This grant will accelerate the next step: delivering a stable,
                connected, and publicly testable Beta experience.
              </p>

              <div className="mt-[clamp(1.2rem,2vw,1.6rem)] grid grid-cols-3 overflow-hidden rounded-[clamp(0.8rem,1.3vw,1rem)] border border-white/10 bg-black/10">
                {grantHighlights.map((item, index) => (
                  <article
                    key={item.label}
                    className={[
                      "min-w-0 px-[clamp(0.55rem,1vw,0.8rem)] py-[clamp(0.7rem,1.2vw,0.95rem)] text-center",
                      index !== 0 ? "border-l border-white/10" : "",
                    ].join(" ")}
                  >
                    <p className="truncate text-[clamp(0.66rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-white/42">
                      {item.label}
                    </p>

                    <p className="mt-2 truncate text-[clamp(1rem,1.4vw,1.28rem)] font-black text-[#a7ed88]">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-[clamp(1.2rem,2vw,1.6rem)] flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#documents"
                  className="inline-flex items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] bg-[#98e774] px-[clamp(1rem,1.8vw,1.4rem)] py-[clamp(0.72rem,1.1vw,0.92rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-[#17321d] shadow-[0_0.8rem_2rem_rgba(152,231,116,0.16)] transition hover:-translate-y-0.5 hover:bg-[#adef91]"
                >
                  Review Grant Documents
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="mailto:hello@lifetopiaworld.com"
                  className="inline-flex items-center justify-center gap-2 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/15 bg-white/[0.06] px-[clamp(1rem,1.8vw,1.4rem)] py-[clamp(0.72rem,1.1vw,0.92rem)] text-[clamp(0.82rem,0.92vw,0.98rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  Contact the Founder
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-[#102d19] p-[clamp(1.2rem,2.4vw,2rem)] lg:border-l lg:border-t-0">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.12em] text-[#a9df92]">
                What This Funding Unlocks
              </p>

              <h3 className="mt-3 text-[clamp(1.3rem,2vw,1.85rem)] font-black leading-[1.25]">
                A complete Beta foundation ready for public validation.
              </h3>

              <div className="mt-[clamp(1rem,1.7vw,1.35rem)] space-y-3">
                {fundingOutcomes.map((outcome, index) => (
                  <article
                    key={outcome}
                    className="flex items-start gap-3 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-white/10 bg-white/[0.05] px-[clamp(0.75rem,1.2vw,0.95rem)] py-[clamp(0.7rem,1.1vw,0.88rem)]"
                  >
                    <span className="flex size-[clamp(1.8rem,2.8vw,2.2rem)] shrink-0 items-center justify-center rounded-full bg-[#97e676]/10 text-[clamp(0.72rem,0.9vw,0.84rem)] font-black text-[#a8ec8d]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[clamp(0.84rem,0.94vw,1rem)] font-semibold leading-[1.55] text-white/76">
                      {outcome}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-[clamp(1rem,1.7vw,1.35rem)] rounded-[clamp(0.7rem,1.1vw,0.9rem)] border border-[#9be879]/15 bg-[#9be879]/[0.06] px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.75rem,1.2vw,0.95rem)]">
                <p className="text-[clamp(0.78rem,0.88vw,0.94rem)] leading-[1.65] text-[#b9e8a6]">
                  Delivery progress, development activity, budget usage, and
                  impact metrics will remain publicly documented throughout the
                  grant period.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}