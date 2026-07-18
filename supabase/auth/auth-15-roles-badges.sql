-- Lifetopia Authentication
-- Auth 15 — Official roles and public badges
--
-- Official primary roles:
-- founder, admin, moderator, developer, artist,
-- alpha_tester, beta_tester, lifetopian
--
-- Every profile has exactly one primary role in profiles.role.
-- A profile may additionally have multiple public badges.
--
-- Founder provisioning itself is intentionally reserved for Auth 16.

begin;

set local lock_timeout = '10s';
set local statement_timeout = '90s';

create table
  public.lifetopia_role_catalog (
    role_code text primary key,
    label text not null,
    description text not null,
    priority integer not null
      unique,
    is_staff boolean
      not null default false,
    created_at timestamptz
      not null default now(),
    constraint
      lifetopia_role_catalog_code_check
    check (
      role_code in (
        'founder',
        'admin',
        'moderator',
        'developer',
        'artist',
        'alpha_tester',
        'beta_tester',
        'lifetopian'
      )
    )
  );

insert into
  public.lifetopia_role_catalog (
    role_code,
    label,
    description,
    priority,
    is_staff
  )
values
  (
    'founder',
    'Founder',
    'Founder of Lifetopia World.',
    10,
    true
  ),
  (
    'admin',
    'Admin',
    'Lifetopia platform administrator.',
    20,
    true
  ),
  (
    'moderator',
    'Moderator',
    'Lifetopia community moderator.',
    30,
    true
  ),
  (
    'developer',
    'Developer',
    'Lifetopia development contributor.',
    40,
    true
  ),
  (
    'artist',
    'Artist',
    'Lifetopia visual-art contributor.',
    50,
    true
  ),
  (
    'alpha_tester',
    'Alpha Tester',
    'Participated in Lifetopia Alpha testing.',
    60,
    false
  ),
  (
    'beta_tester',
    'Beta Tester',
    'Participated in Lifetopia Beta testing.',
    70,
    false
  ),
  (
    'lifetopian',
    'Lifetopian',
    'Member of the Lifetopia World community.',
    80,
    false
  );

create table
  public.badge_catalog (
    badge_code text primary key,
    label text not null,
    description text not null,
    priority integer not null
      unique,
    created_at timestamptz
      not null default now(),
    constraint
      badge_catalog_code_check
    check (
      badge_code in (
        'founder',
        'admin',
        'moderator',
        'developer',
        'artist',
        'alpha_tester',
        'beta_tester',
        'lifetopian'
      )
    )
  );

insert into
  public.badge_catalog (
    badge_code,
    label,
    description,
    priority
  )
select
  role_code,
  label,
  description,
  priority
from
  public.lifetopia_role_catalog;

create table
  public.profile_badges (
    user_id uuid not null
      references public.profiles(id)
      on delete cascade,
    badge_code text not null
      references public.badge_catalog(
        badge_code
      )
      on update cascade
      on delete restrict,
    granted_at timestamptz
      not null default now(),
    primary key (
      user_id,
      badge_code
    )
  );

create index
  profile_badges_badge_user_idx
on public.profile_badges (
  badge_code,
  user_id
);

create table
  public.account_role_changes (
    id uuid primary key
      default gen_random_uuid(),
    user_id uuid not null
      references public.profiles(id)
      on delete cascade,
    previous_role text,
    new_role text not null,
    actor_id uuid
      references public.profiles(id)
      on delete set null,
    change_source text not null
      check (
        change_source in (
          'migration',
          'role_assignment',
          'founder_provisioning'
        )
      ),
    reason text,
    created_at timestamptz
      not null default now()
  );

create index
  account_role_changes_user_time_idx
on public.account_role_changes (
  user_id,
  created_at desc
);

create table
  public.account_badge_changes (
    id uuid primary key
      default gen_random_uuid(),
    user_id uuid not null
      references public.profiles(id)
      on delete cascade,
    badge_code text not null,
    action text not null
      check (
        action in (
          'granted',
          'revoked'
        )
      ),
    actor_id uuid
      references public.profiles(id)
      on delete set null,
    reason text,
    created_at timestamptz
      not null default now()
  );

create index
  account_badge_changes_user_time_idx
on public.account_badge_changes (
  user_id,
  created_at desc
);

do $validate_role_baseline$
begin
  if exists (
    select 1
    from public.profiles
    where role not in (
      'player',
      'lifetopian'
    )
  ) then
    raise exception
      'Auth 15 cannot continue because an elevated primary role already exists.';
  end if;
end;
$validate_role_baseline$;

insert into
  public.account_role_changes (
    user_id,
    previous_role,
    new_role,
    actor_id,
    change_source,
    reason
  )
select
  profile.id,
  profile.role,
  case
    when profile.role = 'player'
      then 'lifetopian'
    else profile.role
  end,
  null,
  'migration',
  case
    when profile.role = 'player'
      then 'Auth 15 migration from legacy player role.'
    else
      'Auth 15 baseline for an account already normalized as Lifetopian.'
  end
