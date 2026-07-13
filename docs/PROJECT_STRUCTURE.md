# Lifetopia World — Project Structure

Generated automatically.

```text
lifetopia-platform
├── .github
│   └── workflows
│       ├── build-start.yml
│       ├── development-log.yml
│       └── development-update.yml
├── apps
│   ├── community
│   │   ├── app
│   │   │   ├── actions
│   │   │   │   ├── community
│   │   │   │   │   ├── bookmarks.ts
│   │   │   │   │   ├── comments.ts
│   │   │   │   │   ├── likes.ts
│   │   │   │   │   └── posts.ts
│   │   │   │   └── auth.ts
│   │   │   ├── explore
│   │   │   │   └── page.tsx
│   │   │   ├── fonts
│   │   │   │   ├── GeistMonoVF.woff
│   │   │   │   └── GeistVF.woff
│   │   │   ├── guild
│   │   │   │   └── page.tsx
│   │   │   ├── messages
│   │   │   │   └── page.tsx
│   │   │   ├── my-world
│   │   │   │   └── page.tsx
│   │   │   ├── notifications
│   │   │   │   └── page.tsx
│   │   │   ├── quest
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   ├── user
│   │   │   │   └── [username]
│   │   │   │       └── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   └── GuestAuthModal.tsx
│   │   │   ├── explore
│   │   │   │   ├── Explore.tsx
│   │   │   │   ├── SuggestedLifetopians.tsx
│   │   │   │   ├── TrendingPosts.tsx
│   │   │   │   └── TrendingTopics.tsx
│   │   │   ├── feed
│   │   │   │   ├── CreatePost.tsx
│   │   │   │   ├── CreatePostForm.tsx
│   │   │   │   ├── Feed.tsx
│   │   │   │   └── PostCard.tsx
│   │   │   ├── guild
│   │   │   │   ├── Guild.tsx
│   │   │   │   ├── GuildActivity.tsx
│   │   │   │   ├── GuildHero.tsx
│   │   │   │   ├── GuildLeaderboard.tsx
│   │   │   │   └── GuildMembers.tsx
│   │   │   ├── layout
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── BottomNavigation.tsx
│   │   │   │   ├── RightSidebar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidebarNav.tsx
│   │   │   │   └── TopNavbar.tsx
│   │   │   ├── messages
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── ConversationList.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   └── Messages.tsx
│   │   │   ├── my-world
│   │   │   │   ├── MyWorld.tsx
│   │   │   │   ├── MyWorldCommunityStats.tsx
│   │   │   │   ├── MyWorldHeader.tsx
│   │   │   │   ├── MyWorldHero.tsx
│   │   │   │   ├── MyWorldMainGrid.tsx
│   │   │   │   ├── MyWorldRightSidebar.tsx
│   │   │   │   ├── MyWorldSectionCard.tsx
│   │   │   │   └── MyWorldStatCard.tsx
│   │   │   ├── notifications
│   │   │   │   ├── NotificationItem.tsx
│   │   │   │   └── Notifications.tsx
│   │   │   ├── post
│   │   │   │   ├── CommentComposer.tsx
│   │   │   │   ├── CommentItem.tsx
│   │   │   │   ├── CommentsSection.tsx
│   │   │   │   ├── PostActions.tsx
│   │   │   │   └── PostMenu.tsx
│   │   │   ├── profile
│   │   │   │   ├── ProfileHero.tsx
│   │   │   │   ├── ProfilePosts.tsx
│   │   │   │   ├── ProfileStats.tsx
│   │   │   │   └── PublicProfile.tsx
│   │   │   ├── quest
│   │   │   │   ├── CompletedQuestSection.tsx
│   │   │   │   ├── DailyQuestSection.tsx
│   │   │   │   ├── Quest.tsx
│   │   │   │   ├── SeasonQuestSection.tsx
│   │   │   │   └── WeeklyQuestSection.tsx
│   │   │   ├── settings
│   │   │   │   ├── LogoutSection.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   ├── ProfileSettings.tsx
│   │   │   │   ├── SecuritySettings.tsx
│   │   │   │   └── Settings.tsx
│   │   │   └── ui
│   │   │       ├── Avatar.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── InfoCard.tsx
│   │   │       ├── PageHeader.tsx
│   │   │       ├── Progress.tsx
│   │   │       ├── SectionCard.tsx
│   │   │       └── StatCard.tsx
│   │   ├── data
│   │   │   ├── community
│   │   │   │   ├── bookmarks.ts
│   │   │   │   ├── comments.ts
│   │   │   │   ├── likes.ts
│   │   │   │   └── posts.ts
│   │   │   ├── profile
│   │   │   │   ├── current-profile.ts
│   │   │   │   └── public-profile.ts
│   │   │   ├── comments.ts
│   │   │   ├── explore.ts
│   │   │   ├── guild.ts
│   │   │   ├── identity.ts
│   │   │   ├── messages.ts
│   │   │   ├── my-world-layout.ts
│   │   │   ├── my-world.ts
│   │   │   ├── navigation.ts
│   │   │   ├── notifications.ts
│   │   │   ├── posts.ts
│   │   │   ├── quest.ts
│   │   │   └── sidebar.ts
│   │   ├── public
│   │   │   ├── audio
│   │   │   ├── fonts
│   │   │   ├── images
│   │   │   │   ├── avatars
│   │   │   │   │   ├── avatar-01.jpg
│   │   │   │   │   ├── avatar-02.jpg
│   │   │   │   │   ├── avatar-03.jpg
│   │   │   │   │   └── avatar-04.jpg
│   │   │   │   ├── backgrounds
│   │   │   │   ├── characters
│   │   │   │   ├── community
│   │   │   │   │   └── community-preview.png
│   │   │   │   ├── decorations
│   │   │   │   ├── hero
│   │   │   │   │   └── LT-011-hero-village.png
│   │   │   │   ├── icons
│   │   │   │   │   ├── gameplay
│   │   │   │   │   │   ├── LT-001-farm-harvest.png
│   │   │   │   │   │   ├── LT-002-fish-explore.png
│   │   │   │   │   │   ├── LT-003-craft-create.png
│   │   │   │   │   │   ├── LT-004-build-decorate.png
│   │   │   │   │   │   ├── LT-005-play-together.png
│   │   │   │   │   │   ├── LT-006-cooking-baking.png
│   │   │   │   │   │   ├── LT-007-mining.png
│   │   │   │   │   │   ├── LT-008-woodcutting.png
│   │   │   │   │   │   ├── LT-009-animal-care.png
│   │   │   │   │   │   └── LT-010-gathering-foraging.png
│   │   │   │   │   └── navigation
│   │   │   │   ├── journey
│   │   │   │   │   ├── alpha
│   │   │   │   │   │   ├── alpha-01.png
│   │   │   │   │   │   ├── alpha-02.png
│   │   │   │   │   │   ├── alpha-03.png
│   │   │   │   │   │   ├── alpha-04.png
│   │   │   │   │   │   ├── alpha-05.png
│   │   │   │   │   │   ├── alpha-06.png
│   │   │   │   │   │   ├── alpha-07.png
│   │   │   │   │   │   ├── alpha-08.png
│   │   │   │   │   │   └── alpha-09.png
│   │   │   │   │   └── mvp
│   │   │   │   │       ├── mvp-01.gif
│   │   │   │   │       ├── mvp-02.gif
│   │   │   │   │       ├── mvp-03.gif
│   │   │   │   │       ├── mvp-04.gif
│   │   │   │   │       └── mvp-05.gif
│   │   │   │   ├── locations
│   │   │   │   ├── logo
│   │   │   │   │   ├── logo-lifetopia-world.png
│   │   │   │   │   └── logo-superteam-id.jpg
│   │   │   │   ├── og
│   │   │   │   │   └── lifetopia-og.png
│   │   │   │   └── ui
│   │   │   ├── file.svg
│   │   │   ├── globe.svg
│   │   │   ├── next.svg
│   │   │   ├── vercel.svg
│   │   │   └── window.svg
│   │   ├── types
│   │   │   ├── community-post.ts
│   │   │   ├── my-world.ts
│   │   │   ├── navigation.ts
│   │   │   ├── post.ts
│   │   │   └── sidebar.ts
│   │   ├── .env.local
│   │   ├── .gitignore
│   │   ├── eslint.config.mjs
│   │   ├── next-env.d.ts
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── README.md
│   │   └── tsconfig.json
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
│   ├── grants
│   │   ├── app
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts
│   │   ├── components
│   │   │   ├── budget
│   │   │   │   ├── BudgetAllocation.tsx
│   │   │   │   ├── BudgetBreakdown.tsx
│   │   │   │   ├── BudgetSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── current-development
│   │   │   │   ├── CurrentDevelopmentSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── founder-note
│   │   │   │   ├── FounderNoteSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── impact
│   │   │   │   ├── ImpactCard.tsx
│   │   │   │   ├── ImpactMetrics.tsx
│   │   │   │   ├── ImpactSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── problem-solution
│   │   │   │   ├── AdoptionDiagram.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── ProblemCard.tsx
│   │   │   │   ├── ProblemSolutionSection.tsx
│   │   │   │   └── SolutionCard.tsx
│   │   │   ├── public-development
│   │   │   │   ├── DevelopmentActivity.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── LatestCommit.tsx
│   │   │   │   └── PublicDevelopmentSection.tsx
│   │   │   ├── roadmap
│   │   │   │   ├── index.ts
│   │   │   │   ├── RoadmapMilestone.tsx
│   │   │   │   ├── RoadmapSection.tsx
│   │   │   │   └── RoadmapTimeline.tsx
│   │   │   ├── team
│   │   │   │   ├── index.ts
│   │   │   │   ├── TeamMemberCard.tsx
│   │   │   │   └── TeamSection.tsx
│   │   │   ├── why-support
│   │   │   │   ├── index.ts
│   │   │   │   ├── SupportReasonCard.tsx
│   │   │   │   ├── SupportTimeline.tsx
│   │   │   │   └── WhySupportSection.tsx
│   │   │   ├── DocumentsHub.tsx
│   │   │   ├── GrantHero.tsx
│   │   │   ├── GrantsFooter.tsx
│   │   │   ├── GrantsNavbar.tsx
│   │   │   ├── PlayWarningModal.tsx
│   │   │   ├── ProjectSnapshot.tsx
│   │   │   └── TechnologyIcon.tsx
│   │   ├── data
│   │   │   └── grants.ts
│   │   ├── public
│   │   │   ├── backgrounds
│   │   │   ├── brand
│   │   │   │   ├── lifetopia-character.png
│   │   │   │   ├── lifetopia-icon.png
│   │   │   │   └── lifetopia-logo.png
│   │   │   └── previews
│   │   │       ├── community-platform.png
│   │   │       ├── main-website.jpg
│   │   │       └── playable-game.jpg
│   │   ├── .env.local
│   │   ├── eslint.config.js
│   │   ├── next-env.d.ts
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   └── tsconfig.json
│   └── website
│       ├── app
│       │   ├── api
│       │   │   ├── auth
│       │   │   │   └── login
│       │   │   │       └── route.ts
│       │   │   └── development-log
│       │   │       └── route.ts
│       │   ├── dashboard
│       │   │   └── page.tsx
│       │   ├── fonts
│       │   │   ├── GeistMonoVF.woff
│       │   │   └── GeistVF.woff
│       │   ├── login
│       │   │   └── page.tsx
│       │   ├── register
│       │   │   └── page.tsx
│       │   ├── favicon.ico
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   ├── manifest.ts
│       │   ├── page.module.css
│       │   ├── page.tsx
│       │   ├── robots.ts
│       │   └── sitemap.ts
│       ├── components
│       │   ├── auth
│       │   │   ├── AuthCard.tsx
│       │   │   ├── AvatarPicker.tsx
│       │   │   ├── CountryPicker.tsx
│       │   │   ├── LoginForm.tsx
│       │   │   └── RegisterForm.tsx
│       │   ├── dashboard
│       │   │   ├── ComingSoonFeatures.tsx
│       │   │   ├── CommunityActivity.tsx
│       │   │   ├── DailyQuestCard.tsx
│       │   │   ├── DashboardHeader.tsx
│       │   │   ├── InventoryPreview.tsx
│       │   │   ├── LatestNewsPreview.tsx
│       │   │   ├── LogoutButton.tsx
│       │   │   ├── PlayerHero.tsx
│       │   │   ├── ProfileCard.tsx
│       │   │   ├── QuickActions.tsx
│       │   │   ├── SettingsCard.tsx
│       │   │   ├── StatsGrid.tsx
│       │   │   ├── VerifyEmailBanner.tsx
│       │   │   └── WalletOverview.tsx
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
│       │   │   ├── development-log
│       │   │   │   └── LiveDevelopmentLogSection.tsx
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
│       │   │   │   ├── HeroSection.tsx
│       │   │   │   └── PlayWarningModal.tsx
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
│       ├── hooks
│       ├── providers
│       ├── styles
│       │   └── .gitkeep
│       ├── utils
│       │   └── .gitkeep
│       ├── .env.local
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── public
│       ├── README.md
│       └── tsconfig.json
├── config
│   └── project.json
├── docs
│   ├── api
│   ├── architecture
│   ├── design-system
│   ├── roadmap
│   ├── AI_CONTEXT.md
│   ├── AI_INSTRUCTIONS.md
│   ├── API_REFERENCE.md
│   ├── ARCHITECTURE.md
│   ├── CODING_GUIDE.md
│   ├── COMPONENT_TREE.md
│   ├── DATABASE_RELATIONS.md
│   ├── DATABASE_SCHEMA.md
│   ├── DATABASE_TYPES.md
│   ├── DESIGN_SYSTEM.md
│   ├── PROJECT_CONTEXT.md
│   ├── PROJECT_STRUCTURE.md
│   ├── ROADMAP.md
│   └── ROUTES.md
├── packages
│   ├── config
│   ├── data
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── community.ts
│   │   ├── dashboard.ts
│   │   ├── footer.ts
│   │   ├── homepage.ts
│   │   ├── index.ts
│   │   ├── journey.ts
│   │   ├── navigation.ts
│   │   ├── news.ts
│   │   ├── package.json
│   │   ├── roadmap.ts
│   │   └── tsconfig.json
│   ├── eslint-config
│   │   ├── base.js
│   │   ├── next.js
│   │   ├── package.json
│   │   ├── react-internal.js
│   │   └── README.md
│   ├── hooks
│   ├── lib
│   │   ├── supabase
│   │   │   ├── admin.ts
│   │   │   ├── client.ts
│   │   │   ├── cookie-options.ts
│   │   │   └── server.ts
│   │   ├── auth-redirect.ts
│   │   ├── format.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── services
│   │   ├── auth.ts
│   │   ├── development-log.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── types
│   │   ├── .gitkeep
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── community.ts
│   │   ├── dashboard.ts
│   │   ├── development-log.ts
│   │   ├── footer.ts
│   │   ├── index.ts
│   │   ├── news.ts
│   │   ├── package.json
│   │   ├── roadmap.ts
│   │   └── tsconfig.json
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
│       └── .gitkeep
├── public
│   ├── audio
│   ├── fonts
│   └── images
│       ├── avatars
│       │   ├── avatar-01.jpg
│       │   ├── avatar-02.jpg
│       │   ├── avatar-03.jpg
│       │   └── avatar-04.jpg
│       ├── backgrounds
│       ├── characters
│       ├── community
│       │   └── community-preview.png
│       ├── decorations
│       ├── hero
│       │   └── LT-011-hero-village.png
│       ├── icons
│       │   ├── gameplay
│       │   │   ├── LT-001-farm-harvest.png
│       │   │   ├── LT-002-fish-explore.png
│       │   │   ├── LT-003-craft-create.png
│       │   │   ├── LT-004-build-decorate.png
│       │   │   ├── LT-005-play-together.png
│       │   │   ├── LT-006-cooking-baking.png
│       │   │   ├── LT-007-mining.png
│       │   │   ├── LT-008-woodcutting.png
│       │   │   ├── LT-009-animal-care.png
│       │   │   └── LT-010-gathering-foraging.png
│       │   └── navigation
│       ├── journey
│       │   ├── alpha
│       │   │   ├── alpha-01.png
│       │   │   ├── alpha-02.png
│       │   │   ├── alpha-03.png
│       │   │   ├── alpha-04.png
│       │   │   ├── alpha-05.png
│       │   │   ├── alpha-06.png
│       │   │   ├── alpha-07.png
│       │   │   ├── alpha-08.png
│       │   │   └── alpha-09.png
│       │   └── mvp
│       │       ├── mvp-01.gif
│       │       ├── mvp-02.gif
│       │       ├── mvp-03.gif
│       │       ├── mvp-04.gif
│       │       └── mvp-05.gif
│       ├── locations
│       ├── logo
│       │   ├── logo-lifetopia-world.png
│       │   └── logo-superteam-id.jpg
│       ├── og
│       │   └── lifetopia-og.png
│       └── ui
├── scripts
│   ├── generate-ai-context.mjs
│   ├── generate-ai-instructions.mjs
│   ├── generate-api-reference.mjs
│   ├── generate-coding-guide.mjs
│   ├── generate-component-tree.mjs
│   ├── generate-context.mjs
│   ├── generate-database-schema.mjs
│   ├── generate-design-system.mjs
│   ├── generate-docs.mjs
│   ├── generate-roadmap.mjs
│   ├── generate-routes.mjs
│   ├── generate-structure.mjs
│   ├── project-doctor.mjs
│   ├── project-status.mjs
│   ├── project-update.mjs
│   └── sync-public.mjs
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

```
