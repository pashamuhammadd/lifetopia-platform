"use client";

import { useActionState } from "react";
import { deleteMyAccount, type AccountDeletionState } from "@/app/actions/account-deletion";

const initialState: AccountDeletionState = { error: null };

export function DeleteAccountForm() {
  const [state, formAction, pending] = useActionState(deleteMyAccount, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-black text-[#3c281d]">Type DELETE to continue</span>
        <input
          name="confirmation"
          autoComplete="off"
          spellCheck={false}
          required
          className="min-h-12 w-full rounded-2xl border border-[#d9c29c] bg-white px-4 font-bold text-[#3c281d] outline-none focus:border-[#c12626] focus:ring-2 focus:ring-[#c12626]/20"
          placeholder="DELETE"
        />
      </label>
      {state.error ? (
        <p role="alert" className="rounded-2xl border border-[#f1aaaa] bg-[#fff1f1] p-4 text-sm font-bold text-[#a51616]">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-full bg-[#c12626] px-6 font-black text-white transition hover:bg-[#a51616] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Deleting account…" : "Permanently delete my account"}
      </button>
    </form>
  );
}
