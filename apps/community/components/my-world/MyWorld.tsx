import { MyWorldCommunityStats } from "./MyWorldCommunityStats";
import { MyWorldHeader } from "./MyWorldHeader";
import { MyWorldHero } from "./MyWorldHero";
import { MyWorldMainGrid } from "./MyWorldMainGrid";
import { MyWorldRightSidebar } from "./MyWorldRightSidebar";

export function MyWorld() {
  return (
    <div className="pb-24 md:pb-0">
      <MyWorldHeader />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="space-y-4">
          <MyWorldHero />
          <MyWorldMainGrid />
          <MyWorldCommunityStats />
        </div>

        <MyWorldRightSidebar />
      </div>
    </div>
  );
}