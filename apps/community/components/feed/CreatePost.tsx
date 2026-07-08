import {
  ImagePlus,
  SmilePlus,
  Sparkles,
} from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function CreatePost() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#f2e7c8] bg-gradient-to-r from-[#dff7ff] via-[#fff7e8] to-[#edf7df] px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles
            size={18}
            className="text-[#4f8124]"
          />

          <p className="font-black text-[#2f2418]">
            Share your adventure
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4">
          <Avatar initials="P" size={52} />

          <div className="min-w-0 flex-1">
            <textarea
              placeholder="What's happening in your world today?"
              className="min-h-28 w-full resize-none rounded-[20px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-[15px] font-semibold outline-none transition focus:border-[#6fa83a] focus:bg-white"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>General</Badge>

                <button className="flex items-center gap-2 rounded-full bg-[#fff7e8] px-3 py-2 text-xs font-black text-[#7a5635] transition hover:bg-[#edf7df]">
                  <ImagePlus size={15} />
                  Image
                </button>

                <button className="flex items-center gap-2 rounded-full bg-[#fff7e8] px-3 py-2 text-xs font-black text-[#7a5635] transition hover:bg-[#edf7df]">
                  <SmilePlus size={15} />
                  Emoji
                </button>
              </div>

              <Button>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}