import { MessageCircle } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { trendingPosts } from "@/data/explore";

export function TrendingPosts() {
  return (
    <SectionCard
      title="Trending Posts"
      description="Posts getting attention from Lifetopians."
      icon={MessageCircle}
    >
      <div className="space-y-3">
        {trendingPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-[22px] bg-[#fffaf0] p-4 transition hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#e8f3ff] px-3 py-1 text-[11px] font-black text-[#2f73c9]">
                {post.category}
              </span>
              <span className="text-xs font-bold text-[#9b6635]">
                by {post.author}
              </span>
            </div>

            <h3 className="mt-2 font-black leading-snug text-[#2f2418]">
              {post.title}
            </h3>

            <p className="mt-2 text-sm font-bold text-[#7a5635]">
              {post.engagement}
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}