"use client";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { markNotificationsRead } from "@/app/actions/community/notifications";
export function MarkAllReadButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await markNotificationsRead();
          router.refresh();
        })
      }
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4f8124] px-5 text-sm font-black text-white disabled:opacity-60"
    >
      <CheckCheck size={17} />
      {pending ? "Updating…" : "Mark all read"}
    </button>
  );
}
