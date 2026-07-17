export type RoadmapStatus =
  | "Completed"
  | "Current"
  | "Planned"
  | "Future";

export type RoadmapItem = {
  id: string;
  phase: string;
  title: string;
  status: RoadmapStatus;
  description: string;
  items: string[];
};