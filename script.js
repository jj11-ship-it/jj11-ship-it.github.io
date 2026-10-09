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

const demoData = {
  "project-1": {
    eyebrow: "Project Case Study",
    title: "新生办事台 CampusMate",
    subtitle: "可信校园办事 AI · 2026",
    intro: "这不是一个敢答不敢负责的通用问答。它把散落在官网、PDF 与手册里的办事规则，变成每条带官方引用、查不到就明说的可信问答；再把“我要报到、办卡、交学费”这类多步骤需求，变成带引用、可确认、可勾选跟踪的任务清单。可信优先于回答率——用户照答案办事之前，先能核验答案。",
    showcaseTitle: "系统界面流程",
    showcaseSub: "从提问到任务跟踪的 15 个流程界面",
    showcaseDesc: "按真实产品闭环查看：登录进入 → 可信问答（带引用回答、原文核验与明确拒答）→ 新生办事台（多方案任务清单、用户确认与状态管理）→ 知识库治理与质量看板。点击任意图片可查看高清原图。",
    screenshots: [
      { num: "01", title: "阶段 1（1/5）｜登录页：进入新生办事台", web: "projects/project_1/web/1.jpg", full: "projects/project_1/1.png" },
      { num: "02", title: "阶段 1（2/5）｜对话页初始态：快捷问题与三栏布局", web: "projects/project_1/web/2.jpg", full: "projects/project_1/2.png" },
      { num: "03", title: "阶段 1（3/5）｜可信问答：宿舍电费问题，回答附多条官方引用", web: "projects/project_1/web/3.jpg", full: "projects/project_1/3.png" },
      { num: "04", title: "阶段 1（4/5）｜引用核验：展开引用，逐字查看原文片段", web: "projects/project_1/web/4.jpg", full: "projects/project_1/4.png" },
      { num: "05", title: "阶段 1（5/5）｜明确拒答：知识库外问题，说明没有依据并指路人工渠道", web: "projects/project_1/web/5.jpg", full: "projects/project_1/5.png" },
      { num: "06", title: "阶段 2（1/5）｜新生办事台：办事指南，六类事务入口", web: "projects/project_1/web/6.jpg", full: "projects/project_1/6.png" },
      { num: "07", title: "阶段 2（2/5）｜我的报到计划：输入需求与 Agent 执行过程（检索→生成→校验）", web: "projects/project_1/web/7.jpg", full: "projects/project_1/7.png" },
      { num: "08", title: "阶段 2（3/5）｜任务清单：报到、办卡、缴费拆解为三条任务卡", web: "projects/project_1/web/8.jpg", full: "projects/project_1/8.png" },
      { num: "09", title: "阶段 2（4/5）｜任务清单（续）：方案展开与引用明细", web: "projects/project_1/web/9.jpg", full: "projects/project_1/9.png" },
      { num: "10", title: "阶段 2（5/5）｜确认保存：五状态勾选与任务跟踪", web: "projects/project_1/web/10.jpg", full: "projects/project_1/10.png" },
      { num: "11", title: "阶段 3（1/5）｜知识库管理：36 份官方资料与有效/废止状态标记", web: "projects/project_1/web/11.jpg", full: "projects/project_1/11.png" },
      { num: "12", title: "阶段 3（2/5）｜质量看板：RAG 质量指标与延迟分解", web: "projects/project_1/web/12.jpg", full: "projects/project_1/12.png" },
      { num: "13", title: "阶段 3（3/5）｜评测成绩：RAG 评测指标与知识库构成", web: "projects/project_1/web/13.jpg", full: "projects/project_1/13.png" },
      { num: "14", title: "阶段 3（4/5）｜FAQ 管理：常见问题维护", web: "projects/project_1/web/14.jpg", full: "projects/project_1/14.png" },
      { num: "15", title: "阶段 3（5/5）｜系统设置：模型与参数配置", web: "projects/project_1/web/15.jpg", full: "projects/project_1/15.png" }
    ]
  }
};

let demoDialog = null;

const getDemoDialog = () => {
  if (demoDialog) return demoDialog;
  demoDialog = document.createElement("dialog");
  demoDialog.className = "demo-dialog";
  demoDialog.innerHTML = `
    <div class="demo-header">
      <div>
        <p class="eyebrow"></p>
        <h3></h3>
      </div>
      <button class="demo-close" type="button" aria-label="关闭">×</button>
    </div>
    <div class="demo-body"></div>
  `;
  document.body.appendChild(demoDialog);

  demoDialog.querySelector(".demo-close").addEventListener("click", () => demoDialog.close());

  demoDialog.addEventListener("click", (event) => {
    if (event.target === demoDialog) demoDialog.close();
  });

  demoDialog.addEventListener("close", () => {
    document.body.classList.remove("demo-open");
  });

  return demoDialog;
};

const getDemoLightbox = () => {
  let lightbox = document.querySelector(".demo-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "demo-lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = '<img alt="截图高清原图">';
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => {
      lightbox.hidden = true;
      lightbox.querySelector("img").src = "";
    });
  }
  return lightbox;
};

const renderDemoBody = (demo) => {
  const cards = demo.screenshots
    .map(
      (s) => `
      <figure class="demo-card" data-full="${s.full}" role="button" tabindex="0" aria-label="查看 ${s.num} 高清原图">
        <div class="demo-figure">
          <img src="${s.web}" alt="${s.title}" loading="lazy">
          <span class="demo-zoom">查看高清原图</span>
        </div>
        <figcaption class="demo-caption">
          <span>${s.num}</span>
          <strong>${s.title}</strong>
        </figcaption>
      </figure>`
    )
    .join("");

  return `
    <section class="demo-hero">
      <span class="demo-subtitle">${demo.subtitle}</span>
      <p class="demo-intro">${demo.intro}</p>
    </section>
    <section class="demo-showcase">
      <div class="demo-showcase-head">
        <h4>${demo.showcaseTitle}</h4>
        <p>${demo.showcaseSub} · ${demo.showcaseDesc}</p>
      </div>
      <div class="demo-grid">${cards}</div>
      <p class="demo-tip">${demo.showcaseDesc}</p>
    </section>
  `;
};

document.querySelectorAll("[data-demo]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const demo = demoData[link.dataset.demo];
    if (!demo) return;

    const dialog = getDemoDialog();
    dialog.querySelector(".demo-header .eyebrow").textContent = demo.eyebrow;
    dialog.querySelector(".demo-header h3").textContent = demo.title;
    dialog.querySelector(".demo-body").innerHTML = renderDemoBody(demo);

    dialog.querySelectorAll(".demo-card").forEach((card) => {
      const openFull = () => {
        const lightbox = getDemoLightbox();
        lightbox.querySelector("img").src = card.dataset.full;
        lightbox.hidden = false;
      };
      card.addEventListener("click", openFull);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFull();
        }
      });
    });

    document.body.classList.add("demo-open");
    dialog.showModal();
  });
});
