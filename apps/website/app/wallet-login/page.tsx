import type {
  Metadata,
} from "next";
import {
  redirect,
} from "next/navigation";

import {
  WalletLoginPanel,
} from "@/components/auth/WalletLoginPanel";
import {
  createClient,
} from "@repo/lib/supabase/server";
import {
  sanitizeAuthRedirectValue,
} from "@repo/services/auth-validation";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Wallet Login",
  description:
    "Sign in to Lifetopia World with a verified Solana wallet.",
  robots: {
    index: false,
    follow: false,
  },
};

type WalletLoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

export default async function
WalletLoginPage({
  searchParams,
}: WalletLoginPageProps) {
  const params = searchParams
    ? await searchParams
    : {};

  const rawNext =
    Array.isArray(params.next)
      ? params.next[0]
      : params.next;

  const next =
    sanitizeAuthRedirectValue(
      rawNext,
      "/dashboard",
    );

  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(next);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(1rem,5vw,5rem)] py-[clamp(2rem,5vw,4.5rem)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 size-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-[clamp(1rem,3vw,1.75rem)]">
        <header className="rounded-[28px] border border-[#d9c99f] bg-white/80 p-[clamp(1.15rem,3vw,2rem)] shadow-[0_18px_45px_rgba(95,70,37,0.08)] backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8124]">
            Lifetopia Identity
          </p>

          <h1 className="mt-2 text-[clamp(1.65rem,4vw,2.8rem)] font-black leading-tight text-[#2f1b12]">
            Sign in with your wallet.
          </h1>

          <p className="mt-3 max-w-2xl text-[clamp(0.8rem,1.2vw,1rem)] font-semibold leading-7 text-[#76583a]">
            Use the Solana wallet already verified on your Lifetopia World account. No password, seed phrase, private key, or blockchain transaction is requested.
          </p>
        </header>

        <WalletLoginPanel
          next={next}
        />
      </div>
    </main>
  );
}
