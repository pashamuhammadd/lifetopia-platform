type JourneyNavigationProps = {
  total: number;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export function JourneyNavigation({
  total,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
}: JourneyNavigationProps) {
  return (
    <div className="mt-[clamp(12px,1.8vw,28px)] flex items-center justify-center gap-[clamp(7px,1vw,14px)]">
      <button
        type="button"
        onClick={onPrevious}
        className="h-[clamp(24px,2.4vw,36px)] w-[clamp(24px,2.4vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(1rem,1.6vw,1.4rem)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
        aria-label="Previous journey milestone"
      >
        ‹
      </button>

      <div className="flex items-center gap-[clamp(5px,0.6vw,8px)] rounded-full border border-white/70 bg-white/55 px-[clamp(10px,1vw,16px)] py-[clamp(7px,0.8vw,12px)] shadow-[0_8px_22px_rgba(88,60,28,0.12)] backdrop-blur-md">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={`h-[clamp(5px,0.45vw,8px)] rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-[clamp(18px,2vw,32px)] bg-[#6fa83a]"
                : "w-[clamp(5px,0.45vw,8px)] bg-[#d8c59f] hover:bg-[#b8a77d]"
            }`}
            aria-label={`Go to journey milestone ${index + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="h-[clamp(24px,2.4vw,36px)] w-[clamp(24px,2.4vw,36px)] rounded-full border border-white/70 bg-white/90 text-[clamp(1rem,1.6vw,1.4rem)] font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
        aria-label="Next journey milestone"
      >
        ›
      </button>
    </div>
  );
}
