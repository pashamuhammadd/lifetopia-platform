import {
  expect,
  test,
} from "@playwright/test";

const walletEndpoints = [
  "/api/auth/wallet/challenge",
  "/api/auth/wallet/verify",
  "/api/auth/wallet/unlink",
  "/api/auth/wallet-login/challenge",
  "/api/auth/wallet-login/verify",
] as const;

test.describe("wallet API boundaries", () => {
  for (const endpoint of walletEndpoints) {
    test(`${endpoint} rejects an untrusted Origin`, async ({
      request,
    }) => {
      const response =
        await request.post(
          endpoint,
          {
            headers: {
              Origin:
                "https://evil.example",
            },
            data: {},
          },
        );

      expect(response.status()).toBe(403);
      expect(
        response.headers()[
          "cache-control"
        ],
      ).toContain("no-store");

      await expect(
        response.json(),
      ).resolves.toMatchObject({
        success: false,
        code: "untrusted_origin",
      });
    });
  }

  test("wallet linking requires an authenticated account", async ({
    request,
    baseURL,
  }) => {
    const response =
      await request.post(
        "/api/auth/wallet/challenge",
        {
          headers: {
            Origin:
              new URL(
                baseURL!,
              ).origin,
          },
          data: {
            address:
              "11111111111111111111111111111111",
          },
        },
      );

    expect(response.status()).toBe(401);
    expect(
      response.headers()[
        "cache-control"
      ],
    ).toContain("no-store");
  });

  test("wallet login challenge uses a generic malformed-address response", async ({
    request,
    baseURL,
  }) => {
    const response =
      await request.post(
        "/api/auth/wallet-login/challenge",
        {
          headers: {
            Origin:
              new URL(
                baseURL!,
              ).origin,
          },
          data: {
            address:
              "not-a-solana-wallet",
          },
        },
      );

    expect(response.status()).toBe(400);
    await expect(
      response.json(),
    ).resolves.toMatchObject({
      success: false,
      code:
        "wallet_login_unavailable",
    });
  });

  test("wallet login verify rejects an invalid proof before database lookup", async ({
    request,
    baseURL,
  }) => {
    const response =
      await request.post(
        "/api/auth/wallet-login/verify",
        {
          headers: {
            Origin:
              new URL(
                baseURL!,
              ).origin,
          },
          data: {
            challengeId:
              "not-a-uuid",
            signature: "invalid",
            next:
              "https://evil.example",
          },
        },
      );

    expect(response.status()).toBe(400);
    expect(
      response.headers()[
        "cache-control"
      ],
    ).toContain("no-store");
    await expect(
      response.json(),
    ).resolves.toMatchObject({
      success: false,
      code: "invalid_wallet_proof",
    });
  });
});
