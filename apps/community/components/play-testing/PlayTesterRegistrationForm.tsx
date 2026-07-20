"use client";

import { useActionState } from "react";

import {
  registerPlayTester,
  type PlayTesterRegistrationState,
} from "@/app/actions/play-testing";

const initialState: PlayTesterRegistrationState = {
  status: "idle",
  message: "",
};

export function PlayTesterRegistrationForm({ startedAt }: { startedAt: number }) {
  const [state, formAction, pending] = useActionState(
    registerPlayTester,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        className="mt-8 rounded-2xl border border-[#a9d383] bg-[#eff9e7] p-6"
        role="status"
      >
        <p className="text-xl font-black text-[#3f6b1b]">You&apos;re on the list!</p>
        <p className="mt-3 font-semibold leading-7 text-[#52643e]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <input name="startedAt" type="hidden" value={startedAt} />

      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div>
        <label className="text-sm font-black" htmlFor="tester-email">
          Google Play email
        </label>
        <input
          autoComplete="email"
          className="mt-2 min-h-13 w-full rounded-2xl border border-[#d9c39d] bg-white px-4 font-semibold outline-none transition placeholder:text-[#a88b70] focus:border-[#4f8124] focus:ring-4 focus:ring-[#dcecc9]"
          id="tester-email"
          inputMode="email"
          maxLength={320}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#ead9b8] bg-[#fffaf0] p-4">
        <input
          className="mt-1 size-5 accent-[#4f8124]"
          name="consent"
          required
          type="checkbox"
          value="yes"
        />
        <span className="text-sm font-semibold leading-6 text-[#674b33]">
          I agree that Lifetopia World may store this email and use it to invite me
          to the CommunityHub Google Play closed test. I can withdraw by contacting
          the developer. See the{" "}
          <a
            className="font-black text-[#4f8124] underline"
            href="https://lifetopiaworld.io/privacy"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {state.status === "error" ? (
        <p
          className="rounded-2xl border border-[#ef9a9a] bg-[#fff1f1] p-4 text-sm font-bold text-[#a12626]"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <button
        className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#4f8124] px-6 font-black text-white transition hover:bg-[#3f6b1b] focus:outline-none focus:ring-4 focus:ring-[#b9d99c] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Registering…" : "Join the closed test"}
      </button>

      <p className="text-center text-xs font-semibold leading-5 text-[#8a6b4f]">
        Never share your Google password, wallet seed phrase, or private key.
      </p>
    </form>
  );
}
