type VerifyEmailBannerProps = {
  isEmailVerified: boolean;
};

export function VerifyEmailBanner({ isEmailVerified }: VerifyEmailBannerProps) {
  if (isEmailVerified) return null;

  return (
    <div className="rounded-[clamp(1rem,2vw,1.5rem)] border border-[#d9c99f] bg-[#fff8e8] p-[clamp(0.9rem,2vw,1.4rem)] text-[#7a5635]">
      <p className="text-[clamp(0.8rem,1vw,1rem)] font-bold text-[#2f1b12]">
        Verify your email
      </p>
      <p className="mt-1 text-[clamp(0.72rem,0.95vw,0.9rem)] leading-[1.6]">
        Please verify your email to unlock all Lifetopia account features.
      </p>
    </div>
  );
}