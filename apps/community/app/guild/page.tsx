import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";

export default function GuildPage() {
  return (
    <AppLayout>
      <Card className="p-6">
        <h1 className="text-3xl font-black text-[#2f2418]">Guild</h1>

        <p className="mt-2 font-bold text-[#7a5635]">
          Join a guild, complete cooperative quests, and build your community
          together.
        </p>
      </Card>
    </AppLayout>
  );
}