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
const failedData = await expired.json();
assert.equal(failedData.items.length, 0);
assert.equal(failedData.code, "source_network");

await assert.rejects(fetchHeadlines("ru", async () => new Response("blocked", { status: 403 })));
await assert.rejects(fetchHeadlines("ru", async () => new Response("{}", { headers: { "Content-Type": "application/json" } })));
await assert.rejects(fetchHeadlines("ru", async () => new Response("<html></html>", { headers: { "Content-Type": "text/html", "Content-Length": "2000000" } })));
let redirects = 0;
const redirected = await fetchHeadlines("ru", async (_, options) => {
  assert.equal(options.redirect, "manual");
  redirects++;
  return redirects === 1
    ? new Response(null, { status: 301, headers: { Location: "/ru/events/" } })
    : new Response(card(), { headers: { "Content-Type": "text/html" } });
});
assert.equal(redirected.items.length, 1);
assert.equal(redirects, 2);
for (const location of ["https://example.com/ru/events", "https://user@www.akorda.kz/ru/events", "/en/events", "http://www.akorda.kz/ru/events", "/ru/events?next=other", "http://["]) {
  await assert.rejects(fetchHeadlines("ru", async () => new Response(null, { status: 302, headers: { Location: location } })), { code: "source_redirect" });
}
await assert.rejects(fetchHeadlines("ru", async () => new Response(null, { status: 302, headers: { Location: "/ru/events/" } })), { code: "source_redirect" });
const failures = [];
for (const [status, body, contentType, code] of [
  [403, "blocked", "text/html", "source_http"],
  [200, "{}", "application/json", "source_content_type"],
  [200, "<html>Changed source</html>", "text/html", "source_markup"]
]) {
  const response = await newsResponse(request("ru"), {
    fetcher: async () => new Response(body, { status, headers: { "Content-Type": contentType } }),
    onError: (failure) => failures.push(failure)
  });
  const data = await response.json();
  assert.equal(response.status, 503);
  assert.equal(data.code, code);
  assert.equal(data.upstreamStatus, status === 403 ? status : undefined);
  assert.equal("stack" in data || "message" in data, false);
}
assert.equal(failures.length, 3);
const loggerFailure = await newsResponse(request("ru"), { fetcher: async () => { throw new Error("Offline"); }, onError: () => { throw new Error("Logger offline"); } });
assert.equal(loggerFailure.status, 503);
for (const language of ["ru", "kk", "en"]) {
  const snapshot = JSON.parse(await readFile(`data/news/${language}.json`, "utf8"));
  assert.equal(snapshot.language, language);
  assert.equal(snapshot.stale, true);
  assert.equal(snapshot.sourceUrl, sourceUrl(language));
  assert.equal(snapshot.items.length, 6);
  assert.equal(Number.isFinite(Date.parse(snapshot.fetchedAt)), true);
  assert.equal(Date.parse(snapshot.fetchedAt) <= Date.now() + 5 * 60 * 1000, true);
  assert.equal(new Set(snapshot.items.map((item) => item.url)).size, 6);
  for (const item of snapshot.items) {
    assert.equal(new URL(item.url).origin, "https://www.akorda.kz");
    assert.equal(new URL(item.url).pathname.startsWith(`/${language === "kk" ? "kz" : language}/`), true);
    assert.equal(/\b20\d{2}\b/.test(item.publishedLabel), true);
    assert.equal(item.title.length >= 8 && item.title.length <= 500, true);
  }
}
const routes = JSON.parse(await readFile("_routes.json", "utf8"));
assert.deepEqual(routes.include, ["/api/news"]);
assert.equal(routes.version, 1);
console.log("News parsing, safe redirects, diagnostics, caching and three saved language feeds OK");

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
