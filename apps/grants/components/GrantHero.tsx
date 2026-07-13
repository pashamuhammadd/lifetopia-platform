import Image from "next/image";
import Link from "next/link";

type StatAccent = "green" | "blue" | "gold" | "purple";

type ProjectStat = {
  label: string;
  value: string;
  detail: string;
  accent: StatAccent;
};

const projectStats: ProjectStat[] = [
  {
    label: "Project Phase",
    value: "Beta",
    detail: "Active development",
    accent: "green",
  },
  {
    label: "Playable Build",
    value: "Alpha",
    detail: "Publicly accessible",
    accent: "blue",
  },
  {
    label: "Previous Grant",
    value: "$5K",
    detail: "Superteam Indonesia",
    accent: "purple",
  },
  {
    label: "Current Request",
    value: "$10K",
    detail: "8–12 week delivery",
    accent: "gold",
  },
];

function getStatClasses(accent: StatAccent) {
  if (accent === "blue") {
    return {
      dot: "bg-[#59b6e5]",
      value: "text-[#3e8fbc]",
      surface: "border-[#79badd]/25 bg-[#f0f9fd]/90",
    };
  }

  if (accent === "gold") {
    return {
      dot: "bg-[#e8ac35]",
      value: "text-[#a8791c]",
      surface: "border-[#dfb85d]/30 bg-[#fff8e7]/92",
    };
  }

  if (accent === "purple") {
    return {
      dot: "bg-[#9177dc]",
      value: "text-[#6d51b0]",
      surface: "border-[#9b86d8]/25 bg-[#f8f5ff]/90",
    };
  }

  return {
    dot: "bg-[#68ad4a]",
    value: "text-[#477b34]",
    surface: "border-[#79ad62]/25 bg-[#f4faef]/90",
  };
}

