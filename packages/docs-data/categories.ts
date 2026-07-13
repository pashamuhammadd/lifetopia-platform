import type {
  DocsLocale,
  DocumentCategory,
  DocumentCategorySource,
  LocalizedText,
} from "./types";

export const documentCategorySources: DocumentCategorySource[] = [
  {
    id: "start-here",
    order: 1,
    label: {
      en: "Start Here",
      id: "Mulai di Sini",
    },
    description: {
      en: "Recommended documents for understanding Lifetopia World.",
      id: "Dokumen yang disarankan untuk memahami Lifetopia World.",
    },
  },
  {
    id: "project",
    order: 2,
    label: {
      en: "Project",
      id: "Proyek",
    },
    description: {
      en: "Vision, scope, team, and the overall project direction.",
      id: "Visi, cakupan, tim, dan arah proyek secara keseluruhan.",
    },
  },
  {
    id: "product",
    order: 3,
    label: {
      en: "Product",
      id: "Produk",
    },
    description: {
      en: "Documentation for the game and connected Lifetopia products.",
      id: "Dokumentasi game dan produk-produk Lifetopia yang terhubung.",
    },
  },
  {
    id: "development",
    order: 4,
    label: {
      en: "Development",
      id: "Pengembangan",
    },
    description: {
      en: "Roadmaps, milestones, releases, and public development activity.",
      id: "Roadmap, milestone, rilis, dan aktivitas pengembangan publik.",
    },
  },
  {
    id: "technical",
    order: 5,
    label: {
      en: "Technical",
      id: "Teknis",
    },
    description: {
      en: "Architecture, authentication, database, and blockchain integration.",
      id: "Arsitektur, autentikasi, database, dan integrasi blockchain.",
    },
  },
  {
    id: "funding",
    order: 6,
    label: {
      en: "Funding",
      id: "Pendanaan",
    },
    description: {
      en: "Funding proposals, grant history, budgets, and delivery evidence.",
      id: "Proposal pendanaan, riwayat grant, anggaran, dan bukti pengiriman.",
    },
  },
  {
    id: "economy",
    order: 7,
    label: {
      en: "Economy",
      id: "Ekonomi",
    },
    description: {
      en: "Player economy, GOLD, ownership, and marketplace systems.",
      id: "Ekonomi pemain, GOLD, kepemilikan, dan sistem marketplace.",
    },
  },
  {
    id: "community",
    order: 8,
    label: {
      en: "Community",
      id: "Komunitas",
    },
    description: {
      en: "Community platform, player identity, participation, and governance.",
      id: "Platform komunitas, identitas pemain, partisipasi, dan governance.",
    },
  },
  {
    id: "legal-security",
    order: 9,
    label: {
      en: "Legal & Security",
      id: "Legal & Keamanan",
    },
    description: {
      en: "Security principles, policies, disclaimers, and risk information.",
      id: "Prinsip keamanan, kebijakan, disclaimer, dan informasi risiko.",
    },
  },
];

function resolveText(
  text: LocalizedText,
  locale: DocsLocale,
) {
  return text[locale];
}

export function getDocumentCategories(
  locale: DocsLocale = "en",
): DocumentCategory[] {
  return documentCategorySources
    .map((category) => ({
      id: category.id,
      order: category.order,
      label: resolveText(category.label, locale),
      description: resolveText(
        category.description,
        locale,
      ),
    }))
    .sort((a, b) => a.order - b.order);
}

export function getDocumentCategory(
  categoryId: DocumentCategorySource["id"],
  locale: DocsLocale = "en",
) {
  return getDocumentCategories(locale).find(
    (category) => category.id === categoryId,
  );
}