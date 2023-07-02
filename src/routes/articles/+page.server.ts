import { getArticles } from "$lib/notion";

export const load = async () => {
  const articles = await getArticles();
  return {
    articles
  };
};
