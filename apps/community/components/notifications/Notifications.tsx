import { Bell, MessageCircleReply, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import type { CommunityNotification } from "@/data/notifications";
import { MarkAllReadButton } from "./NotificationActions";
import { NotificationLink } from "./NotificationLink";
export function Notifications({ notifications }: { notifications: CommunityNotification[] }) {
  const unread = notifications.filter((item) => !item.read).length;
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Notifications"
        description="Official Lifetopia announcements and replies to your community comments."
      />
      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-black text-[#2f2418]">{unread} unread</p>
          <p className="text-sm font-bold text-[#7a5635]">Only real account events appear here.</p>
        </div>
        {unread ? <MarkAllReadButton /> : null}
      </Card>
      {notifications.length ? (
        <div className="space-y-3">
          {notifications.map((item) => {
            const Icon = item.type === "official_announcement" ? Megaphone : MessageCircleReply;
            return (
              <NotificationLink
                key={item.id}
                href={item.href}
                notificationId={item.id}
                read={item.read}
              >
                <Card
                  className={`flex gap-4 p-4 sm:p-5 ${item.read ? "opacity-75" : "border-[#b8d89e] bg-[#f8fff2]"}`}
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#edf7df] text-[#4f8124]">
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-black text-[#2f2418]">{item.title}</h2>
                      {!item.read ? (
                        <span className="size-2 rounded-full bg-[#4f8124]" aria-label="Unread" />
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-3 text-sm font-bold leading-6 text-[#7a5635]">
                      {item.body}
                    </p>
                    <time className="mt-2 block text-xs font-black text-[#9b6635]">
                      {new Date(item.createdAt).toLocaleString("en")}
                    </time>
                  </div>
                </Card>
              </NotificationLink>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No notifications yet"
          description="Official announcements and replies will appear here when they happen."
          icon={Bell}
        />
      )}
    </div>
  );
}
