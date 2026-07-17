import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

type JourneyNavigationProps = {
  total: number;
  activeIndex: number;
  isPaused: boolean;
  isAutoPlayDisabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onTogglePause: () => void;
};

export function JourneyNavigation({
  total,
  activeIndex,
  isPaused,
  isAutoPlayDisabled,
  onPrevious,
  onNext,
  onSelect,
  onTogglePause,
}: JourneyNavigationProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
      <button
        type="button"
        onClick={onPrevious}
        className="flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#4f8124] shadow-[0_0.5rem_1.4rem_rgba(88,60,28,0.12)] transition hover:-translate-y-0.5 hover:bg-white"
        aria-label="Previous journey milestone"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex min-h-10 items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 shadow-[0_0.5rem_1.4rem_rgba(88,60,28,0.1)] backdrop-blur-md">
        {Array.from({
          length: total,
        }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              onSelect(index)
            }
            aria-label={`Go to journey milestone ${index + 1}`}
            aria-current={
              activeIndex === index
                ? "true"
                : undefined
            }
            className={[
              "h-2 rounded-full transition-all duration-300",
              activeIndex === index
                ? "w-7 bg-[#6fa83a]"
                : "w-2 bg-[#d8c59f] hover:bg-[#aa976d]",
            ].join(" ")}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#4f8124] shadow-[0_0.5rem_1.4rem_rgba(88,60,28,0.12)] transition hover:-translate-y-0.5 hover:bg-white"
        aria-label="Next journey milestone"
      >
        <ChevronRight className="size-5" />
      </button>

      <button
        type="button"
        onClick={onTogglePause}
        disabled={isAutoPlayDisabled}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#d5c7aa] bg-[#fffaf0] px-3.5 text-[0.72rem] font-black text-[#675946] shadow-[0_0.5rem_1.4rem_rgba(88,60,28,0.08)] transition hover:-translate-y-0.5 hover:bg-white disabled:pointer-events-none disabled:opacity-55"
        aria-label={
          isAutoPlayDisabled
            ? "Automatic journey movement disabled by reduced-motion preference"
            : isPaused
              ? "Resume automatic journey movement"
              : "Pause automatic journey movement"
        }
      >
        {isAutoPlayDisabled ? (
          <>
            <Pause className="size-3.5" />
            Auto-play off
          </>
        ) : isPaused ? (
          <>
            <Play className="size-3.5" />
            Resume
          </>
        ) : (
          <>
            <Pause className="size-3.5" />
            Pause
          </>
        )}
      </button>
    </div>
  );
}