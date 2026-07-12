const allocations = [
  { label: "Development", percent: 60, amount: "$6,000" },
  { label: "Infrastructure", percent: 20, amount: "$2,000" },
  { label: "Operations", percent: 10, amount: "$1,000" },
  { label: "Community & Testing", percent: 10, amount: "$1,000" },
];

export function FundingSummary() {
  return (
    <section className="overflow-hidden rounded-[clamp(0.85rem,1.5vw,1.15rem)] border border-white/10 bg-[#0c1710]/92 p-[clamp(0.75rem,1.4vw,1.05rem)] shadow-[0_1.5rem_4rem_rgba(0,0,0,0.24)]">
      <div>
        <p className="font-mono text-[clamp(0.32rem,0.54vw,0.46rem)] font-black uppercase tracking-[0.1em] text-[#8eea61]">
          Funding Summary
        </p>
        <h3 className="mt-1 text-[clamp(0.76rem,1.1vw,1rem)] font-extrabold text-white">
          Request allocation and usage plan
        </h3>
      </div>

      <div className="mt-[clamp(0.75rem,1.3vw,1rem)] grid gap-[clamp(0.8rem,1.4vw,1.1rem)] md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center">
        <div className="flex justify-center">
          <div
            className="relative flex size-[clamp(8.5rem,14vw,11rem)] items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#8eea45 0deg 216deg, #63b8f5 216deg 288deg, #f2b64b 288deg 324deg, #9b7cf4 324deg 360deg)",
            }}
          >
            <div className="flex size-[72%] flex-col items-center justify-center rounded-full bg-[#0c1710] text-center">
              <p className="text-[clamp(0.8rem,1.35vw,1.1rem)] font-black text-white">
                $10,000
              </p>
              <p className="mt-1 font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] uppercase tracking-[0.07em] text-white/45">
                Total Request
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[clamp(0.65rem,1.05vw,0.85rem)] border border-white/10">
          {allocations.map((item, index) => (
            <div
              key={item.label}
              className={[
                "grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-[clamp(0.6rem,1.1vw,0.85rem)] py-[clamp(0.55rem,0.95vw,0.72rem)]",
                index !== allocations.length - 1 ? "border-b border-white/10" : "",
              ].join(" ")}
            >
              <div className="min-w-0">
                <p className="truncate text-[clamp(0.42rem,0.7vw,0.6rem)] font-extrabold text-white">
                  {item.label}
                </p>
              </div>
              <span className="font-mono text-[clamp(0.3rem,0.5vw,0.42rem)] font-bold text-white/55">
                {item.percent}%
              </span>
              <span className="font-mono text-[clamp(0.34rem,0.56vw,0.46rem)] font-black text-[#99ef6c]">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[clamp(0.7rem,1.2vw,0.95rem)] rounded-[clamp(0.55rem,0.9vw,0.72rem)] border border-[#8eea45]/15 bg-[#8eea45]/[0.05] px-[clamp(0.6rem,1vw,0.8rem)] py-[clamp(0.5rem,0.85vw,0.68rem)]">
        <p className="text-[clamp(0.36rem,0.6vw,0.5rem)] font-semibold text-white/68">
          All funds will be used transparently and reported through the public development portal.
        </p>
      </div>
    </section>
  );
}
