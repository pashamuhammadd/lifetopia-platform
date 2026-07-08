import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <AppLayout>
      <Card className="p-6">
        <h1 className="text-3xl font-black text-[#2f2418]">Settings</h1>

        <p className="mt-2 font-bold text-[#7a5635]">
          Manage your account, profile, privacy, notifications, and connected
          services.
        </p>
      </Card>
    </AppLayout>
  );
}