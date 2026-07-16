export type CommunityFeatureIcon =
  | "discussion"
  | "profile"
  | "updates"
  | "social";

export type CommunityFeature = {
  icon: CommunityFeatureIcon;
  title: string;
  description: string;
};