import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const sharedPublic = path.join(root, "public");

const apps = [
  "website",
  "grants"
];

for (const app of apps) {

  const target = path.join(
    root,
    "apps",
    app,
    "public"
  );

  fs.rmSync(target, {
    recursive: true,
    force: true
  });

  fs.cpSync(sharedPublic, target, {
    recursive: true
  });

  console.log(`✓ Synced public -> ${app}`);

}