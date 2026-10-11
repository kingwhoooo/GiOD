import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const dictionaries = vm.runInNewContext(`${await readFile("translations.js", "utf8")}; translations`, {});
const cases = [["ru", "index.html"], ["kk", "kk/index.html"], ["en", "en/index.html"]];
for (const [language, file] of cases) {
  const html = await readFile(file, "utf8");
  assert(html.includes(`<html lang="${language}">`));
  assert(!/noindex|Фамилия Имя Отчество|информация уточняется|кадеттерда|\bкурсант/iu.test(html));
  assert.equal([...html.matchAll(/class="teacher-card"/g)].length, 10);
  assert.equal([...html.matchAll(/<details class="teacher-more">/g)].length, 10);
  assert(html.indexOf('data-i18n="teachers.card10Name"') < html.indexOf('data-i18n="teachers.card1Name"'));
  for (const [, key] of html.matchAll(/data-i18n(?:-aria-label)?="([^"]+)"/g)) assert(dictionaries[language][key], `${file}: missing ${key}`);
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|#)/.test(url)) continue;
    await access(path.resolve(path.dirname(file), url));
  }
  console.log(`${file}: translations, faculty, metadata and local links OK`);
}
const css = await readFile("styles.css", "utf8");
assert(!/nth-child\(n\s*\+\s*11\)|margin-top:\s*-\d|position:\s*sticky[^}]*section-shell/.test(css));
const sitemap = await readFile("sitemap.xml", "utf8");
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 3);
console.log("Sitemap and structural checks OK");
