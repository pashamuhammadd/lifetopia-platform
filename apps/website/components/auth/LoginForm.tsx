"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!identifier || !password) {
      setMessage("Please enter your username/email and password.");
      setIsLoading(false);
      return;
    }

    const isEmail = identifier.includes("@");

    if (!isEmail) {
      setMessage(
        "Username login needs the profiles database. For now, use email login until we create the profiles table.",
      );
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
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
          placeholder="Bent"
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

      <div className="flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-[clamp(0.7rem,0.95vw,0.9rem)] font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Forgot Password?
        </Link>
      </div>

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
          href="/register"
          className="font-bold text-[#4f8124] hover:text-[#2f1b12]"
        >
          Create Lifetopia Account
        </Link>
      </p>
    </form>
  );
}