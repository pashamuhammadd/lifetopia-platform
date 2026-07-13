export type DocsLocale = "en" | "id";

export type LocalizedText = {
  en: string;
  id: string;
};

export type DocumentStatus =
  | "Live"
  | "Public Draft"
  | "In Preparation"
  | "Planned"
  | "Archived";

export type DocumentCategoryId =
  | "start-here"
  | "project"
  | "product"
  | "development"
  | "technical"
  | "funding"
  | "economy"
  | "community"
  | "legal-security";

export type DocumentCategorySource = {
  id: DocumentCategoryId;
  order: number;
  label: LocalizedText;
  description: LocalizedText;
};

export type DocumentCategory = {
  id: DocumentCategoryId;
  order: number;
  label: string;
  description: string;
};

export type DocumentSectionSource = {
  id: string;
  title: LocalizedText;
  paragraphs?: LocalizedText[];
  bullets?: LocalizedText[];
};

export type DocumentSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LifetopiaDocumentSource = {
  slug: string;
  category: DocumentCategoryId;
  order: number;

  title: LocalizedText;
  eyebrow: LocalizedText;
  description: LocalizedText;

  status: DocumentStatus;
  updatedAt: string;
  owner: string;
  readingTime: number;
  version: string;

  featured?: boolean;
  recentlyUpdated?: boolean;

  sections: DocumentSectionSource[];
};

export type LifetopiaDocument = {
  slug: string;
  category: DocumentCategoryId;
  order: number;

  title: string;
  eyebrow: string;
  description: string;

  status: DocumentStatus;
  updatedAt: string;
  owner: string;
  readingTime: number;
  version: string;

  featured: boolean;
  recentlyUpdated: boolean;

  sections: DocumentSection[];
};