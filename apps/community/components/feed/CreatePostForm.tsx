"use client";

import {
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  useRef,
  useState,
  useTransition,
} from "react";

import { createCommunityPost } from "@/app/actions/community/posts";
import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  POST_CATEGORIES,
  POST_CONTENT_MAX_LENGTH,
  type PostCategory,
} from "@/types/post";
import { categoryStyles } from "@/data/identity";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const [category, setCategory] =
    useState<PostCategory>("General");
  const [isPending, startTransition] =
    useTransition();
  const { requestAuth } = useGuestAuth();

  const categoryStyle =
    categoryStyles[category];
  const CategoryIcon = categoryStyle.icon;

  function requestLoginForGuest() {
    if (!isAuthenticated) {
      requestAuth();
      return true;
    }

    return false;
  }

  function handleSubmit(formData: FormData) {
    if (requestLoginForGuest()) {
      return;
    }

    setMessage("");
    setIsSuccess(false);

    startTransition(async () => {
      const result =
        await createCommunityPost(formData);

      setMessage(result.message);
      setIsSuccess(result.success);

      if (result.success) {
        formRef.current?.reset();
        setContentLength(0);
        setCategory("General");
      }
    });
  }

  return (
    <div
      id="create-post"
      className="scroll-mt-28"
    >
      <Card className="overflow-hidden">
        <div className="border-b border-[#f2e7c8] bg-gradient-to-r from-[#dff7ff] via-[#fff7e8] to-[#edf7df] px-5 py-4 sm:px-6">
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
                maxLength={
                  POST_CONTENT_MAX_LENGTH
                }
                readOnly={!isAuthenticated}
                onClick={requestLoginForGuest}
                onFocus={requestLoginForGuest}
                onChange={(event) =>
                  setContentLength(
                    event.currentTarget.value
                      .length,
                  )
                }
                placeholder={
                  isAuthenticated
                    ? "What's happening in your world today?"
                    : "Login to share your Lifetopia story..."
                }
                className="min-h-24 w-full resize-none rounded-[20px] border border-[#ead9b8] bg-[#fffaf0] p-4 text-sm font-semibold outline-none transition focus:border-[#6fa83a] focus:bg-white sm:min-h-28 sm:text-[15px]"
              />

              <div className="mt-1 flex justify-end">
                <span
                  className={`text-xs font-black ${
                    contentLength >
                    POST_CONTENT_MAX_LENGTH *
                      0.9
                      ? "text-[#b35b38]"
                      : "text-[#9b866d]"
                  }`}
                >
                  {contentLength}/
                  {POST_CONTENT_MAX_LENGTH}
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <label className="relative min-w-0">
                  <span className="sr-only">
                    Post category
                  </span>

                  <CategoryIcon
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#6b5b4a]"
                  />

                  <select
                    name="category"
                    value={category}
                    disabled={!isAuthenticated}
                    onClick={() => {
                      requestLoginForGuest();
                    }}
                    onChange={(event) =>
                      setCategory(
                        event.currentTarget
                          .value as PostCategory,
                      )
                    }
                    className={`h-11 w-full appearance-none rounded-full border pl-9 pr-9 text-sm font-black outline-none transition focus:ring-2 focus:ring-[#6fa83a]/25 disabled:cursor-pointer ${categoryStyle.className}`}
                  >
                    {POST_CATEGORIES.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ),
                    )}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5b4a]"
                  />
                </label>

                <Button
                  disabled={
                    isPending ||
                    !isAuthenticated
                  }
                  className="min-h-11"
                >
                  {isPending
                    ? "Publishing..."
                    : "Post"}
                </Button>
              </div>

              {message ? (
                <div
                  role={
                    isSuccess
                      ? "status"
                      : "alert"
                  }
                  className={`mt-3 flex items-start gap-2 rounded-[16px] px-4 py-2.5 text-sm font-black ${
                    isSuccess
                      ? "bg-[#edf7df] text-[#4f8124]"
                      : "bg-[#fff0f0] text-[#b84242]"
                  }`}
                >
                  {isSuccess ? (
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                    />
                  ) : null}

                  <span>{message}</span>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
