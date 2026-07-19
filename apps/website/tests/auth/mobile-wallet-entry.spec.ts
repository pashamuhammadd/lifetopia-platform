import {
  expect,
  test,
} from "@playwright/test";

const androidUserAgent =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36";

test.describe(
  "Android mobile wallet entry",
  () => {
    test.use({
      userAgent: androidUserAgent,
      viewport: {
        width: 412,
        height: 915,
      },
      hasTouch: true,
      isMobile: true,
    });

    test(
      "wallet login exposes the Android wallet chooser action",
      async ({ page }) => {
        await page.goto(
          "/wallet-login?next=https%3A%2F%2Fcommunity.lifetopiaworld.io%2F",
        );

        await expect(
          page.getByRole("button", {
            name: "Continue with a mobile wallet",
          }),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Android will open its wallet chooser",
          ),
        ).toBeVisible();

        await expect(
          page.getByRole("button", {
            name: "Continue with Phantom",
          }),
        ).toHaveCount(0);
      },
    );
  },
);

test.describe(
  "desktop wallet regression",
  () => {
    test(
      "generic Trust Wallet injection is not treated as Phantom",
      async ({ page }) => {
        await page.addInitScript(
          () => {
            Object.defineProperty(
              window,
              "solana",
              {
                configurable: true,
                value: {
                  isTrust: true,
                  connect: () =>
                    Promise.resolve(),
                },
              },
            );
          },
        );

        await page.goto(
          "/wallet-login",
        );

        await expect(
          page.getByRole("button", {
            name: "Continue with a mobile wallet",
          }),
        ).toHaveCount(0);

        await page
          .getByRole("button", {
            name: "Continue with Phantom",
          })
          .click();

        const walletAlert = page
          .locator('div[role="alert"]')
          .filter({
            hasText:
              "Phantom was not detected",
          });

        await expect(
          walletAlert,
        ).toHaveCount(1);

        await expect(
          walletAlert,
        ).toContainText(
          "Phantom was not detected",
        );
      },
    );
  },
);
