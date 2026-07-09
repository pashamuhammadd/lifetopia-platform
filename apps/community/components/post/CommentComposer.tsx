import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function CommentComposer() {
  return (
    <div className="flex gap-3">
      <input
        placeholder="Write a comment..."
        className="h-11 flex-1 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-bold outline-none focus:border-[#6fa83a]"
      />

      <Button className="rounded-full px-5">
        <Send size={17} />
      </Button>
    </div>
  );
}