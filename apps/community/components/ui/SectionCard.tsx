import type { LucideIcon } from "lucide-react";

import { Card } from "./Card";

type SectionCardProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: SectionCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        {Icon ? <Icon size={20} className="text-[#4f8124]" /> : null}
        <div>
          <h2 className="text-xl font-black text-[#2f2418]">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm font-bold text-[#7a5635]">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </Card>
  );
}