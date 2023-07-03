import { getLinks, getCategories } from "$lib/notion";
import { json } from "@sveltejs/kit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

export const POST = async ({ request }) => {
  const jsonData = await request.json();
  const search = jsonData.search as string;
  if (!search) {
    return json({ message: "No results", data: [] }, { status: 400 });
  }
  const redisKey = `links:${search.toLowerCase().trim().replaceAll(" ", "-")}`;
  //First check redis cache and return if there is data
  const result = await redis.get<string>(redisKey);

  if (result) {
    return json({ message: "Nice", data: result }, { status: 200 });
  }

  const categories = await getCategories();
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
  //Add result to redis for 1 hour for all subsequent searches with same value
  await redis.set(redisKey, JSON.stringify(links), { ex: 60 * 60 });
  return json({ message: "Nice", data: links }, { status: 200 });
};
