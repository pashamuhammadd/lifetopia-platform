import Image from "next/image";
import type { JourneyMilestone } from "@repo/data/journey";

type JourneyMediaProps = {
  milestone: JourneyMilestone;
};

export function JourneyMedia({ milestone }: JourneyMediaProps) {
  const media = milestone.media ?? [];

  return (
    <div>
      <h4 className="text-[clamp(0.7rem,1.8vw,1.5rem)] font-black text-[#244b14]">
        ✨ Gameplay Highlights ({milestone.label})
      </h4>

      <div className="mt-[clamp(8px,1.6vw,24px)] grid grid-cols-3 gap-[clamp(5px,1vw,18px)]">
        {media.map((item, index) => (
          <div key={item.src} className="group">
            <div className="relative aspect-video overflow-hidden rounded-[clamp(8px,1.4vw,18px)] border border-[#d9c99f] bg-white shadow-md">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized={item.type === "gif"}
                sizes="33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {item.type === "gif" && (
                <span className="absolute right-[clamp(3px,0.7vw,12px)] top-[clamp(3px,0.7vw,12px)] rounded-[clamp(4px,0.6vw,8px)] bg-black/75 px-[clamp(4px,0.8vw,12px)] py-[clamp(1px,0.25vw,4px)] text-[clamp(0.32rem,0.65vw,0.75rem)] font-black text-white">
                  GIF
                </span>
              )}
            </div>

            <div className="mt-[clamp(4px,0.8vw,12px)] flex items-center gap-[clamp(3px,0.6vw,8px)]">
              <span className="flex h-[clamp(14px,1.9vw,28px)] w-[clamp(14px,1.9vw,28px)] items-center justify-center rounded-[clamp(4px,0.6vw,8px)] bg-[#6fa83a] text-[clamp(0.34rem,0.8vw,0.875rem)] font-black text-white shadow-sm">
                {index + 1}
              </span>

              <p className="truncate text-[clamp(0.42rem,1.2vw,1.125rem)] font-black text-[#244b14]">
                {item.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
