export const POST_CATEGORIES = [
  "GM / GN",
  "General",
  "Gameplay",
  "Community",
  "Question",
  "Guide",
  "Looking for Friends",
  "Development",
  "Events",
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const POST_CONTENT_MAX_LENGTH = 1000;
export const COMMENT_CONTENT_MAX_LENGTH = 500;

export type LifetopiaRole =
  | "World Founder"
  | "World Creator"
  | "World Guardian"
  | "World Builder"
  | "World Artist"
  | "Alpha Pioneer"
  | "Beta Pioneer"
  | "Steward"
  | "Lifetopian";

export type LifetopiaTitle =
  | "Alpha Pioneer"
  | "Early Sprout"
  | "The Dreamer"
  | "Master Farmer"
  | "Harmony Champion"
  | "Genesis Holder";

export type Post = {
  id: string;
  displayName: string;
  username: string;
  avatarSrc: string;
  role: LifetopiaRole;
  title?: LifetopiaTitle;
  category: PostCategory;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export function isPostCategory(value: string): value is PostCategory {
  return POST_CATEGORIES.includes(value as PostCategory);
}

export function normalizePostCategory(value: string | null | undefined): PostCategory {
  const normalized = value?.trim();

  if (!normalized) return "General";
  if (isPostCategory(normalized)) return normalized;

  const legacyCategoryMap: Record<string, PostCategory> = {
    "GM/GN": "GM / GN",
    Announcement: "Community",
    "Developer Log": "Development",
    Suggestion: "Question",
    Event: "Events",
  };

  return legacyCategoryMap[normalized] ?? "General";
}
