import Image from "next/image";
import { footerLinkGroups } from "@repo/data/footer";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export function Footer() {
  const groups = footerLinkGroups as FooterLinkGroup[];

  return (
    <footer className="relative overflow-hidden border-t border-[#d9c99f] bg-[#fff8e8] px-[clamp(14px,6vw,96px)] py-[clamp(28px,5vw,72px)]">
      <div className="absolute left-0 top-0 h-[clamp(120px,18vw,260px)] w-[clamp(120px,18vw,260px)] rounded-br-full bg-[#8cc84b]/16 blur-2xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-[1.15fr_1.35fr] gap-[clamp(18px,4vw,72px)]">
          <div>
            <Image
              src="/images/logo/logo-lifetopia-world.png"
              alt="Lifetopia World"
              width={180}
              height={80}
              className="h-auto w-[clamp(90px,12vw,180px)]"
            />

            <h2 className="mt-[clamp(10px,1.4vw,20px)] text-[clamp(1rem,2vw,2rem)] font-black text-[#2f1b12]">
              Lifetopia World
            </h2>

            <p className="mt-[clamp(6px,0.9vw,14px)] max-w-xl text-[clamp(0.48rem,0.9vw,1rem)] font-semibold leading-[1.55] text-[#7a5635]">
              Build your dream life in a cozy fantasy world where friendship,
              creativity, and adventure grow together.
            </p>

            <p className="mt-[clamp(10px,1.4vw,20px)] text-[clamp(0.45rem,0.85vw,0.95rem)] font-black text-[#4f8124]">
              Play • Create • Connect
            </p>

            <p className="mt-[clamp(4px,0.6vw,8px)] text-[clamp(0.38rem,0.75vw,0.82rem)] font-semibold text-[#7a5635]">
              Built by Nimia Games
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[clamp(12px,2vw,34px)]">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[clamp(0.55rem,1vw,1rem)] font-black text-[#2f1b12]">
                  {group.title}
                </h3>

                <div className="mt-[clamp(8px,1vw,16px)] grid gap-[clamp(5px,0.7vw,10px)]">
                  {group.links.map((link: FooterLink) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-[clamp(0.42rem,0.8vw,0.9rem)] font-semibold text-[#7a5635] transition hover:text-[#4f8124]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(22px,3vw,46px)] flex items-center justify-between gap-4 border-t border-[#d9c99f] pt-[clamp(12px,1.6vw,22px)]">
          <p className="text-[clamp(0.38rem,0.75vw,0.82rem)] font-semibold text-[#7a5635]">
            © 2026 Lifetopia World. All rights reserved.
          </p>

          <p className="text-right text-[clamp(0.38rem,0.75vw,0.82rem)] font-black text-[#4f8124]">
            Building a Better World, Together.
          </p>
        </div>
      </div>
    </footer>
  );
}