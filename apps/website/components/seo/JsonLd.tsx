export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://lifetopiaworld.io/#organization",
        name: "Nimia Games",
        url: "https://lifetopiaworld.io",
        logo: "https://lifetopiaworld.io/images/logo/logo-lifetopia-world.png",
        founder: {
          "@type": "Person",
          name: "Pasha Muhammad",
        },
      },
      {
        "@type": "VideoGame",
        "@id": "https://lifetopiaworld.io/#videogame",
        name: "Lifetopia World",
        url: "https://lifetopiaworld.io",
        image: "https://lifetopiaworld.io/images/og/lifetopia-og.png",
        description:
          "Build your dream life in a cozy fantasy world. Farm, fish, craft, decorate, make friends, and explore relaxing adventures in Lifetopia World.",
        genre: [
          "Cozy Game",
          "Life Simulation",
          "Farming Game",
          "Fantasy Game",
          "Social Sandbox",
          "Web3 Game",
        ],
        gamePlatform: ["Web", "PC", "Mobile"],
        applicationCategory: "Game",
        publisher: {
          "@id": "https://lifetopiaworld.io/#organization",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://lifetopiaworld.io/#website",
        name: "Lifetopia World",
        url: "https://lifetopiaworld.io",
        publisher: {
          "@id": "https://lifetopiaworld.io/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
