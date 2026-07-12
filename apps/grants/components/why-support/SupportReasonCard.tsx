export type SupportReasonCardData = {
  number: string;
  title: string;
  description: string;
  accent: "green" | "blue" | "gold" | "purple";
};

type SupportReasonCardProps = {
  item: SupportReasonCardData;
};

function getAccentClasses(accent: SupportReasonCardData["accent"]) {
  if (accent === "blue") {
    return {
      card: "border-[#73afd1]/25 bg-[#f2f9fd]",
      number: "border-[#5da5cf]/20 bg-[#e4f4fc] text-[#347ba5]",
      title: "text-[#2f7399]",
      dot: "bg-[#4f9fc9]",
    };
  }

  if (accent === "gold") {
    return {
      card: "border-[#ddb866]/30 bg-[#fffaf0]",
      number: "border-[#d7aa48]/20 bg-[#fff0ca] text-[#9c731c]",
      title: "text-[#8d681b]",
      dot: "bg-[#dda438]",
    };
  }

  if (accent === "purple") {
    return {
      card: "border-[#9b84dc]/25 bg-[#f8f5ff]",
      number: "border-[#9178d5]/20 bg-[#eee9ff] text-[#6c4fb2]",
      title: "text-[#674aab]",
      dot: "bg-[#8c72d6]",
    };
  }

  return {
    card: "border-[#79ad62]/25 bg-[#f4faf0]",
    number: "border-[#6da954]/20 bg-[#e7f4dd] text-[#4e8039]",
    title: "text-[#477a34]",
    dot: "bg-[#67aa4b]",
  };
}

export function SupportReasonCard({
  item,
}: SupportReasonCardProps) {
  const accent = getAccentClasses(item.accent);

  return (
    <article
      className={`group min-w-0 rounded-[clamp(0.9rem,1.5vw,1.2rem)] border p-[clamp(1rem,1.6vw,1.3rem)] shadow-[0_0.8rem_2.5rem_rgba(64,48,27,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_1.2rem_3.2rem_rgba(64,48,27,0.1)] ${accent.card}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-[clamp(2.5rem,3.8vw,3.1rem)] shrink-0 items-center justify-center rounded-[clamp(0.65rem,1vw,0.82rem)] border font-mono text-[clamp(0.78rem,1vw,0.92rem)] font-black ${accent.number}`}
        >
          {item.number}
        </span>

        <span
          className={`mt-2 size-[clamp(0.55rem,0.85vw,0.7rem)] shrink-0 rounded-full ${accent.dot}`}
        />
      </div>

      <h3
        className={`mt-[clamp(0.75rem,1.2vw,0.95rem)] text-[clamp(1.05rem,1.3vw,1.32rem)] font-black leading-[1.25] ${accent.title}`}
      >
        {item.title}
      </h3>

      <p className="mt-[clamp(0.5rem,0.85vw,0.68rem)] text-[clamp(0.84rem,0.94vw,1rem)] leading-[1.65] text-[#6f6554]">
        {item.description}
      </p>
    </article>
  );
}