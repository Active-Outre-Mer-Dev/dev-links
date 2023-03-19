import { expect, test } from "@playwright/test";
import links from "../src/lib/links.json" assert { type: "json" };

test.beforeEach(async ({ page }) => {
  await page.goto("https://dev-links-lemon.vercel.app/");
});

test("home page has expected title", async ({ page }) => {
  expect(await page.title()).toBe("DevLinks");
});

test("Links are visible", async ({ page }) => {
  const promises = links.tech.map(async link => {
    return expect(page.getByRole("link", { name: link.label })).toBeVisible();
  });
  await Promise.all(promises);
});

test("Links have correct href", async ({ page }) => {
  const promises = links.tech.map(async link => {
    return expect(await page.getByRole("link", { name: link.label }).getAttribute("href")).toBe(link.href);
  });
  await Promise.all(promises);
});
