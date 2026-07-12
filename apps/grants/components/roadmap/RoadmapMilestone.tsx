export type RoadmapMilestoneData = {
  number: string;
  title: string;
  status: "Current" | "Upcoming" | "Planned";
  statusDetail: string;
  funding: string;
  duration: string;
  description: string;
  deliverables: string[];
};

type RoadmapMilestoneProps = {
  milestone: RoadmapMilestoneData;
  isLast?: boolean;
};

function getStatusStyles(
  status: RoadmapMilestoneData["status"],
) {
  if (status === "Current") {
    return {
      marker:
        "border-[#4f9238] bg-[#5da943] text-white shadow-[0_0_0_0.45rem_rgba(93,169,67,0.12)]",
      badge:
        "border-[#78b260]/25 bg-[#e8f4df] text-[#477d34]",
      line: "bg-[#75aa5e]",
      accent: "text-[#4f833c]",
      statusPanel:
        "border-[#cae0bf] bg-[#f0f8eb] text-[#477d34]",
      dot: "bg-[#68ad4a]",
    };
  }

  if (status === "Upcoming") {
    return {
      marker:
        "border-[#4a98c9] bg-[#55a9dc] text-white",
      badge:
        "border-[#65a9d2]/25 bg-[#e6f4fc] text-[#347da9]",
      line: "bg-[#8ebbd4]",
      accent: "text-[#397fa9]",
      statusPanel:
        "border-[#c7e1ef] bg-[#eef8fd] text-[#347da9]",
      dot: "bg-[#55a9dc]",
    };
  }

  return {
    marker:
      "border-[#c9ae70] bg-[#fff6df] text-[#987326]",
    badge:
      "border-[#d4b873]/30 bg-[#fff3d5] text-[#967024]",
    line: "bg-[#ddd1b5]",
    accent: "text-[#9a762d]",
    statusPanel:
      "border-[#ead8aa] bg-[#fff8e7] text-[#967024]",
    dot: "bg-[#d8ad4f]",
  };
}

export function RoadmapMilestone({
  milestone,
  isLast = false,
}: RoadmapMilestoneProps) {
  const styles = getStatusStyles(milestone.status);

  return (
    <article className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-[clamp(0.8rem,1.5vw,1.2rem)]">
      <div className="relative flex flex-col items-center">
        <span
          className={`relative z-10 flex size-[clamp(3rem,4.5vw,3.8rem)] items-center justify-center rounded-full border-[0.2rem] text-[clamp(0.9rem,1.2vw,1.08rem)] font-black ${styles.marker}`}
        >
          {milestone.number}
        </span>

        {!isLast ? (
          <span
            className={`mt-2 h-full min-h-[clamp(5rem,10vw,8rem)] w-[0.16rem] rounded-full ${styles.line}`}
          />
        ) : null}
      </div>

      <div className="min-w-0 pb-[clamp(1.2rem,2.5vw,2rem)]">
        <div className="rounded-[clamp(1rem,1.7vw,1.35rem)] border border-[#ddcfaf] bg-white p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_1rem_3.5rem_rgba(62,47,27,0.07)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-[clamp(0.72rem,0.82vw,0.88rem)] font-black ${styles.badge}`}
              >
                {milestone.status}
              </span>

              <h3 className="mt-3 text-[clamp(1.35rem,2vw,1.9rem)] font-black tracking-[-0.03em] text-[#2f2118]">
                {milestone.title}
              </h3>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2">
              <div className="min-w-[7rem] rounded-[clamp(0.65rem,1vw,0.82rem)] bg-[#f6efe2] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#8b7b62]">
                  Funding
                </p>

                <p
                  className={`mt-1 text-[clamp(0.94rem,1.1vw,1.06rem)] font-black ${styles.accent}`}
                >
                  {milestone.funding}
                </p>
              </div>

              <div className="min-w-[7rem] rounded-[clamp(0.65rem,1vw,0.82rem)] bg-[#f6efe2] px-4 py-3 text-center">
                <p className="text-[clamp(0.68rem,0.76vw,0.82rem)] font-black uppercase tracking-[0.08em] text-[#8b7b62]">
                  Duration
                </p>

                <p className="mt-1 text-[clamp(0.94rem,1.1vw,1.06rem)] font-black text-[#534737]">
                  {milestone.duration}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-[clamp(0.8rem,1.4vw,1.1rem)] max-w-[52rem] text-[clamp(0.92rem,1.02vw,1.08rem)] leading-[1.7] text-[#706452]">
            {milestone.description}
          </p>

          <div
            className={`mt-[clamp(0.9rem,1.5vw,1.2rem)] flex items-start gap-3 rounded-[clamp(0.7rem,1.1vw,0.9rem)] border px-[clamp(0.8rem,1.3vw,1rem)] py-[clamp(0.7rem,1.1vw,0.9rem)] ${styles.statusPanel}`}
          >
            <span
              className={`mt-[0.4rem] size-2.5 shrink-0 rounded-full ${styles.dot}`}
            />

            <div className="min-w-0">
              <p className="text-[clamp(0.7rem,0.8vw,0.86rem)] font-black uppercase tracking-[0.08em]">
                Delivery Status
              </p>

              <p className="mt-1 text-[clamp(0.82rem,0.92vw,0.98rem)] font-semibold leading-[1.55]">
                {milestone.statusDetail}
              </p>
            </div>
          </div>

          <div className="mt-[clamp(1rem,1.7vw,1.3rem)] border-t border-[#eadfc8] pt-[clamp(0.9rem,1.5vw,1.15rem)]">
            <p className="text-[clamp(0.72rem,0.82vw,0.88rem)] font-black uppercase tracking-[0.1em] text-[#668255]">
              Milestone Deliverables
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {milestone.deliverables.map(
                (deliverable, index) => (
                  <div
                    key={deliverable}
                    className="flex items-start gap-3 rounded-[clamp(0.65rem,1vw,0.82rem)] border border-[#e4d9c1] bg-[#faf7ef] px-[clamp(0.75rem,1.2vw,0.95rem)] py-[clamp(0.7rem,1.1vw,0.88rem)]"
                  >
                    <span className="flex size-[clamp(1.7rem,2.5vw,2rem)] shrink-0 items-center justify-center rounded-full bg-[#e8f3df] font-mono text-[clamp(0.64rem,0.72vw,0.78rem)] font-black text-[#4f803b]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-[clamp(0.8rem,0.9vw,0.96rem)] font-semibold leading-[1.55] text-[#665b4b]">
                      {deliverable}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}