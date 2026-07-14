import { getDocuments } from "@repo/docs-data";
import type { MetadataRoute } from "next";

const docsSiteUrl =
  "https://docs.lifetopiaworld.io";

function createLastModifiedDate(
  value: string,
) {
  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const documents = getDocuments("en");

  const latestDocumentTimestamp = Math.max(
    ...documents.map((document) =>
      createLastModifiedDate(
        document.updatedAt,
      ).getTime(),
    ),
  );

  const homeLastModified =
    Number.isFinite(latestDocumentTimestamp)
      ? new Date(latestDocumentTimestamp)
      : new Date();

  const documentRoutes: MetadataRoute.Sitemap =
    documents.map((document) => ({
      url: `${docsSiteUrl}/${document.slug}`,

      lastModified: createLastModifiedDate(
        document.updatedAt,
      ),

      changeFrequency:
        document.status === "In Preparation"
          ? "weekly"
          : "monthly",

      priority:
        document.featured
          ? 0.9
          : 0.75,
    }));

  return [
    {
      url: docsSiteUrl,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    ...documentRoutes,
  ];
}