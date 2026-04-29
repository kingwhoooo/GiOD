const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const stackSections = document.querySelectorAll(".section-stack");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

revealItems.forEach((item, index) => {
  const delay = Math.min(index * 70, 280);
  item.style.setProperty("--reveal-delay", `${delay}ms`);
});

stackSections.forEach((section, index) => {
  section.style.setProperty("--stack-index", String(index + 1));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -70px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
