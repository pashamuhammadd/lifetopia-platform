import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[24px] border border-[#ead9b8] bg-white/80 shadow-[0_18px_45px_rgba(88,60,28,0.10)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}