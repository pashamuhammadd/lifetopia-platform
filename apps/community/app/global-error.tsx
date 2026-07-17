"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#fff7e8] px-4 py-10 font-sans text-[#2f2418]">
          <section className="w-full max-w-xl rounded-[32px] border border-[#ead9b8] bg-white p-7 text-center shadow-[0_24px_70px_rgba(88,60,28,0.16)]">
            <span className="mx-auto grid size-16 place-items-center rounded-[22px] bg-[#fff0e8] text-[#c65d37]">
              <AlertTriangle size={30} />
            </span>

            <h1 className="mt-5 text-2xl font-black sm:text-3xl">
              Lifetopia Community could not load.
            </h1>

            <p className="mt-3 font-bold leading-7 text-[#7a5635]">
              Please try again. No account changes were made.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4f8124] px-5 text-sm font-black text-white"
            >
              <RotateCcw size={17} />
              Reload Community
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
