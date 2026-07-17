import {
  CheckCircle2,
  CircleDashed,
  LoaderCircle,
} from "lucide-react";

import type {
  JourneyChecklistItem,
  JourneyMilestone,
} from "@repo/data/journey";

type JourneyProgressProps = {
  milestone: JourneyMilestone;
};

function getChecklistPresentation(
  item: JourneyChecklistItem,
) {
  if (item.status === "completed") {
    return {
      Icon: CheckCircle2,
      card: "border-[#c8dfba] bg-[#f2f9ed]",
      icon: "text-[#5c963f]",
      label: "Completed",
      badge:
        "border-[#c1daaf] bg-[#e9f5e1] text-[#507f3b]",
    };
  }

  if (item.status === "active") {
    return {
      Icon: LoaderCircle,
      card: "border-[#e3ca83] bg-[#fff8df]",
      icon: "text-[#b17c18]",
      label: "In Progress",
      badge:
        "border-[#e4c774] bg-[#fff1c4] text-[#936813]",
    };
  }

  return {
    Icon: CircleDashed,
    card: "border-[#d9d1c3] bg-[#fbf8f2]",
    icon: "text-[#92836d]",
    label: "Planned",
    badge:
      "border-[#d8d0c3] bg-[#f1ece4] text-[#7d705e]",
  };
}

export function JourneyProgress({
  milestone,
}: JourneyProgressProps) {
  const checklist =
    milestone.checklist ?? [];

  const isCurrent =
    milestone.state === "current";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[clamp(0.68rem,0.76vw,0.8rem)] font-black uppercase tracking-[0.09em] text-[#668255]">
            {isCurrent
              ? "Current Beta Stage"
              : "Foundation Delivery"}
          </p>

          <h4 className="mt-1.5 text-[clamp(1rem,1.35vw,1.3rem)] font-black text-[#244b14]">
            {isCurrent
              ? "Current development focus"
              : "Delivered product foundation"}
          </h4>
        </div>

        <span
          className={[
            "rounded-full border px-3 py-1.5 text-[clamp(0.66rem,0.74vw,0.78rem)] font-black",
            isCurrent
              ? "border-[#e0c476] bg-[#fff2c9] text-[#946813]"
              : "border-[#c4ddaF] bg-[#edf7e7] text-[#527d40]",
          ].join(" ")}
        >
          {milestone.status}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        {checklist.map((item) => {
          const presentation =
            getChecklistPresentation(item);

          const Icon =
            presentation.Icon;

          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${presentation.card}`}
            >
              <Icon
                className={`size-5 shrink-0 ${presentation.icon}`}
              />

              <p className="min-w-0 flex-1 text-[clamp(0.78rem,0.88vw,0.92rem)] font-black leading-[1.4] text-[#4c4033]">
                {item.label}
              </p>

              <span
                className={`hidden shrink-0 rounded-full border px-2.5 py-1 text-[0.64rem] font-black sm:inline-flex ${presentation.badge}`}
              >
                {presentation.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[clamp(0.7rem,0.78vw,0.82rem)] leading-[1.5] text-[#81725f]">
        Detailed future deliverables are shown
        separately in the Roadmap section.
      </p>
    </div>
  );
}