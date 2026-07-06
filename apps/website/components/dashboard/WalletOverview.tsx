export function WalletOverview() {
  return (
    <section className="rounded-[clamp(18px,2.4vw,32px)] border border-white/80 bg-white/75 p-[clamp(14px,2vw,26px)] shadow-[0_18px_54px_rgba(88,60,28,0.12)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-black text-[#2f1b12]">
            👛 Wallet
          </h2>
          <p className="text-[clamp(0.6rem,0.85vw,0.85rem)] font-semibold text-[#7a5635]">
            Solana identity and future asset verification.
          </p>
        </div>

        <span className="rounded-full border border-[#d9c99f] bg-[#fff8e8] px-3 py-1 text-[clamp(0.52rem,0.72vw,0.75rem)] font-black text-[#7a5635]">
          Soon
        </span>
      </div>

      <div className="rounded-[clamp(14px,1.6vw,22px)] border border-[#eadfbd] bg-[#fff8e8]/75 p-[clamp(12px,1.6vw,18px)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[clamp(0.58rem,0.8vw,0.82rem)] font-black text-[#7a5635]">
              Wallet Status
            </p>

            <p className="mt-1 text-[clamp(0.85rem,1.2vw,1.2rem)] font-black text-[#2f1b12]">
              Not Connected
            </p>

            <p className="mt-1 text-[clamp(0.58rem,0.8vw,0.82rem)] font-semibold text-[#7a5635]">
              Connect your Solana wallet to unlock Harmony Verified.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-full bg-[#4f8124]/70 px-[clamp(14px,1.5vw,22px)] py-[clamp(8px,0.9vw,12px)] text-[clamp(0.6rem,0.82vw,0.88rem)] font-black text-white shadow-[0_14px_28px_rgba(79,129,36,0.18)]"
          >
            Connect Soon
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <MiniStat label="Network" value="Solana" />
          <MiniStat label="NFT" value="0" />
          <MiniStat label="GOLD" value="0" />
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[clamp(10px,1.2vw,16px)] border border-white/80 bg-white/65 p-3 text-center">
      <p className="text-[clamp(0.48rem,0.7vw,0.72rem)] font-black text-[#7a5635]">
        {label}
      </p>
      <p className="mt-1 text-[clamp(0.7rem,0.95vw,0.95rem)] font-black text-[#2f1b12]">
        {value}
      </p>
    </div>
  );
}