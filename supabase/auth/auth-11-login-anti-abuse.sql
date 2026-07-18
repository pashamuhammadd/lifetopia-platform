-- Lifetopia Authentication
-- Auth 11 — Login anti-abuse
--
-- Run only after auth-11-preflight.sql returns passed = true.
--
-- Policy:
--   - a 15-minute rolling failure window;
--   - Turnstile required after three credential failures;
--   - hard cooldown after five credential failures;
--   - a higher IP-only threshold detects credential spraying while
--     reducing false positives on shared networks;
--   - successful credentials reset pair and identifier risk;
--   - raw IP addresses and identifiers are never stored.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

create table public.account_auth_attempts (
  id uuid primary key
    default gen_random_uuid(),
  user_id uuid
    references public.profiles(id)
    on delete set null,
  identifier_hash text not null
    check (
      identifier_hash ~
        '^[a-f0-9]{64}$'
    ),
  ip_hash text not null
    check (
      ip_hash ~
        '^[a-f0-9]{64}$'
    ),
  pair_hash text not null
    check (
      pair_hash ~
        '^[a-f0-9]{64}$'
    ),
  outcome text not null
    default 'pending'
    check (
      outcome in (
        'pending',
        'success',
        'invalid_credentials',
        'email_verification_required',
        'restricted',
        'account_unavailable',
        'rate_limited',
        'captcha_required',
        'captcha_failed',
        'system_error'
      )
    ),
  captcha_required boolean
    not null default false,
  captcha_supplied boolean
    not null default false,
  captcha_passed boolean
    not null default false,
  retry_after_seconds integer
    not null default 0
    check (
      retry_after_seconds >= 0
    ),
  requested_at timestamptz
    not null default now(),
  completed_at timestamptz
);

comment on table
  public.account_auth_attempts
is
  'Private server-only login security audit containing HMAC hashes instead of raw identifiers or IP addresses.';

create index
  account_auth_attempts_pair_time_idx
on public.account_auth_attempts (
  pair_hash,
  requested_at desc
);

create index
  account_auth_attempts_identifier_time_idx
on public.account_auth_attempts (
  identifier_hash,
  requested_at desc
);

create index
  account_auth_attempts_ip_time_idx
on public.account_auth_attempts (
  ip_hash,
  requested_at desc
);

create index
  account_auth_attempts_outcome_time_idx
on public.account_auth_attempts (
  outcome,
  requested_at desc
);

alter table
  public.account_auth_attempts
enable row level security;

revoke all
on table
  public.account_auth_attempts
from public, anon, authenticated;

grant all
on table
  public.account_auth_attempts
to service_role;

create or replace function
  public.reserve_lifetopia_login_attempt(
    p_identifier_hash text,
    p_ip_hash text,
    p_pair_hash text,
    p_captcha_supplied boolean,
    p_captcha_passed boolean
  )
