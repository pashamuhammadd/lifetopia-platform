import type { Metadata } from "next";
import { Explore } from "@/components/explore/Explore";
import { AppLayout } from "@/components/layout/AppLayout";
import { searchExplore } from "@/data/explore-search";

export const metadata: Metadata = { title: "Explore", description: "Search public Lifetopia conversations and Lifetopians.", alternates: { canonical: "/explore" } };
export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string; page?: string }> }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 80);
  const tab = params.type === "people" ? "people" as const : "posts" as const;
  const parsedPage = Number.parseInt(params.page ?? "1", 10); const page = Number.isFinite(parsedPage) ? Math.max(1, Math.min(parsedPage, 100)) : 1;
  const results = await searchExplore(query, tab, page);
  return <AppLayout><Explore query={query} tab={tab} page={page} {...results} /></AppLayout>;
}
