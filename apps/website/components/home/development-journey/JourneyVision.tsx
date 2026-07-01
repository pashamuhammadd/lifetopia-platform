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
      <h4 className="text-2xl font-black text-[#244b14]">
        💡 Original Vision
      </h4>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visionItems.map((item) => (
          <div
            key={item}
            className="rounded-[22px] border border-[#d9c99f] bg-[#fffdf2] p-5 shadow-sm"
          >
            <div className="text-sm font-black text-[#7a5635]">Focus</div>
            <div className="mt-2 text-2xl font-black text-[#4f8124]">
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}