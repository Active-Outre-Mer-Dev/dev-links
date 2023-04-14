import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4173/");
});

test.describe("Category links", () => {
  test("All other links are inactive", async ({ page }) => {
    await page.getByRole("link", { name: "Tech Resources" }).click();
    for (const li of await page.getByRole("link").all()) {
      if (li.getByRole("link", { name: "Tech Resources" })) continue;
      expect(await li.getAttribute("data-current")).toBeFalsy();
    }
  });
});
