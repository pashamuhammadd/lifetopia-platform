import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";

export default function ExplorePage() {
  return (
    <AppLayout>
      <Card className="p-6">
        <h1 className="text-3xl font-black text-[#2f2418]">Explore</h1>
        <p className="mt-2 font-bold text-[#7a5635]">
          Discover trending posts, tags, and Lifetopians.
        </p>
      </Card>
    </AppLayout>
  );
}