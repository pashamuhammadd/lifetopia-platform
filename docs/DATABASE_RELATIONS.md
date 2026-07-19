# Lifetopia World — Database Relations

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## Critical Manual Relation

```text
auth.users.id
    ↓
public.profiles.id
```

Important:

```text
profiles.id == auth.users.id
profiles.user_id does not exist
```

---

## Foreign Keys

- `public.account_auth_attempts.user_id` → `public.profiles.id`
- `public.account_badge_changes.actor_id` → `public.profiles.id`
- `public.account_badge_changes.user_id` → `public.profiles.id`
- `public.account_email_verification_deliveries.user_id` → `public.profiles.id`
- `public.account_legacy_migrations.user_id` → `public.profiles.id`
- `public.account_legal_consents.document_id` → `public.legal_document_versions.id`
- `public.account_legal_consents.user_id` → `public.profiles.id`
- `public.account_mfa_events.user_id` → `public.profiles.id`
- `public.account_password_reset_requests.user_id` → `public.profiles.id`
- `public.account_role_changes.actor_id` → `public.profiles.id`
- `public.account_role_changes.user_id` → `public.profiles.id`
- `public.account_status_events.changed_by` → `public.profiles.id`
- `public.account_status_events.user_id` → `public.profiles.id`
- `public.account_username_changes.changed_by` → `public.profiles.id`
- `public.account_username_changes.user_id` → `public.profiles.id`
- `public.account_wallets.user_id` → `public.profiles.id`
- `public.community_account_restrictions.created_by` → `public.profiles.id`
- `public.community_account_restrictions.user_id` → `public.profiles.id`
- `public.community_announcements.published_by` → `public.profiles.id`
- `public.community_bookmarks.post_id` → `public.community_posts.id`
- `public.community_bookmarks.user_id` → `public.profiles.id`
- `public.community_comments.author_id` → `public.profiles.id`
- `public.community_comments.parent_comment_id` → `public.community_comments.id`
- `public.community_comments.post_id` → `public.community_posts.id`
- `public.community_follows.followed_id` → `public.profiles.id`
- `public.community_follows.follower_id` → `public.profiles.id`
- `public.community_guild_members.guild_id` → `public.community_guilds.id`
- `public.community_guild_members.user_id` → `public.profiles.id`
- `public.community_guilds.owner_id` → `public.profiles.id`
- `public.community_likes.post_id` → `public.community_posts.id`
- `public.community_likes.user_id` → `public.profiles.id`
- `public.community_moderation_events.actor_id` → `public.profiles.id`
- `public.community_moderation_events.report_id` → `public.community_reports.id`
- `public.community_moderation_events.target_user_id` → `public.profiles.id`
- `public.community_notifications.actor_id` → `public.profiles.id`
- `public.community_notifications.announcement_id` → `public.community_announcements.id`
- `public.community_notifications.comment_id` → `public.community_comments.id`
- `public.community_notifications.post_id` → `public.community_posts.id`
- `public.community_notifications.recipient_id` → `public.profiles.id`
- `public.community_posts.author_id` → `public.profiles.id`
- `public.community_quest_claims.user_id` → `public.profiles.id`
- `public.community_quest_events.user_id` → `public.profiles.id`
- `public.community_reports.comment_id` → `public.community_comments.id`
- `public.community_reports.post_id` → `public.community_posts.id`
- `public.community_reports.reporter_id` → `public.profiles.id`
- `public.community_reports.reviewed_by` → `public.profiles.id`
- `public.guardian_consents.privacy_document_id` → `public.legal_document_versions.id`
- `public.guardian_consents.terms_document_id` → `public.legal_document_versions.id`
- `public.guardian_consents.user_id` → `public.profiles.id`
- `public.harmony_accounts.user_id` → `public.profiles.id`
- `public.harmony_ledger.user_id` → `public.profiles.id`
- `public.lifetopia_founder_registry.user_id` → `public.profiles.id`
- `public.profile_badges.badge_code` → `public.badge_catalog.badge_code`
- `public.profile_badges.user_id` → `public.profiles.id`
- `public.profile_private.user_id` → `public.profiles.id`
- `public.wallet_link_challenges.user_id` → `public.profiles.id`


---

## Table Map

### `public.account_auth_attempts`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_badge_changes`

Outgoing relations:
- `actor_id` → `profiles.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_email_verification_deliveries`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_legacy_migrations`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_legal_consents`

Outgoing relations:
- `document_id` → `legal_document_versions.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_mfa_events`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_password_reset_requests`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_role_changes`

Outgoing relations:
- `actor_id` → `profiles.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_status_events`

Outgoing relations:
- `changed_by` → `profiles.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_username_changes`

