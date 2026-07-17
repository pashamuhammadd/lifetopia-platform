-- Lifetopia Authentication
-- Auth 5 — Secure registration finalization
--
-- Run only after auth-5-preflight.sql returns passed = true
-- for every check.
--
-- The function is callable only with the server secret/service-role client.
-- It atomically:
--   1. confirms that the Auth user and profile rows exist;
--   2. verifies the active Terms and Privacy versions;
--   3. records both legal consents;
--   4. clears legal_reconsent_required for the new account.
--
-- Existing users are not modified.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

create or replace function
  public.complete_lifetopia_registration(
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
  v_terms_document_id uuid;
  v_privacy_document_id uuid;
  v_active_consent_count integer;
begin
  if p_user_id is null then
    raise exception
      'Registration user ID is required.';
  end if;

  if p_source_app <> 'website' then
    raise exception
      'Invalid registration source.';
  end if;

  if not exists (
    select 1
    from auth.users auth_user
    where auth_user.id = p_user_id
  ) then
    raise exception
      'Registration Auth user does not exist.';
  end if;

  if not exists (
    select 1
    from public.profiles profile
    where profile.id = p_user_id
  ) then
    raise exception
      'Registration public profile does not exist.';
  end if;

  if not exists (
    select 1
    from public.profile_private
      private_profile
    where private_profile.user_id =
      p_user_id
  ) then
    raise exception
      'Registration private profile does not exist.';
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

  if v_terms_document_id is null then
    raise exception
      'The Terms version is not active.';
  end if;

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

  if v_privacy_document_id is null then
    raise exception
      'The Privacy version is not active.';
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
      'registration',
      p_source_app,
      null
    ),
    (
      p_user_id,
      v_privacy_document_id,
      now(),
      'registration',
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
      'Registration legal consent is incomplete.';
  end if;

  update public.profile_private
  set
    legal_reconsent_required = false,
    updated_at = now()
  where user_id = p_user_id;

  if not found then
    raise exception
      'Registration private profile update failed.';
  end if;

  return jsonb_build_object(
    'success',
      true,
    'user_id',
      p_user_id,
    'terms_version',
      p_terms_version,
    'privacy_version',
      p_privacy_version
  );
end;
$function$;

comment on function
  public.complete_lifetopia_registration(
    uuid,
    text,
    text,
    text
  )
is
  'Server-only atomic finalization for a newly created Lifetopia account and its current legal-document consent records.';

revoke all
on function
  public.complete_lifetopia_registration(
    uuid,
    text,
    text,
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.complete_lifetopia_registration(
    uuid,
    text,
    text,
    text
  )
to service_role;

commit;

select
  function_namespace.nspname
    as function_schema,
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
  and function_record.proname =
    'complete_lifetopia_registration';
