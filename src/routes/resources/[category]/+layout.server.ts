import { error } from "@sveltejs/kit";
import { getCategories } from "$lib/notion.js";

export async function load(event) {
  const route = `/resources/${event.params.category}`;
  console.log(route);
  const categories = (await getCategories()).map(category => ({
    ...category,
    current: category.href === route
  }));
  const current = categories.find(cat => cat.current);
  console.log(current);
  if (!current) {
    throw error(404, "Page not found");
  }
  return {
    label: current?.label,
    categories
  };
}
