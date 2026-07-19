# Lifetopia World — Database Schema

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## Critical Auth Rule

```text
profiles.id == auth.users.id
```

The `profiles` table does not have `user_id`.

Correct:

```ts
.eq("id", user.id)
```

Incorrect:

```ts
.eq("user_id", user.id)
```

---

## Table: `public.account_auth_attempts`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | YES | FK → profiles.id | `` |
| `identifier_hash` | `text` | NO |  | `` |
| `ip_hash` | `text` | NO |  | `` |
| `pair_hash` | `text` | NO |  | `` |
| `outcome` | `text` | NO |  | `'pending'::text` |
| `captcha_required` | `boolean` | NO |  | `false` |
| `captcha_supplied` | `boolean` | NO |  | `false` |
| `captcha_passed` | `boolean` | NO |  | `false` |
| `retry_after_seconds` | `integer` | NO |  | `0` |
| `requested_at` | `timestamp with time zone` | NO |  | `now()` |
| `completed_at` | `timestamp with time zone` | YES |  | `` |

## Table: `public.account_badge_changes`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `badge_code` | `text` | NO |  | `` |
| `action` | `text` | NO |  | `` |
| `actor_id` | `uuid` | YES | FK → profiles.id | `` |
| `reason` | `text` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_email_verification_deliveries`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `last_reason` | `text` | NO |  | `` |
| `last_requested_at` | `timestamp with time zone` | NO |  | `now()` |
| `next_allowed_at` | `timestamp with time zone` | NO |  | `` |
| `last_delivered_at` | `timestamp with time zone` | YES |  | `` |
| `last_status` | `text` | NO |  | `` |
| `request_count` | `integer` | NO |  | `1` |
| `failure_count` | `integer` | NO |  | `0` |
| `last_error_code` | `text` | YES |  | `` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_legacy_migrations`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `migration_version` | `text` | NO |  | `` |
| `auth_created_at` | `timestamp with time zone` | NO |  | `` |
| `legacy_role` | `text` | YES |  | `` |
| `final_role` | `text` | NO |  | `` |
| `email_verification_required` | `boolean` | NO |  | `` |
| `legal_reconsent_required` | `boolean` | NO |  | `` |
| `guardian_consent_required` | `boolean` | NO |  | `` |
| `guardian_consent_status` | `text` | NO |  | `` |
| `username_selection_required` | `boolean` | NO |  | `` |
| `free_username_change_preserved` | `boolean` | NO |  | `` |
| `migrated_at` | `timestamp with time zone` | NO |  | `now()` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_legal_consents`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `document_id` | `uuid` | NO | FK → legal_document_versions.id | `` |
| `consented_at` | `timestamp with time zone` | NO |  | `now()` |
| `consent_method` | `text` | NO |  | `` |
| `source_app` | `text` | NO |  | `` |
| `withdrawn_at` | `timestamp with time zone` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_mfa_events`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `factor_id` | `uuid` | YES |  | `` |
| `event_type` | `text` | NO |  | `` |
| `success` | `boolean` | NO |  | `` |
| `error_code` | `text` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_password_reset_requests`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `token_hash` | `text` | NO |  | `` |
| `return_path` | `text` | NO |  | `'/'::text` |
| `status` | `text` | NO |  | `'pending'::text` |
| `requested_at` | `timestamp with time zone` | NO |  | `now()` |
| `expires_at` | `timestamp with time zone` | NO |  | `` |
| `delivered_at` | `timestamp with time zone` | YES |  | `` |
| `used_at` | `timestamp with time zone` | YES |  | `` |
| `delivery_error_code` | `text` | YES |  | `` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_role_changes`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `previous_role` | `text` | YES |  | `` |
| `new_role` | `text` | NO |  | `` |
| `actor_id` | `uuid` | YES | FK → profiles.id | `` |
| `change_source` | `text` | NO |  | `` |
| `reason` | `text` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_status_events`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `previous_status` | `text` | YES |  | `` |
| `new_status` | `text` | NO |  | `` |
| `visible_reason` | `text` | YES |  | `` |
| `internal_note` | `text` | YES |  | `` |
| `starts_at` | `timestamp with time zone` | NO |  | `now()` |
| `ends_at` | `timestamp with time zone` | YES |  | `` |
| `changed_by` | `uuid` | YES | FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_username_changes`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `old_username` | `citext` | NO |  | `` |
| `new_username` | `citext` | NO |  | `` |
| `change_type` | `text` | NO |  | `` |
| `consumed_free_change` | `boolean` | NO |  | `false` |
| `changed_by` | `uuid` | YES | FK → profiles.id | `` |
| `changed_at` | `timestamp with time zone` | NO |  | `now()` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.account_wallets`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `chain` | `text` | NO |  | `'solana'::text` |
| `address` | `text` | NO |  | `` |
| `linked_at` | `timestamp with time zone` | NO |  | `now()` |
| `last_verified_at` | `timestamp with time zone` | NO |  | `now()` |
| `last_login_at` | `timestamp with time zone` | YES |  | `` |
| `wallet_login_count` | `bigint` | NO |  | `0` |

## Table: `public.badge_catalog`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `badge_code` | `text` | NO | PK | `` |
| `label` | `text` | NO |  | `` |
| `description` | `text` | NO |  | `` |
| `priority` | `integer` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_bookmarks`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `post_id` | `uuid` | NO | PK, FK → community_posts.id | `` |
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_comments`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `post_id` | `uuid` | NO | FK → community_posts.id | `` |
| `author_id` | `uuid` | NO | FK → profiles.id | `` |
| `content` | `text` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |
| `parent_comment_id` | `uuid` | YES | FK → community_comments.id | `` |

## Table: `public.community_follows`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `follower_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `followed_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_likes`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `post_id` | `uuid` | NO | PK, FK → community_posts.id | `` |
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_posts`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `author_id` | `uuid` | NO | FK → profiles.id | `` |
| `content` | `text` | NO |  | `` |
| `category` | `text` | NO |  | `'General'::text` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_quest_claims`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `bigint` | NO | PK | `` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `quest_code` | `text` | NO |  | `` |
| `period_key` | `date` | NO |  | `` |
| `reward` | `integer` | NO |  | `` |
| `claimed_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_quest_events`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `bigint` | NO | PK | `` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `event_type` | `text` | NO |  | `` |
| `subject_id` | `uuid` | YES |  | `` |
| `event_date` | `date` | NO |  | `(timezone('utc'::text, now()))::date` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.community_reports`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `reporter_id` | `uuid` | NO | FK → profiles.id | `` |
| `target_type` | `text` | NO |  | `` |
| `post_id` | `uuid` | NO | FK → community_posts.id | `` |
| `comment_id` | `uuid` | YES | FK → community_comments.id | `` |
| `reason` | `text` | NO |  | `` |
| `details` | `text` | YES |  | `` |
| `status` | `text` | NO |  | `'pending'::text` |
| `reviewed_by` | `uuid` | YES | FK → profiles.id | `` |
| `reviewed_at` | `timestamp with time zone` | YES |  | `` |
| `resolution_note` | `text` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.development_logs`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `repo` | `text` | NO |  | `` |
| `branch` | `text` | NO |  | `'main'::text` |
| `commit_sha` | `text` | NO |  | `` |
| `commit_message` | `text` | NO |  | `` |
| `commit_url` | `text` | YES |  | `` |
| `author_name` | `text` | YES |  | `` |
| `author_username` | `text` | YES |  | `` |
| `app_area` | `text` | NO |  | `'Monorepo'::text` |
| `category` | `text` | NO |  | `'Update'::text` |
| `changed_files` | `jsonb` | NO |  | `'[]'::jsonb` |
| `is_public` | `boolean` | NO |  | `true` |
| `pushed_at` | `timestamp with time zone` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.guardian_consents`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `guardian_email` | `citext` | NO |  | `` |
| `status` | `text` | NO |  | `'pending'::text` |
| `token_hash` | `text` | NO |  | `` |
| `terms_document_id` | `uuid` | NO | FK → legal_document_versions.id | `` |
| `privacy_document_id` | `uuid` | NO | FK → legal_document_versions.id | `` |
| `requested_at` | `timestamp with time zone` | NO |  | `now()` |
| `expires_at` | `timestamp with time zone` | NO |  | `` |
| `responded_at` | `timestamp with time zone` | YES |  | `` |
| `revoked_at` | `timestamp with time zone` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |
| `delivery_status` | `text` | NO |  | `'pending'::text` |
| `delivered_at` | `timestamp with time zone` | YES |  | `` |
| `delivery_error_code` | `text` | YES |  | `` |

## Table: `public.harmony_accounts`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `points` | `bigint` | NO |  | `0` |
| `level_floor` | `integer` | NO |  | `1` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.harmony_ledger`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `bigint` | NO | PK | `` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `amount` | `integer` | NO |  | `` |
| `balance_after` | `bigint` | NO |  | `` |
| `source_type` | `text` | NO |  | `` |
| `source_key` | `text` | NO |  | `` |
| `description` | `text` | NO |  | `` |
| `metadata` | `jsonb` | NO |  | `'{}'::jsonb` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.legal_document_versions`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `document_type` | `text` | NO |  | `` |
| `version` | `text` | NO |  | `` |
| `title` | `text` | NO |  | `` |
| `document_path` | `text` | NO |  | `` |
| `effective_at` | `timestamp with time zone` | NO |  | `` |
| `published_at` | `timestamp with time zone` | NO |  | `now()` |
| `is_active` | `boolean` | NO |  | `false` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.lifetopia_founder_registry`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `singleton` | `boolean` | NO | PK | `true` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `username_at_provisioning` | `citext` | NO |  | `` |
| `provisioned_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.lifetopia_role_catalog`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `role_code` | `text` | NO | PK | `` |
| `label` | `text` | NO |  | `` |
| `description` | `text` | NO |  | `` |
| `priority` | `integer` | NO |  | `` |
| `is_staff` | `boolean` | NO |  | `false` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.profile_badges`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `badge_code` | `text` | NO | PK, FK → badge_catalog.badge_code | `` |
| `granted_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.profile_private`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `user_id` | `uuid` | NO | PK, FK → profiles.id | `` |
| `date_of_birth` | `date` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |
| `requires_username_update` | `boolean` | NO |  | `false` |
| `account_status` | `text` | NO |  | `'active'::text` |
| `status_updated_at` | `timestamp with time zone` | NO |  | `now()` |
| `suspended_until` | `timestamp with time zone` | YES |  | `` |
| `restriction_reason` | `text` | YES |  | `` |
| `deletion_scheduled_for` | `timestamp with time zone` | YES |  | `` |
| `deleted_at` | `timestamp with time zone` | YES |  | `` |
| `email_verified_at` | `timestamp with time zone` | YES |  | `` |
| `legal_reconsent_required` | `boolean` | NO |  | `true` |
| `guardian_consent_required` | `boolean` | NO |  | `false` |
| `guardian_consent_status` | `text` | NO |  | `'not_required'::text` |
| `guardian_consent_verified_at` | `timestamp with time zone` | YES |  | `` |
| `free_username_change_used` | `boolean` | NO |  | `false` |
| `legacy_migration_version` | `text` | YES |  | `` |
| `legacy_migrated_at` | `timestamp with time zone` | YES |  | `` |

## Table: `public.profiles`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `` |
| `username` | `citext` | NO |  | `` |
| `display_name` | `text` | NO |  | `` |
| `gender` | `text` | NO |  | `` |
| `avatar_id` | `text` | NO |  | `'avatar-01'::text` |
| `country_code` | `text` | NO |  | `` |
| `country_name` | `text` | NO |  | `` |
| `account_type` | `text` | NO |  | `'player'::text` |
| `role` | `text` | NO |  | `'lifetopian'::text` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |
| `updated_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.wallet_link_challenges`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `` |
| `user_id` | `uuid` | NO | FK → profiles.id | `` |
| `chain` | `text` | NO |  | `'solana'::text` |
| `address` | `text` | NO |  | `` |
| `nonce` | `text` | NO |  | `` |
| `message` | `text` | NO |  | `` |
| `expires_at` | `timestamp with time zone` | NO |  | `` |
| `consumed_at` | `timestamp with time zone` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.wallet_login_challenges`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `` |
| `chain` | `text` | NO |  | `'solana'::text` |
| `address` | `text` | NO |  | `` |
| `nonce` | `text` | NO |  | `` |
| `message` | `text` | NO |  | `` |
| `request_fingerprint` | `text` | NO |  | `` |
| `expires_at` | `timestamp with time zone` | NO |  | `` |
| `consumed_at` | `timestamp with time zone` | YES |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.wallet_login_events`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO |  | `` |
| `wallet_id` | `uuid` | NO |  | `` |
| `challenge_id` | `uuid` | NO |  | `` |
| `chain` | `text` | NO |  | `` |
| `address` | `text` | NO |  | `` |
| `event_type` | `text` | NO |  | `` |
| `success` | `boolean` | NO |  | `` |
| `error_code` | `text` | YES |  | `` |
| `request_id` | `uuid` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

## Table: `public.wallet_security_events`

| Column | Type | Nullable | Key | Default |
|---|---|---|---|---|
| `id` | `uuid` | NO | PK | `gen_random_uuid()` |
| `user_id` | `uuid` | NO |  | `` |
| `wallet_id` | `uuid` | YES |  | `` |
| `chain` | `text` | NO |  | `` |
| `address` | `text` | NO |  | `` |
| `event_type` | `text` | NO |  | `` |
| `request_id` | `uuid` | NO |  | `` |
| `created_at` | `timestamp with time zone` | NO |  | `now()` |

