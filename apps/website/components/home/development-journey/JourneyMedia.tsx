import Image from "next/image";
import type { JourneyMilestone } from "@/data/journey";

type JourneyMediaProps = {
  milestone: JourneyMilestone;
};

export function JourneyMedia({ milestone }: JourneyMediaProps) {
  const media = milestone.media ?? [];

  return (
    <div>
      <h4 className="text-2xl font-black text-[#244b14]">
        ✨ Gameplay Highlights ({milestone.label})
      </h4>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {media.map((item, index) => (
          <div key={item.src} className="group">
            <div className="relative aspect-video overflow-hidden rounded-[18px] border border-[#d9c99f] bg-white shadow-md">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized={item.type === "gif"}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {item.type === "gif" && (
                <span className="absolute right-3 top-3 rounded-lg bg-black/75 px-3 py-1 text-xs font-black text-white">
                  GIF
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6fa83a] text-sm font-black text-white shadow-sm">
                {index + 1}
              </span>

              <p className="text-lg font-black text-[#244b14]">{item.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}