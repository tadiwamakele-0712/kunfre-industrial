(function () {
  "use strict";

  var featuredGrid = document.getElementById("portfolio-featured");
  var projectGrid = document.getElementById("portfolio-grid");
  var filterTabs = document.getElementById("portfolio-filters");

  var activeFilter = "all";
  var lightbox = null;

  function assetUrl(path) {
    return KunfreShared.encodeAssetPath(path);
  }

  function buildScopeList(items) {
    return (
      "<ul class=\"portfolio-scope\">" +
      items
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function galleryLinks(project) {
    var images = project.gallery && project.gallery.length ? project.gallery : [project.image];
    if (images.length <= 1) return "";

    return images
      .slice(1)
      .map(function (src) {
        return (
          '<a href="' +
          assetUrl(src) +
          '" class="glightbox glightbox-hidden" data-gallery="project-' +
          project.id +
          '" data-glightbox="title: ' +
          project.title +
          ';"></a>'
        );
      })
      .join("");
  }

  function projectCard(project, featured) {
    var cardClass = featured ? "portfolio-card portfolio-card-featured" : "portfolio-card";
    var images = project.gallery && project.gallery.length ? project.gallery : [project.image];

    return (
      '<article class="' +
      cardClass +
      '" data-filter="' +
      project.filter +
      '" data-aos="fade-up">' +
      '<a href="' +
      assetUrl(images[0]) +
      '" class="portfolio-card-media glightbox" data-gallery="project-' +
      project.id +
      '" data-glightbox="title: ' +
      project.title +
      ';" aria-label="View ' +
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
      "</a>" +
      galleryLinks(project) +
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

  function initLightbox() {
    if (typeof GLightbox === "undefined") return;
    if (lightbox) lightbox.destroy();

    lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      closeOnOutsideClick: true,
      zoomable: true
    });
  }

  function renderFeatured() {
    if (!featuredGrid) return;
    var featured = PORTFOLIO_PROJECTS.filter(function (p) {
      return p.featured;
    });
    featuredGrid.innerHTML = featured
      .map(function (p, i) {
        return projectCard(p, true).replace('data-aos="fade-up"', 'data-aos="fade-up" data-aos-delay="' + Math.min(i * 80, 240) + '"');
      })
      .join("");
  }

  function renderProjects() {
    if (!projectGrid) return;

    var projects = PORTFOLIO_PROJECTS.filter(function (p) {
      return activeFilter === "all" || p.filter === activeFilter;
    });

    projectGrid.innerHTML = projects.map(function (p) {
      return projectCard(p, false);
    }).join("");

    var empty = document.getElementById("portfolio-empty");
    if (empty) empty.hidden = projects.length > 0;

    initLightbox();
    if (KunfreShared && KunfreShared.refreshAOS) KunfreShared.refreshAOS();
  }

  function renderFilters() {
    if (!filterTabs) return;

    filterTabs.innerHTML = PORTFOLIO_FILTERS.map(function (f) {
      return (
        '<button type="button" class="portfolio-filter' +
        (f.id === activeFilter ? " active" : "") +
        '" role="tab" aria-selected="' +
        (f.id === activeFilter) +
        '" data-filter="' +
        f.id +
        '">' +
        f.label +
        "</button>"
      );
    }).join("");

    filterTabs.querySelectorAll(".portfolio-filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.dataset.filter;
        filterTabs.querySelectorAll(".portfolio-filter").forEach(function (b) {
          var isActive = b.dataset.filter === activeFilter;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", String(isActive));
        });
        renderProjects();
      });
    });
  }

  function initPortfolio() {
    renderFilters();
    renderFeatured();
    renderProjects();
    initLightbox();
    if (KunfreShared && KunfreShared.refreshAOS) KunfreShared.refreshAOS();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio);
  } else {
    initPortfolio();
  }
})();
