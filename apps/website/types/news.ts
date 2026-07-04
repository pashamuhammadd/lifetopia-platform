export type NewsStatus = "draft" | "published";

export type NewsCategory = "Announcement" | "Community" | "Development";

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: NewsCategory;
  status: NewsStatus;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
};