import json from "$lib/links.json";
import { error } from "@sveltejs/kit";
type Categories = keyof typeof json;

export function load(event) {
  const category = event.params.category as Categories;
  const keys = Object.keys(json);
  if (!keys.includes(category)) {
    throw error(404, "Page not found");
  }
  const categories = Object.values(json).map(({ href, label }) => ({
    href,
    label,
    current: event.url.pathname === href
  }));
  return {
    links: json[category].links,
    label: json[category].label,
    categories
  };
}
