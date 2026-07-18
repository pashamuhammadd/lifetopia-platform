-- Lifetopia Authentication
-- Auth 12 — Password recovery
--
-- Run only after auth-12-preflight.sql returns passed = true.
--
-- Security:
--   - generic request response prevents email enumeration;
--   - raw reset tokens are never stored;
--   - links expire after 30 minutes;
--   - links are single use;
--   - only the newest active request remains pending;
--   - email request cooldown is 180 seconds;
--   - client roles cannot read or modify recovery records.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

create table
  public.account_password_reset_requests (
    id uuid primary key
      default gen_random_uuid(),
    user_id uuid not null
      references public.profiles(id)
      on delete cascade,
    token_hash text not null unique
      check (
        token_hash ~
          '^[a-f0-9]{64}$'
      ),
    return_path text not null
      default '/',
    status text not null
      default 'pending'
      check (
        status in (
          'pending',
          'used',
          'expired',
          'replaced',
          'delivery_failed'
        )
      ),
    requested_at timestamptz
      not null default now(),
    expires_at timestamptz
      not null,
    delivered_at timestamptz,
    used_at timestamptz,
    delivery_error_code text,
    updated_at timestamptz
      not null default now()
  );

comment on table
  public.account_password_reset_requests
is
  'Private server-only, single-use Lifetopia password reset requests storing SHA-256 token hashes only.';

create unique index
  account_password_reset_one_pending_per_user
on public.account_password_reset_requests (
  user_id
)
where status = 'pending';

create index
  account_password_reset_user_time_idx
on public.account_password_reset_requests (
  user_id,
  requested_at desc
);

create index
  account_password_reset_expiry_idx
on public.account_password_reset_requests (
  expires_at
)
where status = 'pending';

alter table
  public.account_password_reset_requests
enable row level security;

revoke all
on table
  public.account_password_reset_requests
from public, anon, authenticated;

grant all
on table
  public.account_password_reset_requests
to service_role;

create or replace function
  public.create_lifetopia_password_reset_request(
    p_email text,
    p_token_hash text,
    p_expires_at timestamptz,
    p_return_path text
  )
