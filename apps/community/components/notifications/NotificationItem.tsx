import {
  Bell,
  CheckCircle2,
  Heart,
  MessageCircle,
  ScrollText,
  UserPlus,
} from "lucide-react";

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  quest: CheckCircle2,
  announcement: Bell,
};

const toneMap = {
  like: "bg-[#fff0f6] text-[#c24174]",
  comment: "bg-[#e8f3ff] text-[#2f73c9]",
  follow: "bg-[#f3edff] text-[#6d4cc2]",
  quest: "bg-[#edf7df] text-[#4f8124]",
  announcement: "bg-[#fff4dc] text-[#b87912]",
};

type NotificationItemProps = {
  type: keyof typeof iconMap;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

export function NotificationItem({
  type,
  title,
  description,
  time,
  unread,
}: NotificationItemProps) {
  const Icon = iconMap[type] ?? ScrollText;
  const tone = toneMap[type] ?? "bg-[#fffaf0] text-[#7a5635]";

  return (
    <article
      className={`flex gap-4 rounded-[24px] p-4 transition hover:bg-white ${
        unread ? "bg-[#edf7df]/70" : "bg-[#fffaf0]"
      }`}
    >
      <div className={`grid size-12 shrink-0 place-items-center rounded-[18px] ${tone}`}>
        <Icon size={23} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-black text-[#2f2418]">{title}</h3>

          <span className="shrink-0 text-xs font-black text-[#9b6635]">
            {time}
          </span>
        </div>

        <p className="mt-1 text-sm font-bold leading-6 text-[#7a5635]">
          {description}
        </p>
      </div>

      {unread ? (
        <span className="mt-2 size-2.5 shrink-0 rounded-full bg-[#4f8124]" />
      ) : null}
    </article>
  );
}