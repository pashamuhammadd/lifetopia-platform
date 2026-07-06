import fs from "fs";
import path from "path";
import { execSync } from "child_process";


const root = process.cwd();
const docsDir = path.join(root, "docs");
const configPath = path.join(root, "config", "project.json");

function readProject() {
  if (!fs.existsSync(configPath)) {
    console.error("❌ config/project.json not found.");
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function writeDoc(fileName, content) {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, fileName), content.trimStart(), "utf8");
  console.log(`✅ Generated docs/${fileName}`);
}

function walk(dir, prefix = "") {
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

function progressBar(value) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return "█".repeat(filled) + "░".repeat(total - filled);
}

const project = readProject();

const projectContext = `# ${project.name} — Project Context

## Project
${project.name} is a cozy fantasy life simulation, social sandbox, and Web3 game platform powered by Solana.

## Version
${project.version}

## Website
${project.website}

## Current Phase
${project.phase}

## Current Priority
${project.priority}

## Tech Stack
${project.tech.map((item) => `- ${item}`).join("\n")}

## Completed
${project.completed.map((item) => `- ${item} ✅`).join("\n")}

## Next
${project.next.map((item) => `- ${item}`).join("\n")}

## Important Rule
Do not redesign existing sections unless explicitly requested.
`;

const codingGuide = `# ${project.name} — Coding Guide

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

const designSystem = `# ${project.name} — Design System

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

const roadmap = `# ${project.name} — Roadmap

## Current Phase
${project.phase}

## Current Priority
${project.priority}

## Completed
${project.completed.map((item) => `- ${item}`).join("\n")}

## Next
${project.next.map((item) => `- ${item}`).join("\n")}

## Progress
${Object.entries(project.progress)
  .map(([key, value]) => {
    const label = key.replace(/([A-Z])/g, " $1");
    return `- ${label}: ${progressBar(value)} ${value}%`;
  })
  .join("\n")}
`;

const structure = `# ${project.name} — Project Structure

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

console.log("📚 Generating database schema...");

try {
  execSync("node scripts/generate-database-schema.mjs", {
    stdio: "inherit",
  });
} catch (error) {
  console.warn("⚠️ Failed to generate DATABASE_SCHEMA.md");
}

console.log("🤖 Generating AI instructions...");

execSync("node scripts/generate-ai-instructions.mjs", {
  stdio: "inherit",
});

console.log("🧠 Generating AI context...");

execSync("node scripts/generate-ai-context.mjs", {
  stdio: "inherit",
});

console.log("🛣️ Generating routes...");

execSync("node scripts/generate-routes.mjs", {
  stdio: "inherit",
});

console.log("🔌 Generating API reference...");

execSync("node scripts/generate-api-reference.mjs", {
  stdio: "inherit",
});

console.log("🧩 Generating component tree...");

execSync("node scripts/generate-component-tree.mjs", {
  stdio: "inherit",
});



console.log("");
console.log("🌿 Lifetopia documentation generated successfully.");