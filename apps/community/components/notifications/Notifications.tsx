import { Bell } from "lucide-react";

import { FeaturePreparation } from "@/components/system/FeaturePreparation";

export function Notifications() {
  return (
    <FeaturePreparation
      title="Notifications"
      description="Important updates connected to your Lifetopia identity."
      eyebrow="Version One"
      icon={Bell}
      note="The first real notification release will focus only on official announcements and comment replies. Demonstration likes, follows, quest rewards, and unread counters have been removed."
      features={[
        "Official Lifetopia announcements",
        "Replies to your community comments",
        "Accurate read and unread state",
        "Notification preferences after the core feed is stable",
      ]}
    />
  );
}
