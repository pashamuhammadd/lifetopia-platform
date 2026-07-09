import { PageHeader } from "@/components/ui/PageHeader";
import { LogoutSection } from "./LogoutSection";
import { NotificationSettings } from "./NotificationSettings";
import { ProfileSettings } from "./ProfileSettings";
import { SecuritySettings } from "./SecuritySettings";

export function Settings() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Settings"
        description="Manage your Lifetopia account, profile, notifications, and security."
      />

      <ProfileSettings />
      <NotificationSettings />
      <SecuritySettings />
      <LogoutSection />
    </div>
  );
}