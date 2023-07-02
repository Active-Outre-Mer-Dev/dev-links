import { getLinks } from "$lib/notion.js";

export async function load({ parent }) {
  const { label } = await parent();
  return {
    streamed: {
      links: getLinks(label)
    }
  };
}
