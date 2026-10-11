import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain" };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
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
}).listen(4173, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:4173"));
