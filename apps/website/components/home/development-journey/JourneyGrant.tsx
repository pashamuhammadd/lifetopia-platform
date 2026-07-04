export function JourneyGrant() {
  const rows = [
    { label: "Organization", value: "Superteam Indonesia" },
    { label: "Purpose", value: "Public Alpha Development" },
    { label: "Status", value: "Completed" },
    { label: "Next Objective", value: "Beta Development Grant" },
  ];

  return (
    <div>
      <h4 className="text-[clamp(0.75rem,1.8vw,1.5rem)] font-black text-[#244b14]">
        🏆 Successfully Funded
      </h4>

      <div className="mt-[clamp(10px,1.6vw,24px)] rounded-[clamp(14px,1.8vw,26px)] border border-[#f0c85f] bg-gradient-to-br from-[#fff8db] to-white p-[clamp(10px,1.8vw,24px)] shadow-[0_16px_40px_rgba(180,130,30,0.14)]">
        <div className="text-[clamp(1.4rem,3vw,3rem)]">🚀</div>

        <h5 className="mt-[clamp(6px,1vw,16px)] text-[clamp(0.9rem,2.2vw,1.875rem)] font-black text-[#3a1f12]">
          Funded by Superteam Indonesia
        </h5>

        <p className="mt-[clamp(5px,0.8vw,12px)] text-[clamp(0.46rem,0.95vw,1rem)] font-semibold leading-[1.5] text-[#7a5635]">
          Lifetopia World successfully received support to continue development
          from MVP toward Public Alpha.
        </p>

        <div className="mt-[clamp(10px,1.5vw,24px)] grid gap-[clamp(5px,0.8vw,12px)]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-2 rounded-[clamp(10px,1.2vw,18px)] border border-[#f0d797] bg-white/75 px-[clamp(8px,1.2vw,16px)] py-[clamp(6px,0.9vw,12px)]"
            >
              <span className="text-[clamp(0.38rem,0.75vw,0.875rem)] font-black text-[#7a5635]">
                {row.label}
              </span>
              <span className="text-right text-[clamp(0.38rem,0.75vw,0.875rem)] font-black text-[#4f8124]">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
