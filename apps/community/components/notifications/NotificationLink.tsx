"use client";

import type { ReactNode } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markNotificationsRead } from "@/app/actions/community/notifications";

export function NotificationLink({
  children,
  href,
  notificationId,
  read,
}: {
  children: ReactNode;
  href: string;
  notificationId: string;
  read: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="block w-full text-left disabled:cursor-wait"
      disabled={pending}
      onClick={() => {
        if (read) {
          router.push(href);
          return;
        }

        startTransition(async () => {
          await markNotificationsRead(notificationId);
          router.push(href);
          router.refresh();
        });
      }}
    >
      {children}
    </button>
  );
}
