import type { MetadataRoute } from "next";

import { createClient } from "@repo/lib/supabase/server";

const COMMUNITY_URL = "https://community.lifetopiaworld.io";

const publicRoutes: MetadataRoute.Sitemap = [
  {
    url: COMMUNITY_URL,
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${COMMUNITY_URL}/explore`,
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${COMMUNITY_URL}/guild`,
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("username, created_at")
      .not("username", "is", null)
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error || !data) {
      return publicRoutes;
    }

    const profileRoutes: MetadataRoute.Sitemap = data
      .filter(
        (profile): profile is { username: string; created_at: string } =>
          typeof profile.username === "string" &&
          profile.username.trim().length > 0 &&
          typeof profile.created_at === "string",
      )
      .map((profile) => ({
        url: `${COMMUNITY_URL}/user/${encodeURIComponent(profile.username)}`,
        lastModified: new Date(profile.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    return [...publicRoutes, ...profileRoutes];
  } catch {
    return publicRoutes;
  }
}
