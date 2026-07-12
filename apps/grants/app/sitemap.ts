import type { MetadataRoute } from "next";

const portalUrl =
  "https://grants.lifetopiaworld.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portalUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}