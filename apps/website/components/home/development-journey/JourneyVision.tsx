const visionItems = [
  {
    title: "Cozy Gameplay",
    description:
      "A relaxing life-simulation experience that remains enjoyable before any blockchain feature is introduced.",
  },
  {
    title: "Social Community",
    description:
      "A world shaped through friendship, discussion, shared activities, and long-term player participation.",
  },
  {
    title: "Optional Ownership",
    description:
      "Digital ownership supports the experience without becoming a requirement for ordinary gameplay.",
  },
  {
    title: "Evolving Society",
    description:
      "A connected world where identity, creativity, gameplay, and a player-driven economy can grow together.",
  },
];

export function JourneyVision() {
  return (
    <div>
      <p className="text-[clamp(0.68rem,0.76vw,0.8rem)] font-black uppercase tracking-[0.09em] text-[#668255]">
        Original Direction
      </p>

      <h4 className="mt-1.5 text-[clamp(1rem,1.35vw,1.3rem)] font-black text-[#244b14]">
        The four pillars behind Lifetopia
      </h4>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {visionItems.map(
          (item, index) => (
            <article
              key={item.title}
              className="rounded-xl border border-[#d9c99f] bg-[#fffdf2] p-3.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf5e2] font-mono text-[0.68rem] font-black text-[#4f8124]">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <h5 className="text-[clamp(0.82rem,0.92vw,0.96rem)] font-black text-[#4f8124]">
                  {item.title}
                </h5>
              </div>

              <p className="mt-2 text-[clamp(0.74rem,0.82vw,0.86rem)] leading-[1.55] text-[#766753]">
                {item.description}
              </p>
            </article>
          ),
        )}
      </div>
    </div>
  );
}