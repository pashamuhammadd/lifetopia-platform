import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-[16px] bg-[#4f8124] px-5 py-2.5 font-black text-white transition hover:brightness-105 active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}