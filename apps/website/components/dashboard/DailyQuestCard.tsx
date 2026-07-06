const quests = [
  { title: "Login to Dashboard", reward: "+50 Harmony", done: true },
  { title: "Harvest 10 Wheat in Game", reward: "+100 Harmony", done: false },
  { title: "Visit Community Forum", reward: "+50 Harmony", done: false },
  { title: "Like 3 Posts in Forum", reward: "+50 Harmony", done: false },
  { title: "Claim Daily Reward", reward: "+100 Harmony", done: false },
];

export function DailyQuestCard() {
  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
            📜 Today&apos;s Quest
          </h2>
          <p className="text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-[#7a5635]">
            Reset in 14h 32m
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {quests.map((quest) => (
          <div
            key={quest.title}
            className="flex items-center justify-between gap-3 rounded-[clamp(12px,1.4vw,18px)] border border-[#eadfbd] bg-[#fff8e8]/70 p-[clamp(9px,1.2vw,14px)]"
          >
            <div>
              <p className="text-[clamp(0.68rem,0.95vw,0.95rem)] font-black text-[#2f1b12]">
                {quest.title}
              </p>
              <p className="text-[clamp(0.52rem,0.75vw,0.78rem)] font-semibold text-[#7a5635]">
                {quest.reward}
              </p>
            </div>

            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg border font-black ${
                quest.done
                  ? "border-[#4f8124] bg-[#4f8124] text-white"
                  : "border-[#d9c99f] bg-white/70 text-transparent"
              }`}
            >
              ✓
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[clamp(14px,1.6vw,22px)] border border-[#b6e56a]/70 bg-[#f5fbdf] p-[clamp(10px,1.4vw,16px)]">
        <p className="text-[clamp(0.7rem,0.95vw,0.95rem)] font-black text-[#2f1b12]">
          Quest Reward
        </p>
        <p className="mt-1 text-[clamp(0.62rem,0.85vw,0.86rem)] font-bold text-[#4f8124]">
          +250 Harmony Points
        </p>
      </div>
    </section>
  );
}