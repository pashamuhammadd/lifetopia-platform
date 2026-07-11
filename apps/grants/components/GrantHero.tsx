import Image from "next/image";
import Link from "next/link";
import { GrantsNavbar } from "@/components/GrantsNavbar";

const projectStats = [
  {
    label: "Project Status",
    value: "Beta Phase",
    detail: "Active Development",
    accent: "green",
  },
  {
    label: "Previously Funded",
    value: "$5,000",
    detail: "Solana Foundation Indonesia",
    accent: "purple",
  },
  {
    label: "Grant Request",
    value: "$10,000",
    detail: "For Beta Completion",
    accent: "gold",
  },
  {
    label: "Est. Delivery",
    value: "8 – 12 Weeks",
    detail: "3 Milestone Plan",
    accent: "blue",
  },
];

function getAccentClasses(accent: string) {
  if (accent === "gold") {
    return {
      dot: "bg-[#f4bb20]",
      label: "text-[#ffd462]",
      value: "text-[#ffd248]",
    };
  }

  if (accent === "purple") {
    return {
      dot: "bg-[#9d7cff]",
      label: "text-[#c8b4ff]",
      value: "text-white",
    };
  }

  if (accent === "blue") {
    return {
      dot: "bg-[#45b9ef]",
      label: "text-[#8edcff]",
      value: "text-white",
    };
  }

  return {
    dot: "bg-[#80c94c]",
    label: "text-[#aee883]",
    value: "text-white",
  };
}

export function GrantHero() {
  return (
    <header
      id="overview"
      className="relative overflow-hidden bg-[#f8f2e7]"
    >
      <GrantsNavbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#fff8e9_0%,rgba(255,250,239,0.95)_38%,rgba(152,220,251,0.5)_65%,rgba(65,175,230,0.7)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(to_top,rgba(32,87,39,0.54),transparent)]" />

        <div className="absolute left-[42%] top-[2%] h-[clamp(11rem,25vw,21rem)] w-[clamp(11rem,25vw,21rem)] rounded-full bg-white/48 blur-[clamp(2rem,5vw,4.5rem)]" />

        <div className="absolute -left-[7%] top-[5%] size-[clamp(8rem,18vw,16rem)] rounded-full bg-[#fff1b8]/42 blur-[clamp(2rem,5vw,4.5rem)]" />

        <div className="grants-grid-pattern absolute inset-0 opacity-25" />

        <div className="grants-container relative z-10 flex flex-col gap-[clamp(0.7rem,1.5vw,1.2rem)] pb-[clamp(0.85rem,1.8vw,1.4rem)] pt-[clamp(1.15rem,2.4vw,2.1rem)]">
          <div className="grid grid-cols-[minmax(0,1.02fr)_minmax(10rem,0.98fr)] items-start gap-[clamp(0.55rem,3vw,3rem)]">
            <div className="grant-hero-copy relative z-20 flex min-w-0 flex-col items-start pt-[clamp(0.15rem,0.8vw,0.65rem)]">
              <h1 className="max-w-[13ch] text-[clamp(1.6rem,3.55vw,3.45rem)] font-extrabold leading-[1] tracking-[-0.052em] text-[#172016]">
                Building the Future of{" "}
                <span className="text-[#397c37]">
                  Cozy Social Gaming
                </span>{" "}
                on Solana.
              </h1>

              <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] max-w-[33rem] text-[clamp(0.7rem,0.95vw,0.9rem)] font-medium leading-[1.65] text-[#4e4b41]">
                Lifetopia World is an active cozy life-sim and social sandbox
                platform built for millions of Lifetopians.
              </p>

              <div className="grant-hero-actions mt-[clamp(0.8rem,1.6vw,1.2rem)] flex flex-wrap gap-[clamp(0.45rem,0.9vw,0.68rem)]">
                <Link
                  href="#products"
                  className="grants-button-primary"
                >
                  View Live Products
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link
                  href="#documents"
                  className="grants-button-secondary"
                >
                  <span aria-hidden="true">▣</span>
                  Explore Documents
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[clamp(15.5rem,32vw,27rem)] min-w-0 items-start justify-center">
              <div className="absolute bottom-[2%] right-[-7%] h-[45%] w-[112%] rounded-[50%] bg-[#4b9e46]/33 blur-[clamp(1.5rem,4vw,3.7rem)]" />

              <Image
                src="/brand/lifetopia-character.png"
                alt="Main Lifetopia World farmer character"
                width={800}
                height={1000}
                priority
                className="grant-hero-character relative z-10 mt-[clamp(1.6rem,2.4vw,2.4rem)] max-h-[clamp(16rem,35vw,30rem)] w-auto object-contain drop-shadow-[0_1.8rem_2.2rem_rgba(45,64,30,0.2)] md:mt-[clamp(0.2rem,0.8vw,0.7rem)]"
              />
            </div>
          </div>

          <div className="relative z-20">
            <div className="grid grid-cols-4 overflow-hidden rounded-[clamp(0.85rem,1.6vw,1.25rem)] border border-white/15 bg-[#10261b]/92 shadow-[0_1.2rem_3rem_rgba(12,32,19,0.3)] backdrop-blur-xl">
              {projectStats.map((stat, index) => {
                const accent = getAccentClasses(stat.accent);

                return (
                  <article
                    key={stat.label}
                    className={[
                      "min-w-0 px-[clamp(0.48rem,1.45vw,1rem)] py-[clamp(0.55rem,1.2vw,0.88rem)]",
                      index !== 0 ? "border-l border-white/10" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-[clamp(0.22rem,0.5vw,0.38rem)]">
                      <span
                        className={`size-[clamp(0.26rem,0.48vw,0.38rem)] shrink-0 rounded-full ${accent.dot}`}
                      />

                      <p
                        className={`truncate text-[clamp(0.34rem,0.56vw,0.52rem)] font-extrabold uppercase tracking-[0.08em] ${accent.label}`}
                      >
                        {stat.label}
                      </p>
                    </div>

                    <p
                      className={`mt-[clamp(0.2rem,0.45vw,0.34rem)] truncate text-[clamp(0.64rem,1.25vw,1rem)] font-extrabold leading-none ${accent.value}`}
                    >
                      {stat.value}
                    </p>

                    <p className="mt-[clamp(0.18rem,0.4vw,0.3rem)] truncate text-[clamp(0.34rem,0.54vw,0.5rem)] font-medium text-white/62">
                      {stat.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
