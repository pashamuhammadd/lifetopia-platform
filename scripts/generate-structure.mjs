import fs from "fs";
import path from "path";

const root = process.cwd();
const outputPath = path.join(root, "docs", "PROJECT_STRUCTURE.md");

const IGNORE = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".idea",
  ".vscode",
  "out",
  ".cache",
  "pnpm-lock.yaml",
]);

const IMPORTANT_DIRS = [
  "apps",
  "packages",
  "components",
  "app",
  "data",
  "types",
  "lib",
  "hooks",
  "services",
  "providers",
  "public",
  "scripts",
  "docs",
];

const stats = {
  apps: 0,
  packages: 0,
  components: 0,
  pages: 0,
  dataFiles: 0,
  typeFiles: 0,
  hooks: 0,
  services: 0,
};

function shouldIgnore(name) {
  return IGNORE.has(name);
}

function readDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function sortEntries(entries) {
  return entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });
}

function walk(dir, prefix = "") {
  const entries = sortEntries(
    readDirSafe(dir).filter((entry) => !shouldIgnore(entry.name))
  );

  const lines = [];

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const branch = isLast ? "└── " : "├── ";
    const fullPath = path.join(dir, entry.name);

    lines.push(`${prefix}${branch}${entry.name}`);

    collectStats(fullPath, entry);

    if (entry.isDirectory()) {
      lines.push(
        ...walk(fullPath, `${prefix}${isLast ? "    " : "│   "}`)
      );
    }
  });

  return lines;
}

function collectStats(fullPath, entry) {
  const normalized = fullPath.replaceAll("\\", "/");
  const name = entry.name;

  if (entry.isDirectory()) {
    if (normalized.endsWith("/apps")) stats.apps += readDirSafe(fullPath).filter((e) => e.isDirectory()).length;
    if (normalized.endsWith("/packages")) stats.packages += readDirSafe(fullPath).filter((e) => e.isDirectory()).length;
    if (name === "components") stats.components += countFiles(fullPath, [".tsx", ".ts"]);
    if (name === "hooks") stats.hooks += countFiles(fullPath, [".ts", ".tsx"]);
    if (name === "services") stats.services += countFiles(fullPath, [".ts", ".tsx"]);
    return;
  }

  if (normalized.includes("/app/") && name === "page.tsx") stats.pages += 1;
  if (normalized.includes("/data/") && name.endsWith(".ts")) stats.dataFiles += 1;
  if (normalized.includes("/types/") && name.endsWith(".ts")) stats.typeFiles += 1;
}

function countFiles(dir, extensions) {
  let count = 0;

  for (const entry of readDirSafe(dir)) {
    if (shouldIgnore(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      count += countFiles(fullPath, extensions);
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      count += 1;
    }
  }

  return count;
}

function buildImportantMap() {
  const lines = [];

  for (const dirName of IMPORTANT_DIRS) {
    const found = findDirectories(root, dirName);

    if (found.length > 0) {
      lines.push(`### ${dirName}`);
      lines.push("");

      found.forEach((dir) => {
        lines.push(`- ${path.relative(root, dir).replaceAll("\\", "/")}`);
      });

      lines.push("");
    }
  }

  return lines;
}

function findDirectories(startDir, targetName) {
  const result = [];

  function search(currentDir) {
    for (const entry of readDirSafe(currentDir)) {
      if (shouldIgnore(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === targetName) result.push(fullPath);
        search(fullPath);
      }
    }
  }

  search(startDir);
  return result;
}

const treeLines = walk(root);
const importantMap = buildImportantMap();

const markdown = [
  "# Lifetopia World Project Structure",
  "",
  "Generated automatically from the current project folder.",
  "",
  "## Project Summary",
  "",
  `- Root: \`${path.basename(root)}\``,
  `- Apps: ${stats.apps}`,
  `- Packages: ${stats.packages}`,
  `- Components: ${stats.components}`,
  `- Pages: ${stats.pages}`,
  `- Data Files: ${stats.dataFiles}`,
  `- Type Files: ${stats.typeFiles}`,
  `- Hooks: ${stats.hooks}`,
  `- Services: ${stats.services}`,
  "",
  "## Important Folders",
  "",
  ...importantMap,
  "## Full Folder Tree",
  "",
  "```text",
  path.basename(root),
  ...treeLines,
  "```",
  "",
].join("\n");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, markdown, "utf8");

console.log("Generated docs/PROJECT_STRUCTURE.md");