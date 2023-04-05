import json from "$lib/links.json";

type Categories = keyof typeof json;

export function load(event) {
  const category = event.params.category as Categories;
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
