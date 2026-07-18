import type {
  Metadata,
} from "next";
import {
  redirect,
} from "next/navigation";

import {
  WalletLinkingPanel,
} from "@/components/auth/WalletLinkingPanel";
import {
  getCurrentMfaSessionState,
} from "@/lib/auth/mfa-session";
import type {
  LinkedSolanaWallet,
} from "@/lib/auth/wallet-linking";
import {
  createClient,
} from "@repo/lib/supabase/server";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Linked Wallet",
  description:
    "Securely link a Solana wallet to your Lifetopia World account.",
  robots: {
    index: false,
    follow: false,
  },
};

type WalletRow = {
  id: string;
  address: string;
  linked_at: string;
  last_verified_at: string;
};

export default async function
WalletSettingsPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?next=%2Faccount%2Fwallet",
    );
  }

  const mfaState =
    await getCurrentMfaSessionState();

  if (!mfaState) {
    throw new Error(
      "Unable to load wallet security status.",
    );
  }

  if (mfaState.requiresChallenge) {
    redirect(
      "/mfa-challenge?next=%2Faccount%2Fwallet",
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("account_wallets")
    .select(
      "id,address,linked_at,last_verified_at",
    )
    .eq("user_id", user.id)
    .eq("chain", "solana")
    .maybeSingle();

  if (error) {
    throw new Error(
      "Unable to load linked wallet.",
    );
  }

  const row =
    data as WalletRow | null;

  const initialWallet:
    LinkedSolanaWallet | null =
    row
      ? {
          id: row.id,
          address: row.address,
          linkedAt:
            row.linked_at,
          lastVerifiedAt:
            row.last_verified_at,
        }
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(1rem,5vw,5rem)] py-[clamp(2rem,5vw,4.5rem)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 size-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col gap-[clamp(1rem,3vw,1.75rem)]">
        <header className="rounded-[28px] border border-[#d9c99f] bg-white/80 p-[clamp(1.15rem,3vw,2rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8124]">
            Account Identity
          </p>

          <h1 className="mt-2 text-[clamp(1.65rem,4vw,2.8rem)] font-black leading-tight text-[#2f1b12]">
            Linked wallet.
          </h1>

          <p className="mt-3 max-w-2xl text-[clamp(0.8rem,1.2vw,1rem)] font-semibold leading-7 text-[#76583a]">
            Prove ownership with a secure message signature and connect one Solana wallet to your Lifetopia World identity.
          </p>
        </header>

        <WalletLinkingPanel
          initialWallet={
            initialWallet
          }
        />
      </div>
    </main>
  );
}
