# Lifetopia World — Coding Guide

## Core Rule
Always keep the project scalable, readable, and maintainable.

## Folder Pattern
For every major section, use:

```text
components/home/<section>/
data/<section>.ts
types/<section>.ts
```

## Do Not
- Do not hardcode large data inside components.
- Do not create random folders when a structure already exists.
- Do not change existing design language without permission.
- Do not make mobile layout completely different from desktop unless requested.

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

## Styling Pattern
Use existing Lifetopia style:

```text
bg-[#fff7e8]
bg-[#fff8e8]
text-[#2f1b12]
text-[#7a5635]
text-[#4f8124]
border-[#d9c99f]
bg-white/75
rounded-[clamp(...)]
shadow-[...]
```

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

## Current Priority
Finish landing page first, then continue to:
1. Authentication
2. Dashboard
3. Profile
4. Settings
5. Wallet
6. Inventory
7. Community Platform
8. Game Integration
