import type { LucideIcon } from "lucide-react";

type MyWorldSectionCardProps = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export function MyWorldSectionCard({
  title,
  subtitle,
  icon: Icon,
  children,
}: MyWorldSectionCardProps) {
  return (
    <section className="rounded-[26px] border border-[#ead9b8] bg-white/85 p-5 shadow-[0_16px_38px_rgba(88,60,28,0.08)]">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-[16px] bg-[#edf7df] text-[#4f8124]">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="font-black text-[#2f2418]">{title}</h3>
          {subtitle ? (
            <p className="text-xs font-bold text-[#7a5635]">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}