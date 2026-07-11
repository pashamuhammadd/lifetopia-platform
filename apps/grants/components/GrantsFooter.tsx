import Image from "next/image";
import Link from "next/link";
import { createClient } from "@repo/lib/supabase/server";

type LatestDevelopmentLog = {
  pushed_at: string;
};

const platformLinks = [
  {
    label: "Main Website",
    href: "https://lifetopiaworld.io",
  },
  {
    label: "Community",
    href: "https://community.lifetopiaworld.io",
  },
  {
    label: "Playable Game",
    href: "https://play.lifetopiaworld.io",
  },
  {
    label: "Grant Portal",
    href: "https://grants.lifetopiaworld.io",
  },
];

const resourceLinks = [
  {
    label: "Project Overview",
    href: "#overview",
  },
  {
    label: "Live Products",
    href: "#products",
  },
  {
    label: "Development Log",
    href: "#development",
  },
  {
    label: "Grant Request",
    href: "#grant-request",
  },
  {
    label: "Documents Hub",
    href: "#documents",
  },
];

const contactLinks = [
  {
    label: "Founder Website",
    href: "https://pashamuhammad.me",
  },
  {
    label: "GitHub",
    href: "https://github.com/pashamuhammadd",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/LifetopiaWorld",
  },
  {
    label: "Discord",
    href: "https://discord.gg/WeKtqJMcfb",
  },
];

