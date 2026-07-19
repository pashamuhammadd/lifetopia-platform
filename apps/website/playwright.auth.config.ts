import {
  defineConfig,
  devices,
} from "@playwright/test";

const baseURL =
  process.env.AUTH_QA_BASE_URL ??
  "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/auth",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder:
          "playwright-report/auth",
        open: "never",
      },
    ],
  ],
  outputDir: "test-results/auth",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot:
      "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-auth",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer:
    process.env.AUTH_QA_BASE_URL
      ? undefined
      : {
          command: "pnpm dev",
          url: baseURL,
          reuseExistingServer:
            !process.env.CI,
          timeout: 120_000,
        },
});
