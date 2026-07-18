# Lifetopia World — Project Structure

Generated automatically.

```text
lifetopia-platform
├── .github
│   └── workflows
│       ├── build-start.yml
│       ├── development-log.yml
│       └── development-update.yml
├── .vscode
│   └── schemas
│       └── turbo.schema.json
├── apps
│   ├── community
│   │   ├── app
│   │   │   ├── actions
│   │   │   │   ├── community
│   │   │   │   │   ├── bookmarks.ts
│   │   │   │   │   ├── comments.ts
│   │   │   │   │   ├── likes.ts
│   │   │   │   │   ├── moderation.ts
│   │   │   │   │   ├── posts.ts
│   │   │   │   │   └── reports.ts
│   │   │   │   └── auth.ts
│   │   │   ├── admin
│   │   │   │   └── reports
│   │   │   │       └── page.tsx
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
│   │   │   ├── post
│   │   │   │   └── [postId]
│   │   │   │       └── page.tsx
│   │   │   ├── quest
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   ├── user
│   │   │   │   └── [username]
│   │   │   │       └── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── global-error.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── manifest.ts
│   │   │   ├── not-found.tsx
│   │   │   ├── page.tsx
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts
│   │   ├── components
│   │   │   ├── admin
│   │   │   │   ├── ReportModerationActions.tsx
│   │   │   │   └── ReportsDashboard.tsx
│   │   │   ├── auth
│   │   │   │   ├── AuthenticatedLink.tsx
│   │   │   │   ├── GuestAuthModal.tsx
│   │   │   │   └── GuestAuthProvider.tsx
│   │   │   ├── community
│   │   │   │   └── RichCommunityText.tsx
│   │   │   ├── explore
│   │   │   │   ├── Explore.tsx
│   │   │   │   ├── SuggestedLifetopians.tsx
│   │   │   │   ├── TrendingPosts.tsx
│   │   │   │   └── TrendingTopics.tsx
│   │   │   ├── feed
│   │   │   │   ├── CreatePost.tsx
│   │   │   │   ├── CreatePostForm.tsx
│   │   │   │   ├── Feed.tsx
│   │   │   │   ├── FeedPagination.tsx
│   │   │   │   └── PostCard.tsx
│   │   │   ├── guild
│   │   │   │   ├── Guild.tsx
│   │   │   │   ├── GuildActivity.tsx
│   │   │   │   ├── GuildHero.tsx
│   │   │   │   ├── GuildLeaderboard.tsx
│   │   │   │   └── GuildMembers.tsx
│   │   │   ├── identity
│   │   │   │   └── ProfileIdentityBadges.tsx
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
│   │   │   ├── report
│   │   │   │   ├── ReportModal.tsx
│   │   │   │   └── ReportTrigger.tsx
│   │   │   ├── settings
│   │   │   │   ├── LogoutSection.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   ├── ProfileSettings.tsx
│   │   │   │   ├── SecuritySettings.tsx
│   │   │   │   └── Settings.tsx
│   │   │   ├── system
│   │   │   │   └── FeaturePreparation.tsx
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
│   │   │   ├── admin
│   │   │   │   └── reports.ts
│   │   │   ├── auth
│   │   │   │   ├── require-current-profile.ts
│   │   │   │   └── require-moderator-profile.ts
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
│   │   │   ├── report.ts
│   │   │   └── sidebar.ts
│   │   ├── .env.local
│   │   ├── .gitignore
│   │   ├── eslint.config.mjs
│   │   ├── next-env.d.ts
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   └── tsconfig.tsbuildinfo
│   ├── docs
│   │   ├── app
│   │   │   ├── [slug]
│   │   │   │   └── page.tsx
│   │   │   ├── fonts
│   │   │   │   ├── GeistMonoVF.woff
│   │   │   │   └── GeistVF.woff
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── opengraph-image.tsx
│   │   │   ├── page.tsx
│   │   │   ├── robots.ts
│   │   │   ├── sitemap.ts
│   │   │   └── twitter-image.tsx
│   │   ├── components
│   │   │   └── docs
│   │   │       ├── BackToTop.tsx
│   │   │       ├── BetaRoadmapVisual.tsx
│   │   │       ├── DocsHomeContent.tsx
│   │   │       ├── DocsLanguageProvider.tsx
│   │   │       ├── DocsNavbar.tsx
│   │   │       ├── DocsSearch.tsx
│   │   │       ├── DocsSidebar.tsx
│   │   │       ├── DocumentContent.tsx
│   │   │       ├── DocumentStatusBadge.tsx
│   │   │       ├── DocumentTableOfContents.tsx
│   │   │       ├── index.ts
│   │   │       ├── PitchDeckPreview.tsx
│   │   │       ├── ProjectOverviewVisual.tsx
│   │   │       ├── TechnicalArchitectureVisual.tsx
│   │   │       └── WhitepaperEconomyVisual.tsx
│   │   ├── lib
│   │   │   └── createDocsSocialImage.tsx
│   │   ├── public
│   │   │   ├── file-text.svg
│   │   │   ├── globe.svg
│   │   │   ├── next.svg
│   │   │   ├── turborepo-dark.svg
│   │   │   ├── turborepo-light.svg
│   │   │   ├── vercel.svg
│   │   │   └── window.svg
│   │   ├── scripts
│   │   │   ├── predeploy-audit.mjs
│   │   │   └── validate-routes.mjs
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── eslint.config.js
│   │   ├── next-env.d.ts
│   │   ├── next.config.js
│   │   ├── package.json
│   │   ├── postcss.config.mjs
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
│   │   │   │   ├── BudgetSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── current-development
│   │   │   │   ├── CurrentDevelopmentSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── founder-note
│   │   │   │   ├── FounderNoteSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── impact
│   │   │   │   ├── ImpactSection.tsx
│   │   │   │   └── index.ts
│   │   │   ├── problem-solution
│   │   │   │   ├── index.ts
│   │   │   │   └── ProblemSolutionSection.tsx
│   │   │   ├── public-development
│   │   │   │   ├── index.ts
│   │   │   │   └── PublicDevelopmentSection.tsx
│   │   │   ├── roadmap
│   │   │   │   ├── index.ts
│   │   │   │   └── RoadmapSection.tsx
│   │   │   ├── team
│   │   │   │   ├── index.ts
│   │   │   │   ├── TeamMemberCard.tsx
│   │   │   │   └── TeamSection.tsx
│   │   │   ├── why-support
│   │   │   │   ├── index.ts
│   │   │   │   └── WhySupportSection.tsx
│   │   │   ├── DocumentsHub.tsx
│   │   │   ├── GrantHero.tsx
│   │   │   ├── GrantsFooter.tsx
│   │   │   ├── GrantsNavbar.tsx
│   │   │   ├── PlayWarningModal.tsx
│   │   │   ├── ProjectSnapshot.tsx
│   │   │   └── TechnologyIcon.tsx
│   │   ├── public
│   │   │   ├── backgrounds
│   │   │   ├── brand
│   │   │   │   ├── lifetopia-character.png
│   │   │   │   ├── lifetopia-icon.png
│   │   │   │   ├── lifetopia-logo.png
│   │   │   │   └── solana-logo.svg
│   │   │   ├── images
│   │   │   │   └── team
│   │   │   │       ├── hariono-suwika.jpg
│   │   │   │       ├── pasha-muhammad.png
│   │   │   │       ├── rahmi-vina-shafira.jpg
│   │   │   │       └── sonny-michael-wijaya.jpg
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
│       │   ├── account
│       │   │   ├── security
│       │   │   │   └── mfa
│       │   │   │       └── page.tsx
│       │   │   └── sessions
│       │   │       └── page.tsx
│       │   ├── account-access
│       │   │   └── page.tsx
│       │   ├── api
│       │   │   ├── auth
│       │   │   │   ├── account-access
│       │   │   │   │   ├── legal
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── username
│       │   │   │   │       └── route.ts
│       │   │   │   ├── guardian
│       │   │   │   │   ├── request
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── respond
│       │   │   │   │       └── route.ts
│       │   │   │   ├── login
│       │   │   │   │   └── route.ts
│       │   │   │   ├── mfa
│       │   │   │   │   ├── challenge
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── enroll
│       │   │   │   │   │   ├── cancel
│       │   │   │   │   │   │   └── route.ts
│       │   │   │   │   │   ├── verify
│       │   │   │   │   │   │   └── route.ts
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── unenroll
│       │   │   │   │       └── route.ts
│       │   │   │   ├── password-reset
│       │   │   │   │   ├── complete
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── request
│       │   │   │   │       └── route.ts
│       │   │   │   ├── register
│       │   │   │   │   └── route.ts
│       │   │   │   ├── resend-verification
│       │   │   │   │   └── route.ts
│       │   │   │   └── sessions
│       │   │   │       ├── logout-all
│       │   │   │       │   └── route.ts
│       │   │   │       ├── logout-current
│       │   │   │       │   └── route.ts
│       │   │   │       ├── logout-others
│       │   │   │       │   └── route.ts
│       │   │   │       └── revoke
│       │   │   │           └── route.ts
│       │   │   └── development-log
│       │   │       └── route.ts
│       │   ├── auth
│       │   │   └── confirm
│       │   │       └── route.ts
│       │   ├── check-email
│       │   │   └── page.tsx
│       │   ├── dashboard
│       │   │   └── page.tsx
│       │   ├── email-verified
│       │   │   └── page.tsx
│       │   ├── fonts
│       │   │   ├── GeistMonoVF.woff
│       │   │   └── GeistVF.woff
│       │   ├── forgot-password
│       │   │   └── page.tsx
│       │   ├── guardian-consent
│       │   │   ├── confirm
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── login
│       │   │   └── page.tsx
│       │   ├── mfa-challenge
│       │   │   └── page.tsx
│       │   ├── mfa-recovery
│       │   │   └── page.tsx
│       │   ├── privacy
│       │   │   └── page.tsx
│       │   ├── register
│       │   │   └── page.tsx
│       │   ├── reset-password
│       │   │   └── page.tsx
│       │   ├── terms
│       │   │   └── page.tsx
│       │   ├── favicon.ico
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   ├── manifest.ts
│       │   ├── page.tsx
│       │   ├── robots.ts
│       │   └── sitemap.ts
│       ├── components
│       │   ├── auth
│       │   │   ├── AccountAccessPanel.tsx
│       │   │   ├── AuthCard.tsx
│       │   │   ├── AvatarPicker.tsx
│       │   │   ├── CheckEmailPanel.tsx
│       │   │   ├── CountryPicker.tsx
│       │   │   ├── EmailVerifiedCleanup.tsx
│       │   │   ├── ForgotPasswordForm.tsx
│       │   │   ├── GuardianConsentPanel.tsx
│       │   │   ├── GuardianConsentReview.tsx
│       │   │   ├── JoinCommunityModal.tsx
│       │   │   ├── LoginForm.tsx
│       │   │   ├── MfaChallengeForm.tsx
│       │   │   ├── MfaSettingsPanel.tsx
│       │   │   ├── PasswordField.tsx
│       │   │   ├── RegisterForm.tsx
│       │   │   ├── RegisterProgress.tsx
│       │   │   ├── ResetPasswordForm.tsx
│       │   │   ├── SessionManagementPanel.tsx
│       │   │   └── TurnstileChallenge.tsx
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
│       │   │   │   ├── JourneyHeader.tsx
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
│       │   │   └── RoadmapSection.tsx
│       │   ├── layout
│       │   │   └── Navbar.tsx
│       │   ├── legal
│       │   │   └── LegalDocumentLayout.tsx
│       │   ├── seo
│       │   │   └── JsonLd.tsx
│       │   ├── shared
│       │   │   └── .gitkeep
│       │   └── ui
│       │       └── .gitkeep
│       ├── config
│       ├── constants
│       ├── data
│       │   └── legal-documents.ts
│       ├── hooks
│       ├── lib
│       │   └── auth
│       │       ├── guardian-consent-email.ts
│       │       ├── login-abuse.ts
│       │       ├── mfa-audit.ts
│       │       ├── mfa-factors.ts
│       │       ├── mfa-session.ts
│       │       ├── password-reauth.ts
│       │       ├── password-reset-email.ts
│       │       ├── pending-verification.ts
│       │       ├── session-device.ts
│       │       └── verification-email.ts
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
│   │   ├── AUTH_ACCOUNT_ACCESS.md
│   │   ├── AUTH_ANTI_ABUSE.md
│   │   ├── AUTH_EMAIL_VERIFICATION.md
│   │   ├── AUTH_FOUNDER.md
│   │   ├── AUTH_GUARDIAN_CONSENT.md
│   │   ├── AUTH_LOGIN.md
│   │   ├── AUTH_MFA.md
│   │   ├── AUTH_PASSWORD_RECOVERY.md
│   │   ├── AUTH_REGISTER_UI.md
│   │   ├── AUTH_REGISTRATION_API.md
│   │   ├── AUTH_ROLES_BADGES.md
│   │   ├── AUTH_SESSION_MANAGEMENT.md
│   │   └── AUTH_VALIDATION.md
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
│   │   ├── homepage.ts
│   │   ├── index.ts
│   │   ├── journey.ts
│   │   ├── navigation.ts
│   │   ├── news.ts
│   │   ├── package.json
│   │   ├── roadmap.ts
│   │   └── tsconfig.json
│   ├── docs-data
│   │   ├── categories.ts
│   │   ├── documents.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── types.ts
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
│   │   ├── identity.ts
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── services
│   │   ├── AUTH_4_CHECKLIST.md
│   │   ├── auth-validation.ts
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
├── supabase
│   └── auth
│       ├── AUTH_0_5C.md
│       ├── AUTH_0_5D.md
│       ├── AUTH_1.md
│       ├── AUTH_2.md
│       ├── AUTH_3.md
│       ├── auth-0.5a-create-snapshot.sql
│       ├── auth-0.5a-inspect-snapshot.sql
│       ├── auth-0.5a-verify-snapshot.sql
│       ├── auth-0.5b-preflight.sql
│       ├── auth-0.5b-repair-signup.sql
│       ├── auth-0.5b-verify.sql
│       ├── auth-0.5c-harden-profile-privacy.sql
│       ├── auth-0.5c-preflight.sql
│       ├── auth-0.5c-verify.sql
│       ├── auth-0.5d-normalize-identities.sql
│       ├── auth-0.5d-preflight.sql
│       ├── auth-0.5d-verify.sql
│       ├── auth-1-legal-consent-foundation.sql
│       ├── auth-1-verify.sql
│       ├── auth-10-account-access.sql
│       ├── auth-10-preflight.sql
│       ├── auth-10-verify.sql
│       ├── auth-11-login-anti-abuse.sql
│       ├── auth-11-preflight.sql
│       ├── auth-11-verify.sql
│       ├── auth-12-password-recovery.sql
│       ├── auth-12-preflight.sql
│       ├── auth-12-verify.sql
│       ├── auth-13-preflight.sql
│       ├── auth-13-session-management.sql
│       ├── auth-13-verify.sql
│       ├── auth-14-mfa.sql
│       ├── auth-14-preflight.sql
│       ├── auth-14-verify.sql
│       ├── auth-15-preflight.sql
│       ├── auth-15-roles-badges.sql
│       ├── auth-15-verify.sql
│       ├── auth-16-founder-readiness.sql
│       ├── auth-16-founder.sql
│       ├── auth-16-identity-assignment-template.sql
│       ├── auth-16-preflight.sql
│       ├── auth-16-verify.sql
│       ├── auth-2-data-model.sql
│       ├── auth-2-preflight.sql
│       ├── auth-2-verify.sql
│       ├── auth-3-legacy-account-migration.sql
│       ├── auth-3-preflight.sql
│       ├── auth-3-verify.sql
│       ├── auth-5-preflight.sql
│       ├── auth-5-registration-finalization.sql
│       ├── auth-5-verify.sql
│       ├── auth-7-email-verification.sql
│       ├── auth-7-preflight.sql
│       ├── auth-7-verify.sql
│       ├── auth-8-guardian-consent.sql
│       ├── auth-8-preflight.sql
│       ├── auth-8-verify.sql
│       └── README.md
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

```
