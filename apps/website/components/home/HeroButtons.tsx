export function HeroButtons() {
  return (
    <div className="mt-[1.7vw] flex flex-wrap gap-[1vw]">
      <a
        href="/play"
        className="lt-button-primary px-[2vw] py-[0.9vw] text-[clamp(0.36rem,1.15vw,1.15rem)]"
      >
        Play Game 🍃
      </a>

      <button className="lt-button-secondary px-[2vw] py-[0.9vw] text-[clamp(0.36rem,1.15vw,1.15rem)]">
        Watch Trailer ▶
      </button>
    </div>
  );
}