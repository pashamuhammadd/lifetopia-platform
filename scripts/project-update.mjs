import fs from "fs";
import path from "path";
import readline from "readline";

const root = process.cwd();
const configPath = path.join(root, "config", "project.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function readProject() {
  if (!fs.existsSync(configPath)) {
    console.error("❌ config/project.json not found.");
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function saveProject(project) {
  fs.writeFileSync(configPath, `${JSON.stringify(project, null, 2)}\n`, "utf8");
  console.log("✅ Updated config/project.json");
}

function printMenu(project) {
  console.log("");
  console.log("🌿 Lifetopia Developer Toolkit");
  console.log("======================================");
  console.log(`Phase    : ${project.phase}`);
  console.log(`Priority : ${project.priority}`);
  console.log("======================================");
  console.log("");
  console.log("1. Change phase");
  console.log("2. Change priority");
  console.log("3. Mark next feature as completed");
  console.log("4. Add next feature");
  console.log("5. Update progress");
  console.log("6. Exit");
  console.log("");
}

async function main() {
  const project = readProject();

  printMenu(project);

  const choice = await ask("Choose an option: ");

  if (choice === "1") {
    const phase = await ask("New phase: ");
    if (phase) project.phase = phase;
    saveProject(project); nextCommandHint();
  }

  if (choice === "2") {
    const priority = await ask("New priority: ");
    if (priority) project.priority = priority;
    saveProject(project); nextCommandHint();
  }

  if (choice === "3") {
    if (!project.next.length) {
      console.log("No next features available.");
      rl.close();
      return;
    }

    console.log("");
    project.next.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });

    const selected = Number(await ask("Select feature number: "));
    const feature = project.next[selected - 1];

    if (!feature) {
      console.log("Invalid selection.");
      rl.close();
      return;
    }

    project.next = project.next.filter((item) => item !== feature);

    if (!project.completed.includes(feature)) {
      project.completed.push(feature);
    }

    console.log(`✅ Marked "${feature}" as completed.`);
    saveProject(project); nextCommandHint();
  }

  if (choice === "4") {
    const feature = await ask("Feature name: ");
    if (feature && !project.next.includes(feature)) {
      project.next.push(feature);
    }
    saveProject(project); nextCommandHint();
  }

  if (choice === "5") {
    console.log("");
    Object.keys(project.progress).forEach((key, index) => {
      console.log(`${index + 1}. ${key}: ${project.progress[key]}%`);
    });

    const selected = Number(await ask("Select progress item: "));
    const key = Object.keys(project.progress)[selected - 1];

    if (!key) {
      console.log("Invalid selection.");
      rl.close();
      return;
    }

    const value = Number(await ask(`New value for ${key} (0-100): `));

    if (Number.isNaN(value)) {
      console.log("Invalid number.");
      rl.close();
      return;
    }

    project.progress[key] = Math.max(0, Math.min(100, value));
    saveProject(project); nextCommandHint();
  }

  if (choice === "6") {
    console.log("Bye.");
  }

  rl.close();
}
function nextCommandHint() {
  console.log("");
  console.log("Next:");
  console.log("pnpm docs:generate");
  console.log("pnpm project:status");
  console.log("");
}
main();