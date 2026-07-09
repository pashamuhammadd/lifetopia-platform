import { Search } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { conversations } from "@/data/messages";

export function ConversationList() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#ead9b8] p-4">
        <label className="flex h-11 items-center gap-3 rounded-[16px] border border-[#ead9b8] bg-[#fffaf0] px-4">
          <Search size={18} className="text-[#7a5635]" />
          <input
            placeholder="Search messages..."
            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-[#9b6635]/70"
          />
        </label>
      </div>

      <div className="divide-y divide-[#f2e7c8]">
        {conversations.map((conversation, index) => (
          <button
            key={conversation.id}
            className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#fffaf0] ${
              index === 0 ? "bg-[#edf7df]/70" : ""
            }`}
          >
            <Avatar
              initials={conversation.name.charAt(0)}
              src={conversation.avatar}
              alt={conversation.name}
              size={48}
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate font-black text-[#2f2418]">
                  {conversation.name}
                </p>

                <span className="shrink-0 text-xs font-bold text-[#9b6635]">
                  {conversation.time}
                </span>
              </div>

              <p className="mt-1 truncate text-sm font-bold text-[#7a5635]">
                {conversation.lastMessage}
              </p>
            </div>

            {conversation.unread > 0 ? (
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#4f8124] text-xs font-black text-white">
                {conversation.unread}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </Card>
  );
}