from public.profiles profile
where profile.role in (
  'player',
  'lifetopian'
);

update public.profiles
set
  role = 'lifetopian',
  updated_at = now()
where role = 'player';

alter table public.profiles
  alter column role
  set default 'lifetopian';

do $drop_legacy_role_checks$
declare
  constraint_name text;
begin
  for constraint_name in
    select
      constraint_record.conname
    from pg_constraint
      constraint_record
    join pg_class table_record
      on table_record.oid =
        constraint_record.conrelid
    join pg_namespace table_schema
      on table_schema.oid =
        table_record.relnamespace
    where table_schema.nspname =
        'public'
      and table_record.relname =
        'profiles'
      and constraint_record.contype =
        'c'
      and pg_get_constraintdef(
        constraint_record.oid,
        true
      ) ilike '%role%'
  loop
    execute format(
      'alter table public.profiles drop constraint %I',
      constraint_name
    );
  end loop;
end;
$drop_legacy_role_checks$;

alter table public.profiles
  add constraint
    profiles_primary_role_check
  check (
    role in (
      'founder',
      'admin',
      'moderator',
      'developer',
      'artist',
      'alpha_tester',
      'beta_tester',
      'lifetopian'
    )
  );

create or replace function
  public.normalize_lifetopia_profile_role()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $function$
begin
  if new.role = 'player' then
    new.role := 'lifetopian';
  end if;

  return new;
end;
$function$;

create trigger
  normalize_lifetopia_profile_role_before_write
before insert or update of role
on public.profiles
for each row
execute function
  public.normalize_lifetopia_profile_role();

comment on function
  public.normalize_lifetopia_profile_role()
is
  'Compatibility bridge that converts the legacy signup role player into the official lifetopian primary role.';

create or replace function
  public.assign_lifetopia_primary_role(
    p_actor_id uuid,
    p_target_user_id uuid,
    p_new_role text,
    p_reason text
  )
returns table (
    previous_role text,
    new_role text
  )
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_actor_role text;
  v_previous_role text;
  v_reason text :=
    nullif(
      btrim(
        coalesce(
          p_reason,
          ''
        )
      ),
      ''
    );
begin
  if p_actor_id is null
    or p_target_user_id is null
  then
    raise exception
      'Actor and target account are required.';
  end if;

  if p_new_role not in (
    'founder',
    'admin',
    'moderator',
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  ) then
    raise exception
      'Primary role is invalid.';
  end if;

  if p_new_role = 'founder' then
    raise exception
      'Founder provisioning is reserved for Auth 16.';
  end if;

  select profile.role
  into v_actor_role
  from public.profiles profile
  where profile.id = p_actor_id;

  if not found then
    raise exception
      'Role-assignment actor does not exist.';
  end if;

  select profile.role
  into v_previous_role
  from public.profiles profile
  where profile.id =
    p_target_user_id
  for update;

  if not found then
    raise exception
      'Role-assignment target does not exist.';
  end if;

  if v_previous_role = 'founder' then
    raise exception
      'Founder lifecycle is reserved for Auth 16.';
  end if;

  if v_previous_role in (
    'admin',
    'moderator'
  ) and v_actor_role <> 'founder'
  then
    raise exception
      'Only the Founder can change an Admin or Moderator primary role.';
  end if;

  if p_new_role in (
    'admin',
    'moderator'
  ) and v_actor_role <> 'founder'
  then
    raise exception
      'Only the Founder can assign Admin or Moderator.';
  end if;

  if p_new_role in (
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  ) and v_actor_role not in (
    'founder',
    'admin'
  ) then
    raise exception
      'Only the Founder or an Admin can assign this role.';
  end if;

  if v_previous_role =
    p_new_role
  then
    return query
    select
      v_previous_role,
      p_new_role;
    return;
  end if;

  update public.profiles
  set
    role = p_new_role,
    updated_at = now()
  where id = p_target_user_id;

  insert into
    public.account_role_changes (
      user_id,
      previous_role,
      new_role,
      actor_id,
      change_source,
      reason
    )
  values (
    p_target_user_id,
    v_previous_role,
    p_new_role,
    p_actor_id,
    'role_assignment',
    v_reason
  );

  return query
  select
    v_previous_role,
    p_new_role;
end;
$function$;

create or replace function
  public.grant_lifetopia_badge(
    p_actor_id uuid,
    p_target_user_id uuid,
    p_badge_code text,
    p_reason text
  )
returns boolean
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_actor_role text;
  v_inserted_count integer := 0;
