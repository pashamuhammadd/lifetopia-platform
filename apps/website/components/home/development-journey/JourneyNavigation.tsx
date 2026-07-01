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
    <div className="mt-5 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        className="h-9 w-9 rounded-full border border-white/70 bg-white/90 text-xl font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
        aria-label="Previous journey milestone"
      >
        ‹
      </button>

      <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-3 shadow-[0_8px_22px_rgba(88,60,28,0.12)] backdrop-blur-md">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-[#6fa83a]"
                : "w-2 bg-[#d8c59f] hover:bg-[#b8a77d]"
            }`}
            aria-label={`Go to journey milestone ${index + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="h-9 w-9 rounded-full border border-white/70 bg-white/90 text-xl font-black text-[#4f8124] shadow-[0_8px_20px_rgba(88,60,28,0.16)] transition hover:-translate-y-0.5 hover:scale-105"
        aria-label="Next journey milestone"
      >
        ›
      </button>
    </div>
  );
}