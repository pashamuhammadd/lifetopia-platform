import { PageHeader } from "@/components/ui/PageHeader";
import { SuggestedLifetopians } from "./SuggestedLifetopians";
import { TrendingPosts } from "./TrendingPosts";
import { TrendingTopics } from "./TrendingTopics";

export function Explore() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Explore"
        description="Discover trending posts, topics, and Lifetopians."
      />

      <TrendingTopics />
      <TrendingPosts />
      <SuggestedLifetopians />
    </div>
  );
}