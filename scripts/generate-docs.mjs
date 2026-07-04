import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");

function writeDoc(fileName, content) {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, fileName), content.trimStart(), "utf8");
  console.log(`✅ Generated docs/${fileName}`);
}

function walk(dir, prefix = "") {
  if (!fs.existsSync(dir)) return "";

  const ignored = new Set([
    "node_modules",
    ".next",
    ".turbo",
    ".git",
    "dist",
    "build",
  ]);

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !ignored.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  let output = "";

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";
    const fullPath = path.join(dir, entry.name);

    output += `${prefix}${pointer}${entry.name}\n`;

    if (entry.isDirectory()) {
      output += walk(fullPath, prefix + childPrefix);
    }
  });

  return output;
}

const projectContext = `# Lifetopia World — Project Context

## Project
Lifetopia World is a cozy fantasy life simulation, social sandbox, and Web3 game platform powered by Solana.

## Main App
\`apps/website\`

## Website
https://lifetopiaworld.io

## Tech Stack
- Next.js App Router
- TypeScript
- TailwindCSS
- Turborepo
- pnpm workspace
- Vercel
- GitHub Actions
- Discord DevOps notifications

## Current Landing Page Sections
- Hero ✅
- Account ✅
- Gameplay ✅
- Development Journey ✅
- Roadmap ✅
- Community ✅
- Footer ✅
- News ⏳

## Current Priority
Finish the News section, then move to Authentication and Dashboard.

## Important Rule
Do not redesign existing sections unless explicitly requested.
`;

const codingGuide = `# Lifetopia World — Coding Guide

## Core Rule
Always keep the project scalable, readable, maintainable, and future-backend-ready.

## Folder Pattern
For every major section, use:

\`\`\`text
components/home/<section>/
data/<section>.ts
types/<section>.ts
\`\`\`

## Component Pattern
Prefer:

\`\`\`text
types -> data -> component
\`\`\`

Example:

\`\`\`text
types/account.ts
data/account.ts
components/home/account/AccountSection.tsx
\`\`\`

## Do Not
- Do not hardcode large data inside components.
- Do not create random folders when a structure already exists.
- Do not change existing design language without permission.
- Do not make mobile layout completely different from desktop unless requested.
- Do not generate images unless explicitly requested.

## Responsive Rule
Use fluid responsive sizes with \`clamp()\`.

Examples:

\`\`\`tsx
text-[clamp(...)]
px-[clamp(...)]
py-[clamp(...)]
gap-[clamp(...)]
rounded-[clamp(...)]
\`\`\`

Desktop and mobile should feel like the same layout, only scaled down.

## Commit Convention
Use clear commit messages:

\`\`\`text
feat:
fix:
style:
refactor:
docs:
chore:
release:
\`\`\`
`;

const designSystem = `# Lifetopia World — Design System

## Visual Direction
- Cozy fantasy
- Premium mobile game quality
- Storybook feel
- Warm, soft, friendly
- Clean and modern
- Rounded cards
- Subtle shadows
- Not too crowded

## Color Palette
- Background: \`#fff7e8\`
- Background alternate: \`#fff8e8\`
- Dark text: \`#2f1b12\`
- Brown text: \`#7a5635\`
- Green accent: \`#4f8124\`
- Green accent 2: \`#6fa83a\`
- Border: \`#d9c99f\`
- Soft card: \`bg-white/75\`

## Section Pattern
Most landing page sections follow:

\`\`\`text
Badge
Title
Description
Content Cards
\`\`\`

## Common Style
Use:
- \`lt-badge\`
- \`lt-title\`
- \`lt-button-primary\`
- \`lt-button-secondary\`

## Card Style
Cards should feel soft and premium:

\`\`\`text
rounded-[clamp(...)]
border border-white/80
bg-white/75
shadow-[...]
hover:-translate-y-1
\`\`\`

## Responsive Philosophy
Do not create a totally different mobile design.
Mobile should preserve the same visual composition and scale proportionally.
`;

const roadmap = `# Lifetopia World — Roadmap

## Current Phase
Landing Page Completion

## Completed
- Hero section
- Account section
- Gameplay cards
- Development Journey
- Roadmap section
- Community section
- Footer
- Technical SEO
- Google Search Console
- Discord DevOps notifications
- Vercel deployment

## In Progress
- News section

## Next
1. Authentication
2. Register
3. Login
4. Dashboard
5. Profile
6. Settings
7. Wallet
8. Inventory
9. Community Platform
10. Game Integration

## Long-Term
- Supabase backend
- Player database
- Mission system
- Harmony Points
- Wallet integration
- NFT support
- GOLD integration
- Marketplace
- Beta preparation
`;

const structure = `# Lifetopia World — Project Structure

Generated automatically.

\`\`\`text
lifetopia-platform
${walk(root)}
\`\`\`
`;

writeDoc("PROJECT_CONTEXT.md", projectContext);
writeDoc("CODING_GUIDE.md", codingGuide);
writeDoc("DESIGN_SYSTEM.md", designSystem);
writeDoc("ROADMAP.md", roadmap);
writeDoc("PROJECT_STRUCTURE.md", structure);

console.log("🌿 Lifetopia docs generated successfully.");