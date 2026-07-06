import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const websiteAppDir = path.join(root, "apps", "website", "app");

function toRoute(filePath) {
  const relative = path.relative(websiteAppDir, filePath);
  const parts = relative.split(path.sep);

  parts.pop();

  const route =
    "/" +
    parts
      .filter((part) => !part.startsWith("("))
      .join("/")
      .replace(/\/page$/, "");

  return route === "/" ? "/" : route.replace(/\/$/, "");
}

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, results);
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      results.push(fullPath);
    }
  }

  return results;
}

const pages = walk(websiteAppDir)
  .map((file) => ({
    route: toRoute(file),
    file: path.relative(root, file).replaceAll("\\", "/"),
  }))
  .sort((a, b) => a.route.localeCompare(b.route));

let content = `# Lifetopia World — Routes

> AUTO GENERATED
>
> Source: \`apps/website/app\`

---

## App Routes

| Route | File |
|---|---|
`;

for (const page of pages) {
  content += `| \`${page.route}\` | \`${page.file}\` |\n`;
}

content += `

---

## AI Instructions

- Do not invent routes.
- Use only routes listed in this file.
- If a new route is needed, create it intentionally inside \`apps/website/app\`.
`;

fs.writeFileSync(path.join(docsDir, "ROUTES.md"), content, "utf8");

console.log("✅ ROUTES.md generated");