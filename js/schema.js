(function () {
  "use strict";

  if (typeof SITE === "undefined") return;

  function absUrl(path) {
    if (!path) return SITE.baseUrl + "/";
    if (/^https?:\/\//i.test(path)) return path;
    return SITE.baseUrl + "/" + path.replace(/^\//, "");
  }

  function injectJsonLd(data) {
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function organizationNode() {
    return {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": absUrl("#organization"),
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: SITE.legalName,
      slogan: SITE.slogan,
      description: SITE.description,
      url: absUrl(""),
      image: absUrl(SITE.image),
      logo: absUrl(SITE.logo),
      email: CONTACT.email,
      telephone: [CONTACT.phone1, CONTACT.phone2],
      priceRange: SITE.priceRange,
      address: {
        "@type": "PostalAddress",
        streetAddress: "32065 Mabvazuva",
        addressLocality: "Ruwa",
        addressRegion: "Harare",
        addressCountry: "ZW"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -17.889,
        longitude: 31.244
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00"
        }
      ],
      areaServed: [
        { "@type": "Country", name: "Zimbabwe" },
        "Africa",
        "Asia"
      ],
      sameAs: [
        CONTACT.website,
        CONTACT.instagram,
        CONTACT.facebook,
        CONTACT.whatsapp,
        CONTACT.maps
      ],
      knowsAbout: SECTORS,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Industrial Products & Services",
        itemListElement: CATEGORIES.map(function (cat, index) {
          return {
            "@type": "OfferCatalog",
            position: index + 1,
            name: cat.name,
            description: cat.description,
            itemListElement: (cat.services || []).map(function (service) {
              return {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service,
                  description: cat.description,
                  provider: { "@id": absUrl("#organization") },
                  areaServed: "Zimbabwe"
                }
              };
            })
          };
        })
      }
    };
  }

  function websiteNode() {
    return {
      "@type": "WebSite",
      "@id": absUrl("#website"),
      url: absUrl(""),
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": absUrl("#organization") }
    };
  }

  function breadcrumbNode(items) {
    return {
      "@type": "BreadcrumbList",
      "@id": absUrl("#breadcrumb"),
      itemListElement: items.map(function (item, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        };
      })
    };
  }

  function buildHomeSchema() {
    var brands = (typeof BRANDS !== "undefined" ? BRANDS : []).map(function (brand, index) {
      return {
        "@type": "Brand",
        "@id": absUrl("#brand-" + brand.id),
        position: index + 1,
        name: brand.name,
        description: brand.description,
        slogan: brand.tagline
      };
    });

    var services = KEY_SERVICES.map(function (service, index) {
      return {
        "@type": "Service",
        "@id": absUrl("#service-" + index),
        position: index + 1,
        name: service.title,
        description: service.text,
        provider: { "@id": absUrl("#organization") },
        areaServed: "Zimbabwe"
      };
    });

    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationNode(),
        websiteNode(),
        {
          "@type": "WebPage",
          "@id": absUrl("index.html#webpage"),
          url: absUrl("index.html"),
          name: SITE.name + " | Industrial Supplier Zimbabwe",
          description: SITE.description,
          isPartOf: { "@id": absUrl("#website") },
          about: { "@id": absUrl("#organization") },
          inLanguage: "en"
        },
        breadcrumbNode([{ name: "Home", url: absUrl("index.html") }]),
        {
          "@type": "ItemList",
          "@id": absUrl("#product-categories"),
          name: "Product Categories",
          numberOfItems: CATEGORIES.length,
          itemListElement: CATEGORIES.map(function (cat, index) {
            return {
              "@type": "ListItem",
              position: index + 1,
              name: cat.name,
              description: cat.description,
              url: absUrl("index.html#products")
            };
          })
        },
        {
          "@type": "ItemList",
          "@id": absUrl("#brands"),
          name: "Authorised Brands",
          numberOfItems: brands.length,
          itemListElement: brands.map(function (brand, index) {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: brand
            };
          })
        },
        {
          "@type": "ItemList",
          "@id": absUrl("#services"),
          name: "Key Services",
          numberOfItems: services.length,
          itemListElement: services.map(function (service, index) {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: service
            };
          })
        }
      ]
    };
  }

  function buildPortfolioSchema() {
    var projects = PORTFOLIO_PROJECTS.map(function (project, index) {
      return {
        "@type": "CreativeWork",
        "@id": absUrl("portfolio.html#project-" + project.id),
        position: index + 1,
        name: project.title,
        description: project.description,
        dateCreated: project.year,
        about: project.sector,
        keywords: [project.category, project.sector, project.location].join(", "),
        image: absUrl(project.image),
        locationCreated: {
          "@type": "Place",
          name: project.location,
          address: {
            "@type": "PostalAddress",
            addressCountry: "ZW"
          }
        },
        creator: { "@id": absUrl("#organization") }
      };
    });

    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationNode(),
        websiteNode(),
        {
          "@type": "CollectionPage",
          "@id": absUrl("portfolio.html#webpage"),
          url: absUrl("portfolio.html"),
          name: "Project Portfolio | " + SITE.name,
          description:
            "Industrial supply, borehole services, solar installation, CCTV security, and field services across Zimbabwe.",
          isPartOf: { "@id": absUrl("#website") },
          about: { "@id": absUrl("#organization") },
          inLanguage: "en"
        },
        breadcrumbNode([
          { name: "Home", url: absUrl("index.html") },
          { name: "Portfolio", url: absUrl("portfolio.html") }
        ]),
        {
          "@type": "ItemList",
          "@id": absUrl("portfolio.html#projects"),
          name: "Project Portfolio",
          numberOfItems: projects.length,
          itemListElement: projects.map(function (project, index) {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: project
            };
          })
        }
      ]
    };
  }

  function buildCompanyProfileSchema() {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationNode(),
        websiteNode(),
        {
          "@type": "AboutPage",
          "@id": absUrl("company-profile.html#webpage"),
          url: absUrl("company-profile.html"),
          name: SITE.name + " — Company Profile",
          description:
            "Company profile for Kunfre Enterprise — industrial sealing, electrical, instrumentation, and field services in Zimbabwe.",
          isPartOf: { "@id": absUrl("#website") },
          about: { "@id": absUrl("#organization") },
          inLanguage: "en"
        },
        breadcrumbNode([
          { name: "Home", url: absUrl("index.html") },
          { name: "Company Profile", url: absUrl("company-profile.html") }
        ])
      ]
    };
  }

  function detectPage() {
    var page = document.documentElement.getAttribute("data-schema-page");
    if (page) return page;

    var path = (window.location.pathname || "").toLowerCase();
    if (path.indexOf("portfolio") !== -1) return "portfolio";
    if (path.indexOf("company-profile") !== -1) return "company-profile";
    return "home";
  }

  var builders = {
    home: buildHomeSchema,
    portfolio: buildPortfolioSchema,
    "company-profile": buildCompanyProfileSchema
  };

  var page = detectPage();
  var builder = builders[page] || builders.home;
  injectJsonLd(builder());
})();
