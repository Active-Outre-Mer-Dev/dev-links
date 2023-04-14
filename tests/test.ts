import { Client } from "@notionhq/client";
import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import type { TitlePropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const notion = new Client({ auth: process.env.NOTION_SECRET });
const categoriesDB = process.env.NOTION_CATEGORIES_ID!;

type NotionResponse = {
  results: CategoriesDB[];
};

type CategoriesDB = {
  properties: {
    Name: Title;
  };
  id: string;
};

type Title = Omit<TitlePropertyItemObjectResponse, "title"> & { title: { plain_text: string }[] };
async function getCategories() {
  const page = (await notion.databases.query({
    database_id: categoriesDB,
    filter: { property: "Status", select: { equals: "Published" } }
  })) as unknown as NotionResponse;

  return page.results
    .map(value => {
      const label = value.properties.Name.title[0].plain_text;
      const href = label.trim().replaceAll(/ /gi, "-").toLowerCase();
      return { label, href };
    })
    .sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } else {
        return 0;
      }
    });
}

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4173/");
});

test("home page has expected title", async ({ page }) => {
  expect(await page.title()).toBe("DevLinks");
});

test("Links are visible", async ({ page }) => {
  const links = await getCategories();
  const promises = links.map(async link => {
    return expect(page.getByRole("link", { name: link.label })).toBeVisible();
  });
  await Promise.all(promises);
});

test("Links have correct href", async ({ page }) => {
  const links = await getCategories();

  const promises = links.map(async link => {
    return expect(await page.getByRole("link", { name: link.label }).getAttribute("href")).toBe(link.href);
  });
  await Promise.all(promises);
});
