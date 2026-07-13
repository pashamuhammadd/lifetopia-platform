import { TechnologyIcon } from "@/components/TechnologyIcon";

type FlowTone = "challenge" | "lifetopia";

type FlowStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

type FlowLane = {
  label: string;
  title: string;
  description: string;
  tone: FlowTone;
  steps: FlowStep[];
};

const barriers = [
  "Technical onboarding before users see value",
  "Wallets, networks, and products feel disconnected",
  "Fear of mistakes prevents first-time participation",
];

const ecosystemProducts = [
  {
    title: "Game",
    description: "Enjoy the world",
    icon: "mdi:gamepad-variant-outline",
    classes:
      "border-[#77ad61]/25 bg-[#edf7e7] text-[#477a34]",
  },
  {
    title: "Community",
    description: "Build relationships",
    icon: "mdi:account-group-outline",
    classes:
      "border-[#70add0]/25 bg-[#eaf6fc] text-[#347ca6]",
  },
  {
    title: "Marketplace",
    description: "Discover ownership",
    icon: "mdi:storefront-outline",
    classes:
      "border-[#dfb765]/30 bg-[#fff5dc] text-[#946c1c]",
  },
];

const flowLanes: FlowLane[] = [
  {
    label: "Traditional Web3",
    title: "Technology comes first",
    description:
      "New users must understand unfamiliar infrastructure before reaching a useful experience.",
    tone: "challenge",
    steps: [
      {
        number: "01",
        title: "Learn terminology",
        description: "Wallets, networks, fees",
        icon: "mdi:book-open-variant-outline",
      },
      {
        number: "02",
        title: "Configure a wallet",
        description: "Accounts and security",
        icon: "mdi:wallet-outline",
      },
      {
        number: "03",
        title: "Manage transactions",
        description: "Networks and confirmations",
        icon: "mdi:swap-horizontal",
      },
      {
        number: "04",
        title: "Search for value",
        description: "Find a product worth using",
        icon: "mdi:magnify",
      },
    ],
  },
  {
    label: "Lifetopia World",
    title: "The experience comes first",
    description:
      "Players begin with familiar activities and encounter Web3 gradually as part of the ecosystem.",
    tone: "lifetopia",
    steps: [
      {
        number: "01",
        title: "Enjoy the game",
        description: "Explore, farm, and progress",
        icon: "mdi:gamepad-variant-outline",
      },
      {
        number: "02",
        title: "Join the community",
        description: "Create an identity and connect",
        icon: "mdi:account-group-outline",
      },
      {
        number: "03",
        title: "Connect a wallet",
        description: "Introduced when it becomes useful",
        icon: "mdi:wallet-outline",
      },
      {
        number: "04",
        title: "Unlock ownership",
        description: "Participate in the Solana economy",
        icon: "mdi:diamond-stone",
      },
    ],
  },
];

function getFlowClasses(tone: FlowTone) {
  if (tone === "challenge") {
    return {
      panel:
        "border-[#dfc9b8] bg-[linear-gradient(145deg,#fffaf6,#fff4ee)]",
      label:
        "border-[#e4c9bc] bg-[#fff0e9] text-[#9b604a]",
      icon:
        "border-[#e6c9bb] bg-[#f8e1d7] text-[#a2614b]",
      number: "text-[#ae735d]",
      title: "text-[#493128]",
      connector: "bg-[#d9ad9c]",
      dot: "bg-[#c98870]",
      hover:
        "hover:border-[#d7ab98] hover:bg-[#fffaf7]",
    };
  }

  return {
    panel:
      "border-[#bfd7b1] bg-[linear-gradient(145deg,#fbfff8,#eef8e8)]",
    label:
      "border-[#bdd6ae] bg-[#e6f3dc] text-[#477b34]",
    icon:
      "border-[#b7d5a7] bg-[#ddf0d2] text-[#4c8138]",
    number: "text-[#5c9147]",
    title: "text-[#2d4325]",
    connector: "bg-[#9dc488]",
    dot: "bg-[#68ad4a]",
    hover:
      "hover:border-[#8eb878] hover:bg-white",
  };
}

