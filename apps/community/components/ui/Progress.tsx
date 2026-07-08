type ProgressProps = {
  value: number;
};

export function Progress({
  value,
}: ProgressProps) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[#eadfbd]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#6fa83a] to-[#4f8124]"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}