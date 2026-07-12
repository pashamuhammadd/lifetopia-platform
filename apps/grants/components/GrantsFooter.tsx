import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

const reviewLinks: FooterLink[] = [
  {
    label: "Project Overview",
    href: "#overview",
  },
  {
    label: "Current Development",
    href: "#current-development",
  },
  {
    label: "Beta Roadmap",
    href: "#roadmap",
  },
  {
    label: "Budget Allocation",
    href: "#budget",
  },
  {
    label: "Review Documents",
    href: "#documents",
  },
];

const evidenceLinks: FooterLink[] = [
  {
    label: "Live Products",
    href: "#products",
  },
  {
    label: "Public Development",
    href: "#public-development",
  },
  {
    label: "Expected Impact",
    href: "#impact",
  },
  {
    label: "Why Support Now",
    href: "#why-support",
  },
  {
    label: "Core Delivery Team",
    href: "#team",
  },
];

const contactLinks: FooterLink[] = [
  {
    label: "GitHub Repository",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
    openInNewTab: true,
  },
  {
    label: "Founder Profile",
    href: "https://pashamuhammad.me",
    openInNewTab: true,
  },
  {
    label: "Main Website",
    href: "https://lifetopiaworld.io",
    openInNewTab: true,
  },
  {
    label: "Community Platform",
    href: "https://community.lifetopiaworld.io",
    openInNewTab: true,
  },
  {
    label: "hello@lifetopiaworld.com",
    href: "mailto:hello@lifetopiaworld.com",
  },
];

type FooterLinkGroupProps = {
  title: string;
  description: string;
  links: FooterLink[];
};

function FooterLinkGroup({
  title,
  description,
  links,
}: FooterLinkGroupProps) {
  return (
    <div className="min-w-0">
      <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-[#a8df8f]">
        {title}
      </p>

      <p className="mt-2 max-w-[18rem] text-[clamp(0.74rem,0.84vw,0.9rem)] leading-[1.55] text-white/42">
        {description}
      </p>

      <nav
        aria-label={`${title} links`}
        className="mt-4 flex flex-col gap-2.5"
      >
        {links.map((link) => (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            target={
              link.openInNewTab ? "_blank" : undefined
            }
            rel={
              link.openInNewTab
                ? "noopener noreferrer"
                : undefined
            }
            className="group flex w-fit items-center gap-2 text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold text-white/62 transition duration-200 hover:translate-x-0.5 hover:text-white"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-[#87d866]/55 transition group-hover:bg-[#9ce77d]" />

            <span>{link.label}</span>

            {link.openInNewTab ? (
              <span
                aria-hidden="true"
                className="text-white/30 transition group-hover:text-[#a8df8f]"
              >
                ↗
              </span>
            ) : null}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function GrantsFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0d1b12] px-[clamp(0.7rem,2vw,1.3rem)] pb-[clamp(1rem,2.5vw,2rem)] pt-[clamp(3rem,6vw,5.5rem)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[12%] -top-[30%] size-[clamp(14rem,34vw,30rem)] rounded-full bg-[#4c9b45]/20 blur-[clamp(3rem,7vw,6rem)]" />

        <div className="absolute -right-[10%] bottom-[-35%] size-[clamp(15rem,36vw,32rem)] rounded-full bg-[#4aafe4]/14 blur-[clamp(3rem,7vw,6rem)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:clamp(2rem,4vw,3.5rem)_clamp(2rem,4vw,3.5rem)]" />
      </div>

      <div className="grants-container relative">
        <div className="overflow-hidden rounded-[clamp(1rem,2vw,1.6rem)] border border-white/10 bg-[#13251a]/90 shadow-[0_2rem_6rem_rgba(3,12,7,0.42)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-x-[clamp(1rem,3vw,2.5rem)] gap-y-[clamp(2rem,4vw,3rem)] p-[clamp(1.2rem,3vw,2.5rem)] lg:grid-cols-[minmax(16rem,1.25fr)_minmax(10rem,0.75fr)_minmax(10rem,0.75fr)_minmax(12rem,0.85fr)]">
            <div className="col-span-2 min-w-0 lg:col-span-1">
              <Link
                href="#overview"
                aria-label="Return to Lifetopia World Grant Portal overview"
                className="inline-flex"
              >
                <Image
                  src="/brand/lifetopia-logo.png"
                  alt="Lifetopia World"
                  width={220}
                  height={140}
                  className="h-auto w-[clamp(7rem,11vw,10rem)]"
                />
              </Link>

              <p className="mt-5 max-w-[27rem] text-[clamp(0.9rem,1.04vw,1.1rem)] font-semibold leading-[1.7] text-white/68">
                A public funding review portal for Lifetopia
                World&apos;s connected game, community, marketplace,
                and Solana ecosystem development.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#91df72]/15 bg-[#91df72]/10 px-3 py-2 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-[#afe994]">
                  <span className="size-2 rounded-full bg-[#8ee46a]" />
                  Beta Development
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[clamp(0.7rem,0.8vw,0.86rem)] font-black text-white/58">
                  Public Review Portal
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#documents"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] bg-[#9adf78] px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-[#173b21] transition duration-200 hover:-translate-y-0.5 hover:bg-[#afe994]"
                >
                  Review Documents
                  <span aria-hidden="true">↑</span>
                </Link>

                <Link
                  href="mailto:hello@lifetopiaworld.com"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.8rem] border border-white/12 bg-white/[0.06] px-5 text-[clamp(0.8rem,0.9vw,0.96rem)] font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  Contact Founder
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            <FooterLinkGroup
              title="Review"
              description="Navigate the funding proposal."
              links={reviewLinks}
            />

            <FooterLinkGroup
              title="Evidence"
              description="Inspect products, progress, and impact."
              links={evidenceLinks}
            />

            <FooterLinkGroup
              title="Contact"
              description="Verify the project or request information."
              links={contactLinks}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0b1710]/75 px-[clamp(1.2rem,3vw,2.5rem)] py-[clamp(0.9rem,1.5vw,1.2rem)] sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[clamp(0.74rem,0.84vw,0.9rem)] font-semibold text-white/42">
                © 2026 Lifetopia World. Built by Nimia Games.
              </p>

              <p className="mt-1 text-[clamp(0.68rem,0.78vw,0.84rem)] leading-[1.5] text-white/28">
                Project information reflects the current funding
                proposal and may be updated as development progresses.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[clamp(0.68rem,0.78vw,0.84rem)] font-bold text-white/42 sm:flex">
                <span className="size-2 rounded-full bg-[#75c957]" />
                Reviewer access enabled
              </span>

              <Link
                href="#overview"
                aria-label="Back to the top of the grant portal"
                className="flex size-[clamp(2.7rem,4vw,3rem)] items-center justify-center rounded-[0.75rem] border border-white/10 bg-white/[0.055] text-[clamp(0.9rem,1vw,1.05rem)] font-black text-white/68 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
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