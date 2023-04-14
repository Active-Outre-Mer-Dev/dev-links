import { Client } from "@notionhq/client";
import { NOTION_SECRET, NOTION_CATEGORIES_ID } from "$env/static/private";
import type {
  TitlePropertyItemObjectResponse,
  TableBlockObjectResponse,
  TableRowBlockObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: NOTION_SECRET });
const categoriesDB = NOTION_CATEGORIES_ID;

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

export async function getLinks(label: string) {
  const page = (await notion.databases.query({
    database_id: categoriesDB,
    filter: { property: "Name", title: { equals: label } }
  })) as unknown as NotionResponse;

  //Get the first entry in the database that matched the filter
  const category = page.results[0];
  const subPage = await notion.blocks.children.list({ block_id: category.id });

  //Get the first child of the page which is always going to be a table
  const table = subPage.results[0] as unknown as TableBlockObjectResponse;
  if (!table || !table.has_children) return [];

  const values = await notion.blocks.children.list({ block_id: table.id });
  //exclude first row since its the header for the table
  const rows = values.results.slice(1) as unknown as TableRowBlockObjectResponse[];

  return rows.map(row => {
    const label = row.table_row.cells[0][0].plain_text;
    const href = row.table_row.cells[1][0].plain_text;
    return { label, href };
  });
}
export async function getCategories() {
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
