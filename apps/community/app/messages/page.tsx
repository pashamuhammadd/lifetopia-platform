import type { Metadata } from "next";

import { AppLayout } from "@/components/layout/AppLayout";
import { Messages } from "@/components/messages/Messages";

export const metadata: Metadata = {
  title: "Messages",
  description: "Private messaging for Lifetopia Community is in preparation.",
  alternates: {
    canonical: "/messages",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MessagesPage() {
  return (
    <AppLayout>
      <Messages />
    </AppLayout>
  );
}
