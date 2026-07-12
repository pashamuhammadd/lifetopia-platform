import type { MetadataRoute } from "next";

const portalUrl =
  "https://grants.lifetopiaworld.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${portalUrl}/sitemap.xml`,
  };
}