const timeline = [
  {
    status: "Completed",
    title: "MVP Released",
    description:
      "The initial playable experience has already been delivered and validated.",
  },
  {
    status: "Completed",
    title: "Alpha Finished",
    description:
      "Core gameplay systems and technical foundations have been successfully completed.",
  },
  {
    status: "In Progress",
    title: "Community Platform",
    description:
      "Building the social layer that connects players, creators, and future ecosystem participants.",
  },
  {
    status: "Next Step",
    title: "Connected Beta",
    description:
      "Bring the game, community platform, and marketplace together into one seamless ecosystem powered by Solana.",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Completed":
      return {
        dot: "bg-[#69ad49]",
        badge: "bg-[#edf7e6] text-[#4e8039] border-[#cfe4c2]",
        line: "bg-[#69ad49]",
      };

    case "In Progress":
      return {
        dot: "bg-[#4a9ed4]",
        badge: "bg-[#edf6fd] text-[#357ca6] border-[#c8e2f3]",
        line: "bg-[#4a9ed4]",
      };

    default:
      return {
        dot: "bg-[#d9a33c]",
        badge: "bg-[#fff5df] text-[#9a711e] border-[#edd7a5]",
        line: "bg-[#d9a33c]",
      };
  }
}

export function SupportTimeline() {
  return (
    <section className="rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#d9caa8] bg-white p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_1rem_3rem_rgba(60,45,25,0.07)]">
      <div>
        <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.11em] text-[#688255]">
          Progress Journey
        </p>

        <h3 className="mt-2 text-[clamp(1.35rem,2vw,1.85rem)] font-black tracking-[-0.03em] text-[#2f2118]">
          Lifetopia is already moving forward.
        </h3>

        <p className="mt-3 max-w-[46rem] text-[clamp(0.9rem,1vw,1.06rem)] leading-[1.7] text-[#706452]">
          This grant is not intended to start the project—it is intended to
          accelerate work that is already underway.
        </p>
      </div>

      <div className="mt-[clamp(1.4rem,2vw,1.8rem)]">
        {timeline.map((item, index) => {
          const style = getStatusStyle(item.status);

          return (
            <article
              key={item.title}
              className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-[clamp(0.8rem,1.5vw,1.1rem)] pb-[clamp(1rem,2vw,1.4rem)] last:pb-0"
            >
              <div className="relative flex flex-col items-center">
                <span
                  className={`relative z-10 size-[clamp(0.9rem,1.2vw,1rem)] rounded-full ${style.dot}`}
                />

                {index !== timeline.length - 1 && (
                  <span
                    className={`mt-2 h-full min-h-[4rem] w-[2px] ${style.line}`}
                  />
                )}
              </div>

              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[clamp(0.68rem,0.76vw,0.82rem)] font-black ${style.badge}`}
                >
                  {item.status}
                </span>

                <h4 className="mt-3 text-[clamp(1.05rem,1.25vw,1.28rem)] font-black text-[#30251c]">
                  {item.title}
                </h4>

                <p className="mt-2 text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#706452]">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}