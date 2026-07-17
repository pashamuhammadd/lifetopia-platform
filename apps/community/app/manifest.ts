import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lifetopia Community",
    short_name: "Lifetopia",
    description:
      "The official social platform for Lifetopians to share, connect, and grow their player identity.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff7e8",
    theme_color: "#6fa83a",
    lang: "en",
    categories: ["social", "games", "entertainment"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
