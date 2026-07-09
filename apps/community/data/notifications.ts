export type NotificationType =
  | "like"
  | "comment"
  | "follow"
  | "quest"
  | "announcement";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "Sky Farmer liked your post",
    description: "Building the Lifetopia Community Platform",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    type: "comment",
    title: "Luna commented on your post",
    description: "The new community platform looks awesome!",
    time: "18m ago",
    unread: true,
  },
  {
    id: "3",
    type: "follow",
    title: "Raven followed you",
    description: "Raven is now following your Lifetopia journey.",
    time: "1h ago",
    unread: false,
  },
  {
    id: "4",
    type: "quest",
    title: "Quest completed",
    description: "You earned +10 Harmony from Share Your Thoughts.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "5",
    type: "announcement",
    title: "New Lifetopia announcement",
    description: "Community Beta updates are now available.",
    time: "Yesterday",
    unread: false,
  },
];