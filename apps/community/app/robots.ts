import type { MetadataRoute } from "next";

const COMMUNITY_URL = "https://community.lifetopiaworld.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/explore", "/guild", "/user/"],
      disallow: [
        "/api/",
        "/my-world",
        "/quest",
        "/notifications",
        "/settings",
        "/messages",
        "/admin",
      ],
    },
    sitemap: `${COMMUNITY_URL}/sitemap.xml`,
    host: COMMUNITY_URL,
  };
}
