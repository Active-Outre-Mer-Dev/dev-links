import json from "./src/lib/links.json" assert { type: "json" };
import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import path from "path";
import crypto from "node:crypto";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const client = algoliasearch(process.env.PUBLIC_ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex("devlinks");

const test = Object.values(json)
  .flatMap(({ links }) => links)
  .map(link => ({ ...link, objectID: crypto.randomUUID() }));

index.saveObjects(test).then(({ objectIDs }) => {
  console.log(objectIDs);
});
