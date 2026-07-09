import { ImagePlus, Send, SmilePlus } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { messages } from "@/data/messages";
import { MessageBubble } from "./MessageBubble";

export function ChatWindow() {
  return (
    <Card className="flex min-h-[620px] flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-[#ead9b8] p-4">
        <Avatar
          initials="S"
          src="/images/avatars/avatar-02.jpg"
          alt="Sky Farmer"
          size={48}
        />

        <div className="min-w-0 flex-1">
          <p className="font-black text-[#2f2418]">Sky Farmer</p>
          <p className="text-sm font-bold text-[#4f8124]">Online</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#fffaf0]/50 p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t border-[#ead9b8] p-4">
        <div className="flex items-end gap-3">
          <button className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fffaf0] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]">
            <ImagePlus size={20} />
          </button>

          <button className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fffaf0] text-[#7a5635] transition hover:bg-[#edf7df] hover:text-[#4f8124]">
            <SmilePlus size={20} />
          </button>

          <textarea
            placeholder="Write a message..."
            className="min-h-11 flex-1 resize-none rounded-[18px] border border-[#ead9b8] bg-[#fffaf0] px-4 py-3 text-sm font-bold outline-none focus:border-[#6fa83a] focus:bg-white"
          />

          <Button className="grid size-11 shrink-0 place-items-center rounded-full p-0">
            <Send size={19} />
          </Button>
        </div>
      </div>
    </Card>
  );
}