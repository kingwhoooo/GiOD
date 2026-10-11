import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fetchHeadlines, newsResponse, normalizeLanguage, parseHeadlines, sourceUrl, MAX_CACHE_SECONDS, REFRESH_SECONDS } from "../lib/akorda-news.mjs";

const card = (prefix = "ru", title = "Official headline &amp; details", url = `/${prefix}/official-headline-12345`) => `<h3><a href="${url}">${title}</a></h3>\n<h5 class="mt-3">9 October 2026</h5>`;
assert.equal(normalizeLanguage("kk"), "kk");
assert.equal(normalizeLanguage("../../other"), "ru");
assert.equal(sourceUrl("kk"), "https://www.akorda.kz/kz/events");
assert.equal(parseHeadlines(card(), "ru")[0].title, "Official headline & details");
assert.equal(parseHeadlines(card("kz"), "kk").length, 1);
assert.equal(parseHeadlines(card("en"), "ru").length, 0);
assert.equal(parseHeadlines(card("ru", "Untrusted heading", "https://example.com/ru/news"), "ru").length, 0);
assert.equal(parseHeadlines(card("ru", "Untrusted heading", "javascript:alert(1)"), "ru").length, 0);
assert.equal(parseHeadlines(card("ru", "Untrusted heading", "https://attacker@www.akorda.kz/ru/news"), "ru").length, 0);
assert.equal(parseHeadlines(card() + card(), "ru").length, 1);
assert.equal(parseHeadlines(card("ru", "Invalid numeric entity &#9999999999999999;"), "ru").length, 1);
assert.equal(parseHeadlines("<h3>Navigation</h3><p>No dated news cards</p>", "ru").length, 0);

const saved = new Map();
const cache = {
  async match(request) { return saved.get(request.url)?.clone(); },
  async put(request, response) { saved.set(request.url, response.clone()); }
};
let now = Date.parse("2026-10-11T12:00:00Z");
let requests = 0;
let failing = false;
const fetcher = async (url) => {
  requests++;
  if (failing) throw new Error("Source offline");
  const prefix = new URL(url).pathname.split("/")[1];
  return new Response(card(prefix), { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
const request = (language) => new Request(`https://college.example/api/news?lang=${language}`);
const options = { cache, fetcher, now: () => now };
const first = await newsResponse(request("ru"), options);
assert.equal(first.status, 200);
assert.equal((await first.json()).items.length, 1);
assert.equal(requests, 1);
const cached = await newsResponse(request("ru"), options);
assert.equal((await cached.json()).stale, false);
assert.equal(requests, 1);
await newsResponse(request("kk"), options);
assert.equal(requests, 2);
now += (REFRESH_SECONDS + 1) * 1000;
await newsResponse(request("ru"), options);
assert.equal(requests, 3);
now += (REFRESH_SECONDS + 1) * 1000;
failing = true;
const stale = await newsResponse(request("ru"), options);
assert.equal(stale.status, 200);
assert.equal((await stale.json()).stale, true);
now += MAX_CACHE_SECONDS * 1000;
const expired = await newsResponse(request("ru"), options);
assert.equal(expired.status, 503);
assert.equal(expired.headers.get("cache-control"), "no-store");
assert.equal((await expired.json()).items.length, 0);

await assert.rejects(fetchHeadlines("ru", async () => new Response("blocked", { status: 403 })));
await assert.rejects(fetchHeadlines("ru", async () => new Response("{}", { headers: { "Content-Type": "application/json" } })));
await assert.rejects(fetchHeadlines("ru", async () => new Response("<html></html>", { headers: { "Content-Type": "text/html", "Content-Length": "2000000" } })));
const routes = JSON.parse(await readFile("_routes.json", "utf8"));
assert.deepEqual(routes.include, ["/api/news"]);
assert.equal(routes.version, 1);
console.log("News parsing, source allowlist, languages, caching and outage fallback OK");

// Optional saved public pages verify the parser against the real source markup.
for (const value of process.argv.slice(2)) {
  const separator = value.indexOf("=");
  const language = value.slice(0, separator);
  const file = value.slice(separator + 1);
  assert.equal(separator >= 0, true);
  const items = parseHeadlines(await readFile(file, "utf8"), language);
  assert.equal(items.length, 6, `${language}: expected six official news cards`);
  console.log(`${language}: six real dated headlines parsed from Akorda`);
}
