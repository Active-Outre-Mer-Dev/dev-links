import json from "$lib/links.json";
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
type Categories = keyof typeof json;
export const load = () => {
  const values = Object.keys(json) as Categories[];

  return {
    links: values.map(key => ({ href: json[key].href, label: json[key].label }))
  };
};
