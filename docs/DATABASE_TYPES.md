# Lifetopia World — Database Types

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## TypeScript Interfaces

export type AccountAuthAttempt = {
  id: string;
  user_id: string | null;
  identifier_hash: string;
  ip_hash: string;
  pair_hash: string;
  outcome: string;
  captcha_required: boolean;
  captcha_supplied: boolean;
  captcha_passed: boolean;
  retry_after_seconds: number;
  requested_at: string;
  completed_at: string | null;
};

export type AccountBadgeChange = {
  id: string;
  user_id: string;
  badge_code: string;
  action: string;
  actor_id: string | null;
  reason: string | null;
  created_at: string;
};

export type AccountEmailVerificationDeliverie = {
  user_id: string;
  last_reason: string;
  last_requested_at: string;
  next_allowed_at: string;
  last_delivered_at: string | null;
  last_status: string;
  request_count: number;
  failure_count: number;
  last_error_code: string | null;
  updated_at: string;
};

export type AccountLegacyMigration = {
  id: string;
  user_id: string;
  migration_version: string;
  auth_created_at: string;
  legacy_role: string | null;
  final_role: string;
  email_verification_required: boolean;
  legal_reconsent_required: boolean;
  guardian_consent_required: boolean;
  guardian_consent_status: string;
  username_selection_required: boolean;
  free_username_change_preserved: boolean;
  migrated_at: string;
  created_at: string;
};

export type AccountLegalConsent = {
  id: string;
  user_id: string;
  document_id: string;
  consented_at: string;
  consent_method: string;
  source_app: string;
  withdrawn_at: string | null;
  created_at: string;
};

export type AccountMfaEvent = {
  id: string;
  user_id: string;
  factor_id: string | null;
  event_type: string;
  success: boolean;
  error_code: string | null;
  created_at: string;
};

export type AccountPasswordResetRequest = {
  id: string;
  user_id: string;
  token_hash: string;
  return_path: string;
  status: string;
  requested_at: string;
  expires_at: string;
  delivered_at: string | null;
  used_at: string | null;
  delivery_error_code: string | null;
  updated_at: string;
};

export type AccountRoleChange = {
  id: string;
  user_id: string;
  previous_role: string | null;
  new_role: string;
  actor_id: string | null;
  change_source: string;
  reason: string | null;
  created_at: string;
};

export type AccountStatusEvent = {
  id: string;
  user_id: string;
  previous_status: string | null;
  new_status: string;
  visible_reason: string | null;
  internal_note: string | null;
  starts_at: string;
  ends_at: string | null;
  changed_by: string | null;
  created_at: string;
};

export type AccountUsernameChange = {
  id: string;
  user_id: string;
  old_username: string;
  new_username: string;
  change_type: string;
  consumed_free_change: boolean;
  changed_by: string | null;
  changed_at: string;
  created_at: string;
};

export type AccountWallet = {
  id: string;
  user_id: string;
  chain: string;
  address: string;
  linked_at: string;
  last_verified_at: string;
  last_login_at: string | null;
  wallet_login_count: number;
};

export type BadgeCatalog = {
  badge_code: string;
  label: string;
  description: string;
  priority: number;
  created_at: string;
};

export type CommunityAccountRestriction = {
  user_id: string;
  status: string;
  reason: string;
  expires_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type CommunityAnnouncement = {
  id: string;
  title: string;
  body: string;
  published_by: string;
  published_at: string;
  is_active: boolean;
};

export type CommunityBookmark = {
  post_id: string;
  user_id: string;
  created_at: string;
};

export type CommunityComment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_comment_id: string | null;
  moderation_status: string;
  moderation_reason: string | null;
};

export type CommunityDirectConversation = {
  id: string;
  member_low: string;
  member_high: string;
  created_at: string;
  last_message_at: string;
};

