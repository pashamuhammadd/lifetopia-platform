const visionItems = [
  "Cozy Life Simulation",
  "Community First",
  "Web3 Optional",
  "Cross Platform",
  "Global Players",
];

export function JourneyVision() {
  return (
    <div>
      <h4 className="text-[clamp(0.7rem,1.8vw,1.5rem)] font-black text-[#244b14]">
        💡 Original Vision
      </h4>

      <div className="mt-[clamp(8px,1.6vw,24px)] grid grid-cols-2 gap-[clamp(6px,1vw,16px)]">
        {visionItems.map((item) => (
          <div
            key={item}
            className="rounded-[clamp(10px,1.6vw,22px)] border border-[#d9c99f] bg-[#fffdf2] p-[clamp(8px,1.4vw,20px)] shadow-sm"
          >
            <div className="text-[clamp(0.34rem,0.75vw,0.875rem)] font-black text-[#7a5635]">
              Focus
            </div>
            <div className="mt-[clamp(3px,0.6vw,8px)] text-[clamp(0.52rem,1.5vw,1.5rem)] font-black text-[#4f8124]">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
