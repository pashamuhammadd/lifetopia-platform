import Link from "next/link";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type SupportReason = {
  number: string;
  title: string;
  description: string;
  evidence: string;
  icon: string;
  accent: "green" | "blue" | "purple" | "gold";
};

const supportReasons: SupportReason[] = [
  {
    number: "01",
    title: "The project is already executable",
    description:
      "Lifetopia World is not requesting funding to validate an initial idea. The project already has a public website, a working community platform, a playable game foundation, and shared technical infrastructure.",
    evidence:
      "Reviewers can inspect the products, source repository, and public development records directly.",
    icon: "mdi:rocket-launch-outline",
    accent: "green",
  },
  {
    number: "02",
    title: "The next challenge is integration",
    description:
      "The major opportunity now is to connect the existing game, community platform, marketplace foundation, and Solana infrastructure into one consistent player experience.",
    evidence:
      "Funding helps move the project from separate working foundations into a cohesive public Beta ecosystem.",
    icon: "mdi:link-variant",
    accent: "blue",
  },
  {
    number: "03",
    title: "The funding request has defined boundaries",
    description:
      "The requested capital is assigned to a limited delivery window, three sequential milestones, and clearly defined cost categories rather than unrestricted long-term operations.",
    evidence:
      "The roadmap, allocation, deliverables, and expected outcomes are documented inside this portal.",
    icon: "mdi:target-arrow",
    accent: "gold",
  },
  {
    number: "04",
    title: "Progress remains reviewable",
    description:
      "Development activity, milestone delivery, Beta participation, testing results, and Solana interactions will remain measurable throughout the funding period.",
    evidence:
      "Results that are not achieved will remain identified as incomplete rather than being presented as completed impact.",
    icon: "mdi:shield-check-outline",
    accent: "purple",
  },
];

const readinessSignals = [
  {
    label: "Products",
    value: "Publicly inspectable",
  },
  {
    label: "Development",
    value: "Actively progressing",
  },
  {
    label: "Funding",
    value: "Fully allocated",
  },
  {
    label: "Delivery",
    value: "Milestone based",
  },
];

