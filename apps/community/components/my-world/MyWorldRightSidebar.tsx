import { Gift, MessageCircle, Trophy } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { activityItems } from "@/data/my-world-layout";
import { MyWorldSectionCard } from "./MyWorldSectionCard";

export function MyWorldRightSidebar() {
  return (
    <aside className="space-y-4">
      <MyWorldSectionCard
        title="Community Activity"
        subtitle="Latest updates"
        icon={MessageCircle}
      >
        <div className="space-y-3">
          {activityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex items-center gap-3">
                <Avatar initials={item.name.charAt(0)} size={38} />
                <div className="grid size-9 place-items-center rounded-full bg-[#edf7df] text-[#4f8124]">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#2f2418]">
                    {item.name}
                  </p>
                  <p className="truncate text-xs font-bold text-[#7a5635]">
                    {item.action}
                  </p>
                </div>
                <span className="text-[11px] font-black text-[#9b6635]">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </MyWorldSectionCard>

      <MyWorldSectionCard title="Daily Quest" subtitle="+10 Harmony" icon={Gift}>
        <p className="font-black text-[#2f2418]">Share Your Thoughts</p>
        <p className="mt-1 text-sm font-bold text-[#7a5635]">
          Create 1 post in the community.
        </p>
        <div className="mt-3 flex justify-between text-xs font-black text-[#7a5635]">
          <span>0 / 1</span>
          <span>12h left</span>
        </div>
        <div className="mt-2">
          <Progress value={0} />
        </div>
      </MyWorldSectionCard>

      <MyWorldSectionCard
        title="Achievement Progress"
        subtitle="Next milestone"
        icon={Trophy}
      >
        <p className="font-black text-[#2f2418]">Harmony Beginner</p>
        <p className="mt-1 text-sm font-bold text-[#7a5635]">
          Earn 1,000 Harmony Points.
        </p>
        <div className="mt-3">
          <Progress value={75} />
        </div>
      </MyWorldSectionCard>
    </aside>
  );
}