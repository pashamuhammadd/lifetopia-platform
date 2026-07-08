import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const sourcePublic = path.join(rootDir, "public");

const targetApps = ["website", "community"];

function copyDir(source, target) {
  if (!fs.existsSync(source)) {
    console.error(`Source not found: ${source}`);
    process.exit(1);
  }

  fs.mkdirSync(target, { recursive: true });

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

for (const appName of targetApps) {
  const appPublic = path.join(rootDir, "apps", appName, "public");

  console.log(`Syncing public assets to apps/${appName}/public...`);

  copyDir(sourcePublic, appPublic);
}

console.log("Public assets synced successfully.");