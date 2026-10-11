import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { fetchHeadlines } from "../lib/akorda-news.mjs";

const destination = new URL("../data/news/", import.meta.url);
const snapshots = [];
// Fetch all languages before writing, so a failed refresh preserves every copy.
for (const language of ["ru", "kk", "en"]) {
  const data = await fetchHeadlines(language, fetch, AbortSignal.timeout(15000));
  snapshots.push({ ...data, fetchedAt: new Date().toISOString(), stale: true });
}
await mkdir(destination, { recursive: true });
for (const snapshot of snapshots) {
  const target = new URL(`${snapshot.language}.json`, destination);
  await writeFile(target, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`Saved ${snapshot.items.length} official headlines: ${fileURLToPath(target)}`);
}
