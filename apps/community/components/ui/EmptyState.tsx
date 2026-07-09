import type { LucideIcon } from "lucide-react";

import { Card } from "./Card";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-[20px] bg-[#edf7df] text-[#4f8124]">
        <Icon size={28} />
      </div>

      <h2 className="mt-4 text-xl font-black text-[#2f2418]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md font-bold leading-7 text-[#7a5635]">
        {description}
      </p>
    </Card>
  );
}