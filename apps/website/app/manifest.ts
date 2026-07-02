import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lifetopia World",
    short_name: "Lifetopia",
    description:
      "Build your dream life in a cozy fantasy world. Farm, fish, craft, decorate, make friends, and explore relaxing adventures.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8e8",
    theme_color: "#6fa83a",
    lang: "en",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}