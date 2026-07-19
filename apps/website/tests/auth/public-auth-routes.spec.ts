import {
  expect,
  test,
} from "@playwright/test";

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/wallet-login",
  "/terms",
  "/privacy",
] as const;

for (const route of publicRoutes) {
  test(`${route} renders without a server error`, async ({
    page,
  }) => {
    const response =
      await page.goto(route, {
        waitUntil:
          "domcontentloaded",
      });

    expect(response).not.toBeNull();
    expect(
      response?.status(),
    ).toBeLessThan(500);
    await expect(
      page.locator("body"),
    ).toBeVisible();
  });
}

test("wallet login keeps an external redirect out of the account flow", async ({
  page,
}) => {
  await page.goto(
    "/wallet-login?next=https%3A%2F%2Fevil.example%2Fsteal",
  );

  const fallback = page.getByRole(
    "link",
    {
      name: "Use email and password",
    },
  );

  await expect(fallback).toHaveAttribute(
    "href",
    "/login?next=%2Fdashboard",
  );
});

test("wallet login exposes an explicit provider choice", async ({
  page,
}) => {
  await page.goto("/wallet-login");

  await expect(
    page.getByRole("button", {
      name: "Continue with Phantom",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", {
      name: "Continue with Solflare",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", {
      name: /Trust Wallet/i,
    }),
  ).toHaveCount(0);
});
