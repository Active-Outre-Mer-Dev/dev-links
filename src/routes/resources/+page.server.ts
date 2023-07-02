import { getCategories } from "$lib/notion";
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

export const load = async () => {
  const links = await getCategories();
  return {
    links
  };
};
