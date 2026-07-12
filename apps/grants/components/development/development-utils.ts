import { RoadmapStatus } from "./development-data";

export function getRoadmapAccent(
  accent: "green" | "blue" | "gold",
) {
  switch (accent) {
    case "blue":
      return {
        border: "border-[#69afe2]/25",
        soft: "bg-[#eef7fd]",
        chip: "bg-[#d8ecfb]",
        text: "text-[#2b76ad]",
        progress: "bg-[#3d90ce]",
      };

    case "gold":
      return {
        border: "border-[#e4b259]/25",
        soft: "bg-[#fff5e6]",
        chip: "bg-[#fde9c5]",
        text: "text-[#b97914]",
        progress: "bg-[#de9824]",
      };

    default:
      return {
        border: "border-[#79b35b]/25",
        soft: "bg-[#eef7e7]",
        chip: "bg-[#dff0d0]",
        text: "text-[#4f8b34]",
        progress: "bg-[#5a9b3c]",
      };
  }
}

export function getStatusStyle(status: RoadmapStatus) {
  switch (status) {
    case "Delivered":
      return {
        badge: "bg-[#dff3d6] text-[#3e7d28]",
        label: "Delivered",
      };

    case "Building":
      return {
        badge: "bg-[#e7f3ff] text-[#2e79af]",
        label: "Building",
      };

    default:
      return {
        badge: "bg-[#fff3d8] text-[#b97b17]",
        label: "Planned",
      };
  }
}

export function getProgressLabel(progress: number) {
  if (progress >= 100) return "Completed";
  if (progress >= 75) return "Near Completion";
  if (progress >= 35) return "In Development";
  if (progress > 0) return "Getting Started";

  return "Not Started";
}