import { Bell } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";

const items = [
  "Likes on your posts",
  "Comments and replies",
  "New followers",
  "Quest rewards",
  "Guild activity",
];

export function NotificationSettings() {
  return (
    <SectionCard
      title="Notifications"
      description="Choose what updates you want to receive."
      icon={Bell}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex items-center justify-between rounded-[20px] bg-[#fffaf0] p-4"
          >
            <span className="font-black text-[#2f2418]">{item}</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </label>
        ))}
      </div>
    </SectionCard>
  );
}