import fs from "fs";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const appDir = path.join(root, "apps", "website", "app");

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, results);
    }

    if (entry.isFile() && entry.name === "route.ts") {
      results.push(fullPath);
    }
  }

  return results;
}

function toRoute(filePath) {
  const relative = path.relative(appDir, filePath).replaceAll("\\", "/");
  const routePath = relative.replace("/route.ts", "");

  return `/${routePath}`;
}

function detectMethods(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  return methods.filter((method) =>
    new RegExp(`export\\s+async\\s+function\\s+${method}\\b`).test(content),
  );
}

const routes = walk(appDir)
  .map((file) => ({
    route: toRoute(file),
    file: path.relative(root, file).replaceAll("\\", "/"),
    methods: detectMethods(file),
  }))
  .sort((a, b) => a.route.localeCompare(b.route));

let content = `# Lifetopia World — API Reference

> AUTO GENERATED
>
> Source: \`apps/website/app/**/route.ts\`

---

## API Routes

| Route | Methods | File |
|---|---|---|
`;

for (const item of routes) {
  content += `| \`${item.route}\` | ${
    item.methods.length ? item.methods.map((m) => `\`${m}\``).join(", ") : "-"
  } | \`${item.file}\` |\n`;
}

content += `

---

## AI Instructions

- Do not invent API routes.
- Use only API routes listed here.
- If a route handler is needed, create it intentionally as \`route.ts\`.
- Keep auth-related API routes inside \`app/api/auth/\`.
`;

fs.writeFileSync(path.join(docsDir, "API_REFERENCE.md"), content, "utf8");

console.log("✅ API_REFERENCE.md generated");