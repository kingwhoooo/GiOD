const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const langLinks = document.querySelectorAll("[data-lang]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const newsStrip = document.querySelector(".news-strip");
const newsPause = document.querySelector(".news-pause");
const newsTrack = document.querySelector(".news-track");
let language = document.documentElement.lang in translations ? document.documentElement.lang : "ru";
let newsPaused = false;
let newsController;
let newsLastAttempt = 0;

const readPreference = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const savePreference = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* The page also works without storage. */ }
};
const translate = (key) => translations[language][key] || translations.ru[key] || "";

function setMenuOpen(open) {
  siteNav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}
menuToggle.addEventListener("click", () => setMenuOpen(!siteNav.classList.contains("is-open")));
siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) setMenuOpen(false);
});

function setTheme(theme) {
  const dark = theme === "dark";
  document.body.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(dark));
}
const savedTheme = readPreference("site-theme");
setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  savePreference("site-theme", theme);
});

function decorateSubjects() {
  document.querySelectorAll(".teacher-subjects").forEach((element) => {
    const text = translate(element.dataset.i18n);
    const separator = text.indexOf(":");
    const subjects = (separator >= 0 ? text.slice(separator + 1) : text).split(",");
    element.replaceChildren(...subjects.map((subject) => {
      const tag = document.createElement("span");
      tag.className = "teacher-tag";
      tag.textContent = subject.trim().replace(/\.$/, "");
      return tag;
    }).filter((tag) => tag.textContent));
  });
}

function decorateExperience() {
  document.querySelectorAll(".teacher-detail[data-i18n]").forEach((element) => {
    const lines = translate(element.dataset.i18n).split(". ");
    const content = lines.flatMap((line, index) => {
      const row = document.createElement("span");
      row.className = "teacher-experience-line";
      const text = line + (index < lines.length - 1 ? "." : "");
      const separator = text.indexOf(":");
      if (separator < 0) row.textContent = text;
      else {
        const value = document.createElement("strong");
        value.textContent = text.slice(separator + 1).trim();
        row.append(document.createTextNode(text.slice(0, separator + 1) + " "), value);
      }
      return index ? [document.createTextNode(" "), row] : [row];
    });
    element.replaceChildren(...content);
  });
}

function syncNews() {
  newsStrip.classList.toggle("is-paused", newsPaused);
  newsPause.setAttribute("aria-pressed", String(newsPaused));
  newsPause.setAttribute("aria-label", translate(newsPaused ? "news.resume" : "news.pause"));
  newsPause.querySelector("span").textContent = newsPaused ? "\u25b6" : "\u2161";
  document.querySelectorAll("[data-news-source]").forEach((link) => {
    link.href = `https://www.akorda.kz/${language === "kk" ? "kz" : language}/events`;
  });
}
newsPause.addEventListener("click", () => { newsPaused = !newsPaused; syncNews(); });

function newsStatus(key) {
  newsStrip.classList.remove("has-news");
  delete newsStrip.dataset.newsFetchedAt;
  const label = newsStrip.querySelector(".news-label");
  label.removeAttribute("data-cache-label");
  label.removeAttribute("title");
  const message = document.createElement("span");
  message.className = "news-message";
  message.textContent = translate(key);
  newsTrack.replaceChildren(message);
  newsPause.disabled = true;
}

function markNewsSaved() {
  const savedAt = new Date(newsStrip.dataset.newsFetchedAt);
  const archived = Date.now() - savedAt.getTime() > 7 * 24 * 60 * 60 * 1000;
  const label = newsStrip.querySelector(".news-label");
  label.dataset.cacheLabel = translate(archived ? "news.archive" : "news.saved");
  label.title = `${translate("news.savedAt")} ${savedAt.toLocaleDateString(language === "kk" ? "kk-KZ" : language === "ru" ? "ru-RU" : "en-GB")}`;
  newsStrip.querySelector(".news-feedback").textContent = translate("news.cached");
}

