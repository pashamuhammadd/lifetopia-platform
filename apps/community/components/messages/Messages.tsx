import { PageHeader } from "@/components/ui/PageHeader";
import { ChatWindow } from "./ChatWindow";
import { ConversationList } from "./ConversationList";

export function Messages() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Messages"
        description="Chat with friends, guild members, and fellow Lifetopians."
      />

      <div className="grid min-h-[620px] gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <ConversationList />
        <ChatWindow />
      </div>
    </div>
  );
}