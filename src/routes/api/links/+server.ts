import { getLinks, getCategories } from "$lib/notion";
import { json } from "@sveltejs/kit";

export const POST = async ({ request }) => {
  const jsonData = await request.json();
  const search = jsonData.search as string;
  if (!search) {
    return json({ message: "No results", data: [] }, { status: 400 });
  }
  const categories = await getCategories();
  //   console.log(categories);
  const allLinks = await Promise.all(
    categories.map(async ({ label }) => {
      return {
        category: label,
        links: await getLinks(label)
      };
    })
  );

  const uniqueCats: Record<string, { href: string; label: string }[]> = {};

  for (const category of allLinks) {
    uniqueCats[category.category] = category.links;
  }

  let links = Object.entries(uniqueCats).filter(([key]) => {
    return key.toLowerCase().replaceAll(" ", "-").includes(search.replaceAll(" ", "-").toLowerCase());
  });

  if (links.length === 0) {
    links = Object.entries(uniqueCats)
      .filter(([, value]) => {
        return value.some(val =>
          val.label.toLowerCase().replaceAll(" ", "").includes(search.replaceAll(" ", "").toLowerCase())
        );
      })
      .map(([key, value]) => {
        return [
          key,
          value.filter(val =>
            val.label.toLowerCase().replaceAll(" ", "-").includes(search.replaceAll(" ", "-").toLowerCase())
          )
        ];
      });
  }
  console.log(links);
  return json({ message: "Nice", data: links }, { status: 200 });
};
