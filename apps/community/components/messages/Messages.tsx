import { LockKeyhole, MessageCircleMore, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";

export function Messages() {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader
        title="Messages"
        description="Private conversations for Lifetopians are being prepared."
      />

      <section className="overflow-hidden rounded-[28px] border border-[#ead9b8] bg-white/80 shadow-[0_18px_45px_rgba(88,60,28,0.12)]">
        <div className="bg-gradient-to-br from-[#dff7ff] via-[#fff7e8] to-[#edf7df] px-6 py-10 text-center sm:px-10 sm:py-14">
          <span className="mx-auto grid size-16 place-items-center rounded-[22px] border border-[#cfe2bd] bg-white/80 text-[#4f8124] shadow-sm">
            <MessageCircleMore size={30} />
          </span>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#ead9b8] bg-white/75 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#9b6635]">
            <Sparkles size={14} />
            In Preparation
          </span>

          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.4rem)] font-black leading-tight text-[#2f2418]">
            Private messaging is coming to Lifetopia.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[clamp(0.86rem,1vw,1rem)] font-semibold leading-7 text-[#7a5635]">
            The first release will focus on safe conversations, moderation,
            privacy, and a consistent experience across web and the future
            Android application.
          </p>

          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 rounded-[20px] border border-[#ead9b8] bg-white/70 px-4 py-3 text-sm font-black text-[#7a5635]">
            <LockKeyhole size={18} className="text-[#4f8124]" />
            No dummy chats or unread counts are shown.
          </div>
        </div>
      </section>
    </div>
  );
}
