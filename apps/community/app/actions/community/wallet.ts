"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@repo/lib/supabase/server";
export type WalletBonusResult = {
  ok: boolean;
  message: string;
  awarded?: number;
  balance?: number;
  level?: number;
};
export async function claimWalletHarmonyBonus(): Promise<WalletBonusResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Sign in before claiming the wallet bonus." };
  const { data, error } = await supabase.rpc("claim_wallet_verification_harmony");
  if (error)
    return {
      ok: false,
      message: error.message.includes("verified_wallet_required")
        ? "Link and verify a Solana wallet first."
        : "The wallet bonus could not be claimed.",
    };
  const row = Array.isArray(data) ? data[0] : data;
  const awarded = Number(row?.awarded ?? 0);
  revalidatePath("/wallet");
  revalidatePath("/quest");
  revalidatePath("/my-world");
  return {
    ok: true,
    awarded,
    balance: Number(row?.balance ?? 0),
    level: Number(row?.harmony_level ?? 1),
    message: awarded
      ? "+500 Harmony claimed. Harmony Level 5 is now unlocked."
      : "This account already claimed its verified-wallet bonus.",
  };
}
