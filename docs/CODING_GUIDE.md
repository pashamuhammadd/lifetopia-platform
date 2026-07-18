# Lifetopia World — Coding Guide

## Core Rule
Always keep the project scalable, readable, maintainable, and future-backend-ready.

## Folder Pattern
For every major section, use:

```text
components/home/<section>/
data/<section>.ts
types/<section>.ts
```

## Component Pattern
Prefer:

```text
types -> data -> component
```

Example:

```text
types/account.ts
data/account.ts
components/home/account/AccountSection.tsx
```

## Do Not
- Do not hardcode large data inside components.
- Do not create random folders when a structure already exists.
- Do not change existing design language without permission.
- Do not make mobile layout completely different from desktop unless requested.
- Do not generate images unless explicitly requested.

## Responsive Rule
Use fluid responsive sizes with `clamp()`.

Examples:

```tsx
text-[clamp(...)]
px-[clamp(...)]
py-[clamp(...)]
gap-[clamp(...)]
rounded-[clamp(...)]
```

Desktop and mobile should feel like the same layout, only scaled down.

## Commit Convention
Use clear commit messages:

```text
feat:
fix:
style:
refactor:
docs:
chore:
release:
```
