import type { NewsItem } from "@/types/news";

export const newsItems: NewsItem[] = [
  {
    id: "lifetopia-world-platform",
    title: "Lifetopia World Platform Is Coming Soon",
    slug: "lifetopia-world-platform-is-coming-soon",
    excerpt:
      "A cozy fantasy platform where Lifetopians can explore updates, connect with the community, and follow the journey of a better world.",
    category: "Announcement",
    publishedAt: "2026-07-04",
    image: "/images/news/lifetopia-platform.webp",
  },
  {
    id: "community-first-world",
    title: "Building A Community-First World",
    slug: "building-a-community-first-world",
    excerpt:
      "Lifetopia World is being designed as a social sandbox where players can create, connect, and grow together inside a warm fantasy universe.",
    category: "Community",
    publishedAt: "2026-07-04",
    image: "/images/news/community-world.webp",
  },
  {
    id: "development-journey",
    title: "The Development Journey Continues",
    slug: "the-development-journey-continues",
    excerpt:
      "Follow the latest progress as Lifetopia World grows from landing page, authentication, dashboard, wallet, inventory, and future game integration.",
    category: "Development",
    publishedAt: "2026-07-04",
    image: "/images/news/development-journey.webp",
  },
];

export function getLatestNews(limit = 3): NewsItem[] {
  return newsItems.slice(0, limit);
}
