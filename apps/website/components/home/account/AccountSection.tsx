import { accountFeatures, mockAccountUser } from "@repo/data/account";
import { AccountFeatureGrid } from "@/components/home/account/AccountFeatureGrid";
import { AccountPreviewCard } from "@/components/home/account/AccountPreviewCard";

export function AccountSection() {
  return (
    <section
      id="account"
      className="relative bg-[#fff7e8] px-[clamp(14px,6vw,96px)] pb-[clamp(34px,5vw,72px)] pt-[clamp(28px,4vw,56px)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="lt-badge px-[clamp(10px,1.2vw,18px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.58rem,0.78vw,0.85rem)]">
            Lifetopian Platform 🍃
          </span>

          <h2 className="lt-title mt-[clamp(10px,1.4vw,20px)] text-[clamp(1.35rem,3vw,3.5rem)] leading-tight">
            Your Lifetopia Account
          </h2>

          <p className="mx-auto mt-[clamp(6px,0.9vw,14px)] max-w-2xl text-[clamp(0.62rem,1vw,1rem)] font-semibold leading-[1.55] text-[#7a5635]">
            Access your profile, inventory, quests, achievements, wallet, and
            rewards from one cozy platform.
          </p>
        </div>

        <div className="mt-[clamp(18px,2.4vw,34px)] grid grid-cols-[1.1fr_1fr] gap-[clamp(10px,1.5vw,24px)]">
          <AccountPreviewCard user={mockAccountUser} />
          <AccountFeatureGrid features={accountFeatures} />
        </div>
      </div>
    </section>
  );
}
