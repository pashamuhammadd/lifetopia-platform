import type { MyWorldActivity, MyWorldStat } from "@/types/my-world";

export const myWorldStats: MyWorldStat[] = [
  {
    id: "harmony",
    label: "Harmony Points",
    value: "24,530",
    helper: "+120 today",
  },
  {
    id: "coin",
    label: "COIN",
    value: "12,500",
    helper: "Game currency",
  },
  {
    id: "inventory",
    label: "Inventory",
    value: "8 / 24",
    helper: "Slots used",
  },
  {
    id: "achievements",
    label: "Achievements",
    value: "23 / 120",
    helper: "Unlocked",
  },
];

export const myWorldActivities: MyWorldActivity[] = [
  {
    id: "1",
    name: "Luna",
    action: "created a new post",
    time: "2m ago",
  },
  {
    id: "2",
    name: "Sky Farmers",
    action: "completed a guild quest",
    time: "1h ago",
  },
  {
    id: "3",
    name: "Raven",
    action: "liked your post",
    time: "2h ago",
  },
];