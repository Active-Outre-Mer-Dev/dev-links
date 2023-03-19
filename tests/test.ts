import { expect, test } from "@playwright/test";

test("home page has expected title", async ({ page }) => {
  await page.goto("https://dev-links-lemon.vercel.app/");
  expect(await page.title()).toBe("DevLinks");
});
