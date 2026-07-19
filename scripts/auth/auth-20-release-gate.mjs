import {
  spawnSync,
} from "node:child_process";

const productionFlagIndex =
  process.argv.indexOf(
    "--production",
  );

const targetURL =
  productionFlagIndex >= 0
    ? process.argv[
        productionFlagIndex + 1
      ]
    : undefined;

if (
  productionFlagIndex >= 0 &&
  !targetURL
) {
  console.error(
    "Auth 20: --production requires an HTTPS URL.",
  );
  process.exit(2);
}

if (targetURL) {
  let parsedTarget;

  try {
    parsedTarget =
      new URL(targetURL);
  } catch {
    console.error(
      "Auth 20: production target is not a valid URL.",
    );
    process.exit(2);
  }

  if (
    parsedTarget.protocol !==
      "https:" ||
    ![
      "lifetopiaworld.io",
      "www.lifetopiaworld.io",
    ].includes(
      parsedTarget.hostname,
    ) ||
    parsedTarget.pathname !== "/" ||
    parsedTarget.search ||
    parsedTarget.hash
  ) {
    console.error(
      "Auth 20: production smoke tests are restricted to the Lifetopia website origin.",
    );
    process.exit(2);
  }
}

const commands = [
  {
    label: "repository diff check",
    command: "git",
    args: ["diff", "--check"],
  },
  {
    label: "website type check",
    command: "pnpm",
    args: [
      "--filter",
      "website",
      "exec",
      "tsc",
      "--noEmit",
    ],
  },
  {
    label: "monorepo production build",
    command: "pnpm",
    args: [
      "turbo",
      "run",
      "build",
    ],
  },
  {
    label: targetURL
      ? "production authentication smoke tests"
      : "local authentication smoke tests",
    command: "pnpm",
    args: [
      "--filter",
      "website",
      "exec",
      "playwright",
      "test",
      "--config=playwright.auth.config.ts",
      "--workers=1",
      "--reporter=list",
    ],
    env: targetURL
      ? {
          AUTH_QA_BASE_URL:
            targetURL,
        }
      : {},
  },
];

for (const [index, step] of
  commands.entries()) {
  console.log(
    `\n[Auth 20 ${
      index + 1
    }/${commands.length}] ${
      step.label
    }`,
  );

  const result = spawnSync(
    step.command,
    step.args,
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        ...step.env,
      },
      stdio: "inherit",
      shell:
        process.platform ===
        "win32",
    },
  );

  if (result.error) {
    console.error(
      `Auth 20: ${step.label} could not start.`,
      result.error,
    );
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(
      `\nAuth 20 blocked: ${step.label} exited with code ${result.status}.`,
    );
    process.exit(
      result.status ?? 1,
    );
  }
}

console.log(
  targetURL
    ? "\nAuth 20 production code gate passed. Complete SQL post-deploy verification and manual sign-off."
    : "\nAuth 20 local code gate passed. Complete release-readiness SQL before pushing production.",
);
