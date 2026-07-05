export type RoadmapItem = {
  phase: string;
  title: string;
  status: "Completed" | "In Progress" | "Next" | "Future";
  description: string;
  items: string[];
};
