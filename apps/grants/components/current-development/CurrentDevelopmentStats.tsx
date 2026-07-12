const developmentStats = [
  {
    label: "MVP",
    value: "Completed",
    description: "Core gameplay concept validated.",
    accent: "green",
  },
  {
    label: "Alpha",
    value: "Completed",
    description: "Initial systems and world foundation delivered.",
    accent: "green",
  },
  {
    label: "Current Phase",
    value: "Beta",
    description: "Building a stable and connected player experience.",
    accent: "blue",
  },
  {
    label: "Development",
    value: "Public",
    description: "Progress is tracked through live development logs.",
    accent: "gold",
  },
];

function getAccentClasses(accent: string) {
  if (accent === "blue") {
    return {
      card: "border-[#5ba9db]/25 bg-[#edf7fd]",
      label: "text-[#397fae]",
      value: "text-[#256c99]",
      dot: "bg-[#4aa4df]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#e7b652]/30 bg-[#fff6df]",
      label: "text-[#a87519]",
      value: "text-[#8f6517]",
      dot: "bg-[#e3a82e]",
    };
  }

  return {
    card: "border-[#76ad5e]/25 bg-[#edf6e6]",
    label: "text-[#588541]",
    value: "text-[#3f702d]",
    dot: "bg-[#69a64d]",
  };
}

export function CurrentDevelopmentStats() {
  return (
    <div className="grid grid-cols-2 gap-[clamp(0.55rem,1.2vw,0.9rem)] lg:grid-cols-4">
      {developmentStats.map((stat) => {
        const accent = getAccentClasses(stat.accent);

        return (
          <article
            key={stat.label}
            className={`min-w-0 rounded-[clamp(0.8rem,1.4vw,1.1rem)] border p-[clamp(0.75rem,1.35vw,1.05rem)] shadow-[0_0.7rem_2rem_rgba(50,42,27,0.05)] ${accent.card}`}
          >
            <div className="flex items-center gap-[clamp(0.35rem,0.7vw,0.55rem)]">
              <span
                className={`size-[clamp(0.42rem,0.7vw,0.56rem)] shrink-0 rounded-full ${accent.dot}`}
              />

              <p
                className={`truncate text-[clamp(0.68rem,0.78vw,0.82rem)] font-black uppercase tracking-[0.08em] ${accent.label}`}
              >
                {stat.label}
              </p>
            </div>

            <h3
              className={`mt-[clamp(0.4rem,0.8vw,0.6rem)] text-[clamp(1.25rem,1.8vw,1.75rem)] font-black leading-none ${accent.value}`}
            >
              {stat.value}
            </h3>

            <p className="mt-[clamp(0.4rem,0.75vw,0.58rem)] text-[clamp(0.76rem,0.85vw,0.92rem)] font-medium leading-[1.55] text-[#6f6554]">
              {stat.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}