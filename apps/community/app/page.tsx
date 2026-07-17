import type { Metadata } from "next";

import { Feed } from "@/components/feed/Feed";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

type CommunityHomePageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

function parsePage(
  value: string | string[] | undefined,
) {
  const rawValue = Array.isArray(value)
    ? value[0]
    : value;

  const parsed = Number.parseInt(
    rawValue ?? "1",
    10,
  );

  return Number.isFinite(parsed)
    ? Math.max(1, parsed)
    : 1;
}

export default async function CommunityHomePage({
  searchParams,
}: CommunityHomePageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);

  return (
    <AppLayout>
      <Feed page={page} />
    </AppLayout>
  );
}
