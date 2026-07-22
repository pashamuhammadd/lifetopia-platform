import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { MessageThread } from "@/components/messages/MessageThread";
import { requireCurrentProfile } from "@/data/auth/require-current-profile";
import { getMessageThread } from "@/data/messages";
export const metadata: Metadata = {
  title: "Conversation",
  robots: { index: false, follow: false },
};
export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  await requireCurrentProfile("/messages");
  const { conversationId } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(conversationId)) notFound();
  const thread = await getMessageThread(conversationId);
  if (!thread) notFound();
  return (
    <AppLayout>
      <MessageThread {...thread} />
    </AppLayout>
  );
}
