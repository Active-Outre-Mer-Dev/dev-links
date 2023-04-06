import { ALGOLIA_ADMIN_KEY, ALGOLIA_APPLICATION_ID } from "$env/static/private";
import algolia from "algoliasearch";

const client = algolia(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("devlinks");
type AlgoliaHit = {
  href: string;
  label: string;
};
export const POST = async ({ request }) => {
  const data = await request.json();
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const { hits } = await index.search<AlgoliaHit>(data.query);
  console.log(hits);
  return new Response(JSON.stringify({ hits }), { headers });
};
