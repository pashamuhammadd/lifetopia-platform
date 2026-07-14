import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const ecosystemLinks: FooterLink[] = [
  {
    label: "Main Website",
    href: "https://lifetopiaworld.io",
    external: true,
  },
  {
    label: "Community",
    href: "https://community.lifetopiaworld.io",
    external: true,
  },
  {
    label: "Play Game",
    href: "https://play.lifetopiaworld.io",
    external: true,
  },
];

const verificationLinks: FooterLink[] = [
  {
    label: "Documentation",
    href: "https://docs.lifetopiaworld.io",
    external: true,
  },
  {
    label: "GitHub Repository",
    href: "https://github.com/pashamuhammadd/lifetopia-platform",
    external: true,
  },
  {
    label: "Founder Website",
    href: "https://pashamuhammad.me",
    external: true,
  },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <nav
      aria-label={`${title} links`}
      className="min-w-0"
    >
      <p className="text-[clamp(0.64rem,0.72vw,0.76rem)] font-black uppercase tracking-[0.11em] text-[#9bdc7e]">
        {title}
      </p>

      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={
              link.external
                ? "noopener noreferrer"
                : undefined
            }
            className="group flex w-fit items-center gap-2 text-[clamp(0.74rem,0.84vw,0.88rem)] font-semibold text-white/58 transition hover:text-white"
          >
            <span className="size-1.5 rounded-full bg-[#78c95a]/55 transition group-hover:bg-[#9be37c]" />

            <span>{link.label}</span>

            {link.external ? (
              <span
                aria-hidden="true"
                className="text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9bdc7e]"
              >
                ↗
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function GrantsFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0d1b12] px-[clamp(0.7rem,2vw,1.2rem)] py-[clamp(1.8rem,3.5vw,2.8rem)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[10rem] -top-[12rem] size-[26rem] rounded-full bg-[#4c9b45]/16 blur-[7rem]" />

        <div className="absolute -bottom-[13rem] -right-[10rem] size-[28rem] rounded-full bg-[#4aafe4]/10 blur-[8rem]" />
      </div>

      <div className="grants-container relative">
        <div className="grid gap-[clamp(1.5rem,3vw,2.5rem)] rounded-[clamp(1rem,1.5vw,1.3rem)] border border-white/10 bg-[#13251a]/85 p-[clamp(1rem,2vw,1.6rem)] shadow-[0_1.2rem_4rem_rgba(3,12,7,0.32)] backdrop-blur-xl md:grid-cols-[minmax(0,1.25fr)_minmax(9rem,0.55fr)_minmax(10rem,0.65fr)]">
          <div className="min-w-0">
            <Link
              href="#overview"
              aria-label="Return to the top of the Lifetopia World Funding Hub"
              className="inline-flex"
            >
              <Image
                src="/brand/lifetopia-logo.png"
                alt="Lifetopia World"
                width={220}
                height={140}
                className="h-auto w-[clamp(7rem,10vw,9rem)]"
              />
            </Link>

            <p className="mt-3 max-w-[32rem] text-[clamp(0.8rem,0.92vw,0.96rem)] leading-[1.6] text-white/58">
              The official public funding and development review
              portal for Lifetopia World.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#91df72]/15 bg-[#91df72]/10 px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.76rem)] font-black text-[#afe994]">
                <span className="size-1.5 rounded-full bg-[#8ee46a]" />
                Beta Development
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[clamp(0.64rem,0.72vw,0.76rem)] font-black text-white/46">
                Public Funding Hub
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                href="https://docs.lifetopiaworld.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-xl bg-[#9adf78] px-4 text-[clamp(0.7rem,0.8vw,0.84rem)] font-black text-[#173b21] transition hover:-translate-y-0.5 hover:bg-[#afe994]"
              >
                Open Documentation
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                href="mailto:contact@lifetopiaworld.io"
                className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.055] px-4 text-[clamp(0.7rem,0.8vw,0.84rem)] font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
              >
                contact@lifetopiaworld.io
              </Link>
            </div>
          </div>

          <FooterLinks
            title="Ecosystem"
            links={ecosystemLinks}
          />

          <FooterLinks
            title="Verification"
            links={verificationLinks}
          />
        </div>

        <div className="flex flex-col gap-3 px-1 pt-[clamp(0.9rem,1.5vw,1.2rem)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[clamp(0.68rem,0.78vw,0.82rem)] font-semibold text-white/38">
              © 2026 Lifetopia World. Built by Nimia Games.
            </p>

            <p className="mt-1 text-[clamp(0.62rem,0.7vw,0.74rem)] text-white/24">
              Project information may be updated as development
              and funding milestones progress.
            </p>
          </div>

          <Link
            href="#overview"
            aria-label="Back to the top of the Funding Hub"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sm font-black text-white/60 transition hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
          >
            ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}