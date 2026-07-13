import { TechnologyIcon } from "@/components/TechnologyIcon";

type ReasonAccent = "green" | "blue" | "purple" | "gold";

type SupportReason = {
  number: string;
  title: string;
  description: string;
  icon: string;
  accent: ReasonAccent;
};

const supportReasons: SupportReason[] = [
  {
    number: "01",
    title: "Built, not conceptual",
    description:
      "Reviewers can already inspect Lifetopia’s website, community platform, playable Alpha, and public repository.",
    icon: "mdi:cube-scan",
    accent: "green",
  },
  {
    number: "02",
    title: "The next step is clear",
    description:
      "Funding is focused on connecting working foundations into a stable and publicly reviewable Beta.",
    icon: "mdi:map-marker-path",
    accent: "blue",
  },
  {
    number: "03",
    title: "Delivery has ownership",
    description:
      "Product, game, blockchain, and art responsibilities are assigned to specific members of the team.",
    icon: "mdi:account-check-outline",
    accent: "purple",
  },
  {
    number: "04",
    title: "Solana enters through utility",
    description:
      "Wallets and ownership are introduced through gameplay and community value instead of technical friction.",
    icon: "mdi:link-variant",
    accent: "gold",
  },
];

function getReasonClasses(accent: ReasonAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#74afd1]/30 bg-[#f3fafe]",
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      number: "text-[#347ca6]",
      dot: "bg-[#55a9dc]",
      glow: "bg-[#72c5eb]/18",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/30 bg-[#faf8ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      number: "text-[#6d50b4]",
      dot: "bg-[#9177dc]",
      glow: "bg-[#9b7de5]/18",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/35 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#9e741d]",
      number: "text-[#9e741d]",
      dot: "bg-[#e4aa3b]",
      glow: "bg-[#f4c45e]/20",
    };
  }

  return {
    card: "border-[#79ad62]/30 bg-[#f7fcf3]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    number: "text-[#4f8239]",
    dot: "bg-[#68ad4a]",
    glow: "bg-[#9fd969]/20",
  };
}

function SupportReasonCard({
  reason,
}: {
  reason: SupportReason;
}) {
  const classes = getReasonClasses(reason.accent);

  return (
    <article
      className={`group relative min-w-0 overflow-hidden rounded-[0.95rem] border p-[clamp(0.8rem,1.2vw,1rem)] shadow-[0_0.7rem_2.2rem_rgba(61,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1rem_2.8rem_rgba(61,47,27,0.1)] ${classes.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 size-32 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${classes.glow}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`flex size-[clamp(2.55rem,3.5vw,3rem)] shrink-0 items-center justify-center rounded-[0.72rem] border transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${classes.icon}`}
        >
          <TechnologyIcon
            icon={reason.icon}
            label={reason.title}
          />
        </span>

        <span
          className={`font-mono text-[clamp(0.9rem,1.1vw,1.1rem)] font-black ${classes.number}`}
        >
          {reason.number}
        </span>
      </div>

      <h3 className="relative mt-3 text-[clamp(0.88rem,1vw,1.06rem)] font-black leading-[1.2] text-[#30251c]">
        {reason.title}
      </h3>

      <p className="relative mt-1.5 text-[clamp(0.68rem,0.77vw,0.84rem)] font-semibold leading-[1.5] text-[#786d5c]">
        {reason.description}
      </p>

      <div className="relative mt-3 flex items-center gap-2 border-t border-[#ded2ba]/70 pt-2.5">
        <span
          className={`size-2 rounded-full ${classes.dot}`}
        />

        <span className="text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#8d806b]">
          Funding rationale
        </span>
      </div>
    </article>
  );
}

export function WhySupportSection() {
  return (
    <section
      id="why-support"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#e7dff6]/45 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,rgba(119,174,88,0.11),transparent)]"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.12]" />

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.25rem,2.5vw,2rem)] lg:grid-cols-[minmax(16rem,0.66fr)_minmax(0,1.34fr)] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Why Support Now
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[15ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Funding bridges proof into a connected Beta.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.55] text-[#706452]">
              Lifetopia is no longer proving whether the idea can exist.
              The current opportunity is to connect, stabilize, and expand
              what has already been built.
            </p>

            <div className="mt-[clamp(1rem,1.6vw,1.25rem)] overflow-hidden rounded-[0.95rem] border border-[#244e2e]/15 bg-[#173b21] text-white shadow-[0_0.9rem_2.8rem_rgba(31,64,37,0.15)]">
              <div className="grid gap-px bg-white/10 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
                <div className="bg-[#173b21] px-3 py-3.5 text-center">
                  <span className="mx-auto flex size-10 items-center justify-center rounded-[0.7rem] border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                    <TechnologyIcon
                      icon="mdi:cube-outline"
                      label="Working products"
                    />
                  </span>

                  <p className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-white/38">
                    Existing
                  </p>

                  <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-white">
                    Working Products
                  </p>
                </div>

                <div className="hidden items-center justify-center bg-[#102d19] px-2 sm:flex">
                  <span className="text-[1rem] font-black text-[#afe994]">
                    →
                  </span>
                </div>

                <div className="bg-[#102d19] px-3 py-3.5 text-center">
                  <span className="mx-auto flex size-10 items-center justify-center rounded-[0.7rem] border border-[#f2c866]/15 bg-[#f2c866]/10 text-[#ffd478]">
                    <TechnologyIcon
                      icon="mdi:hand-coin-outline"
                      label="Grant support"
                    />
                  </span>

                  <p className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-white/38">
                    Requested
                  </p>

                  <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-white">
                    Grant Support
                  </p>
                </div>

                <div className="hidden items-center justify-center bg-[#102d19] px-2 sm:flex">
                  <span className="text-[1rem] font-black text-[#afe994]">
                    →
                  </span>
                </div>

                <div className="bg-[#173b21] px-3 py-3.5 text-center">
                  <span className="mx-auto flex size-10 items-center justify-center rounded-[0.7rem] border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                    <TechnologyIcon
                      icon="mdi:check-decagram-outline"
                      label="Connected Beta"
                    />
                  </span>

                  <p className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-white/38">
                    Outcome
                  </p>

                  <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black text-white">
                    Connected Beta
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#0f2917] px-4 py-3">
                <p className="text-center text-[clamp(0.7rem,0.8vw,0.86rem)] font-semibold leading-[1.5] text-white/58">
                  Support accelerates integration and public readiness rather
                  than financing an untested concept.
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute bottom-[10%] left-1/2 top-[10%] hidden w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,#a6c395,transparent)] sm:block"
            />

            <div
              aria-hidden="true"
              className="absolute left-[8%] right-[8%] top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(to_right,transparent,#a6c395,transparent)] sm:block"
            />

            <div className="relative grid gap-2.5 sm:grid-cols-2">
              {supportReasons.map((reason) => (
                <SupportReasonCard
                  key={reason.number}
                  reason={reason}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}