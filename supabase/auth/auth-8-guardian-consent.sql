-- Lifetopia Authentication
-- Auth 8 — Guardian consent workflow
--
-- Run only after auth-8-preflight.sql returns passed = true
-- for every check.
--
-- The workflow:
--   - requires an authenticated and email-verified minor account;
--   - requires current legal consent and a permanent username;
--   - stores only a SHA-256 token hash;
--   - expires links after seven days;
--   - limits requests to once every 180 seconds;
--   - requires a separate guardian action to approve or reject;
--   - keeps guardian email and response history private.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

alter table public.guardian_consents
  add column delivery_status text
    not null default 'pending'
    check (
      delivery_status in (
        'pending',
        'sent',
        'failed'
      )
    ),
  add column delivered_at timestamptz,
  add column delivery_error_code text;

create unique index
  guardian_consents_one_pending_per_user
on public.guardian_consents (
  user_id
)
where status = 'pending';

create or replace function
  public.create_lifetopia_guardian_consent_request(
    p_user_id uuid,
    p_guardian_email text,
    p_token_hash text,
    p_expires_at timestamptz
  )
returns table (
    request_id uuid,
    allowed boolean,
    retry_after_seconds integer,
    expires_at timestamptz,
    child_display_name text,
    child_username text,
    terms_version text,
    privacy_version text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_private public.profile_private%rowtype;
  v_profile public.profiles%rowtype;
  v_existing public.guardian_consents%rowtype;
  v_terms_id uuid;
  v_terms_version text;
  v_privacy_id uuid;
  v_privacy_version text;
  v_request_id uuid;
  v_retry integer;
  v_guardian_email text :=
    lower(btrim(coalesce(
      p_guardian_email,
      ''
    )));
begin
  if p_user_id is null then
    raise exception
      'Guardian request user is required.';
  end if;

  if v_guardian_email = '' then
    raise exception
      'Guardian email is required.';
  end if;

  if p_token_hash is null
    or char_length(p_token_hash) <> 64
  then
    raise exception
      'Guardian token hash is invalid.';
  end if;

  if p_expires_at <= now() then
    raise exception
      'Guardian request expiration is invalid.';
  end if;

  select *
  into v_private
  from public.profile_private
  where user_id = p_user_id
  for update;

  if not found then
    raise exception
      'Private profile does not exist.';
  end if;

  select *
  into v_profile
  from public.profiles
  where id = p_user_id;

  if not found then
    raise exception
      'Public profile does not exist.';
  end if;

  if v_private.account_status <>
    'active'
  then
    raise exception
      'Account is not active.';
  end if;

  if v_private.email_verified_at
    is null
  then
    raise exception
      'Email verification is required.';
  end if;

  if v_private
    .legal_reconsent_required
  then
    raise exception
      'Current legal consent is required.';
  end if;

  if v_private
    .requires_username_update
  then
    raise exception
      'Permanent username selection is required.';
  end if;

  if not v_private
    .guardian_consent_required
  then
    raise exception
      'Guardian consent is not required.';
  end if;

  if v_private
    .guardian_consent_status =
      'approved'
  then
    raise exception
      'Guardian consent is already approved.';
  end if;

  select *
  into v_existing
  from public.guardian_consents
  where user_id = p_user_id
    and status = 'pending'
  order by requested_at desc
  limit 1
  for update;

  if found
    and v_existing.expires_at > now()
    and v_existing.requested_at >
      now() - interval '180 seconds'
  then
    v_retry :=
      greatest(
        1,
        ceil(
          extract(
            epoch from
              (
                v_existing.requested_at +
                interval '180 seconds' -
                now()
              )
          )
        )::integer
      );

    return query
    select
      v_existing.id,
      false,
      v_retry,
      v_existing.expires_at,
      v_profile.display_name,
      v_profile.username::text,
      null::text,
      null::text;
    return;
  end if;

  update public.guardian_consents
  set
    status = 'expired',
    responded_at = coalesce(
      responded_at,
      now()
    ),
    updated_at = now()
  where user_id = p_user_id
    and status = 'pending';

  select
    legal_document.id,
    legal_document.version
  into
    v_terms_id,
    v_terms_version
  from public.legal_document_versions
    legal_document
  where legal_document.document_type =
      'terms'
    and legal_document.is_active
    and legal_document.published_at <=
      now();

  select
    legal_document.id,
    legal_document.version
  into
    v_privacy_id,
    v_privacy_version
  from public.legal_document_versions
    legal_document
  where legal_document.document_type =
      'privacy'
    and legal_document.is_active
    and legal_document.published_at <=
      now();

  if v_terms_id is null
    or v_privacy_id is null
  then
    raise exception
      'Active legal documents are unavailable.';
  end if;

  insert into public.guardian_consents (
    user_id,
    guardian_email,
    status,
    token_hash,
    terms_document_id,
    privacy_document_id,
    requested_at,
    expires_at,
    delivery_status
  )
  values (
    p_user_id,
    v_guardian_email,
    'pending',
    p_token_hash,
    v_terms_id,
    v_privacy_id,
    now(),
    p_expires_at,
    'pending'
  )
  returning id
  into v_request_id;

  update public.profile_private
  set
    guardian_consent_status =
      'pending',
    guardian_consent_verified_at =
      null,
    updated_at = now()
  where user_id = p_user_id;

  return query
  select
    v_request_id,
    true,
    180,
    p_expires_at,
    v_profile.display_name,
    v_profile.username::text,
    v_terms_version,
    v_privacy_version;
end;
$function$;

create or replace function
  public.complete_lifetopia_guardian_consent_delivery(
    p_request_id uuid,
    p_success boolean,
    p_error_code text
  )
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  update public.guardian_consents
  set
    delivery_status =
      case
        when p_success
          then 'sent'
        else 'failed'
      end,
    delivered_at =
      case
        when p_success
          then now()
        else delivered_at
      end,
    delivery_error_code =
      case
        when p_success
          then null
        else left(
          coalesce(
            p_error_code,
            'unknown'
          ),
          120
        )
      end,
    updated_at = now()
  where id = p_request_id
    and status = 'pending';

  if not found then
    raise exception
      'Pending guardian request does not exist.';
  end if;
end;
$function$;

create or replace function
  public.preview_lifetopia_guardian_consent(
    p_token_hash text
  )
returns table (
    valid boolean,
    guardian_status text,
    child_display_name text,
    child_username text,
    guardian_email text,
    expires_at timestamptz,
    terms_version text,
    privacy_version text
  )
language sql
security definer
stable
set search_path = pg_catalog
as $function$
  select
    (
      guardian.status = 'pending'
      and guardian.expires_at > now()
      and guardian.delivery_status =
        'sent'
    ) as valid,
    guardian.status,
    profile.display_name,
    profile.username::text,
    guardian.guardian_email::text,
    guardian.expires_at,
    terms.version,
    privacy.version
  from public.guardian_consents
    guardian
  join public.profiles profile
    on profile.id =
      guardian.user_id
  join public.legal_document_versions
    terms
    on terms.id =
      guardian.terms_document_id
  join public.legal_document_versions
    privacy
    on privacy.id =
      guardian.privacy_document_id
  where guardian.token_hash =
    p_token_hash
  limit 1;
$function$;

create or replace function
  public.respond_lifetopia_guardian_consent(
    p_token_hash text,
    p_decision text
  )
returns table (
    guardian_status text,
    child_username text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_guardian public.guardian_consents%rowtype;
  v_child_username text;
begin
  if p_decision not in (
    'approved',
    'rejected'
  ) then
    raise exception
      'Guardian decision is invalid.';
  end if;

  select *
  into v_guardian
  from public.guardian_consents
  where token_hash =
    p_token_hash
  for update;

  if not found then
    raise exception
      'Guardian request does not exist.';
  end if;

  if v_guardian.status <>
    'pending'
  then
    raise exception
      'Guardian request was already completed.';
  end if;

  if v_guardian.delivery_status <>
    'sent'
  then
    raise exception
      'Guardian request email was not delivered.';
  end if;

  if v_guardian.expires_at <= now()
  then
    update public.guardian_consents
    set
      status = 'expired',
      responded_at = now(),
      updated_at = now()
    where id = v_guardian.id;

    update public.profile_private
    set
      guardian_consent_status =
        'expired',
      guardian_consent_verified_at =
        null,
      updated_at = now()
    where user_id =
      v_guardian.user_id;

    raise exception
      'Guardian request expired.';
  end if;

  update public.guardian_consents
  set
    status = p_decision,
    responded_at = now(),
    updated_at = now()
  where id = v_guardian.id;

  update public.profile_private
  set
    guardian_consent_status =
      p_decision,
    guardian_consent_verified_at =
      case
        when p_decision =
          'approved'
        then now()
        else null
      end,
    updated_at = now()
  where user_id =
    v_guardian.user_id;

  select profile.username::text
  into v_child_username
  from public.profiles profile
  where profile.id =
    v_guardian.user_id;

  return query
  select
    p_decision,
    v_child_username;
end;
$function$;

comment on function
  public.create_lifetopia_guardian_consent_request(
    uuid,
    text,
    text,
    timestamptz
  )
is
  'Server-only creation of a guardian request after checking account eligibility and 180-second cooldown.';

comment on function
  public.preview_lifetopia_guardian_consent(
    text
  )
is
  'Server-only preview of a guardian request from a hashed token.';

comment on function
  public.respond_lifetopia_guardian_consent(
    text,
    text
  )
is
  'Server-only approval or rejection of an unexpired delivered guardian request.';

revoke all
on function
  public.create_lifetopia_guardian_consent_request(
    uuid,
    text,
    text,
    timestamptz
  )
from public, anon, authenticated;

revoke all
on function
  public.complete_lifetopia_guardian_consent_delivery(
    uuid,
    boolean,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.preview_lifetopia_guardian_consent(
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.respond_lifetopia_guardian_consent(
    text,
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.create_lifetopia_guardian_consent_request(
    uuid,
    text,
    text,
    timestamptz
  )
to service_role;

grant execute
on function
  public.complete_lifetopia_guardian_consent_delivery(
    uuid,
    boolean,
    text
  )
to service_role;

grant execute
on function
  public.preview_lifetopia_guardian_consent(
    text
  )
to service_role;

grant execute
on function
  public.respond_lifetopia_guardian_consent(
    text,
    text
  )
to service_role;

commit;

select
  function_record.proname
    as function_name,
  pg_get_function_identity_arguments(
    function_record.oid
  ) as arguments
from pg_proc function_record
join pg_namespace function_namespace
  on function_namespace.oid =
    function_record.pronamespace
where function_namespace.nspname =
    'public'
  and function_record.proname in (
    'create_lifetopia_guardian_consent_request',
    'complete_lifetopia_guardian_consent_delivery',
    'preview_lifetopia_guardian_consent',
    'respond_lifetopia_guardian_consent'
  )
order by function_record.proname;
