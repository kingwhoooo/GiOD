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

function syncNews() {
  newsTrack.querySelectorAll("[data-news-copy]").forEach((element) => element.remove());
  const original = newsTrack.querySelector(".news-message");
  const copy = original.cloneNode(true);
  copy.removeAttribute("data-i18n");
  copy.removeAttribute("data-news-source");
  copy.dataset.newsCopy = "";
  copy.setAttribute("aria-hidden", "true");
  copy.setAttribute("tabindex", "-1");
  newsTrack.append(copy);
  newsStrip.classList.toggle("is-paused", newsPaused);
  newsPause.setAttribute("aria-pressed", String(newsPaused));
  newsPause.setAttribute("aria-label", translate(newsPaused ? "news.resume" : "news.pause"));
  newsPause.querySelector("span").textContent = newsPaused ? "▶" : "Ⅱ";
  document.querySelectorAll("[data-news-source], [data-news-copy]").forEach((link) => {
    const source = new URL("https://www.gov.kz/memleket/entities/mod/press/news");
    source.searchParams.set("lang", language);
    link.href = source.href;
  });
}
newsPause.addEventListener("click", () => { newsPaused = !newsPaused; syncNews(); });

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
  syncNews();
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
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) active = section.id;
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