Outgoing relations:
- `changed_by` → `profiles.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.account_wallets`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.badge_catalog`

Outgoing relations:
- None

Incoming relations:
- `profile_badges.badge_code` → `badge_code`

### `public.community_account_restrictions`

Outgoing relations:
- `created_by` → `profiles.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_announcements`

Outgoing relations:
- `published_by` → `profiles.id`

Incoming relations:
- `community_notifications.announcement_id` → `id`

### `public.community_bookmarks`

Outgoing relations:
- `post_id` → `community_posts.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_comments`

Outgoing relations:
- `author_id` → `profiles.id`
- `parent_comment_id` → `community_comments.id`
- `post_id` → `community_posts.id`

Incoming relations:
- `community_comments.parent_comment_id` → `id`
- `community_notifications.comment_id` → `id`
- `community_reports.comment_id` → `id`

### `public.community_follows`

Outgoing relations:
- `followed_id` → `profiles.id`
- `follower_id` → `profiles.id`

Incoming relations:
- None

### `public.community_guild_members`

Outgoing relations:
- `guild_id` → `community_guilds.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_guilds`

Outgoing relations:
- `owner_id` → `profiles.id`

Incoming relations:
- `community_guild_members.guild_id` → `id`

### `public.community_likes`

Outgoing relations:
- `post_id` → `community_posts.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_moderation_events`

Outgoing relations:
- `actor_id` → `profiles.id`
- `report_id` → `community_reports.id`
- `target_user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_notifications`

Outgoing relations:
- `actor_id` → `profiles.id`
- `announcement_id` → `community_announcements.id`
- `comment_id` → `community_comments.id`
- `post_id` → `community_posts.id`
- `recipient_id` → `profiles.id`

Incoming relations:
- None

### `public.community_posts`

Outgoing relations:
- `author_id` → `profiles.id`

Incoming relations:
- `community_bookmarks.post_id` → `id`
- `community_comments.post_id` → `id`
- `community_likes.post_id` → `id`
- `community_notifications.post_id` → `id`
- `community_reports.post_id` → `id`

### `public.community_quest_claims`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_quest_events`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.community_reports`

Outgoing relations:
- `comment_id` → `community_comments.id`
- `post_id` → `community_posts.id`
- `reporter_id` → `profiles.id`
- `reviewed_by` → `profiles.id`

Incoming relations:
- `community_moderation_events.report_id` → `id`

### `public.development_logs`

Outgoing relations:
- None

Incoming relations:
- None

### `public.guardian_consents`

Outgoing relations:
- `privacy_document_id` → `legal_document_versions.id`
- `terms_document_id` → `legal_document_versions.id`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.harmony_accounts`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.harmony_ledger`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.legal_document_versions`

Outgoing relations:
- None

Incoming relations:
- `account_legal_consents.document_id` → `id`
- `guardian_consents.privacy_document_id` → `id`
- `guardian_consents.terms_document_id` → `id`

### `public.lifetopia_founder_registry`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.lifetopia_role_catalog`

Outgoing relations:
- None

Incoming relations:
- None

### `public.profile_badges`

Outgoing relations:
- `badge_code` → `badge_catalog.badge_code`
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.profile_private`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.profiles`

Outgoing relations:
- None

Incoming relations:
- `account_auth_attempts.user_id` → `id`
- `account_badge_changes.actor_id` → `id`
- `account_badge_changes.user_id` → `id`
- `account_email_verification_deliveries.user_id` → `id`
- `account_legacy_migrations.user_id` → `id`
- `account_legal_consents.user_id` → `id`
- `account_mfa_events.user_id` → `id`
- `account_password_reset_requests.user_id` → `id`
- `account_role_changes.actor_id` → `id`
- `account_role_changes.user_id` → `id`
- `account_status_events.changed_by` → `id`
- `account_status_events.user_id` → `id`
- `account_username_changes.changed_by` → `id`
- `account_username_changes.user_id` → `id`
- `account_wallets.user_id` → `id`
- `community_account_restrictions.created_by` → `id`
- `community_account_restrictions.user_id` → `id`
- `community_announcements.published_by` → `id`
- `community_bookmarks.user_id` → `id`
- `community_comments.author_id` → `id`
- `community_follows.followed_id` → `id`
- `community_follows.follower_id` → `id`
- `community_guild_members.user_id` → `id`
- `community_guilds.owner_id` → `id`
- `community_likes.user_id` → `id`
- `community_moderation_events.actor_id` → `id`
- `community_moderation_events.target_user_id` → `id`
- `community_notifications.actor_id` → `id`
- `community_notifications.recipient_id` → `id`
- `community_posts.author_id` → `id`
- `community_quest_claims.user_id` → `id`
- `community_quest_events.user_id` → `id`
- `community_reports.reporter_id` → `id`
- `community_reports.reviewed_by` → `id`
- `guardian_consents.user_id` → `id`
- `harmony_accounts.user_id` → `id`
- `harmony_ledger.user_id` → `id`
- `lifetopia_founder_registry.user_id` → `id`
- `profile_badges.user_id` → `id`
- `profile_private.user_id` → `id`
- `wallet_link_challenges.user_id` → `id`

### `public.wallet_link_challenges`

Outgoing relations:
- `user_id` → `profiles.id`

Incoming relations:
- None

### `public.wallet_login_challenges`

Outgoing relations:
- None

Incoming relations:
- None

### `public.wallet_login_events`

Outgoing relations:
- None

Incoming relations:
- None

### `public.wallet_security_events`

Outgoing relations:
- None

Incoming relations:
- None

