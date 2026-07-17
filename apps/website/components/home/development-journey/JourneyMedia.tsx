import type {
  JourneyMilestone,
} from "@repo/data/journey";
import Image from "next/image";

type JourneyMediaProps = {
  milestone: JourneyMilestone;
};

export function JourneyMedia({
  milestone,
}: JourneyMediaProps) {
  const media = milestone.media ?? [];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[clamp(0.95rem,1.3vw,1.25rem)] font-black text-[#244b14]">
          Build Highlights
        </h4>

        <span className="rounded-full border border-[#c9dcbf] bg-[#eff7e9] px-2.5 py-1 text-[0.66rem] font-black text-[#587d48]">
          {media.length} records
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-[clamp(0.4rem,0.9vw,0.8rem)]">
        {media.map((item, index) => (
          <figure
            key={item.src}
            className="group min-w-0"
          >
            <div className="relative aspect-video overflow-hidden rounded-[clamp(0.55rem,1vw,0.85rem)] border border-[#d9c99f] bg-white shadow-sm">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized={
                  item.type === "gif"
                }
                sizes="(max-width: 768px) 30vw, 18vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {item.type === "gif" ? (
                <span className="absolute right-1.5 top-1.5 rounded-md bg-black/72 px-1.5 py-0.5 text-[0.6rem] font-black text-white">
                  GIF
                </span>
              ) : null}
            </div>

            <figcaption className="mt-1.5 flex min-w-0 items-center gap-1.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-[#6fa83a] text-[0.62rem] font-black text-white">
                {index + 1}
              </span>

              <span className="truncate text-[clamp(0.68rem,0.76vw,0.8rem)] font-black text-[#536d42]">
                {item.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}