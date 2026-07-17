import type { Metadata } from "next";

import { Guild } from "@/components/guild/Guild";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Guilds",
  description:
    "Follow the development of Lifetopia Guilds, shared groups that will connect community participation with the game world.",
  alternates: {
    canonical: "/guild",
  },
  openGraph: {
    title: "Lifetopia Guilds",
    description:
      "Shared Lifetopia groups connecting community participation with the game world.",
    url: "/guild",
  },
};

export default function GuildPage() {
  return (
    <AppLayout>
      <Guild />
    </AppLayout>
  );
}
