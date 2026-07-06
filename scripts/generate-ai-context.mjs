import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");

const docs = [
  "PROJECT_CONTEXT.md",
  "PROJECT_STRUCTURE.md",
  "DATABASE_SCHEMA.md",
  "DATABASE_RELATIONS.md",
  "DATABASE_TYPES.md",
  "ROUTES.md",
  "API_REFERENCE.md",
  "COMPONENT_TREE.md",
  "CODING_GUIDE.md",
  "DESIGN_SYSTEM.md",
  "ROADMAP.md",
  "AI_INSTRUCTIONS.md",
];

const existing = docs.filter((doc) =>
  fs.existsSync(path.join(docsDir, doc)),
);

const missing = docs.filter(
  (doc) => !fs.existsSync(path.join(docsDir, doc)),
);

const content = `# Lifetopia World — AI Context

> AUTO GENERATED
>
> This is the FIRST document every AI should read.

---

# Purpose

This project already contains a complete documentation system.

Do NOT guess.

Use the generated documentation as the source of truth.

---

# Reading Order

${existing
  .map((doc, index) => `${index + 1}. ${doc}`)
  .join("\n")}

---

# Project Rules

Before generating code:

✅ Read PROJECT_CONTEXT

✅ Read DATABASE_SCHEMA

✅ Read DESIGN_SYSTEM

✅ Read CODING_GUIDE

Never skip them.

---

# AI Rules

Never:

- invent folders
- invent routes
- invent components
- invent database fields
- invent APIs
- redesign existing UI without request

Always:

- reuse existing components
- follow current architecture
- respect existing naming
- use generated database types
- use responsive clamp()

---

# Database Reminder

profiles.id == auth.users.id

Never use:

profiles.user_id

---

# Current Documentation

${existing.map((doc) => `- ✅ ${doc}`).join("\n")}

${
  missing.length
    ? `
## Missing

${missing.map((doc) => `- ❌ ${doc}`).join("\n")}
`
    : ""
}

---

# Recommended Prompt

When starting a new AI conversation:

"I already generated the project documentation using pnpm docs:generate.

Please use AI_CONTEXT.md as the entry point and follow every generated document before making changes."

---

# End
`;

fs.writeFileSync(
  path.join(docsDir, "AI_CONTEXT.md"),
  content,
  "utf8",
);

console.log("✅ AI_CONTEXT.md generated");