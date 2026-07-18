-- Lifetopia Authentication
-- Auth 10 — Account access completion functions
--
-- Run only after auth-10-preflight.sql returns passed = true.
--
-- This migration creates server-only completion functions for:
--   - accepting current legal documents;
--   - replacing a required temporary username.
--
-- It does not consume the user's one free username change.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

create or replace function
  public.complete_lifetopia_legal_reconsent(
    p_user_id uuid,
    p_terms_version text,
    p_privacy_version text,
    p_source_app text
  )
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_private public.profile_private%rowtype;
  v_terms_document_id uuid;
  v_privacy_document_id uuid;
  v_active_consent_count integer;
begin
  if p_user_id is null then
    raise exception
      'Account user ID is required.';
  end if;

  if p_source_app not in (
    'website',
    'community',
    'game'
  ) then
    raise exception
      'Invalid consent source.';
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

  if v_private.account_status =
    'deleted'
  then
    raise exception
      'Deleted account cannot accept legal documents.';
  end if;

  if v_private.email_verified_at
    is null
  then
    raise exception
      'Email verification is required.';
  end if;

  select legal_document.id
  into v_terms_document_id
  from public.legal_document_versions
    legal_document
  where legal_document.document_type =
      'terms'
    and legal_document.version =
      p_terms_version
    and legal_document.is_active
    and legal_document.published_at <=
      now();

  select legal_document.id
  into v_privacy_document_id
  from public.legal_document_versions
    legal_document
  where legal_document.document_type =
      'privacy'
    and legal_document.version =
      p_privacy_version
    and legal_document.is_active
    and legal_document.published_at <=
      now();

  if v_terms_document_id is null
    or v_privacy_document_id is null
  then
    raise exception
      'Current legal document versions do not match.';
  end if;

  insert into public.account_legal_consents (
    user_id,
    document_id,
    consented_at,
    consent_method,
    source_app,
    withdrawn_at
  )
  values
    (
      p_user_id,
      v_terms_document_id,
      now(),
      'reconsent',
      p_source_app,
      null
    ),
    (
      p_user_id,
      v_privacy_document_id,
      now(),
      'reconsent',
      p_source_app,
      null
    )
  on conflict (
    user_id,
    document_id
  )
  do update
  set
    consented_at =
      excluded.consented_at,
    consent_method =
      excluded.consent_method,
    source_app =
      excluded.source_app,
    withdrawn_at = null;

  select count(*)
  into v_active_consent_count
  from public.legal_document_versions
    legal_document
  where legal_document.is_active
    and legal_document.document_type
      in ('terms', 'privacy')
    and exists (
      select 1
      from public.account_legal_consents
        legal_consent
      where legal_consent.user_id =
          p_user_id
        and legal_consent.document_id =
          legal_document.id
        and legal_consent.withdrawn_at
          is null
    );

  if v_active_consent_count <> 2 then
    raise exception
      'Current legal consent is incomplete.';
  end if;

  update public.profile_private
  set
    legal_reconsent_required =
      false,
    updated_at = now()
  where user_id = p_user_id;

  return jsonb_build_object(
    'success', true,
    'terms_version',
      p_terms_version,
    'privacy_version',
      p_privacy_version
  );
end;
$function$;

create or replace function
  public.complete_lifetopia_required_username_selection(
    p_user_id uuid,
    p_new_username public.citext
  )
returns table (
    username text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_private public.profile_private%rowtype;
  v_old_username public.citext;
  v_new_username public.citext :=
    lower(
      btrim(
        coalesce(
          p_new_username::text,
          ''
        )
      )
    )::public.citext;
begin
  if p_user_id is null then
    raise exception
      'Account user ID is required.';
  end if;

  if char_length(
    v_new_username::text
  ) not between 4 and 16
  then
    raise exception
      'Username must contain 4 to 16 characters.';
  end if;

  if v_new_username::text !~
    '^[a-z0-9_]+$'
  then
    raise exception
      'Username contains invalid characters.';
  end if;

  if v_new_username::text like
    '%___%'
  then
    raise exception
      'Username contains too many consecutive underscores.';
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

  if v_private.account_status <>
    'active'
  then
    raise exception
      'Account must be active.';
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

  if not v_private
    .requires_username_update
  then
    raise exception
      'This account does not require username selection.';
  end if;

  select profile.username
  into v_old_username
  from public.profiles profile
  where profile.id = p_user_id
  for update;

  if not found then
    raise exception
      'Public profile does not exist.';
  end if;

  if lower(
    v_old_username::text
  ) = lower(
    v_new_username::text
  ) then
    raise exception
      'Choose a different username.';
  end if;

  update public.profiles
  set
    username = v_new_username,
    updated_at = now()
  where id = p_user_id;

  update auth.users
  set
    raw_user_meta_data =
      jsonb_set(
        coalesce(
          raw_user_meta_data,
          '{}'::jsonb
        ),
        '{username}',
        to_jsonb(
          v_new_username::text
        ),
        true
      ),
    updated_at = now()
  where id = p_user_id;

  insert into public.account_username_changes (
    user_id,
    old_username,
    new_username,
    change_type,
    consumed_free_change,
    changed_by,
    changed_at
  )
  values (
    p_user_id,
    v_old_username,
    v_new_username,
    'required_selection',
    false,
    p_user_id,
    now()
  );

  update public.profile_private
  set
    requires_username_update =
      false,
    updated_at = now()
  where user_id = p_user_id;

  return query
  select v_new_username::text;
end;
$function$;

comment on function
  public.complete_lifetopia_legal_reconsent(
    uuid,
    text,
    text,
    text
  )
is
  'Server-only acceptance of the active Lifetopia Terms and Privacy versions for an authenticated account.';

comment on function
  public.complete_lifetopia_required_username_selection(
    uuid,
    citext
  )
is
  'Server-only replacement of a migration-assigned temporary username without consuming the one free username change.';

revoke all
on function
  public.complete_lifetopia_legal_reconsent(
    uuid,
    text,
    text,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.complete_lifetopia_required_username_selection(
    uuid,
    citext
  )
from public, anon, authenticated;

grant execute
on function
  public.complete_lifetopia_legal_reconsent(
    uuid,
    text,
    text,
    text
  )
to service_role;

grant execute
on function
  public.complete_lifetopia_required_username_selection(
    uuid,
    citext
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
    'complete_lifetopia_legal_reconsent',
    'complete_lifetopia_required_username_selection'
  )
order by function_record.proname;
