import { Compass, Home, Map } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-[#ead9b8] bg-white/90 p-7 text-center shadow-[0_24px_70px_rgba(88,60,28,0.15)] sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full bg-[#bde9ff]/55 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-20 size-56 rounded-full bg-[#b9df8c]/45 blur-3xl"
        />

        <div className="relative">
          <span className="mx-auto grid size-16 place-items-center rounded-[22px] border border-[#d9eac8] bg-[#edf7df] text-[#4f8124]">
            <Map size={30} />
          </span>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#9b6635]">
            404 · Unknown Path
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#2f2418] sm:text-4xl">
            This place is not on the Lifetopia map.
          </h1>

          <p className="mx-auto mt-4 max-w-lg font-bold leading-7 text-[#7a5635]">
            The page may have moved, the profile may no longer exist, or the
            address may be incomplete.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#4f8124] px-5 text-sm font-black text-white transition hover:bg-[#3f6f22]"
            >
              <Home size={17} />
              Community Feed
            </Link>

            <Link
              href="/explore"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#ead9b8] bg-[#fffaf0] px-5 text-sm font-black text-[#7a5635] transition hover:bg-white"
            >
              <Compass size={17} />
              Explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
