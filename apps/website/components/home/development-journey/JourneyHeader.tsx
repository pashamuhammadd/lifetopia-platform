export function JourneyHeader() {
  return (
    <div className="text-center">
      <span className="lt-badge px-[clamp(10px,1.2vw,20px)] py-[clamp(5px,0.55vw,8px)] text-[clamp(0.52rem,0.8vw,0.9rem)]">
        🌱 Proof of Execution
      </span>

      <h2 className="lt-title mt-[clamp(10px,1.3vw,18px)] text-[clamp(1.55rem,4vw,4rem)] leading-tight">
        Development Journey
      </h2>

      <p className="mx-auto mt-[clamp(6px,1vw,16px)] max-w-3xl text-[clamp(0.56rem,1.05vw,1.1rem)] font-bold leading-[1.45] text-[#7a5635]">
        Every milestone represents real progress toward building Lifetopia
        World from idea, MVP, Public Alpha, and now Generation 2.
      </p>
    </div>
  );
}