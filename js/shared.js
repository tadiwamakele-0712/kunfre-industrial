(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function encodeAssetPath(path) {
    return String(path || "")
      .replace(/^\//, "")
      .split("/")
      .map(function (segment) {
        return encodeURIComponent(segment);
      })
      .join("/");
  }

  function setupThemeToggle() {
    var themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    var root = document.documentElement;
    var meta = document.getElementById("theme-color-meta");

    function applyTheme(theme) {
      var isDark = theme === "dark";
      if (isDark) {
        root.setAttribute("data-theme", "dark");
        if (meta) meta.content = "#0b1220";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        themeToggle.setAttribute("title", "Switch to light mode");
      } else {
        root.removeAttribute("data-theme");
        if (meta) meta.content = "#0c2340";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        themeToggle.setAttribute("title", "Switch to dark mode");
      }
      localStorage.setItem("kunfre-theme", theme);
    }

    themeToggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  function setupMobileNav() {
    var menuToggle = document.getElementById("menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (!menuToggle || !mobileNav) return;

    function setNavOpen(open) {
      mobileNav.classList.toggle("is-open", open);
      mobileNav.setAttribute("aria-hidden", String(!open));
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menuToggle.classList.toggle("is-active", open);
      document.body.classList.toggle("nav-open", open);
    }

    menuToggle.addEventListener("click", function () {
      setNavOpen(!mobileNav.classList.contains("is-open"));
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        setNavOpen(false);
      }
    });

    window.matchMedia("(min-width: 1025px)").addEventListener("change", function (e) {
      if (e.matches) setNavOpen(false);
    });
  }

  function setupHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initAOS() {
    // If AOS can't or shouldn't run, reveal all [data-aos] content so the
    // page is never left blank (e.g. iOS "Reduce Motion", CDN blocked).
    if (prefersReducedMotion || typeof AOS === "undefined") {
      document.documentElement.classList.add("aos-off");
      return;
    }

    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 48
    });
  }

  function refreshAOS() {
    // Re-scan the DOM after dynamic content is injected; otherwise cards
    // added after AOS.init() stay hidden at opacity 0.
    if (prefersReducedMotion || typeof AOS === "undefined") return;
    if (typeof AOS.refreshHard === "function") {
      AOS.refreshHard();
    } else if (typeof AOS.refresh === "function") {
      AOS.refresh();
    }
  }

  function initCountUp() {
    if (prefersReducedMotion || typeof countUp === "undefined" || typeof countUp.CountUp === "undefined") return;

    var CountUp = countUp.CountUp;
    var stats = document.querySelectorAll(".stat-item strong[data-count]");

    if (!stats.length || typeof IntersectionObserver === "undefined") return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.dataset.counted) return;
          el.dataset.counted = "1";

          var end = parseFloat(el.dataset.count);
          var suffix = el.dataset.suffix || "";
          var prefix = el.dataset.prefix || "";
          var decimals = parseInt(el.dataset.decimals || "0", 10);

          var counter = new CountUp(el, end, {
            startVal: 0,
            decimalPlaces: decimals,
            duration: 2,
            suffix: suffix,
            prefix: prefix,
            separator: ","
          });

          if (!counter.error) counter.start();
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    stats.forEach(function (stat) {
      observer.observe(stat);
    });
  }

  function socialIconUrl(filename) {
    return encodeAssetPath(SOCIAL_ICON_BASE + filename.replace(/\.(jpe?g|png)$/i, ".webp"));
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
    var container = document.getElementById(containerId);
    if (!container || typeof CONTACT_ICONS === "undefined") return;

    CONTACT_ICONS.forEach(function (item) {
      var a = document.createElement("a");
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
        a.innerHTML =
          '<img src="' +
          socialIconUrl(item.icon) +
          '" alt="' +
          item.name +
          '" width="42" height="42" loading="lazy">';
      }
      container.appendChild(a);
    });
  }

  function buildSocialLinks(containerId) {
    var container = document.getElementById(containerId);
    if (!container || typeof SOCIAL_LINKS === "undefined") return;

    SOCIAL_LINKS.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.url;
      a.className = "social-icon-btn";
      a.setAttribute("aria-label", "Kunfre on " + link.name);
      if (link.external !== false) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.innerHTML =
        '<img src="' +
        socialIconUrl(link.icon) +
        '" alt="' +
        link.name +
        '" width="44" height="44" loading="lazy">';
      container.appendChild(a);
    });
  }

  function buildFooterLinks() {
    var footerBrandLinks = document.getElementById("footer-brand-links");
    var footerProductLinks = document.getElementById("footer-product-links");
    var isHome = /index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
    var prefix = isHome ? "" : "index.html";

    if (footerBrandLinks && typeof BRANDS !== "undefined") {
      BRANDS.forEach(function (brand) {
        var li = document.createElement("li");
        li.innerHTML = '<a href="' + prefix + '#brands">' + brand.name + "</a>";
        footerBrandLinks.appendChild(li);
      });
    }

    if (footerProductLinks && typeof CATEGORIES !== "undefined") {
      CATEGORIES.forEach(function (cat) {
        var li = document.createElement("li");
        li.innerHTML = '<a href="' + prefix + '#products">' + cat.name + "</a>";
        footerProductLinks.appendChild(li);
      });
    }
  }

  function initShared() {
    setupThemeToggle();
    setupMobileNav();
    setupHeaderScroll();
    initAOS();
    initCountUp();
    buildContactIcons("footer-contact-icons");
    buildSocialLinks("social-links-footer");
    buildFooterLinks();
  }

  window.KunfreShared = {
    initShared: initShared,
    buildContactIcons: buildContactIcons,
    buildSocialLinks: buildSocialLinks,
    buildFooterLinks: buildFooterLinks,
    encodeAssetPath: encodeAssetPath,
    refreshAOS: refreshAOS,
    prefersReducedMotion: prefersReducedMotion
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShared);
  } else {
    initShared();
  }
})();
