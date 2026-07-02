import type { AccountFeature } from "@/types/account";

type AccountFeatureGridProps = {
  features: AccountFeature[];
};

export function AccountFeatureGrid({ features }: AccountFeatureGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[clamp(8px,1.2vw,18px)]">
      {features.map((item) => (
        <div
          key={item.title}
          className="group rounded-[clamp(16px,1.8vw,26px)] border border-white/80 bg-white/75 p-[clamp(10px,1.5vw,24px)] shadow-[0_14px_34px_rgba(88,60,28,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9ed36d] hover:shadow-[0_18px_44px_rgba(88,60,28,0.16)]"
        >
          <div className="text-[clamp(1.2rem,3vw,3rem)]">{item.icon}</div>

          <h3 className="mt-[clamp(5px,0.8vw,12px)] text-[clamp(0.58rem,1.3vw,1.4rem)] font-black text-[#2f1b12] transition group-hover:text-[#4f8124]">
            {item.title}
          </h3>

          <p className="mt-[clamp(2px,0.5vw,8px)] text-[clamp(0.38rem,0.78vw,0.86rem)] font-semibold leading-[1.4] text-[#6b5b4a]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}