import { TechnologyIcon } from "@/components/TechnologyIcon";

type MilestoneAccent = "green" | "blue" | "purple";

type Milestone = {
  number: string;
  title: string;
  subtitle: string;
  budget: string;
  duration: string;
  icon: string;
  accent: MilestoneAccent;
  deliverables: string[];
};

const milestones: Milestone[] = [
  {
    number: "01",
    title: "Community Platform Completion",
    subtitle: "Complete the shared player and community foundation.",
    budget: "$3,500",
    duration: "3–4 weeks",
    icon: "mdi:account-group-outline",
    accent: "green",
    deliverables: [
      "Shared player identity",
      "Profile and social improvements",
      "Community moderation systems",
    ],
  },
  {
    number: "02",
    title: "Playable Beta Expansion",
    subtitle: "Expand and stabilize the public game experience.",
    budget: "$4,000",
    duration: "3–4 weeks",
    icon: "mdi:gamepad-variant-outline",
    accent: "blue",
    deliverables: [
      "Expanded gameplay systems",
      "Progression and economy improvements",
      "Testing and public Beta preparation",
    ],
  },
  {
    number: "03",
    title: "Connected Solana Ecosystem",
    subtitle: "Connect wallets, ownership, and ecosystem products.",
    budget: "$2,500",
    duration: "2–4 weeks",
    icon: "mdi:link-variant",
    accent: "purple",
    deliverables: [
      "Solana wallet integration",
      "Marketplace foundation",
      "Connected ecosystem verification",
    ],
  },
];

