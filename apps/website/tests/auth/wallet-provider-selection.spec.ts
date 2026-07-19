import {
  expect,
  test,
} from "@playwright/test";
import type {
  Page,
} from "@playwright/test";

const address =
  "11111111111111111111111111111111";

async function installWalletMocks(
  page: Page,
) {
  await page.addInitScript(
    ({ walletAddress }) => {
      const calls = {
        trustConnect: 0,
        trustSign: 0,
        phantomConnect: 0,
        phantomSign: 0,
        solflareConnect: 0,
        solflareSign: 0,
      };

      const publicKey = {
        toString: () =>
          walletAddress,
      };

      const signature =
        new Uint8Array(64).fill(
          7,
        );

      const trust = {
        isTrust: true,
        publicKey,
        connect: async () => {
          calls.trustConnect += 1;
          return { publicKey };
        },
        signMessage: async () => {
          calls.trustSign += 1;
          return signature;
        },
      };

      const phantom = {
        isPhantom: true,
        publicKey,
        connect: async () => {
          calls.phantomConnect +=
            1;
          return { publicKey };
        },
        signMessage: async () => {
          calls.phantomSign += 1;
          return signature;
        },
      };

      const solflare = {
        isSolflare: true,
        publicKey: null as
          | typeof publicKey
          | null,
        connect: async () => {
          calls.solflareConnect +=
            1;
          solflare.publicKey =
            publicKey;
          // Solflare may resolve without returning
          // a connection result. The UI must read
          // provider.publicKey after connect().
        },
        signMessage: async () => {
          calls.solflareSign += 1;
          return { signature };
        },
      };

      Object.assign(window, {
        __walletCalls: calls,
        solana: trust,
        phantom: {
          solana: phantom,
        },
        solflare,
      });
    },
    { walletAddress: address },
  );
}

async function mockWalletLoginApi(
  page: Page,
) {
  await page.route(
    "**/api/auth/wallet-login/challenge",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify({
          success: true,
          challenge: {
            id:
              "c0a80101-1234-4abc-8def-1234567890ab",
            message:
              "Lifetopia QA wallet proof",
            expiresAt:
              new Date(
                Date.now() +
                  300_000,
              ).toISOString(),
          },
        }),
      });
    },
  );

  await page.route(
    "**/api/auth/wallet-login/verify",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify({
          success: true,
          // A hash-only redirect keeps the same document.
          // This preserves the injected call counters so
          // provider isolation can be asserted reliably.
          next: "#qa-complete",
        }),
      });
    },
  );
}

test.beforeEach(async ({ page }) => {
  await installWalletMocks(page);
  await mockWalletLoginApi(page);
});

test("choosing Phantom never invokes generic Trust Wallet injection", async ({
  page,
}) => {
  await page.goto("/wallet-login");
  await page
    .getByRole("button", {
      name: "Continue with Phantom",
    })
    .click();
  await expect(page).toHaveURL(
    /#qa-complete$/,
  );

  const calls = await page.evaluate(
    () =>
      (
        window as unknown as Window & {
          __walletCalls: Record<
            string,
            number
          >;
        }
      ).__walletCalls,
  );

  expect(calls.phantomSign).toBe(1);
  expect(calls.trustConnect).toBe(0);
  expect(calls.trustSign).toBe(0);
  expect(calls.solflareSign).toBe(0);
});

test("Solflare works when connect resolves void and exposes publicKey on provider", async ({
  page,
}) => {
  await page.goto("/wallet-login");
  await page
    .getByRole("button", {
      name: "Continue with Solflare",
    })
    .click();
  await expect(page).toHaveURL(
    /#qa-complete$/,
  );

  const calls = await page.evaluate(
    () =>
      (
        window as unknown as Window & {
          __walletCalls: Record<
            string,
            number
          >;
        }
      ).__walletCalls,
  );

  expect(calls.solflareConnect).toBe(1);
  expect(calls.solflareSign).toBe(1);
  expect(calls.trustConnect).toBe(0);
  expect(calls.trustSign).toBe(0);
  expect(calls.phantomSign).toBe(0);
});
