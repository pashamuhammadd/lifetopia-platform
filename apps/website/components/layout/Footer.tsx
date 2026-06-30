import Image from "next/image";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-10">
      <div className="lt-card grid gap-8 p-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={150}
            height={80}
            className="h-auto w-36"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#6b5b4a]">
            A cozy life simulation game where you can build, explore, and live
            your peaceful dream life.
          </p>
        </div>

        {[
          ["Game", "Overview", "Features", "Gallery"],
          ["Community", "Forum", "Events", "Leaderboard"],
          ["Support", "FAQ", "Contact", "Privacy Policy"],
        ].map(([title, ...links]) => (
          <div key={title}>
            <h3 className="font-black">{title}</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-[#6b5b4a]">
              {links.map((link) => (
                <a key={link} href="#">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}