function renderNews(data) {
  const fetchedAt = Date.parse(data.fetchedAt);
  if (data.language !== language || !Number.isFinite(fetchedAt) || fetchedAt > Date.now() + 5 * 60 * 1000) throw new Error("Invalid news metadata");
  const list = document.createElement("ul");
  list.className = "news-items";
  const prefix = `/${language === "kk" ? "kz" : language}/`;
  for (const item of Array.isArray(data.items) ? data.items.slice(0, 6) : []) {
    let url;
    try { url = new URL(item.url); } catch { continue; }
    if (url.origin !== "https://www.akorda.kz" || !url.pathname.startsWith(prefix) || url.username || url.password || url.search || url.hash) continue;
    if (typeof item.title !== "string" || !item.title.trim() || item.title.length > 500 || typeof item.publishedLabel !== "string" || item.publishedLabel.length > 80 || !/\b20\d{2}\b/.test(item.publishedLabel)) continue;
    const entry = document.createElement("li");
    const link = document.createElement("a");
    link.className = "news-headline";
    link.href = url.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    const date = document.createElement("time");
    date.textContent = item.publishedLabel;
    const title = document.createElement("span");
    title.textContent = item.title;
    link.append(date, title);
    entry.append(link);
    list.append(entry);
  }
  if (!list.children.length) throw new Error("No valid news");
  const copy = list.cloneNode(true);
  copy.dataset.newsCopy = "";
  copy.setAttribute("aria-hidden", "true");
  copy.querySelectorAll("a").forEach((link) => { link.tabIndex = -1; });
  newsTrack.replaceChildren(list, copy);
  newsStrip.classList.add("has-news");
  newsStrip.dataset.newsFetchedAt = data.fetchedAt;
  newsPause.disabled = false;
  const label = newsStrip.querySelector(".news-label");
  if (data.stale) markNewsSaved();
  else {
    label.removeAttribute("data-cache-label");
    label.removeAttribute("title");
    newsStrip.querySelector(".news-feedback").textContent = translate("news.updated");
  }
  requestAnimationFrame(() => newsTrack.style.setProperty("--news-duration", `${Math.max(30, list.scrollWidth / 42)}s`));
  syncNews();
}

async function loadNews(reset = false) {
  newsController?.abort();
  const controller = new AbortController();
  newsController = controller;
  const requestedLanguage = language;
  newsLastAttempt = Date.now();
  if (reset) newsStatus(location.protocol === "file:" ? "news.local" : "news.message");
  if (location.protocol === "file:") return;
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    // A deploy-time copy works even when Cloudflare cannot reach the source.
    if (!newsStrip.classList.contains("has-news")) {
      try {
        const saved = await fetch(`/data/news/${requestedLanguage}.json`, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (saved.ok) {
          const data = await saved.json();
          if (controller !== newsController || requestedLanguage !== language) return;
          renderNews({ ...data, stale: true });
        }
      } catch { /* A missing snapshot must not prevent the live request. */ }
    }
    if (controller !== newsController || requestedLanguage !== language) return;
    const response = await fetch(`/api/news?lang=${requestedLanguage}`, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("News unavailable");
    const data = await response.json();
    if (controller !== newsController || requestedLanguage !== language) return;
    renderNews(data);
  } catch {
    if (controller !== newsController || requestedLanguage !== language) return;
    if (!newsStrip.classList.contains("has-news")) {
      newsStatus("news.unavailable");
      newsStrip.querySelector(".news-feedback").textContent = translate("news.unavailable");
    } else markNewsSaved();
  } finally { clearTimeout(timeout); }
}

setInterval(() => {
  if (!document.hidden) loadNews();
}, 30 * 60 * 1000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && Date.now() - newsLastAttempt >= 30 * 60 * 1000) loadNews();
});

function setLanguage(next) {
  language = next in translations ? next : "ru";
  document.documentElement.lang = language;
  document.title = translate("site.title");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });
  const description = translate("meta.description");
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = translate("site.title");
  document.querySelector('meta[property="og:description"]').content = description;
  langLinks.forEach((link) => {
    const active = link.dataset.lang === language;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  decorateSubjects();
  decorateExperience();
  syncNews();
  loadNews(true);
}

langLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    savePreference("site-language", link.dataset.lang);
    // Files can be previewed directly; hosted pages use crawlable language URLs.
    if (location.protocol === "file:") {
      event.preventDefault();
      setLanguage(link.dataset.lang);
    } else {
      const destination = new URL(link.href);
      destination.hash = location.hash;
      link.href = destination.href;
    }
  });
});
setLanguage(location.protocol === "file:" ? readPreference("site-language") || language : language);
document.querySelector("#year").textContent = new Date().getFullYear();

const animatedItems = document.querySelectorAll(".teacher-card, .timeline-card, .stat");
function showItem(element) {
  element.classList.remove("is-pending");
  element.classList.add("is-visible");
}
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      showItem(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: "60px 0px" });
  animatedItems.forEach((element) => {
    element.classList.add("reveal");
    if (element.getBoundingClientRect().top > innerHeight + 80) element.classList.add("is-pending");
    observer.observe(element);
  });
  // A failed observer must never leave real content permanently hidden.
  setTimeout(() => {
    animatedItems.forEach(showItem);
    observer.disconnect();
  }, 5000);
}
function revealAnchorTarget() {
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  target.querySelectorAll(".is-pending").forEach(showItem);
}
window.addEventListener("hashchange", revealAnchorTarget);
revealAnchorTarget();
const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
let navFrame = null;
function updateNavigation() {
  navFrame = null;
  let active = "";
  const navOffset = document.querySelector(".site-header").getBoundingClientRect().bottom + 32;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= navOffset) active = section.id;
  }
  siteNav.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === "#" + active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", () => {
  if (navFrame === null) navFrame = requestAnimationFrame(updateNavigation);
}, { passive: true });
window.addEventListener("resize", () => {
  if (innerWidth > 1100) setMenuOpen(false);
});
updateNavigation();