begin
  if p_badge_code not in (
    'founder',
    'admin',
    'moderator',
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  ) then
    raise exception
      'Badge code is invalid.';
  end if;

  if p_badge_code = 'founder' then
    raise exception
      'Founder badge provisioning is reserved for Auth 16.';
  end if;

  select profile.role
  into v_actor_role
  from public.profiles profile
  where profile.id = p_actor_id;

  if not found then
    raise exception
      'Badge actor does not exist.';
  end if;

  if not exists (
    select 1
    from public.profiles profile
    where profile.id =
      p_target_user_id
  ) then
    raise exception
      'Badge target does not exist.';
  end if;

  if p_badge_code in (
    'admin',
    'moderator'
  ) and v_actor_role <> 'founder'
  then
    raise exception
      'Only the Founder can grant Admin or Moderator badges.';
  end if;

  if p_badge_code in (
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  ) and v_actor_role not in (
    'founder',
    'admin'
  ) then
    raise exception
      'Only the Founder or an Admin can grant this badge.';
  end if;

  insert into
    public.profile_badges (
      user_id,
      badge_code,
      granted_at
    )
  values (
    p_target_user_id,
    p_badge_code,
    now()
  )
  on conflict do nothing;

  get diagnostics
    v_inserted_count =
      row_count;

  if v_inserted_count = 1 then
    insert into
      public.account_badge_changes (
        user_id,
        badge_code,
        action,
        actor_id,
        reason
      )
    values (
      p_target_user_id,
      p_badge_code,
      'granted',
      p_actor_id,
      nullif(
        btrim(
          coalesce(
            p_reason,
            ''
          )
        ),
        ''
      )
    );
  end if;

  return v_inserted_count = 1;
end;
$function$;

create or replace function
  public.revoke_lifetopia_badge(
    p_actor_id uuid,
    p_target_user_id uuid,
    p_badge_code text,
    p_reason text
  )
returns boolean
language plpgsql
security definer
set search_path = pg_catalog
as $function$
declare
  v_actor_role text;
  v_deleted_count integer := 0;
begin
  if p_badge_code = 'founder' then
    raise exception
      'Founder badge lifecycle is reserved for Auth 16.';
  end if;

  select profile.role
  into v_actor_role
  from public.profiles profile
  where profile.id = p_actor_id;

  if not found then
    raise exception
      'Badge actor does not exist.';
  end if;

  if p_badge_code in (
    'admin',
    'moderator'
  ) and v_actor_role <> 'founder'
  then
    raise exception
      'Only the Founder can revoke Admin or Moderator badges.';
  end if;

  if p_badge_code in (
    'developer',
    'artist',
    'alpha_tester',
    'beta_tester',
    'lifetopian'
  ) and v_actor_role not in (
    'founder',
    'admin'
  ) then
    raise exception
      'Only the Founder or an Admin can revoke this badge.';
  end if;

  delete from public.profile_badges
  where user_id =
      p_target_user_id
    and badge_code =
      p_badge_code;

  get diagnostics
    v_deleted_count =
      row_count;

  if v_deleted_count = 1 then
    insert into
      public.account_badge_changes (
        user_id,
        badge_code,
        action,
        actor_id,
        reason
      )
    values (
      p_target_user_id,
      p_badge_code,
      'revoked',
      p_actor_id,
      nullif(
        btrim(
          coalesce(
            p_reason,
            ''
          )
        ),
        ''
      )
    );
  end if;

  return v_deleted_count = 1;
end;
$function$;

alter table
  public.lifetopia_role_catalog
enable row level security;

alter table
  public.badge_catalog
enable row level security;

alter table
  public.profile_badges
enable row level security;

alter table
  public.account_role_changes
enable row level security;

alter table
  public.account_badge_changes
enable row level security;

create policy
  "Official roles are publicly readable"
on public.lifetopia_role_catalog
for select
to public
using (true);

create policy
  "Official badges are publicly readable"
on public.badge_catalog
for select
to public
using (true);

create policy
  "Profile badges are publicly readable"
on public.profile_badges
for select
to public
using (true);

revoke all
on table
  public.lifetopia_role_catalog,
  public.badge_catalog,
  public.profile_badges,
  public.account_role_changes,
  public.account_badge_changes
from public, anon, authenticated;

grant select
on table
  public.lifetopia_role_catalog,
  public.badge_catalog,
  public.profile_badges
to anon, authenticated;

grant all
on table
  public.lifetopia_role_catalog,
  public.badge_catalog,
  public.profile_badges,
  public.account_role_changes,
  public.account_badge_changes
to service_role;

revoke all
on function
  public.normalize_lifetopia_profile_role()
from public, anon, authenticated;

revoke all
on function
  public.assign_lifetopia_primary_role(
    uuid,
    uuid,
    text,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.grant_lifetopia_badge(
    uuid,
    uuid,
    text,
    text
  )
from public, anon, authenticated;

revoke all
on function
  public.revoke_lifetopia_badge(
    uuid,
    uuid,
    text,
    text
  )
from public, anon, authenticated;

grant execute
on function
  public.assign_lifetopia_primary_role(
    uuid,
    uuid,
    text,
    text
  )
to service_role;

grant execute
on function
  public.grant_lifetopia_badge(
    uuid,
    uuid,
    text,
    text
  )
to service_role;

grant execute
on function
  public.revoke_lifetopia_badge(
    uuid,
    uuid,
    text,
    text
  )
to service_role;

commit;

select
  role,
  count(*) as account_count
from public.profiles
group by role
order by role;
