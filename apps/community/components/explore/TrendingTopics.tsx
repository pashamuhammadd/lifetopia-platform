import { Flame } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { trendingTopics } from "@/data/explore";

export function TrendingTopics() {
  return (
    <SectionCard
      title="Trending Topics"
      description="Popular conversations across Lifetopia."
      icon={Flame}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {trendingTopics.map((topic) => (
          <button
            key={topic.id}
            className="rounded-[22px] bg-[#fffaf0] p-4 text-left transition hover:bg-[#edf7df]"
          >
            <p className="font-black text-[#4f8124]">{topic.label}</p>
            <p className="mt-1 text-sm font-bold text-[#7a5635]">
              {topic.posts}
            </p>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}