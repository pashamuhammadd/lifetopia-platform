import Image from "next/image";
import { locations } from "@/data/homepage";

export function ExploreSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black">Explore Lifetopia 🍃</h2>
          <p className="mt-2 text-[#6b5b4a]">
            Every corner of Lifetopia has its own charm. Where will your journey
            take you?
          </p>
        </div>

        <button className="hidden rounded-full border border-[#d8c59f] bg-white/70 px-6 py-3 font-bold text-[#5f8f2f] md:block">
          View All
        </button>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {locations.map((item) => (
          <article
            key={item.title}
            className="lt-card min-w-[260px] overflow-hidden"
          >
            <div className="relative h-40">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-black">{item.title} 🍃</h3>
              <p className="mt-2 text-sm leading-6 text-[#6b5b4a]">
                {item.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}