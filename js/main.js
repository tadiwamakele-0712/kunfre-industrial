(function () {
  "use strict";

  var heroTrack = document.getElementById("hero-track");
  var heroLabel = document.getElementById("hero-label");
  var heroTitle = document.getElementById("hero-title");
  var heroDesc = document.getElementById("hero-desc");
  var productGrid = document.getElementById("product-grid");
  var categoryTabs = document.getElementById("category-tabs");
  var capabilitiesGrid = document.getElementById("capabilities-grid");
  var sectorsGrid = document.getElementById("sectors-grid");
  var valuesRow = document.getElementById("values-row");
  var brandsGrid = document.getElementById("brands-grid");
  var formCategory = document.getElementById("form-category");

  var heroSwiper = null;
  var lightbox = null;
  var productSwipers = [];

  function toWebp(filename) {
    return filename.replace(/\.(jpe?g|png)$/i, ".webp");
  }

  function encodePath(path) {
    return KunfreShared.encodeAssetPath(path);
  }

  function picUrl(filename, cat) {
    if (cat && cat.assetBase) {
      return encodePath(cat.assetBase + filename);
    }
    return encodePath(PIC_BASE + toWebp(filename));
  }

  function brandLogoUrl(filename) {
    return encodePath(BRAND_LOGO_BASE + toWebp(filename));
  }

  function getCategoryImages(cat) {
    var seen = new Set();
    var files = [];
    [cat.image].concat(cat.gallery || []).forEach(function (file) {
      if (file && !seen.has(file)) {
        seen.add(file);
        files.push(file);
      }
    });
    return files;
  }

  function updateHeroText(index) {
    var cat = CATEGORIES[index];
    if (!cat) return;
    if (heroLabel) heroLabel.textContent = cat.label;
    if (heroTitle) heroTitle.textContent = cat.heroTitle;
    if (heroDesc) heroDesc.textContent = cat.heroDesc;
  }

  function buildHeroSlides() {
    if (!heroTrack) return;

    CATEGORIES.forEach(function (cat, index) {
      var slide = document.createElement("div");
      slide.className = "swiper-slide hero-slide";
      var img = document.createElement("img");
      img.src = picUrl(cat.image, cat);
      img.alt = "";
      img.decoding = "async";
      if (index === 0) img.setAttribute("fetchpriority", "high");
      slide.appendChild(img);
      heroTrack.appendChild(slide);
    });
  }

  function initHeroSwiper() {
    if (!heroTrack || typeof Swiper === "undefined") return;

    heroSwiper = new Swiper("#hero-swiper", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 900,
      autoplay: KunfreShared.prefersReducedMotion
        ? false
        : {
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
      pagination: {
        el: "#hero-dots",
        clickable: true,
        bulletClass: "hero-dot",
        bulletActiveClass: "active"
      },
      navigation: {
        nextEl: "#hero-next",
        prevEl: "#hero-prev"
      },
      on: {
        init: function (swiper) {
          updateHeroText(swiper.realIndex);
        },
        slideChange: function (swiper) {
          updateHeroText(swiper.realIndex);
        }
      }
    });
  }

  function destroyProductSwipers() {
    productSwipers.forEach(function (instance) {
      if (instance && instance.destroy) instance.destroy(true, true);
    });
    productSwipers = [];
  }

  function initProductSwipers() {
    if (typeof Swiper === "undefined" || !productGrid) return;

    productGrid.querySelectorAll(".product-mini-swiper").forEach(function (el) {
      var swiper = new Swiper(el, {
        loop: getCategoryImages(CATEGORIES.find(function (c) {
          return c.id === el.dataset.catId;
        }) || { gallery: [] }).length > 1,
        speed: 450,
        navigation: {
          nextEl: el.querySelector(".product-swiper-next"),
          prevEl: el.querySelector(".product-swiper-prev")
        },
        pagination: {
          el: el.querySelector(".product-swiper-pagination"),
          clickable: true
        }
      });
      productSwipers.push(swiper);
    });
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

  function renderProducts(filter) {
    if (!productGrid) return;

    destroyProductSwipers();
    productGrid.innerHTML = "";

    var list = filter === "all" ? CATEGORIES : CATEGORIES.filter(function (c) {
      return c.id === filter;
    });

    list.forEach(function (cat) {
      var images = getCategoryImages(cat);
      var galleryLinks = images
        .map(function (file, idx) {
          var url = picUrl(file, cat);
          return (
            '<a href="' +
            url +
            '" class="glightbox" data-gallery="cat-' +
            cat.id +
            '" data-glightbox="title: ' +
            cat.name +
            ';"' +
            (idx === 0 ? "" : ' style="display:none"') +
            ">" +
            (idx === 0
              ? '<img class="product-slider-img" src="' +
                url +
                '" alt="' +
                cat.name +
                '" decoding="async">'
              : "") +
            "</a>"
          );
        })
        .join("");

      var swiperMarkup =
        images.length > 1
          ? '<div class="swiper product-mini-swiper" data-cat-id="' +
            cat.id +
            '">' +
            '<div class="swiper-wrapper">' +
            images
              .map(function (file) {
                var url = picUrl(file, cat);
                return (
                  '<div class="swiper-slide">' +
                  '<a href="' +
                  url +
                  '" class="glightbox product-slider-view" data-gallery="cat-' +
                  cat.id +
                  '" data-glightbox="title: ' +
                  cat.name +
                  ';">' +
                  '<img src="' +
                  url +
                  '" alt="' +
                  cat.name +
                  '" decoding="async">' +
                  "</a>" +
                  "</div>"
                );
              })
              .join("") +
            "</div>" +
            '<div class="product-swiper-pagination"></div>' +
            '<button type="button" class="product-swiper-prev" aria-label="Previous photo">‹</button>' +
            '<button type="button" class="product-swiper-next" aria-label="Next photo">›</button>' +
            "</div>"
          : '<div class="product-image">' +
            galleryLinks +
            "</div>";

      var card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-aos", "fade-up");
      card.innerHTML =
        '<div class="product-body">' +
        "<h3>" +
        cat.name +
        "</h3>" +
        "<p>" +
        cat.description +
        "</p>" +
        '<div class="product-media">' +
        swiperMarkup +
        '<span class="product-badge"><img src="' +
        KUNFRE_LOGO +
        '" alt="Kunfre" width="28" height="28"></span>' +
        (images.length > 1 ? '<span class="gallery-hint" aria-hidden="true">Tap to enlarge</span>' : "") +
        "</div>" +
        "<ul>" +
        cat.services
          .map(function (s) {
            return "<li>" + s + "</li>";
          })
          .join("") +
        "</ul>" +
        '<a href="' +
        CONTACT.whatsapp +
        "?text=" +
        encodeURIComponent(
          "Hello Kunfre Enterprise,\n\nI would like a quote for: " + cat.name + "\n\nPlease send pricing and availability."
        ) +
        '" class="product-link" target="_blank" rel="noopener noreferrer">Request Quote on WhatsApp →</a>' +
        "</div>";

      productGrid.appendChild(card);
    });

    initProductSwipers();
    initLightbox();
  }

  function buildBrands() {
    if (!brandsGrid) return;

    BRANDS.forEach(function (brand, i) {
      var card = document.createElement("article");
      card.className = "brand-card";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", String(Math.min(i * 60, 240)));
      card.style.setProperty("--brand-color", brand.color);
      card.innerHTML =
        '<div class="brand-logo-wrap">' +
        '<img src="' +
        brandLogoUrl(brand.logo) +
        '" alt="' +
        brand.name +
        ' logo" loading="lazy">' +
        "</div>" +
        '<p class="brand-tagline">' +
        brand.tagline +
        "</p>" +
        "<p>" +
        brand.description +
        "</p>" +
        '<div class="brand-cats">' +
        brand.categories
          .map(function (c) {
            return '<span class="brand-cat">' + c + "</span>";
          })
          .join("") +
        "</div>" +
        '<a href="' +
        CONTACT.whatsapp +
        "?text=" +
        encodeURIComponent(
          "Hello Kunfre Enterprise,\n\nI am enquiring about " + brand.name + " products.\n\nPlease send availability and pricing."
        ) +
        '" class="brand-enquire" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp →</a>';
      brandsGrid.appendChild(card);

      if (formCategory) {
        var opt = document.createElement("option");
        opt.value = brand.name;
        opt.textContent = brand.name;
        formCategory.appendChild(opt);
      }
    });
  }

  function buildCategoryTabs() {
    if (!categoryTabs) return;

    var allTab = document.createElement("button");
    allTab.type = "button";
    allTab.className = "category-tab active";
    allTab.textContent = "All Categories";
    allTab.addEventListener("click", function () {
      categoryTabs.querySelectorAll(".category-tab").forEach(function (t) {
        t.classList.remove("active");
      });
      allTab.classList.add("active");
      renderProducts("all");
    });
    categoryTabs.appendChild(allTab);

    CATEGORIES.forEach(function (cat) {
      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "category-tab";
      tab.textContent = cat.name;
      tab.addEventListener("click", function () {
        categoryTabs.querySelectorAll(".category-tab").forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
        renderProducts(cat.id);
      });
      categoryTabs.appendChild(tab);

      if (formCategory) {
        var opt = document.createElement("option");
        opt.value = cat.name;
        opt.textContent = cat.name;
        formCategory.appendChild(opt);
      }
    });
  }

  function buildCapabilities() {
    if (!capabilitiesGrid) return;

    CATEGORIES.forEach(function (cat, i) {
      var images = getCategoryImages(cat);
      var item = document.createElement("article");
      item.className = "capability-card";
      item.setAttribute("data-aos", "fade-up");
      item.setAttribute("data-aos-delay", String(Math.min(i * 50, 200)));

      var thumbLinks = images
        .map(function (file, idx) {
          var url = picUrl(file, cat);
          return (
            '<a href="' +
            url +
            '" class="glightbox capability-thumb' +
            (idx === 0 ? "" : " glightbox-hidden") +
            '" data-gallery="cap-' +
            cat.id +
            '" data-glightbox="title: ' +
            cat.name +
            ';">' +
            (idx === 0 ? '<img src="' + url + '" alt="' + cat.name + '" loading="lazy">' : "") +
            "</a>"
          );
        })
        .join("");

      item.innerHTML =
        '<div class="capability-media">' +
        thumbLinks +
        "</div>" +
        '<span class="cap-num">' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        "<h3>" +
        cat.name +
        "</h3>" +
        "<p>" +
        cat.description +
        "</p>";
      capabilitiesGrid.appendChild(item);
    });
  }

  function buildTags() {
    if (sectorsGrid) {
      SECTORS.forEach(function (s) {
        var el = document.createElement("span");
        el.className = "sector-tag";
        el.textContent = s;
        sectorsGrid.appendChild(el);
      });
    }

    if (valuesRow) {
      VALUES.forEach(function (v) {
        var el = document.createElement("span");
        el.className = "value-tag";
        el.textContent = v;
        valuesRow.appendChild(el);
      });
    }
  }

  function setupEnquiryForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get("name");
      var phone = data.get("phone");
      var email = data.get("email");
      var company = data.get("company") || "N/A";
      var category = data.get("category") || "General";
      var message = data.get("message");

      var lines = [
        "Hello Kunfre Enterprise,",
        "",
        "I have an enquiry:",
        "",
        "Company: " + company,
        "Name: " + name,
        "Phone: " + phone,
        email ? "Email: " + email : null,
        "Category: " + category,
        "",
        "Message:",
        message,
        "",
        "Please contact me with pricing and availability."
      ].filter(Boolean);

      window.open(CONTACT.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");

      var note = document.getElementById("form-note");
      if (note) {
        note.hidden = false;
        note.textContent = "WhatsApp should open with your enquiry. If not, message us at +263 719 333 422.";
      }
      form.reset();
    });
  }

  function initHome() {
    buildHeroSlides();
    initHeroSwiper();
    buildBrands();
    buildCategoryTabs();
    buildCapabilities();
    buildTags();
    renderProducts("all");
    setupEnquiryForm();
    initLightbox();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome);
  } else {
    initHome();
  }
})();
