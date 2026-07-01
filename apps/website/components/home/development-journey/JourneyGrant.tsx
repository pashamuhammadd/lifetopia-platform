export function JourneyGrant() {
  const rows = [
    { label: "Organization", value: "Superteam Indonesia" },
    { label: "Purpose", value: "Public Alpha Development" },
    { label: "Status", value: "Completed" },
    { label: "Next Objective", value: "Beta Development Grant" },
  ];

  return (
    <div>
      <h4 className="text-2xl font-black text-[#244b14]">
        🏆 Successfully Funded
      </h4>

      <div className="mt-6 rounded-[26px] border border-[#f0c85f] bg-gradient-to-br from-[#fff8db] to-white p-6 shadow-[0_16px_40px_rgba(180,130,30,0.14)]">
        <div className="text-5xl">🚀</div>

        <h5 className="mt-4 text-3xl font-black text-[#3a1f12]">
          Funded by Superteam Indonesia
        </h5>

        <p className="mt-3 text-base font-semibold leading-7 text-[#7a5635]">
          Lifetopia World successfully received support to continue development
          from MVP toward Public Alpha.
        </p>

        <div className="mt-6 grid gap-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-2xl border border-[#f0d797] bg-white/75 px-4 py-3"
            >
              <span className="text-sm font-black text-[#7a5635]">
                {row.label}
              </span>
              <span className="text-sm font-black text-[#4f8124]">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}