export type CommunityDirectMessage = {
  id: number;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type CommunityDirectRead = {
  conversation_id: string;
  user_id: string;
  last_read_message_id: number | null;
  read_at: string;
};

export type CommunityFollow = {
  follower_id: string;
  followed_id: string;
  created_at: string;
};

export type CommunityGuildMember = {
  guild_id: string;
  user_id: string;
  role: string;
  status: string;
  joined_at: string;
};

export type CommunityGuild = {
  id: string;
  slug: string;
  name: string;
  description: string;
  owner_id: string;
  join_policy: string;
  created_at: string;
  updated_at: string;
};

export type CommunityLike = {
  post_id: string;
  user_id: string;
  created_at: string;
};

export type CommunityModerationEvent = {
  id: string;
  actor_id: string | null;
  target_user_id: string | null;
  report_id: string | null;
  target_type: string | null;
  target_id: string | null;
  action: string;
  reason: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type CommunityNotification = {
  id: string;
  recipient_id: string;
  type: string;
  actor_id: string | null;
  announcement_id: string | null;
  post_id: string | null;
  comment_id: string | null;
  title: string;
  body: string;
  dedupe_key: string;
  read_at: string | null;
  created_at: string;
};

export type CommunityPost = {
  id: string;
  author_id: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  moderation_status: string;
  moderation_reason: string | null;
};

export type CommunityQuestClaim = {
  id: number;
  user_id: string;
  quest_code: string;
  period_key: string;
  reward: number;
  claimed_at: string;
};

export type CommunityQuestEvent = {
  id: number;
  user_id: string;
  event_type: string;
  subject_id: string | null;
  event_date: string;
  created_at: string;
};

export type CommunityReport = {
  id: string;
  reporter_id: string;
  target_type: string;
  post_id: string;
  comment_id: string | null;
  reason: string;
  details: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  resolution_note: string | null;
  created_at: string;
  updated_at: string;
};

export type DevelopmentLog = {
  id: string;
  repo: string;
  branch: string;
  commit_sha: string;
  commit_message: string;
  commit_url: string | null;
  author_name: string | null;
  author_username: string | null;
  app_area: string;
  category: string;
  changed_files: Record<string, unknown>;
  is_public: boolean;
  pushed_at: string;
  created_at: string;
};

export type GuardianConsent = {
  id: string;
  user_id: string;
  guardian_email: string;
  status: string;
  token_hash: string;
  terms_document_id: string;
  privacy_document_id: string;
  requested_at: string;
  expires_at: string;
  responded_at: string | null;
  revoked_at: string | null;
  created_at: string;
  updated_at: string;
  delivery_status: string;
  delivered_at: string | null;
  delivery_error_code: string | null;
};

export type HarmonyAccount = {
  user_id: string;
  points: number;
  level_floor: number;
  updated_at: string;
};

export type HarmonyLedger = {
  id: number;
  user_id: string;
  amount: number;
  balance_after: number;
  source_type: string;
  source_key: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type LegalDocumentVersion = {
  id: string;
  document_type: string;
  version: string;
  title: string;
  document_path: string;
  effective_at: string;
  published_at: string;
  is_active: boolean;
  created_at: string;
};

export type LifetopiaFounderRegistry = {
  singleton: boolean;
  user_id: string;
  username_at_provisioning: string;
  provisioned_at: string;
};

export type LifetopiaRoleCatalog = {
  role_code: string;
  label: string;
  description: string;
  priority: number;
  is_staff: boolean;
  created_at: string;
};

export type ProfileBadge = {
  user_id: string;
  badge_code: string;
  granted_at: string;
};

export type ProfilePrivate = {
  user_id: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  requires_username_update: boolean;
  account_status: string;
  status_updated_at: string;
  suspended_until: string | null;
  restriction_reason: string | null;
  deletion_scheduled_for: string | null;
  deleted_at: string | null;
  email_verified_at: string | null;
  legal_reconsent_required: boolean;
  guardian_consent_required: boolean;
  guardian_consent_status: string;
  guardian_consent_verified_at: string | null;
  free_username_change_used: boolean;
  legacy_migration_version: string | null;
  legacy_migrated_at: string | null;
};

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  gender: string;
  avatar_id: string;
  country_code: string;
  country_name: string;
  account_type: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type WalletLinkChallenge = {
  id: string;
  user_id: string;
  chain: string;
  address: string;
  nonce: string;
  message: string;
  expires_at: string;
  consumed_at: string | null;
  created_at: string;
};

export type WalletLoginChallenge = {
  id: string;
  chain: string;
  address: string;
  nonce: string;
  message: string;
  request_fingerprint: string;
  expires_at: string;
  consumed_at: string | null;
  created_at: string;
};

export type WalletLoginEvent = {
  id: string;
  user_id: string;
  wallet_id: string;
  challenge_id: string;
  chain: string;
  address: string;
  event_type: string;
  success: boolean;
  error_code: string | null;
  request_id: string;
  created_at: string;
};

export type WalletSecurityEvent = {
  id: string;
  user_id: string;
  wallet_id: string | null;
  chain: string;
  address: string;
  event_type: string;
  request_id: string;
  created_at: string;
};

---

## AI Instructions

- Treat these generated types as the source of truth.
- Do not invent fields.
- Do not rename snake_case fields unless explicitly mapping them.
- Use `display_name`, not `displayName`, when reading directly from Supabase.
- Use `country_name`, not `country`.
- Use `avatar_id`, not `avatar`.
- Use `profiles.id`, not `profiles.user_id`.

