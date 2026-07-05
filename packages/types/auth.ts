export type PlayerAvatar = {
  id: string;
  name: string;
  image: string;
};

export type CountryOption = {
  code: string;
  name: string;
  flag: string;
};

export type RegisterStep = "avatar" | "identity" | "security" | "terms";