import { TechnologyIcon } from "@/components/TechnologyIcon";

type ImpactAccent = "green" | "blue" | "purple" | "gold";

type ImpactTarget = {
  value: string;
  label: string;
  description: string;
  icon: string;
  accent: ImpactAccent;
  position: string;
};

const impactTargets: ImpactTarget[] = [
  {
    value: "100+",
    label: "Beta Participants",
    description: "Players joining the public Beta ecosystem.",
    icon: "mdi:account-multiple-outline",
    accent: "green",
    position: "lg:left-0 lg:top-0",
  },
  {
    value: "50+",
    label: "Active Testers",
    description: "Participants providing meaningful product feedback.",
    icon: "mdi:test-tube",
    accent: "blue",
    position: "lg:right-0 lg:top-0",
  },
  {
    value: "50+",
    label: "Connected Wallets",
    description: "Players introduced to Solana through useful features.",
    icon: "mdi:wallet-outline",
    accent: "purple",
    position: "lg:bottom-0 lg:left-0",
  },
  {
    value: "500+",
    label: "Devnet Interactions",
    description: "Verifiable ecosystem activity during Beta testing.",
    icon: "mdi:lightning-bolt-outline",
    accent: "gold",
    position: "lg:bottom-0 lg:right-0",
  },
];

function getTargetClasses(accent: ImpactAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#74afd1]/30 bg-[#f3fafe]",
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      value: "text-[#347ca6]",
      dot: "bg-[#55a9dc]",
      glow: "bg-[#72c5eb]/18",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/30 bg-[#faf8ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      value: "text-[#6d50b4]",
      dot: "bg-[#9177dc]",
      glow: "bg-[#9b7de5]/18",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/35 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#9e741d]",
      value: "text-[#9e741d]",
      dot: "bg-[#e4aa3b]",
      glow: "bg-[#f4c45e]/20",
    };
  }

  return {
    card: "border-[#79ad62]/30 bg-[#f7fcf3]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    value: "text-[#4f8239]",
    dot: "bg-[#68ad4a]",
    glow: "bg-[#9fd969]/20",
  };
}

