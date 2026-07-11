import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  { label: "Overview", href: "#overview" },
  { label: "Product", href: "#products" },
  { label: "Development", href: "#development" },
  { label: "Grant Request", href: "#grant-request" },
  { label: "Documents", href: "#documents" },
];

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
    detail: "Superteam Indonesia",
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
      <div className="relative z-30 border-b border-[#5a4b35]/10 bg-[#fffdf7]/95 backdrop-blur-xl">
        <nav className="grants-container flex min-h-[clamp(4.3rem,7vw,5.5rem)] items-center justify-between gap-[clamp(0.7rem,2vw,1.5rem)]">
          <div className="flex min-w-0 items-center gap-[clamp(0.65rem,1.5vw,1.1rem)]">
            <Link href="/" aria-label="Lifetopia World Grant Portal">
              <Image
                src="/brand/lifetopia-logo.png"
                alt="Lifetopia World"
                width={180}
                height={120}
                priority
                className="h-auto w-[clamp(5.2rem,10vw,8.2rem)]"
              />
            </Link>

            <span className="hidden rounded-full bg-[#377f3e] px-[clamp(0.65rem,1.1vw,0.9rem)] py-[clamp(0.28rem,0.55vw,0.4rem)] text-[clamp(0.55rem,0.72vw,0.68rem)] font-extrabold uppercase tracking-[0.06em] text-white sm:inline-flex">
              Grant Reviewer Portal
            </span>
          </div>

          <div className="hidden items-center gap-[clamp(1rem,2.4vw,2rem)] lg:flex">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative text-[clamp(0.75rem,0.9vw,0.88rem)] font-bold text-[#302a20] transition hover:text-[#35763a]",
                  index === 0
                    ? "after:absolute after:-bottom-[0.65rem] after:left-0 after:h-[0.125rem] after:w-full after:rounded-full after:bg-[#35763a]"
                    : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-[clamp(0.45rem,1vw,0.75rem)]">
            <span className="hidden items-center gap-2 rounded-full bg-[#174d29] px-[clamp(0.75rem,1.3vw,1rem)] py-[clamp(0.38rem,0.65vw,0.5rem)] text-[clamp(0.62rem,0.78vw,0.72rem)] font-bold text-white md:inline-flex">
              <span className="size-[clamp(0.4rem,0.6vw,0.5rem)] rounded-full bg-[#92dc4b]" />
              Beta Phase
            </span>

            <button
              type="button"
              aria-label="Open navigation menu"
              className="flex size-[clamp(2.5rem,4vw,3rem)] items-center justify-center rounded-[clamp(0.7rem,1vw,0.9rem)] border border-[#5a4b35]/15 bg-white shadow-[0_0.5rem_1.5rem_rgba(55,42,24,0.08)] lg:hidden"
            >
              <span className="flex w-[clamp(1rem,1.6vw,1.25rem)] flex-col gap-[0.22rem]">
                <span className="h-[0.12rem] w-full rounded-full bg-[#243023]" />
                <span className="h-[0.12rem] w-full rounded-full bg-[#243023]" />
                <span className="h-[0.12rem] w-full rounded-full bg-[#243023]" />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div className="relative min-h-[clamp(38rem,68vw,51rem)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#fff8e9_0%,rgba(255,250,239,0.94)_36%,rgba(152,220,251,0.52)_61%,rgba(65,175,230,0.72)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(32,87,39,0.52),transparent)]" />

        <div className="absolute left-[40%] top-[9%] h-[clamp(14rem,33vw,28rem)] w-[clamp(14rem,33vw,28rem)] rounded-full bg-white/45 blur-[clamp(2rem,5vw,5rem)]" />

        <div className="absolute -left-[6%] top-[16%] size-[clamp(10rem,24vw,22rem)] rounded-full bg-[#fff1b8]/45 blur-[clamp(2rem,5vw,5rem)]" />

        <div className="grants-grid-pattern absolute inset-0 opacity-30" />

        <div className="grants-container relative z-10 grid min-h-[clamp(38rem,68vw,51rem)] grid-cols-[minmax(0,1.02fr)_minmax(13rem,0.98fr)] items-center gap-[clamp(0.7rem,4vw,4.5rem)] py-[clamp(2rem,5vw,4.5rem)]">
          <div className="relative z-20 flex min-w-0 flex-col items-start">
            <span className="grants-eyebrow">
              <span aria-hidden="true">🌿</span>
              Welcome, Reviewer!
            </span>

            <h1 className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[12ch] text-[clamp(2rem,5.2vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#172016]">
              Building the Future of{" "}
              <span className="text-[#397c37]">
                Cozy Social Gaming
              </span>{" "}
              on Solana.
            </h1>

            <p className="mt-[clamp(1rem,2vw,1.45rem)] max-w-[38rem] text-[clamp(0.84rem,1.25vw,1.12rem)] font-medium leading-[1.7] text-[#4e4b41]">
              Lifetopia World is an active cozy life-sim and social sandbox
              platform built for millions of Lifetopians.
            </p>

            <div className="mt-[clamp(1.25rem,2.8vw,2rem)] flex flex-wrap gap-[clamp(0.55rem,1.2vw,0.85rem)]">
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

          <div className="relative flex h-full min-w-0 items-end justify-center">
            <div className="absolute bottom-[8%] right-[-7%] h-[48%] w-[115%] rounded-[50%] bg-[#4b9e46]/35 blur-[clamp(1.5rem,4vw,4rem)]" />

            <Image
              src="/brand/lifetopia-character.png"
              alt="Main Lifetopia World farmer character"
              width={800}
              height={1000}
              priority
              className="relative z-10 max-h-[clamp(24rem,54vw,44rem)] w-auto object-contain drop-shadow-[0_2rem_2.5rem_rgba(45,64,30,0.22)]"
            />

            <Image
              src="/brand/lifetopia-logo.png"
              alt=""
              width={300}
              height={200}
              aria-hidden="true"
              className="absolute bottom-[6%] right-[-2%] z-20 w-[clamp(6rem,15vw,12rem)] drop-shadow-[0_1rem_1.5rem_rgba(44,54,22,0.25)]"
            />
          </div>
        </div>

        <div className="grants-container absolute inset-x-0 bottom-[clamp(1rem,2.6vw,2rem)] z-20">
          <div className="grid grid-cols-4 overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-white/15 bg-[#10261b]/92 shadow-[0_1.5rem_4rem_rgba(12,32,19,0.34)] backdrop-blur-xl">
            {projectStats.map((stat, index) => {
              const accent = getAccentClasses(stat.accent);

              return (
                <article
                  key={stat.label}
                  className={[
                    "min-w-0 px-[clamp(0.65rem,2vw,1.5rem)] py-[clamp(0.75rem,1.8vw,1.35rem)]",
                    index !== 0 ? "border-l border-white/10" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-[clamp(0.3rem,0.7vw,0.55rem)]">
                    <span
                      className={`size-[clamp(0.35rem,0.65vw,0.52rem)] shrink-0 rounded-full ${accent.dot}`}
                    />

                    <p
                      className={`truncate text-[clamp(0.46rem,0.72vw,0.67rem)] font-extrabold uppercase tracking-[0.08em] ${accent.label}`}
                    >
                      {stat.label}
                    </p>
                  </div>

                  <p
                    className={`mt-[clamp(0.3rem,0.7vw,0.55rem)] truncate text-[clamp(0.82rem,1.7vw,1.35rem)] font-extrabold leading-none ${accent.value}`}
                  >
                    {stat.value}
                  </p>

                  <p className="mt-[clamp(0.3rem,0.6vw,0.45rem)] truncate text-[clamp(0.48rem,0.72vw,0.68rem)] font-medium text-white/62">
                    {stat.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}