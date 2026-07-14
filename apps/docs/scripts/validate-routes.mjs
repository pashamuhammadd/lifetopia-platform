import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  fileURLToPath,
} from "node:url";

const scriptDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

const docsRoot = path.resolve(
  scriptDirectory,
  "..",
);

const repositoryRoot = path.resolve(
  docsRoot,
  "../..",
);

const documentsFile = path.join(
  repositoryRoot,
  "packages",
  "docs-data",
  "documents.ts",
);

const baseUrl = (
  process.env.DOCS_VALIDATION_URL ??
  "http://localhost:3003"
).replace(/\/$/, "");

function assert(
  condition,
  message,
) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readDocumentSlugs() {
  const source = await readFile(
    documentsFile,
    "utf8",
  );

  const matches = Array.from(
    source.matchAll(
      /\bslug:\s*"([^"]+)"/g,
    ),
  );

  const slugs = Array.from(
    new Set(
      matches.map((match) => match[1]),
    ),
  );

  assert(
    slugs.length > 0,
    `No document slugs found in ${documentsFile}`,
  );

  return slugs;
}

async function requestRoute(
  route,
) {
  let response;

  try {
    response = await fetch(
      `${baseUrl}${route.path}`,
      {
        redirect: "follow",
      },
    );
  } catch (error) {
    throw new Error(
      [
        `Could not connect to ${baseUrl}.`,
        "Start the docs development server first:",
        "pnpm --filter docs dev",
        "",
        error instanceof Error
          ? error.message
          : String(error),
      ].join("\n"),
    );
  }

  assert(
    response.status === route.status,
    [
      `${route.path} returned ${response.status}.`,
      `Expected ${route.status}.`,
    ].join(" "),
  );

  const contentType =
    response.headers.get(
      "content-type",
    ) ?? "";

  if (route.contentType) {
    assert(
      contentType.includes(
        route.contentType,
      ),
      [
        `${route.path} returned content type`,
        `"${contentType}".`,
        `Expected "${route.contentType}".`,
      ].join(" "),
    );
  }

  console.log(
    `✓ ${route.status} ${route.path}`,
  );

  return response;
}

async function main() {
  const slugs =
    await readDocumentSlugs();

  const htmlRoutes = [
    "/",
    ...slugs.map(
      (slug) => `/${slug}`,
    ),
  ];

  for (const routePath of htmlRoutes) {
    await requestRoute({
      path: routePath,
      status: 200,
      contentType: "text/html",
    });
  }

  const robotsResponse =
    await requestRoute({
      path: "/robots.txt",
      status: 200,
      contentType: "text/plain",
    });

  const robotsText =
    await robotsResponse.text();

  assert(
    robotsText.includes(
      "https://docs.lifetopiaworld.io/sitemap.xml",
    ),
    "robots.txt does not contain the production sitemap URL.",
  );

  const sitemapResponse =
    await requestRoute({
      path: "/sitemap.xml",
      status: 200,
      contentType: "xml",
    });

  const sitemapText =
    await sitemapResponse.text();

  for (const slug of slugs) {
    assert(
      sitemapText.includes(
        `https://docs.lifetopiaworld.io/${slug}`,
      ),
      `Sitemap is missing /${slug}`,
    );
  }

  await requestRoute({
    path: "/opengraph-image",
    status: 200,
    contentType: "image/png",
  });

  await requestRoute({
    path: "/twitter-image",
    status: 200,
    contentType: "image/png",
  });

  await requestRoute({
    path: "/document-that-does-not-exist",
    status: 404,
    contentType: "text/html",
  });

  console.log("");
  console.log(
    `All ${htmlRoutes.length} public pages and metadata routes passed validation.`,
  );
}

main().catch((error) => {
  console.error("");
  console.error("Route validation failed.");
  console.error(
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});