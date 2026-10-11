import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { newsResponse } from "../lib/akorda-news.mjs";

const root = process.cwd();
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json; charset=utf-8" };
const port = Number(process.env.PORT || 4173);
const offline = process.env.NEWS_OFFLINE === "1";
const storedNews = new Map();
const newsCache = {
  async match(key) { return storedNews.get(key.url)?.clone(); },
  async put(key, response) { storedNews.set(key.url, response.clone()); }
};
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/api/news" && request.method === "GET") {
      const result = await newsResponse(new Request(new URL(request.url, `http://127.0.0.1:${port}`)), {
        cache: newsCache,
        ...(offline ? { fetcher: async () => { throw new Error("Simulated source outage"); } } : {})
      });
      response.writeHead(result.status, Object.fromEntries(result.headers));
      response.end(await result.text());
      return;
    }
    let target = path.resolve(root, "." + pathname);
    if (!target.startsWith(root + path.sep) && target !== root) throw new Error("Outside root");
    if (pathname.includes("/.")) throw new Error("Hidden path");
    if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    response.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}${offline ? " (news source offline)" : ""}`));