function getAccentClasses(
  accent: SupportReason["accent"],
) {
  if (accent === "blue") {
    return {
      card: "border-[#72add0]/25 bg-[#f2f9fd]",
      icon: "border-[#5fa7d2]/20 bg-[#e4f4fc] text-[#347ca6]",
      number: "text-[#347ca6]",
      evidence:
        "border-[#cce3f0] bg-[#eaf6fc] text-[#397a9d]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/30 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#a6781c]",
      number: "text-[#9a711e]",
      evidence:
        "border-[#ead7a5] bg-[#fff5dc] text-[#8e6a22]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b83db]/25 bg-[#f8f5ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6f51b6]",
      number: "text-[#694cad]",
      evidence:
        "border-[#dad0f1] bg-[#f2edff] text-[#674aab]",
    };
  }

  return {
    card: "border-[#79ad62]/25 bg-[#f5faf1]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    number: "text-[#477b34]",
    evidence:
      "border-[#d1e4c7] bg-[#edf7e7] text-[#477a34]",
  };
}

export function WhySupportSection() {
  return (
    <section
      id="why-support"
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
        <header className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)] lg:items-end">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-4 py-2 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.14em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Why Support Lifetopia Now
            </span>

            <h2 className="mt-[clamp(1rem,1.8vw,1.4rem)] max-w-[52rem] text-[clamp(2rem,4.2vw,3.9rem)] font-black leading-[1.03] tracking-[-0.045em] text-[#2f2118]">
              Funding unlocks integration and public delivery—not initial
              experimentation.
            </h2>

            <p className="mt-[clamp(0.9rem,1.6vw,1.2rem)] max-w-[47rem] text-[clamp(0.98rem,1.16vw,1.14rem)] leading-[1.75] text-[#706452]">
              Lifetopia has reached the stage where its existing products and
              technical foundations need to become one stable, connected
              experience. This grant would accelerate that transition through a
              defined and reviewable delivery plan.
            </p>
          </div>

          <aside className="rounded-[clamp(1rem,1.6vw,1.25rem)] border border-[#203d28]/15 bg-[#173b21] p-[clamp(1rem,1.6vw,1.25rem)] text-white shadow-[0_1rem_3rem_rgba(31,64,37,0.16)]">
            <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
              Funding Position
            </p>

            <h3 className="mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-black leading-[1.25]">
              The project has passed concept validation and entered execution.
            </h3>

            <p className="mt-3 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-white/62">
              The requested funding is intended to increase delivery capacity,
              improve stability, and complete ecosystem integration.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {readinessSignals.map((signal) => (
                <article
                  key={signal.label}
                  className="rounded-[clamp(0.6rem,0.95vw,0.78rem)] border border-white/10 bg-white/[0.06] px-3 py-3"
                >
                  <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#afe794]">
                    {signal.label}
                  </p>

                  <p className="mt-1.5 text-[clamp(0.66rem,0.76vw,0.82rem)] leading-[1.5] text-white/48">
                    {signal.value}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(2rem,4vw,3.2rem)] grid gap-[clamp(0.8rem,1.5vw,1.1rem)] lg:grid-cols-2">
          {supportReasons.map((reason) => {
            const accent = getAccentClasses(
              reason.accent,
            );

            return (
              <article
                key={reason.number}
                className={`min-w-0 rounded-[clamp(1rem,1.6vw,1.3rem)] border p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_0.9rem_3rem_rgba(62,47,27,0.07)] ${accent.card}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex size-[clamp(2.9rem,4.5vw,3.6rem)] shrink-0 items-center justify-center rounded-[clamp(0.7rem,1.1vw,0.9rem)] border ${accent.icon}`}
                  >
                    <TechnologyIcon
                      icon={reason.icon}
                      label={reason.title}
                    />
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`font-mono text-[clamp(0.7rem,0.8vw,0.86rem)] font-black ${accent.number}`}
                    >
                      REASON {reason.number}
                    </p>

                    <h3 className="mt-2 text-[clamp(1.15rem,1.55vw,1.5rem)] font-black leading-[1.25] tracking-[-0.025em] text-[#30251c]">
                      {reason.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-[clamp(0.88rem,0.98vw,1.04rem)] leading-[1.7] text-[#706452]">
                  {reason.description}
                </p>

                <div
                  className={`mt-4 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.75rem,1.2vw,0.95rem)] ${accent.evidence}`}
                >
                  <p className="text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.08em] opacity-70">
                    Reviewer Evidence
                  </p>

                  <p className="mt-1.5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold leading-[1.6]">
                    {reason.evidence}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-[clamp(1rem,2vw,1.5rem)] overflow-hidden rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#203d28]/15 bg-[#173b21] text-white shadow-[0_1.2rem_3.5rem_rgba(31,64,37,0.16)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
            <div className="p-[clamp(1rem,2vw,1.7rem)]">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#a8df8f]">
                Reviewer Summary
              </p>

              <h3 className="mt-2 max-w-[46rem] text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em]">
                Lifetopia is seeking support at the point where funding can
                convert proven foundations into a connected public product.
              </h3>

              <p className="mt-3 max-w-[48rem] text-[clamp(0.88rem,0.98vw,1.04rem)] leading-[1.7] text-white/65">
                The project already demonstrates execution capability. The
                funding decision is therefore centered on accelerating
                integration, stability, testing, and measurable ecosystem
                adoption.
              </p>
            </div>

            <div className="border-t border-white/10 bg-[#102d19] p-[clamp(1rem,2vw,1.7rem)] lg:border-l lg:border-t-0">
              <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-white/38">
                Continue Review
              </p>

              <div className="mt-4 grid gap-3">
                <Link
                  href="#documents"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] bg-[#9adf78] px-5 text-[clamp(0.78rem,0.88vw,0.94rem)] font-black text-[#173b21] transition hover:-translate-y-0.5 hover:bg-[#afe994]"
                >
                  Review Documents
                  <span aria-hidden="true">↓</span>
                </Link>

                <Link
                  href="#team"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] border border-white/12 bg-white/[0.06] px-5 text-[clamp(0.78rem,0.88vw,0.94rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  Review Core Team
                  <span aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}