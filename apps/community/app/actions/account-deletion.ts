"use server";

import { createClient } from "@repo/lib/supabase/server";
import { redirect } from "next/navigation";

export type AccountDeletionState = { error: string | null };

export async function deleteMyAccount(
  _previousState: AccountDeletionState,
  formData: FormData,
): Promise<AccountDeletionState> {
  const confirmation = String(formData.get("confirmation") ?? "").trim();
  if (confirmation !== "DELETE") {
    return { error: 'Type “DELETE” exactly to confirm permanent account deletion.' };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in again before deleting your account." };

  const { data, error } = await supabase.rpc("delete_my_lifetopia_account", {
    p_confirmation: confirmation,
  });

  if (error) {
    if (/protected_staff_account/i.test(error.message)) {
      return { error: "Founder and staff accounts require the protected support process." };
    }
    if (/staff_history_requires_support/i.test(error.message)) {
      return { error: "This account has protected staff history and requires support review." };
    }
    return { error: "The account could not be deleted safely. No partial deletion was committed." };
  }

  await supabase.auth.signOut({ scope: "local" });
  redirect(`/account-deletion/completed?receipt=${encodeURIComponent(String(data))}`);
}
