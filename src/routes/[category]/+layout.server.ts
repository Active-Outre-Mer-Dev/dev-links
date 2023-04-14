import { error } from "@sveltejs/kit";
import { getLinks, getCategories } from "$lib/notion.js";

export async function load(event) {
  const route = event.params.category;
  const categories = (await getCategories()).map(category => ({
    ...category,
    current: category.href === route
  }));
  const current = categories.find(cat => cat.current);
  if (!current) {
    throw error(404, "Page not found");
  }
  const links = await getLinks(current.label);
  return {
    links,
    label: current?.label,
    categories: categories.map(category => ({ ...category, current: category.href === route }))
  };
}
