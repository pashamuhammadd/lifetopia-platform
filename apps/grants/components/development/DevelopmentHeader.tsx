export function DevelopmentHeader() {
  return (
    <div className="grid gap-[clamp(0.8rem,1.5vw,1.2rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.6fr)] lg:items-end">
      <div className="min-w-0">
        <p className="font-mono text-[clamp(0.34rem,0.58vw,0.5rem)] font-black uppercase tracking-[0.12em] text-[#8eea61]">
          Development & Delivery
        </p>

        <h2 className="mt-[clamp(0.3rem,0.6vw,0.46rem)] max-w-[48rem] text-[clamp(1.55rem,3.3vw,3rem)] font-black leading-[1.02] tracking-[-0.045em] text-white">
          Public execution, measurable progress, and a clear path to Beta.
        </h2>

        <p className="mt-[clamp(0.45rem,0.85vw,0.65rem)] max-w-[47rem] text-[clamp(0.5rem,0.82vw,0.72rem)] leading-[1.65] text-white/60">
          Every milestone is connected to visible development activity, product delivery, and transparent reporting.
        </p>
      </div>

      <div className="grid grid-cols-3 overflow-hidden rounded-[clamp(0.7rem,1.2vw,0.95rem)] border border-white/10 bg-[#0e1a12]/92 shadow-[0_1rem_3rem_rgba(0,0,0,0.2)] backdrop-blur">
        {[
          { label: "Funding", value: "$10K" },
          { label: "Timeline", value: "8–12 Weeks" },
          { label: "Milestones", value: "3" },
        ].map((item, index) => (
          <div
            key={item.label}
            className={[
              "min-w-0 px-[clamp(0.55rem,1vw,0.8rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-center",
              index !== 0 ? "border-l border-white/10" : "",
            ].join(" ")}
          >
            <p className="truncate font-mono text-[clamp(0.28rem,0.48vw,0.4rem)] font-black uppercase tracking-[0.08em] text-white/45">
              {item.label}
            </p>
            <p className="mt-1 truncate text-[clamp(0.62rem,1vw,0.86rem)] font-black text-[#91ef60]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
