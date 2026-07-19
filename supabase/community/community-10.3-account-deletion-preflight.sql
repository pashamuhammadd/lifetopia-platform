-- CommunityHub 10.3 account-deletion preflight
-- Read-only. Run the complete file in Supabase SQL Editor and export the final result as CSV.

with
foreign_keys as (
  select
    'foreign_key'::text as section,
    format('%I.%I.%I', child_ns.nspname, child.relname, constraint_row.conname) as object_name,
    jsonb_build_object(
      'child_table', format('%I.%I', child_ns.nspname, child.relname),
      'child_columns', child_columns.columns,
      'parent_table', format('%I.%I', parent_ns.nspname, parent.relname),
      'parent_columns', parent_columns.columns,
      'on_delete', case constraint_row.confdeltype
        when 'a' then 'NO ACTION'
        when 'r' then 'RESTRICT'
        when 'c' then 'CASCADE'
        when 'n' then 'SET NULL'
        when 'd' then 'SET DEFAULT'
        else constraint_row.confdeltype::text
      end
    ) as detail
  from pg_constraint constraint_row
  join pg_class child on child.oid = constraint_row.conrelid
  join pg_namespace child_ns on child_ns.oid = child.relnamespace
  join pg_class parent on parent.oid = constraint_row.confrelid
  join pg_namespace parent_ns on parent_ns.oid = parent.relnamespace
  cross join lateral (
    select jsonb_agg(attribute.attname order by key_position.ordinality) as columns
    from unnest(constraint_row.conkey) with ordinality key_position(attnum, ordinality)
    join pg_attribute attribute on attribute.attrelid = child.oid and attribute.attnum = key_position.attnum
  ) child_columns
  cross join lateral (
    select jsonb_agg(attribute.attname order by key_position.ordinality) as columns
    from unnest(constraint_row.confkey) with ordinality key_position(attnum, ordinality)
    join pg_attribute attribute on attribute.attrelid = parent.oid and attribute.attnum = key_position.attnum
  ) parent_columns
  where constraint_row.contype = 'f'
    and (
      (parent_ns.nspname = 'auth' and parent.relname = 'users')
      or (parent_ns.nspname = 'public' and parent.relname = 'profiles')
    )
),
identity_columns as (
  select
    'identity_column'::text as section,
    format('%I.%I.%I', namespace_row.nspname, table_row.relname, attribute.attname) as object_name,
    jsonb_build_object(
      'data_type', pg_catalog.format_type(attribute.atttypid, attribute.atttypmod),
      'nullable', not attribute.attnotnull,
      'has_foreign_key', exists (
        select 1
        from pg_constraint constraint_row
        where constraint_row.contype = 'f'
          and constraint_row.conrelid = table_row.oid
          and attribute.attnum = any(constraint_row.conkey)
      )
    ) as detail
  from pg_class table_row
  join pg_namespace namespace_row on namespace_row.oid = table_row.relnamespace
  join pg_attribute attribute on attribute.attrelid = table_row.oid
  where namespace_row.nspname = 'public'
    and table_row.relkind in ('r', 'p')
    and attribute.attnum > 0
    and not attribute.attisdropped
    and attribute.attname in (
      'user_id', 'profile_id', 'author_id', 'actor_id', 'target_user_id',
      'recipient_id', 'sender_id', 'owner_id', 'created_by', 'published_by',
      'reviewed_by', 'member_low', 'member_high'
    )
),
relevant_triggers as (
  select
    'trigger'::text as section,
    format('%I.%I.%I', namespace_row.nspname, table_row.relname, trigger_row.tgname) as object_name,
    jsonb_build_object(
      'enabled', trigger_row.tgenabled,
      'function', trigger_row.tgfoid::regprocedure::text,
      'definition', pg_get_triggerdef(trigger_row.oid, true)
    ) as detail
  from pg_trigger trigger_row
  join pg_class table_row on table_row.oid = trigger_row.tgrelid
  join pg_namespace namespace_row on namespace_row.oid = table_row.relnamespace
  where not trigger_row.tgisinternal
    and (
      (namespace_row.nspname = 'auth' and table_row.relname = 'users')
      or (namespace_row.nspname = 'public' and table_row.relname = 'profiles')
    )
),
profile_shape as (
  select
    'profile_column'::text as section,
    format('public.profiles.%I', attribute.attname) as object_name,
    jsonb_build_object(
      'data_type', pg_catalog.format_type(attribute.atttypid, attribute.atttypmod),
      'nullable', not attribute.attnotnull,
      'default', pg_get_expr(default_row.adbin, default_row.adrelid)
    ) as detail
  from pg_attribute attribute
  join pg_class table_row on table_row.oid = attribute.attrelid
  join pg_namespace namespace_row on namespace_row.oid = table_row.relnamespace
  left join pg_attrdef default_row on default_row.adrelid = table_row.oid and default_row.adnum = attribute.attnum
  where namespace_row.nspname = 'public'
    and table_row.relname = 'profiles'
    and attribute.attnum > 0
    and not attribute.attisdropped
),
storage_policies as (
  select
    'storage_policy'::text as section,
    format('%I.%I', policy.schemaname, policy.policyname) as object_name,
    jsonb_build_object(
      'command', policy.cmd,
      'roles', policy.roles,
      'using', policy.qual,
      'with_check', policy.with_check
    ) as detail
  from pg_policies policy
  where policy.schemaname = 'storage' and policy.tablename = 'objects'
)
select section, object_name, detail
from (
  select * from foreign_keys
  union all select * from identity_columns
  union all select * from relevant_triggers
  union all select * from profile_shape
  union all select * from storage_policies
) inventory
order by section, object_name;
