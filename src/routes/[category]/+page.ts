import json from "$lib/links.json";

type Categories = keyof typeof json;

export function load(event) {
  const category = event.params.category as Categories;

  return {
    links: json[category].links,
    label: json[category].label
  };
}
