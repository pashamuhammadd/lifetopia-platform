export type PostCategory =
  | "General"
  | "GM/GN"
  | "Announcement"
  | "Developer Log"
  | "Suggestion"
  | "Event";

export type LifetopiaRole =
  | "World Creator"
  | "World Builder"
  | "Guardian"
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