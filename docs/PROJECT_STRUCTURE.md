# Lifetopia World — Project Structure

Generated automatically.

```text
lifetopia-platform
├── .github
│   └── workflows
│       ├── build-start.yml
│       └── development-update.yml
├── apps
│   ├── docs
│   │   ├── app
│   │   │   ├── fonts
│   │   │   │   ├── GeistMonoVF.woff
│   │   │   │   └── GeistVF.woff
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.module.css
│   │   │   └── page.tsx
│   │   ├── public
│   │   │   ├── file-text.svg
│   │   │   ├── globe.svg
│   │   │   ├── next.svg
│   │   │   ├── turborepo-dark.svg
│   │   │   ├── turborepo-light.svg
│   │   │   ├── vercel.svg
│   │   │   └── window.svg
│   │   ├── .gitignore
│   │   ├── eslint.config.js
│   │   ├── next-env.d.ts
│   │   ├── next.config.js
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   └── website
│       ├── app
│       │   ├── fonts
│       │   │   ├── GeistMonoVF.woff
│       │   │   └── GeistVF.woff
│       │   ├── favicon.ico
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   ├── manifest.ts
│       │   ├── page.module.css
│       │   ├── page.tsx
│       │   ├── robots.ts
│       │   └── sitemap.ts
│       ├── components
│       │   ├── home
│       │   │   ├── account
│       │   │   │   ├── AccountFeatureGrid.tsx
│       │   │   │   ├── AccountPreviewCard.tsx
│       │   │   │   └── AccountSection.tsx
│       │   │   ├── community
│       │   │   │   └── CommunitySection.tsx
│       │   │   ├── development-journey
│       │   │   │   ├── DevelopmentJourneySection.tsx
│       │   │   │   ├── JourneyContent.tsx
│       │   │   │   ├── JourneyGrant.tsx
│       │   │   │   ├── JourneyHeader.tsx
│       │   │   │   ├── JourneyLightbox.tsx
│       │   │   │   ├── JourneyMedia.tsx
│       │   │   │   ├── JourneyNavigation.tsx
│       │   │   │   ├── JourneyProgress.tsx
│       │   │   │   ├── JourneyTimeline.tsx
│       │   │   │   └── JourneyVision.tsx
│       │   │   ├── footer
│       │   │   │   └── Footer.tsx
│       │   │   ├── gameplay
│       │   │   │   ├── GameplayCards.tsx
│       │   │   │   └── GameplaySection.tsx
│       │   │   ├── hero
│       │   │   │   ├── HeroBackground.tsx
│       │   │   │   ├── HeroButtons.tsx
│       │   │   │   ├── HeroContent.tsx
│       │   │   │   ├── HeroPartner.tsx
│       │   │   │   └── HeroSection.tsx
│       │   │   ├── news
│       │   │   │   └── NewsSection.tsx
│       │   │   └── RoadmapSection.tsx
│       │   ├── layout
│       │   │   └── Navbar.tsx
│       │   ├── seo
│       │   │   └── JsonLd.tsx
│       │   ├── shared
│       │   │   └── .gitkeep
│       │   └── ui
│       │       └── .gitkeep
│       ├── config
│       ├── constants
│       ├── data
│       │   ├── account.ts
│       │   ├── community.ts
│       │   ├── footer.ts
│       │   ├── homepage.ts
│       │   ├── journey.ts
│       │   ├── navigation.ts
│       │   ├── news.ts
│       │   └── roadmap.ts
│       ├── hooks
│       ├── lib
│       │   └── format.ts
│       ├── providers
│       ├── public
│       │   ├── audio
│       │   ├── fonts
│       │   ├── images
│       │   │   ├── backgrounds
│       │   │   ├── characters
│       │   │   ├── community
│       │   │   │   └── community-preview.png
│       │   │   ├── decorations
│       │   │   ├── hero
│       │   │   │   └── LT-011-hero-village.png
│       │   │   ├── icons
│       │   │   │   ├── gameplay
│       │   │   │   │   ├── LT-001-farm-harvest.png
│       │   │   │   │   ├── LT-002-fish-explore.png
│       │   │   │   │   ├── LT-003-craft-create.png
│       │   │   │   │   ├── LT-004-build-decorate.png
│       │   │   │   │   ├── LT-005-play-together.png
│       │   │   │   │   ├── LT-006-cooking-baking.png
│       │   │   │   │   ├── LT-007-mining.png
│       │   │   │   │   ├── LT-008-woodcutting.png
│       │   │   │   │   ├── LT-009-animal-care.png
│       │   │   │   │   └── LT-010-gathering-foraging.png
│       │   │   │   └── navigation
│       │   │   ├── journey
│       │   │   │   ├── alpha
│       │   │   │   │   ├── alpha-01.png
│       │   │   │   │   ├── alpha-02.png
│       │   │   │   │   ├── alpha-03.png
│       │   │   │   │   ├── alpha-04.png
│       │   │   │   │   ├── alpha-05.png
│       │   │   │   │   ├── alpha-06.png
│       │   │   │   │   ├── alpha-07.png
│       │   │   │   │   ├── alpha-08.png
│       │   │   │   │   └── alpha-09.png
│       │   │   │   └── mvp
│       │   │   │       ├── mvp-01.gif
│       │   │   │       ├── mvp-02.gif
│       │   │   │       ├── mvp-03.gif
│       │   │   │       ├── mvp-04.gif
│       │   │   │       └── mvp-05.gif
│       │   │   ├── locations
│       │   │   ├── logo
│       │   │   │   ├── logo-lifetopia-world.png
│       │   │   │   └── logo-superteam-id.jpg
│       │   │   ├── og
│       │   │   │   └── lifetopia-og.png
│       │   │   └── ui
│       │   ├── file-text.svg
│       │   ├── globe.svg
│       │   ├── googlebb55aabac16671b7.html
│       │   ├── next.svg
│       │   ├── turborepo-dark.svg
│       │   ├── turborepo-light.svg
│       │   ├── vercel.svg
│       │   └── window.svg
│       ├── services
│       ├── styles
│       │   └── .gitkeep
│       ├── types
│       │   ├── .gitkeep
│       │   ├── account.ts
│       │   ├── community.ts
│       │   ├── footer.ts
│       │   ├── news.ts
│       │   └── roadmap.ts
│       ├── utils
│       │   └── .gitkeep
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── README.md
│       └── tsconfig.json
├── docs
│   ├── api
│   ├── architecture
│   ├── design-system
│   └── roadmap
├── packages
│   ├── config
│   ├── eslint-config
│   │   ├── base.js
│   │   ├── next.js
│   │   ├── package.json
│   │   ├── react-internal.js
│   │   └── README.md
│   ├── hooks
│   ├── lib
│   ├── types
│   ├── typescript-config
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── package.json
│   │   └── react-library.json
│   ├── ui
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── layout
│   │   │   │   ├── shared
│   │   │   │   └── ui
│   │   │   ├── hooks
│   │   │   ├── lib
│   │   │   ├── styles
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── code.tsx
│   │   ├── eslint.config.mjs
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── utils
├── scripts
│   └── generate-docs.mjs
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

```
