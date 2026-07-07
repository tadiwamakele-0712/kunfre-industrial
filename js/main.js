(function () {
  "use strict";

  const track = document.getElementById("hero-track");
  const dotsWrap = document.getElementById("hero-dots");
  const heroLabel = document.getElementById("hero-label");
  const heroTitle = document.getElementById("hero-title");
  const heroDesc = document.getElementById("hero-desc");
  const productGrid = document.getElementById("product-grid");
  const categoryTabs = document.getElementById("category-tabs");
  const capabilitiesGrid = document.getElementById("capabilities-grid");
  const sectorsGrid = document.getElementById("sectors-grid");
  const valuesRow = document.getElementById("values-row");
  const footerLinks = document.getElementById("footer-product-links");
  const footerBrandLinks = document.getElementById("footer-brand-links");
  const brandsGrid = document.getElementById("brands-grid");
  const formCategory = document.getElementById("form-category");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const themeToggle = document.getElementById("theme-toggle");

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

  let slideIndex = 0;
  let slideTimer;

  function toWebp(filename) {
    return filename.replace(/\.(jpe?g|png)$/i, ".webp");
  }

  function picUrl(filename, cat) {
    if (cat && cat.assetBase) {
      return encodeURI(cat.assetBase + filename);
    }
    return PIC_BASE + encodeURIComponent(toWebp(filename));
  }

  function brandLogoUrl(filename) {
    return BRAND_LOGO_BASE + encodeURIComponent(toWebp(filename));
  }

  function socialIconUrl(filename) {
    return SOCIAL_ICON_BASE + encodeURIComponent(toWebp(filename));
  }

  function contactIconSvg(name) {
    if (name === "location") {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
    }
    if (name === "website") {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9c-2.5-2.8-4-6-4-9s1.5-6.2 4-9z"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  }

  function buildContactIcons(containerId) {
    const container = document.getElementById(containerId);
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
        a.innerHTML = contactIconSvg(item.icon);
      } else {
        a.innerHTML = '<img src="' + socialIconUrl(item.icon) + '" alt="' + item.name + '" width="42" height="42" loading="lazy">';
      }
      container.appendChild(a);
    });
  }

  function buildFooterContactIcons() {
    buildContactIcons("footer-contact-icons");
  }

  function buildSocialLinksIn(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    SOCIAL_LINKS.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.className = "social-icon-btn";
      a.setAttribute("aria-label", "Kunfre on " + link.name);
      if (link.external !== false) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.innerHTML =
        '<img src="' + socialIconUrl(link.icon) + '" alt="' + link.name + '" width="44" height="44" loading="lazy">';
      container.appendChild(a);
    });
  }

  function buildSocialLinks() {
    buildSocialLinksIn("social-links-footer");
  }

  function buildHeroSlides() {
    CATEGORIES.forEach((cat, i) => {
      const slide = document.createElement("div");
      slide.className = "hero-slide" + (i === 0 ? " active" : "");
      slide.style.backgroundImage = "url('" + picUrl(cat.image, cat) + "')";
      slide.dataset.index = String(i);
      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", cat.name);
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slideIndex = (index + CATEGORIES.length) % CATEGORIES.length;
    const slides = track.querySelectorAll(".hero-slide");
    const dots = dotsWrap.querySelectorAll(".hero-dot");
    const cat = CATEGORIES[slideIndex];

    slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));
    dots.forEach((d, i) => d.classList.toggle("active", i === slideIndex));

    heroLabel.textContent = cat.label;
    heroTitle.textContent = cat.heroTitle;
    heroDesc.textContent = cat.heroDesc;
  }

  function startSlider() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goToSlide(slideIndex + 1), 5500);
  }

  const galleryDialog = document.getElementById("gallery-lightbox");
  const galleryImg = document.getElementById("gallery-lightbox-img");
  const galleryCaption = document.getElementById("gallery-lightbox-caption");
  const galleryCount = document.getElementById("gallery-lightbox-count");
  const galleryPrev = document.getElementById("gallery-lightbox-prev");
  const galleryNext = document.getElementById("gallery-lightbox-next");
  let galleryList = [];
  let galleryIdx = 0;
  let galleryName = "";
  let galleryCat = null;

  function getCategoryImages(cat) {
    const seen = new Set();
    const files = [];
    [cat.image].concat(cat.gallery || []).forEach((file) => {
      if (file && !seen.has(file)) {
        seen.add(file);
        files.push(file);
      }
    });
    return files;
  }

  function updateGalleryView() {
    if (!galleryList.length || !galleryImg) return;
    galleryImg.src = picUrl(galleryList[galleryIdx], galleryCat);
    galleryImg.alt = galleryName;
    if (galleryCaption) galleryCaption.textContent = galleryName;
    if (galleryCount) galleryCount.textContent = galleryIdx + 1 + " / " + galleryList.length;
    if (galleryPrev) galleryPrev.disabled = galleryList.length <= 1;
    if (galleryNext) galleryNext.disabled = galleryList.length <= 1;
  }

  function openGallery(catId, index) {
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (!cat || !galleryDialog) return;
    galleryList = getCategoryImages(cat);
    if (!galleryList.length) return;
    galleryName = cat.name;
    galleryCat = cat;
    galleryIdx = Math.max(0, Math.min(index, galleryList.length - 1));
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
      if (e.target.closest(".product-slide-prev, .product-slide-next")) return;
      const btn = e.target.closest("[data-gallery-cat]");
      if (!btn) return;
      openGallery(btn.dataset.galleryCat, parseInt(btn.dataset.galleryIndex, 10) || 0);
    }

    productGrid.addEventListener("click", handleGalleryClick);
    capabilitiesGrid.addEventListener("click", handleGalleryClick);
  }

  function setupProductSliderNav() {
    if (productGrid.dataset.sliderNav === "1") return;
    productGrid.dataset.sliderNav = "1";

    productGrid.addEventListener("click", (e) => {
      const prev = e.target.closest(".product-slide-prev");
      const next = e.target.closest(".product-slide-next");
      if (!prev && !next) return;

      e.preventDefault();
      e.stopPropagation();

      const slider = e.target.closest(".product-slider");
      if (!slider) return;

      const cat = CATEGORIES.find((c) => c.id === slider.dataset.catId);
      if (!cat) return;

      const images = getCategoryImages(cat);
      if (images.length <= 1) return;

      let idx = parseInt(slider.dataset.slideIndex || "0", 10) || 0;
      idx = prev ? (idx - 1 + images.length) % images.length : (idx + 1) % images.length;
      slider.dataset.slideIndex = String(idx);

      const img = slider.querySelector(".product-slider-img");
      const viewBtn = slider.querySelector(".gallery-open");
      const count = slider.querySelector(".product-slide-count");

      if (img) {
        img.src = picUrl(images[idx], cat);
        img.alt = cat.name;
      }
      if (viewBtn) viewBtn.dataset.galleryIndex = String(idx);
      if (count) count.textContent = idx + 1 + " / " + images.length;
    });
  }

  document.getElementById("hero-prev").addEventListener("click", () => {
    goToSlide(slideIndex - 1);
    startSlider();
  });

  document.getElementById("hero-next").addEventListener("click", () => {
    goToSlide(slideIndex + 1);
    startSlider();
  });

  function renderProducts(filter) {
    productGrid.innerHTML = "";
    const list = filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter);

    list.forEach((cat) => {
      const images = getCategoryImages(cat);
      const sliderControls =
        images.length > 1
          ? '<div class="product-slider-controls">' +
            '<button type="button" class="product-slide-prev" aria-label="Previous ' + cat.name + ' photo">‹</button>' +
            '<span class="product-slide-count">1 / ' + images.length + "</span>" +
            '<button type="button" class="product-slide-next" aria-label="Next ' + cat.name + ' photo">›</button>' +
            "</div>"
          : "";

      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML =
        '<div class="product-body">' +
        "<h3>" + cat.name + "</h3>" +
        "<p>" + cat.description + "</p>" +
        '<div class="product-media">' +
        '<div class="product-slider" data-cat-id="' +
        cat.id +
        '" data-slide-index="0">' +
        '<div class="product-image">' +
        '<button type="button" class="gallery-open product-slider-view" data-gallery-cat="' +
        cat.id +
        '" data-gallery-index="0" aria-label="Open ' +
        cat.name +
        ' gallery">' +
        '<img class="product-slider-img" src="' +
        picUrl(images[0], cat) +
        '" alt="' +
        cat.name +
        '" loading="lazy">' +
        "</button>" +
        '<span class="product-badge"><img src="' + KUNFRE_LOGO + '" alt="Kunfre" width="28" height="28"></span>' +
        (images.length > 1 ? '<span class="gallery-hint" aria-hidden="true">Tap to enlarge</span>' : "") +
        "</div>" +
        sliderControls +
        "</div>" +
        "</div>" +
        "<ul>" + cat.services.map((s) => "<li>" + s + "</li>").join("") + "</ul>" +
        '<a href="' + CONTACT.whatsapp + '?text=' + encodeURIComponent("Hello Kunfre Enterprise,\n\nI would like a quote for: " + cat.name + "\n\nPlease send pricing and availability.") + '" class="product-link" target="_blank" rel="noopener noreferrer">Request Quote on WhatsApp →</a>' +
        "</div>";
      productGrid.appendChild(card);
    });
  }

  function buildBrands() {
    BRANDS.forEach((brand) => {
      const card = document.createElement("article");
      card.className = "brand-card";
      card.style.setProperty("--brand-color", brand.color);
      card.innerHTML =
        '<div class="brand-logo-wrap">' +
        '<img src="' + brandLogoUrl(brand.logo) + '" alt="' + brand.name + ' logo" loading="lazy">' +
        "</div>" +
        '<p class="brand-tagline">' + brand.tagline + "</p>" +
        "<p>" + brand.description + "</p>" +
        '<div class="brand-cats">' +
        brand.categories.map((c) => '<span class="brand-cat">' + c + "</span>").join("") +
        "</div>" +
        '<a href="' + CONTACT.whatsapp + "?text=" + encodeURIComponent("Hello Kunfre Enterprise,\n\nI am enquiring about " + brand.name + " products.\n\nPlease send availability and pricing.") +
        '" class="brand-enquire" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp →</a>';
      brandsGrid.appendChild(card);

      const opt = document.createElement("option");
      opt.value = brand.name;
      opt.textContent = brand.name;
      formCategory.appendChild(opt);

      const li = document.createElement("li");
      li.innerHTML = '<a href="#brands">' + brand.name + "</a>";
      footerBrandLinks.appendChild(li);
    });
  }

  function buildCategoryTabs() {
    const allTab = document.createElement("button");
    allTab.type = "button";
    allTab.className = "category-tab active";
    allTab.textContent = "All Categories";
    allTab.addEventListener("click", () => {
      categoryTabs.querySelectorAll(".category-tab").forEach((t) => t.classList.remove("active"));
      allTab.classList.add("active");
      renderProducts("all");
    });
    categoryTabs.appendChild(allTab);

    CATEGORIES.forEach((cat) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "category-tab";
      tab.textContent = cat.name;
      tab.addEventListener("click", () => {
        categoryTabs.querySelectorAll(".category-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderProducts(cat.id);
      });
      categoryTabs.appendChild(tab);

      const opt = document.createElement("option");
      opt.value = cat.name;
      opt.textContent = cat.name;
      formCategory.appendChild(opt);

      const li = document.createElement("li");
      li.innerHTML = '<a href="#products">' + cat.name + "</a>";
      footerLinks.appendChild(li);
    });
  }

  function buildCapabilities() {
    CATEGORIES.forEach((cat, i) => {
      const item = document.createElement("article");
      item.className = "capability-card";
      item.innerHTML =
        '<button type="button" class="capability-thumb gallery-open" data-gallery-cat="' +
        cat.id +
        '" data-gallery-index="0" aria-label="View ' +
        cat.name +
        ' photos">' +
        '<img src="' +
        picUrl(cat.image, cat) +
        '" alt="' +
        cat.name +
        '" loading="lazy">' +
        "</button>" +
        '<span class="cap-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<h3>" + cat.name + "</h3>" +
        "<p>" + cat.description + "</p>";
      capabilitiesGrid.appendChild(item);
    });
  }

  SECTORS.forEach((s) => {
    const el = document.createElement("span");
    el.className = "sector-tag";
    el.textContent = s;
    sectorsGrid.appendChild(el);
  });

  VALUES.forEach((v) => {
    const el = document.createElement("span");
    el.className = "value-tag";
    el.textContent = v;
    valuesRow.appendChild(el);
  });

  menuToggle.addEventListener("click", () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("enquiry-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const company = data.get("company") || "N/A";
    const category = data.get("category") || "General";
    const message = data.get("message");

    const lines = [
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

    window.open(
      CONTACT.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")),
      "_blank",
      "noopener,noreferrer"
    );

    const note = document.getElementById("form-note");
    note.hidden = false;
    note.textContent = "WhatsApp should open with your enquiry. If not, message us at +263 719 333 422.";
    form.reset();
  });

  buildHeroSlides();
  setupThemeToggle();
  setupGalleryLightbox();
  setupProductSliderNav();
  buildFooterContactIcons();
  buildSocialLinks();
  buildBrands();
  buildCategoryTabs();
  buildCapabilities();
  renderProducts("all");
  startSlider();
})();
