import { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#dfeec9] bg-[#edf7df] px-3 py-1 text-[11px] font-black text-[#4f8124] ${className}`}
    >
      {children}
    </span>
  );
}