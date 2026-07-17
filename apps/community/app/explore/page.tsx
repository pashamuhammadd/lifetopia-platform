import type { Metadata } from "next";

import { Explore } from "@/components/explore/Explore";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover public Lifetopia conversations, community topics, and Lifetopians across the official social platform.",
  alternates: {
    canonical: "/explore",
  },
  openGraph: {
    title: "Explore Lifetopia Community",
    description:
      "Discover public Lifetopia conversations, community topics, and Lifetopians.",
    url: "/explore",
  },
};

export default function ExplorePage() {
  return (
    <AppLayout>
      <Explore />
    </AppLayout>
  );
}
