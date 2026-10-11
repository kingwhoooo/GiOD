export const REFRESH_SECONDS = 30 * 60;
export const MAX_CACHE_SECONDS = 24 * 60 * 60;
export const NEWS_LIMIT = 6;
const MAX_HTML_BYTES = 1024 * 1024;
const sourceLanguages = { ru: "ru", kk: "kz", en: "en" };

export function normalizeLanguage(value) {
  return Object.hasOwn(sourceLanguages, value) ? value : "ru";
}

export function sourceUrl(language) {
  return `https://www.akorda.kz/${sourceLanguages[normalizeLanguage(language)]}/events`;
}

function plainText(html) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", ndash: "\u2013", mdash: "\u2014", laquo: "\u00ab", raquo: "\u00bb", rsquo: "\u2019", lsquo: "\u2018" };
  return html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
      if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : "";
    }).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

export function parseHeadlines(html, language) {
  language = normalizeLanguage(language);
  const prefix = `/${sourceLanguages[language]}/`;
  const items = [];
  const seen = new Set();
  // Match only the dated heading cards, not navigation or article body text.
  const cards = /<h3\b[^>]*>\s*<a\b([^>]*)>([\s\S]*?)<\/a>\s*<\/h3>\s*<h5\b[^>]*>([\s\S]*?)<\/h5>/gi;
  for (const [, attributes, heading, date] of html.matchAll(cards)) {
    const href = attributes.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    let url;
    try { url = new URL(plainText(href), "https://www.akorda.kz"); } catch { continue; }
    if (url.origin !== "https://www.akorda.kz" || !url.pathname.startsWith(prefix) || url.username || url.password || url.search || url.hash) continue;
    const title = plainText(heading);
    const publishedLabel = plainText(date);
    if (title.length < 8 || title.length > 500 || !/\b20\d{2}\b/.test(publishedLabel) || publishedLabel.length > 80 || seen.has(url.href)) continue;
    seen.add(url.href);
    items.push({ title, url: url.href, publishedLabel });
    if (items.length === NEWS_LIMIT) break;
  }
  return items;
}

async function readBoundedHtml(response) {
  if (Number(response.headers.get("content-length")) > MAX_HTML_BYTES) throw new Error("Source is too large");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let html = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_HTML_BYTES) throw new Error("Source is too large");
      html += decoder.decode(value, { stream: true });
    }
    return html + decoder.decode();
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally { reader.releaseLock(); }
}

export async function fetchHeadlines(language, fetcher = fetch, signal) {
  language = normalizeLanguage(language);
  const response = await fetcher(sourceUrl(language), {
    redirect: "error", signal,
    headers: { Accept: "text/html", "User-Agent": "MilitaryCollegeNews/1.0 (+https://military-college-humanities.pages.dev/)" }
  });
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) throw new Error("News source unavailable");
  const items = parseHeadlines(await readBoundedHtml(response), language);
  if (!items.length) throw new Error("No dated news cards found");
  return { language, source: "Akorda", sourceUrl: sourceUrl(language), items };
}

function json(data, status = 200, cacheControl = "public, max-age=300") {
  return Response.json(data, { status, headers: { "Cache-Control": cacheControl, "X-Content-Type-Options": "nosniff" } });
}

export async function newsResponse(request, { cache, fetcher = fetch, now = () => Date.now(), waitUntil } = {}) {
  const language = normalizeLanguage(new URL(request.url).searchParams.get("lang"));
  const cacheKey = new Request(`${new URL(request.url).origin}/api/news?lang=${language}`);
  let stored;
  try {
    const response = await cache?.match(cacheKey);
    if (response) stored = await response.json();
  } catch { /* Cache failure must not prevent fetching public news. */ }
  const age = stored ? now() - Date.parse(stored.fetchedAt) : Infinity;
  if (age >= 0 && age < REFRESH_SECONDS * 1000 && stored.items?.length) return json({ ...stored, stale: false });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const result = { ...await fetchHeadlines(language, fetcher, controller.signal), fetchedAt: new Date(now()).toISOString(), stale: false };
    if (cache) {
      const saving = cache.put(cacheKey, json(result, 200, `public, max-age=${MAX_CACHE_SECONDS}`)).catch(() => {});
      if (waitUntil) waitUntil(saving);
      else await saving;
    }
    return json(result);
  } catch {
    if (age >= 0 && age < MAX_CACHE_SECONDS * 1000 && stored.items?.length) return json({ ...stored, stale: true }, 200, "public, max-age=60");
    return json({ language, source: "Akorda", sourceUrl: sourceUrl(language), items: [], error: "news_unavailable" }, 503, "no-store");
  } finally { clearTimeout(timeout); }
}
