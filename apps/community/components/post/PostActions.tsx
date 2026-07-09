"use client";

import { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

type PostActionsProps = {
  likes: number;
  comments: number;
};

export function PostActions({
  likes,
  comments,
}: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-6 border-t border-[#f2e7c8] py-4">
      <button
        onClick={() => setLiked(!liked)}
        className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <Heart
          size={18}
          className={
            liked
              ? "fill-red-500 text-red-500"
              : ""
          }
        />

        <span>{likes}</span>
      </button>

      <button className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]">
        <MessageCircle size={18} />
        <span>{comments}</span>
      </button>

      <button
        onClick={() => setSaved(!saved)}
        className="ml-auto flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]"
      >
        <Bookmark
          size={18}
          className={
            saved
              ? "fill-[#4f8124] text-[#4f8124]"
              : ""
          }
        />

        <span>Save</span>
      </button>

      <button className="flex items-center gap-2 text-sm font-black text-[#7a5635] transition hover:text-[#4f8124]">
        <Share2 size={18} />
        <span>Share</span>
      </button>
    </div>
  );
}