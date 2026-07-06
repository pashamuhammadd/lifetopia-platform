type VerifyEmailBannerProps = {
  isEmailVerified: boolean;
};

export function VerifyEmailBanner({ isEmailVerified }: VerifyEmailBannerProps) {
  if (isEmailVerified) {
    return (
      <div className="rounded-[clamp(16px,2vw,26px)] border border-[#b6e56a]/70 bg-[#f5fbdf]/85 p-[clamp(10px,1.5vw,18px)] shadow-[0_14px_34px_rgba(88,60,28,0.08)]">
        <p className="text-[clamp(0.72rem,0.95vw,0.95rem)] font-black text-[#4f8124]">
          Email verified
        </p>
        <p className="mt-1 text-[clamp(0.62rem,0.85vw,0.88rem)] font-semibold leading-[1.5] text-[#7a5635]">
          Your Lifetopia account is ready for future platform features.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[clamp(16px,2vw,26px)] border border-amber-300 bg-amber-50/90 p-[clamp(10px,1.5vw,18px)] shadow-[0_14px_34px_rgba(180,83,9,0.1)]">
      <p className="text-[clamp(0.72rem,0.95vw,0.95rem)] font-black text-amber-800">
        Verify your email
      </p>
      <p className="mt-1 text-[clamp(0.62rem,0.85vw,0.88rem)] font-semibold leading-[1.5] text-amber-700">
        Please verify your email to unlock all Lifetopia account features.
      </p>
    </div>
  );
}