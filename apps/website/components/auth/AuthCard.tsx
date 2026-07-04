import type { ReactNode } from "react";

type AuthCardProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({
  badge,
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <section className="min-h-screen bg-[#fff7e8] px-[clamp(0.75rem,4vw,5rem)] py-[clamp(3rem,8vw,7rem)]">
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center">
        <div className="w-full max-w-[clamp(20rem,42vw,34rem)] rounded-[clamp(1.25rem,3vw,2.5rem)] border border-white/80 bg-white/75 p-[clamp(1rem,3vw,2.5rem)] shadow-[0_24px_80px_rgba(47,27,18,0.12)]">
          <div className="mb-[clamp(1.2rem,3vw,2.5rem)] flex flex-col gap-[clamp(0.65rem,1.5vw,1.2rem)] text-center">
            <span className="lt-badge mx-auto w-fit">{badge}</span>

            <div>
              <h1 className="text-[clamp(1.8rem,4vw,3.75rem)] font-black leading-[1.05] tracking-[-0.04em] text-[#2f1b12]">
                {title}
              </h1>

              <p className="mx-auto mt-[clamp(0.65rem,1.5vw,1.1rem)] max-w-[clamp(17rem,34vw,28rem)] text-[clamp(0.78rem,1.05vw,1rem)] leading-[1.7] text-[#7a5635]">
                {description}
              </p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}