document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;
    target.setAttribute("tabindex", "-1");
  });
});

const navLinks = Array.from(document.querySelectorAll(".nav-links a[data-section]"));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

const setActiveNav = () => {
  const offset = window.innerHeight * 0.32;
  let activeId = sections[0]?.id;
  const isNearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) {
      activeId = section.id;
    }
  });

  if (isNearBottom && sections.length) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === activeId);
  });
};

const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const preferredTheme = localStorage.getItem("portfolio-theme");

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  if (!themeToggle || !themeLabel) return;

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "切换日间模式" : "切换夜间模式");
  themeLabel.textContent = isDark ? "Day" : "Night";
};

applyTheme(preferredTheme || "light");
setActiveNav();

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("resize", setActiveNav);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.toggle("is-active", item === link);
    });
  });
});

const projectTocLinks = Array.from(document.querySelectorAll(".project-toc a"));
const projectStorySections = projectTocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveProjectToc = () => {
  if (!projectStorySections.length) return;

  const offset = Math.min(180, window.innerHeight * 0.28);
  let activeId = projectStorySections[0].id;

  projectStorySections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) {
      activeId = section.id;
    }
  });

  projectTocLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

setActiveProjectToc();
window.addEventListener("scroll", setActiveProjectToc, { passive: true });
window.addEventListener("resize", setActiveProjectToc);

projectTocLinks.forEach((link) => {
  link.addEventListener("click", () => {
    projectTocLinks.forEach((item) => {
      item.classList.toggle("is-active", item === link);
    });
  });
});
