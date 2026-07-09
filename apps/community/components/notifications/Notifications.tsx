import { Bell } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { notifications } from "@/data/notifications";
import { NotificationItem } from "./NotificationItem";

export function Notifications() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Notifications"
        description="Track likes, comments, follows, quest rewards, and announcements."
      />

      <SectionCard
        title="Recent Notifications"
        description="Everything happening around your Lifetopia identity."
        icon={Bell}
      >
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}