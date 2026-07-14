import {
  access,
  readFile,
  readdir,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  fileURLToPath,
} from "node:url";

const scriptDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

const repositoryRoot = path.resolve(
  scriptDirectory,
  "../../..",
);

const docsRoot = path.join(
  repositoryRoot,
  "apps",
  "docs",
);

const grantsRoot = path.join(
  repositoryRoot,
  "apps",
  "grants",
);

const docsDataRoot = path.join(
  repositoryRoot,
  "packages",
  "docs-data",
);

const failures = [];
const warnings = [];
const passes = [];

const requiredSlugs = [
  "project-overview",
  "beta-roadmap",
  "technical-architecture",
  "pitch-deck",
  "whitepaper",
];

const allowedStatuses = new Set([
  "Live",
  "Public Draft",
  "In Preparation",
  "Planned",
  "Archived",
]);

const requiredFiles = [
  "apps/docs/app/robots.ts",
  "apps/docs/app/sitemap.ts",
  "apps/docs/app/not-found.tsx",
  "apps/docs/app/opengraph-image.tsx",
  "apps/docs/app/twitter-image.tsx",
  "apps/docs/app/[slug]/page.tsx",
  "apps/docs/scripts/validate-routes.mjs",
  "apps/docs/components/docs/DocsNavbar.tsx",
  "apps/docs/components/docs/DocsSearch.tsx",
  "apps/docs/components/docs/DocsSidebar.tsx",
  "apps/docs/components/docs/DocumentContent.tsx",
  "packages/docs-data/documents.ts",
  "packages/docs-data/categories.ts",
  "packages/docs-data/types.ts",
];

const publicUrls = [
  "https://lifetopiaworld.io",
  "https://community.lifetopiaworld.io",
  "https://grants.lifetopiaworld.io",
  "https://play.lifetopiaworld.io",
  "https://github.com/pashamuhammadd/lifetopia-platform",
];

function addPass(message) {
  passes.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function addFailure(message) {
  failures.push(message);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  const content = await readFile(
    filePath,
    "utf8",
  );

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      [
        `Invalid JSON: ${path.relative(
          repositoryRoot,
          filePath,
        )}`,
        error instanceof Error
          ? error.message
          : String(error),
      ].join("\n"),
    );
  }
}

async function collectSourceFiles(
  directoryPath,
) {
  const entries = await readdir(
    directoryPath,
    {
      withFileTypes: true,
    },
  );

  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(
      directoryPath,
      entry.name,
    );

    if (entry.isDirectory()) {
      files.push(
        ...(await collectSourceFiles(
          entryPath,
        )),
      );

      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

async function checkRequiredFiles() {
  for (const relativePath of requiredFiles) {
    const absolutePath = path.join(
      repositoryRoot,
      relativePath,
    );

    if (await fileExists(absolutePath)) {
      addPass(
        `Required file exists: ${relativePath}`,
      );
    } else {
      addFailure(
        `Required file is missing: ${relativePath}`,
      );
    }
  }
}

async function checkDocumentsData() {
  const documentsPath = path.join(
    docsDataRoot,
    "documents.ts",
  );

  const source = await readFile(
    documentsPath,
    "utf8",
  );

  const slugs = Array.from(
    source.matchAll(
      /\bslug:\s*"([^"]+)"/g,
    ),
    (match) => match[1],
  );

  const uniqueSlugs = new Set(slugs);

  if (uniqueSlugs.size !== slugs.length) {
    addFailure(
      "Duplicate document slugs were found.",
    );
  } else {
    addPass(
      `${slugs.length} document slugs are unique.`,
    );
  }

  for (const slug of requiredSlugs) {
    if (uniqueSlugs.has(slug)) {
      addPass(
        `Required document exists: ${slug}`,
      );
    } else {
      addFailure(
        `Required document is missing: ${slug}`,
      );
    }
  }

  const statuses = Array.from(
    source.matchAll(
      /\bstatus:\s*"([^"]+)"/g,
    ),
    (match) => match[1],
  );

  for (const status of statuses) {
    if (!allowedStatuses.has(status)) {
      addFailure(
        `Unsupported document status: ${status}`,
      );
    }
  }

  if (
    statuses.every((status) =>
      allowedStatuses.has(status),
    )
  ) {
    addPass(
      "All document statuses are valid.",
    );
  }

  const updatedDates = Array.from(
    source.matchAll(
      /\bupdatedAt:\s*"([^"]+)"/g,
    ),
    (match) => match[1],
  );

  for (const value of updatedDates) {
    const hasValidFormat =
      /^\d{4}-\d{2}-\d{2}$/.test(value);

    const parsedDate = new Date(
      `${value}T00:00:00Z`,
    );

    if (
      !hasValidFormat ||
      Number.isNaN(parsedDate.getTime())
    ) {
      addFailure(
        `Invalid updatedAt date: ${value}`,
      );
    }
  }

  if (
    updatedDates.length > 0 &&
    updatedDates.every((value) => {
      const date = new Date(
        `${value}T00:00:00Z`,
      );

      return (
        /^\d{4}-\d{2}-\d{2}$/.test(
          value,
        ) &&
        !Number.isNaN(date.getTime())
      );
    })
  ) {
    addPass(
      "All document update dates are valid.",
    );
  }

  if (
    !source.includes(
      'slug: "pitch-deck"',
    ) ||
    !source.includes(
      'status: "In Preparation"',
    )
  ) {
    addFailure(
      "Pitch Deck preparation status could not be verified.",
    );
  } else {
    addPass(
      "Pitch Deck remains transparently marked as In Preparation.",
    );
  }
}

