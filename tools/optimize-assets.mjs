import { readdir, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const files = (await readdir("assets")).filter((name) => name.endsWith(".png") && !["favicon.png", "emblem-social.png"].includes(name));
let originalBytes = 0;
let optimizedBytes = 0;
for (const file of files) {
  const input = path.join("assets", file);
  const output = input.replace(/\.png$/, ".webp");
  await sharp(input).resize({ width: file === "emblem-circle.png" ? 640 : 600, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(output);
  originalBytes += (await stat(input)).size;
  optimizedBytes += (await stat(output)).size;
}
await sharp("assets/emblem-circle.png").resize(48, 48).png().toFile("assets/favicon.png");
await sharp("assets/emblem-circle.png").resize(640, 640).png({ palette: true, quality: 90 }).toFile("assets/emblem-social.png");
console.log(JSON.stringify({ files: files.length, originalBytes, optimizedBytes }));
