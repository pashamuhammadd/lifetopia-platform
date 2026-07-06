import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const appDir = path.join(root, "apps", "website", "app");
const componentsDir = path.join(root, "apps", "website", "components");
const configPath = path.join(root, "config", "project.json");

const requiredDocs = [
  "AI_CONTEXT.md",
  "AI_INSTRUCTIONS.md",
  "PROJECT_CONTEXT.md",
  "PROJECT_STRUCTURE.md",
  "ROADMAP.md",
  "CODING_GUIDE.md",
  "DESIGN_SYSTEM.md",
  "DATABASE_SCHEMA.md",
  "DATABASE_RELATIONS.md",
  "DATABASE_TYPES.md",
  "ROUTES.md",
  "API_REFERENCE.md",
  "COMPONENT_TREE.md",
];

const requiredPaths = [
  "apps/website",
  "apps/website/app",
  "apps/website/components",
  "packages/data",
  "packages/types",
  "packages/lib",
  "packages/services",
  "public/images",
  "config/project.json",
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir, matcher, results = []) {
  if (!fs.existsSync(dir)) return results;

  const ignored = new Set(["node_modules", ".next", ".turbo", ".git"]);

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, matcher, results);
    }

    if (entry.isFile() && matcher(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function countPages() {
  return walk(appDir, (file) => file.endsWith("page.tsx")).length;
}

function countApiRoutes() {
  return walk(appDir, (file) => file.endsWith("route.ts")).length;
}

function countComponents() {
  return walk(
    componentsDir,
    (file) => file.endsWith(".tsx") || file.endsWith(".ts"),
  ).length;
}

function countTodos() {
  const files = walk(root, (file) => {
    const normalized = file.replaceAll("\\", "/");

    if (normalized.includes("node_modules")) return false;
    if (normalized.includes(".next")) return false;
    if (normalized.includes(".turbo")) return false;
    if (normalized.includes(".git")) return false;

    return (
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".js") ||
      file.endsWith(".mjs") ||
      file.endsWith(".md")
    );
  });

  let total = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(/\b(TODO|FIXME)\b/g);
    if (matches) total += matches.length;
  }

  return total;
}

function gitInfo() {
  try {
    const branch = execSync("git branch --show-current", {
      cwd: root,
      encoding: "utf8",
    }).trim();

    const lastCommit = execSync("git log -1 --pretty=%s", {
      cwd: root,
      encoding: "utf8",
    }).trim();

    return { branch, lastCommit };
  } catch {
    return { branch: "unknown", lastCommit: "unknown" };
  }
}

function readProject() {
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

const missingDocs = requiredDocs.filter(
  (doc) => !fs.existsSync(path.join(docsDir, doc)),
);

const missingPaths = requiredPaths.filter((item) => !exists(item));

const project = readProject();
const git = gitInfo();

const pages = countPages();
const apiRoutes = countApiRoutes();
const components = countComponents();
const todos = countTodos();

let score = 100;

score -= missingDocs.length * 4;
score -= missingPaths.length * 5;
score -= todos > 0 ? Math.min(todos * 2, 10) : 0;

score = Math.max(0, score);

console.log("");
console.log("🌿 Lifetopia Project Doctor");
console.log("======================================");
console.log(`Health Score : ${score}/100`);
console.log(`Branch       : ${git.branch}`);
console.log(`Last Commit  : ${git.lastCommit}`);
console.log("======================================");
console.log("");

console.log("📦 Project");
console.log(`Name         : ${project?.name ?? "Unknown"}`);
console.log(`Version      : ${project?.version ?? "Unknown"}`);
console.log(`Phase        : ${project?.phase ?? "Unknown"}`);
console.log(`Priority     : ${project?.priority ?? "Unknown"}`);
console.log("");

console.log("📊 Inventory");
console.log(`Pages        : ${pages}`);
console.log(`API Routes   : ${apiRoutes}`);
console.log(`Components   : ${components}`);
console.log(`TODO/FIXME   : ${todos}`);
console.log("");

console.log("📚 Documentation");
if (!missingDocs.length) {
  console.log("✅ All required docs exist");
} else {
  missingDocs.forEach((doc) => console.log(`❌ Missing docs/${doc}`));
}

console.log("");

console.log("📁 Required Paths");
if (!missingPaths.length) {
  console.log("✅ All required paths exist");
} else {
  missingPaths.forEach((item) => console.log(`❌ Missing ${item}`));
}

console.log("");

if (score >= 90) {
  console.log("✅ Project looks healthy.");
} else if (score >= 70) {
  console.log("⚠️ Project is usable, but needs cleanup.");
} else {
  console.log("❌ Project needs attention before continuing.");
}

console.log("");