function formatRelativeTime(dateString: string | null) {
  if (!dateString) return "Waiting for update";

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

async function getLatestPush() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("development_logs")
    .select("pushed_at")
    .eq("is_public", true)
    .order("pushed_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  return (data as LatestDevelopmentLog | null)?.pushed_at ?? null;
}

export async function GrantsFooter() {
  const latestPush = await getLatestPush();

  return (
    <footer className="relative overflow-hidden bg-[#0d1b12] px-[clamp(0.6rem,2vw,1.3rem)] pb-[clamp(1rem,2.5vw,2rem)] pt-[clamp(2.8rem,6vw,5.5rem)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] -top-[30%] size-[clamp(14rem,34vw,30rem)] rounded-full bg-[#4c9b45]/20 blur-[clamp(3rem,7vw,6rem)]" />

        <div className="absolute -right-[10%] bottom-[-35%] size-[clamp(15rem,36vw,32rem)] rounded-full bg-[#4aafe4]/14 blur-[clamp(3rem,7vw,6rem)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:clamp(2rem,4vw,3.5rem)_clamp(2rem,4vw,3.5rem)]" />
      </div>

      <div className="grants-container relative">
        <div className="relative overflow-hidden rounded-[clamp(0.9rem,2.2vw,1.7rem)] border border-white/10 bg-[#13251a]/88 shadow-[0_2rem_6rem_rgba(3,12,7,0.42)] backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-[clamp(0.7rem,2vw,1.6rem)] border-b border-white/10 p-[clamp(0.8rem,2.5vw,2rem)]">
            <div className="min-w-0">
              <Image
                src="/brand/lifetopia-logo.png"
                alt="Lifetopia World"
                width={220}
                height={150}
                className="h-auto w-[clamp(5.2rem,11vw,9rem)] drop-shadow-[0_0.8rem_1.2rem_rgba(0,0,0,0.18)]"
              />

              <h2 className="mt-[clamp(0.7rem,1.5vw,1.1rem)] max-w-[19ch] text-[clamp(1.2rem,3vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
                Building a connected cozy world for players, creators, and
                communities.
              </h2>

              <p className="mt-[clamp(0.55rem,1.2vw,0.9rem)] max-w-[42rem] text-[clamp(0.48rem,0.9vw,0.78rem)] font-medium leading-[1.75] text-white/58">
                Lifetopia World is an actively developed cozy life-sim and
                social sandbox ecosystem powered by Solana.
              </p>

              <div className="mt-[clamp(0.8rem,1.7vw,1.3rem)] flex flex-wrap gap-[clamp(0.35rem,0.8vw,0.6rem)]">
                <Link
                  href="mailto:contact@lifetopiaworld.com"
                  className="flex min-h-[clamp(2rem,3.8vw,2.9rem)] items-center justify-center gap-[clamp(0.25rem,0.55vw,0.42rem)] rounded-[clamp(0.45rem,0.9vw,0.72rem)] bg-[#68a843] px-[clamp(0.7rem,1.5vw,1.1rem)] text-[clamp(0.42rem,0.72vw,0.62rem)] font-extrabold text-white shadow-[0_0.8rem_2rem_rgba(77,151,63,0.2)] transition hover:-translate-y-0.5 hover:bg-[#77ba4f]"
                >
                  Contact Lifetopia
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link
                  href="https://pashamuhammad.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[clamp(2rem,3.8vw,2.9rem)] items-center justify-center gap-[clamp(0.25rem,0.55vw,0.42rem)] rounded-[clamp(0.45rem,0.9vw,0.72rem)] border border-white/12 bg-white/[0.055] px-[clamp(0.7rem,1.5vw,1.1rem)] text-[clamp(0.42rem,0.72vw,0.62rem)] font-extrabold text-white/84 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  Meet the Founder
                </Link>
              </div>
            </div>

            <div className="min-w-0 self-end rounded-[clamp(0.65rem,1.4vw,1rem)] border border-white/10 bg-[#0b1710]/85 p-[clamp(0.55rem,1.4vw,1rem)] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between gap-[clamp(0.4rem,1vw,0.8rem)]">
                <div className="flex min-w-0 items-center gap-[clamp(0.25rem,0.55vw,0.42rem)]">
                  <span className="size-[clamp(0.3rem,0.55vw,0.45rem)] shrink-0 rounded-full bg-[#6cdb4c] shadow-[0_0_0.8rem_rgba(108,219,76,0.65)]" />

                  <p className="truncate font-mono text-[clamp(0.38rem,0.68vw,0.58rem)] font-bold uppercase tracking-[0.07em] text-[#9ce681]">
                    Development Active
                  </p>
                </div>

                <span className="rounded-full bg-[#67c84a]/12 px-[clamp(0.3rem,0.6vw,0.48rem)] py-[clamp(0.1rem,0.23vw,0.17rem)] font-mono text-[clamp(0.28rem,0.5vw,0.43rem)] font-bold text-[#8adf6d]">
                  LIVE
                </span>
              </div>

              <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] grid grid-cols-2 gap-[clamp(0.3rem,0.8vw,0.6rem)]">
                {[
                  {
                    label: "Current Phase",
                    value: "Beta",
                  },
                  {
                    label: "Latest Push",
                    value: formatRelativeTime(latestPush),
                  },
                  {
                    label: "Platform",
                    value: "Operational",
                  },
                  {
                    label: "Grant Request",
                    value: "$10,000",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-[clamp(0.4rem,0.85vw,0.65rem)] border border-white/[0.06] bg-white/[0.035] p-[clamp(0.35rem,0.8vw,0.6rem)]"
                  >
                    <p className="truncate font-mono text-[clamp(0.26rem,0.48vw,0.42rem)] font-bold uppercase tracking-[0.06em] text-white/36">
                      {item.label}
                    </p>

                    <p className="mt-[clamp(0.18rem,0.4vw,0.3rem)] truncate font-mono text-[clamp(0.4rem,0.76vw,0.64rem)] font-black text-white/82">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] flex items-center justify-between gap-2 border-t border-white/[0.07] pt-[clamp(0.45rem,1vw,0.75rem)]">
                <span className="font-mono text-[clamp(0.28rem,0.52vw,0.45rem)] text-white/34">
                  GitHub → Actions → API → Supabase
                </span>

                <Link
                  href="#development"
                  className="shrink-0 font-mono text-[clamp(0.3rem,0.55vw,0.47rem)] font-bold text-[#d8bd53] transition hover:translate-x-0.5"
                >
                  View logs →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr_repeat(3,minmax(0,0.72fr))] gap-[clamp(0.6rem,2vw,1.7rem)] p-[clamp(0.8rem,2.5vw,2rem)]">
            <div className="min-w-0">
              <p className="font-mono text-[clamp(0.36rem,0.65vw,0.55rem)] font-bold uppercase tracking-[0.08em] text-[#9bdc7f]">
                Lifetopia World
              </p>

              <p className="mt-[clamp(0.35rem,0.8vw,0.6rem)] max-w-[25rem] text-[clamp(0.42rem,0.75vw,0.64rem)] font-medium leading-[1.65] text-white/42">
                One connected identity across the website, community, game,
                grants portal, and future Lifetopia services.
              </p>

              <div className="mt-[clamp(0.55rem,1.2vw,0.9rem)] flex flex-wrap gap-[clamp(0.25rem,0.6vw,0.45rem)]">
                {["Solana", "Unity", "Next.js", "Supabase"].map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/[0.07] bg-white/[0.035] px-[clamp(0.35rem,0.7vw,0.52rem)] py-[clamp(0.12rem,0.28vw,0.2rem)] text-[clamp(0.28rem,0.5vw,0.43rem)] font-bold text-white/48"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <FooterLinkGroup
              title="Platform"
              links={platformLinks}
            />

            <FooterLinkGroup
              title="Resources"
              links={resourceLinks}
            />

            <FooterLinkGroup
              title="Connect"
              links={contactLinks}
            />
          </div>

          <div className="flex items-center justify-between gap-[clamp(0.6rem,1.5vw,1.1rem)] border-t border-white/10 bg-[#0b1710]/72 px-[clamp(0.8rem,2.5vw,2rem)] py-[clamp(0.55rem,1.2vw,0.9rem)]">
            <p className="text-[clamp(0.3rem,0.55vw,0.47rem)] font-medium text-white/34">
              © 2026 Lifetopia World. Built by Nimia Games.
            </p>

            <div className="flex items-center gap-[clamp(0.35rem,0.8vw,0.6rem)]">
              <span className="flex items-center gap-[clamp(0.2rem,0.45vw,0.34rem)] rounded-full bg-[#6bcc49]/10 px-[clamp(0.35rem,0.75vw,0.55rem)] py-[clamp(0.12rem,0.28vw,0.2rem)] font-mono text-[clamp(0.26rem,0.5vw,0.43rem)] font-bold text-[#84dc66]">
                <span className="size-[clamp(0.22rem,0.4vw,0.32rem)] rounded-full bg-[#72dc50]" />
                All systems operational
              </span>

              <Link
                href="#overview"
                className="flex size-[clamp(1.7rem,3vw,2.25rem)] items-center justify-center rounded-[clamp(0.4rem,0.8vw,0.62rem)] border border-white/10 bg-white/[0.045] text-[clamp(0.5rem,0.85vw,0.72rem)] text-white/62 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                aria-label="Back to top"
              >
                ↑
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkGroupProps = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[clamp(0.34rem,0.62vw,0.52rem)] font-bold uppercase tracking-[0.08em] text-[#9bdc7f]">
        {title}
      </p>

      <div className="mt-[clamp(0.4rem,0.9vw,0.7rem)] flex flex-col gap-[clamp(0.22rem,0.55vw,0.42rem)]">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <Link
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="w-fit text-[clamp(0.34rem,0.65vw,0.55rem)] font-medium text-white/44 transition hover:translate-x-0.5 hover:text-white/82"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}