function getMilestoneClasses(accent: MilestoneAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#74afd1]/30 bg-[#f4fbfe]",
      icon: "border-[#71afd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      badge: "border-[#c9e3f1] bg-[#e9f7fd] text-[#347ca6]",
      number: "text-[#3f8db6]",
      dot: "bg-[#55a9dc]",
      glow: "bg-[#72c5eb]/18",
      line: "from-[#68ad4a] via-[#55a9dc] to-[#9277d8]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/30 bg-[#faf8ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      badge: "border-[#d9cff1] bg-[#f2edff] text-[#674aab]",
      number: "text-[#7356ba]",
      dot: "bg-[#9177dc]",
      glow: "bg-[#9b7de5]/18",
      line: "from-[#68ad4a] via-[#55a9dc] to-[#9277d8]",
    };
  }

  return {
    card: "border-[#79ad62]/30 bg-[#f7fcf3]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    badge: "border-[#d1e4c7] bg-[#edf7e7] text-[#477a34]",
    number: "text-[#4f8239]",
    dot: "bg-[#68ad4a]",
    glow: "bg-[#9fd969]/20",
    line: "from-[#68ad4a] via-[#55a9dc] to-[#9277d8]",
  };
}

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const classes = getMilestoneClasses(milestone.accent);

  return (
    <article
      className={`group relative z-10 flex min-w-0 flex-col overflow-hidden rounded-[1rem] border p-[clamp(0.85rem,1.3vw,1.05rem)] shadow-[0_0.75rem_2.4rem_rgba(61,47,27,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_1.2rem_3.2rem_rgba(61,47,27,0.12)] ${classes.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 size-36 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${classes.glow}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`flex size-[clamp(2.7rem,3.8vw,3.2rem)] shrink-0 items-center justify-center rounded-[0.75rem] border transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${classes.icon}`}
        >
          <TechnologyIcon
            icon={milestone.icon}
            label={milestone.title}
          />
        </span>

        <div className="text-right">
          <p
            className={`font-mono text-[clamp(1.05rem,1.4vw,1.35rem)] font-black leading-none ${classes.number}`}
          >
            {milestone.number}
          </p>

          <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#958771]">
            Milestone
          </p>
        </div>
      </div>

      <div className="relative mt-3">
        <h3 className="max-w-[18rem] text-[clamp(0.98rem,1.16vw,1.16rem)] font-black leading-[1.2] text-[#30251c]">
          {milestone.title}
        </h3>

        <p className="mt-1.5 text-[clamp(0.7rem,0.8vw,0.86rem)] font-semibold leading-[1.45] text-[#796e5d]">
          {milestone.subtitle}
        </p>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/70 px-2.5 py-2">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.07em] text-[#958771]">
            Funding
          </p>

          <p className="mt-1 text-[clamp(0.88rem,1vw,1rem)] font-black text-[#2f4f2b]">
            {milestone.budget}
          </p>
        </div>

        <div className="rounded-[0.68rem] border border-[#ded2ba] bg-white/70 px-2.5 py-2">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.07em] text-[#958771]">
            Duration
          </p>

          <p className="mt-1 text-[clamp(0.8rem,0.9vw,0.94rem)] font-black text-[#4f463a]">
            {milestone.duration}
          </p>
        </div>
      </div>

      <div className="relative mt-3 border-t border-[#ded2ba]/80 pt-3">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.08em] text-[#7f725f]">
          Core Deliverables
        </p>

        <div className="mt-2 grid gap-1.5">
          {milestone.deliverables.map((deliverable) => (
            <div
              key={deliverable}
              className="flex items-start gap-2 rounded-[0.58rem] bg-white/55 px-2.5 py-2 transition duration-200 group-hover:bg-white/80"
            >
              <span
                className={`mt-[0.36rem] size-1.5 shrink-0 rounded-full ${classes.dot}`}
              />

              <p className="text-[clamp(0.66rem,0.75vw,0.8rem)] font-semibold leading-[1.35] text-[#6f6454]">
                {deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>

      {index < milestones.length - 1 ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-[2.45rem] left-1/2 z-20 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#f6efe1] bg-[#173b21] text-[0.7rem] font-black text-white shadow-md lg:-right-[1.45rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
        >
          →
        </span>
      ) : null}
    </article>
  );
}

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#e9dff7]/50 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,rgba(122,175,91,0.12),transparent)]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[17%] -left-[10%] h-[30%] w-[65%] rounded-[50%] bg-[#a5cb84]/14"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[20%] right-[-12%] h-[34%] w-[72%] rounded-[50%] bg-[#75ad72]/11"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.12]" />

      <div className="grants-container relative">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Beta Delivery Roadmap
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[19ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Three milestones from foundation to connected Beta.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[43rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.55] text-[#706452]">
              The grant is divided into clear delivery stages with defined
              funding, duration, and reviewer-verifiable outcomes.
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 lg:w-auto lg:min-w-[23rem]">
            {[
              {
                label: "Request",
                value: "$10,000",
              },
              {
                label: "Timeline",
                value: "8–12 weeks",
              },
              {
                label: "Milestones",
                value: "3",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-[0.75rem] border border-[#d8cbb2] bg-white/68 px-3 py-2.5 text-center shadow-[0_0.5rem_1.6rem_rgba(61,47,27,0.045)] backdrop-blur"
              >
                <p className="text-[0.6rem] font-black uppercase tracking-[0.07em] text-[#958771]">
                  {item.label}
                </p>

                <p className="mt-1 text-[clamp(0.78rem,0.94vw,1rem)] font-black text-[#395d34]">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </header>

        <div className="relative mt-[clamp(1.25rem,2.2vw,1.8rem)]">
          <div
            aria-hidden="true"
            className="absolute bottom-[2.75rem] left-1/2 top-[2.75rem] w-[0.16rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#68ad4a] via-[#55a9dc] to-[#9277d8] opacity-45 lg:bottom-auto lg:left-[8%] lg:right-[8%] lg:top-1/2 lg:h-[0.16rem] lg:w-auto lg:-translate-y-1/2 lg:translate-x-0 lg:bg-gradient-to-r"
          />

          <div className="relative grid gap-[3rem] lg:grid-cols-3 lg:gap-[clamp(1rem,1.7vw,1.4rem)]">
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={milestone.number}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </div>

        <footer className="mt-[clamp(1rem,1.7vw,1.3rem)] overflow-hidden rounded-[0.9rem] border border-[#244e2e]/15 bg-[#173b21] text-white shadow-[0_0.9rem_2.8rem_rgba(31,64,37,0.15)]">
          <div className="grid gap-px bg-white/10 sm:grid-cols-[1fr_auto_1fr]">
            <div className="bg-[#173b21] px-4 py-3">
              <p className="text-[0.64rem] font-black uppercase tracking-[0.08em] text-[#a8df8f]">
                Delivery Method
              </p>

              <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold leading-[1.45] text-white/62">
                Each milestone produces inspectable product and repository
                evidence.
              </p>
            </div>

            <div className="hidden items-center justify-center bg-[#102d19] px-5 sm:flex">
              <span className="flex size-10 items-center justify-center rounded-full border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                <TechnologyIcon
                  icon="mdi:flag-checkered"
                  label="Beta delivery"
                />
              </span>
            </div>

            <div className="bg-[#173b21] px-4 py-3 sm:text-right">
              <p className="text-[0.64rem] font-black uppercase tracking-[0.08em] text-[#a8df8f]">
                Final Outcome
              </p>

              <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.88rem)] font-semibold leading-[1.45] text-white/62">
                A more complete, connected, and reviewable Lifetopia Beta.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}