import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";

export default function MessagesPage() {
  return (
    <AppLayout>
      <Card className="p-6">
        <h1 className="text-3xl font-black text-[#2f2418]">Messages</h1>

        <p className="mt-2 font-bold text-[#7a5635]">
          Stay connected with your friends, guild members, and fellow
          Lifetopians.
        </p>
      </Card>
    </AppLayout>
  );
}