
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  isAbsoluteAuthRedirect,
  sanitizeAuthRedirect,
} from "@repo/lib/auth-redirect";

type LoginFormProps = {
  nextUrl?: string;
};

type LoginResponse = {
  error?: string;
};

export function LoginForm({ nextUrl = "/dashboard" }: LoginFormProps) {
  const router = useRouter();

  const redirectTo = useMemo(() => sanitizeAuthRedirect(nextUrl), [nextUrl]);

  const registerHref =
    redirectTo === "/dashboard"
      ? "/register"
      : `/register?next=${encodeURIComponent(redirectTo)}`;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const result = (await response.json().catch(() => ({}))) as LoginResponse;

    if (!response.ok) {
      setMessage(result.error ?? "Login failed.");
      setIsLoading(false);
      return;
    }

    if (isAbsoluteAuthRedirect(redirectTo)) {
      window.location.assign(redirectTo);
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-[clamp(0.8rem,2vw,1.2rem)]"
    >
      <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
        <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
          Username / Email
        </span>

        <input
          type="text"
          required
          placeholder="Bent or player@email.com"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
        />
      </label>

      <label className="flex flex-col gap-[clamp(0.35rem,0.8vw,0.6rem)]">
        <span className="text-[clamp(0.72rem,0.95vw,0.9rem)] font-bold text-[#2f1b12]">
          Password
        </span>

        <input
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-white px-[clamp(0.8rem,1.6vw,1.2rem)] py-[clamp(0.65rem,1.2vw,0.95rem)] text-[clamp(0.8rem,1vw,1rem)] text-[#2f1b12] outline-none transition placeholder:text-[#7a5635]/50 focus:border-[#4f8124]"
        />
      </label>

      <Link
        href="/forgot-password"
        className="text-right text-[clamp(0.7rem,0.95vw,0.9rem)] font-bold text-[#4f8124] hover:text-[#2f1b12]"
      >
        Forgot Password?
      </Link>

      {message ? (
        <p className="rounded-[clamp(0.8rem,1.5vw,1.2rem)] border border-[#d9c99f] bg-[#fff8e8] px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.6rem,1vw,0.8rem)] text-[clamp(0.7rem,0.95vw,0.9rem)] font-medium text-[#7a5635]">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="lt-button-primary mt-[clamp(0.3rem,1vw,0.8rem)] disabled:pointer-events-none disabled:opacity-60"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-[clamp(0.72rem,0.95vw,0.9rem)] text-[#7a5635]">
        New to Lifetopia?{" "}
        <Link
          href={registerHref}
          className="font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Create Lifetopia Account
        </Link>
      </p>
    </form>
  );
}