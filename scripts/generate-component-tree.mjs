import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const componentsDir = path.join(root, "apps", "website", "components");

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, results);
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function detectExports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  const matches = [
    ...content.matchAll(/export\s+function\s+([A-Z][A-Za-z0-9_]*)/g),
    ...content.matchAll(/export\s+const\s+([A-Z][A-Za-z0-9_]*)/g),
  ];

  return matches.map((match) => match[1]);
}

const files = walk(componentsDir)
  .map((file) => ({
    file: path.relative(root, file).replaceAll("\\", "/"),
    exports: detectExports(file),
  }))
  .sort((a, b) => a.file.localeCompare(b.file));

let content = `# Lifetopia World — Component Tree

> AUTO GENERATED
>
> Source: \`apps/website/components\`

---

## Components

| File | Exports |
|---|---|
`;

for (const item of files) {
  content += `| \`${item.file}\` | ${
    item.exports.length
      ? item.exports.map((name) => `\`${name}\``).join(", ")
      : "-"
  } |\n`;
}

content += `

---

## AI Instructions

- Do not invent component paths.
- Reuse existing components whenever possible.
- Keep new components inside the closest matching folder.
- Do not create random folders when a matching folder exists.
`;

fs.writeFileSync(path.join(docsDir, "COMPONENT_TREE.md"), content, "utf8");

console.log("✅ COMPONENT_TREE.md generated");