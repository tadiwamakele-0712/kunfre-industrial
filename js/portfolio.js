(function () {
  "use strict";

  const featuredGrid = document.getElementById("portfolio-featured");
  const projectGrid = document.getElementById("portfolio-grid");
  const filterTabs = document.getElementById("portfolio-filters");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const galleryDialog = document.getElementById("gallery-lightbox");
  const galleryImg = document.getElementById("gallery-lightbox-img");
  const galleryCaption = document.getElementById("gallery-lightbox-caption");
  const galleryCount = document.getElementById("gallery-lightbox-count");
  const galleryPrev = document.getElementById("gallery-lightbox-prev");
  const galleryNext = document.getElementById("gallery-lightbox-next");

  let activeFilter = "all";
  let galleryList = [];
  let galleryIdx = 0;
  let galleryTitle = "";

  function assetUrl(path) {
    return encodeURI(path);
  }

  function setupThemeToggle() {
    if (!themeToggle) return;

    const root = document.documentElement;
    const meta = document.getElementById("theme-color-meta");

    function applyTheme(theme) {
      const isDark = theme === "dark";
      if (isDark) {
        root.setAttribute("data-theme", "dark");
        if (meta) meta.content = "#0b1220";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
      } else {
        root.removeAttribute("data-theme");
        if (meta) meta.content = "#0c2340";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
      }
      localStorage.setItem("kunfre-theme", theme);
    }

    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  function setupMobileNav() {
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) {
        mobileNav.removeAttribute("hidden");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");
      } else {
        mobileNav.setAttribute("hidden", "");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function buildScopeList(items) {
    return (
      "<ul class=\"portfolio-scope\">" +
      items.map((item) => "<li>" + item + "</li>").join("") +
      "</ul>"
    );
  }

  function projectCard(project, featured) {
    const cardClass = featured ? "portfolio-card portfolio-card-featured" : "portfolio-card";
    return (
      '<article class="' +
      cardClass +
      '" data-filter="' +
      project.filter +
      '" data-project-id="' +
      project.id +
      '">' +
      '<button type="button" class="portfolio-card-media" data-gallery-project="' +
      project.id +
      '" aria-label="View ' +
      project.title +
      ' gallery">' +
      '<img src="' +
      assetUrl(project.image) +
      '" alt="' +
      project.title +
      '" loading="lazy" decoding="async">' +
      '<span class="portfolio-card-overlay">' +
      '<span class="portfolio-view-btn">View Gallery</span>' +
      "</span>" +
      "</button>" +
      '<div class="portfolio-card-body">' +
      '<div class="portfolio-card-meta">' +
      '<span class="portfolio-sector">' +
      project.sector +
      "</span>" +
      '<span class="portfolio-year">' +
      project.year +
      "</span>" +
      "</div>" +
      "<h3>" +
      project.title +
      "</h3>" +
      '<p class="portfolio-location">' +
      project.location +
      " · " +
      project.category +
      "</p>" +
      "<p>" +
      project.description +
      "</p>" +
      buildScopeList(project.scope) +
      '<a href="index.html#contact" class="portfolio-enquire">Request Similar Project →</a>' +
      "</div>" +
      "</article>"
    );
  }

  function renderFeatured() {
    if (!featuredGrid) return;
    const featured = PORTFOLIO_PROJECTS.filter((p) => p.featured);
    featuredGrid.innerHTML = featured.map((p) => projectCard(p, true)).join("");
  }

  function renderProjects() {
    if (!projectGrid) return;
    const projects = PORTFOLIO_PROJECTS.filter(
      (p) => activeFilter === "all" || p.filter === activeFilter
    );
    projectGrid.innerHTML = projects.map((p) => projectCard(p, false)).join("");

    const empty = document.getElementById("portfolio-empty");
    if (empty) empty.hidden = projects.length > 0;
  }

  function renderFilters() {
    if (!filterTabs) return;

    filterTabs.innerHTML = PORTFOLIO_FILTERS.map(
      (f, i) =>
        '<button type="button" class="portfolio-filter' +
        (f.id === activeFilter ? " active" : "") +
        '" role="tab" aria-selected="' +
        (f.id === activeFilter) +
        '" data-filter="' +
        f.id +
        '">' +
        f.label +
        "</button>"
    ).join("");

    filterTabs.querySelectorAll(".portfolio-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        filterTabs.querySelectorAll(".portfolio-filter").forEach((b) => {
          const isActive = b.dataset.filter === activeFilter;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", String(isActive));
        });
        renderProjects();
      });
    });
  }

  function updateGalleryView() {
    if (!galleryList.length || !galleryImg) return;
    galleryImg.src = assetUrl(galleryList[galleryIdx]);
    galleryImg.alt = galleryTitle;
    if (galleryCaption) galleryCaption.textContent = galleryTitle;
    if (galleryCount) galleryCount.textContent = galleryIdx + 1 + " / " + galleryList.length;
    if (galleryPrev) galleryPrev.disabled = galleryList.length <= 1;
    if (galleryNext) galleryNext.disabled = galleryList.length <= 1;
  }

  function openGallery(projectId) {
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (!project || !galleryDialog) return;
    galleryList = project.gallery && project.gallery.length ? project.gallery : [project.image];
    galleryTitle = project.title;
    galleryIdx = 0;
    updateGalleryView();
    galleryDialog.showModal();
  }

  function stepGallery(delta) {
    if (!galleryList.length) return;
    galleryIdx = (galleryIdx + delta + galleryList.length) % galleryList.length;
    updateGalleryView();
  }

  function setupGalleryLightbox() {
    if (!galleryDialog) return;

    document.getElementById("gallery-lightbox-close").addEventListener("click", () => galleryDialog.close());

    if (galleryPrev) {
      galleryPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        stepGallery(-1);
      });
    }

    if (galleryNext) {
      galleryNext.addEventListener("click", (e) => {
        e.stopPropagation();
        stepGallery(1);
      });
    }

    galleryDialog.addEventListener("click", (e) => {
      if (e.target === galleryDialog) galleryDialog.close();
    });

    galleryDialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepGallery(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepGallery(1);
      }
    });

    function handleGalleryClick(e) {
      const btn = e.target.closest("[data-gallery-project]");
      if (!btn) return;
      e.preventDefault();
      openGallery(btn.dataset.galleryProject);
    }

    if (featuredGrid) featuredGrid.addEventListener("click", handleGalleryClick);
    if (projectGrid) projectGrid.addEventListener("click", handleGalleryClick);
  }

  function buildFooterLinks() {
    const footerBrandLinks = document.getElementById("footer-brand-links");
    const footerProductLinks = document.getElementById("footer-product-links");

    if (footerBrandLinks) {
      BRANDS.forEach((brand) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "index.html#brands";
        a.textContent = brand.name;
        li.appendChild(a);
        footerBrandLinks.appendChild(li);
      });
    }

    if (footerProductLinks) {
      CATEGORIES.forEach((cat) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "index.html#products";
        a.textContent = cat.name;
        li.appendChild(a);
        footerProductLinks.appendChild(li);
      });
    }
  }

  function buildContactIcons() {
    const container = document.getElementById("footer-contact-icons");
    if (!container) return;

    CONTACT_ICONS.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.url;
      a.className = "contact-icon-btn" + (item.type === "svg" ? " contact-icon-btn-svg" : "");
      a.setAttribute("aria-label", item.name);
      if (item.external !== false && item.url.indexOf("mailto:") !== 0 && item.url.indexOf("tel:") !== 0) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      if (item.type === "svg") {
        let svg;
        if (item.icon === "location") {
          svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
        } else if (item.icon === "website") {
          svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9c-2.5-2.8-4-6-4-9s1.5-6.2 4-9z"/></svg>';
        } else {
          svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
        }
        a.innerHTML = svg;
      } else {
        a.innerHTML =
          '<img src="assets/social icon/' +
          encodeURIComponent(item.icon.replace(/\.(jpe?g|png)$/i, ".webp")) +
          '" alt="' +
          item.name +
          '" width="42" height="42" loading="lazy">';
      }
      container.appendChild(a);
    });
  }

  function buildSocialLinks() {
    const container = document.getElementById("social-links-footer");
    if (!container) return;

    SOCIAL_LINKS.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", link.name);
      a.innerHTML =
        '<img src="assets/social icon/' +
        encodeURIComponent(link.icon.replace(/\.(jpe?g|png)$/i, ".webp")) +
        '" alt="' +
        link.name +
        '" width="42" height="42" loading="lazy">';
      container.appendChild(a);
    });
  }

  renderFilters();
  renderFeatured();
  renderProjects();
  setupGalleryLightbox();
  setupThemeToggle();
  setupMobileNav();
  buildFooterLinks();
  buildContactIcons();
  buildSocialLinks();
})();
