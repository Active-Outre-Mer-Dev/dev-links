import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const notion = new Client({ auth: process.env.NOTION_SECRET });
const categoriesDB = process.env.NOTION_CATEGORIES_ID;

export async function getLinks(label) {
  const page = await notion.databases.query({
    database_id: categoriesDB,
    filter: { property: "Name", title: { equals: label } }
  });

  //Get the first entry in the database that matched the filter
  const category = page.results[0];
  const subPage = await notion.blocks.children.list({ block_id: category.id });

  //Get the first child of the page which is always going to be a table
  const table = subPage.results[0];
  if (!table || !table.has_children) return [];

  const values = await notion.blocks.children.list({ block_id: table.id });
  //exclude first row since its the header for the table
  const rows = values.results.slice(1);

  return rows.map(row => {
    const label = row.table_row.cells[0][0].plain_text;
    const href = row.table_row.cells[1][0].plain_text;
    return { label, href };
  });
}
export async function getCategories() {
  const page = await notion.databases.query({
    database_id: categoriesDB,
    filter: { property: "Status", select: { equals: "Published" } }
  });

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

const categories = await getCategories();
const promises = categories.map(async cat => {
  const links = await getLinks(cat.label);
  return {
    ...cat,
    links
  };
});
const links = await Promise.all(promises);
const obj = {};
for (const link of links) {
  obj[link.href] = {
    href: link.href,
    label: link.label,
    links: link.links
  };
}
await fs.writeFile(path.join(process.cwd(), "src", "lib", "links.json"), JSON.stringify(obj, null, 2));

console.log("Links updated");
