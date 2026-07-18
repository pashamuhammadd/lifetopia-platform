-- Lifetopia Authentication
-- Auth 16 — One-time Founder provisioning
--
-- This migration provisions exactly one immutable Founder identity:
--
--   username: pashamuhammad
--   primary role: founder
--   public badge: founder
--
-- Run only after Auth 16 readiness and preflight return passed = true.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

create table public.lifetopia_founder_registry (
  singleton boolean primary key
    default true
    check (singleton),
  user_id uuid not null unique
    references public.profiles(id)
    on delete restrict,
  username_at_provisioning citext
    not null unique,
  provisioned_at timestamptz
    not null default now()
);

comment on table public.lifetopia_founder_registry
is
  'Private singleton registry for the one Lifetopia Founder identity.';

alter table public.lifetopia_founder_registry
enable row level security;

revoke all
on table public.lifetopia_founder_registry
from public, anon, authenticated;

grant all
on table public.lifetopia_founder_registry
to service_role;

create unique index profiles_single_founder_idx
on public.profiles (role)
where role = 'founder';

create unique index profile_badges_single_founder_idx
on public.profile_badges (badge_code)
where badge_code = 'founder';

create or replace function
  public.protect_lifetopia_founder_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  if tg_op = 'UPDATE'
    and old.role = 'founder'
    and new.role <> 'founder'
  then
    raise exception
      'Founder primary role is immutable.';
  end if;

  if new.role = 'founder'
    and (
      tg_op = 'INSERT'
      or old.role <> 'founder'
    )
    and not exists (
      select 1
      from public.lifetopia_founder_registry registry
      where registry.user_id = new.id
    )
  then
    raise exception
      'Founder role requires the protected Founder registry.';
  end if;

  return new;
end;
$function$;

create trigger
  protect_lifetopia_founder_profile_before_write
before insert or update of role
on public.profiles
for each row
execute function
  public.protect_lifetopia_founder_profile();

create or replace function
  public.protect_lifetopia_founder_badge()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  if tg_op = 'DELETE'
    and old.badge_code = 'founder'
  then
    raise exception
      'Founder badge is immutable.';
  end if;

  if tg_op = 'UPDATE'
    and old.badge_code = 'founder'
    and new.badge_code <> 'founder'
  then
    raise exception
      'Founder badge is immutable.';
  end if;

  if (
    (
      tg_op = 'INSERT'
      and new.badge_code = 'founder'
    )
    or (
      tg_op = 'UPDATE'
      and old.badge_code <> 'founder'
      and new.badge_code = 'founder'
    )
  )
  and not exists (
    select 1
    from public.lifetopia_founder_registry registry
    where registry.user_id = new.user_id
  )
  then
    raise exception
      'Founder badge requires the protected Founder registry.';
  end if;

  return case
    when tg_op = 'DELETE' then old
    else new
  end;
end;
$function$;

create trigger
  protect_lifetopia_founder_badge_before_write
before insert or update or delete
on public.profile_badges
for each row
execute function
  public.protect_lifetopia_founder_badge();

create or replace function
  public.provision_lifetopia_founder(
    p_username citext
  )
returns table (
  user_id uuid,
  username text,
  primary_role text
)
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_username citext :=
    lower(
      btrim(
        coalesce(
          p_username::text,
          ''
        )
      )
    )::citext;
  v_user_id uuid;
  v_current_role text;
  v_account_status text;
  v_email_verified_at timestamptz;
  v_legal_required boolean;
  v_username_required boolean;
  v_verified_mfa_count integer;
begin
  if v_username::text <> 'pashamuhammad' then
    raise exception
      'Only the official pashamuhammad account can be provisioned as Founder.';
  end if;

  lock table public.lifetopia_founder_registry
  in exclusive mode;

  if exists (
    select 1
    from public.lifetopia_founder_registry
  ) then
    raise exception
      'Lifetopia Founder has already been provisioned.';
  end if;

  if exists (
    select 1
    from public.profiles
    where role = 'founder'
  ) or exists (
    select 1
    from public.profile_badges
    where badge_code = 'founder'
  ) then
    raise exception
      'A Founder identity already exists outside the Founder registry.';
  end if;

  select
    profile.id,
    profile.role,
    private_profile.account_status,
    private_profile.email_verified_at,
    private_profile.legal_reconsent_required,
    private_profile.requires_username_update
  into
    v_user_id,
    v_current_role,
    v_account_status,
    v_email_verified_at,
    v_legal_required,
    v_username_required
  from public.profiles profile
  join public.profile_private private_profile
    on private_profile.user_id = profile.id
  where profile.username = v_username
  for update of profile, private_profile;

  if not found then
    raise exception
      'Founder candidate pashamuhammad does not exist.';
  end if;

  if v_current_role <> 'lifetopian' then
    raise exception
      'Founder candidate must use the Lifetopian baseline role.';
  end if;

  if v_account_status <> 'active' then
    raise exception
      'Founder candidate account must be active.';
  end if;

  if v_email_verified_at is null then
    raise exception
      'Founder candidate email must be verified.';
  end if;

  if v_legal_required then
    raise exception
      'Founder candidate must accept current legal documents.';
  end if;

  if v_username_required then
    raise exception
      'Founder candidate must finish permanent username selection.';
  end if;

  select count(*)
  into v_verified_mfa_count
  from auth.mfa_factors factor
  where factor.user_id = v_user_id
    and factor.factor_type::text = 'totp'
    and factor.status::text = 'verified';

  if v_verified_mfa_count < 1 then
    raise exception
      'Founder candidate must enable verified TOTP MFA.';
  end if;

  insert into public.lifetopia_founder_registry (
    singleton,
    user_id,
    username_at_provisioning,
    provisioned_at
  )
  values (
    true,
    v_user_id,
    v_username,
    now()
  );

  update public.profiles
  set
    role = 'founder',
    updated_at = now()
  where id = v_user_id;

  insert into public.profile_badges (
    user_id,
    badge_code,
    granted_at
  )
  values (
    v_user_id,
    'founder',
    now()
  );

  insert into public.account_role_changes (
    user_id,
    previous_role,
    new_role,
    actor_id,
    change_source,
    reason
  )
  values (
    v_user_id,
    v_current_role,
    'founder',
    null,
    'founder_provisioning',
    'Auth 16 protected one-time Founder provisioning.'
  );

  insert into public.account_badge_changes (
    user_id,
    badge_code,
    action,
    actor_id,
    reason
  )
  values (
    v_user_id,
    'founder',
    'granted',
    null,
    'Auth 16 protected one-time Founder provisioning.'
  );

  return query
  select
    v_user_id,
    v_username::text,
    'founder'::text;
end;
$function$;

comment on function
  public.provision_lifetopia_founder(citext)
is
  'One-time service-role-only provisioning of the protected pashamuhammad Founder identity.';

revoke all
on function public.protect_lifetopia_founder_profile()
from public, anon, authenticated;

revoke all
on function public.protect_lifetopia_founder_badge()
from public, anon, authenticated;

revoke all
on function public.provision_lifetopia_founder(citext)
from public, anon, authenticated;

grant execute
on function public.provision_lifetopia_founder(citext)
to service_role;

select *
from public.provision_lifetopia_founder(
  'pashamuhammad'::citext
);

commit;

select
  profile.id,
  profile.username,
  profile.display_name,
  profile.role,
  registry.provisioned_at
from public.lifetopia_founder_registry registry
join public.profiles profile
  on profile.id = registry.user_id;
