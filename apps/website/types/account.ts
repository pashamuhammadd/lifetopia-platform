export type AccountStat = {
  label: string;
  value: string | number;
};

export type AccountFeature = {
  icon: string;
  title: string;
  desc: string;
};

export type AccountPreviewUser = {
  displayName: string;
  avatar: string;
  level: number;
  role: string;
  progress: number;
  stats: AccountStat[];
};