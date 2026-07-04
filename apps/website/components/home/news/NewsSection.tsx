import Link from "next/link";
import { getLatestNews } from "@/data/news";

export function NewsSection() {
  const newsItems = getLatestNews(3);

  return (
    <section className="bg-[#fff7e8] px-[clamp(0.75rem,4vw,5rem)] py-[clamp(3rem,8vw,7rem)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-[clamp(1.5rem,4vw,3.5rem)]">
        <div className="flex flex-col gap-[clamp(0.9rem,2vw,1.5rem)]">
          <span className="lt-badge w-fit">Latest News</span>

          <div className="flex flex-col justify-between gap-[clamp(0.9rem,2vw,1.5rem)] md:flex-row md:items-end">
            <div className="max-w-[clamp(20rem,50vw,44rem)]">
              <h2 className="lt-title">
                Fresh stories from Lifetopia World.
              </h2>

              <p className="mt-[clamp(0.7rem,1.5vw,1.3rem)] text-[clamp(0.72rem,1.15vw,1.15rem)] leading-[1.75] text-[#7a5635]">
                Follow the latest development updates, community stories, and
                cozy announcements from the world we are building together.
              </p>
            </div>

            <Link href="/notes" className="lt-button-secondary w-fit">
              View All Notes
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[clamp(0.45rem,2vw,1.5rem)]">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[clamp(0.75rem,2.4vw,2rem)] border border-white/80 bg-white/75 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#fff8e8]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-[clamp(0.45rem,1.4vw,1.2rem)] p-[clamp(0.5rem,1.8vw,1.5rem)]">
                <span className="w-fit rounded-full border border-[#d9c99f] bg-[#fff8e8] px-[clamp(0.4rem,1vw,0.9rem)] py-[clamp(0.16rem,0.5vw,0.35rem)] text-[clamp(0.48rem,0.85vw,0.8rem)] font-semibold text-[#4f8124]">
                  {item.category}
                </span>

                <div>
                  <h3 className="line-clamp-2 text-[clamp(0.68rem,1.35vw,1.35rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#2f1b12]">
                    {item.title}
                  </h3>

                  <p className="mt-[clamp(0.35rem,0.9vw,0.8rem)] line-clamp-3 text-[clamp(0.52rem,1vw,0.95rem)] leading-[1.55] text-[#7a5635]">
                    {item.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-[clamp(0.35rem,1vw,1rem)] pt-[clamp(0.1rem,0.5vw,0.4rem)]">
                  <time
                    dateTime={item.publishedAt}
                    className="text-[clamp(0.46rem,0.9vw,0.85rem)] font-medium text-[#7a5635]/75"
                  >
                    {new Date(item.publishedAt).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>

                  <Link
                    href={`/notes/${item.slug}`}
                    className="shrink-0 text-[clamp(0.46rem,0.95vw,0.9rem)] font-bold text-[#4f8124] transition hover:text-[#2f1b12]"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}