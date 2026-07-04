import fs from "fs";
import path from "path";

const root = process.cwd();
const configPath = path.join(root, "config", "project.json");

function readProject() {
  if (!fs.existsSync(configPath)) {
    console.error("❌ config/project.json not found.");
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function bar(value) {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return "█".repeat(filled) + "░".repeat(total - filled);
}

const project = readProject();

console.log("");
console.log("🌿 Lifetopia Developer Toolkit");
console.log("======================================");
console.log(`Project  : ${project.name}`);
console.log(`Version  : ${project.version}`);
console.log(`Website  : ${project.website}`);
console.log(`Phase    : ${project.phase}`);
console.log(`Priority : ${project.priority}`);
console.log("======================================");
console.log("");

console.log("✅ Completed");
project.completed.forEach((item) => console.log(`- ${item}`));

console.log("");
console.log("⏳ Next");
project.next.forEach((item) => console.log(`- ${item}`));

console.log("");
console.log("📈 Progress");
Object.entries(project.progress).forEach(([key, value]) => {
  const label = key.replace(/([A-Z])/g, " $1");
  console.log(`${label.padEnd(18)} ${bar(value)} ${value}%`);
});

console.log("");