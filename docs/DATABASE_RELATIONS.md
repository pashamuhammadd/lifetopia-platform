# Lifetopia World — Database Relations

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run `pnpm docs:generate` to update.

---

## Critical Manual Relation

```text
auth.users.id
    ↓
public.profiles.id
```

Important:

```text
profiles.id == auth.users.id
profiles.user_id does not exist
```

---

## Foreign Keys

No public foreign keys detected yet.



---

## Table Map

### `public.profiles`

Outgoing relations:
- None

Incoming relations:
- None

