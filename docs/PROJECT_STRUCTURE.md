# Lifetopia World — Project Structure

Generated automatically.

```text
lifetopia-platform
├── .github
│   └── workflows
│       ├── auth-production-smoke.yml
│       ├── build-start.yml
│       ├── development-log.yml
│       └── development-update.yml
├── .vscode
│   └── schemas
│       └── turbo.schema.json
├── apps
│   ├── community
│   │   ├── app
│   │   │   ├── .well-known
│   │   │   │   └── assetlinks.json
│   │   │   │       └── route.ts
│   │   │   ├── account-status
│   │   │   │   └── page.tsx
│   │   │   ├── actions
│   │   │   │   ├── community
│   │   │   │   │   ├── announcements.ts
│   │   │   │   │   ├── bookmarks.ts
│   │   │   │   │   ├── comments.ts
│   │   │   │   │   ├── follows.ts
│   │   │   │   │   ├── guilds.ts
│   │   │   │   │   ├── likes.ts
│   │   │   │   │   ├── messages.ts
│   │   │   │   │   ├── moderation.ts
│   │   │   │   │   ├── notifications.ts
│   │   │   │   │   ├── posts.ts
│   │   │   │   │   ├── quests.ts
│   │   │   │   │   ├── reports.ts
│   │   │   │   │   └── wallet.ts
│   │   │   │   └── auth.ts
│   │   │   ├── admin
│   │   │   │   ├── announcements
│   │   │   │   │   └── page.tsx
│   │   │   │   └── reports
│   │   │   │       └── page.tsx
│   │   │   ├── explore
│   │   │   │   └── page.tsx
│   │   │   ├── fonts
│   │   │   │   ├── GeistMonoVF.woff
│   │   │   │   └── GeistVF.woff
│   │   │   ├── guild
│   │   │   │   ├── [slug]
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── create
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── messages
│   │   │   │   ├── [conversationId]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── my-world
│   │   │   │   └── page.tsx
│   │   │   ├── notifications
│   │   │   │   └── page.tsx
│   │   │   ├── offline
│   │   │   │   └── page.tsx
│   │   │   ├── post
│   │   │   │   └── [postId]
│   │   │   │       └── page.tsx
│   │   │   ├── pwa-icon
│   │   │   │   └── [size]
│   │   │   │       └── route.tsx
│   │   │   ├── quest
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   ├── user
│   │   │   │   └── [username]
│   │   │   │       ├── followers
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── following
│   │   │   │       │   └── page.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── wallet
│   │   │   │   └── page.tsx
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
│   │   │   │   ├── AnnouncementPublisher.tsx
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
│   │   │   │   ├── GuildActions.tsx
│   │   │   │   ├── GuildActivity.tsx
│   │   │   │   ├── GuildCreateForm.tsx
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
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── MessageComposer.tsx
│   │   │   │   ├── MessageInbox.tsx
│   │   │   │   ├── Messages.tsx
│   │   │   │   ├── MessageThread.tsx
│   │   │   │   └── NewConversationForm.tsx
│   │   │   ├── moderation
│   │   │   │   └── AccountRestrictionStatus.tsx
│   │   │   ├── my-world
│   │   │   │   ├── MyWorld.tsx
│   │   │   │   ├── MyWorldCommunityStats.tsx
│   │   │   │   ├── MyWorldDashboard.tsx
│   │   │   │   ├── MyWorldHeader.tsx
│   │   │   │   ├── MyWorldHero.tsx
│   │   │   │   ├── MyWorldMainGrid.tsx
│   │   │   │   ├── MyWorldRightSidebar.tsx
│   │   │   │   ├── MyWorldSectionCard.tsx
│   │   │   │   └── MyWorldStatCard.tsx
│   │   │   ├── notifications
│   │   │   │   ├── NotificationActions.tsx
│   │   │   │   ├── NotificationItem.tsx
│   │   │   │   ├── NotificationLink.tsx
│   │   │   │   └── Notifications.tsx
│   │   │   ├── post
│   │   │   │   ├── CommentComposer.tsx
│   │   │   │   ├── CommentItem.tsx
│   │   │   │   ├── CommentsSection.tsx
│   │   │   │   ├── PostActions.tsx
│   │   │   │   └── PostMenu.tsx
│   │   │   ├── profile
│   │   │   │   ├── FollowButton.tsx
│   │   │   │   ├── ProfileConnections.tsx
│   │   │   │   ├── ProfileHero.tsx
│   │   │   │   ├── ProfilePosts.tsx
│   │   │   │   ├── ProfileStats.tsx
│   │   │   │   └── PublicProfile.tsx
│   │   │   ├── pwa
│   │   │   │   └── PwaClient.tsx
│   │   │   ├── quest
│   │   │   │   ├── CompletedQuestSection.tsx
│   │   │   │   ├── DailyQuestSection.tsx
│   │   │   │   ├── Quest.tsx
│   │   │   │   ├── QuestActions.tsx
│   │   │   │   ├── QuestBoard.tsx
│   │   │   │   ├── QuestPostViewTracker.tsx
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
│   │   │   ├── ui
│   │   │   │   ├── Avatar.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── InfoCard.tsx
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   ├── Progress.tsx
│   │   │   │   ├── SectionCard.tsx
│   │   │   │   └── StatCard.tsx
│   │   │   └── wallet
│   │   │       ├── WalletBonusButton.tsx
│   │   │       └── WalletHub.tsx
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
│   │   │   ├── moderation
│   │   │   │   └── restriction.ts
│   │   │   ├── profile
│   │   │   │   ├── connections.ts
│   │   │   │   ├── current-profile.ts
│   │   │   │   └── public-profile.ts
│   │   │   ├── comments.ts
│   │   │   ├── explore-search.ts
│   │   │   ├── explore.ts
│   │   │   ├── guild.ts
│   │   │   ├── guilds.ts
│   │   │   ├── identity.ts
│   │   │   ├── messages.ts
│   │   │   ├── my-world-layout.ts
│   │   │   ├── my-world.ts
│   │   │   ├── navigation.ts
│   │   │   ├── notifications.ts
│   │   │   ├── quest.ts
│   │   │   ├── quests.ts
│   │   │   ├── sidebar.ts
│   │   │   └── wallet.ts
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
│   │   │   ├── sw.js
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
│   ├── game-alpha
│   │   ├── .vs
│   │   │   └── game
│   │   │       ├── copilot-chat
│   │   │       │   └── 426d02d2
│   │   │       │       └── sessions
│   │   │       ├── CopilotIndices
│   │   │       │   └── 17.14.1661.41761
│   │   │       │       ├── CodeChunks.db
│   │   │       │       └── SemanticSymbols.db
│   │   │       ├── FileContentIndex
│   │   │       │   └── 332aebeb-64f8-4751-9372-b45f0084a06a.vsidx
│   │   │       └── v17
│   │   │           ├── .suo
│   │   │           ├── DocumentLayout.backup.json
│   │   │           └── DocumentLayout.json
│   │   ├── Assets
│   │   │   ├── Editor
│   │   │   │   ├── GenerateMapPlaceholderScenes.cs
│   │   │   │   ├── GenerateMapPlaceholderScenes.cs.meta
│   │   │   │   ├── LifetopiaEditorMenus.cs
│   │   │   │   └── LifetopiaEditorMenus.cs.meta
│   │   │   ├── image
│   │   │   │   ├── animation_frames
│   │   │   │   │   ├── frame_001.png
│   │   │   │   │   ├── frame_001.png.meta
│   │   │   │   │   ├── frame_002.png
│   │   │   │   │   ├── frame_002.png.meta
│   │   │   │   │   ├── frame_003.png
│   │   │   │   │   ├── frame_003.png.meta
│   │   │   │   │   ├── frame_004.png
│   │   │   │   │   ├── frame_004.png.meta
│   │   │   │   │   ├── frame_005.png
│   │   │   │   │   ├── frame_005.png.meta
│   │   │   │   │   ├── frame_006.png
│   │   │   │   │   ├── frame_006.png.meta
│   │   │   │   │   ├── frame_007.png
│   │   │   │   │   ├── frame_007.png.meta
│   │   │   │   │   ├── frame_008.png
│   │   │   │   │   ├── frame_008.png.meta
│   │   │   │   │   ├── frame_009.png
│   │   │   │   │   ├── frame_009.png.meta
│   │   │   │   │   ├── frame_010.png
│   │   │   │   │   ├── frame_010.png.meta
│   │   │   │   │   ├── frame_011.png
│   │   │   │   │   ├── frame_011.png.meta
│   │   │   │   │   ├── frame_012.png
│   │   │   │   │   ├── frame_012.png.meta
│   │   │   │   │   ├── frame_1_berdiri.png
│   │   │   │   │   ├── frame_1_berdiri.png.meta
│   │   │   │   │   ├── frame_10_menangkap.png
│   │   │   │   │   ├── frame_10_menangkap.png.meta
│   │   │   │   │   ├── frame_11_berdiri.png
│   │   │   │   │   ├── frame_11_berdiri.png.meta
│   │   │   │   │   ├── frame_12_jalan.png
│   │   │   │   │   ├── frame_12_jalan.png.meta
│   │   │   │   │   ├── frame_2_jalan.png
│   │   │   │   │   ├── frame_2_jalan.png.meta
│   │   │   │   │   ├── frame_3_lari.png
│   │   │   │   │   ├── frame_3_lari.png.meta
│   │   │   │   │   ├── frame_4_melompat.png
│   │   │   │   │   ├── frame_4_melompat.png.meta
│   │   │   │   │   ├── frame_5_duduk.png
│   │   │   │   │   ├── frame_5_duduk.png.meta
│   │   │   │   │   ├── frame_6_membungkuk.png
│   │   │   │   │   ├── frame_6_membungkuk.png.meta
│   │   │   │   │   ├── frame_7_merayap.png
│   │   │   │   │   ├── frame_7_merayap.png.meta
│   │   │   │   │   ├── frame_8_mengambil.png
│   │   │   │   │   ├── frame_8_mengambil.png.meta
│   │   │   │   │   ├── frame_9_melempar.png
│   │   │   │   │   └── frame_9_melempar.png.meta
│   │   │   │   ├── assets
│   │   │   │   │   ├── angkat kaki.png
│   │   │   │   │   ├── angkat kaki.png.meta
│   │   │   │   │   ├── angkat melangkah.png
│   │   │   │   │   ├── angkat melangkah.png.meta
│   │   │   │   │   ├── angkat topi.png
│   │   │   │   │   ├── angkat topi.png.meta
│   │   │   │   │   ├── boost.png
│   │   │   │   │   ├── boost.png.meta
│   │   │   │   │   ├── carrot.png
│   │   │   │   │   ├── carrot.png.meta
│   │   │   │   │   ├── celurit.png
│   │   │   │   │   ├── celurit.png.meta
│   │   │   │   │   ├── cloud 1.png
│   │   │   │   │   ├── cloud 1.png.meta
│   │   │   │   │   ├── cloud 2.png
│   │   │   │   │   ├── cloud 2.png.meta
│   │   │   │   │   ├── cloud 3.png
│   │   │   │   │   ├── cloud 3.png.meta
│   │   │   │   │   ├── cloud 4.png
│   │   │   │   │   ├── cloud 4.png.meta
│   │   │   │   │   ├── cloud 5.png
│   │   │   │   │   ├── cloud 5.png.meta
│   │   │   │   │   ├── cloud.png
│   │   │   │   │   ├── cloud.png.meta
│   │   │   │   │   ├── fishing baru.png
│   │   │   │   │   ├── fishing baru.png.meta
│   │   │   │   │   ├── happy.png
│   │   │   │   │   ├── happy.png.meta
│   │   │   │   │   ├── idle.png
│   │   │   │   │   ├── idle.png.meta
│   │   │   │   │   ├── intro.png
│   │   │   │   │   ├── intro.png.meta
│   │   │   │   │   ├── kapak 1.png
│   │   │   │   │   ├── kapak 1.png.meta
│   │   │   │   │   ├── kapak.png
│   │   │   │   │   ├── kapak.png.meta
│   │   │   │   │   ├── karung.png
│   │   │   │   │   ├── karung.png.meta
│   │   │   │   │   ├── kepal.png
│   │   │   │   │   ├── kepal.png.meta
│   │   │   │   │   ├── logo.png
│   │   │   │   │   ├── logo.png.meta
│   │   │   │   │   ├── mengayun.png
│   │   │   │   │   ├── mengayun.png.meta
│   │   │   │   │   ├── pumpkin.png
│   │   │   │   │   ├── pumpkin.png.meta
│   │   │   │   │   ├── sekop.png
│   │   │   │   │   ├── sekop.png.meta
│   │   │   │   │   ├── suburban baru.png
│   │   │   │   │   ├── suburban baru.png.meta
│   │   │   │   │   ├── teko siram.png
│   │   │   │   │   ├── teko siram.png.meta
│   │   │   │   │   ├── tomato.png
│   │   │   │   │   ├── tomato.png.meta
│   │   │   │   │   ├── tunjuk.png
│   │   │   │   │   ├── tunjuk.png.meta
│   │   │   │   │   ├── walk.png
│   │   │   │   │   ├── walk.png.meta
│   │   │   │   │   ├── wheat.png
│   │   │   │   │   ├── wheat.png.meta
│   │   │   │   │   ├── work.png
│   │   │   │   │   └── work.png.meta
│   │   │   │   ├── assets 1
│   │   │   │   │   ├── angkat kaki.png
│   │   │   │   │   ├── angkat kaki.png.meta
│   │   │   │   │   ├── angkat melangkah.png
│   │   │   │   │   ├── angkat melangkah.png.meta
│   │   │   │   │   ├── angkat topi.png
│   │   │   │   │   ├── angkat topi.png.meta
│   │   │   │   │   ├── boost.png
│   │   │   │   │   ├── boost.png.meta
│   │   │   │   │   ├── carrot.png
│   │   │   │   │   ├── carrot.png.meta
│   │   │   │   │   ├── celurit.png
│   │   │   │   │   ├── celurit.png.meta
│   │   │   │   │   ├── cloud 1.png
│   │   │   │   │   ├── cloud 1.png.meta
│   │   │   │   │   ├── cloud 2.png
│   │   │   │   │   ├── cloud 2.png.meta
│   │   │   │   │   ├── cloud 3.png
│   │   │   │   │   ├── cloud 3.png.meta
│   │   │   │   │   ├── cloud 4.png
│   │   │   │   │   ├── cloud 4.png.meta
│   │   │   │   │   ├── cloud 5.png
│   │   │   │   │   ├── cloud 5.png.meta
│   │   │   │   │   ├── cloud.png
│   │   │   │   │   ├── cloud.png.meta
│   │   │   │   │   ├── fishing baru.png
│   │   │   │   │   ├── fishing baru.png.meta
│   │   │   │   │   ├── happy.png
│   │   │   │   │   ├── happy.png.meta
│   │   │   │   │   ├── idle.png
│   │   │   │   │   ├── idle.png.meta
│   │   │   │   │   ├── intro.png
│   │   │   │   │   ├── intro.png.meta
│   │   │   │   │   ├── kapak 1.png
│   │   │   │   │   ├── kapak 1.png.meta
│   │   │   │   │   ├── kapak.png
│   │   │   │   │   ├── kapak.png.meta
│   │   │   │   │   ├── karung.png
│   │   │   │   │   ├── karung.png.meta
│   │   │   │   │   ├── kepal.png
│   │   │   │   │   ├── kepal.png.meta
│   │   │   │   │   ├── logo.png
│   │   │   │   │   ├── logo.png.meta
│   │   │   │   │   ├── mengayun.png
│   │   │   │   │   ├── mengayun.png.meta
│   │   │   │   │   ├── pumpkin.png
│   │   │   │   │   ├── pumpkin.png.meta
│   │   │   │   │   ├── sekop.png
│   │   │   │   │   ├── sekop.png.meta
│   │   │   │   │   ├── suburban baru.png
│   │   │   │   │   ├── suburban baru.png.meta
│   │   │   │   │   ├── teko siram.png
│   │   │   │   │   ├── teko siram.png.meta
│   │   │   │   │   ├── tomato.png
│   │   │   │   │   ├── tomato.png.meta
│   │   │   │   │   ├── tunjuk.png
│   │   │   │   │   ├── tunjuk.png.meta
│   │   │   │   │   ├── walk.png
│   │   │   │   │   ├── walk.png.meta
│   │   │   │   │   ├── wheat.png
│   │   │   │   │   ├── wheat.png.meta
│   │   │   │   │   ├── work.png
│   │   │   │   │   └── work.png.meta
│   │   │   │   ├── attached_assets
│   │   │   │   │   ├── celurit_1774349990712.png
│   │   │   │   │   ├── celurit_1774349990712.png.meta
│   │   │   │   │   ├── ChatGPT_Image_Mar_21,_2026,_11_46_17_PM_1774350067537.png
│   │   │   │   │   ├── ChatGPT_Image_Mar_21,_2026,_11_46_17_PM_1774350067537.png.meta
│   │   │   │   │   ├── chibi_1774349990714.png
│   │   │   │   │   ├── chibi_1774349990714.png.meta
│   │   │   │   │   ├── home_1774349990715.jpg
│   │   │   │   │   ├── home_1774349990715.jpg.meta
│   │   │   │   │   ├── image_1774350956974.png
│   │   │   │   │   ├── image_1774350956974.png.meta
│   │   │   │   │   ├── image_1774350974110.png
│   │   │   │   │   ├── image_1774350974110.png.meta
│   │   │   │   │   ├── image_1774350985377.png
│   │   │   │   │   ├── image_1774350985377.png.meta
│   │   │   │   │   ├── image_1774351010084.png
│   │   │   │   │   ├── image_1774351010084.png.meta
│   │   │   │   │   ├── image_1774801340317.png
│   │   │   │   │   ├── image_1774801340317.png.meta
│   │   │   │   │   ├── kapak_1_1774349990715.png
│   │   │   │   │   ├── kapak_1_1774349990715.png.meta
│   │   │   │   │   ├── kapak_1774349990716.png
│   │   │   │   │   ├── kapak_1774349990716.png.meta
│   │   │   │   │   ├── karung_1774349990717.png
│   │   │   │   │   ├── karung_1774349990717.png.meta
│   │   │   │   │   ├── kota_1774349990717.png
│   │   │   │   │   ├── kota_1774349990717.png.meta
│   │   │   │   │   ├── map_city_1774350004456.png
│   │   │   │   │   ├── map_city_1774350004456.png.meta
│   │   │   │   │   ├── map_city_1774350909065.png
│   │   │   │   │   ├── map_city_1774350909065.png.meta
│   │   │   │   │   ├── map_fishing_1774350004455.png
│   │   │   │   │   ├── map_fishing_1774350004455.png.meta
│   │   │   │   │   ├── map_fishing_1774350909064.png
│   │   │   │   │   ├── map_fishing_1774350909064.png.meta
│   │   │   │   │   ├── map_garden_1774350004455.png
│   │   │   │   │   ├── map_garden_1774350004455.png.meta
│   │   │   │   │   ├── map_garden_1774350909065.png
│   │   │   │   │   ├── map_garden_1774350909065.png.meta
│   │   │   │   │   ├── Pasted--Lifetopia-World-Public-Alpha-Development-GDD-Lean-Exec_1774350265800.txt
│   │   │   │   │   ├── Pasted--Lifetopia-World-Public-Alpha-Development-GDD-Lean-Exec_1774350265800.txt.meta
│   │   │   │   │   ├── Pasted--Lifetopia-World-Public-Alpha-Development-GDD-Lean-Exec_1774801488315.txt
│   │   │   │   │   └── Pasted--Lifetopia-World-Public-Alpha-Development-GDD-Lean-Exec_1774801488315.txt.meta
│   │   │   │   ├── characters
│   │   │   │   │   ├── karakter_1_jalan.png
│   │   │   │   │   ├── karakter_1_jalan.png.meta
│   │   │   │   │   ├── karakter_10_menangkap.png
│   │   │   │   │   ├── karakter_10_menangkap.png.meta
│   │   │   │   │   ├── karakter_11_berdiri.png
│   │   │   │   │   ├── karakter_11_berdiri.png.meta
│   │   │   │   │   ├── karakter_12_murung.png
│   │   │   │   │   ├── karakter_12_murung.png.meta
│   │   │   │   │   ├── karakter_2_idle.png
│   │   │   │   │   ├── karakter_2_idle.png.meta
│   │   │   │   │   ├── karakter_3_duduk.png
│   │   │   │   │   ├── karakter_3_duduk.png.meta
│   │   │   │   │   ├── karakter_4_berkedip.png
│   │   │   │   │   ├── karakter_4_berkedip.png.meta
│   │   │   │   │   ├── karakter_5_melangkah.png
│   │   │   │   │   ├── karakter_5_melangkah.png.meta
│   │   │   │   │   ├── karakter_6_hai.png
│   │   │   │   │   ├── karakter_6_hai.png.meta
│   │   │   │   │   ├── karakter_7_mengayun.png
│   │   │   │   │   ├── karakter_7_mengayun.png.meta
│   │   │   │   │   ├── karakter_8_senangl.png
│   │   │   │   │   ├── karakter_8_senangl.png.meta
│   │   │   │   │   ├── karakter_9_happy.png
│   │   │   │   │   └── karakter_9_happy.png.meta
│   │   │   │   ├── menanam_frames
│   │   │   │   │   ├── menanam_1_mempersiapkan_bibit.png
│   │   │   │   │   ├── menanam_1_mempersiapkan_bibit.png.meta
│   │   │   │   │   ├── menanam_10_mengemburkan_tanah.png
│   │   │   │   │   ├── menanam_10_mengemburkan_tanah.png.meta
│   │   │   │   │   ├── menanam_11_memanen.png
│   │   │   │   │   ├── menanam_11_memanen.png.meta
│   │   │   │   │   ├── menanam_12_mengangkut.png
│   │   │   │   │   ├── menanam_12_mengangkut.png.meta
│   │   │   │   │   ├── menanam_2_membuat_lubang.png
│   │   │   │   │   ├── menanam_2_membuat_lubang.png.meta
│   │   │   │   │   ├── menanam_3_meletakkan_bibit.png
│   │   │   │   │   ├── menanam_3_meletakkan_bibit.png.meta
│   │   │   │   │   ├── menanam_4_menutup_tanah.png
│   │   │   │   │   ├── menanam_4_menutup_tanah.png.meta
│   │   │   │   │   ├── menanam_5_menyiram.png
│   │   │   │   │   ├── menanam_5_menyiram.png.meta
│   │   │   │   │   ├── menanam_6_memupuk.png
│   │   │   │   │   ├── menanam_6_memupuk.png.meta
│   │   │   │   │   ├── menanam_7_merawat.png
│   │   │   │   │   ├── menanam_7_merawat.png.meta
│   │   │   │   │   ├── menanam_8_mengecek.png
│   │   │   │   │   ├── menanam_8_mengecek.png.meta
│   │   │   │   │   ├── menanam_9_membersihkan_gulma.png
│   │   │   │   │   └── menanam_9_membersihkan_gulma.png.meta
│   │   │   │   ├── new map
│   │   │   │   │   ├── carrot.png
│   │   │   │   │   ├── carrot.png.meta
│   │   │   │   │   ├── choose.png
│   │   │   │   │   ├── choose.png.meta
│   │   │   │   │   ├── city.png
│   │   │   │   │   ├── city.png.meta
│   │   │   │   │   ├── farm.png
│   │   │   │   │   ├── farm.png.meta
│   │   │   │   │   ├── fishing.png
│   │   │   │   │   ├── fishing.png.meta
│   │   │   │   │   ├── garden.png
│   │   │   │   │   ├── garden.png.meta
│   │   │   │   │   ├── icon Lifetopia.png
│   │   │   │   │   ├── icon Lifetopia.png.meta
│   │   │   │   │   ├── lf world.png
│   │   │   │   │   ├── lf world.png.meta
│   │   │   │   │   ├── map base.png
│   │   │   │   │   ├── map base.png.meta
│   │   │   │   │   ├── map city.png
│   │   │   │   │   ├── map city.png.meta
│   │   │   │   │   ├── map fishing.png
│   │   │   │   │   ├── map fishing.png.meta
│   │   │   │   │   ├── map garden.png
│   │   │   │   │   ├── map garden.png.meta
│   │   │   │   │   ├── map-baru.png
│   │   │   │   │   ├── map-baru.png.meta
│   │   │   │   │   ├── preview map.png
│   │   │   │   │   ├── preview map.png.meta
│   │   │   │   │   ├── pumpkin.png
│   │   │   │   │   ├── pumpkin.png.meta
│   │   │   │   │   ├── suburban.png
│   │   │   │   │   ├── suburban.png.meta
│   │   │   │   │   ├── tomato.png
│   │   │   │   │   ├── tomato.png.meta
│   │   │   │   │   ├── wheat.png
│   │   │   │   │   └── wheat.png.meta
│   │   │   │   ├── animation_frames.meta
│   │   │   │   ├── assets 1.meta
│   │   │   │   ├── assets.meta
│   │   │   │   ├── attached_assets.meta
│   │   │   │   ├── characters.meta
│   │   │   │   ├── menanam_frames.meta
│   │   │   │   └── new map.meta
│   │   │   ├── Scenes
│   │   │   │   ├── choose map.unity
│   │   │   │   ├── choose map.unity.meta
│   │   │   │   ├── farm game.unity
│   │   │   │   ├── farm game.unity.meta
│   │   │   │   ├── fishing.unity
│   │   │   │   ├── fishing.unity.meta
│   │   │   │   ├── garden.unity
│   │   │   │   ├── garden.unity.meta
│   │   │   │   ├── map_city.unity
│   │   │   │   ├── map_city.unity.meta
│   │   │   │   ├── map_fishing.unity
│   │   │   │   ├── map_fishing.unity.meta
│   │   │   │   ├── map_garden.unity
│   │   │   │   ├── map_garden.unity.meta
│   │   │   │   ├── map_suburban.unity
│   │   │   │   ├── map_suburban.unity.meta
│   │   │   │   ├── splashscreen.unity
│   │   │   │   ├── splashscreen.unity.meta
│   │   │   │   ├── suburban.unity
│   │   │   │   ├── suburban.unity.meta
│   │   │   │   ├── trailer.unity
│   │   │   │   └── trailer.unity.meta
│   │   │   ├── Scripts
│   │   │   │   ├── AI
│   │   │   │   │   ├── NpcController.cs
│   │   │   │   │   └── NpcController.cs.meta
│   │   │   │   ├── Animation
│   │   │   │   │   ├── AnimationController.cs
│   │   │   │   │   └── AnimationController.cs.meta
│   │   │   │   ├── API
│   │   │   │   │   ├── EconomyApiService.cs
│   │   │   │   │   ├── EconomyApiService.cs.meta
│   │   │   │   │   ├── PlayerApiService.cs
│   │   │   │   │   ├── PlayerApiService.cs.meta
│   │   │   │   │   ├── WalletApiService.cs
│   │   │   │   │   └── WalletApiService.cs.meta
│   │   │   │   ├── Audio
│   │   │   │   │   ├── AudioManager.cs
│   │   │   │   │   └── AudioManager.cs.meta
│   │   │   │   ├── Authentication
│   │   │   │   │   ├── AuthService.cs
│   │   │   │   │   └── AuthService.cs.meta
│   │   │   │   ├── Blockchain
│   │   │   │   │   ├── BlockchainService.cs
│   │   │   │   │   └── BlockchainService.cs.meta
│   │   │   │   ├── Camera
│   │   │   │   │   ├── CameraShake.cs
│   │   │   │   │   ├── CameraShake.cs.meta
│   │   │   │   │   ├── CameraZoom.cs
│   │   │   │   │   └── CameraZoom.cs.meta
│   │   │   │   ├── Character
│   │   │   │   │   ├── .vs
│   │   │   │   │   │   ├── Character
│   │   │   │   │   │   │   ├── CopilotIndices
│   │   │   │   │   │   │   │   └── 17.14.1661.41761
│   │   │   │   │   │   │   │       ├── CodeChunks.db
│   │   │   │   │   │   │   │       └── SemanticSymbols.db
│   │   │   │   │   │   │   ├── FileContentIndex
│   │   │   │   │   │   │   │   └── 2b746ebe-87de-49d6-a0ad-bfce716c3f7e.vsidx
│   │   │   │   │   │   │   └── v17
│   │   │   │   │   │   │       ├── .wsuo
│   │   │   │   │   │   │       └── DocumentLayout.json
│   │   │   │   │   │   ├── slnx.sqlite
│   │   │   │   │   │   └── VSWorkspaceState.json
│   │   │   │   │   ├── CharacterAnimator.cs
│   │   │   │   │   ├── CharacterAnimator.cs.meta
│   │   │   │   │   ├── CharacterController2D.cs
│   │   │   │   │   ├── CharacterController2D.cs.meta
│   │   │   │   │   ├── CharacterSetupHelper.cs
│   │   │   │   │   ├── CharacterSetupHelper.cs.meta
│   │   │   │   │   ├── CharacterVariantSwitcher.cs
│   │   │   │   │   ├── CharacterVariantSwitcher.cs.meta
│   │   │   │   │   ├── HotbarAndKeys.cs
│   │   │   │   │   ├── HotbarAndKeys.cs.meta
│   │   │   │   │   ├── PlayerFarmInteractor.cs
│   │   │   │   │   ├── PlayerFarmInteractor.cs.meta
│   │   │   │   │   ├── PlayerSetup.cs
│   │   │   │   │   └── PlayerSetup.cs.meta
│   │   │   │   ├── Combat
│   │   │   │   │   ├── DamageDealer.cs
│   │   │   │   │   ├── DamageDealer.cs.meta
│   │   │   │   │   ├── HealthSystem.cs
│   │   │   │   │   └── HealthSystem.cs.meta
│   │   │   │   ├── Config
│   │   │   │   │   ├── GameConfig.cs
│   │   │   │   │   └── GameConfig.cs.meta
│   │   │   │   ├── Constants
│   │   │   │   │   ├── ApiEndpoints.cs
│   │   │   │   │   ├── ApiEndpoints.cs.meta
│   │   │   │   │   ├── GameConstants.cs
│   │   │   │   │   ├── GameConstants.cs.meta
│   │   │   │   │   ├── UIConstants.cs
│   │   │   │   │   └── UIConstants.cs.meta
│   │   │   │   ├── Controllers
│   │   │   │   │   ├── CameraController.cs
│   │   │   │   │   ├── CameraController.cs.meta
│   │   │   │   │   ├── NPCDialogueController.cs
│   │   │   │   │   ├── NPCDialogueController.cs.meta
│   │   │   │   │   ├── PlayerController.cs
│   │   │   │   │   ├── PlayerController.cs.meta
│   │   │   │   │   ├── ShopController.cs
│   │   │   │   │   └── ShopController.cs.meta
│   │   │   │   ├── Core
│   │   │   │   │   ├── Web3
│   │   │   │   │   │   ├── SolanaChainQueries.cs
│   │   │   │   │   │   ├── SolanaChainQueries.cs.meta
│   │   │   │   │   │   ├── SolanaWalletBridge.cs
│   │   │   │   │   │   ├── SolanaWalletBridge.cs.meta
│   │   │   │   │   │   ├── Web3Runner.cs
│   │   │   │   │   │   └── Web3Runner.cs.meta
│   │   │   │   │   ├── GameAutoSetup.cs
│   │   │   │   │   ├── GameAutoSetup.cs.meta
│   │   │   │   │   ├── LifetopiaBootstrapConfig.cs
│   │   │   │   │   ├── LifetopiaBootstrapConfig.cs.meta
│   │   │   │   │   ├── LifetopiaGameFlowFsm.cs
│   │   │   │   │   ├── LifetopiaGameFlowFsm.cs.meta
│   │   │   │   │   ├── LifetopiaGameState.cs
│   │   │   │   │   ├── LifetopiaGameState.cs.meta
│   │   │   │   │   ├── LifetopiaLevelGameplayFsm.cs
│   │   │   │   │   ├── LifetopiaLevelGameplayFsm.cs.meta
│   │   │   │   │   ├── LifetopiaPlayableLevel.cs
│   │   │   │   │   ├── LifetopiaPlayableLevel.cs.meta
│   │   │   │   │   ├── SceneTransitionManager.cs
│   │   │   │   │   ├── SceneTransitionManager.cs.meta
│   │   │   │   │   ├── SpriteDiskLoader.cs
│   │   │   │   │   ├── SpriteDiskLoader.cs.meta
│   │   │   │   │   └── Web3.meta
│   │   │   │   ├── Currency
│   │   │   │   │   ├── CurrencyService.cs
│   │   │   │   │   └── CurrencyService.cs.meta
│   │   │   │   ├── Data
│   │   │   │   │   ├── GameData.cs
│   │   │   │   │   └── GameData.cs.meta
│   │   │   │   ├── Debug
│   │   │   │   │   ├── GameDebugger.cs
│   │   │   │   │   └── GameDebugger.cs.meta
│   │   │   │   ├── DTO
│   │   │   │   │   ├── ApiResponseDTO.cs
│   │   │   │   │   ├── ApiResponseDTO.cs.meta
│   │   │   │   │   ├── PlayerDTO.cs
│   │   │   │   │   ├── PlayerDTO.cs.meta
│   │   │   │   │   ├── WalletDTO.cs
│   │   │   │   │   └── WalletDTO.cs.meta
│   │   │   │   ├── Effects
│   │   │   │   │   ├── ParticleSpawner.cs
│   │   │   │   │   ├── ParticleSpawner.cs.meta
│   │   │   │   │   ├── ScreenFlash.cs
│   │   │   │   │   └── ScreenFlash.cs.meta
│   │   │   │   ├── Encryption
│   │   │   │   │   ├── DataEncryptor.cs
│   │   │   │   │   └── DataEncryptor.cs.meta
│   │   │   │   ├── Events
│   │   │   │   │   ├── GameEventBus.cs
│   │   │   │   │   └── GameEventBus.cs.meta
│   │   │   │   ├── Extensions
│   │   │   │   │   ├── ListExtensions.cs
│   │   │   │   │   ├── ListExtensions.cs.meta
│   │   │   │   │   ├── MonoBehaviourExtensions.cs
│   │   │   │   │   ├── MonoBehaviourExtensions.cs.meta
│   │   │   │   │   ├── StringExtensions.cs
│   │   │   │   │   ├── StringExtensions.cs.meta
│   │   │   │   │   ├── TransformExtensions.cs
│   │   │   │   │   └── TransformExtensions.cs.meta
│   │   │   │   ├── Farming
│   │   │   │   │   ├── FarmPlot.cs
│   │   │   │   │   └── FarmPlot.cs.meta
│   │   │   │   ├── Game
│   │   │   │   │   ├── GameSession.cs
│   │   │   │   │   └── GameSession.cs.meta
│   │   │   │   ├── Gameplay
│   │   │   │   │   ├── CraftingSystem.cs
│   │   │   │   │   ├── CraftingSystem.cs.meta
│   │   │   │   │   ├── DialogueSystem.cs
│   │   │   │   │   ├── DialogueSystem.cs.meta
│   │   │   │   │   ├── FishingMechanic.cs
│   │   │   │   │   ├── FishingMechanic.cs.meta
│   │   │   │   │   ├── ShopSystem.cs
│   │   │   │   │   └── ShopSystem.cs.meta
│   │   │   │   ├── Input
│   │   │   │   │   ├── Bindings
│   │   │   │   │   │   ├── KeyBindings.cs
│   │   │   │   │   │   └── KeyBindings.cs.meta
│   │   │   │   │   ├── Handlers
│   │   │   │   │   │   ├── InputHandler.cs
│   │   │   │   │   │   └── InputHandler.cs.meta
│   │   │   │   │   ├── Bindings.meta
│   │   │   │   │   └── Handlers.meta
│   │   │   │   ├── Interfaces
│   │   │   │   │   ├── IAudioService.cs
│   │   │   │   │   ├── IAudioService.cs.meta
│   │   │   │   │   ├── IEventBus.cs
│   │   │   │   │   ├── IEventBus.cs.meta
│   │   │   │   │   ├── IGameState.cs
│   │   │   │   │   ├── IGameState.cs.meta
│   │   │   │   │   ├── IInitializable.cs
│   │   │   │   │   ├── IInitializable.cs.meta
│   │   │   │   │   ├── IInventory.cs
│   │   │   │   │   ├── IInventory.cs.meta
│   │   │   │   │   ├── IPlayer.cs
│   │   │   │   │   ├── IPlayer.cs.meta
│   │   │   │   │   ├── ISaveable.cs
│   │   │   │   │   ├── ISaveable.cs.meta
│   │   │   │   │   ├── IService.cs
│   │   │   │   │   ├── IService.cs.meta
│   │   │   │   │   ├── IUIScreen.cs
│   │   │   │   │   ├── IUIScreen.cs.meta
│   │   │   │   │   ├── IWallet.cs
│   │   │   │   │   └── IWallet.cs.meta
│   │   │   │   ├── Inventory
│   │   │   │   │   ├── InventoryGrid.cs
│   │   │   │   │   ├── InventoryGrid.cs.meta
│   │   │   │   │   ├── InventorySlot.cs
│   │   │   │   │   └── InventorySlot.cs.meta
│   │   │   │   ├── Items
│   │   │   │   │   ├── ItemDatabase.cs
│   │   │   │   │   ├── ItemDatabase.cs.meta
│   │   │   │   │   ├── ItemDatabaseInitializer.cs
│   │   │   │   │   ├── ItemDatabaseInitializer.cs.meta
│   │   │   │   │   ├── ItemFactory.cs
│   │   │   │   │   └── ItemFactory.cs.meta
│   │   │   │   ├── LoadSystem
│   │   │   │   │   ├── SceneLoader.cs
│   │   │   │   │   └── SceneLoader.cs.meta
│   │   │   │   ├── Managers
│   │   │   │   │   ├── AudioManager.cs
│   │   │   │   │   ├── AudioManager.cs.meta
│   │   │   │   │   ├── GameManager.cs
│   │   │   │   │   ├── GameManager.cs.meta
│   │   │   │   │   ├── InventoryManager.cs
│   │   │   │   │   ├── InventoryManager.cs.meta
│   │   │   │   │   ├── QuestManager.cs
│   │   │   │   │   ├── QuestManager.cs.meta
│   │   │   │   │   ├── UIManager.cs
│   │   │   │   │   └── UIManager.cs.meta
│   │   │   │   ├── Map
│   │   │   │   │   ├── ChooseMapScene.cs
│   │   │   │   │   ├── ChooseMapScene.cs.meta
│   │   │   │   │   ├── MapLabelManager.cs
│   │   │   │   │   ├── MapLabelManager.cs.meta
│   │   │   │   │   ├── MapLocationLabel.cs
│   │   │   │   │   ├── MapLocationLabel.cs.meta
│   │   │   │   │   ├── MapPinPulse.cs
│   │   │   │   │   └── MapPinPulse.cs.meta
│   │   │   │   ├── Mechanics
│   │   │   │   │   ├── FarmingMechanic.cs
│   │   │   │   │   ├── FarmingMechanic.cs.meta
│   │   │   │   │   ├── InteractionMechanic.cs
│   │   │   │   │   └── InteractionMechanic.cs.meta
│   │   │   │   ├── Models
│   │   │   │   │   ├── ItemModel.cs
│   │   │   │   │   ├── ItemModel.cs.meta
│   │   │   │   │   ├── PlayerModel.cs
│   │   │   │   │   ├── PlayerModel.cs.meta
│   │   │   │   │   ├── QuestModel.cs
│   │   │   │   │   ├── QuestModel.cs.meta
│   │   │   │   │   ├── ShopItemModel.cs
│   │   │   │   │   ├── ShopItemModel.cs.meta
│   │   │   │   │   ├── WalletModel.cs
│   │   │   │   │   └── WalletModel.cs.meta
│   │   │   │   ├── Movement
│   │   │   │   │   ├── MovementSystem.cs
│   │   │   │   │   ├── MovementSystem.cs.meta
│   │   │   │   │   ├── PlatformController.cs
│   │   │   │   │   └── PlatformController.cs.meta
│   │   │   │   ├── Network
│   │   │   │   │   ├── ConnectionMonitor.cs
│   │   │   │   │   ├── ConnectionMonitor.cs.meta
│   │   │   │   │   ├── HttpClient.cs
│   │   │   │   │   ├── HttpClient.cs.meta
│   │   │   │   │   ├── RequestQueue.cs
│   │   │   │   │   └── RequestQueue.cs.meta
│   │   │   │   ├── Pathfinding
│   │   │   │   │   ├── SimplePathfinder.cs
│   │   │   │   │   └── SimplePathfinder.cs.meta
│   │   │   │   ├── Requests
│   │   │   │   │   ├── ApiRequest.cs
│   │   │   │   │   ├── ApiRequest.cs.meta
│   │   │   │   │   ├── ApiRequestBuilder.cs
│   │   │   │   │   └── ApiRequestBuilder.cs.meta
│   │   │   │   ├── Responses
│   │   │   │   │   ├── ApiResponse.cs
│   │   │   │   │   ├── ApiResponse.cs.meta
│   │   │   │   │   ├── PaginatedResponse.cs
│   │   │   │   │   └── PaginatedResponse.cs.meta
│   │   │   │   ├── Rewards
│   │   │   │   │   ├── RewardService.cs
│   │   │   │   │   └── RewardService.cs.meta
│   │   │   │   ├── SaveSystem
│   │   │   │   │   ├── SaveManager.cs
│   │   │   │   │   └── SaveManager.cs.meta
│   │   │   │   ├── Security
│   │   │   │   │   ├── TokenGenerator.cs
│   │   │   │   │   └── TokenGenerator.cs.meta
│   │   │   │   ├── Services
│   │   │   │   │   ├── ServiceLocator.cs
│   │   │   │   │   └── ServiceLocator.cs.meta
│   │   │   │   ├── Systems
│   │   │   │   │   ├── DayNightSystem.cs
│   │   │   │   │   ├── DayNightSystem.cs.meta
│   │   │   │   │   ├── EconomySystem.cs
│   │   │   │   │   ├── EconomySystem.cs.meta
│   │   │   │   │   ├── LeaderboardSystem.cs
│   │   │   │   │   ├── LeaderboardSystem.cs.meta
│   │   │   │   │   ├── NotificationSystem.cs
│   │   │   │   │   ├── NotificationSystem.cs.meta
│   │   │   │   │   ├── TutorialSystem.cs
│   │   │   │   │   ├── TutorialSystem.cs.meta
│   │   │   │   │   ├── WeatherSystem.cs
│   │   │   │   │   └── WeatherSystem.cs.meta
│   │   │   │   ├── Testing
│   │   │   │   │   ├── GameTester.cs
│   │   │   │   │   └── GameTester.cs.meta
│   │   │   │   ├── UI
│   │   │   │   │   ├── Animations
│   │   │   │   │   │   ├── UIAnimator.cs
│   │   │   │   │   │   └── UIAnimator.cs.meta
│   │   │   │   │   ├── Elements
│   │   │   │   │   │   ├── GoldDisplay.cs
│   │   │   │   │   │   ├── GoldDisplay.cs.meta
│   │   │   │   │   │   ├── ProgressBar.cs
│   │   │   │   │   │   ├── ProgressBar.cs.meta
│   │   │   │   │   │   ├── ToastElement.cs
│   │   │   │   │   │   └── ToastElement.cs.meta
│   │   │   │   │   ├── Screens
│   │   │   │   │   │   ├── GameOverScreen.cs
│   │   │   │   │   │   ├── GameOverScreen.cs.meta
│   │   │   │   │   │   ├── InventoryScreen.cs
│   │   │   │   │   │   ├── InventoryScreen.cs.meta
│   │   │   │   │   │   ├── PauseScreen.cs
│   │   │   │   │   │   └── PauseScreen.cs.meta
│   │   │   │   │   ├── Animations.meta
│   │   │   │   │   ├── Elements.meta
│   │   │   │   │   ├── GameIntro.cs
│   │   │   │   │   ├── GameIntro.cs.meta
│   │   │   │   │   ├── HudPrimitives.cs
│   │   │   │   │   ├── HudPrimitives.cs.meta
│   │   │   │   │   ├── IntroSceneSetup.cs
│   │   │   │   │   ├── IntroSceneSetup.cs.meta
│   │   │   │   │   ├── LevelCinematicIntro.cs
│   │   │   │   │   ├── LevelCinematicIntro.cs.meta
│   │   │   │   │   ├── LifetopiaAutoPlayableScene.cs
│   │   │   │   │   ├── LifetopiaAutoPlayableScene.cs.meta
│   │   │   │   │   ├── LifetopiaFarmHudController.cs
│   │   │   │   │   ├── LifetopiaFarmHudController.cs.meta
│   │   │   │   │   ├── LogoAutoScale.cs
│   │   │   │   │   ├── LogoAutoScale.cs.meta
│   │   │   │   │   ├── Screens.meta
│   │   │   │   │   ├── UiButtonFeedback.cs
│   │   │   │   │   └── UiButtonFeedback.cs.meta
│   │   │   │   ├── Utils
│   │   │   │   │   ├── ColorUtils.cs
│   │   │   │   │   ├── ColorUtils.cs.meta
│   │   │   │   │   ├── MathUtils.cs
│   │   │   │   │   ├── MathUtils.cs.meta
│   │   │   │   │   ├── StringUtils.cs
│   │   │   │   │   ├── StringUtils.cs.meta
│   │   │   │   │   ├── TimeUtils.cs
│   │   │   │   │   └── TimeUtils.cs.meta
│   │   │   │   ├── Wallet
│   │   │   │   │   ├── WalletConnector.cs
│   │   │   │   │   ├── WalletConnector.cs.meta
│   │   │   │   │   ├── WalletManager.cs
│   │   │   │   │   └── WalletManager.cs.meta
│   │   │   │   ├── Web3
│   │   │   │   │   ├── Web3Service.cs
│   │   │   │   │   └── Web3Service.cs.meta
│   │   │   │   ├── AI.meta
│   │   │   │   ├── Animation.meta
│   │   │   │   ├── API.meta
│   │   │   │   ├── Audio.meta
│   │   │   │   ├── Authentication.meta
│   │   │   │   ├── Blockchain.meta
│   │   │   │   ├── Camera.meta
│   │   │   │   ├── Character.meta
│   │   │   │   ├── Combat.meta
│   │   │   │   ├── Config.meta
│   │   │   │   ├── Constants.meta
│   │   │   │   ├── Controllers.meta
│   │   │   │   ├── Core.meta
│   │   │   │   ├── Currency.meta
│   │   │   │   ├── Data.meta
│   │   │   │   ├── Debug.meta
│   │   │   │   ├── DTO.meta
│   │   │   │   ├── Effects.meta
│   │   │   │   ├── Encryption.meta
│   │   │   │   ├── Events.meta
│   │   │   │   ├── Extensions.meta
│   │   │   │   ├── Farming.meta
│   │   │   │   ├── Game.meta
│   │   │   │   ├── Gameplay.meta
│   │   │   │   ├── Input.meta
│   │   │   │   ├── Interfaces.meta
│   │   │   │   ├── Inventory.meta
│   │   │   │   ├── Items.meta
│   │   │   │   ├── LoadSystem.meta
│   │   │   │   ├── Managers.meta
│   │   │   │   ├── Map.meta
│   │   │   │   ├── Mechanics.meta
│   │   │   │   ├── Models.meta
│   │   │   │   ├── Movement.meta
│   │   │   │   ├── Network.meta
│   │   │   │   ├── Pathfinding.meta
│   │   │   │   ├── Requests.meta
│   │   │   │   ├── Responses.meta
│   │   │   │   ├── Rewards.meta
│   │   │   │   ├── SaveSystem.meta
│   │   │   │   ├── Security.meta
│   │   │   │   ├── Services.meta
│   │   │   │   ├── Systems.meta
│   │   │   │   ├── Testing.meta
│   │   │   │   ├── UI.meta
│   │   │   │   ├── Utils.meta
│   │   │   │   ├── Wallet.meta
│   │   │   │   └── Web3.meta
│   │   │   ├── sprite
│   │   │   │   ├── sprite_1.png
│   │   │   │   ├── sprite_1.png.meta
│   │   │   │   ├── sprite_10.png
│   │   │   │   ├── sprite_10.png.meta
│   │   │   │   ├── sprite_11.png
│   │   │   │   ├── sprite_11.png.meta
│   │   │   │   ├── sprite_12.png
│   │   │   │   ├── sprite_12.png.meta
│   │   │   │   ├── sprite_13.png
│   │   │   │   ├── sprite_13.png.meta
│   │   │   │   ├── sprite_14.png
│   │   │   │   ├── sprite_14.png.meta
│   │   │   │   ├── sprite_15.png
│   │   │   │   ├── sprite_15.png.meta
│   │   │   │   ├── sprite_16.png
│   │   │   │   ├── sprite_16.png.meta
│   │   │   │   ├── sprite_2.png
│   │   │   │   ├── sprite_2.png.meta
│   │   │   │   ├── sprite_23.png
│   │   │   │   ├── sprite_23.png.meta
│   │   │   │   ├── sprite_24.png
│   │   │   │   ├── sprite_24.png.meta
│   │   │   │   ├── sprite_25.png
│   │   │   │   ├── sprite_25.png.meta
│   │   │   │   ├── sprite_26.png
│   │   │   │   ├── sprite_26.png.meta
│   │   │   │   ├── sprite_27.png
│   │   │   │   ├── sprite_27.png.meta
│   │   │   │   ├── sprite_28.png
│   │   │   │   ├── sprite_28.png.meta
│   │   │   │   ├── sprite_29.png
│   │   │   │   ├── sprite_29.png.meta
│   │   │   │   ├── sprite_3.png
│   │   │   │   ├── sprite_3.png.meta
│   │   │   │   ├── sprite_30.png
│   │   │   │   ├── sprite_30.png.meta
│   │   │   │   ├── sprite_4.png
│   │   │   │   ├── sprite_4.png.meta
│   │   │   │   ├── sprite_5.png
│   │   │   │   ├── sprite_5.png.meta
│   │   │   │   ├── sprite_6.png
│   │   │   │   ├── sprite_6.png.meta
│   │   │   │   ├── sprite_7.png
│   │   │   │   ├── sprite_7.png.meta
│   │   │   │   ├── sprite_8.png
│   │   │   │   ├── sprite_8.png.meta
│   │   │   │   ├── sprite_9.png
│   │   │   │   └── sprite_9.png.meta
│   │   │   ├── TextMesh Pro
│   │   │   │   ├── Documentation
│   │   │   │   │   ├── TextMesh Pro User Guide 2016.pdf
│   │   │   │   │   └── TextMesh Pro User Guide 2016.pdf.meta
│   │   │   │   ├── Fonts
│   │   │   │   │   ├── LiberationSans - OFL.txt
│   │   │   │   │   ├── LiberationSans - OFL.txt.meta
│   │   │   │   │   ├── LiberationSans.ttf
│   │   │   │   │   └── LiberationSans.ttf.meta
│   │   │   │   ├── Resources
│   │   │   │   │   ├── Fonts & Materials
│   │   │   │   │   │   ├── LiberationSans SDF - Drop Shadow.mat
│   │   │   │   │   │   ├── LiberationSans SDF - Drop Shadow.mat.meta
│   │   │   │   │   │   ├── LiberationSans SDF - Fallback.asset
│   │   │   │   │   │   ├── LiberationSans SDF - Fallback.asset.meta
│   │   │   │   │   │   ├── LiberationSans SDF - Outline.mat
│   │   │   │   │   │   ├── LiberationSans SDF - Outline.mat.meta
│   │   │   │   │   │   ├── LiberationSans SDF.asset
│   │   │   │   │   │   └── LiberationSans SDF.asset.meta
│   │   │   │   │   ├── Sprite Assets
│   │   │   │   │   │   ├── EmojiOne.asset
│   │   │   │   │   │   └── EmojiOne.asset.meta
│   │   │   │   │   ├── Style Sheets
│   │   │   │   │   │   ├── Default Style Sheet.asset
│   │   │   │   │   │   └── Default Style Sheet.asset.meta
│   │   │   │   │   ├── Fonts & Materials.meta
│   │   │   │   │   ├── LineBreaking Following Characters.txt
│   │   │   │   │   ├── LineBreaking Following Characters.txt.meta
│   │   │   │   │   ├── LineBreaking Leading Characters.txt
│   │   │   │   │   ├── LineBreaking Leading Characters.txt.meta
│   │   │   │   │   ├── Sprite Assets.meta
│   │   │   │   │   ├── Style Sheets.meta
│   │   │   │   │   ├── TMP Settings.asset
│   │   │   │   │   └── TMP Settings.asset.meta
│   │   │   │   ├── Shaders
│   │   │   │   │   ├── TMP_Bitmap-Custom-Atlas.shader
│   │   │   │   │   ├── TMP_Bitmap-Custom-Atlas.shader.meta
│   │   │   │   │   ├── TMP_Bitmap-Mobile.shader
│   │   │   │   │   ├── TMP_Bitmap-Mobile.shader.meta
│   │   │   │   │   ├── TMP_Bitmap.shader
│   │   │   │   │   ├── TMP_Bitmap.shader.meta
│   │   │   │   │   ├── TMP_SDF Overlay.shader
│   │   │   │   │   ├── TMP_SDF Overlay.shader.meta
│   │   │   │   │   ├── TMP_SDF SSD.shader
│   │   │   │   │   ├── TMP_SDF SSD.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile Masking.shader
│   │   │   │   │   ├── TMP_SDF-Mobile Masking.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile Overlay.shader
│   │   │   │   │   ├── TMP_SDF-Mobile Overlay.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile SSD.shader
│   │   │   │   │   ├── TMP_SDF-Mobile SSD.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile.shader
│   │   │   │   │   ├── TMP_SDF-Mobile.shader.meta
│   │   │   │   │   ├── TMP_SDF-Surface-Mobile.shader
│   │   │   │   │   ├── TMP_SDF-Surface-Mobile.shader.meta
│   │   │   │   │   ├── TMP_SDF-Surface.shader
│   │   │   │   │   ├── TMP_SDF-Surface.shader.meta
│   │   │   │   │   ├── TMP_SDF.shader
│   │   │   │   │   ├── TMP_SDF.shader.meta
│   │   │   │   │   ├── TMP_Sprite.shader
│   │   │   │   │   ├── TMP_Sprite.shader.meta
│   │   │   │   │   ├── TMPro_Mobile.cginc
│   │   │   │   │   ├── TMPro_Mobile.cginc.meta
│   │   │   │   │   ├── TMPro_Properties.cginc
│   │   │   │   │   ├── TMPro_Properties.cginc.meta
│   │   │   │   │   ├── TMPro_Surface.cginc
│   │   │   │   │   ├── TMPro_Surface.cginc.meta
│   │   │   │   │   ├── TMPro.cginc
│   │   │   │   │   └── TMPro.cginc.meta
│   │   │   │   ├── Sprites
│   │   │   │   │   ├── EmojiOne Attribution.txt
│   │   │   │   │   ├── EmojiOne Attribution.txt.meta
│   │   │   │   │   ├── EmojiOne.json
│   │   │   │   │   ├── EmojiOne.json.meta
│   │   │   │   │   ├── EmojiOne.png
│   │   │   │   │   └── EmojiOne.png.meta
│   │   │   │   ├── Documentation.meta
│   │   │   │   ├── Fonts.meta
│   │   │   │   ├── Resources.meta
│   │   │   │   ├── Shaders.meta
│   │   │   │   └── Sprites.meta
│   │   │   ├── Editor.meta
│   │   │   ├── image.meta
│   │   │   ├── Scenes.meta
│   │   │   ├── Scripts.meta
│   │   │   ├── sprite.meta
│   │   │   └── TextMesh Pro.meta
│   │   ├── game
│   │   ├── Packages
│   │   │   ├── manifest.json
│   │   │   └── packages-lock.json
│   │   ├── ProjectSettings
│   │   │   ├── AudioManager.asset
│   │   │   ├── ClusterInputManager.asset
│   │   │   ├── DynamicsManager.asset
│   │   │   ├── EditorBuildSettings.asset
│   │   │   ├── EditorSettings.asset
│   │   │   ├── GraphicsSettings.asset
│   │   │   ├── InputManager.asset
│   │   │   ├── MemorySettings.asset
│   │   │   ├── NavMeshAreas.asset
│   │   │   ├── NetworkManager.asset
│   │   │   ├── PackageManagerSettings.asset
│   │   │   ├── Physics2DSettings.asset
│   │   │   ├── PresetManager.asset
│   │   │   ├── ProjectSettings.asset
│   │   │   ├── ProjectVersion.txt
│   │   │   ├── QualitySettings.asset
│   │   │   ├── SceneTemplateSettings.json
│   │   │   ├── TagManager.asset
│   │   │   ├── TimeManager.asset
│   │   │   ├── UnityConnectSettings.asset
│   │   │   ├── VersionControlSettings.asset
│   │   │   ├── VFXManager.asset
│   │   │   └── XRSettings.asset
│   │   ├── tools
│   │   │   └── gen_map_scenes.py
│   │   ├── .gitignore
│   │   ├── .vsconfig
│   │   ├── Assembly-CSharp-Editor.csproj
│   │   ├── Assembly-CSharp.csproj
│   │   └── game.sln
│   ├── game-mvp
│   │   ├── Assets
│   │   │   ├── Content
│   │   │   │   ├── Animations
│   │   │   │   │   ├── Character
│   │   │   │   │   │   ├── Character_DropBackwards.anim
│   │   │   │   │   │   ├── Character_DropBackwards.anim.meta
│   │   │   │   │   │   ├── Character_DropForward.anim
│   │   │   │   │   │   ├── Character_DropForward.anim.meta
│   │   │   │   │   │   ├── Character_DropLeft.anim
│   │   │   │   │   │   ├── Character_DropLeft.anim.meta
│   │   │   │   │   │   ├── Character_DropRight.anim
│   │   │   │   │   │   ├── Character_DropRight.anim.meta
│   │   │   │   │   │   ├── Character_IdleBack.anim
│   │   │   │   │   │   ├── Character_IdleBack.anim.meta
│   │   │   │   │   │   ├── Character_IdleForward.anim
│   │   │   │   │   │   ├── Character_IdleForward.anim.meta
│   │   │   │   │   │   ├── Character_IdleLeft.anim
│   │   │   │   │   │   ├── Character_IdleLeft.anim.meta
│   │   │   │   │   │   ├── Character_IdleRight.anim
│   │   │   │   │   │   ├── Character_IdleRight.anim.meta
│   │   │   │   │   │   ├── Character_MoveBack.anim
│   │   │   │   │   │   ├── Character_MoveBack.anim.meta
│   │   │   │   │   │   ├── Character_MoveForward.anim
│   │   │   │   │   │   ├── Character_MoveForward.anim.meta
│   │   │   │   │   │   ├── Character_MoveLeft.anim
│   │   │   │   │   │   ├── Character_MoveLeft.anim.meta
│   │   │   │   │   │   ├── Character_MoveRight.anim
│   │   │   │   │   │   ├── Character_MoveRight.anim.meta
│   │   │   │   │   │   ├── Character_Side_Idle.controller
│   │   │   │   │   │   ├── Character_Side_Idle.controller.meta
│   │   │   │   │   │   ├── Character_SlashBackwards.anim
│   │   │   │   │   │   ├── Character_SlashBackwards.anim.meta
│   │   │   │   │   │   ├── Character_SlashForward.anim
│   │   │   │   │   │   ├── Character_SlashForward.anim.meta
│   │   │   │   │   │   ├── Character_SlashLeft.anim
│   │   │   │   │   │   ├── Character_SlashLeft.anim.meta
│   │   │   │   │   │   ├── Character_SlashRight.anim
│   │   │   │   │   │   ├── Character_SlashRight.anim.meta
│   │   │   │   │   │   ├── Character_SmashBackwards.anim
│   │   │   │   │   │   ├── Character_SmashBackwards.anim.meta
│   │   │   │   │   │   ├── Character_SmashForward.anim
│   │   │   │   │   │   ├── Character_SmashForward.anim.meta
│   │   │   │   │   │   ├── Character_SmashLeft.anim
│   │   │   │   │   │   ├── Character_SmashLeft.anim.meta
│   │   │   │   │   │   ├── Character_SmashRight.anim
│   │   │   │   │   │   └── Character_SmashRight.anim.meta
│   │   │   │   │   ├── Enemies
│   │   │   │   │   │   ├── Animator_Monster.controller
│   │   │   │   │   │   ├── Animator_Monster.controller.meta
│   │   │   │   │   │   ├── Blob_Death.anim
│   │   │   │   │   │   ├── Blob_Death.anim.meta
│   │   │   │   │   │   ├── Blob_Hit.anim
│   │   │   │   │   │   ├── Blob_Hit.anim.meta
│   │   │   │   │   │   ├── Blob_Idle.anim
│   │   │   │   │   │   ├── Blob_Idle.anim.meta
│   │   │   │   │   │   ├── Blob_Move.anim
│   │   │   │   │   │   └── Blob_Move.anim.meta
│   │   │   │   │   ├── Main menu
│   │   │   │   │   │   ├── Button Load Game.controller
│   │   │   │   │   │   ├── Button Load Game.controller.meta
│   │   │   │   │   │   ├── Button.anim
│   │   │   │   │   │   ├── Button.anim.meta
│   │   │   │   │   │   ├── Image 1.controller
│   │   │   │   │   │   ├── Image 1.controller.meta
│   │   │   │   │   │   ├── Image.controller
│   │   │   │   │   │   ├── Image.controller.meta
│   │   │   │   │   │   ├── Logo_FarmingKit.anim
│   │   │   │   │   │   └── Logo_FarmingKit.anim.meta
│   │   │   │   │   ├── World
│   │   │   │   │   │   ├── BreakObject.anim
│   │   │   │   │   │   ├── BreakObject.anim.meta
│   │   │   │   │   │   ├── Shake Object.controller
│   │   │   │   │   │   ├── Shake Object.controller.meta
│   │   │   │   │   │   ├── ShakeObject.anim
│   │   │   │   │   │   ├── ShakeObject.anim.meta
│   │   │   │   │   │   ├── Tree Hit.anim
│   │   │   │   │   │   ├── Tree Hit.anim.meta
│   │   │   │   │   │   ├── Tree Idle.anim
│   │   │   │   │   │   ├── Tree Idle.anim.meta
│   │   │   │   │   │   ├── Tree Top Fall.anim
│   │   │   │   │   │   ├── Tree Top Fall.anim.meta
│   │   │   │   │   │   ├── Tree Top.controller
│   │   │   │   │   │   └── Tree Top.controller.meta
│   │   │   │   │   ├── Character.meta
│   │   │   │   │   ├── Enemies.meta
│   │   │   │   │   ├── Main menu.meta
│   │   │   │   │   └── World.meta
│   │   │   │   ├── Fonts
│   │   │   │   │   ├── Munro SDF.asset
│   │   │   │   │   ├── Munro SDF.asset.meta
│   │   │   │   │   ├── Munro_Licence.txt
│   │   │   │   │   ├── Munro_Licence.txt.meta
│   │   │   │   │   ├── Munro.ttf
│   │   │   │   │   ├── Munro.ttf.meta
│   │   │   │   │   ├── MunroNarrow.ttf
│   │   │   │   │   ├── MunroNarrow.ttf.meta
│   │   │   │   │   ├── MunroSmall.ttf
│   │   │   │   │   └── MunroSmall.ttf.meta
│   │   │   │   ├── Materials
│   │   │   │   │   ├── Background_Clouds.mat
│   │   │   │   │   ├── Background_Clouds.mat.meta
│   │   │   │   │   ├── Sprites.mat
│   │   │   │   │   ├── Sprites.mat.meta
│   │   │   │   │   ├── SpritesFlash.mat
│   │   │   │   │   └── SpritesFlash.mat.meta
│   │   │   │   ├── Sounds
│   │   │   │   │   ├── Gameplay
│   │   │   │   │   │   ├── Freesound.org (Public Domain)
│   │   │   │   │   │   │   ├── Bush Movement.txt
│   │   │   │   │   │   │   ├── Bush Movement.txt.meta
│   │   │   │   │   │   │   ├── Bush Movement.wav
│   │   │   │   │   │   │   ├── Bush Movement.wav.meta
│   │   │   │   │   │   │   ├── Hit Tree Source.txt
│   │   │   │   │   │   │   ├── Hit Tree Source.txt.meta
│   │   │   │   │   │   │   ├── Hit Tree.wav
│   │   │   │   │   │   │   ├── Hit Tree.wav.meta
│   │   │   │   │   │   │   ├── Stone Break Source.txt
│   │   │   │   │   │   │   ├── Stone Break Source.txt.meta
│   │   │   │   │   │   │   ├── Stone Break.aiff
│   │   │   │   │   │   │   ├── Stone Break.aiff.meta
│   │   │   │   │   │   │   ├── Stone Hit Source.txt
│   │   │   │   │   │   │   ├── Stone Hit Source.txt.meta
│   │   │   │   │   │   │   ├── Stone Hit.aiff
│   │   │   │   │   │   │   ├── Stone Hit.aiff.meta
│   │   │   │   │   │   │   ├── Tree Bush Movement.txt
│   │   │   │   │   │   │   ├── Tree Bush Movement.txt.meta
│   │   │   │   │   │   │   ├── Tree Bush Movement.wav
│   │   │   │   │   │   │   └── Tree Bush Movement.wav.meta
│   │   │   │   │   │   ├── Rpg Sound Pack (Public Domain)
│   │   │   │   │   │   │   ├── beltHandle1.ogg
│   │   │   │   │   │   │   ├── beltHandle1.ogg.meta
│   │   │   │   │   │   │   ├── beltHandle1.wav
│   │   │   │   │   │   │   ├── beltHandle1.wav.meta
│   │   │   │   │   │   │   ├── beltHandle2.ogg
│   │   │   │   │   │   │   ├── beltHandle2.ogg.meta
│   │   │   │   │   │   │   ├── beltHandle2.wav
│   │   │   │   │   │   │   ├── beltHandle2.wav.meta
│   │   │   │   │   │   │   ├── bookClose.ogg
│   │   │   │   │   │   │   ├── bookClose.ogg.meta
│   │   │   │   │   │   │   ├── bookClose.wav
│   │   │   │   │   │   │   ├── bookClose.wav.meta
│   │   │   │   │   │   │   ├── bookFlip1.ogg
│   │   │   │   │   │   │   ├── bookFlip1.ogg.meta
│   │   │   │   │   │   │   ├── bookFlip1.wav
│   │   │   │   │   │   │   ├── bookFlip1.wav.meta
│   │   │   │   │   │   │   ├── bookFlip2.ogg
│   │   │   │   │   │   │   ├── bookFlip2.ogg.meta
│   │   │   │   │   │   │   ├── bookFlip2.wav
│   │   │   │   │   │   │   ├── bookFlip2.wav.meta
│   │   │   │   │   │   │   ├── bookFlip3.ogg
│   │   │   │   │   │   │   ├── bookFlip3.ogg.meta
│   │   │   │   │   │   │   ├── bookFlip3.wav
│   │   │   │   │   │   │   ├── bookFlip3.wav.meta
│   │   │   │   │   │   │   ├── bookOpen.ogg
│   │   │   │   │   │   │   ├── bookOpen.ogg.meta
│   │   │   │   │   │   │   ├── bookOpen.wav
│   │   │   │   │   │   │   ├── bookOpen.wav.meta
│   │   │   │   │   │   │   ├── bookPlace1.ogg
│   │   │   │   │   │   │   ├── bookPlace1.ogg.meta
│   │   │   │   │   │   │   ├── bookPlace1.wav
│   │   │   │   │   │   │   ├── bookPlace1.wav.meta
│   │   │   │   │   │   │   ├── bookPlace2.ogg
│   │   │   │   │   │   │   ├── bookPlace2.ogg.meta
│   │   │   │   │   │   │   ├── bookPlace2.wav
│   │   │   │   │   │   │   ├── bookPlace2.wav.meta
│   │   │   │   │   │   │   ├── bookPlace3.ogg
│   │   │   │   │   │   │   ├── bookPlace3.ogg.meta
│   │   │   │   │   │   │   ├── bookPlace3.wav
│   │   │   │   │   │   │   ├── bookPlace3.wav.meta
│   │   │   │   │   │   │   ├── chop.ogg
│   │   │   │   │   │   │   ├── chop.ogg.meta
│   │   │   │   │   │   │   ├── chop.wav
│   │   │   │   │   │   │   ├── chop.wav.meta
│   │   │   │   │   │   │   ├── cloth1.ogg
│   │   │   │   │   │   │   ├── cloth1.ogg.meta
│   │   │   │   │   │   │   ├── cloth1.wav
│   │   │   │   │   │   │   ├── cloth1.wav.meta
│   │   │   │   │   │   │   ├── cloth2.ogg
│   │   │   │   │   │   │   ├── cloth2.ogg.meta
│   │   │   │   │   │   │   ├── cloth2.wav
│   │   │   │   │   │   │   ├── cloth2.wav.meta
│   │   │   │   │   │   │   ├── cloth3.ogg
│   │   │   │   │   │   │   ├── cloth3.ogg.meta
│   │   │   │   │   │   │   ├── cloth3.wav
│   │   │   │   │   │   │   ├── cloth3.wav.meta
│   │   │   │   │   │   │   ├── cloth4.ogg
│   │   │   │   │   │   │   ├── cloth4.ogg.meta
│   │   │   │   │   │   │   ├── cloth4.wav
│   │   │   │   │   │   │   ├── cloth4.wav.meta
│   │   │   │   │   │   │   ├── clothBelt.ogg
│   │   │   │   │   │   │   ├── clothBelt.ogg.meta
│   │   │   │   │   │   │   ├── clothBelt.wav
│   │   │   │   │   │   │   ├── clothBelt.wav.meta
│   │   │   │   │   │   │   ├── clothBelt2.ogg
│   │   │   │   │   │   │   ├── clothBelt2.ogg.meta
│   │   │   │   │   │   │   ├── clothBelt2.wav
│   │   │   │   │   │   │   ├── clothBelt2.wav.meta
│   │   │   │   │   │   │   ├── creak1.ogg
│   │   │   │   │   │   │   ├── creak1.ogg.meta
│   │   │   │   │   │   │   ├── creak1.wav
│   │   │   │   │   │   │   ├── creak1.wav.meta
│   │   │   │   │   │   │   ├── creak2.ogg
│   │   │   │   │   │   │   ├── creak2.ogg.meta
│   │   │   │   │   │   │   ├── creak2.wav
│   │   │   │   │   │   │   ├── creak2.wav.meta
│   │   │   │   │   │   │   ├── creak3.ogg
│   │   │   │   │   │   │   ├── creak3.ogg.meta
│   │   │   │   │   │   │   ├── creak3.wav
│   │   │   │   │   │   │   ├── creak3.wav.meta
│   │   │   │   │   │   │   ├── doorClose_1.ogg
│   │   │   │   │   │   │   ├── doorClose_1.ogg.meta
│   │   │   │   │   │   │   ├── doorClose_1.wav
│   │   │   │   │   │   │   ├── doorClose_1.wav.meta
│   │   │   │   │   │   │   ├── doorClose_2.ogg
│   │   │   │   │   │   │   ├── doorClose_2.ogg.meta
│   │   │   │   │   │   │   ├── doorClose_2.wav
│   │   │   │   │   │   │   ├── doorClose_2.wav.meta
│   │   │   │   │   │   │   ├── doorClose_3.ogg
│   │   │   │   │   │   │   ├── doorClose_3.ogg.meta
│   │   │   │   │   │   │   ├── doorClose_3.wav
│   │   │   │   │   │   │   ├── doorClose_3.wav.meta
│   │   │   │   │   │   │   ├── doorClose_4.ogg
│   │   │   │   │   │   │   ├── doorClose_4.ogg.meta
│   │   │   │   │   │   │   ├── doorClose_4.wav
│   │   │   │   │   │   │   ├── doorClose_4.wav.meta
│   │   │   │   │   │   │   ├── doorOpen_1_cut.wav
│   │   │   │   │   │   │   ├── doorOpen_1_cut.wav.meta
│   │   │   │   │   │   │   ├── doorOpen_1.ogg
│   │   │   │   │   │   │   ├── doorOpen_1.ogg.meta
│   │   │   │   │   │   │   ├── doorOpen_1.wav
│   │   │   │   │   │   │   ├── doorOpen_1.wav.meta
│   │   │   │   │   │   │   ├── doorOpen_2.ogg
│   │   │   │   │   │   │   ├── doorOpen_2.ogg.meta
│   │   │   │   │   │   │   ├── doorOpen_2.wav
│   │   │   │   │   │   │   ├── doorOpen_2.wav.meta
│   │   │   │   │   │   │   ├── drawKnife1.ogg
│   │   │   │   │   │   │   ├── drawKnife1.ogg.meta
│   │   │   │   │   │   │   ├── drawKnife1.wav
│   │   │   │   │   │   │   ├── drawKnife1.wav.meta
│   │   │   │   │   │   │   ├── drawKnife2.ogg
│   │   │   │   │   │   │   ├── drawKnife2.ogg.meta
│   │   │   │   │   │   │   ├── drawKnife2.wav
│   │   │   │   │   │   │   ├── drawKnife2.wav.meta
│   │   │   │   │   │   │   ├── drawKnife3.ogg
│   │   │   │   │   │   │   ├── drawKnife3.ogg.meta
│   │   │   │   │   │   │   ├── drawKnife3.wav
│   │   │   │   │   │   │   ├── drawKnife3.wav.meta
│   │   │   │   │   │   │   ├── dropLeather.ogg
│   │   │   │   │   │   │   ├── dropLeather.ogg.meta
│   │   │   │   │   │   │   ├── dropLeather.wav
│   │   │   │   │   │   │   ├── dropLeather.wav.meta
│   │   │   │   │   │   │   ├── footstep00.ogg
│   │   │   │   │   │   │   ├── footstep00.ogg.meta
│   │   │   │   │   │   │   ├── footstep00.wav
│   │   │   │   │   │   │   ├── footstep00.wav.meta
│   │   │   │   │   │   │   ├── footstep01.ogg
│   │   │   │   │   │   │   ├── footstep01.ogg.meta
│   │   │   │   │   │   │   ├── footstep01.wav
│   │   │   │   │   │   │   ├── footstep01.wav.meta
│   │   │   │   │   │   │   ├── footstep02.ogg
│   │   │   │   │   │   │   ├── footstep02.ogg.meta
│   │   │   │   │   │   │   ├── footstep02.wav
│   │   │   │   │   │   │   ├── footstep02.wav.meta
│   │   │   │   │   │   │   ├── footstep03.ogg
│   │   │   │   │   │   │   ├── footstep03.ogg.meta
│   │   │   │   │   │   │   ├── footstep03.wav
│   │   │   │   │   │   │   ├── footstep03.wav.meta
│   │   │   │   │   │   │   ├── footstep04_LowPass.wav
│   │   │   │   │   │   │   ├── footstep04_LowPass.wav.meta
│   │   │   │   │   │   │   ├── footstep04.ogg
│   │   │   │   │   │   │   ├── footstep04.ogg.meta
│   │   │   │   │   │   │   ├── footstep04.wav
│   │   │   │   │   │   │   ├── footstep04.wav.meta
│   │   │   │   │   │   │   ├── footstep05.ogg
│   │   │   │   │   │   │   ├── footstep05.ogg.meta
│   │   │   │   │   │   │   ├── footstep05.wav
│   │   │   │   │   │   │   ├── footstep05.wav.meta
│   │   │   │   │   │   │   ├── footstep06_LowPass.wav
│   │   │   │   │   │   │   ├── footstep06_LowPass.wav.meta
│   │   │   │   │   │   │   ├── footstep06.ogg
│   │   │   │   │   │   │   ├── footstep06.ogg.meta
│   │   │   │   │   │   │   ├── footstep06.wav
│   │   │   │   │   │   │   ├── footstep06.wav.meta
│   │   │   │   │   │   │   ├── footstep07.ogg
│   │   │   │   │   │   │   ├── footstep07.ogg.meta
│   │   │   │   │   │   │   ├── footstep07.wav
│   │   │   │   │   │   │   ├── footstep07.wav.meta
│   │   │   │   │   │   │   ├── footstep08.ogg
│   │   │   │   │   │   │   ├── footstep08.ogg.meta
│   │   │   │   │   │   │   ├── footstep08.wav
│   │   │   │   │   │   │   ├── footstep08.wav.meta
│   │   │   │   │   │   │   ├── footstep09_LowPass.wav
│   │   │   │   │   │   │   ├── footstep09_LowPass.wav.meta
│   │   │   │   │   │   │   ├── footstep09.ogg
│   │   │   │   │   │   │   ├── footstep09.ogg.meta
│   │   │   │   │   │   │   ├── footstep09.wav
│   │   │   │   │   │   │   ├── footstep09.wav.meta
│   │   │   │   │   │   │   ├── handleCoins.ogg
│   │   │   │   │   │   │   ├── handleCoins.ogg.meta
│   │   │   │   │   │   │   ├── handleCoins.wav
│   │   │   │   │   │   │   ├── handleCoins.wav.meta
│   │   │   │   │   │   │   ├── handleCoins2.ogg
│   │   │   │   │   │   │   ├── handleCoins2.ogg.meta
│   │   │   │   │   │   │   ├── handleCoins2.wav
│   │   │   │   │   │   │   ├── handleCoins2.wav.meta
│   │   │   │   │   │   │   ├── handleSmallLeather.ogg
│   │   │   │   │   │   │   ├── handleSmallLeather.ogg.meta
│   │   │   │   │   │   │   ├── handleSmallLeather.wav
│   │   │   │   │   │   │   ├── handleSmallLeather.wav.meta
│   │   │   │   │   │   │   ├── handleSmallLeather2.ogg
│   │   │   │   │   │   │   ├── handleSmallLeather2.ogg.meta
│   │   │   │   │   │   │   ├── handleSmallLeather2.wav
│   │   │   │   │   │   │   ├── handleSmallLeather2.wav.meta
│   │   │   │   │   │   │   ├── knifeSlice.ogg
│   │   │   │   │   │   │   ├── knifeSlice.ogg.meta
│   │   │   │   │   │   │   ├── knifeSlice.wav
│   │   │   │   │   │   │   ├── knifeSlice.wav.meta
│   │   │   │   │   │   │   ├── knifeSlice2.ogg
│   │   │   │   │   │   │   ├── knifeSlice2.ogg.meta
│   │   │   │   │   │   │   ├── knifeSlice2.wav
│   │   │   │   │   │   │   ├── knifeSlice2.wav.meta
│   │   │   │   │   │   │   ├── License.txt
│   │   │   │   │   │   │   ├── License.txt.meta
│   │   │   │   │   │   │   ├── metalClick.ogg
│   │   │   │   │   │   │   ├── metalClick.ogg.meta
│   │   │   │   │   │   │   ├── metalClick.wav
│   │   │   │   │   │   │   ├── metalClick.wav.meta
│   │   │   │   │   │   │   ├── metalLatch.ogg
│   │   │   │   │   │   │   ├── metalLatch.ogg.meta
│   │   │   │   │   │   │   ├── metalLatch.wav
│   │   │   │   │   │   │   ├── metalLatch.wav.meta
│   │   │   │   │   │   │   ├── metalPot1.ogg
│   │   │   │   │   │   │   ├── metalPot1.ogg.meta
│   │   │   │   │   │   │   ├── metalPot1.wav
│   │   │   │   │   │   │   ├── metalPot1.wav.meta
│   │   │   │   │   │   │   ├── metalPot2.ogg
│   │   │   │   │   │   │   ├── metalPot2.ogg.meta
│   │   │   │   │   │   │   ├── metalPot2.wav
│   │   │   │   │   │   │   ├── metalPot2.wav.meta
│   │   │   │   │   │   │   ├── metalPot3.ogg
│   │   │   │   │   │   │   ├── metalPot3.ogg.meta
│   │   │   │   │   │   │   ├── metalPot3.wav
│   │   │   │   │   │   │   └── metalPot3.wav.meta
│   │   │   │   │   │   ├── Soniss pack 2017 (Public Domain)
│   │   │   │   │   │   │   ├── Blob_Death.ogg
│   │   │   │   │   │   │   ├── Blob_Death.ogg.meta
│   │   │   │   │   │   │   ├── Blob_Death.wav
│   │   │   │   │   │   │   ├── Blob_Death.wav.meta
│   │   │   │   │   │   │   ├── Hit.wav
│   │   │   │   │   │   │   └── Hit.wav.meta
│   │   │   │   │   │   ├── Freesound.org (Public Domain).meta
│   │   │   │   │   │   ├── Rpg Sound Pack (Public Domain).meta
│   │   │   │   │   │   └── Soniss pack 2017 (Public Domain).meta
│   │   │   │   │   ├── Music
│   │   │   │   │   │   ├── Summer Sidewalk.mp3
│   │   │   │   │   │   ├── Summer Sidewalk.mp3.meta
│   │   │   │   │   │   ├── Summer Sidewalk.wav
│   │   │   │   │   │   ├── Summer Sidewalk.wav.meta
│   │   │   │   │   │   ├── Triangle.mp3
│   │   │   │   │   │   ├── Triangle.mp3.meta
│   │   │   │   │   │   ├── Triangle.wav
│   │   │   │   │   │   └── Triangle.wav.meta
│   │   │   │   │   ├── User Interface
│   │   │   │   │   │   ├── click1.ogg
│   │   │   │   │   │   ├── click1.ogg.meta
│   │   │   │   │   │   ├── click1.wav
│   │   │   │   │   │   ├── click1.wav.meta
│   │   │   │   │   │   ├── click2.ogg
│   │   │   │   │   │   ├── click2.ogg.meta
│   │   │   │   │   │   ├── click2.wav
│   │   │   │   │   │   ├── click2.wav.meta
│   │   │   │   │   │   ├── click3.ogg
│   │   │   │   │   │   ├── click3.ogg.meta
│   │   │   │   │   │   ├── click3.wav
│   │   │   │   │   │   ├── click3.wav.meta
│   │   │   │   │   │   ├── click4.ogg
│   │   │   │   │   │   ├── click4.ogg.meta
│   │   │   │   │   │   ├── click4.wav
│   │   │   │   │   │   ├── click4.wav.meta
│   │   │   │   │   │   ├── click5.ogg
│   │   │   │   │   │   ├── click5.ogg.meta
│   │   │   │   │   │   ├── click5.wav
│   │   │   │   │   │   ├── click5.wav.meta
│   │   │   │   │   │   ├── License.txt
│   │   │   │   │   │   ├── License.txt.meta
│   │   │   │   │   │   ├── mouseclick1.ogg
│   │   │   │   │   │   ├── mouseclick1.ogg.meta
│   │   │   │   │   │   ├── mouseclick1.wav
│   │   │   │   │   │   ├── mouseclick1.wav.meta
│   │   │   │   │   │   ├── mouserelease1.ogg
│   │   │   │   │   │   ├── mouserelease1.ogg.meta
│   │   │   │   │   │   ├── mouserelease1.wav
│   │   │   │   │   │   ├── mouserelease1.wav.meta
│   │   │   │   │   │   ├── rollover1.ogg
│   │   │   │   │   │   ├── rollover1.ogg.meta
│   │   │   │   │   │   ├── rollover1.wav
│   │   │   │   │   │   ├── rollover1.wav.meta
│   │   │   │   │   │   ├── rollover2.ogg
│   │   │   │   │   │   ├── rollover2.ogg.meta
│   │   │   │   │   │   ├── rollover2.wav
│   │   │   │   │   │   ├── rollover2.wav.meta
│   │   │   │   │   │   ├── rollover3.ogg
│   │   │   │   │   │   ├── rollover3.ogg.meta
│   │   │   │   │   │   ├── rollover3.wav
│   │   │   │   │   │   ├── rollover3.wav.meta
│   │   │   │   │   │   ├── rollover4.ogg
│   │   │   │   │   │   ├── rollover4.ogg.meta
│   │   │   │   │   │   ├── rollover4.wav
│   │   │   │   │   │   ├── rollover4.wav.meta
│   │   │   │   │   │   ├── rollover5.ogg
│   │   │   │   │   │   ├── rollover5.ogg.meta
│   │   │   │   │   │   ├── rollover5.wav
│   │   │   │   │   │   ├── rollover5.wav.meta
│   │   │   │   │   │   ├── rollover6.ogg
│   │   │   │   │   │   ├── rollover6.ogg.meta
│   │   │   │   │   │   ├── rollover6.wav
│   │   │   │   │   │   ├── rollover6.wav.meta
│   │   │   │   │   │   ├── switch1.ogg
│   │   │   │   │   │   ├── switch1.ogg.meta
│   │   │   │   │   │   ├── switch1.wav
│   │   │   │   │   │   ├── switch1.wav.meta
│   │   │   │   │   │   ├── switch10.ogg
│   │   │   │   │   │   ├── switch10.ogg.meta
│   │   │   │   │   │   ├── switch10.wav
│   │   │   │   │   │   ├── switch10.wav.meta
│   │   │   │   │   │   ├── switch11.ogg
│   │   │   │   │   │   ├── switch11.ogg.meta
│   │   │   │   │   │   ├── switch11.wav
│   │   │   │   │   │   ├── switch11.wav.meta
│   │   │   │   │   │   ├── switch12.ogg
│   │   │   │   │   │   ├── switch12.ogg.meta
│   │   │   │   │   │   ├── switch12.wav
│   │   │   │   │   │   ├── switch12.wav.meta
│   │   │   │   │   │   ├── switch13.ogg
│   │   │   │   │   │   ├── switch13.ogg.meta
│   │   │   │   │   │   ├── switch13.wav
│   │   │   │   │   │   ├── switch13.wav.meta
│   │   │   │   │   │   ├── switch14.ogg
│   │   │   │   │   │   ├── switch14.ogg.meta
│   │   │   │   │   │   ├── switch14.wav
│   │   │   │   │   │   ├── switch14.wav.meta
│   │   │   │   │   │   ├── switch15.ogg
│   │   │   │   │   │   ├── switch15.ogg.meta
│   │   │   │   │   │   ├── switch15.wav
│   │   │   │   │   │   ├── switch15.wav.meta
│   │   │   │   │   │   ├── switch16.ogg
│   │   │   │   │   │   ├── switch16.ogg.meta
│   │   │   │   │   │   ├── switch16.wav
│   │   │   │   │   │   ├── switch16.wav.meta
│   │   │   │   │   │   ├── switch17.ogg
│   │   │   │   │   │   ├── switch17.ogg.meta
│   │   │   │   │   │   ├── switch17.wav
│   │   │   │   │   │   ├── switch17.wav.meta
│   │   │   │   │   │   ├── switch18.ogg
│   │   │   │   │   │   ├── switch18.ogg.meta
│   │   │   │   │   │   ├── switch18.wav
│   │   │   │   │   │   ├── switch18.wav.meta
│   │   │   │   │   │   ├── switch19.ogg
│   │   │   │   │   │   ├── switch19.ogg.meta
│   │   │   │   │   │   ├── switch19.wav
│   │   │   │   │   │   ├── switch19.wav.meta
│   │   │   │   │   │   ├── switch2.ogg
│   │   │   │   │   │   ├── switch2.ogg.meta
│   │   │   │   │   │   ├── switch2.wav
│   │   │   │   │   │   ├── switch2.wav.meta
│   │   │   │   │   │   ├── switch20.ogg
│   │   │   │   │   │   ├── switch20.ogg.meta
│   │   │   │   │   │   ├── switch20.wav
│   │   │   │   │   │   ├── switch20.wav.meta
│   │   │   │   │   │   ├── switch21.ogg
│   │   │   │   │   │   ├── switch21.ogg.meta
│   │   │   │   │   │   ├── switch21.wav
│   │   │   │   │   │   ├── switch21.wav.meta
│   │   │   │   │   │   ├── switch22.ogg
│   │   │   │   │   │   ├── switch22.ogg.meta
│   │   │   │   │   │   ├── switch22.wav
│   │   │   │   │   │   ├── switch22.wav.meta
│   │   │   │   │   │   ├── switch23.ogg
│   │   │   │   │   │   ├── switch23.ogg.meta
│   │   │   │   │   │   ├── switch23.wav
│   │   │   │   │   │   ├── switch23.wav.meta
│   │   │   │   │   │   ├── switch24.ogg
│   │   │   │   │   │   ├── switch24.ogg.meta
│   │   │   │   │   │   ├── switch24.wav
│   │   │   │   │   │   ├── switch24.wav.meta
│   │   │   │   │   │   ├── switch25.ogg
│   │   │   │   │   │   ├── switch25.ogg.meta
│   │   │   │   │   │   ├── switch25.wav
│   │   │   │   │   │   ├── switch25.wav.meta
│   │   │   │   │   │   ├── switch26.ogg
│   │   │   │   │   │   ├── switch26.ogg.meta
│   │   │   │   │   │   ├── switch26.wav
│   │   │   │   │   │   ├── switch26.wav.meta
│   │   │   │   │   │   ├── switch27.ogg
│   │   │   │   │   │   ├── switch27.ogg.meta
│   │   │   │   │   │   ├── switch27.wav
│   │   │   │   │   │   ├── switch27.wav.meta
│   │   │   │   │   │   ├── switch28.ogg
│   │   │   │   │   │   ├── switch28.ogg.meta
│   │   │   │   │   │   ├── switch28.wav
│   │   │   │   │   │   ├── switch28.wav.meta
│   │   │   │   │   │   ├── switch29.ogg
│   │   │   │   │   │   ├── switch29.ogg.meta
│   │   │   │   │   │   ├── switch29.wav
│   │   │   │   │   │   ├── switch29.wav.meta
│   │   │   │   │   │   ├── switch3.ogg
│   │   │   │   │   │   ├── switch3.ogg.meta
│   │   │   │   │   │   ├── switch3.wav
│   │   │   │   │   │   ├── switch3.wav.meta
│   │   │   │   │   │   ├── switch30.ogg
│   │   │   │   │   │   ├── switch30.ogg.meta
│   │   │   │   │   │   ├── switch30.wav
│   │   │   │   │   │   ├── switch30.wav.meta
│   │   │   │   │   │   ├── switch31.ogg
│   │   │   │   │   │   ├── switch31.ogg.meta
│   │   │   │   │   │   ├── switch31.wav
│   │   │   │   │   │   ├── switch31.wav.meta
│   │   │   │   │   │   ├── switch32.ogg
│   │   │   │   │   │   ├── switch32.ogg.meta
│   │   │   │   │   │   ├── switch32.wav
│   │   │   │   │   │   ├── switch32.wav.meta
│   │   │   │   │   │   ├── switch33.ogg
│   │   │   │   │   │   ├── switch33.ogg.meta
│   │   │   │   │   │   ├── switch33.wav
│   │   │   │   │   │   ├── switch33.wav.meta
│   │   │   │   │   │   ├── switch34.ogg
│   │   │   │   │   │   ├── switch34.ogg.meta
│   │   │   │   │   │   ├── switch34.wav
│   │   │   │   │   │   ├── switch34.wav.meta
│   │   │   │   │   │   ├── switch35.ogg
│   │   │   │   │   │   ├── switch35.ogg.meta
│   │   │   │   │   │   ├── switch35.wav
│   │   │   │   │   │   ├── switch35.wav.meta
│   │   │   │   │   │   ├── switch36.ogg
│   │   │   │   │   │   ├── switch36.ogg.meta
│   │   │   │   │   │   ├── switch36.wav
│   │   │   │   │   │   ├── switch36.wav.meta
│   │   │   │   │   │   ├── switch37.ogg
│   │   │   │   │   │   ├── switch37.ogg.meta
│   │   │   │   │   │   ├── switch37.wav
│   │   │   │   │   │   ├── switch37.wav.meta
│   │   │   │   │   │   ├── switch38.ogg
│   │   │   │   │   │   ├── switch38.ogg.meta
│   │   │   │   │   │   ├── switch38.wav
│   │   │   │   │   │   ├── switch38.wav.meta
│   │   │   │   │   │   ├── switch4.ogg
│   │   │   │   │   │   ├── switch4.ogg.meta
│   │   │   │   │   │   ├── switch4.wav
│   │   │   │   │   │   ├── switch4.wav.meta
│   │   │   │   │   │   ├── switch5.ogg
│   │   │   │   │   │   ├── switch5.ogg.meta
│   │   │   │   │   │   ├── switch5.wav
│   │   │   │   │   │   ├── switch5.wav.meta
│   │   │   │   │   │   ├── switch6.ogg
│   │   │   │   │   │   ├── switch6.ogg.meta
│   │   │   │   │   │   ├── switch6.wav
│   │   │   │   │   │   ├── switch6.wav.meta
│   │   │   │   │   │   ├── switch7.ogg
│   │   │   │   │   │   ├── switch7.ogg.meta
│   │   │   │   │   │   ├── switch7.wav
│   │   │   │   │   │   ├── switch7.wav.meta
│   │   │   │   │   │   ├── switch8.ogg
│   │   │   │   │   │   ├── switch8.ogg.meta
│   │   │   │   │   │   ├── switch8.wav
│   │   │   │   │   │   ├── switch8.wav.meta
│   │   │   │   │   │   ├── switch9.ogg
│   │   │   │   │   │   ├── switch9.ogg.meta
│   │   │   │   │   │   ├── switch9.wav
│   │   │   │   │   │   └── switch9.wav.meta
│   │   │   │   │   ├── Gameplay.meta
│   │   │   │   │   ├── Music.meta
│   │   │   │   │   └── User Interface.meta
│   │   │   │   ├── Sprites
│   │   │   │   │   ├── Character Body
│   │   │   │   │   │   ├── Character_2.png
│   │   │   │   │   │   ├── Character_2.png.meta
│   │   │   │   │   │   ├── Character_EyeTypes.png
│   │   │   │   │   │   ├── Character_EyeTypes.png.meta
│   │   │   │   │   │   ├── Character_Hair0.png
│   │   │   │   │   │   ├── Character_Hair0.png.meta
│   │   │   │   │   │   ├── Character_Hair1.png
│   │   │   │   │   │   ├── Character_Hair1.png.meta
│   │   │   │   │   │   ├── Character_Pants1.png
│   │   │   │   │   │   ├── Character_Pants1.png.meta
│   │   │   │   │   │   ├── Character_Pants2.png
│   │   │   │   │   │   ├── Character_Pants2.png.meta
│   │   │   │   │   │   ├── Character_Shirt1.png
│   │   │   │   │   │   ├── Character_Shirt1.png.meta
│   │   │   │   │   │   ├── Eyes_01.png
│   │   │   │   │   │   ├── Eyes_01.png.meta
│   │   │   │   │   │   ├── Eyes_02.png
│   │   │   │   │   │   ├── Eyes_02.png.meta
│   │   │   │   │   │   ├── Eyes_03.png
│   │   │   │   │   │   ├── Eyes_03.png.meta
│   │   │   │   │   │   ├── Eyes_04.png
│   │   │   │   │   │   ├── Eyes_04.png.meta
│   │   │   │   │   │   ├── Eyes_05.png
│   │   │   │   │   │   ├── Eyes_05.png.meta
│   │   │   │   │   │   ├── Eyes_06.png
│   │   │   │   │   │   └── Eyes_06.png.meta
│   │   │   │   │   ├── Enemies
│   │   │   │   │   │   ├── Monster_Blob_Art.png
│   │   │   │   │   │   └── Monster_Blob_Art.png.meta
│   │   │   │   │   ├── Indoors
│   │   │   │   │   │   ├── Bed.png
│   │   │   │   │   │   ├── Bed.png.meta
│   │   │   │   │   │   ├── Indoors_House_BackCornerLeft.asset
│   │   │   │   │   │   ├── Indoors_House_BackCornerLeft.asset.meta
│   │   │   │   │   │   ├── Indoors_House_BackCornerRight.asset
│   │   │   │   │   │   ├── Indoors_House_BackCornerRight.asset.meta
│   │   │   │   │   │   ├── Indoors_House.png
│   │   │   │   │   │   └── Indoors_House.png.meta
│   │   │   │   │   ├── Items
│   │   │   │   │   │   ├── Misc_Items.png
│   │   │   │   │   │   ├── Misc_Items.png.meta
│   │   │   │   │   │   ├── UseItems.png
│   │   │   │   │   │   └── UseItems.png.meta
│   │   │   │   │   ├── Main Menu
│   │   │   │   │   │   ├── Background.png
│   │   │   │   │   │   ├── Background.png.meta
│   │   │   │   │   │   ├── Logo.png
│   │   │   │   │   │   └── Logo.png.meta
│   │   │   │   │   ├── Misc
│   │   │   │   │   │   ├── Blobshadow.png
│   │   │   │   │   │   ├── Blobshadow.png.meta
│   │   │   │   │   │   ├── SelectionSprite.png
│   │   │   │   │   │   ├── SelectionSprite.png.meta
│   │   │   │   │   │   ├── Shadow Grid.png
│   │   │   │   │   │   ├── Shadow Grid.png.meta
│   │   │   │   │   │   ├── Shadow.png
│   │   │   │   │   │   └── Shadow.png.meta
│   │   │   │   │   ├── Outdoors
│   │   │   │   │   │   ├── Placeable Objects
│   │   │   │   │   │   │   ├── Small Chest.png
│   │   │   │   │   │   │   └── Small Chest.png.meta
│   │   │   │   │   │   ├── Plants
│   │   │   │   │   │   │   ├── Plant_kale.png
│   │   │   │   │   │   │   └── Plant_kale.png.meta
│   │   │   │   │   │   ├── Cliffs.png
│   │   │   │   │   │   ├── Cliffs.png.meta
│   │   │   │   │   │   ├── Door.png
│   │   │   │   │   │   ├── Door.png.meta
│   │   │   │   │   │   ├── FarmClutter.png
│   │   │   │   │   │   ├── FarmClutter.png.meta
│   │   │   │   │   │   ├── Fence.png
│   │   │   │   │   │   ├── Fence.png.meta
│   │   │   │   │   │   ├── Ground_Dirt.png
│   │   │   │   │   │   ├── Ground_Dirt.png.meta
│   │   │   │   │   │   ├── Ground_DirtHole.png
│   │   │   │   │   │   ├── Ground_DirtHole.png.meta
│   │   │   │   │   │   ├── Ground_DirtHoleWet.png
│   │   │   │   │   │   ├── Ground_DirtHoleWet.png.meta
│   │   │   │   │   │   ├── Ground_GrassTiles.png
│   │   │   │   │   │   ├── Ground_GrassTiles.png.meta
│   │   │   │   │   │   ├── Ground_HighGrass.png
│   │   │   │   │   │   ├── Ground_HighGrass.png.meta
│   │   │   │   │   │   ├── House.png
│   │   │   │   │   │   ├── House.png.meta
│   │   │   │   │   │   ├── Placeable Objects.meta
│   │   │   │   │   │   ├── Plants.meta
│   │   │   │   │   │   ├── rain.png
│   │   │   │   │   │   ├── rain.png.meta
│   │   │   │   │   │   ├── raindrop0.png
│   │   │   │   │   │   ├── raindrop0.png.meta
│   │   │   │   │   │   ├── Tree_01.png
│   │   │   │   │   │   ├── Tree_01.png.meta
│   │   │   │   │   │   ├── Tree_02.png
│   │   │   │   │   │   ├── Tree_02.png.meta
│   │   │   │   │   │   ├── Water.png
│   │   │   │   │   │   └── Water.png.meta
│   │   │   │   │   ├── User Interface
│   │   │   │   │   │   ├── Cursor_Selectable_Upscaled_Transparent.png
│   │   │   │   │   │   ├── Cursor_Selectable_Upscaled_Transparent.png.meta
│   │   │   │   │   │   ├── Cursor_Selectable_Upscaled.png
│   │   │   │   │   │   ├── Cursor_Selectable_Upscaled.png.meta
│   │   │   │   │   │   ├── Cursor_Selectable.png
│   │   │   │   │   │   ├── Cursor_Selectable.png.meta
│   │   │   │   │   │   ├── Cursor_Upscaled.png
│   │   │   │   │   │   ├── Cursor_Upscaled.png.meta
│   │   │   │   │   │   ├── Cursor.png
│   │   │   │   │   │   ├── Cursor.png.meta
│   │   │   │   │   │   ├── Icon_About.png
│   │   │   │   │   │   ├── Icon_About.png.meta
│   │   │   │   │   │   ├── Icon_FX_Off.png
│   │   │   │   │   │   ├── Icon_FX_Off.png.meta
│   │   │   │   │   │   ├── Icon_FX_On.png
│   │   │   │   │   │   ├── Icon_FX_On.png.meta
│   │   │   │   │   │   ├── Icon_Music.png
│   │   │   │   │   │   ├── Icon_Music.png.meta
│   │   │   │   │   │   ├── TimeIndicator.png
│   │   │   │   │   │   ├── TimeIndicator.png.meta
│   │   │   │   │   │   ├── UI_Inventory_EnergyBar.png
│   │   │   │   │   │   ├── UI_Inventory_EnergyBar.png.meta
│   │   │   │   │   │   ├── UI_Inventory_Segment.png
│   │   │   │   │   │   ├── UI_Inventory_Segment.png.meta
│   │   │   │   │   │   ├── UI_Inventory_Side.png
│   │   │   │   │   │   ├── UI_Inventory_Side.png.meta
│   │   │   │   │   │   ├── UI_Inventory_SlotHighlight.png
│   │   │   │   │   │   ├── UI_Inventory_SlotHighlight.png.meta
│   │   │   │   │   │   ├── UI_Inventory_TimeGoldIndicator.png
│   │   │   │   │   │   ├── UI_Inventory_TimeGoldIndicator.png.meta
│   │   │   │   │   │   ├── UI_Inventory.png
│   │   │   │   │   │   └── UI_Inventory.png.meta
│   │   │   │   │   ├── Character Body.meta
│   │   │   │   │   ├── Enemies.meta
│   │   │   │   │   ├── Game.spriteatlas
│   │   │   │   │   ├── Game.spriteatlas.meta
│   │   │   │   │   ├── Indoors.meta
│   │   │   │   │   ├── InDoors.spriteatlas
│   │   │   │   │   ├── InDoors.spriteatlas.meta
│   │   │   │   │   ├── Items.meta
│   │   │   │   │   ├── lifetopia-world-map-farm-slice.png
│   │   │   │   │   ├── lifetopia-world-map-farm-slice.png.meta
│   │   │   │   │   ├── lifetopia-world-map.png
│   │   │   │   │   ├── lifetopia-world-map.png.meta
│   │   │   │   │   ├── Main Menu.meta
│   │   │   │   │   ├── Main Menu.spriteatlas
│   │   │   │   │   ├── Main Menu.spriteatlas.meta
│   │   │   │   │   ├── Misc.meta
│   │   │   │   │   ├── Outdoors.meta
│   │   │   │   │   ├── OutDoors.spriteatlas
│   │   │   │   │   ├── OutDoors.spriteatlas.meta
│   │   │   │   │   └── User Interface.meta
│   │   │   │   ├── Tiles
│   │   │   │   │   ├── Materials
│   │   │   │   │   │   ├── House.mat
│   │   │   │   │   │   ├── House.mat.meta
│   │   │   │   │   │   ├── Tilemap_Shadows.mat
│   │   │   │   │   │   └── Tilemap_Shadows.mat.meta
│   │   │   │   │   ├── Smart Tiles
│   │   │   │   │   │   ├── Fence.asset
│   │   │   │   │   │   ├── Fence.asset.meta
│   │   │   │   │   │   ├── Ground_Auto_Dirt.asset
│   │   │   │   │   │   ├── Ground_Auto_Dirt.asset.meta
│   │   │   │   │   │   ├── Ground_Auto_HighGrass.asset
│   │   │   │   │   │   ├── Ground_Auto_HighGrass.asset.meta
│   │   │   │   │   │   ├── Ground_Random_GrassTile_Weighted.asset
│   │   │   │   │   │   ├── Ground_Random_GrassTile_Weighted.asset.meta
│   │   │   │   │   │   ├── Shadows_Entrance.asset
│   │   │   │   │   │   ├── Shadows_Entrance.asset.meta
│   │   │   │   │   │   ├── Water.asset
│   │   │   │   │   │   └── Water.asset.meta
│   │   │   │   │   ├── Tiles
│   │   │   │   │   │   ├── Cliff_Front_Bottom.asset
│   │   │   │   │   │   ├── Cliff_Front_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_Front_Top.asset
│   │   │   │   │   │   ├── Cliff_Front_Top.asset.meta
│   │   │   │   │   │   ├── Cliff_FrontCenter_Bottom.asset
│   │   │   │   │   │   ├── Cliff_FrontCenter_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_FrontCenter_Top.asset
│   │   │   │   │   │   ├── Cliff_FrontCenter_Top.asset.meta
│   │   │   │   │   │   ├── Cliff_Ground.asset
│   │   │   │   │   │   ├── Cliff_Ground.asset.meta
│   │   │   │   │   │   ├── Cliff_Inside.asset
│   │   │   │   │   │   ├── Cliff_Inside.asset.meta
│   │   │   │   │   │   ├── Cliff_Side_Bottom.asset
│   │   │   │   │   │   ├── Cliff_Side_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_Side_Middle.asset
│   │   │   │   │   │   ├── Cliff_Side_Middle.asset.meta
│   │   │   │   │   │   ├── Cliff_Side_Top.asset
│   │   │   │   │   │   ├── Cliff_Side_Top.asset.meta
│   │   │   │   │   │   ├── Cliff_SideRight_Bottom.asset
│   │   │   │   │   │   ├── Cliff_SideRight_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_SideRight_Middle.asset
│   │   │   │   │   │   ├── Cliff_SideRight_Middle.asset.meta
│   │   │   │   │   │   ├── Cliff_SideRight_Top.asset
│   │   │   │   │   │   ├── Cliff_SideRight_Top.asset.meta
│   │   │   │   │   │   ├── Cliff_SlopeLeft_Bottom.asset
│   │   │   │   │   │   ├── Cliff_SlopeLeft_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_SlopeLeft_Top.asset
│   │   │   │   │   │   ├── Cliff_SlopeLeft_Top.asset.meta
│   │   │   │   │   │   ├── Cliff_SlopeRight_Bottom.asset
│   │   │   │   │   │   ├── Cliff_SlopeRight_Bottom.asset.meta
│   │   │   │   │   │   ├── Cliff_SlopeRight_Top.asset
│   │   │   │   │   │   ├── Cliff_SlopeRight_Top.asset.meta
│   │   │   │   │   │   ├── Cliffs_Back_Filled.asset
│   │   │   │   │   │   ├── Cliffs_Back_Filled.asset.meta
│   │   │   │   │   │   ├── Cliffs_Back.asset
│   │   │   │   │   │   ├── Cliffs_Back.asset.meta
│   │   │   │   │   │   ├── Cliffs_LeftSide_Filled.asset
│   │   │   │   │   │   ├── Cliffs_LeftSide_Filled.asset.meta
│   │   │   │   │   │   ├── Cliffs_LeftSide.asset
│   │   │   │   │   │   ├── Cliffs_LeftSide.asset.meta
│   │   │   │   │   │   ├── Cliffs_RightSide_Filled.asset
│   │   │   │   │   │   ├── Cliffs_RightSide_Filled.asset.meta
│   │   │   │   │   │   ├── Cliffs_RightSide.asset
│   │   │   │   │   │   ├── Cliffs_RightSide.asset.meta
│   │   │   │   │   │   ├── Cliffs_SideBack.asset
│   │   │   │   │   │   ├── Cliffs_SideBack.asset.meta
│   │   │   │   │   │   ├── Cliffs_SideBackLeft_Filled.asset
│   │   │   │   │   │   ├── Cliffs_SideBackLeft_Filled.asset.meta
│   │   │   │   │   │   ├── Cliffs_SideBackRight_Filled.asset
│   │   │   │   │   │   ├── Cliffs_SideBackRight_Filled.asset.meta
│   │   │   │   │   │   ├── Cliffs_SideBackRight.asset
│   │   │   │   │   │   ├── Cliffs_SideBackRight.asset.meta
│   │   │   │   │   │   ├── Indoors_House_Back.asset
│   │   │   │   │   │   ├── Indoors_House_Back.asset.meta
│   │   │   │   │   │   ├── Indoors_House_BackLeftCorner.asset
│   │   │   │   │   │   ├── Indoors_House_BackLeftCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_BackRightCorner.asset
│   │   │   │   │   │   ├── Indoors_House_BackRightCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_Dark.asset
│   │   │   │   │   │   ├── Indoors_House_Dark.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontBottom.asset
│   │   │   │   │   │   ├── Indoors_House_FrontBottom.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontBottomLeftCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontBottomLeftCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontBottomRightCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontBottomRightCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontLeftCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontLeftCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontRightCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontRightCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontTop.asset
│   │   │   │   │   │   ├── Indoors_House_FrontTop.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontTopLeftCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontTopLeftCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_FrontTopRightCorner.asset
│   │   │   │   │   │   ├── Indoors_House_FrontTopRightCorner.asset.meta
│   │   │   │   │   │   ├── Indoors_House_Ground.asset
│   │   │   │   │   │   ├── Indoors_House_Ground.asset.meta
│   │   │   │   │   │   ├── Indoors_House_Left.asset
│   │   │   │   │   │   ├── Indoors_House_Left.asset.meta
│   │   │   │   │   │   ├── Indoors_House_Right.asset
│   │   │   │   │   │   ├── Indoors_House_Right.asset.meta
│   │   │   │   │   │   ├── Shadows_InnerBottomLeftCorner.asset
│   │   │   │   │   │   ├── Shadows_InnerBottomLeftCorner.asset.meta
│   │   │   │   │   │   ├── Shadows_InnerRightBottomCorner.asset
│   │   │   │   │   │   ├── Shadows_InnerRightBottomCorner.asset.meta
│   │   │   │   │   │   ├── Shadows_InnerRightTopCorner.asset
│   │   │   │   │   │   ├── Shadows_InnerRightTopCorner.asset.meta
│   │   │   │   │   │   ├── Shadows_InnerTopLeftCorner.asset
│   │   │   │   │   │   ├── Shadows_InnerTopLeftCorner.asset.meta
│   │   │   │   │   │   ├── Shadows_LeftBot.asset
│   │   │   │   │   │   ├── Shadows_LeftBot.asset.meta
│   │   │   │   │   │   ├── Shadows_LeftMid.asset
│   │   │   │   │   │   ├── Shadows_LeftMid.asset.meta
│   │   │   │   │   │   ├── Shadows_LeftTop.asset
│   │   │   │   │   │   ├── Shadows_LeftTop.asset.meta
│   │   │   │   │   │   ├── Shadows_Mid.asset
│   │   │   │   │   │   ├── Shadows_Mid.asset.meta
│   │   │   │   │   │   ├── Shadows_MidBot.asset
│   │   │   │   │   │   ├── Shadows_MidBot.asset.meta
│   │   │   │   │   │   ├── Shadows_MidTop.asset
│   │   │   │   │   │   ├── Shadows_MidTop.asset.meta
│   │   │   │   │   │   ├── Shadows_Right.asset
│   │   │   │   │   │   ├── Shadows_Right.asset.meta
│   │   │   │   │   │   ├── Shadows_RightBot.asset
│   │   │   │   │   │   ├── Shadows_RightBot.asset.meta
│   │   │   │   │   │   ├── Shadows_RightTop.asset
│   │   │   │   │   │   └── Shadows_RightTop.asset.meta
│   │   │   │   │   ├── Materials.meta
│   │   │   │   │   ├── Smart Tiles.meta
│   │   │   │   │   ├── Tilemap.prefab
│   │   │   │   │   ├── Tilemap.prefab.meta
│   │   │   │   │   └── Tiles.meta
│   │   │   │   ├── Animations.meta
│   │   │   │   ├── Fonts.meta
│   │   │   │   ├── Materials.meta
│   │   │   │   ├── Sounds.meta
│   │   │   │   ├── Sprites.meta
│   │   │   │   └── Tiles.meta
│   │   │   ├── Editor Default Resources
│   │   │   │   ├── Farm Framework Tools.asset
│   │   │   │   └── Farm Framework Tools.asset.meta
│   │   │   ├── Farm RPG FREE 16x16 - Tiny Asset Pack
│   │   │   │   ├── Character
│   │   │   │   │   ├── Idle.png
│   │   │   │   │   ├── Idle.png.meta
│   │   │   │   │   ├── vendor_0.controller
│   │   │   │   │   ├── vendor_0.controller.meta
│   │   │   │   │   ├── vendor.anim
│   │   │   │   │   ├── vendor.anim.meta
│   │   │   │   │   ├── Walk.png
│   │   │   │   │   └── Walk.png.meta
│   │   │   │   ├── Farm Animals
│   │   │   │   │   ├── Baby Chicken Yellow.png
│   │   │   │   │   ├── Baby Chicken Yellow.png.meta
│   │   │   │   │   ├── Chicken Blonde  Green.png
│   │   │   │   │   ├── Chicken Blonde  Green.png.meta
│   │   │   │   │   ├── Chicken Red.png
│   │   │   │   │   ├── Chicken Red.png.meta
│   │   │   │   │   ├── Female Cow Brown.png
│   │   │   │   │   ├── Female Cow Brown.png.meta
│   │   │   │   │   ├── Male Cow Brown.png
│   │   │   │   │   └── Male Cow Brown.png.meta
│   │   │   │   ├── Objects
│   │   │   │   │   ├── chest.png
│   │   │   │   │   ├── chest.png.meta
│   │   │   │   │   ├── Fence's copiar.png
│   │   │   │   │   ├── Fence's copiar.png.meta
│   │   │   │   │   ├── House.png
│   │   │   │   │   ├── House.png.meta
│   │   │   │   │   ├── Interior.png
│   │   │   │   │   ├── Interior.png.meta
│   │   │   │   │   ├── Maple Tree.png
│   │   │   │   │   ├── Maple Tree.png.meta
│   │   │   │   │   ├── Road copiar.png
│   │   │   │   │   ├── Road copiar.png.meta
│   │   │   │   │   ├── Spring Crops.png
│   │   │   │   │   └── Spring Crops.png.meta
│   │   │   │   ├── Tileset
│   │   │   │   │   ├── Tileset Spring.png
│   │   │   │   │   └── Tileset Spring.png.meta
│   │   │   │   ├── Character.meta
│   │   │   │   ├── Farm Animals.meta
│   │   │   │   ├── Objects.meta
│   │   │   │   └── Tileset.meta
│   │   │   ├── Plugins
│   │   │   │   ├── Lowscope
│   │   │   │   │   ├── ComponentSaveSystem
│   │   │   │   │   │   ├── Components
│   │   │   │   │   │   │   ├── Extras
│   │   │   │   │   │   │   │   ├── SaveEventListener.cs
│   │   │   │   │   │   │   │   ├── SaveEventListener.cs.meta
│   │   │   │   │   │   │   │   ├── WriteSaveToDisk.cs
│   │   │   │   │   │   │   │   └── WriteSaveToDisk.cs.meta
│   │   │   │   │   │   │   ├── Scene Loading
│   │   │   │   │   │   │   │   ├── LoadLastUsedScenes.cs
│   │   │   │   │   │   │   │   ├── LoadLastUsedScenes.cs.meta
│   │   │   │   │   │   │   │   ├── LoadSceneOnSaveTrigger.cs
│   │   │   │   │   │   │   │   ├── LoadSceneOnSaveTrigger.cs.meta
│   │   │   │   │   │   │   │   ├── SaveLastUsedScenes.cs
│   │   │   │   │   │   │   │   └── SaveLastUsedScenes.cs.meta
│   │   │   │   │   │   │   ├── Scriptableobjects
│   │   │   │   │   │   │   │   ├── SaveIdentifierReference.cs
│   │   │   │   │   │   │   │   ├── SaveIdentifierReference.cs.meta
│   │   │   │   │   │   │   │   ├── SaveIdentifierVariable.cs
│   │   │   │   │   │   │   │   └── SaveIdentifierVariable.cs.meta
│   │   │   │   │   │   │   ├── User Interface
│   │   │   │   │   │   │   │   ├── SaveScreenShotDisplayer.cs
│   │   │   │   │   │   │   │   └── SaveScreenShotDisplayer.cs.meta
│   │   │   │   │   │   │   ├── Extras.meta
│   │   │   │   │   │   │   ├── Saveable.cs
│   │   │   │   │   │   │   ├── Saveable.cs.meta
│   │   │   │   │   │   │   ├── SavePosition.cs
│   │   │   │   │   │   │   ├── SavePosition.cs.meta
│   │   │   │   │   │   │   ├── SaveRotation.cs
│   │   │   │   │   │   │   ├── SaveRotation.cs.meta
│   │   │   │   │   │   │   ├── SaveScale.cs
│   │   │   │   │   │   │   ├── SaveScale.cs.meta
│   │   │   │   │   │   │   ├── SaveScreenshot.cs
│   │   │   │   │   │   │   ├── SaveScreenshot.cs.meta
│   │   │   │   │   │   │   ├── SaveVisibility.cs
│   │   │   │   │   │   │   ├── SaveVisibility.cs.meta
│   │   │   │   │   │   │   ├── Scene Loading.meta
│   │   │   │   │   │   │   ├── Scriptableobjects.meta
│   │   │   │   │   │   │   └── User Interface.meta
│   │   │   │   │   │   ├── Core
│   │   │   │   │   │   │   ├── MetaDataFileUtility.cs
│   │   │   │   │   │   │   ├── MetaDataFileUtility.cs.meta
│   │   │   │   │   │   │   ├── SavedInstance.cs
│   │   │   │   │   │   │   ├── SavedInstance.cs.meta
│   │   │   │   │   │   │   ├── SaveFileUtility.cs
│   │   │   │   │   │   │   ├── SaveFileUtility.cs.meta
│   │   │   │   │   │   │   ├── SaveInstanceManager.cs
│   │   │   │   │   │   │   └── SaveInstanceManager.cs.meta
│   │   │   │   │   │   ├── Data
│   │   │   │   │   │   │   ├── IConvertSaveGame.cs
│   │   │   │   │   │   │   ├── IConvertSaveGame.cs.meta
│   │   │   │   │   │   │   ├── SaveGame.cs
│   │   │   │   │   │   │   ├── SaveGame.cs.meta
│   │   │   │   │   │   │   ├── SaveGameBinary.cs
│   │   │   │   │   │   │   ├── SaveGameBinary.cs.meta
│   │   │   │   │   │   │   ├── SaveGameJSON.cs
│   │   │   │   │   │   │   ├── SaveGameJSON.cs.meta
│   │   │   │   │   │   │   ├── SaveGameSqlite.cs
│   │   │   │   │   │   │   ├── SaveGameSqlite.cs.meta
│   │   │   │   │   │   │   ├── SaveSettings.cs
│   │   │   │   │   │   │   └── SaveSettings.cs.meta
│   │   │   │   │   │   ├── Editor
│   │   │   │   │   │   │   ├── Assembly-ComponentSaveSystem-Editor.asmdef
│   │   │   │   │   │   │   ├── Assembly-ComponentSaveSystem-Editor.asmdef.meta
│   │   │   │   │   │   │   ├── SaveableInspector.cs
│   │   │   │   │   │   │   ├── SaveableInspector.cs.meta
│   │   │   │   │   │   │   ├── SaveIdentifierReferenceDrawer.cs
│   │   │   │   │   │   │   ├── SaveIdentifierReferenceDrawer.cs.meta
│   │   │   │   │   │   │   ├── SaveMenuCommands.cs
│   │   │   │   │   │   │   └── SaveMenuCommands.cs.meta
│   │   │   │   │   │   ├── Enums
│   │   │   │   │   │   │   ├── EncryptionType.cs
│   │   │   │   │   │   │   ├── EncryptionType.cs.meta
│   │   │   │   │   │   │   ├── InstanceSource.cs
│   │   │   │   │   │   │   ├── InstanceSource.cs.meta
│   │   │   │   │   │   │   ├── LoadTrigger.cs
│   │   │   │   │   │   │   ├── LoadTrigger.cs.meta
│   │   │   │   │   │   │   ├── SaveFileCheck.cs
│   │   │   │   │   │   │   ├── SaveFileCheck.cs.meta
│   │   │   │   │   │   │   ├── StorageType.cs
│   │   │   │   │   │   │   └── StorageType.cs.meta
│   │   │   │   │   │   ├── Interfaces
│   │   │   │   │   │   │   ├── ISaveable.cs
│   │   │   │   │   │   │   └── ISaveable.cs.meta
│   │   │   │   │   │   ├── Assembly-ComponentSaveSystem.asmdef
│   │   │   │   │   │   ├── Assembly-ComponentSaveSystem.asmdef.meta
│   │   │   │   │   │   ├── Components.meta
│   │   │   │   │   │   ├── Core.meta
│   │   │   │   │   │   ├── csc.rsp
│   │   │   │   │   │   ├── csc.rsp.meta
│   │   │   │   │   │   ├── Data.meta
│   │   │   │   │   │   ├── Editor.meta
│   │   │   │   │   │   ├── Enums.meta
│   │   │   │   │   │   ├── Interfaces.meta
│   │   │   │   │   │   ├── SaveMaster.cs
│   │   │   │   │   │   └── SaveMaster.cs.meta
│   │   │   │   │   ├── ValidateHierarchy
│   │   │   │   │   │   ├── Assembly-ValidateHierarchy.asmdef
│   │   │   │   │   │   ├── Assembly-ValidateHierarchy.asmdef.meta
│   │   │   │   │   │   ├── ValidateHierarchy.cs
│   │   │   │   │   │   └── ValidateHierarchy.cs.meta
│   │   │   │   │   ├── ComponentSaveSystem.meta
│   │   │   │   │   └── ValidateHierarchy.meta
│   │   │   │   ├── Scriptable Object Updater
│   │   │   │   │   ├── Attribute
│   │   │   │   │   │   ├── InitializeAssetMethodAttribute.cs
│   │   │   │   │   │   └── InitializeAssetMethodAttribute.cs.meta
│   │   │   │   │   ├── Editor
│   │   │   │   │   │   ├── ScriptableObjectInitializer.cs
│   │   │   │   │   │   ├── ScriptableObjectInitializer.cs.meta
│   │   │   │   │   │   ├── ScriptableObjectUpdaterConfiguration.cs
│   │   │   │   │   │   └── ScriptableObjectUpdaterConfiguration.cs.meta
│   │   │   │   │   ├── Enums
│   │   │   │   │   │   ├── EEventType.cs
│   │   │   │   │   │   └── EEventType.cs.meta
│   │   │   │   │   ├── Tickers
│   │   │   │   │   │   ├── AwakeTick.cs
│   │   │   │   │   │   ├── AwakeTick.cs.meta
│   │   │   │   │   │   ├── FixedUpdateTicker.cs
│   │   │   │   │   │   ├── FixedUpdateTicker.cs.meta
│   │   │   │   │   │   ├── LateUpdateTicker.cs
│   │   │   │   │   │   ├── LateUpdateTicker.cs.meta
│   │   │   │   │   │   ├── StartTick.cs
│   │   │   │   │   │   ├── StartTick.cs.meta
│   │   │   │   │   │   ├── Ticker.cs
│   │   │   │   │   │   ├── Ticker.cs.meta
│   │   │   │   │   │   ├── UpdateTicker.cs
│   │   │   │   │   │   └── UpdateTicker.cs.meta
│   │   │   │   │   ├── Attribute.meta
│   │   │   │   │   ├── Editor.meta
│   │   │   │   │   ├── Enums.meta
│   │   │   │   │   ├── InitializeableAssetContainer.cs
│   │   │   │   │   ├── InitializeableAssetContainer.cs.meta
│   │   │   │   │   ├── Scriptable Object Updater.pdf
│   │   │   │   │   ├── Scriptable Object Updater.pdf.meta
│   │   │   │   │   ├── Tickers.meta
│   │   │   │   │   ├── UpdateableEvent.cs
│   │   │   │   │   └── UpdateableEvent.cs.meta
│   │   │   │   ├── WebGL
│   │   │   │   │   ├── HandleIO.jslib
│   │   │   │   │   ├── HandleIO.jslib.meta
│   │   │   │   │   ├── OpenWindow.jslib
│   │   │   │   │   ├── OpenWindow.jslib.meta
│   │   │   │   │   ├── Readme.txt
│   │   │   │   │   └── Readme.txt.meta
│   │   │   │   ├── Lowscope.meta
│   │   │   │   ├── Scriptable Object Updater.meta
│   │   │   │   └── WebGL.meta
│   │   │   ├── Prefabs
│   │   │   │   ├── Systems
│   │   │   │   │   ├── Garbage Collection System.prefab
│   │   │   │   │   ├── Garbage Collection System.prefab.meta
│   │   │   │   │   ├── Input System.prefab
│   │   │   │   │   ├── Input System.prefab.meta
│   │   │   │   │   ├── Interaction System.prefab
│   │   │   │   │   ├── Interaction System.prefab.meta
│   │   │   │   │   ├── Pauze System.prefab
│   │   │   │   │   ├── Pauze System.prefab.meta
│   │   │   │   │   ├── Save System.prefab
│   │   │   │   │   ├── Save System.prefab.meta
│   │   │   │   │   ├── Time System.prefab
│   │   │   │   │   ├── Time System.prefab.meta
│   │   │   │   │   ├── Warp System.prefab
│   │   │   │   │   ├── Warp System.prefab.meta
│   │   │   │   │   ├── Weather System.prefab
│   │   │   │   │   └── Weather System.prefab.meta
│   │   │   │   ├── User Interface
│   │   │   │   │   ├── Core
│   │   │   │   │   │   ├── Asset Store Notifcation Window.prefab
│   │   │   │   │   │   ├── Asset Store Notifcation Window.prefab.meta
│   │   │   │   │   │   ├── Darken Screen.prefab
│   │   │   │   │   │   ├── Darken Screen.prefab.meta
│   │   │   │   │   │   ├── Energy Bar.prefab
│   │   │   │   │   │   ├── Energy Bar.prefab.meta
│   │   │   │   │   │   ├── Health Bar.prefab
│   │   │   │   │   │   ├── Health Bar.prefab.meta
│   │   │   │   │   │   ├── Inventory Bar.prefab
│   │   │   │   │   │   ├── Inventory Bar.prefab.meta
│   │   │   │   │   │   ├── Item Storage Window.prefab
│   │   │   │   │   │   ├── Item Storage Window.prefab.meta
│   │   │   │   │   │   ├── LayerIcons.prefab
│   │   │   │   │   │   ├── LayerIcons.prefab.meta
│   │   │   │   │   │   ├── Pauze Menu.prefab
│   │   │   │   │   │   ├── Pauze Menu.prefab.meta
│   │   │   │   │   │   ├── Time and Gold Indicator.prefab
│   │   │   │   │   │   └── Time and Gold Indicator.prefab.meta
│   │   │   │   │   ├── Start Menu
│   │   │   │   │   │   ├── UI Character Renderer.prefab
│   │   │   │   │   │   ├── UI Character Renderer.prefab.meta
│   │   │   │   │   │   ├── UI Save Slot Displayer.prefab
│   │   │   │   │   │   └── UI Save Slot Displayer.prefab.meta
│   │   │   │   │   ├── Windows
│   │   │   │   │   │   ├── Confirmation Window.prefab
│   │   │   │   │   │   └── Confirmation Window.prefab.meta
│   │   │   │   │   ├── Core.meta
│   │   │   │   │   ├── Selection Tab.prefab
│   │   │   │   │   ├── Selection Tab.prefab.meta
│   │   │   │   │   ├── Start Menu.meta
│   │   │   │   │   └── Windows.meta
│   │   │   │   ├── World
│   │   │   │   │   ├── Enemies
│   │   │   │   │   │   ├── Monster_Blob.prefab
│   │   │   │   │   │   └── Monster_Blob.prefab.meta
│   │   │   │   │   ├── Indoors
│   │   │   │   │   │   ├── Bed.prefab
│   │   │   │   │   │   └── Bed.prefab.meta
│   │   │   │   │   ├── Outdoors
│   │   │   │   │   │   ├── Crop Cucumber.prefab
│   │   │   │   │   │   ├── Crop Cucumber.prefab.meta
│   │   │   │   │   │   ├── Crop Kale.prefab
│   │   │   │   │   │   ├── Crop Kale.prefab.meta
│   │   │   │   │   │   ├── Crop Onion.prefab
│   │   │   │   │   │   ├── Crop Onion.prefab.meta
│   │   │   │   │   │   ├── Crop Peanut.prefab
│   │   │   │   │   │   ├── Crop Peanut.prefab.meta
│   │   │   │   │   │   ├── Crop Strawberry.prefab
│   │   │   │   │   │   ├── Crop Strawberry.prefab.meta
│   │   │   │   │   │   ├── Plant.prefab
│   │   │   │   │   │   ├── Plant.prefab.meta
│   │   │   │   │   │   ├── Rock.prefab
│   │   │   │   │   │   ├── Rock.prefab.meta
│   │   │   │   │   │   ├── Tree.prefab
│   │   │   │   │   │   └── Tree.prefab.meta
│   │   │   │   │   ├── Utilizeable
│   │   │   │   │   │   ├── Small Chest.prefab
│   │   │   │   │   │   └── Small Chest.prefab.meta
│   │   │   │   │   ├── Weather
│   │   │   │   │   │   ├── Rain Drop.prefab
│   │   │   │   │   │   └── Rain Drop.prefab.meta
│   │   │   │   │   ├── Damage Volume.prefab
│   │   │   │   │   ├── Damage Volume.prefab.meta
│   │   │   │   │   ├── Enemies.meta
│   │   │   │   │   ├── Indoors.meta
│   │   │   │   │   ├── Lootable Item.prefab
│   │   │   │   │   ├── Lootable Item.prefab.meta
│   │   │   │   │   ├── Outdoors.meta
│   │   │   │   │   ├── Player.prefab
│   │   │   │   │   ├── Player.prefab.meta
│   │   │   │   │   ├── Utilizeable.meta
│   │   │   │   │   └── Weather.meta
│   │   │   │   ├── Systems.meta
│   │   │   │   ├── User Interface.meta
│   │   │   │   ├── WalletCanvas.prefab
│   │   │   │   ├── WalletCanvas.prefab.meta
│   │   │   │   └── World.meta
│   │   │   ├── Resources
│   │   │   │   ├── SolanaUnitySDK
│   │   │   │   │   ├── [WalletController].prefab
│   │   │   │   │   ├── [WalletController].prefab.meta
│   │   │   │   │   ├── WalletAdapterButton.prefab
│   │   │   │   │   ├── WalletAdapterButton.prefab.meta
│   │   │   │   │   ├── WalletAdapterUI.prefab
│   │   │   │   │   └── WalletAdapterUI.prefab.meta
│   │   │   │   ├── Save Plugin Settings.asset
│   │   │   │   ├── Save Plugin Settings.asset.meta
│   │   │   │   └── SolanaUnitySDK.meta
│   │   │   ├── Samples
│   │   │   │   ├── Solana SDK
│   │   │   │   │   ├── 1.2.10
│   │   │   │   │   │   ├── Sample Wallet
│   │   │   │   │   │   │   ├── Solana Wallet
│   │   │   │   │   │   │   │   ├── Animations
│   │   │   │   │   │   │   │   │   ├── Button-Action.controller
│   │   │   │   │   │   │   │   │   ├── Button-Action.controller.meta
│   │   │   │   │   │   │   │   │   ├── Button-In.anim
│   │   │   │   │   │   │   │   │   ├── Button-In.anim.meta
│   │   │   │   │   │   │   │   │   ├── Header-Idle.anim
│   │   │   │   │   │   │   │   │   ├── Header-Idle.anim.meta
│   │   │   │   │   │   │   │   │   ├── Header-In.anim
│   │   │   │   │   │   │   │   │   ├── Header-In.anim.meta
│   │   │   │   │   │   │   │   │   ├── Loading.anim
│   │   │   │   │   │   │   │   │   ├── Loading.anim.meta
│   │   │   │   │   │   │   │   │   ├── Loading.controller
│   │   │   │   │   │   │   │   │   ├── Loading.controller.meta
│   │   │   │   │   │   │   │   │   ├── Shadows-Idle.anim
│   │   │   │   │   │   │   │   │   ├── Shadows-Idle.anim.meta
│   │   │   │   │   │   │   │   │   ├── Solana-Idle.anim
│   │   │   │   │   │   │   │   │   ├── Solana-Idle.anim.meta
│   │   │   │   │   │   │   │   │   ├── Solana-In.anim
│   │   │   │   │   │   │   │   │   ├── Solana-In.anim.meta
│   │   │   │   │   │   │   │   │   ├── wallet_holder.controller
│   │   │   │   │   │   │   │   │   ├── wallet_holder.controller.meta
│   │   │   │   │   │   │   │   │   ├── WalletButton-In.anim
│   │   │   │   │   │   │   │   │   ├── WalletButton-In.anim.meta
│   │   │   │   │   │   │   │   │   ├── Window-In.anim
│   │   │   │   │   │   │   │   │   ├── Window-In.anim.meta
│   │   │   │   │   │   │   │   │   ├── Window-Out.anim
│   │   │   │   │   │   │   │   │   └── Window-Out.anim.meta
│   │   │   │   │   │   │   │   ├── Materials
│   │   │   │   │   │   │   │   │   ├── Glow.mat
│   │   │   │   │   │   │   │   │   └── Glow.mat.meta
│   │   │   │   │   │   │   │   ├── Plugins
│   │   │   │   │   │   │   │   │   ├── Android
│   │   │   │   │   │   │   │   │   │   ├── AndroidManifest.xml
│   │   │   │   │   │   │   │   │   │   └── AndroidManifest.xml.meta
│   │   │   │   │   │   │   │   │   ├── ZXing
│   │   │   │   │   │   │   │   │   │   ├── zxing.unity.dll
│   │   │   │   │   │   │   │   │   │   └── zxing.unity.dll.meta
│   │   │   │   │   │   │   │   │   ├── Android.meta
│   │   │   │   │   │   │   │   │   └── ZXing.meta
│   │   │   │   │   │   │   │   ├── Prefabs
│   │   │   │   │   │   │   │   │   ├── data
│   │   │   │   │   │   │   │   │   │   ├── Tokens.asset
│   │   │   │   │   │   │   │   │   │   └── Tokens.asset.meta
│   │   │   │   │   │   │   │   │   ├── ui
│   │   │   │   │   │   │   │   │   │   ├── Loading.prefab
│   │   │   │   │   │   │   │   │   │   ├── Loading.prefab.meta
│   │   │   │   │   │   │   │   │   │   ├── MainCanvas.prefab
│   │   │   │   │   │   │   │   │   │   ├── MainCanvas.prefab.meta
│   │   │   │   │   │   │   │   │   │   ├── token_item.prefab
│   │   │   │   │   │   │   │   │   │   ├── token_item.prefab.meta
│   │   │   │   │   │   │   │   │   │   ├── wallet_holder.prefab
│   │   │   │   │   │   │   │   │   │   ├── wallet_holder.prefab.meta
│   │   │   │   │   │   │   │   │   │   ├── wallet.prefab
│   │   │   │   │   │   │   │   │   │   └── wallet.prefab.meta
│   │   │   │   │   │   │   │   │   ├── data.meta
│   │   │   │   │   │   │   │   │   └── ui.meta
│   │   │   │   │   │   │   │   ├── Scenes
│   │   │   │   │   │   │   │   │   ├── wallet_scene.unity
│   │   │   │   │   │   │   │   │   └── wallet_scene.unity.meta
│   │   │   │   │   │   │   │   ├── Scripts
│   │   │   │   │   │   │   │   │   ├── example
│   │   │   │   │   │   │   │   │   │   ├── data
│   │   │   │   │   │   │   │   │   │   │   ├── KnownTokens.cs
│   │   │   │   │   │   │   │   │   │   │   ├── KnownTokens.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── MnemonicsModel.cs
│   │   │   │   │   │   │   │   │   │   │   └── MnemonicsModel.cs.meta
│   │   │   │   │   │   │   │   │   │   ├── screens
│   │   │   │   │   │   │   │   │   │   │   ├── GenerateAccountScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── GenerateAccountScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── LoginScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── LoginScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── NftMint.cs
│   │   │   │   │   │   │   │   │   │   │   ├── NftMint.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── ReceiveScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── ReceiveScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── ReGenerateAccountScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── ReGenerateAccountScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── SignScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── SignScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── SwapScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── SwapScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── SwapScreenAggregator.cs
│   │   │   │   │   │   │   │   │   │   │   ├── SwapScreenAggregator.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── Toast.cs
│   │   │   │   │   │   │   │   │   │   │   ├── Toast.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── TransferScreen.cs
│   │   │   │   │   │   │   │   │   │   │   ├── TransferScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── WalletScreen.cs
│   │   │   │   │   │   │   │   │   │   │   └── WalletScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   ├── simple_screen_manager
│   │   │   │   │   │   │   │   │   │   │   ├── interfaces
│   │   │   │   │   │   │   │   │   │   │   │   ├── ISimpleScreen.cs
│   │   │   │   │   │   │   │   │   │   │   │   └── ISimpleScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── utility
│   │   │   │   │   │   │   │   │   │   │   │   ├── Loading.cs
│   │   │   │   │   │   │   │   │   │   │   │   ├── Loading.cs.meta
│   │   │   │   │   │   │   │   │   │   │   │   ├── SimpleScreen.cs
│   │   │   │   │   │   │   │   │   │   │   │   ├── SimpleScreen.cs.meta
│   │   │   │   │   │   │   │   │   │   │   │   ├── SimpleScreenManager.cs
│   │   │   │   │   │   │   │   │   │   │   │   ├── SimpleScreenManager.cs.meta
│   │   │   │   │   │   │   │   │   │   │   │   ├── TokenItem.cs
│   │   │   │   │   │   │   │   │   │   │   │   └── TokenItem.cs.meta
│   │   │   │   │   │   │   │   │   │   │   ├── interfaces.meta
│   │   │   │   │   │   │   │   │   │   │   ├── utility.meta
│   │   │   │   │   │   │   │   │   │   │   ├── WalletHolder.cs
│   │   │   │   │   │   │   │   │   │   │   └── WalletHolder.cs.meta
│   │   │   │   │   │   │   │   │   │   ├── data.meta
│   │   │   │   │   │   │   │   │   │   ├── DropdownClusterSelector.cs
│   │   │   │   │   │   │   │   │   │   ├── DropdownClusterSelector.cs.meta
│   │   │   │   │   │   │   │   │   │   ├── screens.meta
│   │   │   │   │   │   │   │   │   │   └── simple_screen_manager.meta
│   │   │   │   │   │   │   │   │   ├── UI
│   │   │   │   │   │   │   │   │   │   ├── AnimationController.cs
│   │   │   │   │   │   │   │   │   │   ├── AnimationController.cs.meta
│   │   │   │   │   │   │   │   │   │   ├── GameController.cs
│   │   │   │   │   │   │   │   │   │   └── GameController.cs.meta
│   │   │   │   │   │   │   │   │   ├── utility
│   │   │   │   │   │   │   │   │   │   ├── QRGenerator.cs
│   │   │   │   │   │   │   │   │   │   └── QRGenerator.cs.meta
│   │   │   │   │   │   │   │   │   ├── example.meta
│   │   │   │   │   │   │   │   │   ├── UI.meta
│   │   │   │   │   │   │   │   │   └── utility.meta
│   │   │   │   │   │   │   │   ├── Textures
│   │   │   │   │   │   │   │   │   ├── Buttons
│   │   │   │   │   │   │   │   │   │   ├── Icons
│   │   │   │   │   │   │   │   │   │   │   ├── camera.png
│   │   │   │   │   │   │   │   │   │   │   ├── camera.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── exit.png
│   │   │   │   │   │   │   │   │   │   │   ├── exit.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── garage.png
│   │   │   │   │   │   │   │   │   │   │   ├── garage.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── home.png
│   │   │   │   │   │   │   │   │   │   │   ├── home.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── left.png
│   │   │   │   │   │   │   │   │   │   │   ├── left.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── menu.png
│   │   │   │   │   │   │   │   │   │   │   ├── menu.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── pause.png
│   │   │   │   │   │   │   │   │   │   │   ├── pause.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── play.png
│   │   │   │   │   │   │   │   │   │   │   ├── play.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── remove-ads.png
│   │   │   │   │   │   │   │   │   │   │   ├── remove-ads.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── reset.png
│   │   │   │   │   │   │   │   │   │   │   ├── reset.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── right.png
│   │   │   │   │   │   │   │   │   │   │   ├── right.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── settings.png
│   │   │   │   │   │   │   │   │   │   │   ├── settings.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── sounds-off.png
│   │   │   │   │   │   │   │   │   │   │   ├── sounds-off.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── sounds-on.png
│   │   │   │   │   │   │   │   │   │   │   ├── sounds-on.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── vibration-off.png
│   │   │   │   │   │   │   │   │   │   │   ├── vibration-off.png.meta
│   │   │   │   │   │   │   │   │   │   │   ├── vibration-on.png
│   │   │   │   │   │   │   │   │   │   │   └── vibration-on.png.meta
│   │   │   │   │   │   │   │   │   │   ├── btn-blue.png
│   │   │   │   │   │   │   │   │   │   ├── btn-blue.png.meta
│   │   │   │   │   │   │   │   │   │   ├── btn-gray.png
│   │   │   │   │   │   │   │   │   │   ├── btn-gray.png.meta
│   │   │   │   │   │   │   │   │   │   ├── btn-l-yellow.png
│   │   │   │   │   │   │   │   │   │   ├── btn-l-yellow.png.meta
│   │   │   │   │   │   │   │   │   │   ├── btn-xl-yellow.png
│   │   │   │   │   │   │   │   │   │   ├── btn-xl-yellow.png.meta
│   │   │   │   │   │   │   │   │   │   ├── btn-yellow.png
│   │   │   │   │   │   │   │   │   │   ├── btn-yellow.png.meta
│   │   │   │   │   │   │   │   │   │   └── Icons.meta
│   │   │   │   │   │   │   │   │   ├── Fonts
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular Score.asset
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular Score.asset.meta
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular SDF.asset
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular SDF.asset.meta
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular Wallet.asset
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular Wallet.asset.meta
│   │   │   │   │   │   │   │   │   │   ├── MouseMemoirs-Regular.ttf
│   │   │   │   │   │   │   │   │   │   └── MouseMemoirs-Regular.ttf.meta
│   │   │   │   │   │   │   │   │   ├── background.png
│   │   │   │   │   │   │   │   │   ├── background.png.meta
│   │   │   │   │   │   │   │   │   ├── backpack.png
│   │   │   │   │   │   │   │   │   ├── backpack.png.meta
│   │   │   │   │   │   │   │   │   ├── Buttons.meta
│   │   │   │   │   │   │   │   │   ├── Circle.mat
│   │   │   │   │   │   │   │   │   ├── Circle.mat.meta
│   │   │   │   │   │   │   │   │   ├── circle.png
│   │   │   │   │   │   │   │   │   ├── circle.png.meta
│   │   │   │   │   │   │   │   │   ├── close.png
│   │   │   │   │   │   │   │   │   ├── close.png.meta
│   │   │   │   │   │   │   │   │   ├── coin.png
│   │   │   │   │   │   │   │   │   ├── coin.png.meta
│   │   │   │   │   │   │   │   │   ├── empty.png
│   │   │   │   │   │   │   │   │   ├── empty.png.meta
│   │   │   │   │   │   │   │   │   ├── Fonts.meta
│   │   │   │   │   │   │   │   │   ├── github-logo-white.png
│   │   │   │   │   │   │   │   │   ├── github-logo-white.png.meta
│   │   │   │   │   │   │   │   │   ├── github-logo.png
│   │   │   │   │   │   │   │   │   ├── github-logo.png.meta
│   │   │   │   │   │   │   │   │   ├── Glow.mat
│   │   │   │   │   │   │   │   │   ├── Glow.mat.meta
│   │   │   │   │   │   │   │   │   ├── Glow.png
│   │   │   │   │   │   │   │   │   ├── Glow.png.meta
│   │   │   │   │   │   │   │   │   ├── loading.png
│   │   │   │   │   │   │   │   │   ├── loading.png.meta
│   │   │   │   │   │   │   │   │   ├── Logo-google-icon-PNG.png
│   │   │   │   │   │   │   │   │   ├── Logo-google-icon-PNG.png.meta
│   │   │   │   │   │   │   │   │   ├── magicblock-logo.png
│   │   │   │   │   │   │   │   │   ├── magicblock-logo.png.meta
│   │   │   │   │   │   │   │   │   ├── phantom.png
│   │   │   │   │   │   │   │   │   ├── phantom.png.meta
│   │   │   │   │   │   │   │   │   ├── reload.png
│   │   │   │   │   │   │   │   │   ├── reload.png.meta
│   │   │   │   │   │   │   │   │   ├── send.png
│   │   │   │   │   │   │   │   │   ├── send.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-1.png
│   │   │   │   │   │   │   │   │   ├── shadow-1.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-2.png
│   │   │   │   │   │   │   │   │   ├── shadow-2.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-3.png
│   │   │   │   │   │   │   │   │   ├── shadow-3.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-4.png
│   │   │   │   │   │   │   │   │   ├── shadow-4.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-5.png
│   │   │   │   │   │   │   │   │   ├── shadow-5.png.meta
│   │   │   │   │   │   │   │   │   ├── shadow-6.png
│   │   │   │   │   │   │   │   │   ├── shadow-6.png.meta
│   │   │   │   │   │   │   │   │   ├── sign.png
│   │   │   │   │   │   │   │   │   ├── sign.png.meta
│   │   │   │   │   │   │   │   │   ├── solana.png
│   │   │   │   │   │   │   │   │   ├── solana.png.meta
│   │   │   │   │   │   │   │   │   ├── solanaLogoMark.png
│   │   │   │   │   │   │   │   │   ├── solanaLogoMark.png.meta
│   │   │   │   │   │   │   │   │   ├── swap.png
│   │   │   │   │   │   │   │   │   ├── swap.png.meta
│   │   │   │   │   │   │   │   │   ├── twitter.png
│   │   │   │   │   │   │   │   │   ├── twitter.png.meta
│   │   │   │   │   │   │   │   │   ├── wallet.png
│   │   │   │   │   │   │   │   │   ├── wallet.png.meta
│   │   │   │   │   │   │   │   │   ├── window.png
│   │   │   │   │   │   │   │   │   └── window.png.meta
│   │   │   │   │   │   │   │   ├── Animations.meta
│   │   │   │   │   │   │   │   ├── Materials.meta
│   │   │   │   │   │   │   │   ├── Plugins.meta
│   │   │   │   │   │   │   │   ├── Prefabs.meta
│   │   │   │   │   │   │   │   ├── Scenes.meta
│   │   │   │   │   │   │   │   ├── Scripts.meta
│   │   │   │   │   │   │   │   └── Textures.meta
│   │   │   │   │   │   │   └── Solana Wallet.meta
│   │   │   │   │   │   └── Sample Wallet.meta
│   │   │   │   │   └── 1.2.10.meta
│   │   │   │   └── Solana SDK.meta
│   │   │   ├── Scenes
│   │   │   │   ├── Levels
│   │   │   │   │   ├── InDoors
│   │   │   │   │   │   ├── Level_Cave.unity
│   │   │   │   │   │   ├── Level_Cave.unity.meta
│   │   │   │   │   │   ├── Level_CaveSettings.lighting
│   │   │   │   │   │   ├── Level_CaveSettings.lighting.meta
│   │   │   │   │   │   ├── Level_FarmHouse.unity
│   │   │   │   │   │   ├── Level_FarmHouse.unity.meta
│   │   │   │   │   │   ├── Level_FarmHouseSettings.lighting
│   │   │   │   │   │   └── Level_FarmHouseSettings.lighting.meta
│   │   │   │   │   ├── OutDoors
│   │   │   │   │   │   ├── Level_Farm.unity
│   │   │   │   │   │   └── Level_Farm.unity.meta
│   │   │   │   │   ├── InDoors.meta
│   │   │   │   │   └── OutDoors.meta
│   │   │   │   ├── Core.unity
│   │   │   │   ├── Core.unity.meta
│   │   │   │   ├── Levels.meta
│   │   │   │   ├── StartMenu.unity
│   │   │   │   ├── StartMenu.unity.meta
│   │   │   │   ├── StartMenuSettings.lighting
│   │   │   │   └── StartMenuSettings.lighting.meta
│   │   │   ├── ScriptableObjects
│   │   │   │   ├── Actions
│   │   │   │   │   ├── Action Display Item Storage Window.asset
│   │   │   │   │   ├── Action Display Item Storage Window.asset.meta
│   │   │   │   │   ├── Action Fade Screen.asset
│   │   │   │   │   ├── Action Fade Screen.asset.meta
│   │   │   │   │   ├── Action Load Game.asset
│   │   │   │   │   ├── Action Load Game.asset.meta
│   │   │   │   │   ├── Action New Game.asset
│   │   │   │   │   ├── Action New Game.asset.meta
│   │   │   │   │   ├── Action Open Scene.asset
│   │   │   │   │   ├── Action Open Scene.asset.meta
│   │   │   │   │   ├── Action Open URL.asset
│   │   │   │   │   ├── Action Open URL.asset.meta
│   │   │   │   │   ├── Action Pauze Game.asset
│   │   │   │   │   ├── Action Pauze Game.asset.meta
│   │   │   │   │   ├── Action Play Sound.asset
│   │   │   │   │   ├── Action Play Sound.asset.meta
│   │   │   │   │   ├── Action Set Cursor Sprite.asset
│   │   │   │   │   ├── Action Set Cursor Sprite.asset.meta
│   │   │   │   │   ├── Action Set To Temporary Save Slot.asset
│   │   │   │   │   ├── Action Set To Temporary Save Slot.asset.meta
│   │   │   │   │   ├── Action Shop Open.asset
│   │   │   │   │   ├── Action Shop Open.asset.meta
│   │   │   │   │   ├── Action Warp Player.asset
│   │   │   │   │   └── Action Warp Player.asset.meta
│   │   │   │   ├── Character
│   │   │   │   │   ├── Arms
│   │   │   │   │   │   ├── Arms_0.asset
│   │   │   │   │   │   └── Arms_0.asset.meta
│   │   │   │   │   ├── Base
│   │   │   │   │   │   ├── Base_Arms.asset
│   │   │   │   │   │   ├── Base_Arms.asset.meta
│   │   │   │   │   │   ├── Base_Chest.asset
│   │   │   │   │   │   ├── Base_Chest.asset.meta
│   │   │   │   │   │   ├── Base_Head.asset
│   │   │   │   │   │   ├── Base_Head.asset.meta
│   │   │   │   │   │   ├── Base_Legs.asset
│   │   │   │   │   │   ├── Base_Legs.asset.meta
│   │   │   │   │   │   ├── Body_Arms0.asset
│   │   │   │   │   │   ├── Body_Arms0.asset.meta
│   │   │   │   │   │   ├── Body_Chest0.asset
│   │   │   │   │   │   ├── Body_Chest0.asset.meta
│   │   │   │   │   │   ├── Body_Head0.asset
│   │   │   │   │   │   ├── Body_Head0.asset.meta
│   │   │   │   │   │   ├── Body_Legs0.asset
│   │   │   │   │   │   └── Body_Legs0.asset.meta
│   │   │   │   │   ├── Chest
│   │   │   │   │   │   ├── Chest_0.asset
│   │   │   │   │   │   └── Chest_0.asset.meta
│   │   │   │   │   ├── Eyes
│   │   │   │   │   │   ├── Eyes 1.asset
│   │   │   │   │   │   ├── Eyes 1.asset.meta
│   │   │   │   │   │   ├── Eyes 2.asset
│   │   │   │   │   │   ├── Eyes 2.asset.meta
│   │   │   │   │   │   ├── Eyes 3.asset
│   │   │   │   │   │   ├── Eyes 3.asset.meta
│   │   │   │   │   │   ├── Eyes 4.asset
│   │   │   │   │   │   ├── Eyes 4.asset.meta
│   │   │   │   │   │   ├── Eyes 5.asset
│   │   │   │   │   │   ├── Eyes 5.asset.meta
│   │   │   │   │   │   ├── Eyes.asset
│   │   │   │   │   │   └── Eyes.asset.meta
│   │   │   │   │   ├── Generator
│   │   │   │   │   │   ├── Character Part Generator.asset
│   │   │   │   │   │   ├── Character Part Generator.asset.meta
│   │   │   │   │   │   ├── SliceConfiguration_Eyes.asset
│   │   │   │   │   │   ├── SliceConfiguration_Eyes.asset.meta
│   │   │   │   │   │   ├── SliceConfiguration_FullBody.asset
│   │   │   │   │   │   ├── SliceConfiguration_FullBody.asset.meta
│   │   │   │   │   │   ├── SliceConfiguration_Hair.asset
│   │   │   │   │   │   ├── SliceConfiguration_Hair.asset.meta
│   │   │   │   │   │   ├── SliceConfiguration_Pants.asset
│   │   │   │   │   │   ├── SliceConfiguration_Pants.asset.meta
│   │   │   │   │   │   ├── SliceConfiguration_Shirt.asset
│   │   │   │   │   │   └── SliceConfiguration_Shirt.asset.meta
│   │   │   │   │   ├── Hair
│   │   │   │   │   │   ├── Hair0_Bald.asset
│   │   │   │   │   │   ├── Hair0_Bald.asset.meta
│   │   │   │   │   │   ├── Hair1_Regular.asset
│   │   │   │   │   │   ├── Hair1_Regular.asset.meta
│   │   │   │   │   │   ├── Hair2_Big.asset
│   │   │   │   │   │   └── Hair2_Big.asset.meta
│   │   │   │   │   ├── Legs
│   │   │   │   │   │   ├── Legs_0.asset
│   │   │   │   │   │   ├── Legs_0.asset.meta
│   │   │   │   │   │   ├── Legs_1.asset
│   │   │   │   │   │   └── Legs_1.asset.meta
│   │   │   │   │   ├── Arms.meta
│   │   │   │   │   ├── Base.meta
│   │   │   │   │   ├── Chest.meta
│   │   │   │   │   ├── Eyes.meta
│   │   │   │   │   ├── Generator.meta
│   │   │   │   │   ├── Hair.meta
│   │   │   │   │   └── Legs.meta
│   │   │   │   ├── Events
│   │   │   │   │   ├── Input
│   │   │   │   │   │   ├── OnAcceptKey.asset
│   │   │   │   │   │   ├── OnAcceptKey.asset.meta
│   │   │   │   │   │   ├── OnLeftMouseClick.asset
│   │   │   │   │   │   ├── OnLeftMouseClick.asset.meta
│   │   │   │   │   │   ├── OnMouseMovement.asset
│   │   │   │   │   │   ├── OnMouseMovement.asset.meta
│   │   │   │   │   │   ├── OnMouseScroll.asset
│   │   │   │   │   │   ├── OnMouseScroll.asset.meta
│   │   │   │   │   │   ├── OnMovement.asset
│   │   │   │   │   │   ├── OnMovement.asset.meta
│   │   │   │   │   │   ├── OnNumericKey.asset
│   │   │   │   │   │   ├── OnNumericKey.asset.meta
│   │   │   │   │   │   ├── OnPauzeKey.asset
│   │   │   │   │   │   ├── OnPauzeKey.asset.meta
│   │   │   │   │   │   ├── OnRightMouseClick.asset
│   │   │   │   │   │   └── OnRightMouseClick.asset.meta
│   │   │   │   │   ├── Interactions
│   │   │   │   │   │   ├── On Mouse Object Interaction.asset
│   │   │   │   │   │   └── On Mouse Object Interaction.asset.meta
│   │   │   │   │   ├── New Game
│   │   │   │   │   │   ├── OnNewGameStarted.asset
│   │   │   │   │   │   ├── OnNewGameStarted.asset.meta
│   │   │   │   │   │   ├── OnSetCharacterName.asset
│   │   │   │   │   │   ├── OnSetCharacterName.asset.meta
│   │   │   │   │   │   ├── OnSetFarmName.asset
│   │   │   │   │   │   └── OnSetFarmName.asset.meta
│   │   │   │   │   ├── Pauzing
│   │   │   │   │   │   ├── Display Pauze Menu.asset
│   │   │   │   │   │   ├── Display Pauze Menu.asset.meta
│   │   │   │   │   │   ├── Request Pauze Menu.asset
│   │   │   │   │   │   └── Request Pauze Menu.asset.meta
│   │   │   │   │   ├── Saving
│   │   │   │   │   │   ├── OnGameLoaded.asset
│   │   │   │   │   │   ├── OnGameLoaded.asset.meta
│   │   │   │   │   │   ├── OnGameSaved.asset
│   │   │   │   │   │   └── OnGameSaved.asset.meta
│   │   │   │   │   ├── Sound
│   │   │   │   │   │   ├── Fx Muted.asset
│   │   │   │   │   │   ├── Fx Muted.asset.meta
│   │   │   │   │   │   ├── Fx Volume.asset
│   │   │   │   │   │   ├── Fx Volume.asset.meta
│   │   │   │   │   │   ├── Music Muted.asset
│   │   │   │   │   │   ├── Music Muted.asset.meta
│   │   │   │   │   │   ├── Music Volume.asset
│   │   │   │   │   │   └── Music Volume.asset.meta
│   │   │   │   │   ├── Warping
│   │   │   │   │   │   ├── OnChangeScene.asset
│   │   │   │   │   │   ├── OnChangeScene.asset.meta
│   │   │   │   │   │   ├── OnWarpEnd.asset
│   │   │   │   │   │   ├── OnWarpEnd.asset.meta
│   │   │   │   │   │   ├── OnWarpRequest.asset
│   │   │   │   │   │   ├── OnWarpRequest.asset.meta
│   │   │   │   │   │   ├── OnWarpStart.asset
│   │   │   │   │   │   └── OnWarpStart.asset.meta
│   │   │   │   │   ├── Weather
│   │   │   │   │   │   ├── OnWeatherChanged.asset
│   │   │   │   │   │   └── OnWeatherChanged.asset.meta
│   │   │   │   │   ├── Input.meta
│   │   │   │   │   ├── Interactions.meta
│   │   │   │   │   ├── New Game.meta
│   │   │   │   │   ├── On Time Day.asset
│   │   │   │   │   ├── On Time Day.asset.meta
│   │   │   │   │   ├── On Time Tick.asset
│   │   │   │   │   ├── On Time Tick.asset.meta
│   │   │   │   │   ├── OnPauzeGame.asset
│   │   │   │   │   ├── OnPauzeGame.asset.meta
│   │   │   │   │   ├── Pauzing.meta
│   │   │   │   │   ├── Saving.meta
│   │   │   │   │   ├── Sound.meta
│   │   │   │   │   ├── ToggleMapEvent.asset
│   │   │   │   │   ├── ToggleMapEvent.asset.meta
│   │   │   │   │   ├── Warping.meta
│   │   │   │   │   └── Weather.meta
│   │   │   │   ├── Item Actions
│   │   │   │   │   ├── Action_StarterPackOpen.asset
│   │   │   │   │   ├── Action_StarterPackOpen.asset.meta
│   │   │   │   │   ├── Item Action Axe Attack.asset
│   │   │   │   │   ├── Item Action Axe Attack.asset.meta
│   │   │   │   │   ├── Item Action Dighole.asset
│   │   │   │   │   ├── Item Action Dighole.asset.meta
│   │   │   │   │   ├── Item Action Pickaxe Attack.asset
│   │   │   │   │   ├── Item Action Pickaxe Attack.asset.meta
│   │   │   │   │   ├── Item Action Plant Seed Cucumber.asset
│   │   │   │   │   ├── Item Action Plant Seed Cucumber.asset.meta
│   │   │   │   │   ├── Item Action Plant Seed Kale.asset
│   │   │   │   │   ├── Item Action Plant Seed Kale.asset.meta
│   │   │   │   │   ├── Item Action Plant Seed Onion.asset
│   │   │   │   │   ├── Item Action Plant Seed Onion.asset.meta
│   │   │   │   │   ├── Item Action Plant Seed Peanut.asset
│   │   │   │   │   ├── Item Action Plant Seed Peanut.asset.meta
│   │   │   │   │   ├── Item Action Plant Seed Strawberry.asset
│   │   │   │   │   ├── Item Action Plant Seed Strawberry.asset.meta
│   │   │   │   │   ├── Item Action Scythe Attack.asset
│   │   │   │   │   ├── Item Action Scythe Attack.asset.meta
│   │   │   │   │   ├── Item Action Sword Attack.asset
│   │   │   │   │   ├── Item Action Sword Attack.asset.meta
│   │   │   │   │   ├── Item Action WaterCan.asset
│   │   │   │   │   ├── Item Action WaterCan.asset.meta
│   │   │   │   │   ├── ShopConfig.asset
│   │   │   │   │   └── ShopConfig.asset.meta
│   │   │   │   ├── Items
│   │   │   │   │   ├── Crops
│   │   │   │   │   │   ├── Item_Cucumber.asset
│   │   │   │   │   │   ├── Item_Cucumber.asset.meta
│   │   │   │   │   │   ├── Item_Kale.asset
│   │   │   │   │   │   ├── Item_Kale.asset.meta
│   │   │   │   │   │   ├── Item_Onion.asset
│   │   │   │   │   │   ├── Item_Onion.asset.meta
│   │   │   │   │   │   ├── Item_Peanut.asset
│   │   │   │   │   │   ├── Item_Peanut.asset.meta
│   │   │   │   │   │   ├── Item_Seed_Cucumber.asset
│   │   │   │   │   │   ├── Item_Seed_Cucumber.asset.meta
│   │   │   │   │   │   ├── Item_Seed_Kale.asset
│   │   │   │   │   │   ├── Item_Seed_Kale.asset.meta
│   │   │   │   │   │   ├── Item_Seed_Onion.asset
│   │   │   │   │   │   ├── Item_Seed_Onion.asset.meta
│   │   │   │   │   │   ├── Item_Seed_Peanut.asset
│   │   │   │   │   │   ├── Item_Seed_Peanut.asset.meta
│   │   │   │   │   │   ├── Item_Seed_Starberry.asset
│   │   │   │   │   │   ├── Item_Seed_Starberry.asset.meta
│   │   │   │   │   │   ├── Item_Starter_Box.asset
│   │   │   │   │   │   ├── Item_Starter_Box.asset.meta
│   │   │   │   │   │   ├── Item_Strawberry.asset
│   │   │   │   │   │   └── Item_Strawberry.asset.meta
│   │   │   │   │   ├── Metada Registry
│   │   │   │   │   │   ├── NFT Box V1 Metadata.asset
│   │   │   │   │   │   └── NFT Box V1 Metadata.asset.meta
│   │   │   │   │   ├── Misc
│   │   │   │   │   │   ├── Item_Misc_Leafs.asset
│   │   │   │   │   │   ├── Item_Misc_Leafs.asset.meta
│   │   │   │   │   │   ├── Item_Misc_Stone.asset
│   │   │   │   │   │   ├── Item_Misc_Stone.asset.meta
│   │   │   │   │   │   ├── Item_Misc_Wood.asset
│   │   │   │   │   │   └── Item_Misc_Wood.asset.meta
│   │   │   │   │   ├── Tools
│   │   │   │   │   │   ├── Item_Gold.asset
│   │   │   │   │   │   ├── Item_Gold.asset.meta
│   │   │   │   │   │   ├── Item_Tool_Axe.asset
│   │   │   │   │   │   ├── Item_Tool_Axe.asset.meta
│   │   │   │   │   │   ├── Item_Tool_Pickaxe.asset
│   │   │   │   │   │   ├── Item_Tool_Pickaxe.asset.meta
│   │   │   │   │   │   ├── Item_Tool_Scythe.asset
│   │   │   │   │   │   ├── Item_Tool_Scythe.asset.meta
│   │   │   │   │   │   ├── Item_Tool_Shovel.asset
│   │   │   │   │   │   ├── Item_Tool_Shovel.asset.meta
│   │   │   │   │   │   ├── Item_Tool_Sword.asset
│   │   │   │   │   │   ├── Item_Tool_Sword.asset.meta
│   │   │   │   │   │   ├── Item_Tool_WaterCan.asset
│   │   │   │   │   │   └── Item_Tool_WaterCan.asset.meta
│   │   │   │   │   ├── Crops.meta
│   │   │   │   │   ├── Metada Registry.meta
│   │   │   │   │   ├── Misc.meta
│   │   │   │   │   └── Tools.meta
│   │   │   │   ├── Locations
│   │   │   │   │   ├── Farm_House_Indoor.asset
│   │   │   │   │   ├── Farm_House_Indoor.asset.meta
│   │   │   │   │   ├── Farm_House_Outdoor.asset
│   │   │   │   │   ├── Farm_House_Outdoor.asset.meta
│   │   │   │   │   ├── Level_Cave_Exit.asset
│   │   │   │   │   ├── Level_Cave_Exit.asset.meta
│   │   │   │   │   ├── Level_Farm_CaveEntrance.asset
│   │   │   │   │   ├── Level_Farm_CaveEntrance.asset.meta
│   │   │   │   │   ├── Level_FarmHouse_Bed.asset
│   │   │   │   │   └── Level_FarmHouse_Bed.asset.meta
│   │   │   │   ├── Referencing
│   │   │   │   │   ├── Saveable Prefabs
│   │   │   │   │   │   ├── Prefab Crop Cucumber.asset
│   │   │   │   │   │   ├── Prefab Crop Cucumber.asset.meta
│   │   │   │   │   │   ├── Prefab Crop Kale.asset
│   │   │   │   │   │   ├── Prefab Crop Kale.asset.meta
│   │   │   │   │   │   ├── Prefab Crop Onion.asset
│   │   │   │   │   │   ├── Prefab Crop Onion.asset.meta
│   │   │   │   │   │   ├── Prefab Crop Peanut.asset
│   │   │   │   │   │   ├── Prefab Crop Peanut.asset.meta
│   │   │   │   │   │   ├── Prefab Crop Strawberry.asset
│   │   │   │   │   │   ├── Prefab Crop Strawberry.asset.meta
│   │   │   │   │   │   ├── Prefab Lootable Item.asset
│   │   │   │   │   │   ├── Prefab Lootable Item.asset.meta
│   │   │   │   │   │   ├── Prefab Plant.asset
│   │   │   │   │   │   ├── Prefab Plant.asset.meta
│   │   │   │   │   │   ├── Prefab Rock.asset
│   │   │   │   │   │   ├── Prefab Rock.asset.meta
│   │   │   │   │   │   ├── Prefab Tree.asset
│   │   │   │   │   │   └── Prefab Tree.asset.meta
│   │   │   │   │   ├── Scriptable Pools
│   │   │   │   │   │   ├── Damage Volume Pool.asset
│   │   │   │   │   │   ├── Damage Volume Pool.asset.meta
│   │   │   │   │   │   ├── Lootable Pool.asset
│   │   │   │   │   │   ├── Lootable Pool.asset.meta
│   │   │   │   │   │   ├── Scriptable Pool Container.asset
│   │   │   │   │   │   ├── Scriptable Pool Container.asset.meta
│   │   │   │   │   │   ├── Weather Rain Drop Pool.asset
│   │   │   │   │   │   └── Weather Rain Drop Pool.asset.meta
│   │   │   │   │   ├── Scriptable References
│   │   │   │   │   │   ├── Camera Confinement.asset
│   │   │   │   │   │   ├── Camera Confinement.asset.meta
│   │   │   │   │   │   ├── Camera.asset
│   │   │   │   │   │   ├── Camera.asset.meta
│   │   │   │   │   │   ├── Confirmation Window.asset
│   │   │   │   │   │   ├── Confirmation Window.asset.meta
│   │   │   │   │   │   ├── Darken Screen.asset
│   │   │   │   │   │   ├── Darken Screen.asset.meta
│   │   │   │   │   │   ├── Grid Manager.asset
│   │   │   │   │   │   ├── Grid Manager.asset.meta
│   │   │   │   │   │   ├── Icon Layer.asset
│   │   │   │   │   │   ├── Icon Layer.asset.meta
│   │   │   │   │   │   ├── Item Storage Window.asset
│   │   │   │   │   │   ├── Item Storage Window.asset.meta
│   │   │   │   │   │   ├── Player.asset
│   │   │   │   │   │   ├── Player.asset.meta
│   │   │   │   │   │   ├── Saveable Prefab Manager.asset
│   │   │   │   │   │   └── Saveable Prefab Manager.asset.meta
│   │   │   │   │   ├── Saveable Prefabs.meta
│   │   │   │   │   ├── Scriptable Pools.meta
│   │   │   │   │   └── Scriptable References.meta
│   │   │   │   ├── Sounds
│   │   │   │   │   ├── Sound Collection Footsteps.asset
│   │   │   │   │   ├── Sound Collection Footsteps.asset.meta
│   │   │   │   │   ├── Sound Collection Hit Sounds.asset
│   │   │   │   │   ├── Sound Collection Hit Sounds.asset.meta
│   │   │   │   │   ├── Sound Collection Tool Ground.asset
│   │   │   │   │   ├── Sound Collection Tool Ground.asset.meta
│   │   │   │   │   ├── Sound Collection UI Clicks.asset
│   │   │   │   │   ├── Sound Collection UI Clicks.asset.meta
│   │   │   │   │   ├── Sound Collection UI Rollovers.asset
│   │   │   │   │   └── Sound Collection UI Rollovers.asset.meta
│   │   │   │   ├── Start Inventories
│   │   │   │   │   ├── StartingItems_Player.asset
│   │   │   │   │   └── StartingItems_Player.asset.meta
│   │   │   │   ├── Tiles
│   │   │   │   │   ├── Ground_Auto_DirtHole.asset
│   │   │   │   │   ├── Ground_Auto_DirtHole.asset.meta
│   │   │   │   │   ├── Ground_Auto_DirtHoleWet.asset
│   │   │   │   │   └── Ground_Auto_DirtHoleWet.asset.meta
│   │   │   │   ├── Variables
│   │   │   │   │   ├── New Game Configuration
│   │   │   │   │   │   ├── Character Name.asset
│   │   │   │   │   │   ├── Character Name.asset.meta
│   │   │   │   │   │   ├── Farm Name.asset
│   │   │   │   │   │   ├── Farm Name.asset.meta
│   │   │   │   │   │   ├── Starting Arms.asset
│   │   │   │   │   │   ├── Starting Arms.asset.meta
│   │   │   │   │   │   ├── Starting Chest.asset
│   │   │   │   │   │   ├── Starting Chest.asset.meta
│   │   │   │   │   │   ├── Starting Eyes.asset
│   │   │   │   │   │   ├── Starting Eyes.asset.meta
│   │   │   │   │   │   ├── Starting Hair.asset
│   │   │   │   │   │   ├── Starting Hair.asset.meta
│   │   │   │   │   │   ├── Starting Legs.asset
│   │   │   │   │   │   └── Starting Legs.asset.meta
│   │   │   │   │   ├── Saveable Identification
│   │   │   │   │   │   ├── Player Save Identifier.asset
│   │   │   │   │   │   ├── Player Save Identifier.asset.meta
│   │   │   │   │   │   ├── System Save Identifier.asset
│   │   │   │   │   │   └── System Save Identifier.asset.meta
│   │   │   │   │   ├── Scenes
│   │   │   │   │   │   ├── Scene Core.asset
│   │   │   │   │   │   ├── Scene Core.asset.meta
│   │   │   │   │   │   ├── Scene Main menu.asset
│   │   │   │   │   │   ├── Scene Main menu.asset.meta
│   │   │   │   │   │   ├── Scene New Game.asset
│   │   │   │   │   │   └── Scene New Game.asset.meta
│   │   │   │   │   ├── Time
│   │   │   │   │   │   ├── New Day Time Offset.asset
│   │   │   │   │   │   └── New Day Time Offset.asset.meta
│   │   │   │   │   ├── Link Asset Store.asset
│   │   │   │   │   ├── Link Asset Store.asset.meta
│   │   │   │   │   ├── New Game Configuration.meta
│   │   │   │   │   ├── Save Slot Index.asset
│   │   │   │   │   ├── Save Slot Index.asset.meta
│   │   │   │   │   ├── Saveable Identification.meta
│   │   │   │   │   ├── Scenes.meta
│   │   │   │   │   └── Time.meta
│   │   │   │   ├── Actions.meta
│   │   │   │   ├── Audio Mixer.mixer
│   │   │   │   ├── Audio Mixer.mixer.meta
│   │   │   │   ├── Character.meta
│   │   │   │   ├── Events.meta
│   │   │   │   ├── Item Actions.meta
│   │   │   │   ├── Items.meta
│   │   │   │   ├── Locations.meta
│   │   │   │   ├── Referencing.meta
│   │   │   │   ├── Sounds.meta
│   │   │   │   ├── Start Inventories.meta
│   │   │   │   ├── Tiles.meta
│   │   │   │   └── Variables.meta
│   │   │   ├── Scripts
│   │   │   │   ├── Action
│   │   │   │   │   ├── Actions
│   │   │   │   │   │   ├── ActionDisplayItemStorageWindow.cs
│   │   │   │   │   │   ├── ActionDisplayItemStorageWindow.cs.meta
│   │   │   │   │   │   ├── ActionFadeScreen.cs
│   │   │   │   │   │   ├── ActionFadeScreen.cs.meta
│   │   │   │   │   │   ├── ActionLoadGame.cs
│   │   │   │   │   │   ├── ActionLoadGame.cs.meta
│   │   │   │   │   │   ├── ActionNewGame.cs
│   │   │   │   │   │   ├── ActionNewGame.cs.meta
│   │   │   │   │   │   ├── ActionOpenScene.cs
│   │   │   │   │   │   ├── ActionOpenScene.cs.meta
│   │   │   │   │   │   ├── ActionOpenURL.cs
│   │   │   │   │   │   ├── ActionOpenURL.cs.meta
│   │   │   │   │   │   ├── ActionPauzeGame.cs
│   │   │   │   │   │   ├── ActionPauzeGame.cs.meta
│   │   │   │   │   │   ├── ActionPlaySound.cs
│   │   │   │   │   │   ├── ActionPlaySound.cs.meta
│   │   │   │   │   │   ├── ActionSetCursorSprite.cs
│   │   │   │   │   │   ├── ActionSetCursorSprite.cs.meta
│   │   │   │   │   │   ├── ActionSetToTemporarySaveSlot.cs
│   │   │   │   │   │   ├── ActionSetToTemporarySaveSlot.cs.meta
│   │   │   │   │   │   ├── ActionShopOpen.cs
│   │   │   │   │   │   ├── ActionShopOpen.cs.meta
│   │   │   │   │   │   ├── ActionWarpPlayer.cs
│   │   │   │   │   │   └── ActionWarpPlayer.cs.meta
│   │   │   │   │   └── Actions.meta
│   │   │   │   ├── Camera
│   │   │   │   │   ├── ConfinementAutoAssigner.cs
│   │   │   │   │   ├── ConfinementAutoAssigner.cs.meta
│   │   │   │   │   ├── ForceCameraPositionOnWarp.cs
│   │   │   │   │   ├── ForceCameraPositionOnWarp.cs.meta
│   │   │   │   │   ├── PixelPerfectCamera.cs
│   │   │   │   │   └── PixelPerfectCamera.cs.meta
│   │   │   │   ├── Combat
│   │   │   │   │   ├── Data
│   │   │   │   │   │   ├── DamageInfo.cs
│   │   │   │   │   │   ├── DamageInfo.cs.meta
│   │   │   │   │   │   ├── DamageVolumeConfiguration.cs
│   │   │   │   │   │   └── DamageVolumeConfiguration.cs.meta
│   │   │   │   │   ├── Effect
│   │   │   │   │   │   ├── DamageEffect_BecomeInvulnerable.cs
│   │   │   │   │   │   ├── DamageEffect_BecomeInvulnerable.cs.meta
│   │   │   │   │   │   ├── DamageEffect_HitFlash.cs
│   │   │   │   │   │   ├── DamageEffect_HitFlash.cs.meta
│   │   │   │   │   │   ├── DamageEffect_Pushback.cs
│   │   │   │   │   │   └── DamageEffect_Pushback.cs.meta
│   │   │   │   │   ├── Enemies
│   │   │   │   │   │   ├── Enemy_WanderAttacker.cs
│   │   │   │   │   │   └── Enemy_WanderAttacker.cs.meta
│   │   │   │   │   ├── Interfaces
│   │   │   │   │   │   ├── IDamageable.cs
│   │   │   │   │   │   ├── IDamageable.cs.meta
│   │   │   │   │   │   ├── IDamageCallback.cs
│   │   │   │   │   │   ├── IDamageCallback.cs.meta
│   │   │   │   │   │   ├── IHealable.cs
│   │   │   │   │   │   ├── IHealable.cs.meta
│   │   │   │   │   │   ├── IInvulnerable.cs
│   │   │   │   │   │   ├── IInvulnerable.cs.meta
│   │   │   │   │   │   ├── IKillable.cs
│   │   │   │   │   │   ├── IKillable.cs.meta
│   │   │   │   │   │   ├── IReviveable.cs
│   │   │   │   │   │   └── IReviveable.cs.meta
│   │   │   │   │   ├── Listeners
│   │   │   │   │   │   ├── OnDamageListener.cs
│   │   │   │   │   │   ├── OnDamageListener.cs.meta
│   │   │   │   │   │   ├── OnDeathListener.cs
│   │   │   │   │   │   ├── OnDeathListener.cs.meta
│   │   │   │   │   │   ├── SaveDestroyedState.cs
│   │   │   │   │   │   └── SaveDestroyedState.cs.meta
│   │   │   │   │   ├── ScriptableObjects
│   │   │   │   │   │   ├── HitFlashConfiguration.cs
│   │   │   │   │   │   └── HitFlashConfiguration.cs.meta
│   │   │   │   │   ├── DamageVolume.cs
│   │   │   │   │   ├── DamageVolume.cs.meta
│   │   │   │   │   ├── Data.meta
│   │   │   │   │   ├── Effect.meta
│   │   │   │   │   ├── Enemies.meta
│   │   │   │   │   ├── Health.cs
│   │   │   │   │   ├── Health.cs.meta
│   │   │   │   │   ├── Interfaces.meta
│   │   │   │   │   ├── Listeners.meta
│   │   │   │   │   └── ScriptableObjects.meta
│   │   │   │   ├── Data
│   │   │   │   │   ├── SaveData.cs
│   │   │   │   │   └── SaveData.cs.meta
│   │   │   │   ├── Editor
│   │   │   │   │   ├── HelpWindow
│   │   │   │   │   │   ├── HelpWindow.cs
│   │   │   │   │   │   ├── HelpWindow.cs.meta
│   │   │   │   │   │   ├── OpenHelpWindow.cs
│   │   │   │   │   │   └── OpenHelpWindow.cs.meta
│   │   │   │   │   ├── AddEmbeddedResourcesWebGL.cs
│   │   │   │   │   ├── AddEmbeddedResourcesWebGL.cs.meta
│   │   │   │   │   ├── AssetImporter.cs
│   │   │   │   │   ├── AssetImporter.cs.meta
│   │   │   │   │   ├── AutoloadCoreScene.cs
│   │   │   │   │   ├── AutoloadCoreScene.cs.meta
│   │   │   │   │   ├── FarmFrameworkTools.cs
│   │   │   │   │   ├── FarmFrameworkTools.cs.meta
│   │   │   │   │   ├── FarmingKitToolbar.cs
│   │   │   │   │   ├── FarmingKitToolbar.cs.meta
│   │   │   │   │   ├── HelpWindow.meta
│   │   │   │   │   ├── SceneViewCameraRecorder.cs
│   │   │   │   │   └── SceneViewCameraRecorder.cs.meta
│   │   │   │   ├── Entity Components
│   │   │   │   │   ├── Character
│   │   │   │   │   │   ├── BodyAnimation.cs
│   │   │   │   │   │   ├── BodyAnimation.cs.meta
│   │   │   │   │   │   ├── BodyData.cs
│   │   │   │   │   │   ├── BodyData.cs.meta
│   │   │   │   │   │   ├── BodySpriteSetter.cs
│   │   │   │   │   │   ├── BodySpriteSetter.cs.meta
│   │   │   │   │   │   ├── BodySpriteSwapper.cs
│   │   │   │   │   │   └── BodySpriteSwapper.cs.meta
│   │   │   │   │   ├── Editor
│   │   │   │   │   │   ├── CharacterPartGenerator.cs
│   │   │   │   │   │   ├── CharacterPartGenerator.cs.meta
│   │   │   │   │   │   ├── SliceConfigurationData.cs
│   │   │   │   │   │   └── SliceConfigurationData.cs.meta
│   │   │   │   │   ├── Interfaces
│   │   │   │   │   │   ├── IAim.cs
│   │   │   │   │   │   ├── IAim.cs.meta
│   │   │   │   │   │   ├── IFreezeMovement.cs
│   │   │   │   │   │   ├── IFreezeMovement.cs.meta
│   │   │   │   │   │   ├── IMove.cs
│   │   │   │   │   │   └── IMove.cs.meta
│   │   │   │   │   ├── Player
│   │   │   │   │   │   ├── GridSelector.cs
│   │   │   │   │   │   └── GridSelector.cs.meta
│   │   │   │   │   ├── Sprite
│   │   │   │   │   │   ├── FlipSprite.cs
│   │   │   │   │   │   ├── FlipSprite.cs.meta
│   │   │   │   │   │   ├── RandomizeSprite.cs
│   │   │   │   │   │   └── RandomizeSprite.cs.meta
│   │   │   │   │   ├── Aimer.cs
│   │   │   │   │   ├── Aimer.cs.meta
│   │   │   │   │   ├── Character.meta
│   │   │   │   │   ├── Editor.meta
│   │   │   │   │   ├── Interfaces.meta
│   │   │   │   │   ├── Mover.cs
│   │   │   │   │   ├── Mover.cs.meta
│   │   │   │   │   ├── Player.meta
│   │   │   │   │   └── Sprite.meta
│   │   │   │   ├── Event
│   │   │   │   │   ├── Events
│   │   │   │   │   │   ├── BoolEvent.cs
│   │   │   │   │   │   ├── BoolEvent.cs.meta
│   │   │   │   │   │   ├── FloatEvent.cs
│   │   │   │   │   │   ├── FloatEvent.cs.meta
│   │   │   │   │   │   ├── GameEvent.cs
│   │   │   │   │   │   ├── GameEvent.cs.meta
│   │   │   │   │   │   ├── InteractionEvent.cs
│   │   │   │   │   │   ├── InteractionEvent.cs.meta
│   │   │   │   │   │   ├── IntEvent.cs
│   │   │   │   │   │   ├── IntEvent.cs.meta
│   │   │   │   │   │   ├── StringEvent.cs
│   │   │   │   │   │   ├── StringEvent.cs.meta
│   │   │   │   │   │   ├── TimeEvent.cs
│   │   │   │   │   │   ├── TimeEvent.cs.meta
│   │   │   │   │   │   ├── Vector2Event.cs
│   │   │   │   │   │   ├── Vector2Event.cs.meta
│   │   │   │   │   │   ├── WarpEvent.cs
│   │   │   │   │   │   ├── WarpEvent.cs.meta
│   │   │   │   │   │   ├── WeatherEvent.cs
│   │   │   │   │   │   └── WeatherEvent.cs.meta
│   │   │   │   │   ├── Listeners
│   │   │   │   │   │   ├── BoolEventListener.cs
│   │   │   │   │   │   ├── BoolEventListener.cs.meta
│   │   │   │   │   │   ├── DayCountDownListener.cs
│   │   │   │   │   │   ├── DayCountDownListener.cs.meta
│   │   │   │   │   │   ├── DayEventListener.cs
│   │   │   │   │   │   ├── DayEventListener.cs.meta
│   │   │   │   │   │   ├── FloatEventListener.cs
│   │   │   │   │   │   ├── FloatEventListener.cs.meta
│   │   │   │   │   │   ├── GameEventListener.cs
│   │   │   │   │   │   ├── GameEventListener.cs.meta
│   │   │   │   │   │   ├── IntEventListener.cs
│   │   │   │   │   │   ├── IntEventListener.cs.meta
│   │   │   │   │   │   ├── OnDisableListener.cs
│   │   │   │   │   │   ├── OnDisableListener.cs.meta
│   │   │   │   │   │   ├── OnEnableListener.cs
│   │   │   │   │   │   ├── OnEnableListener.cs.meta
│   │   │   │   │   │   ├── OnIsIndoorsListener.cs
│   │   │   │   │   │   ├── OnIsIndoorsListener.cs.meta
│   │   │   │   │   │   ├── OnTilemapListener.cs
│   │   │   │   │   │   ├── OnTilemapListener.cs.meta
│   │   │   │   │   │   ├── OnTriggerListener.cs
│   │   │   │   │   │   ├── OnTriggerListener.cs.meta
│   │   │   │   │   │   ├── StringEventListener.cs
│   │   │   │   │   │   ├── StringEventListener.cs.meta
│   │   │   │   │   │   ├── TimeEventListener.cs
│   │   │   │   │   │   ├── TimeEventListener.cs.meta
│   │   │   │   │   │   ├── Vector2Listener.cs
│   │   │   │   │   │   ├── Vector2Listener.cs.meta
│   │   │   │   │   │   ├── WarpEventListener.cs
│   │   │   │   │   │   ├── WarpEventListener.cs.meta
│   │   │   │   │   │   ├── WeatherEventListener.cs
│   │   │   │   │   │   └── WeatherEventListener.cs.meta
│   │   │   │   │   ├── Unity Events
│   │   │   │   │   │   ├── UnityEventBodyData.cs
│   │   │   │   │   │   ├── UnityEventBodyData.cs.meta
│   │   │   │   │   │   ├── UnityEventBool.cs
│   │   │   │   │   │   ├── UnityEventBool.cs.meta
│   │   │   │   │   │   ├── UnityEventDate.cs
│   │   │   │   │   │   ├── UnityEventDate.cs.meta
│   │   │   │   │   │   ├── UnityEventFloat.cs
│   │   │   │   │   │   ├── UnityEventFloat.cs.meta
│   │   │   │   │   │   ├── UnityEventGameObject.cs
│   │   │   │   │   │   ├── UnityEventGameObject.cs.meta
│   │   │   │   │   │   ├── UnityEventInt.cs
│   │   │   │   │   │   ├── UnityEventInt.cs.meta
│   │   │   │   │   │   ├── UnityEventString.cs
│   │   │   │   │   │   ├── UnityEventString.cs.meta
│   │   │   │   │   │   ├── UnityEventVector2.cs
│   │   │   │   │   │   ├── UnityEventVector2.cs.meta
│   │   │   │   │   │   ├── UnityEventVector3.cs
│   │   │   │   │   │   ├── UnityEventVector3.cs.meta
│   │   │   │   │   │   ├── UnityEventWeather.cs
│   │   │   │   │   │   └── UnityEventWeather.cs.meta
│   │   │   │   │   ├── Events.meta
│   │   │   │   │   ├── Listeners.meta
│   │   │   │   │   ├── ScriptableEvent.cs
│   │   │   │   │   ├── ScriptableEvent.cs.meta
│   │   │   │   │   ├── ScriptableEventListener.cs
│   │   │   │   │   ├── ScriptableEventListener.cs.meta
│   │   │   │   │   └── Unity Events.meta
│   │   │   │   ├── Interactions
│   │   │   │   │   ├── InteractionField.cs
│   │   │   │   │   └── InteractionField.cs.meta
│   │   │   │   ├── Item
│   │   │   │   │   ├── Actions
│   │   │   │   │   │   ├── ItemAction_Attack.cs
│   │   │   │   │   │   ├── ItemAction_Attack.cs.meta
│   │   │   │   │   │   ├── ItemAction_DigHole.cs
│   │   │   │   │   │   ├── ItemAction_DigHole.cs.meta
│   │   │   │   │   │   ├── ItemAction_OpenBox.cs
│   │   │   │   │   │   ├── ItemAction_OpenBox.cs.meta
│   │   │   │   │   │   ├── ItemAction_PlantSeed.cs
│   │   │   │   │   │   ├── ItemAction_PlantSeed.cs.meta
│   │   │   │   │   │   ├── ItemAction_WaterCan.cs
│   │   │   │   │   │   └── ItemAction_WaterCan.cs.meta
│   │   │   │   │   ├── Inventory
│   │   │   │   │   │   ├── Interfaces
│   │   │   │   │   │   │   ├── IDropItem.cs
│   │   │   │   │   │   │   ├── IDropItem.cs.meta
│   │   │   │   │   │   │   ├── IInventoryLoaded.cs
│   │   │   │   │   │   │   ├── IInventoryLoaded.cs.meta
│   │   │   │   │   │   │   ├── ILoadItem.cs
│   │   │   │   │   │   │   ├── ILoadItem.cs.meta
│   │   │   │   │   │   │   ├── IMoveItem.cs
│   │   │   │   │   │   │   ├── IMoveItem.cs.meta
│   │   │   │   │   │   │   ├── IRecieveItemSlotIcon.cs
│   │   │   │   │   │   │   ├── IRecieveItemSlotIcon.cs.meta
│   │   │   │   │   │   │   ├── IRemoveItem.cs
│   │   │   │   │   │   │   ├── IRemoveItem.cs.meta
│   │   │   │   │   │   │   ├── ISelectItem.cs
│   │   │   │   │   │   │   ├── ISelectItem.cs.meta
│   │   │   │   │   │   │   ├── IUseItem.cs
│   │   │   │   │   │   │   └── IUseItem.cs.meta
│   │   │   │   │   │   ├── Interfaces.meta
│   │   │   │   │   │   ├── Inventory.cs
│   │   │   │   │   │   ├── Inventory.cs.meta
│   │   │   │   │   │   ├── InventoryEventDispatcher.cs
│   │   │   │   │   │   ├── InventoryEventDispatcher.cs.meta
│   │   │   │   │   │   ├── InventoryItem.cs
│   │   │   │   │   │   ├── InventoryItem.cs.meta
│   │   │   │   │   │   ├── InventoryListener.cs
│   │   │   │   │   │   ├── InventoryListener.cs.meta
│   │   │   │   │   │   ├── InventorySlot.cs
│   │   │   │   │   │   ├── InventorySlot.cs.meta
│   │   │   │   │   │   ├── InventorySlotCollection.cs
│   │   │   │   │   │   ├── InventorySlotCollection.cs.meta
│   │   │   │   │   │   ├── ItemAmountDisplayer.cs
│   │   │   │   │   │   ├── ItemAmountDisplayer.cs.meta
│   │   │   │   │   │   ├── ItemEnergy.cs
│   │   │   │   │   │   ├── ItemEnergy.cs.meta
│   │   │   │   │   │   ├── ItemTooltip.cs
│   │   │   │   │   │   └── ItemTooltip.cs.meta
│   │   │   │   │   ├── Shop
│   │   │   │   │   │   ├── ShopConfig.cs
│   │   │   │   │   │   ├── ShopConfig.cs.meta
│   │   │   │   │   │   ├── ShopManager.cs
│   │   │   │   │   │   ├── ShopManager.cs.meta
│   │   │   │   │   │   ├── ShopSlot.cs
│   │   │   │   │   │   ├── ShopSlot.cs.meta
│   │   │   │   │   │   ├── ShopUI.cs
│   │   │   │   │   │   └── ShopUI.cs.meta
│   │   │   │   │   ├── Actions.meta
│   │   │   │   │   ├── Inventory.meta
│   │   │   │   │   ├── ItemAction.cs
│   │   │   │   │   ├── ItemAction.cs.meta
│   │   │   │   │   ├── ItemAdder.cs
│   │   │   │   │   ├── ItemAdder.cs.meta
│   │   │   │   │   ├── ItemCollection.cs
│   │   │   │   │   ├── ItemCollection.cs.meta
│   │   │   │   │   ├── ItemData.cs
│   │   │   │   │   ├── ItemData.cs.meta
│   │   │   │   │   ├── ItemDropper.cs
│   │   │   │   │   ├── ItemDropper.cs.meta
│   │   │   │   │   ├── ItemMetadataRegistry.cs
│   │   │   │   │   ├── ItemMetadataRegistry.cs.meta
│   │   │   │   │   ├── LootableItem.cs
│   │   │   │   │   ├── LootableItem.cs.meta
│   │   │   │   │   └── Shop.meta
│   │   │   │   ├── Main Menu
│   │   │   │   │   ├── DisableButtonOnEmptyStrings.cs
│   │   │   │   │   ├── DisableButtonOnEmptyStrings.cs.meta
│   │   │   │   │   ├── SaveSlotManager.cs
│   │   │   │   │   ├── SaveSlotManager.cs.meta
│   │   │   │   │   ├── SelectionTab.cs
│   │   │   │   │   ├── SelectionTab.cs.meta
│   │   │   │   │   ├── UICharacterRenderer.cs
│   │   │   │   │   ├── UICharacterRenderer.cs.meta
│   │   │   │   │   ├── UISaveSlotDisplayer.cs
│   │   │   │   │   └── UISaveSlotDisplayer.cs.meta
│   │   │   │   ├── Referencing
│   │   │   │   │   ├── Scriptable Assets
│   │   │   │   │   │   ├── Editor
│   │   │   │   │   │   │   ├── ReferenceableAssetPostProcessor.cs
│   │   │   │   │   │   │   ├── ReferenceableAssetPostProcessor.cs.meta
│   │   │   │   │   │   │   ├── ScriptableAssetInspector.cs
│   │   │   │   │   │   │   ├── ScriptableAssetInspector.cs.meta
│   │   │   │   │   │   │   ├── ScriptableTileBaseInspector.cs
│   │   │   │   │   │   │   └── ScriptableTileBaseInspector.cs.meta
│   │   │   │   │   │   ├── Editor.meta
│   │   │   │   │   │   ├── IReferenceableAsset.cs
│   │   │   │   │   │   ├── IReferenceableAsset.cs.meta
│   │   │   │   │   │   ├── ScriptableAsset.cs
│   │   │   │   │   │   ├── ScriptableAsset.cs.meta
│   │   │   │   │   │   ├── ScriptableAssetDatabase.cs
│   │   │   │   │   │   ├── ScriptableAssetDatabase.cs.meta
│   │   │   │   │   │   ├── ScriptableTileBase.cs
│   │   │   │   │   │   └── ScriptableTileBase.cs.meta
│   │   │   │   │   ├── Scriptable Pool
│   │   │   │   │   │   ├── Poolable.cs
│   │   │   │   │   │   ├── Poolable.cs.meta
│   │   │   │   │   │   ├── ScriptablePoolContainer.cs
│   │   │   │   │   │   └── ScriptablePoolContainer.cs.meta
│   │   │   │   │   ├── Scriptable Reference
│   │   │   │   │   │   ├── ScriptableReference.cs
│   │   │   │   │   │   ├── ScriptableReference.cs.meta
│   │   │   │   │   │   ├── ScriptableReferenceSetter.cs
│   │   │   │   │   │   └── ScriptableReferenceSetter.cs.meta
│   │   │   │   │   ├── Scriptable Variables
│   │   │   │   │   │   ├── Editor
│   │   │   │   │   │   │   ├── IntReferenceDrawer.cs
│   │   │   │   │   │   │   ├── IntReferenceDrawer.cs.meta
│   │   │   │   │   │   │   ├── StringReferenceDrawer.cs
│   │   │   │   │   │   │   └── StringReferenceDrawer.cs.meta
│   │   │   │   │   │   ├── References
│   │   │   │   │   │   │   ├── IntReference.cs
│   │   │   │   │   │   │   ├── IntReference.cs.meta
│   │   │   │   │   │   │   ├── StringReference.cs
│   │   │   │   │   │   │   └── StringReference.cs.meta
│   │   │   │   │   │   ├── Variables
│   │   │   │   │   │   │   ├── BodyDataVariable.cs
│   │   │   │   │   │   │   ├── BodyDataVariable.cs.meta
│   │   │   │   │   │   │   ├── IntVariable.cs
│   │   │   │   │   │   │   ├── IntVariable.cs.meta
│   │   │   │   │   │   │   ├── StringVariable.cs
│   │   │   │   │   │   │   └── StringVariable.cs.meta
│   │   │   │   │   │   ├── Editor.meta
│   │   │   │   │   │   ├── References.meta
│   │   │   │   │   │   ├── ScriptableVariable.cs
│   │   │   │   │   │   ├── ScriptableVariable.cs.meta
│   │   │   │   │   │   └── Variables.meta
│   │   │   │   │   ├── SaveablePrefab.cs
│   │   │   │   │   ├── SaveablePrefab.cs.meta
│   │   │   │   │   ├── Scriptable Assets.meta
│   │   │   │   │   ├── Scriptable Pool.meta
│   │   │   │   │   ├── Scriptable Reference.meta
│   │   │   │   │   ├── Scriptable Variables.meta
│   │   │   │   │   ├── SoundCollection.cs
│   │   │   │   │   └── SoundCollection.cs.meta
│   │   │   │   ├── Saving
│   │   │   │   │   ├── About saving.txt
│   │   │   │   │   ├── About saving.txt.meta
│   │   │   │   │   ├── DisplayCharacterBodyMetaData.cs
│   │   │   │   │   ├── DisplayCharacterBodyMetaData.cs.meta
│   │   │   │   │   ├── StoreCharacterBodyMetaData.cs
│   │   │   │   │   └── StoreCharacterBodyMetaData.cs.meta
│   │   │   │   ├── System
│   │   │   │   │   ├── Systems
│   │   │   │   │   │   ├── Editor
│   │   │   │   │   │   │   ├── SaveSystemInspector.cs
│   │   │   │   │   │   │   └── SaveSystemInspector.cs.meta
│   │   │   │   │   │   ├── Editor.meta
│   │   │   │   │   │   ├── InputSystem.cs
│   │   │   │   │   │   ├── InputSystem.cs.meta
│   │   │   │   │   │   ├── InteractionSystem.cs
│   │   │   │   │   │   ├── InteractionSystem.cs.meta
│   │   │   │   │   │   ├── MetaplexMetadataDecoder.cs
│   │   │   │   │   │   ├── MetaplexMetadataDecoder.cs.meta
│   │   │   │   │   │   ├── PauzeSystem.cs
│   │   │   │   │   │   ├── PauzeSystem.cs.meta
│   │   │   │   │   │   ├── SaveSystem.cs
│   │   │   │   │   │   ├── SaveSystem.cs.meta
│   │   │   │   │   │   ├── TimeSystem.cs
│   │   │   │   │   │   ├── TimeSystem.cs.meta
│   │   │   │   │   │   ├── WarpSystem.cs
│   │   │   │   │   │   ├── WarpSystem.cs.meta
│   │   │   │   │   │   ├── WeatherSystem.cs
│   │   │   │   │   │   └── WeatherSystem.cs.meta
│   │   │   │   │   ├── GameSystem.cs
│   │   │   │   │   ├── GameSystem.cs.meta
│   │   │   │   │   ├── MockNFTService.cs
│   │   │   │   │   ├── MockNFTService.cs.meta
│   │   │   │   │   ├── SolanaNFTService.cs
│   │   │   │   │   ├── SolanaNFTService.cs.meta
│   │   │   │   │   ├── Systems.meta
│   │   │   │   │   ├── SystemTicker.cs
│   │   │   │   │   └── SystemTicker.cs.meta
│   │   │   │   ├── TileMap
│   │   │   │   │   ├── Smart Tiles
│   │   │   │   │   │   ├── LICENSE.md
│   │   │   │   │   │   ├── LICENSE.md.meta
│   │   │   │   │   │   ├── RailTile.cs
│   │   │   │   │   │   ├── RailTile.cs.meta
│   │   │   │   │   │   ├── SOURCE.txt
│   │   │   │   │   │   ├── SOURCE.txt.meta
│   │   │   │   │   │   ├── TerrainTile.cs
│   │   │   │   │   │   ├── TerrainTile.cs.meta
│   │   │   │   │   │   ├── WallTile.cs
│   │   │   │   │   │   ├── WallTile.cs.meta
│   │   │   │   │   │   ├── WeightedRandomTile.cs
│   │   │   │   │   │   └── WeightedRandomTile.cs.meta
│   │   │   │   │   ├── Smart Tiles.meta
│   │   │   │   │   ├── SpawnTilemapPrefabs.cs
│   │   │   │   │   └── SpawnTilemapPrefabs.cs.meta
│   │   │   │   ├── Time
│   │   │   │   │   ├── Date.cs
│   │   │   │   │   ├── Date.cs.meta
│   │   │   │   │   ├── TimePlayed.cs
│   │   │   │   │   └── TimePlayed.cs.meta
│   │   │   │   ├── User Interface
│   │   │   │   │   ├── ClaimItemButton.cs
│   │   │   │   │   ├── ClaimItemButton.cs.meta
│   │   │   │   │   ├── ConfirmationWindow.cs
│   │   │   │   │   ├── ConfirmationWindow.cs.meta
│   │   │   │   │   ├── FadeImage.cs
│   │   │   │   │   ├── FadeImage.cs.meta
│   │   │   │   │   ├── NFTClaimButton.cs
│   │   │   │   │   ├── NFTClaimButton.cs.meta
│   │   │   │   │   ├── PauzeMenu.cs
│   │   │   │   │   ├── PauzeMenu.cs.meta
│   │   │   │   │   ├── UserInterfaceNavigation.cs
│   │   │   │   │   └── UserInterfaceNavigation.cs.meta
│   │   │   │   ├── Utility
│   │   │   │   │   ├── ActivationSelector.cs
│   │   │   │   │   ├── ActivationSelector.cs.meta
│   │   │   │   │   ├── CanvasClickAction.cs
│   │   │   │   │   ├── CanvasClickAction.cs.meta
│   │   │   │   │   ├── GameObjectToggler.cs
│   │   │   │   │   ├── GameObjectToggler.cs.meta
│   │   │   │   │   ├── HeightBasedSorting.cs
│   │   │   │   │   ├── HeightBasedSorting.cs.meta
│   │   │   │   │   ├── ScrollTexture.cs
│   │   │   │   │   ├── ScrollTexture.cs.meta
│   │   │   │   │   ├── SpriteFader.cs
│   │   │   │   │   ├── SpriteFader.cs.meta
│   │   │   │   │   ├── TextApplicationVersionUpdater.cs
│   │   │   │   │   ├── TextApplicationVersionUpdater.cs.meta
│   │   │   │   │   ├── Timer.cs
│   │   │   │   │   ├── Timer.cs.meta
│   │   │   │   │   ├── UIHoverAction.cs
│   │   │   │   │   └── UIHoverAction.cs.meta
│   │   │   │   ├── Weather
│   │   │   │   │   ├── EWeather.cs
│   │   │   │   │   ├── EWeather.cs.meta
│   │   │   │   │   ├── RainDrop.cs
│   │   │   │   │   ├── RainDrop.cs.meta
│   │   │   │   │   ├── WeatherDirtTileSetter.cs
│   │   │   │   │   ├── WeatherDirtTileSetter.cs.meta
│   │   │   │   │   ├── WeatherEffectRain.cs
│   │   │   │   │   └── WeatherEffectRain.cs.meta
│   │   │   │   ├── World
│   │   │   │   │   ├── Interfaces
│   │   │   │   │   │   ├── ITilemapListener.cs
│   │   │   │   │   │   └── ITilemapListener.cs.meta
│   │   │   │   │   ├── Objects
│   │   │   │   │   │   ├── Crop.cs
│   │   │   │   │   │   └── Crop.cs.meta
│   │   │   │   │   ├── GridManager.cs
│   │   │   │   │   ├── GridManager.cs.meta
│   │   │   │   │   ├── Interfaces.meta
│   │   │   │   │   ├── Objects.meta
│   │   │   │   │   ├── SceneWarper.cs
│   │   │   │   │   ├── SceneWarper.cs.meta
│   │   │   │   │   ├── WarpLocation.cs
│   │   │   │   │   ├── WarpLocation.cs.meta
│   │   │   │   │   ├── WorldMapButton.cs
│   │   │   │   │   ├── WorldMapButton.cs.meta
│   │   │   │   │   ├── WorldMapManager.cs
│   │   │   │   │   └── WorldMapManager.cs.meta
│   │   │   │   ├── Action.meta
│   │   │   │   ├── AutoSaveTicker.cs
│   │   │   │   ├── AutoSaveTicker.cs.meta
│   │   │   │   ├── Camera.meta
│   │   │   │   ├── Combat.meta
│   │   │   │   ├── Data.meta
│   │   │   │   ├── DataDebug.cs
│   │   │   │   ├── DataDebug.cs.meta
│   │   │   │   ├── Editor.meta
│   │   │   │   ├── Entity Components.meta
│   │   │   │   ├── Event.meta
│   │   │   │   ├── Interactions.meta
│   │   │   │   ├── Item.meta
│   │   │   │   ├── Main Menu.meta
│   │   │   │   ├── PlayerSession.cs
│   │   │   │   ├── PlayerSession.cs.meta
│   │   │   │   ├── Referencing.meta
│   │   │   │   ├── Saving.meta
│   │   │   │   ├── System.meta
│   │   │   │   ├── TileMap.meta
│   │   │   │   ├── Time.meta
│   │   │   │   ├── User Interface.meta
│   │   │   │   ├── UserInfo.cs
│   │   │   │   ├── UserInfo.cs.meta
│   │   │   │   ├── Utility.meta
│   │   │   │   ├── WalletAutoGameStarter.cs
│   │   │   │   ├── WalletAutoGameStarter.cs.meta
│   │   │   │   ├── WalletConnect.cs
│   │   │   │   ├── WalletConnect.cs.meta
│   │   │   │   ├── WalletGuard.cs
│   │   │   │   ├── WalletGuard.cs.meta
│   │   │   │   ├── Weather.meta
│   │   │   │   ├── Web3Connector.cs
│   │   │   │   ├── Web3Connector.cs.meta
│   │   │   │   └── World.meta
│   │   │   ├── Settings
│   │   │   │   ├── Scenes
│   │   │   │   │   ├── URP2DSceneTemplate.unity
│   │   │   │   │   └── URP2DSceneTemplate.unity.meta
│   │   │   │   ├── Lit2DSceneTemplate.scenetemplate
│   │   │   │   ├── Lit2DSceneTemplate.scenetemplate.meta
│   │   │   │   ├── Renderer2D.asset
│   │   │   │   ├── Renderer2D.asset.meta
│   │   │   │   ├── Scenes.meta
│   │   │   │   ├── UniversalRP.asset
│   │   │   │   └── UniversalRP.asset.meta
│   │   │   ├── TextMesh Pro
│   │   │   │   ├── Documentation
│   │   │   │   │   ├── TextMesh Pro User Guide 2016.pdf
│   │   │   │   │   └── TextMesh Pro User Guide 2016.pdf.meta
│   │   │   │   ├── Examples & Extras
│   │   │   │   ├── Fonts
│   │   │   │   │   ├── LiberationSans - OFL.txt
│   │   │   │   │   ├── LiberationSans - OFL.txt.meta
│   │   │   │   │   ├── LiberationSans.ttf
│   │   │   │   │   └── LiberationSans.ttf.meta
│   │   │   │   ├── Resources
│   │   │   │   │   ├── Fonts & Materials
│   │   │   │   │   │   ├── LiberationSans SDF - Drop Shadow.mat
│   │   │   │   │   │   ├── LiberationSans SDF - Drop Shadow.mat.meta
│   │   │   │   │   │   ├── LiberationSans SDF - Fallback.asset
│   │   │   │   │   │   ├── LiberationSans SDF - Fallback.asset.meta
│   │   │   │   │   │   ├── LiberationSans SDF - Outline.mat
│   │   │   │   │   │   ├── LiberationSans SDF - Outline.mat.meta
│   │   │   │   │   │   ├── LiberationSans SDF.asset
│   │   │   │   │   │   └── LiberationSans SDF.asset.meta
│   │   │   │   │   ├── Sprite Assets
│   │   │   │   │   │   ├── EmojiOne.asset
│   │   │   │   │   │   └── EmojiOne.asset.meta
│   │   │   │   │   ├── Style Sheets
│   │   │   │   │   │   ├── Default Style Sheet.asset
│   │   │   │   │   │   └── Default Style Sheet.asset.meta
│   │   │   │   │   ├── Fonts & Materials.meta
│   │   │   │   │   ├── LineBreaking Following Characters.txt
│   │   │   │   │   ├── LineBreaking Following Characters.txt.meta
│   │   │   │   │   ├── LineBreaking Leading Characters.txt
│   │   │   │   │   ├── LineBreaking Leading Characters.txt.meta
│   │   │   │   │   ├── Sprite Assets.meta
│   │   │   │   │   ├── Style Sheets.meta
│   │   │   │   │   ├── TMP Settings.asset
│   │   │   │   │   └── TMP Settings.asset.meta
│   │   │   │   ├── Shaders
│   │   │   │   │   ├── SDFFunctions.hlsl
│   │   │   │   │   ├── SDFFunctions.hlsl.meta
│   │   │   │   │   ├── TMP_Bitmap-Custom-Atlas.shader
│   │   │   │   │   ├── TMP_Bitmap-Custom-Atlas.shader.meta
│   │   │   │   │   ├── TMP_Bitmap-Mobile.shader
│   │   │   │   │   ├── TMP_Bitmap-Mobile.shader.meta
│   │   │   │   │   ├── TMP_Bitmap.shader
│   │   │   │   │   ├── TMP_Bitmap.shader.meta
│   │   │   │   │   ├── TMP_SDF Overlay.shader
│   │   │   │   │   ├── TMP_SDF Overlay.shader.meta
│   │   │   │   │   ├── TMP_SDF SSD.shader
│   │   │   │   │   ├── TMP_SDF SSD.shader.meta
│   │   │   │   │   ├── TMP_SDF-HDRP LIT.shadergraph
│   │   │   │   │   ├── TMP_SDF-HDRP LIT.shadergraph.meta
│   │   │   │   │   ├── TMP_SDF-HDRP UNLIT.shadergraph
│   │   │   │   │   ├── TMP_SDF-HDRP UNLIT.shadergraph.meta
│   │   │   │   │   ├── TMP_SDF-Mobile Masking.shader
│   │   │   │   │   ├── TMP_SDF-Mobile Masking.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile Overlay.shader
│   │   │   │   │   ├── TMP_SDF-Mobile Overlay.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile SSD.shader
│   │   │   │   │   ├── TMP_SDF-Mobile SSD.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile-2-Pass.shader
│   │   │   │   │   ├── TMP_SDF-Mobile-2-Pass.shader.meta
│   │   │   │   │   ├── TMP_SDF-Mobile.shader
│   │   │   │   │   ├── TMP_SDF-Mobile.shader.meta
│   │   │   │   │   ├── TMP_SDF-Surface-Mobile.shader
│   │   │   │   │   ├── TMP_SDF-Surface-Mobile.shader.meta
│   │   │   │   │   ├── TMP_SDF-Surface.shader
│   │   │   │   │   ├── TMP_SDF-Surface.shader.meta
│   │   │   │   │   ├── TMP_SDF-URP Lit.shadergraph
│   │   │   │   │   ├── TMP_SDF-URP Lit.shadergraph.meta
│   │   │   │   │   ├── TMP_SDF-URP Unlit.shadergraph
│   │   │   │   │   ├── TMP_SDF-URP Unlit.shadergraph.meta
│   │   │   │   │   ├── TMP_SDF.shader
│   │   │   │   │   ├── TMP_SDF.shader.meta
│   │   │   │   │   ├── TMP_Sprite.shader
│   │   │   │   │   ├── TMP_Sprite.shader.meta
│   │   │   │   │   ├── TMPro_Mobile.cginc
│   │   │   │   │   ├── TMPro_Mobile.cginc.meta
│   │   │   │   │   ├── TMPro_Properties.cginc
│   │   │   │   │   ├── TMPro_Properties.cginc.meta
│   │   │   │   │   ├── TMPro_Surface.cginc
│   │   │   │   │   ├── TMPro_Surface.cginc.meta
│   │   │   │   │   ├── TMPro.cginc
│   │   │   │   │   └── TMPro.cginc.meta
│   │   │   │   ├── Sprites
│   │   │   │   │   ├── EmojiOne Attribution.txt
│   │   │   │   │   ├── EmojiOne Attribution.txt.meta
│   │   │   │   │   ├── EmojiOne.json
│   │   │   │   │   ├── EmojiOne.json.meta
│   │   │   │   │   ├── EmojiOne.png
│   │   │   │   │   └── EmojiOne.png.meta
│   │   │   │   ├── Documentation.meta
│   │   │   │   ├── Examples & Extras.meta
│   │   │   │   ├── Fonts.meta
│   │   │   │   ├── Resources.meta
│   │   │   │   ├── Shaders.meta
│   │   │   │   └── Sprites.meta
│   │   │   ├── WebGLTemplates
│   │   │   │   ├── xNFT
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── index.html.meta
│   │   │   │   │   ├── thumbnail.png
│   │   │   │   │   └── thumbnail.png.meta
│   │   │   │   └── xNFT.meta
│   │   │   ├── Content.meta
│   │   │   ├── DefaultVolumeProfile.asset
│   │   │   ├── DefaultVolumeProfile.asset.meta
│   │   │   ├── Editor Default Resources.meta
│   │   │   ├── Farm RPG FREE 16x16 - Tiny Asset Pack.meta
│   │   │   ├── idl.json
│   │   │   ├── idl.json.meta
│   │   │   ├── InputSystem_Actions.inputactions
│   │   │   ├── InputSystem_Actions.inputactions.meta
│   │   │   ├── Plugins.meta
│   │   │   ├── Prefabs.meta
│   │   │   ├── Resources.meta
│   │   │   ├── Samples.meta
│   │   │   ├── Scenes.meta
│   │   │   ├── ScriptableObjects.meta
│   │   │   ├── Scripts.meta
│   │   │   ├── Settings.meta
│   │   │   ├── TextMesh Pro.meta
│   │   │   ├── UniversalRenderPipelineGlobalSettings.asset
│   │   │   ├── UniversalRenderPipelineGlobalSettings.asset.meta
│   │   │   └── WebGLTemplates.meta
│   │   ├── Packages
│   │   │   ├── manifest.json
│   │   │   └── packages-lock.json
│   │   ├── ProjectSettings
│   │   │   ├── AudioManager.asset
│   │   │   ├── ClusterInputManager.asset
│   │   │   ├── DynamicsManager.asset
│   │   │   ├── EditorBuildSettings.asset
│   │   │   ├── EditorSettings.asset
│   │   │   ├── GraphicsSettings.asset
│   │   │   ├── InputManager.asset
│   │   │   ├── MemorySettings.asset
│   │   │   ├── MultiplayerManager.asset
│   │   │   ├── NavMeshAreas.asset
│   │   │   ├── NetworkManager.asset
│   │   │   ├── PackageManagerSettings.asset
│   │   │   ├── Physics2DSettings.asset
│   │   │   ├── PresetManager.asset
│   │   │   ├── ProjectSettings.asset
│   │   │   ├── ProjectVersion.txt
│   │   │   ├── QualitySettings.asset
│   │   │   ├── SceneTemplateSettings.json
│   │   │   ├── ShaderGraphSettings.asset
│   │   │   ├── TagManager.asset
│   │   │   ├── TimeManager.asset
│   │   │   ├── UnityConnectSettings.asset
│   │   │   ├── URPProjectSettings.asset
│   │   │   ├── VersionControlSettings.asset
│   │   │   ├── VFXManager.asset
│   │   │   └── XRSettings.asset
│   │   └── .gitignore
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
│       │   ├── .well-known
│       │   │   └── assetlinks.json
│       │   │       └── route.ts
│       │   ├── account
│       │   │   ├── security
│       │   │   │   └── mfa
│       │   │   │       └── page.tsx
│       │   │   ├── sessions
│       │   │   │   └── page.tsx
│       │   │   └── wallet
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
│       │   │   │   ├── sessions
│       │   │   │   │   ├── logout-all
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── logout-current
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── logout-others
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── revoke
│       │   │   │   │       └── route.ts
│       │   │   │   ├── wallet
│       │   │   │   │   ├── challenge
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   ├── unlink
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── verify
│       │   │   │   │       └── route.ts
│       │   │   │   └── wallet-login
│       │   │   │       ├── challenge
│       │   │   │       │   └── route.ts
│       │   │   │       └── verify
│       │   │   │           └── route.ts
│       │   │   └── development-log
│       │   │       └── route.ts
│       │   ├── auth
│       │   │   ├── confirm
│       │   │   │   └── route.ts
│       │   │   └── wallet-mobile
│       │   │       └── callback
│       │   │           └── page.tsx
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
│       │   ├── wallet-login
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
│       │   │   ├── MobileWalletCallback.tsx
│       │   │   ├── PasswordField.tsx
│       │   │   ├── RegisterForm.tsx
│       │   │   ├── RegisterProgress.tsx
│       │   │   ├── ResetPasswordForm.tsx
│       │   │   ├── SessionManagementPanel.tsx
│       │   │   ├── TurnstileChallenge.tsx
│       │   │   ├── WalletLinkingPanel.tsx
│       │   │   ├── WalletLoginEntryLink.tsx
│       │   │   └── WalletLoginPanel.tsx
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
│       │       ├── mobile-wallet-deeplink.ts
│       │       ├── password-reauth.ts
│       │       ├── password-reset-email.ts
│       │       ├── pending-verification.ts
│       │       ├── session-device.ts
│       │       ├── verification-email.ts
│       │       ├── wallet-client.ts
│       │       ├── wallet-linking.ts
│       │       ├── wallet-login.ts
│       │       └── wallet-session.ts
│       ├── providers
│       ├── styles
│       │   └── .gitkeep
│       ├── test-results
│       │   └── auth
│       │       └── .last-run.json
│       ├── tests
│       │   └── auth
│       │       ├── auth-api-boundaries.spec.ts
│       │       ├── mobile-wallet-entry.spec.ts
│       │       ├── public-auth-routes.spec.ts
│       │       └── wallet-provider-selection.spec.ts
│       ├── utils
│       │   └── .gitkeep
│       ├── .env.local
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── playwright.auth.config.ts
│       ├── postcss.config.mjs
│       ├── public
│       ├── README.md
│       └── tsconfig.json
├── config
│   └── project.json
├── docs
│   ├── android
│   │   ├── communityhub
│   │   │   ├── AndroidManifest.app-links.xml
│   │   │   └── play-store-data-safety.md
│   │   └── communityhub-mobile-wallet
│   │       ├── AndroidManifest.mobile-wallet.xml
│   │       └── MobileWalletCallbackActivity.kt.template
│   ├── api
│   ├── architecture
│   │   ├── AUTH_ACCOUNT_ACCESS.md
│   │   ├── AUTH_ANTI_ABUSE.md
│   │   ├── AUTH_EMAIL_VERIFICATION.md
│   │   ├── AUTH_FOUNDER.md
│   │   ├── AUTH_GUARDIAN_CONSENT.md
│   │   ├── AUTH_LOGIN.md
│   │   ├── AUTH_MFA.md
│   │   ├── AUTH_MOBILE_WALLET_ANDROID.md
│   │   ├── AUTH_MOBILE_WALLET_RETURN.md
│   │   ├── AUTH_PASSWORD_RECOVERY.md
│   │   ├── AUTH_QA.md
│   │   ├── AUTH_REGISTER_UI.md
│   │   ├── AUTH_REGISTRATION_API.md
│   │   ├── AUTH_RELEASE.md
│   │   ├── AUTH_ROLES_BADGES.md
│   │   ├── AUTH_SESSION_MANAGEMENT.md
│   │   ├── AUTH_VALIDATION.md
│   │   ├── AUTH_WALLET_LINKING.md
│   │   ├── AUTH_WALLET_LOGIN.md
│   │   ├── COMMUNITY_PHASE_10_PWA_ANDROID.md
│   │   ├── COMMUNITY_PHASE_3_PROFILE_FOLLOW_SEARCH.md
│   │   ├── COMMUNITY_PHASE_4_QUEST_HARMONY.md
│   │   ├── COMMUNITY_PHASE_5_WALLET_SOLANA.md
│   │   ├── COMMUNITY_PHASE_6_MODERATION_ADMIN.md
│   │   ├── COMMUNITY_PHASE_7_NOTIFICATIONS_GUILD.md
│   │   ├── COMMUNITY_PHASE_8_MY_WORLD.md
│   │   └── COMMUNITY_PHASE_9_MESSAGES.md
│   ├── design-system
│   ├── releases
│   │   └── AUTH_RELEASE_SIGNOFF_TEMPLATE.md
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
│   ├── auth
│   │   └── auth-20-release-gate.mjs
│   ├── check-community-pwa.mjs
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
│   ├── sync-public.mjs
│   ├── verify-community-phase-10.mjs
│   ├── verify-community-phase-3.mjs
│   ├── verify-community-phase-4.mjs
│   ├── verify-community-phase-5.mjs
│   ├── verify-community-phase-6.mjs
│   ├── verify-community-phase-7.mjs
│   ├── verify-community-phase-8.mjs
│   └── verify-community-phase-9.mjs
├── supabase
│   ├── auth
│   │   ├── AUTH_0_5C.md
│   │   ├── AUTH_0_5D.md
│   │   ├── AUTH_1.md
│   │   ├── AUTH_2.md
│   │   ├── AUTH_3.md
│   │   ├── auth-0.5a-create-snapshot.sql
│   │   ├── auth-0.5a-inspect-snapshot.sql
│   │   ├── auth-0.5a-verify-snapshot.sql
│   │   ├── auth-0.5b-preflight.sql
│   │   ├── auth-0.5b-repair-signup.sql
│   │   ├── auth-0.5b-verify.sql
│   │   ├── auth-0.5c-harden-profile-privacy.sql
│   │   ├── auth-0.5c-preflight.sql
│   │   ├── auth-0.5c-verify.sql
│   │   ├── auth-0.5d-normalize-identities.sql
│   │   ├── auth-0.5d-preflight.sql
│   │   ├── auth-0.5d-verify.sql
│   │   ├── auth-1-legal-consent-foundation.sql
│   │   ├── auth-1-verify.sql
│   │   ├── auth-10-account-access.sql
│   │   ├── auth-10-preflight.sql
│   │   ├── auth-10-verify.sql
│   │   ├── auth-11-login-anti-abuse.sql
│   │   ├── auth-11-preflight.sql
│   │   ├── auth-11-verify.sql
│   │   ├── auth-12-password-recovery.sql
│   │   ├── auth-12-preflight.sql
│   │   ├── auth-12-verify.sql
│   │   ├── auth-13-preflight.sql
│   │   ├── auth-13-session-management.sql
│   │   ├── auth-13-verify.sql
│   │   ├── auth-14-mfa.sql
│   │   ├── auth-14-preflight.sql
│   │   ├── auth-14-verify.sql
│   │   ├── auth-15-preflight.sql
│   │   ├── auth-15-roles-badges.sql
│   │   ├── auth-15-verify.sql
│   │   ├── auth-16-founder-readiness.sql
│   │   ├── auth-16-founder.sql
│   │   ├── auth-16-identity-assignment-template.sql
│   │   ├── auth-16-preflight.sql
│   │   ├── auth-16-verify.sql
│   │   ├── auth-17-live-wallet-verify.sql
│   │   ├── auth-17-preflight.sql
│   │   ├── auth-17-verify.sql
│   │   ├── auth-17-wallet-linking.sql
│   │   ├── auth-18-live-wallet-login-verify.sql
│   │   ├── auth-18-preflight.sql
│   │   ├── auth-18-verify.sql
│   │   ├── auth-18-wallet-login.sql
│   │   ├── auth-19-data-integrity.sql
│   │   ├── auth-19-preflight.sql
│   │   ├── auth-19-release-gate.sql
│   │   ├── auth-19-security-regression.sql
│   │   ├── auth-2-data-model.sql
│   │   ├── auth-2-preflight.sql
│   │   ├── auth-2-verify.sql
│   │   ├── auth-20-post-deploy-verify.sql
│   │   ├── auth-20-release-readiness.sql
│   │   ├── auth-3-legacy-account-migration.sql
│   │   ├── auth-3-preflight.sql
│   │   ├── auth-3-verify.sql
│   │   ├── auth-5-preflight.sql
│   │   ├── auth-5-registration-finalization.sql
│   │   ├── auth-5-verify.sql
│   │   ├── auth-7-email-verification.sql
│   │   ├── auth-7-preflight.sql
│   │   ├── auth-7-verify.sql
│   │   ├── auth-8-guardian-consent.sql
│   │   ├── auth-8-preflight.sql
│   │   ├── auth-8-verify.sql
│   │   └── README.md
│   └── community
│       ├── community-3-preflight.sql
│       ├── community-3-profile-follow-search.sql
│       ├── community-3-verify.sql
│       ├── community-4-preflight.sql
│       ├── community-4-quest-harmony.sql
│       ├── community-4-verify.sql
│       ├── community-4.1-individual-claims-fix.sql
│       ├── community-4.1-individual-claims.sql
│       ├── community-5-preflight.sql
│       ├── community-5-verify.sql
│       ├── community-5-wallet-solana.sql
│       ├── community-6-moderation-admin.sql
│       ├── community-6-preflight.sql
│       ├── community-6-verify.sql
│       ├── community-7-notifications-guild.sql
│       ├── community-7-preflight.sql
│       ├── community-7-verify.sql
│       ├── community-8-my-world.sql
│       ├── community-8-preflight.sql
│       ├── community-8-verify.sql
│       ├── community-9-messages.sql
│       ├── community-9-preflight.sql
│       └── community-9-verify.sql
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

```
