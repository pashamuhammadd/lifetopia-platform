export const COMMUNITY_REPORT_REASONS = [
  {
    value: "spam",
    label: "Spam",
    description: "Repeated, irrelevant, or promotional content.",
  },
  {
    value: "harassment",
    label: "Harassment",
    description: "Targeted intimidation, threats, or unwanted behavior.",
  },
  {
    value: "hate_or_abuse",
    label: "Hate or abuse",
    description: "Abusive or hateful content directed at a person or group.",
  },
  {
    value: "scam_or_fraud",
    label: "Scam or fraud",
    description: "Suspicious offers, impersonation, phishing, or fraud.",
  },
  {
    value: "privacy",
    label: "Privacy violation",
    description: "Private or sensitive information shared without permission.",
  },
  {
    value: "misinformation",
    label: "Misleading information",
    description: "Content that may intentionally mislead the community.",
  },
  {
    value: "other",
    label: "Other",
    description: "A different issue that needs moderator review.",
  },
] as const;

export type CommunityReportReason =
  (typeof COMMUNITY_REPORT_REASONS)[number]["value"];

export type CommunityReportTarget = "post" | "comment";

export type CommunityReportStatus =
  | "pending"
  | "reviewing"
  | "resolved"
  | "dismissed";

export const COMMUNITY_REPORT_DETAILS_MAX_LENGTH = 500;

export function isCommunityReportReason(
  value: string,
): value is CommunityReportReason {
  return COMMUNITY_REPORT_REASONS.some(
    (reason) => reason.value === value,
  );
}

export function isCommunityReportTarget(
  value: string,
): value is CommunityReportTarget {
  return value === "post" || value === "comment";
}

export function isCommunityReportStatus(
  value: string,
): value is CommunityReportStatus {
  return (
    value === "pending" ||
    value === "reviewing" ||
    value === "resolved" ||
    value === "dismissed"
  );
}
