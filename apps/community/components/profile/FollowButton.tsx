"use client";

import { Check, LoaderCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toggleCommunityFollow } from "@/app/actions/community/follows";
import { useGuestAuth } from "@/components/auth/GuestAuthProvider";
import { Button } from "@/components/ui/Button";

type FollowButtonProps = {
  targetProfileId: string;
  initialIsFollowing: boolean;
  isOwnProfile?: boolean;
  compact?: boolean;
};

export function FollowButton({
  targetProfileId,
  initialIsFollowing,
  isOwnProfile = false,
  compact = false,
}: FollowButtonProps) {
  const { isAuthenticated, requestAuth } = useGuestAuth();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (isOwnProfile) {
    return <span className="text-sm font-black text-[#4f8124]">Your profile</span>;
  }

  function onFollow() {
    if (!isAuthenticated) return requestAuth();
    setError("");
    startTransition(async () => {
      const result = await toggleCommunityFollow(targetProfileId);
      if (!result.ok) return setError(result.error);
      setIsFollowing(result.following);
      router.refresh();
    });
  }

  return (
    <div>
      <Button
        type="button"
        onClick={onFollow}
        disabled={isPending}
        aria-pressed={isFollowing}
        className={`${compact ? "px-3 py-2 text-sm" : "rounded-full"} inline-flex items-center justify-center disabled:cursor-wait disabled:opacity-60 ${
          isFollowing ? "bg-[#edf7df] text-[#4f8124] ring-1 ring-[#b8d89e]" : ""
        }`}
      >
        {isPending ? <LoaderCircle size={16} className="mr-2 animate-spin" /> : isFollowing ? <Check size={16} className="mr-2" /> : <UserPlus size={16} className="mr-2" />}
        {isFollowing ? "Following" : "Follow"}
      </Button>
      {error ? <p role="alert" className="mt-2 max-w-56 text-xs font-bold text-[#c12626]">{error}</p> : null}
    </div>
  );
}