export function GrantHero() {
  return (
    <header
      id="overview"
      className="relative isolate overflow-hidden bg-[#dff1fa]"
    >
      {/* Sky foundation */}
      <div className="absolute inset-0 bg-[linear-gradient(118deg,#fff8e9_0%,#fffaf1_38%,#dff3fc_73%,#8ed2ee_100%)]" />

      {/* Warm morning light */}
      <div className="absolute -left-[8rem] -top-[8rem] size-[clamp(18rem,35vw,31rem)] rounded-full bg-[#fff1a8]/52 blur-[clamp(4rem,8vw,7rem)]" />

      {/* Soft sky light */}
      <div className="absolute right-[10%] top-[2%] size-[clamp(12rem,24vw,22rem)] rounded-full bg-white/48 blur-[clamp(3rem,7vw,6rem)]" />

      {/* Clouds */}
      <div
        aria-hidden="true"
        className="absolute left-[4%] top-[13%] hidden opacity-55 sm:block"
      >
        <span className="absolute left-0 top-4 h-8 w-24 rounded-full bg-white/70 blur-[0.5px]" />
        <span className="absolute left-9 top-0 size-14 rounded-full bg-white/75 blur-[0.5px]" />
        <span className="absolute left-20 top-3 size-10 rounded-full bg-white/70 blur-[0.5px]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[12%] hidden opacity-42 lg:block"
      >
        <span className="absolute left-0 top-5 h-9 w-28 rounded-full bg-white/70 blur-[0.5px]" />
        <span className="absolute left-10 top-0 size-16 rounded-full bg-white/75 blur-[0.5px]" />
        <span className="absolute left-24 top-4 size-11 rounded-full bg-white/65 blur-[0.5px]" />
      </div>

      {/* Distant hills */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[11%] -left-[10%] h-[38%] w-[74%] rounded-[50%] bg-[#8bc26c]/45 blur-[0.5px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[15%] left-[28%] h-[42%] w-[82%] rounded-[50%] bg-[#65a95d]/45 blur-[0.5px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-[20%] right-[-15%] h-[48%] w-[77%] rounded-[50%] bg-[#3f8748]/38 blur-[1px]"
      />

      {/* Foreground grass */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-[linear-gradient(to_top,rgba(41,104,48,0.78),rgba(80,151,66,0.4),transparent)]" />

      <div className="grants-grid-pattern absolute inset-0 opacity-[0.18]" />

      {/* Character */}
      <Image
        src="/brand/lifetopia-character.png"
        alt="Lifetopia World farmer character"
        width={800}
        height={1000}
        priority
        sizes="(max-width: 767px) 78vw, 48vw"
        className="pointer-events-none absolute bottom-0 right-[-12%] z-[2] h-auto w-[clamp(20rem,61vw,31rem)] object-contain opacity-[0.24] drop-shadow-[0_2rem_2.8rem_rgba(38,70,32,0.2)] sm:right-[-5%] sm:w-[clamp(23rem,53vw,34rem)] sm:opacity-40 md:right-[-1%] md:w-[clamp(25rem,42vw,35rem)] md:opacity-100 lg:right-[1%]"
      />

      {/* Improves readability over character on smaller screens */}
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(255,249,237,0.98)_0%,rgba(255,249,237,0.92)_50%,rgba(255,249,237,0.18)_78%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(255,249,237,0.96)_0%,rgba(255,249,237,0.84)_43%,rgba(255,249,237,0.08)_69%,transparent_100%)]" />

<div className="grants-container relative z-10 flex min-h-[calc(100svh-3.75rem)] items-center py-[clamp(0.5rem,1.2vw,0.9rem)]">
        <div className="w-full md:max-w-[62%] lg:max-w-[57%]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4f853d]/18 bg-[#edf6e6]/92 px-3.5 py-2 text-[clamp(0.68rem,0.78vw,0.84rem)] font-black uppercase tracking-[0.12em] text-[#4b7a3c] shadow-[0_0.5rem_1.5rem_rgba(53,93,47,0.06)] backdrop-blur">
            <span className="size-2 rounded-full bg-[#69b84b] shadow-[0_0_0.55rem_rgba(105,184,75,0.3)]" />
            Solana Ecosystem Funding Proposal
          </span>

<h1 className="mt-[clamp(0.65rem,1.1vw,0.85rem)] max-w-[17ch] text-[clamp(1.95rem,3.45vw,3.4rem)] font-black leading-[0.97] tracking-[-0.05em] text-[#172016]">
            Building a connected{" "}
            <span className="text-[#397c37]">
              cozy world
            </span>{" "}
            powered by Solana.
          </h1>

<p className="mt-[clamp(0.55rem,1vw,0.75rem)] max-w-[43rem] text-[clamp(0.84rem,0.96vw,0.98rem)] font-medium leading-[1.55] text-[#585044]">
            Lifetopia World connects a playable life-simulation game,
            community platform, and future marketplace into one accessible
            ecosystem for players discovering Web3.
          </p>

<div className="mt-[clamp(0.55rem,1vw,0.75rem)] max-w-[43rem] rounded-[0.8rem] border border-[#5c8c4b]/16 bg-white/58 px-[clamp(0.75rem,1.1vw,0.9rem)] py-[clamp(0.55rem,0.85vw,0.7rem)] shadow-[0_0.7rem_2rem_rgba(55,77,39,0.06)] backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="mt-[0.4rem] size-2 shrink-0 rounded-full bg-[#68b849] shadow-[0_0_0.6rem_rgba(104,184,73,0.35)]" />

              <p className="text-[clamp(0.74rem,0.84vw,0.88rem)] font-semibold leading-[1.45] text-[#526049]">
                The project is in{" "}
                <strong className="text-[#39743a]">
                  Beta development
                </strong>
                . The publicly accessible game remains the previous Alpha
                build while the connected Beta is completed.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(0.65rem,1.1vw,0.85rem)] flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="#products"
              className="grants-button-primary"
            >
              Review Live Products
              <span aria-hidden="true">↓</span>
            </Link>

            <Link
              href="#roadmap"
              className="grants-button-secondary"
            >
              View Delivery Plan
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <div className="mt-[clamp(0.6rem,1vw,0.8rem)] grid max-w-[47rem] grid-cols-2 gap-1.5 lg:grid-cols-4">
            {projectStats.map((stat) => {
              const classes = getStatClasses(stat.accent);

              return (
                <article
                  key={stat.label}
                  className={`min-w-0 rounded-[0.72rem] border px-[clamp(0.6rem,0.85vw,0.75rem)] py-[clamp(0.48rem,0.7vw,0.62rem)] shadow-[0_0.5rem_1.6rem_rgba(59,45,25,0.05)] backdrop-blur-md ${classes.surface}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-2 shrink-0 rounded-full ${classes.dot}`}
                    />

                    <p className="truncate text-[clamp(0.62rem,0.7vw,0.76rem)] font-black uppercase tracking-[0.07em] text-[#7e725f]">
                      {stat.label}
                    </p>
                  </div>

                  <p
                    className={`mt-1.5 text-[clamp(1rem,1.25vw,1.2rem)] font-black leading-none ${classes.value}`}
                  >
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[clamp(0.65rem,0.74vw,0.8rem)] font-semibold leading-[1.35] text-[#7c705e]">
                    {stat.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Small fantasy decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[3%] z-[5] hidden items-end gap-2 md:flex"
      >
        <span className="h-5 w-2 -rotate-12 rounded-full bg-[#74a952]/55" />
        <span className="h-8 w-2 rotate-6 rounded-full bg-[#5e9747]/60" />
        <span className="h-4 w-2 rotate-12 rounded-full bg-[#82b75e]/55" />
      </div>
    </header>
  );
}