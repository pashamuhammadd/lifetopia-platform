import { CheckCircle2, Clock3, Music2, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Progress } from "@/components/ui/Progress";
import type { CommunityQuest, HarmonyHistoryItem, HarmonySummary } from "@/data/quests";
import { ClaimHarmonyButton, QuestVisitRecorder } from "./QuestActions";

export function QuestBoard({
  quests,
  harmony,
  history,
}: {
  quests: CommunityQuest[];
  harmony: HarmonySummary;
  history: HarmonyHistoryItem[];
}) {
  const ends = quests[0]?.periodEndsAt;
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <QuestVisitRecorder />
      <PageHeader
        title="Daily Community Quest"
        description="Finish and claim each task separately. Every task rewards +4 off-chain Harmony."
      />

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-[#dff7ff] via-[#fff7e8] to-[#edf7df] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4f8124]">
                Harmony Account
              </p>
              <h2 className="mt-1 text-3xl font-black text-[#2f2418]">
                {harmony.points.toLocaleString()} Harmony
              </h2>
              <p className="mt-1 font-bold text-[#7a5635]">
                Level {harmony.level} · {harmony.levelProgress} / {harmony.levelTarget} XP
              </p>
            </div>
            <Music2 size={44} className="shrink-0 text-[#4f8124]" />
          </div>
          <div className="mt-4">
            <Progress value={(harmony.levelProgress / harmony.levelTarget) * 100} />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {quests.map((quest) => (
          <Card
            key={quest.code}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
          >
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
              <div
                className={`grid size-11 shrink-0 place-items-center rounded-full ${quest.completed ? "bg-[#edf7df] text-[#4f8124]" : "bg-[#fff7e8] text-[#9b6635]"}`}
              >
                {quest.completed ? <CheckCircle2 size={22} /> : <Sparkles size={22} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-black text-[#2f2418]">{quest.title}</h2>
                  <span className="shrink-0 text-sm font-black text-[#4f8124]">
                    {quest.progress}/{quest.target}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-[#7a5635]">{quest.description}</p>
                <div className="mt-3">
                  <Progress value={(quest.progress / quest.target) * 100} />
                </div>
              </div>
            </div>
            <ClaimHarmonyButton
              questCode={quest.code}
              ready={quest.completed}
              claimed={quest.claimed}
              reward={quest.reward}
            />
          </Card>
        ))}
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Clock3 size={18} className="text-[#9b6635]" />
          <p className="font-black text-[#2f2418]">Resets daily at 00:00 UTC</p>
        </div>
        <p className="mt-2 text-sm font-bold text-[#7a5635]">
          {ends
            ? `Current period ends ${new Date(ends).toLocaleString("en")}. Claim completed tasks before reset.`
            : "Claim completed tasks before the daily reset."}
        </p>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-xl font-black text-[#2f2418]">Harmony History</h2>
        {history.length ? (
          <div className="mt-4 divide-y divide-[#ead9b8]">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-black text-[#2f2418]">{item.description}</p>
                  <time className="text-xs font-bold text-[#7a5635]">
                    {new Date(item.createdAt).toLocaleString("en")}
                  </time>
                </div>
                <span
                  className={`font-black ${item.amount > 0 ? "text-[#4f8124]" : "text-[#c12626]"}`}
                >
                  {item.amount > 0 ? "+" : ""}
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm font-bold text-[#7a5635]">No Harmony activity yet.</p>
        )}
      </Card>
    </div>
  );
}
