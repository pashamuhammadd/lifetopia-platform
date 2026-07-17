"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Community route error:", error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section
        role="alert"
        className="w-full max-w-xl rounded-[32px] border border-[#ead9b8] bg-white/90 p-6 text-center shadow-[0_24px_70px_rgba(88,60,28,0.16)] sm:p-8"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-[22px] bg-[#fff0e8] text-[#c65d37]">
          <AlertTriangle size={30} />
        </span>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#9b6635]">
          Lifetopia Community
        </p>

        <h1 className="mt-2 text-2xl font-black text-[#2f2418] sm:text-3xl">
          Something interrupted this page.
        </h1>

        <p className="mx-auto mt-3 max-w-md font-bold leading-7 text-[#7a5635]">
          Your account is safe. Try loading the page again or return to the
          community feed.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4f8124] px-5 text-sm font-black text-white transition hover:bg-[#3f6f22]"
          >
            <RotateCcw size={17} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-black text-[#7a5635] transition hover:bg-white"
          >
            Return to Feed
          </Link>
        </div>
      </section>
    </main>
  );
}
