import type {
  Metadata,
} from "next";

import {
  MobileWalletCallback,
} from "@/components/auth/MobileWalletCallback";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title: "Secure Wallet Return",
  description:
    "Complete a secure Phantom or Solflare mobile wallet authentication request.",
  robots: {
    index: false,
    follow: false,
  },
};

type CallbackPageProps = {
  searchParams?: Promise<
    Record<
      string,
      string | string[] | undefined
    >
  >;
};

export default async function
MobileWalletCallbackPage({
  searchParams,
}: CallbackPageProps) {
  const rawParams = searchParams
    ? await searchParams
    : {};

  const query: Record<
    string,
    string | undefined
  > = {};

  for (const [key, value] of
    Object.entries(rawParams)) {
    query[key] = Array.isArray(value)
      ? value[0]
      : value;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7e8] px-[clamp(1rem,5vw,5rem)] py-[clamp(2rem,7vw,6rem)]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-24 top-16 size-72 rounded-full bg-[#b6e56a]/25 blur-3xl" />
        <div className="absolute -right-24 top-32 size-80 rounded-full bg-[#ffd58a]/35 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <MobileWalletCallback
          query={query}
        />
      </div>
    </main>
  );
}
