export type ImpactCardData = {
  label: string;
  value: string;
  description: string;
  icon: string;
  accent: "green" | "blue" | "gold" | "purple";
};

type ImpactCardProps = {
  item: ImpactCardData;
};

function getAccentClasses(accent: ImpactCardData["accent"]) {
  if (accent === "blue") {
    return {
      card: "border-[#71add0]/25 bg-[#f2f9fd]",
      icon: "border-[#5fa7d2]/20 bg-[#e4f4fc] text-[#347ca6]",
      value: "text-[#2f789f]",
      label: "text-[#4d7f9b]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/30 bg-[#fffaf0]",
      icon: "border-[#d8aa45]/20 bg-[#fff0cb] text-[#a6781c]",
      value: "text-[#9a711e]",
      label: "text-[#8c7441]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b83db]/25 bg-[#f8f5ff]",
      icon: "border-[#9278d7]/20 bg-[#eee9ff] text-[#6f51b6]",
      value: "text-[#694cad]",
      label: "text-[#75659d]",
    };
  }

  return {
    card: "border-[#79ad62]/25 bg-[#f5faf1]",
    icon: "border-[#6ca852]/20 bg-[#e7f4dd] text-[#4f8239]",
    value: "text-[#477b34]",
    label: "text-[#5f7e51]",
  };
}

export function ImpactCard({ item }: ImpactCardProps) {
  const accent = getAccentClasses(item.accent);

  return (
    <article
      className={`group min-w-0 rounded-[clamp(0.9rem,1.5vw,1.2rem)] border p-[clamp(1rem,1.6vw,1.3rem)] shadow-[0_0.8rem_2.5rem_rgba(64,48,27,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.2rem_3.2rem_rgba(64,48,27,0.1)] ${accent.card}`}
    >
      <div
        className={`flex size-[clamp(2.8rem,4.2vw,3.5rem)] items-center justify-center rounded-[clamp(0.7rem,1.1vw,0.9rem)] border text-[clamp(1rem,1.5vw,1.3rem)] font-black ${accent.icon}`}
      >
        {item.icon}
      </div>

      <p
        className={`mt-[clamp(0.8rem,1.3vw,1rem)] text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] ${accent.label}`}
      >
        {item.label}
      </p>

      <h3
        className={`mt-2 text-[clamp(1.7rem,2.7vw,2.5rem)] font-black leading-none tracking-[-0.04em] ${accent.value}`}
      >
        {item.value}
      </h3>

      <p className="mt-[clamp(0.55rem,0.9vw,0.72rem)] text-[clamp(0.86rem,0.96vw,1.02rem)] leading-[1.65] text-[#6f6554]">
        {item.description}
      </p>
    </article>
  );
}