returns table (
    attempt_id uuid,
    allowed boolean,
    captcha_required boolean,
    retry_after_seconds integer,
    risk_level text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_now timestamptz :=
    now();
  v_window_start timestamptz :=
    v_now - interval '15 minutes';

  v_pair_reset_at timestamptz;
  v_identifier_reset_at timestamptz;

  v_pair_failures integer := 0;
  v_identifier_failures integer := 0;
  v_ip_failures integer := 0;

  v_pair_threshold_at timestamptz;
  v_identifier_threshold_at timestamptz;
  v_ip_threshold_at timestamptz;

  v_pair_retry integer := 0;
  v_identifier_retry integer := 0;
  v_ip_retry integer := 0;
  v_retry integer := 0;

  v_blocked boolean := false;
  v_captcha_required boolean :=
    false;
  v_attempt_id uuid;
  v_outcome text;
  v_risk_level text;
begin
  if p_identifier_hash !~
      '^[a-f0-9]{64}$'
    or p_ip_hash !~
      '^[a-f0-9]{64}$'
    or p_pair_hash !~
      '^[a-f0-9]{64}$'
  then
    raise exception
      'Login risk hashes are invalid.';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended(
      p_pair_hash,
      0
    )
  );

  select max(attempt.requested_at)
  into v_pair_reset_at
  from public.account_auth_attempts
    attempt
  where attempt.pair_hash =
      p_pair_hash
    and attempt.outcome in (
      'success',
      'email_verification_required',
      'restricted',
      'account_unavailable'
    )
    and attempt.requested_at >=
      v_window_start;

  select max(attempt.requested_at)
  into v_identifier_reset_at
  from public.account_auth_attempts
    attempt
  where attempt.identifier_hash =
      p_identifier_hash
    and attempt.outcome in (
      'success',
      'email_verification_required',
      'restricted',
      'account_unavailable'
    )
    and attempt.requested_at >=
      v_window_start;

  v_pair_reset_at :=
    greatest(
      v_window_start,
      coalesce(
        v_pair_reset_at,
        v_window_start
      )
    );

  v_identifier_reset_at :=
    greatest(
      v_window_start,
      coalesce(
        v_identifier_reset_at,
        v_window_start
      )
    );

  select count(*)
  into v_pair_failures
  from public.account_auth_attempts
    attempt
  where attempt.pair_hash =
      p_pair_hash
    and attempt.outcome =
      'invalid_credentials'
    and attempt.requested_at >
      v_pair_reset_at;

  select count(*)
  into v_identifier_failures
  from public.account_auth_attempts
    attempt
  where attempt.identifier_hash =
      p_identifier_hash
    and attempt.outcome =
      'invalid_credentials'
    and attempt.requested_at >
      v_identifier_reset_at;

  select count(*)
  into v_ip_failures
  from public.account_auth_attempts
    attempt
  where attempt.ip_hash =
      p_ip_hash
    and attempt.outcome in (
      'invalid_credentials',
      'captcha_failed'
    )
    and attempt.requested_at >=
      v_window_start;

  if v_pair_failures >= 5 then
    select threshold_attempt.requested_at
    into v_pair_threshold_at
    from (
      select attempt.requested_at
      from public.account_auth_attempts
        attempt
      where attempt.pair_hash =
          p_pair_hash
        and attempt.outcome =
          'invalid_credentials'
        and attempt.requested_at >
          v_pair_reset_at
      order by attempt.requested_at desc
      offset 4
      limit 1
    ) threshold_attempt;

    v_pair_retry :=
      greatest(
        1,
        ceil(
          extract(
            epoch from (
              v_pair_threshold_at +
              interval '15 minutes' -
              v_now
            )
          )
        )::integer
      );
  end if;

  if v_identifier_failures >= 5 then
    select threshold_attempt.requested_at
    into v_identifier_threshold_at
    from (
      select attempt.requested_at
      from public.account_auth_attempts
        attempt
      where attempt.identifier_hash =
          p_identifier_hash
        and attempt.outcome =
          'invalid_credentials'
        and attempt.requested_at >
          v_identifier_reset_at
      order by attempt.requested_at desc
      offset 4
      limit 1
    ) threshold_attempt;

    v_identifier_retry :=
      greatest(
        1,
        ceil(
          extract(
            epoch from (
              v_identifier_threshold_at +
              interval '15 minutes' -
              v_now
            )
          )
        )::integer
      );
  end if;

  if v_ip_failures >= 25 then
    select threshold_attempt.requested_at
    into v_ip_threshold_at
    from (
      select attempt.requested_at
      from public.account_auth_attempts
        attempt
      where attempt.ip_hash =
          p_ip_hash
        and attempt.outcome in (
          'invalid_credentials',
          'captcha_failed'
        )
        and attempt.requested_at >=
          v_window_start
      order by attempt.requested_at desc
      offset 24
      limit 1
    ) threshold_attempt;

    v_ip_retry :=
      greatest(
        1,
        ceil(
          extract(
            epoch from (
              v_ip_threshold_at +
              interval '15 minutes' -
              v_now
            )
          )
        )::integer
      );
  end if;

  v_retry :=
    greatest(
      v_pair_retry,
      v_identifier_retry,
      v_ip_retry
    );

  v_blocked :=
    v_retry > 0;

  v_captcha_required :=
    v_pair_failures >= 3
    or v_identifier_failures >= 3
    or v_ip_failures >= 10;

  if v_blocked then
    v_risk_level := 'blocked';

    insert into
      public.account_auth_attempts (
        identifier_hash,
        ip_hash,
        pair_hash,
        outcome,
        captcha_required,
        captcha_supplied,
        captcha_passed,
        retry_after_seconds,
        requested_at,
        completed_at
      )
    values (
      p_identifier_hash,
      p_ip_hash,
      p_pair_hash,
      'rate_limited',
      true,
      p_captcha_supplied,
      p_captcha_passed,
      v_retry,
      v_now,
      v_now
    )
    returning id
    into v_attempt_id;

    return query
    select
      v_attempt_id,
      false,
      true,
      v_retry,
      v_risk_level;

    return;
  end if;

  if (
    v_captcha_required
    and (
      not p_captcha_supplied
      or not p_captcha_passed
    )
  )
  or (
    p_captcha_supplied
    and not p_captcha_passed
  )
  then
    v_outcome :=
      case
        when p_captcha_supplied
          then 'captcha_failed'
        else 'captcha_required'
      end;

    v_risk_level := 'challenge';

    insert into
      public.account_auth_attempts (
        identifier_hash,
        ip_hash,
        pair_hash,
        outcome,
        captcha_required,
        captcha_supplied,
        captcha_passed,
        retry_after_seconds,
        requested_at,
        completed_at
      )
    values (
      p_identifier_hash,
      p_ip_hash,
      p_pair_hash,
      v_outcome,
      true,
      p_captcha_supplied,
      p_captcha_passed,
      0,
      v_now,
      v_now
    )
    returning id
    into v_attempt_id;

    return query
    select
      v_attempt_id,
      false,
      true,
      0,
      v_risk_level;

    return;
  end if;

  v_risk_level :=
    case
      when v_captcha_required
        then 'challenge_passed'
      when greatest(
        v_pair_failures,
        v_identifier_failures
      ) > 0
        or v_ip_failures > 0
        then 'elevated'
      else 'normal'
    end;

  insert into
    public.account_auth_attempts (
      identifier_hash,
      ip_hash,
      pair_hash,
      outcome,
      captcha_required,
      captcha_supplied,
      captcha_passed,
      retry_after_seconds,
      requested_at
    )
  values (
    p_identifier_hash,
    p_ip_hash,
    p_pair_hash,
    'pending',
    v_captcha_required,
    p_captcha_supplied,
    p_captcha_passed,
    0,
    v_now
  )
  returning id
  into v_attempt_id;

  return query
  select
    v_attempt_id,
    true,
    v_captcha_required,
    0,
    v_risk_level;
end;
$function$;

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

comment on function
  public.reserve_lifetopia_login_attempt(
    text,
    text,
    text,
    boolean,
    boolean
  )
is
  'Server-only atomic login attempt reservation using a 15-minute rolling window, Turnstile escalation, and hashed risk dimensions.';

comment on function
  public.complete_lifetopia_login_attempt(
    uuid,
    text,
    uuid
  )
is
  'Server-only completion of a previously reserved Lifetopia login attempt.';

revoke all
on function
  public.reserve_lifetopia_login_attempt(
    text,
    text,
    text,
    boolean,
    boolean
  )
from public, anon, authenticated;

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
  public.reserve_lifetopia_login_attempt(
    text,
    text,
    text,
    boolean,
    boolean
  )
to service_role;

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
  ) as arguments
from pg_proc function_record
join pg_namespace function_namespace
  on function_namespace.oid =
    function_record.pronamespace
where function_namespace.nspname =
    'public'
  and function_record.proname in (
    'reserve_lifetopia_login_attempt',
    'complete_lifetopia_login_attempt'
  )
order by function_record.proname;
