import type { DocumentStatus } from "@repo/docs-data";

type DocumentStatusBadgeProps = {
  status: DocumentStatus;
  compact?: boolean;
};

function getStatusClasses(
  status: DocumentStatus,
) {
  if (status === "Live") {
    return "border-[#bdd6ae] bg-[#edf6e6] text-[#647653]";
  }

  if (status === "Public Draft") {
    return "border-[#c9dfea] bg-[#eaf5fa] text-[#477893]";
  }

  if (status === "In Preparation") {
    return "border-[#e2cf9d] bg-[#fff2d2] text-[#946c25]";
  }

  if (status === "Archived") {
    return "border-[#d7cec2] bg-[#eee8df] text-[#827462]";
  }

  return "border-[#d4c8dc] bg-[#f2ebf4] text-[#68556f]";
}

export function DocumentStatusBadge({
  status,
  compact = false,
}: DocumentStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex w-fit shrink-0 items-center rounded-full border font-extrabold leading-none",
        compact
          ? "px-2 py-1 text-[0.56rem]"
          : "px-3 py-1.5 text-[0.66rem]",
        getStatusClasses(status),
      ].join(" ")}
    >
      {status}
    </span>
  );
}