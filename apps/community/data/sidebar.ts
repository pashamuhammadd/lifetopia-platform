import type {
  DailyQuestItem,
  SuggestedPlayer,
  TrendItem,
} from "@/types/sidebar";

export const trends: TrendItem[] = [
  {
    id: "1",
    label: "#HarmonyPoints",
    posts: "128 posts",
  },
  {
    id: "2",
    label: "#LifetopiaBeta",
    posts: "96 posts",
  },
  {
    id: "3",
    label: "#GMGN",
    posts: "74 posts",
  },
];

export const dailyQuests: DailyQuestItem[] = [
  {
    id: "1",
    label: "Like 3 posts",
    completed: false,
  },
  {
    id: "2",
    label: "Comment once",
    completed: false,
  },
  {
    id: "3",
    label: "Create 1 post",
    completed: false,
  },
];

export const suggestedPlayers: SuggestedPlayer[] = [
  {
    id: "1",
    name: "Sky Farmer",
    username: "@skyfarmer",
    initials: "S",
  },
  {
    id: "2",
    name: "Luna",
    username: "@lunagirl",
    initials: "L",
  },
];