import { mainCards } from "@/data/my-world-layout";
import { MyWorldStatCard } from "./MyWorldStatCard";

export function MyWorldMainGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {mainCards.map((card) => (
        <MyWorldStatCard key={card.id} {...card} />
      ))}
    </div>
  );
}