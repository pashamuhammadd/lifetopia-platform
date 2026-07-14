import type { MetadataRoute } from "next";

const docsSiteUrl =
  "https://docs.lifetopiaworld.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${docsSiteUrl}/sitemap.xml`,
    host: docsSiteUrl,
  };
}