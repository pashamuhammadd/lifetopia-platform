import { Activity } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { guildActivities } from "@/data/guild";

export function GuildActivity() {
  return (
    <SectionCard
      title="Guild Activity"
      description="Recent updates from your guild."
      icon={Activity}
    >
      <div className="space-y-3">
        {guildActivities.map((item) => (
          <article key={item.id} className="rounded-[22px] bg-[#fffaf0] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-[#2f2418]">{item.title}</h3>
                <p className="mt-1 text-sm font-bold leading-6 text-[#7a5635]">
                  {item.description}
                </p>
              </div>

              <span className="shrink-0 text-xs font-black text-[#9b6635]">
                {item.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}