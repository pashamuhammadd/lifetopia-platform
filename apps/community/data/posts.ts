import type { Post } from "@/types/post";

export const posts: Post[] = [
  {
    id: "1",
    displayName: "Pasha",
    username: "@pashamuhammad",
    avatarSrc: "/images/avatars/avatar-01.jpg",
    role: "World Creator",
    title: "Alpha Pioneer",
    category: "Developer Log",
    content:
      "Today we officially started building the Lifetopia Community Platform. This will become the central hub connecting players, Harmony Points, and the game ecosystem.",
    likes: 84,
    comments: 18,
    createdAt: "5m ago",
  },
  {
    id: "2",
    displayName: "Sky Farmer",
    username: "@skyfarmer",
    avatarSrc: "/images/avatars/avatar-02.jpg",
    role: "Lifetopian",
    title: "Master Farmer",
    category: "GM/GN",
    content:
      "Good morning Lifetopians! Hope everyone has an amazing day farming, crafting, and exploring.",
    likes: 36,
    comments: 8,
    createdAt: "18m ago",
  },
  {
    id: "3",
    displayName: "Luna",
    username: "@lunagirl",
    avatarSrc: "/images/avatars/avatar-03.jpg",
    role: "Guardian",
    title: "Early Sprout",
    category: "General",
    content:
      "Can't wait to try the Harmony Points system. I love that community activity will also matter in-game.",
    likes: 25,
    comments: 6,
    createdAt: "1h ago",
  },
];