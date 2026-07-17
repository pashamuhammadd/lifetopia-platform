import {
  BookOpen,
  ExternalLink,
  Gamepad2,
  Globe2,
  Mail,
  MessageCircle,
  Send,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

const exploreLinks: FooterLink[] = [
  {
    label: "Official Website",
    href: "/",
    icon: Globe2,
  },
  {
    label: "Community Platform",
    href: "https://community.lifetopiaworld.io",
    external: true,
    icon: UsersRound,
  },
  {
    label: "Play Game",
    href: "https://play.lifetopiaworld.io",
    external: true,
    icon: Gamepad2,
  },
  {
    label: "Documentation",
    href: "https://docs.lifetopiaworld.io",
    external: true,
    icon: BookOpen,
  },
];

const communityLinks: FooterLink[] = [
  {
    label: "X / Twitter",
    href: "https://x.com/LifetopiaWorld",
    external: true,
    icon: MessageCircle,
  },
  {
    label: "Discord",
    href: "https://discord.gg/WeKtqJMcfb",
    external: true,
    icon: UsersRound,
  },
  {
    label: "Telegram",
    href: "https://t.me/LifetopiaWorldCommunity",
    external: true,
    icon: Send,
  },
  {
    label: "contact@lifetopiaworld.io",
    href: "mailto:contact@lifetopiaworld.io",
    icon: Mail,
  },
];

function FooterLinkItem({
  link,
}: {
  link: FooterLink;
}) {
  const Icon = link.icon;

  const content = (
    <>
      <Icon className="size-4 shrink-0 text-[#659644]" />

      <span>{link.label}</span>

      {link.external ? (
        <ExternalLink className="ml-auto size-3.5 shrink-0 opacity-45 transition group-hover:opacity-100" />
      ) : null}
    </>
  );

  const className =
    "group flex min-h-10 items-center gap-2.5 rounded-lg px-2.5 py-2 text-[clamp(0.75rem,0.82vw,0.86rem)] font-bold text-[#6e5c48] transition hover:bg-white/70 hover:text-[#4f8124]";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  if (link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
    >
      {content}
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#d9c99f] bg-[#fff8e8] py-[clamp(2rem,3vw,2.75rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 size-[22rem] rounded-full bg-[#8cc84b]/16 blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 right-[-8rem] size-[22rem] rounded-full bg-[#8ecce8]/14 blur-[7rem]"
      />

      <div className="lt-container relative">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-10">
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Lifetopia World homepage"
              className="inline-flex"
            >
              <Image
                src="/images/logo/logo-lifetopia-world.png"
                alt="Lifetopia World"
                width={180}
                height={80}
                sizes="(max-width: 768px) 130px, 160px"
                className="h-auto w-[clamp(8rem,11vw,10rem)]"
              />
            </Link>

            <h2 className="mt-4 text-[clamp(1.2rem,1.7vw,1.65rem)] font-black tracking-[-0.025em] text-[#2f1b12]">
              A cozy world built together.
            </h2>

            <p className="mt-3 max-w-[34rem] text-[clamp(0.8rem,0.88vw,0.92rem)] font-semibold leading-[1.65] text-[#74614d]">
              Lifetopia World is a cozy social sandbox where
              gameplay, friendship, creativity, and shared
              digital identity grow as one connected experience.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c7dcb9] bg-[#eef7e8] px-3 py-1.5 text-[0.75rem] font-black text-[#527d40]">
              <span className="size-2 rounded-full bg-[#6fac4f]" />
              Play · Create · Connect
            </div>
          </div>

          <nav aria-labelledby="footer-explore-title">
            <h3
              id="footer-explore-title"
              className="px-2.5 text-[0.72rem] font-black uppercase tracking-[0.1em] text-[#8b765e]"
            >
              Explore
            </h3>

            <div className="mt-2 grid">
              {exploreLinks.map((link) => (
                <FooterLinkItem
                  key={link.label}
                  link={link}
                />
              ))}
            </div>
          </nav>

          <nav aria-labelledby="footer-community-title">
            <h3
              id="footer-community-title"
              className="px-2.5 text-[0.72rem] font-black uppercase tracking-[0.1em] text-[#8b765e]"
            >
              Community
            </h3>

            <div className="mt-2 grid">
              {communityLinks.map((link) => (
                <FooterLinkItem
                  key={link.label}
                  link={link}
                />
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-[clamp(1.5rem,2.4vw,2rem)] flex flex-col gap-3 border-t border-[#d9c99f] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[clamp(0.75rem,0.8vw,0.84rem)] font-semibold text-[#796751]">
            © {currentYear} Lifetopia World. All rights reserved.
          </p>

          <p className="text-[clamp(0.75rem,0.8vw,0.84rem)] font-semibold text-[#796751]">
            Built by{" "}
            <a
              href="https://nimiagames.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#4f8124] transition hover:text-[#3d6d2a] hover:underline"
            >
              Nimia Games
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}