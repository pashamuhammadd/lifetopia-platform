import type { NewsItem } from "@/types/news";

export const newsItems: NewsItem[] = [
  {
    id: "lifetopia-world-platform",
    title: "Lifetopia World Platform Is Coming Soon",
    slug: "lifetopia-world-platform-is-coming-soon",
    excerpt:
      "A cozy fantasy platform where Lifetopians can explore updates, connect with the community, and follow the journey of a better world.",
    category: "Announcement",
    status: "published",
    publishedAt: "2026-07-04",
    createdAt: "2026-07-04",
    updatedAt: "2026-07-04",
    author: "Lifetopia World Team",
    image: "/images/news/lifetopia-platform.webp",
    seoTitle: "Lifetopia World Platform Is Coming Soon",
    seoDescription:
      "A cozy fantasy platform for Lifetopians to follow updates, connect with the community, and grow together.",
  },
  {
    id: "community-first-world",
    title: "Building A Community-First World",
    slug: "building-a-community-first-world",
    excerpt:
      "Lifetopia World is being designed as a social sandbox where players can create, connect, and grow together inside a warm fantasy universe.",
    category: "Community",
    status: "published",
    publishedAt: "2026-07-04",
    createdAt: "2026-07-04",
    updatedAt: "2026-07-04",
    author: "Lifetopia World Team",
    image: "/images/news/community-world.webp",
    seoTitle: "Building A Community-First World",
    seoDescription:
      "Lifetopia World is designed as a warm social sandbox where players can create, connect, and grow together.",
  },
  {
    id: "development-journey",
    title: "The Development Journey Continues",
    slug: "the-development-journey-continues",
    excerpt:
      "Follow the latest progress as Lifetopia World grows from landing page, authentication, dashboard, wallet, inventory, and future game integration.",
    category: "Development",
    status: "published",
    publishedAt: "2026-07-04",
    createdAt: "2026-07-04",
    updatedAt: "2026-07-04",
    author: "Lifetopia World Team",
    image: "/images/news/development-journey.webp",
    seoTitle: "The Development Journey Continues",
    seoDescription:
      "Follow Lifetopia World development progress from landing page to authentication, dashboard, wallet, inventory, and game integration.",
  },
];

export function getPublishedNews(): NewsItem[] {
  return newsItems
    .filter((item) => item.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    );
}

export function getLatestNews(limit = 3): NewsItem[] {
  return getPublishedNews().slice(0, limit);
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getPublishedNews().find((item) => item.slug === slug);
}