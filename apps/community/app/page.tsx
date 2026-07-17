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
    tag?: string | string[];
  }>;
};

function firstValue(
  value: string | string[] | undefined,
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

function parsePage(
  value: string | string[] | undefined,
) {
  const parsed = Number.parseInt(
    firstValue(value) ?? "1",
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
  const tag = firstValue(params.tag);

  return (
    <AppLayout>
      <Feed
        page={page}
        tag={tag}
      />
    </AppLayout>
  );
}
