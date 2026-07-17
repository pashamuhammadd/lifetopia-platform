export default function Loading() {
  return (
    <main
      className="min-h-screen px-3 py-3 pb-24 sm:px-4 md:px-5 md:py-4 md:pb-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1480px] grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        <aside className="hidden animate-pulse rounded-[28px] border border-[#ead9b8] bg-white/70 p-4 md:block">
          <div className="h-16 rounded-[20px] bg-[#edf7df]" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-11 rounded-[18px] bg-[#fff4dc]" />
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="h-16 animate-pulse rounded-[24px] border border-[#ead9b8] bg-white/70" />

          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-[28px] border border-[#ead9b8] bg-white/75 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-[#edf7df]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-40 rounded-full bg-[#ead9b8]" />
                    <div className="h-2.5 w-24 rounded-full bg-[#fff4dc]" />
                  </div>
                </div>
                <div className="mt-5 h-3 w-full rounded-full bg-[#fff4dc]" />
                <div className="mt-2 h-3 w-4/5 rounded-full bg-[#fff4dc]" />
                <div className="mt-5 h-10 rounded-[18px] bg-[#edf7df]" />
              </div>
            ))}
          </div>
        </section>

        <aside className="hidden animate-pulse rounded-[28px] border border-[#ead9b8] bg-white/70 p-4 2xl:block">
          <div className="h-6 w-36 rounded-full bg-[#ead9b8]" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 rounded-[18px] bg-[#fff4dc]" />
            ))}
          </div>
        </aside>
      </div>

      <span className="sr-only">Loading Lifetopia Community...</span>
    </main>
  );
}
