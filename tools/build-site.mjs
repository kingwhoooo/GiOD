import { readFile, writeFile, mkdir } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("translations.js", "utf8");
const translations = vm.runInNewContext(`${source}; translations`, {});
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
let template = (await readFile("index.html", "utf8")).trimEnd();

template = template.replace(/<article class="teacher-card">([\s\S]*?)<\/article>/g, (_, content) => {
  if (content.includes('class="teacher-more"')) return `<article class="teacher-card">${content}</article>`;
  const select = (pattern) => content.match(pattern)?.[0] || "";
  const photo = select(/<div class="teacher-photo[\s\S]*?<\/div>/);
  const name = select(/<h3 class="teacher-name"[\s\S]*?<\/h3>/);
  const role = select(/<span class="teacher-role"[\s\S]*?<\/span>/);
  const experience = select(/<span class="teacher-detail"[\s\S]*?<\/span>/);
  const subjects = select(/<p class="teacher-subjects"[\s\S]*?<\/p>/);
  const bio = select(/<p class="teacher-bio"[\s\S]*?<\/p>/);
  if (!photo || !name || !role || !experience || !subjects || !bio) throw new Error("Incomplete teacher card.");
  return `<article class="teacher-card">\n${photo}\n${name}\n${role}\n${subjects}\n${experience}\n<details class="teacher-more"><summary data-i18n="teachers.more">Образование и методическая работа</summary>\n${bio}\n</details>\n</article>`;
});

template = template.replace(/<img src="assets\/([^".]+)\.png"([^>]*)>/g, (_, name, attributes) => `<img src="assets/${name}.webp"${attributes} width="600" height="750" decoding="async">`);
template = template.replace(/(<meta property="og:image" content=")[^"]+/, '$1https://military-college-humanities.pages.dev/assets/emblem-social.png');
const usedKeys = new Set([...template.matchAll(/data-i18n(?:-aria-label)?="([^"]+)"/g)].map((match) => match[1]));
for (const key of ["site.title", "meta.description", "news.resume", "news.unavailable", "news.local", "news.updated", "news.cached", "news.saved", "news.archive", "news.savedAt"]) usedKeys.add(key);
for (const language of Object.keys(translations)) {
  translations[language] = Object.fromEntries(Object.entries(translations[language]).filter(([key]) => usedKeys.has(key)));
}
await writeFile("translations.js", `// Shared content for the three language versions.\nconst translations = ${JSON.stringify(translations, null, 2)};\n`);
const languages = ["ru", "kk", "en"];
const origin = "https://military-college-humanities.pages.dev";
for (const language of languages) {
  const dictionary = translations[language];
  const lookup = (key) => {
    if (!dictionary[key]) throw new Error(`Missing ${language} translation: ${key}`);
    return dictionary[key];
  };
  let html = template.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g, (_, tag, attributes, key) => `<${tag}${attributes}>${escape(lookup(key))}</${tag}>`);
  html = html.replace(/(<[^>]+data-i18n-aria-label="([^"]+)"[^>]*>)/g, (tag, _, key) => {
    const label = `aria-label="${escape(lookup(key))}"`;
    return /\saria-label="[^"]*"/.test(tag) ? tag.replace(/\saria-label="[^"]*"/, ` ${label}`) : tag.replace(/>$/, ` ${label}>`);
  });
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${language}">`);
  html = html.replace(/(<span id="year">)[^<]*/, `$1${new Date().getFullYear()}`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(lookup("site.title"))}</title>`);
  html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${escape(lookup("meta.description"))}`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(lookup("site.title"))}`);
  html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*/, `$1${escape(lookup("meta.description"))}`);
  const canonical = `${origin}/${language === "ru" ? "" : language + "/"}`;
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonical}`);
  html = html.replace(/<a class="lang-button[^>]+>/g, (tag) => {
    const target = tag.match(/data-lang="([^"]+)"/)[1];
    const prefix = language === "ru" ? "" : "../";
    const href = target === "ru" ? prefix || "./" : `${prefix}${target}/`;
    return tag.replace(/href="[^"]*"/, `href="${href}"`).replace(/class="[^"]*"/, `class="lang-button${target === language ? " is-active" : ""}"`);
  });
  html = html.replace(/href="https:\/\/www\.akorda\.kz\/ru\/events"/g, `href="https://www.akorda.kz/${language === "kk" ? "kz" : language}/events"`);
  if (language !== "ru") {
    html = html.replaceAll('src="assets/', 'src="../assets/').replaceAll('href="assets/', 'href="../assets/');
    html = html.replace(/(src|href)="(styles\.css|translations\.js|script\.js)"/g, '$1="../$2"');
    await mkdir(language, { recursive: true });
  }
  const output = language === "ru" ? "index.html" : `${language}/index.html`;
  await writeFile(output, html + "\n");
  console.log(`Built ${output}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${languages.map((language) => `  <url><loc>${origin}/${language === "ru" ? "" : language + "/"}</loc>\n${languages.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate}" href="${origin}/${alternate === "ru" ? "" : alternate + "/"}"/>`).join("\n")}\n  </url>`).join("\n")}\n</urlset>\n`;
await writeFile("sitemap.xml", sitemap);
