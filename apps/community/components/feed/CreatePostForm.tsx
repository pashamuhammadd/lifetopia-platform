"use client";

import { Sparkles } from "lucide-react";
import { useRef, useState, useTransition } from "react";

import { createCommunityPost } from "@/app/actions/community/posts";
import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type CreatePostFormProps = {
  displayName: string;
  avatarSrc?: string;
  isAuthenticated: boolean;
};

export function CreatePostForm({
  displayName,
  avatarSrc,
  isAuthenticated,
}: CreatePostFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { requestAuth } = useGuestAuth();

  function handleSubmit(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const result = await createCommunityPost(formData);
      setMessage(result.message);

      if (result.success) {
        formRef.current?.reset();
      }
    });
  }

  return (
    <div id="create-post" className="scroll-mt-28">
      <Card className="overflow-hidden">
        <div className="border-b border-[#f2e7c8] bg-gradient-to-r from-[#dff7ff] via-[#fff7e8] to-[#edf7df] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#4f8124]" />
            <p className="font-black text-[#2f2418]">Share your adventure</p>
          </div>
        </div>

        <form
          ref={formRef}
          action={handleSubmit}
          onSubmit={(event) => {
            if (!isAuthenticated) {
              event.preventDefault();
              requestAuth();
            }
          }}
          className="p-4 sm:p-6"
        >
          <div className="flex gap-3 sm:gap-4">
            <Avatar
              initials={displayName.charAt(0)}
              src={avatarSrc}
              alt={displayName}
              size={52}
            />

            <div className="min-w-0 flex-1">
              <textarea
                name="content"
                required
                maxLength={1000}
                placeholder={
                  isAuthenticated
                    ? "What's happening in your world today?"
                    : "Login to share your Lifetopia story..."
                }
                className="min-h-24 w-full resize-none rounded-[20px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-sm font-semibold outline-none transition focus:border-[#6fa83a] focus:bg-white sm:min-h-28 sm:text-[15px]"
              />

              <input type="hidden" name="category" value="General" />

              {message ? (
                <p className="mt-3 rounded-[16px] bg-[#fffaf0] px-4 py-2 text-sm font-black text-[#7a5635]">
                  {message}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <Badge>General</Badge>

                <Button disabled={isPending}>
                  {isPending ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