returns table (
    request_id uuid,
    allowed boolean,
    retry_after_seconds integer,
    resolved_email text,
    display_name text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_email text :=
    lower(
      btrim(
        coalesce(
          p_email,
          ''
        )
      )
    );
  v_user_id uuid;
  v_display_name text;
  v_existing public.account_password_reset_requests%rowtype;
  v_request_id uuid;
  v_retry integer;
begin
  if v_email = '' then
    return query
    select
      null::uuid,
      false,
      180,
      null::text,
      null::text;
    return;
  end if;

  if p_token_hash !~
      '^[a-f0-9]{64}$'
  then
    raise exception
      'Password reset token hash is invalid.';
  end if;

  if p_expires_at <= now()
    or p_expires_at >
      now() + interval '31 minutes'
  then
    raise exception
      'Password reset expiration is invalid.';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(
      v_email,
      0
    )
  );

  select
    auth_user.id,
    profile.display_name
  into
    v_user_id,
    v_display_name
  from auth.users auth_user
  join public.profiles profile
    on profile.id =
      auth_user.id
  where lower(auth_user.email) =
      v_email
  limit 1;

  if v_user_id is null then
    return query
    select
      null::uuid,
      false,
      180,
      null::text,
      null::text;
    return;
  end if;

  select *
  into v_existing
  from public.account_password_reset_requests
  where user_id =
      v_user_id
    and status =
      'pending'
  order by requested_at desc
  limit 1
  for update;

  if found
    and v_existing.requested_at >
      now() - interval '180 seconds'
  then
    v_retry :=
      greatest(
        1,
        ceil(
          extract(
            epoch from (
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
      null::text,
      null::text;
    return;
  end if;

  update
    public.account_password_reset_requests
  set
    status =
      case
        when expires_at <= now()
          then 'expired'
        else 'replaced'
      end,
    updated_at = now()
  where user_id =
      v_user_id
    and status =
      'pending';

  insert into
    public.account_password_reset_requests (
      user_id,
      token_hash,
      return_path,
      status,
      requested_at,
      expires_at
    )
  values (
    v_user_id,
    p_token_hash,
    coalesce(
      nullif(
        btrim(p_return_path),
        ''
      ),
      '/'
    ),
    'pending',
    now(),
    p_expires_at
  )
  returning id
  into v_request_id;

  return query
  select
    v_request_id,
    true,
    180,
    v_email,
    v_display_name;
end;
$function$;

create or replace function
  public.complete_lifetopia_password_reset_delivery(
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
  update
    public.account_password_reset_requests
  set
    status =
      case
        when p_success
          then status
        else 'delivery_failed'
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
  where id =
      p_request_id
    and status =
      'pending';

  if not found then
    raise exception
      'Pending password reset request does not exist.';
  end if;
end;
$function$;

create or replace function
  public.preview_lifetopia_password_reset(
    p_token_hash text
  )
returns table (
    valid boolean,
    user_id uuid,
    email text,
    username text,
    return_path text
  )
language sql
security definer
stable
set search_path = pg_catalog
as $function$
  select
    (
      request.status =
        'pending'
      and request.expires_at >
        now()
      and request.delivered_at
        is not null
    ) as valid,
    request.user_id,
    auth_user.email::text,
    profile.username::text,
    request.return_path
  from
    public.account_password_reset_requests
      request
  join auth.users auth_user
    on auth_user.id =
      request.user_id
  join public.profiles profile
    on profile.id =
      request.user_id
  where request.token_hash =
      p_token_hash
  limit 1;
$function$;

create or replace function
  public.complete_lifetopia_password_reset(
    p_token_hash text
  )
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_request public.account_password_reset_requests%rowtype;
begin
  select *
  into v_request
  from public.account_password_reset_requests
  where token_hash =
      p_token_hash
  for update;

  if not found then
    raise exception
      'Password reset request does not exist.';
  end if;

  if v_request.status <>
      'pending'
    or v_request.expires_at <=
      now()
    or v_request.delivered_at
      is null
  then
    raise exception
      'Password reset request is unavailable.';
  end if;

  update
    public.account_password_reset_requests
  set
    status = 'used',
    used_at = now(),
    updated_at = now()
  where id =
      v_request.id;

  update
    public.account_password_reset_requests
  set
    status = 'replaced',
    updated_at = now()
  where user_id =
      v_request.user_id
    and status =
      'pending'
    and id <>
      v_request.id;
end;
$function$;

comment on function
  public.create_lifetopia_password_reset_request(
    text,
    text,
    timestamptz,
    text
  )
is
  'Server-only creation of a generic, cooldown-protected, 30-minute Lifetopia password reset request.';

comment on function
  public.preview_lifetopia_password_reset(
    text
  )
is
  'Server-only validation of a delivered, unexpired, unused password reset token hash.';

comment on function
  public.complete_lifetopia_password_reset(
    text
  )
is
  'Server-only single-use completion of a Lifetopia password reset request.';

revoke all
on function
  public.create_lifetopia_password_reset_request(
    text,
    text,
    timestamptz,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.complete_lifetopia_password_reset_delivery(
    uuid,
    boolean,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.preview_lifetopia_password_reset(
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.complete_lifetopia_password_reset(
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.create_lifetopia_password_reset_request(
    text,
    text,
    timestamptz,
    text
  )
to service_role;

grant execute
on function
  public.complete_lifetopia_password_reset_delivery(
    uuid,
    boolean,
    text
  )
to service_role;

grant execute
on function
  public.preview_lifetopia_password_reset(
    text
  )
to service_role;

grant execute
on function
  public.complete_lifetopia_password_reset(
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
    'create_lifetopia_password_reset_request',
    'complete_lifetopia_password_reset_delivery',
    'preview_lifetopia_password_reset',
    'complete_lifetopia_password_reset'
  )
order by function_record.proname;
