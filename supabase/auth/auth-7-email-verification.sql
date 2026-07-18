-- Lifetopia Authentication
-- Auth 7 — Email verification delivery and cooldown
--
-- Run only after auth-7-preflight.sql returns passed = true
-- for every check.
--
-- The server reserves email delivery through a database-backed
-- 180-second cooldown. Clients cannot read or edit this audit table.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '60s';

create table
  public.account_email_verification_deliveries (
    user_id uuid primary key
      references public.profiles(id)
      on delete cascade,
    last_reason text not null
      check (
        last_reason in (
          'registration',
          'resend',
          'legacy_reverify'
        )
      ),
    last_requested_at timestamptz
      not null default now(),
    next_allowed_at timestamptz
      not null,
    last_delivered_at timestamptz,
    last_status text not null
      check (
        last_status in (
          'pending',
          'sent',
          'failed'
        )
      ),
    request_count integer
      not null default 1
      check (request_count > 0),
    failure_count integer
      not null default 0
      check (failure_count >= 0),
    last_error_code text,
    updated_at timestamptz
      not null default now()
  );

comment on table
  public.account_email_verification_deliveries
is
  'Private server-only delivery audit and 180-second cooldown for Lifetopia verification emails.';

alter table
  public.account_email_verification_deliveries
enable row level security;

revoke all
on table
  public.account_email_verification_deliveries
from public, anon, authenticated;

grant all
on table
  public.account_email_verification_deliveries
to service_role;

create or replace function
  public.reserve_lifetopia_verification_email(
    p_email text,
    p_reason text
  )
returns table (
  resolved_user_id uuid,
  email_verified boolean,
  allowed boolean,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_email text :=
    lower(btrim(coalesce(p_email, '')));
  v_user_id uuid;
  v_email_confirmed_at timestamptz;
  v_next_allowed_at timestamptz;
  v_retry_after integer;
begin
  if p_reason not in (
    'registration',
    'resend',
    'legacy_reverify'
  ) then
    raise exception
      'Invalid verification-email reason.';
  end if;

  if v_email = '' then
    return query
    select
      null::uuid,
      false,
      false,
      180;
    return;
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(v_email, 0)
  );

  select
    auth_user.id,
    auth_user.email_confirmed_at
  into
    v_user_id,
    v_email_confirmed_at
  from auth.users auth_user
  where lower(auth_user.email) =
    v_email
  limit 1;

  if v_user_id is null then
    return query
    select
      null::uuid,
      false,
      false,
      180;
    return;
  end if;

  if v_email_confirmed_at
    is not null
  then
    return query
    select
      v_user_id,
      true,
      false,
      0;
    return;
  end if;

  select delivery.next_allowed_at
  into v_next_allowed_at
  from
    public.account_email_verification_deliveries
      delivery
  where delivery.user_id =
    v_user_id
  for update;

  if v_next_allowed_at is not null
    and v_next_allowed_at > now()
  then
    v_retry_after :=
      greatest(
        1,
        ceil(
          extract(
            epoch from
              (
                v_next_allowed_at -
                now()
              )
          )
        )::integer
      );

    return query
    select
      v_user_id,
      false,
      false,
      v_retry_after;
    return;
  end if;

  insert into
    public.account_email_verification_deliveries (
      user_id,
      last_reason,
      last_requested_at,
      next_allowed_at,
      last_status,
      request_count,
      failure_count,
      last_error_code,
      updated_at
    )
  values (
    v_user_id,
    p_reason,
    now(),
    now() + interval '180 seconds',
    'pending',
    1,
    0,
    null,
    now()
  )
  on conflict (user_id)
  do update
  set
    last_reason =
      excluded.last_reason,
    last_requested_at =
      excluded.last_requested_at,
    next_allowed_at =
      excluded.next_allowed_at,
    last_status = 'pending',
    request_count =
      public
        .account_email_verification_deliveries
        .request_count + 1,
    last_error_code = null,
    updated_at = now();

  return query
  select
    v_user_id,
    false,
    true,
    180;
end;
$function$;

create or replace function
  public.complete_lifetopia_verification_delivery(
    p_user_id uuid,
    p_success boolean,
    p_error_code text
  )
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  update
    public.account_email_verification_deliveries
  set
    last_status =
      case
        when p_success
          then 'sent'
        else 'failed'
      end,
    last_delivered_at =
      case
        when p_success
          then now()
        else last_delivered_at
      end,
    failure_count =
      failure_count +
      case
        when p_success
          then 0
        else 1
      end,
    last_error_code =
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
  where user_id = p_user_id;

  if not found then
    raise exception
      'Verification delivery reservation does not exist.';
  end if;
end;
$function$;

comment on function
  public.reserve_lifetopia_verification_email(
    text,
    text
  )
is
  'Server-only reservation for verification email delivery with a fixed 180-second per-account cooldown.';

comment on function
  public.complete_lifetopia_verification_delivery(
    uuid,
    boolean,
    text
  )
is
  'Server-only completion audit for a reserved verification email delivery.';

revoke all
on function
  public.reserve_lifetopia_verification_email(
    text,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.complete_lifetopia_verification_delivery(
    uuid,
    boolean,
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.reserve_lifetopia_verification_email(
    text,
    text
  )
to service_role;

grant execute
on function
  public.complete_lifetopia_verification_delivery(
    uuid,
    boolean,
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
    'reserve_lifetopia_verification_email',
    'complete_lifetopia_verification_delivery'
  )
order by function_record.proname;
