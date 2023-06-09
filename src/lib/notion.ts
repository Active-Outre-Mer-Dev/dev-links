import { Client } from "@notionhq/client";
import type {
  TitlePropertyItemObjectResponse,
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
  TextRichTextItemResponse,
  UrlPropertyItemObjectResponse,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const notion = new Client({ auth: process.env.NOTION_SECRET });
const categoriesDB = process.env.NOTION_CATEGORIES_ID!;
const articlesDB = process.env.NOTION_ARTICLES_ID!;

type NotionResponse<T> = {
  results: T;
};

type CategoriesDB = {
  properties: {
    Name: Title;
  };
  id: string;
};

type RichText = {
  rich_text: {
    plain_text: string;
  }[];
};

type ArticlesDB = {
  properties: {
    Title: Title;
    Website: RichText;
    Description: RichText;
    URL: UrlPropertyItemObjectResponse;
  };
};

type Title = Omit<TitlePropertyItemObjectResponse, "title"> & { title: { plain_text: string }[] };

export async function getLinks(label: string) {
  const page = (await notion.databases.query({
    database_id: categoriesDB,
    filter: { property: "Name", title: { equals: label } }
  })) as unknown as NotionResponse<CategoriesDB[]>;

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
  })) as unknown as NotionResponse<CategoriesDB[]>;

  return page.results
    .map(value => {
      const label = value.properties.Name.title[0].plain_text;
      const href = `/resources/${label.trim().replaceAll(/ /gi, "-").toLowerCase()}`;
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

export async function getArticles() {
  const page = (await notion.databases.query({
    database_id: articlesDB,
    filter: { property: "Status", select: { equals: "Published" } }
  })) as unknown as NotionResponse<ArticlesDB[]>;
  return page.results.map(value => {
    return {
      title: value.properties.Title.title[0].plain_text,
      href: value.properties.URL.url,
      description: value.properties.Description.rich_text[0].plain_text,
      author: value.properties.Website.rich_text[0].plain_text
    };
  });
}
