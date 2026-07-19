import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account deleted", robots: { index: false, follow: false } };

export default function AccountDeletionCompletedPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#fff7e8] p-6">
      <section className="w-full max-w-xl rounded-[28px] border border-[#d9c29c] bg-white p-8 text-center shadow-xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4f8124]">Deletion complete</p>
        <h1 className="mt-3 text-3xl font-black text-[#2f2418]">Your CommunityHub account was deleted.</h1>
        <p className="mt-4 font-bold leading-7 text-[#7a5635]">
          Your session has ended and the account can no longer be used to sign in.
        </p>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#4f8124] px-6 font-black text-white">
          Return to CommunityHub
        </Link>
      </section>
    </main>
  );
}
