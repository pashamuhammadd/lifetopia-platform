import Link from "next/link";
import { builtFeatures, liveProductLinks } from "@/data/grants";

export function ProjectSnapshot() {
  return (
    <section className="px-[clamp(1rem,5vw,5rem)] py-[clamp(2.8rem,6vw,4.8rem)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-[clamp(1.3rem,3vw,2.2rem)]">
        <div>
          <span className="lt-grants-badge">Proof of Work</span>
          <h2 className="mt-4 text-[clamp(1.8rem,4.5vw,3.7rem)] font-black leading-[1] tracking-[-0.045em] text-[#2f1b12]">
            Lifetopia World is already live.
          </h2>
          <p className="mt-4 max-w-3xl text-[clamp(0.9rem,1.2vw,1.08rem)] leading-[1.8] text-[#7a5635]">
            The project has moved beyond concept stage with live products,
            working community features, shared account foundation, and a
            playable game prototype.
          </p>
        </div>

        <div className="grid gap-[clamp(0.8rem,1.6vw,1.1rem)] md:grid-cols-2">
          {liveProductLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="lt-grants-card rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,2vw,1.4rem)] transition hover:-translate-y-1"
            >
              <p className="text-sm font-black text-[#4f8124]">{link.label}</p>
              <h3 className="mt-1 text-[clamp(1rem,1.5vw,1.3rem)] font-black text-[#2f1b12]">
                {link.value}
              </h3>
              <p className="mt-2 text-[clamp(0.82rem,1vw,0.95rem)] leading-[1.7] text-[#7a5635]">
                {link.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="lt-grants-card rounded-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,2vw,1.4rem)]">
          <h3 className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-black text-[#2f1b12]">
            What has been built
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {builtFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-full border border-[#d9c99f]/70 bg-[#fff8e8] px-4 py-2 text-[clamp(0.78rem,1vw,0.92rem)] font-bold text-[#7a5635]"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}