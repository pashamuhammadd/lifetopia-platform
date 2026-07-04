export type DashboardProfile = {
  id: string;
  username: string;
  display_name: string;
  gender: "male" | "female";
  avatar_id: string;
  country_code: string;
  country_name: string;
  date_of_birth: string;
  created_at: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  description: string;
};

export type QuickAction = {
  title: string;
  description: string;
  href: string;
};