function FlowLaneCard({
  lane,
}: {
  lane: FlowLane;
}) {
  const classes = getFlowClasses(lane.tone);

  return (
    <article
      className={`group/lane min-w-0 rounded-[1rem] border p-[clamp(0.85rem,1.35vw,1.1rem)] shadow-[0_0.7rem_2.4rem_rgba(61,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.1rem_3.2rem_rgba(61,47,27,0.1)] ${classes.panel}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.09em] ${classes.label}`}
          >
            {lane.label}
          </span>

          <h3
            className={`mt-2 text-[clamp(1.05rem,1.3vw,1.3rem)] font-black leading-[1.2] ${classes.title}`}
          >
            {lane.title}
          </h3>
        </div>

        <span
          className={[
            "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[clamp(0.66rem,0.74vw,0.8rem)] font-black",
            lane.tone === "challenge"
              ? "border-[#e5cbbf] bg-white/60 text-[#9e6853]"
              : "border-[#bed8af] bg-white/65 text-[#4b7d38]",
          ].join(" ")}
        >
          <span
            className={`size-2 rounded-full ${classes.dot}`}
          />

          {lane.tone === "challenge"
            ? "Higher friction"
            : "Natural onboarding"}
        </span>
      </div>

      <p className="mt-2 text-[clamp(0.76rem,0.86vw,0.92rem)] leading-[1.5] text-[#74695a]">
        {lane.description}
      </p>

      <div className="relative mt-3">
        <span
          aria-hidden="true"
          className={`absolute bottom-5 left-[1.35rem] top-5 w-[0.12rem] rounded-full ${classes.connector}`}
        />

        <div className="relative grid gap-2">
          {lane.steps.map((step, index) => (
            <div
              key={step.number}
              className={`group/step relative flex items-center gap-3 rounded-[0.78rem] border border-transparent bg-white/55 px-3 py-2.5 transition duration-200 hover:translate-x-1 ${classes.hover}`}
            >
              <span
                className={`relative z-10 flex size-[2.7rem] shrink-0 items-center justify-center rounded-[0.72rem] border transition duration-200 group-hover/step:scale-105 ${classes.icon}`}
              >
                <TechnologyIcon
                  icon={step.icon}
                  label={step.title}
                />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[0.68rem] font-black ${classes.number}`}
                  >
                    {step.number}
                  </span>

                  <h4
                    className={`text-[clamp(0.82rem,0.92vw,0.98rem)] font-black ${classes.title}`}
                  >
                    {step.title}
                  </h4>
                </div>

                <p className="mt-0.5 text-[clamp(0.68rem,0.76vw,0.82rem)] font-semibold text-[#847765]">
                  {step.description}
                </p>
              </div>

              {index === lane.steps.length - 1 ? (
                <span
                  className={[
                    "hidden rounded-full border px-2.5 py-1 text-[0.64rem] font-black sm:block",
                    lane.tone === "challenge"
                      ? "border-[#e8d1c6] bg-[#fff4ee] text-[#a16b56]"
                      : "border-[#c8dfba] bg-[#edf8e7] text-[#4d8039]",
                  ].join(" ")}
                >
                  Outcome
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="relative overflow-hidden bg-[#fff9ef] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#f2ddd2]/45 blur-[6rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,rgba(143,190,113,0.13),transparent)]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[15%] -left-[12%] h-[28%] w-[66%] rounded-[50%] bg-[#a7cc85]/14"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[18%] right-[-10%] h-[32%] w-[70%] rounded-[50%] bg-[#72b26b]/12"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.13]" />

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.2rem,2.5vw,2rem)] lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 rounded-full bg-[#68ad4a]" />
              Problem & Solution
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[16ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              A familiar world first. Web3 follows naturally.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.6] text-[#706452]">
              Most onboarding begins with technology. Lifetopia begins with
              gameplay, identity, friendship, and value people already
              understand.
            </p>

            <div className="mt-[clamp(0.9rem,1.6vw,1.2rem)] rounded-[0.95rem] border border-[#dfc9b7] bg-[#fff7f1]/82 p-[clamp(0.8rem,1.2vw,1rem)] shadow-[0_0.7rem_2.4rem_rgba(87,49,30,0.055)] backdrop-blur">
              <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.09em] text-[#9d6651]">
                Current Friction
              </p>

              <div className="mt-2.5 grid gap-2">
                {barriers.map((barrier, index) => (
                  <div
                    key={barrier}
                    className="group flex items-start gap-3 rounded-[0.7rem] border border-[#ead7ca] bg-white/65 px-3 py-2.5 transition duration-200 hover:translate-x-1 hover:border-[#d9b4a2] hover:bg-white"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3ddd3] font-mono text-[0.64rem] font-black text-[#a3614b]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[clamp(0.74rem,0.84vw,0.9rem)] font-semibold leading-[1.5] text-[#725a50]">
                      {barrier}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.09em] text-[#668255]">
                Lifetopia Entry Points
              </p>

              <div className="mt-2 grid grid-cols-3 gap-2">
                {ecosystemProducts.map((product) => (
                  <article
                    key={product.title}
                    className={`group min-w-0 rounded-[0.75rem] border p-2.5 text-center transition duration-200 hover:-translate-y-1 hover:shadow-[0_0.7rem_1.8rem_rgba(61,47,27,0.08)] ${product.classes}`}
                  >
                    <span className="mx-auto flex size-[2.45rem] items-center justify-center rounded-[0.65rem] bg-white/55 transition duration-200 group-hover:scale-105">
                      <TechnologyIcon
                        icon={product.icon}
                        label={product.title}
                      />
                    </span>

                    <h3 className="mt-2 truncate text-[clamp(0.72rem,0.82vw,0.88rem)] font-black">
                      {product.title}
                    </h3>

                    <p className="mt-0.5 truncate text-[clamp(0.62rem,0.7vw,0.76rem)] font-semibold opacity-70">
                      {product.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-start gap-3 rounded-[0.8rem] border border-[#bdd5ae] bg-[#eaf5e3] px-3.5 py-3">
              <span className="mt-[0.35rem] size-2 shrink-0 animate-pulse rounded-full bg-[#68ad4a]" />

              <p className="text-[clamp(0.76rem,0.86vw,0.92rem)] font-bold leading-[1.5] text-[#4d6d43]">
                Players receive value before being asked to understand the
                underlying infrastructure.
              </p>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.15rem] border border-[#d8c9aa] bg-white/78 p-[clamp(0.75rem,1.3vw,1rem)] shadow-[0_1.2rem_3.8rem_rgba(62,47,27,0.09)] backdrop-blur-md">
            <header className="flex flex-col gap-3 border-b border-[#eadfc8] px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.1em] text-[#668255]">
                  Adoption Experience
                </p>

                <h3 className="mt-1.5 text-[clamp(1.05rem,1.35vw,1.32rem)] font-black text-[#30251c]">
                  Two paths toward Web3 participation
                </h3>
              </div>

              <span className="w-fit rounded-full border border-[#d4dfca] bg-[#f1f7ed] px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#527b43]">
                Experience-first onboarding
              </span>
            </header>

            <div className="mt-3 grid gap-3 xl:grid-cols-2">
              {flowLanes.map((lane) => (
                <FlowLaneCard
                  key={lane.label}
                  lane={lane}
                />
              ))}
            </div>

            <footer className="mt-3 overflow-hidden rounded-[0.85rem] border border-[#1b4627]/15 bg-[#173b21] text-white shadow-[0_0.7rem_2rem_rgba(31,64,37,0.13)]">
              <div className="grid sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
                <div className="flex items-center justify-center border-b border-white/10 bg-[#102d19] px-4 py-3 sm:border-b-0 sm:border-r">
                  <span className="flex size-10 items-center justify-center rounded-[0.7rem] border border-[#9be879]/15 bg-[#9be879]/10 text-[#afe994]">
                    <TechnologyIcon
                      icon="mdi:sprout-outline"
                      label="Natural Web3 adoption"
                    />
                  </span>
                </div>

                <div className="px-4 py-3">
                  <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.09em] text-[#a8df8f]">
                    Lifetopia Principle
                  </p>

                  <p className="mt-1 text-[clamp(0.78rem,0.88vw,0.94rem)] font-semibold leading-[1.5] text-white/68">
                    Build an experience people want first, then introduce
                    wallets and ownership when they become meaningful.
                  </p>
                </div>

                <div className="hidden border-l border-white/10 px-4 py-3 sm:block">
                  <span className="rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[0.7rem] font-black text-[#afe994]">
                    Lower friction
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}