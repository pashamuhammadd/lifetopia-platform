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
            "Direct wallet approval no longer loads the Lifetopia platform inside the wallet browser",
          ),
        ).toBeVisible();

        const phantomButton =
          page.getByRole("button", {
            name: "Continue with Phantom",
          });

        const solflareButton =
          page.getByRole("button", {
            name: "Continue with Solflare",
          });

        await expect(
          phantomButton,
        ).toBeVisible();

        await expect(
          solflareButton,
        ).toBeVisible();

        await expect(
          page.locator(
            'a[href*="/ul/browse/"]',
          ),
        ).toHaveCount(0);

        await page.route(
          "https://phantom.app/**",
          (route) => route.abort(),
        );

        const requestPromise =
          page.waitForRequest(
            (request) =>
              request.url().startsWith(
                "https://phantom.app/ul/v1/connect",
              ),
          );

        await phantomButton.click();

        const request =
          await requestPromise;

        const connectUrl = new URL(
          request.url(),
        );

        expect(
          connectUrl.searchParams.get(
            "cluster",
          ),
        ).toBe("mainnet-beta");

        expect(
          connectUrl.searchParams.get(
            "redirect_link",
          ),
        ).toContain(
          "/auth/wallet-mobile/callback",
        );

        expect(
          connectUrl.searchParams.get(
            "dapp_encryption_public_key",
          ),
        ).toBeTruthy();
      },
    );

    test(
      "an incomplete mobile callback fails closed",
      async ({ page }) => {
        await page.goto(
          "/auth/wallet-mobile/callback",
        );

        const walletAlert = page
          .locator('p[role="alert"]')
          .filter({
            hasText:
              "callback is incomplete",
          });

        await expect(
          walletAlert,
        ).toHaveCount(1);
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
