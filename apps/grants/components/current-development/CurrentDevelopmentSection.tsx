import Image from "next/image";

import { TechnologyIcon } from "@/components/TechnologyIcon";

type EcosystemAccent =
  | "green"
  | "blue"
  | "purple"
  | "gold";

type EcosystemNode = {
  title: string;
  detail: string;
  status: string;
  icon: string;
  accent: EcosystemAccent;
};

type TechnologyItem =
  | {
      name: string;
      category: string;
      type: "icon";
      icon: string;
    }
  | {
      name: string;
      category: string;
      type: "image";
      image: string;
    };

const ecosystemNodes: EcosystemNode[] = [
  {
    title: "Playable World",
    detail: "Gameplay and life-simulation foundation",
    status: "Alpha Public",
    icon: "mdi:gamepad-variant-outline",
    accent: "green",
  },
  {
    title: "Community",
    detail: "Profiles, posts, and player interaction",
    status: "Live Beta",
    icon: "mdi:account-group-outline",
    accent: "blue",
  },
  {
    title: "Shared Identity",
    detail: "One player account across products",
    status: "Integrating",
    icon: "mdi:account-key-outline",
    accent: "purple",
  },
  {
    title: "Solana Economy",
    detail: "Wallet, marketplace, and ownership",
    status: "Next",
    icon: "mdi:wallet-outline",
    accent: "gold",
  },
];

const deliveryFocus = [
  {
    number: "01",
    label: "Connect",
    description: "Unify accounts and player identity.",
  },
  {
    number: "02",
    label: "Expand",
    description: "Improve gameplay and community systems.",
  },
  {
    number: "03",
    label: "Integrate",
    description: "Add Solana and marketplace foundations.",
  },
];

const technologies: TechnologyItem[] = [
  {
    name: "Unity",
    category: "Game",
    type: "icon",
    icon: "logos:unity",
  },
  {
    name: "Next.js",
    category: "Platform",
    type: "icon",
    icon: "logos:nextjs-icon",
  },
  {
    name: "Supabase",
    category: "Backend",
    type: "icon",
    icon: "logos:supabase-icon",
  },
  {
    name: "Solana",
    category: "Blockchain",
    type: "image",
    image: "/brand/solana-logo.svg",
  },
  {
    name: "TypeScript",
    category: "Language",
    type: "icon",
    icon: "logos:typescript-icon",
  },
  {
    name: "GitHub",
    category: "Source",
    type: "icon",
    icon: "mdi:github",
  },
];

