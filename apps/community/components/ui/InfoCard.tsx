import type { LucideIcon } from "lucide-react";

type InfoCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "green" | "gold" | "blue" | "purple" | "orange" | "pink";
};

const toneStyles = {
  green: "bg-[#edf7df] text-[#4f8124]",
  gold: "bg-[#fff4dc] text-[#b87912]",
  blue: "bg-[#e8f3ff] text-[#2f73c9]",
  purple: "bg-[#f3edff] text-[#6d4cc2]",
  orange: "bg-[#fff0df] text-[#c06a1d]",
  pink: "bg-[#fff0f6] text-[#c24174]",
};

export function InfoCard({
  title,
  description,
  icon: Icon,
  tone = "green",
}: InfoCardProps) {
  return (
    <div className="rounded-[22px] bg-[#fffaf0] p-4 transition hover:bg-white">
      <div
        className={`grid size-12 place-items-center rounded-[18px] ${toneStyles[tone]}`}
      >
        <Icon size={24} />
      </div>

      <h3 className="mt-3 font-black text-[#2f2418]">{title}</h3>
      <p className="mt-1 text-sm font-bold leading-6 text-[#7a5635]">
        {description}
      </p>
    </div>
  );
}