async function checkPackageConfiguration() {
  const docsPackagePath = path.join(
    docsRoot,
    "package.json",
  );

  const docsPackage =
    await readJson(docsPackagePath);

  const requiredScripts = [
    "build",
    "lint",
    "check-types",
    "validate-routes",
    "audit:predeploy",
  ];

  for (const scriptName of requiredScripts) {
    if (docsPackage.scripts?.[scriptName]) {
      addPass(
        `Docs script exists: ${scriptName}`,
      );
    } else {
      addFailure(
        `Docs script is missing: ${scriptName}`,
      );
    }
  }

  if (
    docsPackage.dependencies?.[
      "@repo/docs-data"
    ] === "workspace:*"
  ) {
    addPass(
      "Docs uses the shared docs-data package.",
    );
  } else {
    addFailure(
      "Docs does not declare @repo/docs-data as a workspace dependency.",
    );
  }

  const grantsPackagePath = path.join(
    grantsRoot,
    "package.json",
  );

  const grantsPackage =
    await readJson(grantsPackagePath);

  const grantsDocsDataDependency =
  grantsPackage.dependencies?.[
    "@repo/docs-data"
  ];

if (
  typeof grantsDocsDataDependency ===
    "string" &&
  grantsDocsDataDependency.startsWith(
    "workspace:",
  )
) {
  addPass(
    "Funding Hub uses the shared docs-data package.",
  );
} else {
  addFailure(
    "Funding Hub does not declare @repo/docs-data as a workspace dependency.",
  );
}
}

async function checkTurboConfiguration() {
  const turboPath = path.join(
    repositoryRoot,
    "turbo.json",
  );

  const turboConfig =
    await readJson(turboPath);

  const globalEnv = new Set(
    turboConfig.globalEnv ?? [],
  );

  const requiredEnvironmentVariables = [
    "DOCS_VALIDATION_URL",
    "NEXT_PUBLIC_PITCH_DECK_PDF_URL",
  ];

  for (const variableName of
    requiredEnvironmentVariables) {
    if (globalEnv.has(variableName)) {
      addPass(
        `Turbo environment declared: ${variableName}`,
      );
    } else {
      addFailure(
        `Turbo globalEnv is missing: ${variableName}`,
      );
    }
  }
}

async function checkFundingHubIntegration() {
  const documentsHubPath = path.join(
    grantsRoot,
    "components",
    "DocumentsHub.tsx",
  );

  const source = await readFile(
    documentsHubPath,
    "utf8",
  );

  if (
    source.includes(
      'from "@repo/docs-data"',
    )
  ) {
    addPass(
      "Funding Hub imports shared document data.",
    );
  } else {
    addFailure(
      "Funding Hub is not importing @repo/docs-data.",
    );
  }

  if (
    source.includes(
      "https://docs.lifetopiaworld.io",
    )
  ) {
    addPass(
      "Funding Hub has the production docs URL fallback.",
    );
  } else {
    addFailure(
      "Funding Hub production docs URL fallback is missing.",
    );
  }

  if (
    source.includes(
      "NEXT_PUBLIC_DOCS_URL",
    )
  ) {
    addPass(
      "Funding Hub supports a configurable docs URL.",
    );
  } else {
    addWarning(
      "Funding Hub does not appear to use NEXT_PUBLIC_DOCS_URL.",
    );
  }
}