function getNodeClasses(accent: EcosystemAccent) {
  if (accent === "blue") {
    return {
      card: "border-[#72afd2]/30 bg-[#f1f9fd]",
      icon: "border-[#6badd2]/20 bg-[#e3f3fc] text-[#347ca6]",
      badge: "border-[#c9e3f1] bg-[#e8f6fd] text-[#347ca6]",
      glow: "bg-[#75c7ec]/18",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/30 bg-[#f8f5ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6d50b4]",
      badge: "border-[#dad0f1] bg-[#f1edff] text-[#674aab]",
      glow: "bg-[#9b7de5]/18",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/35 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#9e741d]",
      badge: "border-[#ead7a5] bg-[#fff5dc] text-[#946c1c]",
      glow: "bg-[#f4c45e]/20",
    };
  }

  return {
    card: "border-[#79ad62]/30 bg-[#f4faf0]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    badge: "border-[#d1e4c7] bg-[#edf7e7] text-[#477a34]",
    glow: "bg-[#9fd969]/20",
  };
}

function EcosystemNodeCard({
  node,
}: {
  node: EcosystemNode;
}) {
  const classes = getNodeClasses(node.accent);

  return (
    <article
      className={`group relative z-10 min-w-0 overflow-hidden rounded-[0.9rem] border p-[clamp(0.75rem,1.15vw,0.95rem)] shadow-[0_0.65rem_2rem_rgba(61,47,27,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1rem_2.8rem_rgba(61,47,27,0.1)] ${classes.card}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-3xl ${classes.glow}`}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={`flex size-[clamp(2.5rem,3.7vw,3rem)] shrink-0 items-center justify-center rounded-[0.7rem] border transition duration-200 group-hover:scale-105 ${classes.icon}`}
        >
          <TechnologyIcon
            icon={node.icon}
            label={node.title}
          />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(0.86rem,0.98vw,1.04rem)] font-black leading-[1.2] text-[#30251c]">
            {node.title}
          </h3>

          <p className="mt-1 text-[clamp(0.66rem,0.74vw,0.8rem)] font-semibold leading-[1.4] text-[#7b6f5d]">
            {node.detail}
          </p>
        </div>
      </div>

      <span
        className={`relative mt-3 inline-flex rounded-full border px-2.5 py-1 text-[clamp(0.62rem,0.7vw,0.76rem)] font-black ${classes.badge}`}
      >
        {node.status}
      </span>
    </article>
  );
}

export function CurrentDevelopmentSection() {
  return (
    <section
      id="current-development"
      className="relative overflow-hidden bg-[#f6efe1] py-[clamp(2.25rem,3vw,3rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-8 size-80 rounded-full bg-[#dcefd0]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 size-80 rounded-full bg-[#dceefa]/55 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(to_top,rgba(126,177,94,0.12),transparent)]"
      />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.12]" />

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.2rem,2.5vw,2rem)] lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c7d8b9] bg-[#edf6e6] px-3.5 py-1.5 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#557f43]">
              <span className="size-2 animate-pulse rounded-full bg-[#68ad4a]" />
              Current Development
            </span>

            <h2 className="mt-[clamp(0.7rem,1.2vw,0.95rem)] max-w-[16ch] text-[clamp(1.75rem,3vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#2f2118]">
              Turning working products into one connected Beta.
            </h2>

            <p className="mt-[clamp(0.55rem,1vw,0.8rem)] max-w-[34rem] text-[clamp(0.84rem,0.96vw,1rem)] leading-[1.6] text-[#706452]">
              Lifetopia has already validated its core products. Development
              now focuses on integration, expansion, and public readiness.
            </p>

            <div className="mt-[clamp(0.9rem,1.5vw,1.15rem)] overflow-hidden rounded-[0.95rem] border border-[#254f30]/15 bg-[#173b21] text-white shadow-[0_0.9rem_2.8rem_rgba(31,64,37,0.15)]">
              <div className="flex items-start justify-between gap-4 px-[clamp(0.85rem,1.3vw,1.05rem)] py-[clamp(0.8rem,1.2vw,1rem)]">
                <div>
                  <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.09em] text-[#a8df8f]">
                    Current Project Phase
                  </p>

                  <p className="mt-1.5 text-[clamp(1.55rem,2.2vw,2rem)] font-black leading-none">
                    Beta
                  </p>
                </div>

                <span className="flex items-center gap-2 rounded-full border border-[#9be879]/15 bg-[#9be879]/10 px-3 py-1.5 text-[clamp(0.66rem,0.74vw,0.8rem)] font-black text-[#afe994]">
                  <span className="size-2 rounded-full bg-[#8ee46a]" />
                  Active
                </span>
              </div>

              <div className="border-t border-white/10 bg-[#102d19] px-[clamp(0.85rem,1.3vw,1.05rem)] py-[clamp(0.7rem,1vw,0.85rem)]">
                <p className="text-[clamp(0.74rem,0.84vw,0.9rem)] leading-[1.5] text-white/62">
                  The public game remains the previous Alpha build while the
                  connected Beta is completed.
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              {deliveryFocus.map((item) => (
                <article
                  key={item.number}
                  className="group flex items-center gap-3 rounded-[0.75rem] border border-[#ded2ba] bg-white/68 px-3 py-2.5 transition duration-200 hover:translate-x-1 hover:border-[#9fbe8d] hover:bg-white"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7f3df] font-mono text-[0.64rem] font-black text-[#4f803b]">
                    {item.number}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[clamp(0.76rem,0.86vw,0.92rem)] font-black text-[#3f5636]">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-[clamp(0.66rem,0.74vw,0.8rem)] font-semibold text-[#7e725f]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.15rem] border border-[#d7c8aa] bg-white/76 p-[clamp(0.8rem,1.4vw,1.1rem)] shadow-[0_1.2rem_3.8rem_rgba(62,47,27,0.09)] backdrop-blur-md">
            <header className="flex flex-col gap-3 border-b border-[#eadfc8] px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.1em] text-[#668255]">
                  Connected Ecosystem
                </p>

                <h3 className="mt-1.5 text-[clamp(1.05rem,1.35vw,1.32rem)] font-black text-[#30251c]">
                  Existing foundations converging into one product
                </h3>
              </div>

              <span className="w-fit rounded-full border border-[#c9ddbd] bg-[#edf7e7] px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#4e7e3b]">
                Integration in progress
              </span>
            </header>

            <div className="relative mt-4">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-3 hidden h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,#a8c796_16%,#a8c796_84%,transparent)] sm:block"
              />

              <span
                aria-hidden="true"
                className="absolute left-3 top-1/2 hidden h-px w-[calc(100%-1.5rem)] -translate-y-1/2 bg-[linear-gradient(to_right,transparent,#a8c796_16%,#a8c796_84%,transparent)] sm:block"
              />

              <div className="grid grid-cols-2 gap-[clamp(2.2rem,4vw,3.5rem)]">
                {ecosystemNodes.map((node) => (
                  <EcosystemNodeCard
                    key={node.title}
                    node={node}
                  />
                ))}
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:flex">
                <div className="relative flex size-[clamp(5.2rem,8vw,6.4rem)] items-center justify-center rounded-full border-[0.28rem] border-white bg-[#173b21] text-center text-white shadow-[0_0_0_0.45rem_rgba(104,173,74,0.12),0_1rem_2.5rem_rgba(31,64,37,0.22)]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-[-0.55rem] animate-pulse rounded-full border border-[#75bd59]/25"
                  />

                  <div>
                    <p className="text-[clamp(0.66rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#a8df8f]">
                      Connected
                    </p>

                    <p className="mt-1 text-[clamp(0.95rem,1.2vw,1.12rem)] font-black leading-none">
                      Beta
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-4 overflow-hidden rounded-[0.85rem] border border-[#ded2ba]">
              <div className="flex items-center justify-between gap-4 border-b border-[#e8dcc5] bg-[#faf6ed] px-3 py-2.5">
                <p className="text-[clamp(0.66rem,0.74vw,0.8rem)] font-black uppercase tracking-[0.09em] text-[#668255]">
                  Technical Foundation
                </p>

                <span className="text-[clamp(0.62rem,0.7vw,0.76rem)] font-bold text-[#8a7b64]">
                  Production tools
                </span>
              </div>

              <div className="grid grid-cols-3 gap-px bg-[#e8dcc5] lg:grid-cols-6">
                {technologies.map((technology) => (
                  <article
                    key={technology.name}
                    className="group flex min-w-0 flex-col items-center justify-center bg-white px-2 py-3 text-center transition hover:bg-[#f7fbf4]"
                  >
                    <span className="flex size-[2.45rem] items-center justify-center rounded-[0.65rem] border border-[#ded4c0] bg-[#faf7f0] p-1.5 transition duration-200 group-hover:scale-105">
                      {technology.type === "image" ? (
                        <Image
                          src={technology.image}
                          alt={`${technology.name} logo`}
                          width={32}
                          height={32}
                          className="h-[1.45rem] w-[1.45rem] object-contain"
                        />
                      ) : (
                        <TechnologyIcon
                          icon={technology.icon}
                          label={technology.name}
                        />
                      )}
                    </span>

                    <p className="mt-2 truncate text-[clamp(0.66rem,0.74vw,0.8rem)] font-black text-[#30251c]">
                      {technology.name}
                    </p>

                    <p className="mt-0.5 truncate text-[clamp(0.58rem,0.66vw,0.72rem)] font-semibold text-[#8a7b64]">
                      {technology.category}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}