function ImpactTargetCard({
  target,
}: {
  target: ImpactTarget;
}) {
  const classes = getTargetClasses(target.accent);

  return (
    <article
      className={`group relative z-10 min-w-0 overflow-hidden rounded-[0.9rem] border p-[clamp(0.75rem,1.1vw,0.95rem)] shadow-[0_0.65rem_2rem_rgba(61,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1rem_2.8rem_rgba(61,47,27,0.1)] lg:absolute lg:w-[43%] ${classes.card} ${target.position}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${classes.glow}`}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={`flex size-[clamp(2.55rem,3.5vw,3rem)] shrink-0 items-center justify-center rounded-[0.72rem] border transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${classes.icon}`}
        >
          <TechnologyIcon
            icon={target.icon}
            label={target.label}
          />
        </span>

        <div className="min-w-0">
          <p
            className={`text-[clamp(1.2rem,1.7vw,1.65rem)] font-black leading-none ${classes.value}`}
          >
            {target.value}
          </p>

          <h3 className="mt-1.5 text-[clamp(0.78rem,0.9vw,0.96rem)] font-black leading-[1.2] text-[#30251c]">
            {target.label}
          </h3>
        </div>
      </div>

      <p className="relative mt-2.5 text-[clamp(0.66rem,0.75vw,0.82rem)] font-semibold leading-[1.45] text-[#796e5d]">
        {target.description}
      </p>

      <div className="relative mt-3 flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${classes.dot}`}
        />

        <span className="text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#8f816c]">
          Beta target
        </span>
      </div>
    </article>
  );
}

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-4 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#e8dff7]/45 blur-[7rem]"
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
              Expected Beta Impact
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[16ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Turning delivery into measurable participation.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.55] text-[#706452]">
              The Beta is designed to grow an active player base while
              creating real, reviewable interaction with the Solana
              ecosystem.
            </p>

            <div className="mt-[clamp(0.9rem,1.5vw,1.15rem)] overflow-hidden rounded-[0.92rem] border border-[#244e2e]/15 bg-[#173b21] text-white shadow-[0_0.85rem_2.6rem_rgba(31,64,37,0.14)]">
              <div className="flex items-start gap-3 px-[clamp(0.85rem,1.3vw,1.05rem)] py-[clamp(0.8rem,1.2vw,1rem)]">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.7rem] border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                  <TechnologyIcon
                    icon="mdi:sprout-outline"
                    label="Beta ecosystem growth"
                  />
                </span>

                <div>
                  <p className="text-[0.64rem] font-black uppercase tracking-[0.09em] text-[#a8df8f]">
                    Intended Outcome
                  </p>

                  <p className="mt-1.5 text-[clamp(0.76rem,0.86vw,0.92rem)] font-semibold leading-[1.5] text-white/65">
                    A community that does more than register: players test,
                    connect, interact, and help improve the product.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-white/10">
                {[
                  {
                    label: "Players",
                    value: "Participate",
                  },
                  {
                    label: "Testers",
                    value: "Improve",
                  },
                  {
                    label: "Wallets",
                    value: "Interact",
                  },
                ].map((item) => (
                  <article
                    key={item.label}
                    className="min-w-0 bg-[#102d19] px-2 py-2.5 text-center"
                  >
                    <p className="truncate text-[0.58rem] font-black uppercase tracking-[0.07em] text-white/34">
                      {item.label}
                    </p>

                    <p className="mt-1 truncate text-[clamp(0.68rem,0.78vw,0.84rem)] font-black text-[#afe994]">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-3 text-[clamp(0.66rem,0.75vw,0.82rem)] font-semibold leading-[1.5] text-[#867965]">
              These numbers are delivery targets for the funded Beta period,
              not claims of existing adoption.
            </p>
          </div>

          <div className="relative min-w-0">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:block lg:min-h-[29rem]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 hidden size-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#8fb47a]/40 lg:block"
              />

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 hidden size-[38%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-[#68ad4a]/25 bg-[#dcefd0]/20 lg:block"
              />

              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[22%] hidden h-[56%] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,#9fbd8d,transparent)] lg:block"
              />

              <span
                aria-hidden="true"
                className="absolute left-[22%] top-1/2 hidden h-px w-[56%] -translate-y-1/2 bg-[linear-gradient(to_right,transparent,#9fbd8d,transparent)] lg:block"
              />

              {impactTargets.map((target) => (
                <ImpactTargetCard
                  key={target.label}
                  target={target}
                />
              ))}

              <div className="relative z-20 col-span-full mx-auto hidden size-[clamp(7rem,10vw,8.5rem)] items-center justify-center self-center rounded-full border-[0.32rem] border-white bg-[#173b21] text-center text-white shadow-[0_0_0_0.55rem_rgba(104,173,74,0.12),0_1rem_3rem_rgba(31,64,37,0.22)] lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-[-0.7rem] animate-pulse rounded-full border border-[#75bd59]/25"
                />

                <div>
                  <p className="text-[clamp(0.62rem,0.72vw,0.78rem)] font-black uppercase tracking-[0.09em] text-[#a8df8f]">
                    Lifetopia
                  </p>

                  <p className="mt-1.5 text-[clamp(1.05rem,1.4vw,1.3rem)] font-black leading-none">
                    Beta Impact
                  </p>

                  <p className="mt-1.5 text-[0.62rem] font-semibold text-white/42">
                    Target period
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-2 rounded-[0.78rem] border border-[#d8cbb2] bg-white/65 px-3 py-2.5 lg:hidden">
              <span className="size-2 animate-pulse rounded-full bg-[#68ad4a]" />

              <p className="text-[0.68rem] font-black uppercase tracking-[0.08em] text-[#557f43]">
                Four connected Beta targets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}