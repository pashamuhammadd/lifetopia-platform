import { UserPlus } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { SectionCard } from "@/components/ui/SectionCard";
import { suggestedLifetopians } from "@/data/explore";

export function SuggestedLifetopians() {
  return (
    <SectionCard
      title="Suggested Lifetopians"
      description="Find active players and builders."
      icon={UserPlus}
    >
      <div className="space-y-4">
        {suggestedLifetopians.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <Avatar
              initials={user.name.charAt(0)}
              src={user.avatarSrc}
              alt={user.name}
              size={48}
            />

            <div className="min-w-0 flex-1">
              <p className="font-black text-[#2f2418]">{user.name}</p>
              <p className="text-sm font-bold text-[#7a5635]">
                {user.username} · {user.title}
              </p>
            </div>

            <button className="rounded-full bg-[#edf7df] px-4 py-2 text-xs font-black text-[#4f8124]">
              Follow
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}