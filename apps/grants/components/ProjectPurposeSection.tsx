import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";
import { TechnologyIcon } from "@/components/TechnologyIcon";


type LatestDevelopmentLog = {
  pushed_at: string;
};

const technologies = [
  {
    name: "Solana",
    category: "Blockchain",
    icon: "logos:solana",
  },
  {
    name: "Unity",
    category: "Game Engine",
    icon: "logos:unity",
  },
  {
    name: "Next.js",
    category: "Web Framework",
    icon: "logos:nextjs-icon",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "logos:typescript-icon",
  },
  {
    name: "Turborepo",
    category: "Monorepo",
    icon: "logos:turborepo-icon",
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: "logos:supabase-icon",
  },
  {
    name: "GitHub",
    category: "Source Control",
    icon: "logos:github-icon",
  },
  {
    name: "Vercel",
    category: "Deployment",
    icon: "logos:vercel-icon",
  },
  {
    name: "Cloudinary",
    category: "Media",
    icon: "logos:cloudinary-icon",
  },
];

function formatRelativeTime(dateString: string | null) {
  if (!dateString) return "Waiting";

  const pushedAt = new Date(dateString).getTime();
  const difference = Math.max(
    0,
    Math.floor((Date.now() - pushedAt) / 1000),
  );

  if (difference < 60) return "Just now";

  const minutes = Math.floor(difference / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

async function getProjectMetrics() {
  const supabase = await createClient();

  const [
    { count: developmentLogCount },
    { data: latestDevelopmentLog },
  ] = await Promise.all([
    supabase
      .from("development_logs")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("is_public", true),

    supabase
      .from("development_logs")
      .select("pushed_at")
      .eq("is_public", true)
      .order("pushed_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    developmentLogCount: developmentLogCount ?? 0,
    latestPush:
      (latestDevelopmentLog as LatestDevelopmentLog | null)
        ?.pushed_at ?? null,
  };
}

export async function ProjectPurposeSection() {
  const metrics = await getProjectMetrics();

  const projectStatus = [
    {
      label: "Current Phase",
      value: "Beta",
      detail: "Active development",
      accent: "green",
    },
    {
      label: "Platform Apps",
      value: "4",
      detail: "Website, community, grants, docs",
      accent: "blue",
    },
    {
      label: "Development Logs",
      value: String(metrics.developmentLogCount),
      detail: "Publicly synchronized",
      accent: "purple",
    },
    {
      label: "Latest Push",
      value: formatRelativeTime(metrics.latestPush),
      detail: "GitHub Actions pipeline",
      accent: "gold",
    },
    {
      label: "Database",
      value: "Healthy",
      detail: "Powered by Supabase",
      accent: "green",
    },
    {
      label: "Architecture",
      value: "Monorepo",
      detail: "Powered by Turborepo",
      accent: "blue",
    },
  ];

  return (
    <section className="relative overflow-hidden px-[clamp(0.6rem,2vw,1.3rem)] py-[clamp(2.8rem,6vw,5.5rem)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[8%] top-[5%] size-[clamp(11rem,26vw,23rem)] rounded-full bg-[#ddefc7]/45 blur-[clamp(2.5rem,6vw,5rem)]" />

        <div className="absolute -right-[7%] bottom-[2%] size-[clamp(12rem,28vw,25rem)] rounded-full bg-[#d8effb]/50 blur-[clamp(2.5rem,6vw,5rem)]" />
      </div>

      <div className="grants-container relative">
        <div className="grid grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-[clamp(0.5rem,1.6vw,1.3rem)]">
          {/* PROJECT STATUS */}
          <div className="min-w-0 overflow-hidden rounded-[clamp(0.85rem,2vw,1.55rem)] border border-white/10 bg-[#101713] shadow-[0_1.5rem_4.5rem_rgba(13,29,18,0.26)]">
            <div className="flex items-center justify-between gap-[clamp(0.4rem,1vw,0.8rem)] border-b border-white/10 bg-[#172019] px-[clamp(0.6rem,1.5vw,1.15rem)] py-[clamp(0.5rem,1.1vw,0.85rem)]">
              <div className="flex min-w-0 items-center gap-[clamp(0.3rem,0.7vw,0.55rem)]">
                <span className="font-mono text-[clamp(0.48rem,0.85vw,0.72rem)] text-[#86d56a]">
                  ◆
                </span>

                <h2 className="truncate font-mono text-[clamp(0.5rem,0.95vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#f1cf52]">
                  Project Status
                </h2>
              </div>

              <span className="flex shrink-0 items-center gap-[clamp(0.2rem,0.45vw,0.35rem)] rounded-full bg-[#59bd39]/15 px-[clamp(0.35rem,0.75vw,0.6rem)] py-[clamp(0.15rem,0.35vw,0.26rem)] font-mono text-[clamp(0.34rem,0.6vw,0.52rem)] font-bold text-[#7ae259]">
                <span className="size-[clamp(0.24rem,0.42vw,0.34rem)] rounded-full bg-[#67dc43]" />
                ONLINE
              </span>
            </div>

            <div className="p-[clamp(0.55rem,1.5vw,1.1rem)]">
              <div className="grid grid-cols-2 gap-[clamp(0.35rem,0.9vw,0.7rem)]">
                {projectStatus.map((item) => {
                  const accent =
                    item.accent === "blue"
                      ? {
                          dot: "bg-[#54b5e8]",
                          value: "text-[#8bd8ff]",
                          glow: "bg-[#54b5e8]/10",
                        }
                      : item.accent === "purple"
                        ? {
                            dot: "bg-[#9a7cec]",
                            value: "text-[#c7b6ff]",
                            glow: "bg-[#9a7cec]/10",
                          }
                        : item.accent === "gold"
                          ? {
                              dot: "bg-[#e9b53b]",
                              value: "text-[#ffd56d]",
                              glow: "bg-[#e9b53b]/10",
                            }
                          : {
                              dot: "bg-[#70c94e]",
                              value: "text-[#9ee480]",
                              glow: "bg-[#70c94e]/10",
                            };

                  return (
                    <article
                      key={item.label}
                      className={`min-w-0 rounded-[clamp(0.5rem,1.1vw,0.85rem)] border border-white/[0.08] p-[clamp(0.45rem,1vw,0.75rem)] ${accent.glow}`}
                    >
                      <div className="flex min-w-0 items-center gap-[clamp(0.25rem,0.55vw,0.42rem)]">
                        <span
                          className={`size-[clamp(0.26rem,0.46vw,0.36rem)] shrink-0 rounded-full ${accent.dot}`}
                        />

                        <p className="truncate font-mono text-[clamp(0.3rem,0.55vw,0.47rem)] font-bold uppercase tracking-[0.07em] text-white/48">
                          {item.label}
                        </p>
                      </div>

                      <p
                        className={`mt-[clamp(0.28rem,0.65vw,0.5rem)] truncate font-mono text-[clamp(0.55rem,1.05vw,0.88rem)] font-black ${accent.value}`}
                      >
                        {item.value}
                      </p>

                      <p className="mt-[clamp(0.15rem,0.35vw,0.28rem)] line-clamp-2 font-mono text-[clamp(0.28rem,0.52vw,0.45rem)] leading-[1.4] text-white/42">
                        {item.detail}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] rounded-[clamp(0.55rem,1.1vw,0.85rem)] border border-white/[0.08] bg-white/[0.035] p-[clamp(0.45rem,1vw,0.75rem)]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[clamp(0.34rem,0.6vw,0.52rem)] font-bold text-white/66">
                    Platform health
                  </p>

                  <span className="font-mono text-[clamp(0.32rem,0.56vw,0.48rem)] font-bold text-[#82dc67]">
                    Operational
                  </span>
                </div>

                <div className="mt-[clamp(0.35rem,0.8vw,0.6rem)] grid grid-cols-4 gap-[clamp(0.2rem,0.5vw,0.38rem)]">
                  {[
                    "Website",
                    "Community",
                    "Grants",
                    "Database",
                  ].map((service) => (
                    <div
                      key={service}
                      className="min-w-0 rounded-[clamp(0.35rem,0.75vw,0.58rem)] bg-[#65bd48]/10 px-[clamp(0.25rem,0.55vw,0.4rem)] py-[clamp(0.22rem,0.5vw,0.38rem)] text-center"
                    >
                      <span className="mx-auto block size-[clamp(0.22rem,0.4vw,0.32rem)] rounded-full bg-[#6fd84e]" />

                      <p className="mt-[clamp(0.14rem,0.3vw,0.24rem)] truncate font-mono text-[clamp(0.26rem,0.48vw,0.42rem)] text-white/58">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOUNDER NOTE */}
          <article className="relative min-w-0 overflow-hidden rounded-[clamp(0.85rem,2vw,1.55rem)] border border-[#65563e]/12 bg-[#fffaf0] p-[clamp(0.75rem,2vw,1.6rem)] shadow-[0_1.5rem_4.5rem_rgba(61,47,27,0.11)]">
            <div className="pointer-events-none absolute -right-[10%] -top-[20%] size-[clamp(9rem,22vw,18rem)] rounded-full bg-[#dff0c3]/60 blur-[clamp(2rem,5vw,4rem)]" />

            <div className="pointer-events-none absolute -bottom-[25%] -left-[10%] size-[clamp(8rem,20vw,16rem)] rounded-full bg-[#dceff8]/55 blur-[clamp(2rem,5vw,4rem)]" />

            <div className="relative">
              <span className="grants-eyebrow">
                <span aria-hidden="true">🌿</span>
                Built With Purpose
              </span>

              <h2 className="mt-[clamp(0.65rem,1.5vw,1.1rem)] max-w-[18ch] text-[clamp(1.15rem,2.8vw,2.35rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#182017]">
                Lifetopia is an ecosystem built for the long term.
              </h2>

              <div className="mt-[clamp(0.7rem,1.6vw,1.2rem)] space-y-[clamp(0.5rem,1.1vw,0.85rem)]">
                <p className="text-[clamp(0.52rem,0.92vw,0.8rem)] font-medium leading-[1.75] text-[#625a4b]">
                  Lifetopia World is not just another blockchain game. It is an
                  ecosystem I am committed to building for years, where
                  players, creators, and communities can grow through one
                  connected digital world.
                </p>

                <p className="text-[clamp(0.52rem,0.92vw,0.8rem)] font-medium leading-[1.75] text-[#625a4b]">
                  Every grant we receive is invested directly into stronger
                  products, better player experiences, community growth, and
                  long-term sustainability.
                </p>
              </div>

              <div className="mt-[clamp(0.75rem,1.7vw,1.3rem)] flex items-end justify-between gap-[clamp(0.6rem,1.5vw,1.1rem)] border-t border-[#695a40]/12 pt-[clamp(0.65rem,1.5vw,1.1rem)]">
                <div>
                  <p className="text-[clamp(0.58rem,1vw,0.85rem)] font-extrabold text-[#243023]">
                    Pasha Muhammad
                  </p>

                  <p className="mt-[clamp(0.08rem,0.2vw,0.15rem)] text-[clamp(0.36rem,0.65vw,0.55rem)] font-bold uppercase tracking-[0.07em] text-[#63854d]">
                    Founder, Lifetopia World
                  </p>

                  <p className="mt-[clamp(0.28rem,0.6vw,0.45rem)] font-mono text-[clamp(0.3rem,0.55vw,0.47rem)] text-[#938672]">
                    Building in public since 2025.
                  </p>
                </div>

                <Link
                  href="https://pashamuhammad.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center gap-[clamp(0.25rem,0.55vw,0.42rem)] rounded-[clamp(0.45rem,0.9vw,0.7rem)] border border-[#4b7939]/16 bg-[#eaf4df] px-[clamp(0.5rem,1vw,0.75rem)] py-[clamp(0.35rem,0.75vw,0.55rem)] text-[clamp(0.36rem,0.65vw,0.55rem)] font-extrabold text-[#477b34] transition hover:-translate-y-0.5 hover:bg-[#dff0ce]"
                >
                  Meet the Founder
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* BUILT WITH */}
        <div className="mt-[clamp(0.6rem,1.5vw,1.2rem)] rounded-[clamp(0.8rem,1.8vw,1.4rem)] border border-[#65563e]/12 bg-[#fffaf0]/90 p-[clamp(0.65rem,1.6vw,1.2rem)] shadow-[0_1rem_3.5rem_rgba(61,47,27,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-[clamp(0.5rem,1.2vw,0.9rem)]">
            <div>
              <p className="text-[clamp(0.48rem,0.86vw,0.72rem)] font-extrabold text-[#273026]">
                Built with trusted technology
              </p>

              <p className="mt-[clamp(0.1rem,0.25vw,0.2rem)] text-[clamp(0.34rem,0.6vw,0.52rem)] font-medium text-[#847966]">
                Infrastructure supporting Lifetopia&apos;s platform, community,
                and game development.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#eaf4df] px-[clamp(0.4rem,0.8vw,0.62rem)] py-[clamp(0.14rem,0.3vw,0.23rem)] text-[clamp(0.3rem,0.55vw,0.47rem)] font-extrabold text-[#4b7e35]">
              Production Stack
            </span>
          </div>

          <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] grid grid-cols-9 gap-[clamp(0.2rem,0.65vw,0.5rem)]">
            {technologies.map((technology) => (
              <div
                key={technology.name}
                className="group min-w-0 rounded-[clamp(0.42rem,0.9vw,0.7rem)] border border-[#65563e]/10 bg-white/65 px-[clamp(0.25rem,0.7vw,0.55rem)] py-[clamp(0.3rem,0.75vw,0.58rem)] text-center transition hover:-translate-y-0.5 hover:border-[#5d963f]/25 hover:bg-white"
              >
                <span className="mx-auto flex size-[clamp(1.75rem,3vw,2.4rem)] items-center justify-center rounded-[clamp(0.38rem,0.7vw,0.58rem)] border border-[#65563e]/10 bg-white p-[clamp(0.28rem,0.55vw,0.45rem)] shadow-[0_0.3rem_1rem_rgba(49,39,24,0.07)] transition group-hover:scale-105 group-hover:border-[#5d963f]/25">
                  <TechnologyIcon
                    icon={technology.icon}
                    label={technology.name}
                  />
                </span>

                <p className="mt-[clamp(0.18rem,0.4vw,0.3rem)] truncate text-[clamp(0.3rem,0.58vw,0.5rem)] font-extrabold text-[#283026]">
                  {technology.name}
                </p>

                <p className="mt-[clamp(0.06rem,0.15vw,0.12rem)] truncate text-[clamp(0.23rem,0.44vw,0.38rem)] font-medium text-[#918571]">
                  {technology.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
