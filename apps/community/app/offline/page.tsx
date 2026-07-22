import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";
export const metadata: Metadata = { title: "Offline", robots: { index: false, follow: false } };
export default function OfflinePage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#fff7e8] p-6">
      <section className="w-full max-w-md rounded-[28px] border border-[#ead9b8] bg-white p-7 text-center shadow-xl">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#edf7df] text-[#4f8124]">
          <WifiOff size={30} />
        </div>
        <h1 className="mt-5 text-3xl font-black text-[#2f2418]">CommunityHub is offline</h1>
        <p className="mt-3 font-bold leading-7 text-[#7a5635]">
          Reconnect to load community data. Private account, wallet, quest, guild, and message data
          are never stored as offline pages.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#4f8124] px-6 font-black text-white"
        >
          Try again
        </Link>
      </section>
    </main>
  );
}
