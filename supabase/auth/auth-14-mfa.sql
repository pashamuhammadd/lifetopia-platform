-- Lifetopia Authentication
-- Auth 14 — TOTP MFA audit and login state
--
-- Supabase Auth remains the source of truth for factors, challenges,
-- verification, AAL, and session upgrades.
--
-- Lifetopia adds:
--   - a private non-secret audit trail;
--   - mfa_required as a successful first-factor login outcome.
--
-- No TOTP secret, QR content, code, password, or raw recovery data
-- is stored in public tables.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

alter table
  public.account_auth_attempts
drop constraint if exists
  account_auth_attempts_outcome_check;

alter table
  public.account_auth_attempts
add constraint
  account_auth_attempts_outcome_check
check (
  outcome in (
    'pending',
    'success',
    'invalid_credentials',
    'email_verification_required',
    'mfa_required',
    'restricted',
    'account_unavailable',
    'rate_limited',
    'captcha_required',
    'captcha_failed',
    'system_error'
  )
);

create or replace function
  public.complete_lifetopia_login_attempt(
    p_attempt_id uuid,
    p_outcome text,
    p_user_id uuid
  )
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  if p_outcome not in (
    'success',
    'invalid_credentials',
    'email_verification_required',
    'mfa_required',
    'restricted',
    'account_unavailable',
    'system_error'
  ) then
    raise exception
      'Login attempt outcome is invalid.';
  end if;

  update public.account_auth_attempts
  set
    user_id = p_user_id,
    outcome = p_outcome,
    completed_at = now()
  where id = p_attempt_id
    and outcome = 'pending';

  if not found then
    raise exception
      'Pending login attempt does not exist.';
  end if;
end;
$function$;

create table
  public.account_mfa_events (
    id uuid primary key
      default gen_random_uuid(),
    user_id uuid not null
      references public.profiles(id)
      on delete cascade,
    factor_id uuid,
    event_type text not null
      check (
        event_type in (
          'enrollment_started',
          'enrollment_verified',
          'enrollment_cancelled',
          'challenge_succeeded',
          'challenge_failed',
          'factor_removed'
        )
      ),
    success boolean not null,
    error_code text,
    created_at timestamptz
      not null default now()
  );

comment on table
  public.account_mfa_events
is
  'Private server-only Lifetopia MFA audit. It never stores TOTP secrets, QR data, codes, or passwords.';

create index
  account_mfa_events_user_time_idx
on public.account_mfa_events (
  user_id,
  created_at desc
);

create index
  account_mfa_events_type_time_idx
on public.account_mfa_events (
  event_type,
  created_at desc
);

alter table
  public.account_mfa_events
enable row level security;

revoke all
on table
  public.account_mfa_events
from public, anon, authenticated;

grant all
on table
  public.account_mfa_events
to service_role;

create or replace function
  public.record_lifetopia_mfa_event(
    p_user_id uuid,
    p_factor_id uuid,
    p_event_type text,
    p_success boolean,
    p_error_code text
  )
returns uuid
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_event_id uuid;
begin
  if p_user_id is null then
    raise exception
      'MFA audit user ID is required.';
  end if;

  if p_event_type not in (
    'enrollment_started',
    'enrollment_verified',
    'enrollment_cancelled',
    'challenge_succeeded',
    'challenge_failed',
    'factor_removed'
  ) then
    raise exception
      'MFA audit event type is invalid.';
  end if;

  if not exists (
    select 1
    from public.profiles profile
    where profile.id = p_user_id
  ) then
    raise exception
      'MFA audit profile does not exist.';
  end if;

  insert into
    public.account_mfa_events (
      user_id,
      factor_id,
      event_type,
      success,
      error_code,
      created_at
    )
  values (
    p_user_id,
    p_factor_id,
    p_event_type,
    p_success,
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
    now()
  )
  returning id
  into v_event_id;

  return v_event_id;
end;
$function$;

comment on function
  public.record_lifetopia_mfa_event(
    uuid,
    uuid,
    text,
    boolean,
    text
  )
is
  'Server-only MFA security event writer without TOTP secrets, codes, QR data, or passwords.';

revoke all
on function
  public.record_lifetopia_mfa_event(
    uuid,
    uuid,
    text,
    boolean,
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.record_lifetopia_mfa_event(
    uuid,
    uuid,
    text,
    boolean,
    text
  )
to service_role;

revoke all
on function
  public.complete_lifetopia_login_attempt(
    uuid,
    text,
    uuid
  )
from public, anon, authenticated;

grant execute
on function
  public.complete_lifetopia_login_attempt(
    uuid,
    text,
    uuid
  )
to service_role;

commit;

select
  function_record.proname
    as function_name,
  pg_get_function_identity_arguments(
    function_record.oid
  ) as arguments,
  function_record.prosecdef
    as security_definer
from pg_proc function_record
join pg_namespace function_schema
  on function_schema.oid =
    function_record.pronamespace
where function_schema.nspname =
    'public'
  and function_record.proname in (
    'complete_lifetopia_login_attempt',
    'record_lifetopia_mfa_event'
  )
order by function_record.proname;