async function checkAccessibilityFoundation() {
  const layoutPath = path.join(
    docsRoot,
    "app",
    "layout.tsx",
  );

  const globalsPath = path.join(
    docsRoot,
    "app",
    "globals.css",
  );

  const homePath = path.join(
    docsRoot,
    "components",
    "docs",
    "DocsHomeContent.tsx",
  );

  const documentPath = path.join(
    docsRoot,
    "components",
    "docs",
    "DocumentContent.tsx",
  );

  const notFoundPath = path.join(
    docsRoot,
    "app",
    "not-found.tsx",
  );

  const [
    layout,
    globals,
    home,
    document,
    notFound,
  ] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(globalsPath, "utf8"),
    readFile(homePath, "utf8"),
    readFile(documentPath, "utf8"),
    readFile(notFoundPath, "utf8"),
  ]);

  if (
    layout.includes(
      'href="#main-content"',
    )
  ) {
    addPass(
      "Skip-to-content link is configured.",
    );
  } else {
    addFailure(
      "Skip-to-content link is missing.",
    );
  }

  for (const [
    label,
    source,
  ] of [
    ["landing page", home],
    ["document page", document],
    ["not-found page", notFound],
  ]) {
    if (
      source.includes(
        'id="main-content"',
      )
    ) {
      addPass(
        `Main content target exists on ${label}.`,
      );
    } else {
      addFailure(
        `Main content target is missing on ${label}.`,
      );
    }
  }

  if (
    globals.includes(
      ":focus-visible",
    )
  ) {
    addPass(
      "Global keyboard focus styles exist.",
    );
  } else {
    addFailure(
      "Global focus-visible styling is missing.",
    );
  }

  if (
    globals.includes(
      "prefers-reduced-motion",
    )
  ) {
    addPass(
      "Reduced motion preferences are supported.",
    );
  } else {
    addFailure(
      "Reduced motion support is missing.",
    );
  }
}

async function checkRuntimeSource() {
  const directories = [
    path.join(docsRoot, "app"),
    path.join(docsRoot, "components"),
    path.join(docsRoot, "lib"),
    docsDataRoot,
  ];

  const files = [];

  for (const directory of directories) {
    if (await fileExists(directory)) {
      files.push(
        ...(await collectSourceFiles(
          directory,
        )),
      );
    }
  }

  const hardFailurePatterns = [
    {
      pattern: /localhost:\d+/i,
      label:
        "localhost reference in runtime source",
    },
    {
      pattern: /example\.com/i,
      label: "example.com placeholder",
    },
    {
      pattern:
        /\bhref\s*=\s*["']\s*#\s*["']/i,
      label: "empty hash link",
    },
    {
      pattern:
        /\bhref\s*=\s*["']\s*["']/i,
      label: "empty href",
    },
    {
      pattern: /lorem ipsum/i,
      label: "placeholder copy",
    },
  ];

  const warningPatterns = [
    {
      pattern: /\bTODO\b/,
      label: "TODO comment",
    },
    {
      pattern: /\bFIXME\b/,
      label: "FIXME comment",
    },
  ];

  for (const filePath of files) {
    const source = await readFile(
      filePath,
      "utf8",
    );

    const relativePath = path.relative(
      repositoryRoot,
      filePath,
    );

    for (const item of hardFailurePatterns) {
      if (item.pattern.test(source)) {
        addFailure(
          `${item.label}: ${relativePath}`,
        );
      }
    }

    for (const item of warningPatterns) {
      if (item.pattern.test(source)) {
        addWarning(
          `${item.label}: ${relativePath}`,
        );
      }
    }
  }

  addPass(
    `${files.length} runtime source files were scanned.`,
  );
}

async function checkPublicUrl(url) {
  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 12000);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Lifetopia-Docs-Predeploy-Audit/1.0",
      },
    });

    if (
      response.status >= 200 &&
      response.status < 400
    ) {
      addPass(
        `Public URL reachable: ${url}`,
      );
    } else {
      addWarning(
        `Public URL returned ${response.status}: ${url}`,
      );
    }

    await response.body?.cancel();
  } catch (error) {
    addWarning(
      [
        `Could not verify public URL: ${url}`,
        error instanceof Error
          ? error.message
          : String(error),
      ].join(" — "),
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function checkPublicUrls() {
  const skipNetwork =
    process.argv.includes(
      "--skip-network",
    );

  if (skipNetwork) {
    addWarning(
      "Public URL checks were skipped.",
    );

    return;
  }

  for (const url of publicUrls) {
    await checkPublicUrl(url);
  }
}

function printSection(
  title,
  items,
  symbol,
) {
  if (items.length === 0) {
    return;
  }

  console.log("");
  console.log(title);

  for (const item of items) {
    console.log(`${symbol} ${item}`);
  }
}

async function main() {
  await checkRequiredFiles();
  await checkDocumentsData();
  await checkPackageConfiguration();
  await checkTurboConfiguration();
  await checkFundingHubIntegration();
  await checkAccessibilityFoundation();
  await checkRuntimeSource();
  await checkPublicUrls();

  printSection(
    "Passed checks",
    passes,
    "✓",
  );

  printSection(
    "Warnings",
    warnings,
    "!",
  );

  printSection(
    "Failures",
    failures,
    "✕",
  );

  console.log("");
  console.log(
    [
      "Audit summary:",
      `${passes.length} passed,`,
      `${warnings.length} warnings,`,
      `${failures.length} failures.`,
    ].join(" "),
  );

  if (failures.length > 0) {
    process.exitCode = 1;

    return;
  }

  console.log("");
  console.log(
    "Lifetopia Docs passed the automated pre-deployment audit.",
  );
}

main().catch((error) => {
  console.error("");
  console.error(
    "Pre-deployment audit could not complete.",
  );

  console.error(
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});