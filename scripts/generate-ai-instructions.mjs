import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");

const content = `# Lifetopia World — AI Instructions

> AUTO GENERATED
>
> Source of truth for every AI assistant working on this project.

---

# Required Reading Order

Before writing or modifying any code, ALWAYS read these documents in this order:

1. PROJECT_CONTEXT.md
2. PROJECT_STRUCTURE.md
3. DATABASE_SCHEMA.md
4. DATABASE_RELATIONS.md
5. DATABASE_TYPES.md
6. DESIGN_SYSTEM.md
7. CODING_GUIDE.md
8. ROADMAP.md

Never skip them.

---

# Project Philosophy

Lifetopia World is built for long-term scalability.

Every change should make the project:

- easier to maintain
- easier to scale
- easier for future developers
- easier for future AI assistants

Never sacrifice architecture for short-term convenience.

---

# Architecture Rules

Always follow the existing architecture.

Never invent a new folder when an existing one already fits.

Prefer extending the project over replacing it.

Keep components modular.

Keep business logic separated.

Keep data outside UI whenever possible.

---

# Folder Rules

Always respect the current project structure.

Never move folders unless explicitly requested.

Never rename existing folders.

Never duplicate components.

---

# Component Rules

Prefer small reusable components.

Never create 1000-line components.

Extract repeated UI into reusable components.

Prefer composition over duplication.

---

# TypeScript Rules

Never use "any".

Infer types whenever possible.

Prefer existing generated types.

If a type already exists, reuse it.

---

# Database Rules

DATABASE_SCHEMA.md is the source of truth.

Never invent:

- tables
- columns
- relations

Use exactly what exists.

Important:

profiles.id == auth.users.id

There is NO:

profiles.user_id

---

# UI Rules

Follow DESIGN_SYSTEM.md.

Do not redesign existing pages unless requested.

Maintain visual consistency.

Prefer clamp() for responsive sizing.

Desktop and mobile should feel like the same product.

---

# Responsive Rules

Do not build separate desktop/mobile layouts.

Use fluid responsive design.

Prefer:

clamp()

min()

max()

Grid/Flex

---

# Data Rules

Do not hardcode data if it belongs in:

data/

config/

database

---

# Naming Rules

Respect existing naming conventions.

snake_case:

Database

camelCase:

Variables

PascalCase:

Components

UPPER_CASE:

Constants

---

# Route Rules

Do not invent routes.

Only use routes that exist.

---

# Import Rules

Prefer existing aliases.

Never create duplicate imports.

Keep import order clean.

---

# Refactor Rules

Safe refactoring only.

Never silently remove functionality.

Preserve backwards compatibility whenever possible.

---

# Documentation Rules

Whenever architecture changes:

Update documentation.

The docs folder is the project's memory.

---

# Performance Rules

Avoid unnecessary re-render.

Avoid unnecessary client components.

Prefer Server Components.

Lazy load when appropriate.

---

# Accessibility

Use semantic HTML.

Buttons should be buttons.

Links should be links.

Images need alt.

---

# Security

Never expose secrets.

Never commit .env.local.

Never generate credentials.

Never print tokens.

---

# Git Rules

Small commits.

Meaningful commit messages.

Do not mix unrelated changes.

---

# AI Behavior

If uncertain:

ASK.

Never guess.

Never hallucinate.

Never invent project structure.

Never invent APIs.

Never invent database fields.

---

# Golden Rule

The docs folder is the single source of truth.

If documentation conflicts with assumptions,

documentation always wins.
`;

fs.writeFileSync(
  path.join(docsDir, "AI_INSTRUCTIONS.md"),
  content,
  "utf8",
);

console.log("✅ AI_INSTRUCTIONS.md generated");