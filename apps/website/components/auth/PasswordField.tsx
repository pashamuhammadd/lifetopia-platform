"use client";

import {
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useState,
  type KeyboardEvent,
} from "react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: "new-password" | "current-password";
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function PasswordField({
  id,
  label,
  value,
  placeholder,
  autoComplete,
  error,
  disabled = false,
  onChange,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] =
    useState(false);
  const [capsLockOn, setCapsLockOn] =
    useState(false);

  function updateCapsLock(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    setCapsLockOn(
      event.getModifierState("CapsLock"),
    );
  }

  return (
    <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
      <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
        {label}
      </span>

      <span className="relative">
        <input
          id={id}
          type={
            isVisible ? "text" : "password"
          }
          required
          minLength={8}
          maxLength={72}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${id}-error`
              : capsLockOn
                ? `${id}-caps`
                : undefined
          }
          onChange={(event) =>
            onChange(event.target.value)
          }
          onKeyDown={updateCapsLock}
          onKeyUp={updateCapsLock}
          onBlur={() =>
            setCapsLockOn(false)
          }
          className={`w-full rounded-[clamp(0.8rem,1.5vw,1.2rem)] border bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] pr-12 text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 disabled:cursor-not-allowed disabled:opacity-60 ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-[#d9c99f] focus:border-[#4f8124]"
          }`}
        />

        <button
          type="button"
          aria-label={
            isVisible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          disabled={disabled}
          onClick={() =>
            setIsVisible((current) => !current)
          }
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-[#76583a] transition hover:bg-[#eef7e4] hover:text-[#4f8124] disabled:pointer-events-none"
        >
          {isVisible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </span>

      {capsLockOn ? (
        <span
          id={`${id}-caps`}
          className="text-xs font-bold text-amber-700"
        >
          Caps Lock is on.
        </span>
      ) : null}

      {error ? (
        <span
          id={`${id}-error`}
          className="text-xs font-bold text-red-600"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}
