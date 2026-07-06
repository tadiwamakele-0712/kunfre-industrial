const KUNFRE_LOGO = "assets/kunfre-logo.jpg";
const PIC_BASE = "assets/kunfre-pic/";
const BRAND_LOGO_BASE = "assets/product logo/";
const SOCIAL_ICON_BASE = "assets/social icon/";

const CATEGORIES = [
  {
    id: "webbing",
    name: "Webbing Tapes",
    label: "Load Securing",
    heroTitle: "Webbing Tapes",
    heroDesc: "High-strength woven and synthetic tapes for industrial load securing, lifting, and packaging applications.",
    description: "High-strength woven & synthetic tapes for industrial load securing, lifting, and packaging applications.",
    image: "polyester flat webbing tape.jpg",
    gallery: [
      "nylon webbing tape.jpg",
      "polypropylene webbing tape.jpg",
      "flame-retardant webbing tape.jpg",
      "fibre rope.jpg"
    ],
    services: ["Polyester webbing slings", "Cargo lashings", "Synthetic lifting straps", "Packaging tie-downs"]
  },
  {
    id: "seals",
    name: "Seals, Hoses & Spares",
    label: "Plant Maintenance",
    heroTitle: "Industrial Seals, Hoses & Mechanical Spares",
    heroDesc: "Sealing, belting, hose and mechanical spares for process and plant maintenance in demanding environments. Fluid Integrity, Asset Lifecycle Extension, Critical Tolerance, Operational Continuity, Zero-Leak Seals.",
    description: "Sealing, belting, hose & mechanical spares for process & plant maintenance. Fluid Integrity, Asset Lifecycle Extension, Critical Tolerance, Operational Continuity, Zero-Leak Seals.",
    image: "hydraulic hose, fittings& spares.jpg",
    gallery: [
      "mining hose.jpg",
      "ptfe thread seal tape.jpg",
      "packigs & gland packing.jpg",
      "rubbers sheeting.jpg"
    ],
    services: ["PTFE tape & packings", "Hydraulic & mining hose", "Bearings & rubber sheeting", "Mechanical spares"]
  },
  {
    id: "fasteners",
    name: "Fasteners",
    label: "Quality Assurance",
    heroTitle: "Industrial Fasteners & Bolting",
    heroDesc: "High-integrity bolting and fixing solutions with mill certification and full traceability.",
    description: "High-integrity bolting & fixing solutions for industrial structures with full traceability.",
    image: "hex bolt & nuts.jpg",
    gallery: [
      "stainless steel fasteners.jpg",
      "stud bolts & heavy hex nuts.jpg",
      "anchor bolts & expansion fasteners.jpg"
    ],
    services: ["Hex bolts & stud bolts", "Stainless steel fasteners", "Anchor systems", "Mill-certified bolting"]
  },
  {
    id: "gaskets",
    name: "Gaskets and Bearings",
    label: "Zero Leakage",
    heroTitle: "Gaskets and Bearings",
    heroDesc: "Engineered gaskets and bearings for piping, flanges, rotating equipment and pressure systems across mining and process industries.",
    description: "Engineered gaskets and bearings for piping, flanges, rotating equipment & pressure systems.",
    image: "deep groove ball bearing.jpg",
    gallery: [
      "deep groove ball bearing.jpg",
      "cylindrical roller bearing.jpg",
      "spiral wound gasket.jpg",
      "rubber gasket.jpg",
      "graphite gasket.jpg",
      "spherical roller bearing.jpg",
      "tapered roller bearing.jpg",
      "thrust roller bearing.jpg",
      "envelope gasket.jpg"
    ],
    services: ["Spiral-wound gaskets", "Ring joint gaskets", "Ball & roller bearings", "Custom flange seals"]
  },
  {
    id: "valves",
    name: "Industrial Valves",
    label: "Flow Control",
    heroTitle: "Industrial Valves",
    heroDesc: "Flow control solutions for process, utility and infrastructure systems — gate, ball, butterfly and check valves.",
    description: "Flow control solutions for process, utility & infrastructure systems.",
    image: "ball valves.jpg",
    gallery: [
      "gate valves.jpg",
      "butterfly valve.jpg",
      "check valves.jpg",
      "globe and needle valve.jpg"
    ],
    services: ["Gate & ball valves", "Butterfly & check valves", "Process control valves", "Utility system valves"]
  },
  {
    id: "borehole",
    name: "Borehole and Pump Services",
    label: "Water Solutions",
    heroTitle: "Borehole and Pump Services",
    heroDesc: "Complete borehole and pump services for Zimbabwe's agriculture, industry and communities — survey to pump supply and installation.",
    description: "Complete borehole and pump services for Zimbabwe's agriculture, industry & communities.",
    image: "borehole installation.jpg",
    gallery: [
      "borehole pumps.jpg",
      "suction & delivery hose.jpg"
    ],
    services: ["Borehole survey & drilling", "Pump supply & installation", "Rising mains", "Rehabilitation services"]
  },
  {
    id: "instrumentation",
    name: "Electrical, Instrumentation and Solar",
    label: "Process Control",
    heroTitle: "Electrical, Instrumentation and Solar",
    heroDesc: "Electrical, instrumentation and solar solutions — drives, process sensors, panel meters, solar installation, and control consumables for accurate process control and automation. Process Optimization, System Integration, Calibration Precision, System Resilience, Commissioning Excellence.",
    description: "Electrical, instrumentation & solar — drives, process sensors, panel meters, solar systems & control consumables for accurate process control. Process Optimization, System Integration, Calibration Precision, System Resilience, Commissioning Excellence.",
    image: "solar installation.jpg",
    gallery: [
      "solar installation.jpg",
      "solar installation (2).jpg",
      "plant visit and ins.jpg"
    ],
    services: ["VSD drives", "Process sensors", "Solar installation", "Panel meters", "Field consumables"]
  },
  {
    id: "security",
    name: "Security and CCTV",
    label: "Field Services",
    heroTitle: "Security and CCTV",
    heroDesc: "CCTV, access automation and security systems for industrial and residential sites across Zimbabwe. Asset Protection, Perimeter Integrity, Proactive Security Infrastructure, Risk Mitigation, Real-Time Surveillance.",
    description: "CCTV, access automation & security systems for industrial and residential sites. Asset Protection, Perimeter Integrity, Proactive Security Infrastructure, Risk Mitigation, Real-Time Surveillance.",
    image: "99cc0c95-318a-44b3-948e-34ff5fef7960.jpg",
    gallery: [
      "99cc0c95-318a-44b3-948e-34ff5fef7960.jpg",
      "28028016-7501-445d-8023-dd46563d968c.jpg",
      "fd0d468e-583f-43b7-86e4-8376b46fb319.jpg"
    ],
    services: ["CCTV systems", "Gate motors & intercoms", "Access automation", "Alarm & perimeter security"]
  },
  {
    id: "gas",
    name: "Gas Industrial",
    label: "Industrial Gases",
    heroTitle: "Gas Industrial & Cylinders",
    heroDesc: "High-capacity industrial gas cylinders manufactured from durable steel or lightweight aluminum, engineered for safe storage and precise dispensing of industrial and specialty gases.",
    description: "High-capacity industrial gas cylinders. Manufactured from durable steel or lightweight aluminum, engineered for safe storage and precise dispensing of industrial and specialty gases. Available in standard volumes and pressure ratings to meet your manufacturing and operational requirements.",
    assetBase: "images/",
    image: "download.jpg",
    gallery: [
      "25a9e1ae-13f0-42f6-9620-af0019853f39.jpg",
      "0c77aa8d-3b4c-401e-9401-1fd2d27e16f0.jpg"
    ],
    services: [
      "Liquefied Natural Gas (LNG)",
      "Oxygen",
      "Argon",
      "Carbon Dioxide"
    ]
  }
];

const BRANDS = [
  {
    id: "skf",
    name: "SKF",
    tagline: "Bearings & Seals",
    logo: "6cf65404-71f4-4fcd-91fc-65e3c1d1b7ee.jpg",
    description: "Premium bearings, seals, lubrication systems and condition monitoring for mining, processing and manufacturing plant.",
    categories: ["Seals, Hoses & Spares", "Electrical, Instrumentation and Solar", "Fasteners"],
    color: "#005aaa"
  },
  {
    id: "trelleborg",
    name: "Trelleborg",
    tagline: "Sealing Solutions",
    logo: "8778f40e-2f98-4313-a114-9eb1fcc8d767.jpg",
    description: "Engineered sealing, hose, gasket and polymer solutions for harsh industrial, mining and hydraulic applications.",
    categories: ["Gaskets and Bearings", "Seals, Hoses & Spares", "Industrial Valves"],
    color: "#003865"
  },
  {
    id: "nok",
    name: "NOK",
    tagline: "Oil Seals & O-Rings",
    logo: "b3514d9c-0205-4151-8208-8df5900e216b.jpg",
    description: "Japanese-quality oil seals, O-rings, packings and rubber sealing components for pumps, gearboxes and hydraulic systems.",
    categories: ["Gaskets and Bearings", "Seals, Hoses & Spares"],
    color: "#c8102e"
  },
  {
    id: "synergy",
    name: "Synergy",
    tagline: "Industrial Products",
    logo: "91fbe912-1f80-41e4-b5b8-42a44fac542a.jpg",
    description: "Trusted Synergy-branded industrial consumables, sealing products and maintenance supplies for plant operations.",
    categories: ["Webbing Tapes", "Seals, Hoses & Spares", "Fasteners"],
    color: "#0c2340"
  },
  {
    id: "hilite",
    name: "Hilite",
    tagline: "Industrial Grade",
    logo: "58ee30fb-90b8-49e9-a721-73ebec9ebe74.jpg",
    description: "Hilite industrial tapes, sealing materials and specialty products for construction, mining and utility projects.",
    categories: ["Webbing Tapes", "Gaskets and Bearings", "Seals, Hoses & Spares"],
    color: "#1f5c4f"
  }
];

const SECTORS = [
  "Mining & Quarrying",
  "Construction & Infrastructure",
  "Agriculture & Irrigation",
  "Power Generation",
  "Water Utilities & Boreholes",
  "General Manufacturing"
];

const VALUES = [
  "Quality & Traceability",
  "Technical Expertise",
  "Pan African and Asia Reach",
  "Reliability & Integrity",
  "Client-Focused Solutions",
  "Industry Excellence"
];

const KEY_SERVICES = [
  {
    title: "Industrial Fasteners & Bolting",
    text: "Hex bolts, stainless steel fasteners, stud bolts, and anchor systems with mill certification and full traceability."
  },
  {
    title: "Seals, Hoses & Mechanical Spares",
    text: "PTFE tape, hydraulic and mining hose, bearings, packings, and rubber sheeting for plant maintenance. Fluid Integrity, Asset Lifecycle Extension, Critical Tolerance, Operational Continuity, Zero-Leak Seals."
  },
  {
    title: "Borehole and Pump Services",
    text: "End-to-end borehole survey, drilling, pump supply, rising mains, and rehabilitation across Zimbabwe."
  },
  {
    title: "Electrical, Instrumentation and Solar",
    text: "VSD drives, process sensors, solar installation, panel meters, and field consumables for accurate electrical and instrumentation process control. Process Optimization, System Integration, Calibration Precision, System Resilience, Commissioning Excellence."
  },
  {
    title: "Security and CCTV",
    text: "CCTV systems, gate motors, intercoms, and access automation for industrial and residential sites. Asset Protection, Perimeter Integrity, Proactive Security Infrastructure, Risk Mitigation, Real-Time Surveillance."
  },
  {
    title: "Valves, Gaskets and Bearings",
    text: "Gate, ball, butterfly, and check valves plus spiral-wound, ring joint, and sheet gaskets, and industrial bearings."
  }
];

const CONTACT = {
  email: "info.kunfrepvtltd@gmail.com",
  phone1: "+263719333422",
  phone2: "+263783249344",
  whatsapp: "https://wa.me/263719333422",
  website: "https://www.kunfre.com",
  address: "32065 Mabvazuva, Ruwa, Harare, Zimbabwe",
  maps: "https://www.google.com/maps/search/?api=1&query=32065+Mabvazuva+Ruwa+Harare+Zimbabwe",
  instagram: "https://www.instagram.com/kunfre_tek_?igsh=aG1iZ2VxdDMxa3hi",
  facebook: "https://www.facebook.com/profile.php?id=100083140241518"
};

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: CONTACT.instagram,
    icon: "7d0451fc-071d-4d79-b5e4-4161da08f259.jpg"
  },
  {
    name: "Facebook",
    url: CONTACT.facebook,
    icon: "fd157238-7f50-4846-bdd2-2daf74874b78.jpg"
  }
];

const CONTACT_ICONS = [
  {
    name: "Location",
    url: CONTACT.maps,
    type: "svg",
    icon: "location"
  },
  {
    name: "Call",
    url: "tel:" + CONTACT.phone1,
    type: "svg",
    icon: "phone"
  },
  {
    name: "Email",
    url: "mailto:" + CONTACT.email,
    type: "image",
    icon: "d5495d8f-4dab-40c2-a7e4-f398e30069bc.jpg",
    external: false
  },
  {
    name: "Website",
    url: CONTACT.website,
    type: "svg",
    icon: "website"
  },
  {
    name: "WhatsApp",
    url: CONTACT.whatsapp,
    type: "image",
    icon: "bafbfdb2-0e39-48f2-acb9-c18d29663704.jpg"
  }
];

const PORTFOLIO_FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "mining", label: "Mining" },
  { id: "agriculture", label: "Agriculture" },
  { id: "construction", label: "Construction" },
  { id: "water", label: "Water Utilities" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "security", label: "Security" }
];

const PORTFOLIO_PROJECTS = [
  {
    id: "mining-hose-supply",
    title: "Mining Hose & Seal Supply",
    sector: "Mining & Quarrying",
    filter: "mining",
    category: "Seals, Hoses & Spares",
    location: "Mashonaland East",
    year: "2025",
    featured: true,
    image: "profile-assets/mining-hose.webp",
    gallery: ["profile-assets/mining-hose.webp", "profile-assets/hoses.webp", "profile-assets/ptfe-tape.webp"],
    description: "Supplied heavy-duty mining hose, hydraulic fittings, PTFE seal tape, and mechanical spares for a gold processing plant's maintenance shutdown.",
    scope: ["Mining hose & fittings", "PTFE thread seal tape", "Hydraulic spares", "On-site technical support"]
  },
  {
    id: "borehole-farm",
    title: "Commercial Borehole Installation",
    sector: "Agriculture & Irrigation",
    filter: "agriculture",
    category: "Borehole and Pump Services",
    location: "Ruwa, Harare",
    year: "2025",
    featured: true,
    image: "profile-assets/borehole.webp",
    gallery: ["profile-assets/borehole.webp", "profile-assets/pumps.webp"],
    description: "End-to-end borehole survey, drilling supervision, submersible pump supply, and rising main installation for a 40-hectare commercial farm.",
    scope: ["Site survey & drilling", "Submersible pump supply", "Rising main installation", "Commissioning & handover"]
  },
  {
    id: "solar-pump-farm",
    title: "Solar Pump System Installation",
    sector: "Agriculture & Irrigation",
    filter: "agriculture",
    category: "Electrical, Instrumentation and Solar",
    location: "Mashonaland Central",
    year: "2024",
    featured: true,
    image: "profile-assets/solar.webp",
    gallery: ["profile-assets/solar.webp", "profile-assets/solar-2.webp", "profile-assets/pumps.webp"],
    description: "Designed and installed a solar-powered pump system for off-grid irrigation — panels, inverter, pump controller, and field wiring.",
    scope: ["Solar panel array", "Pump controller & inverter", "Electrical installation", "System commissioning"]
  },
  {
    id: "cctv-warehouse",
    title: "Industrial CCTV & Access Control",
    sector: "General Manufacturing",
    filter: "security",
    category: "Security and CCTV",
    location: "Harare Industrial Area",
    year: "2025",
    featured: false,
    image: "profile-assets/cctv.webp",
    gallery: ["profile-assets/cctv.webp", "profile-assets/security.webp"],
    description: "Deployed a multi-camera CCTV system with remote monitoring, gate motor automation, and intercom access for a warehouse and distribution centre.",
    scope: ["IP CCTV cameras", "NVR & remote viewing", "Gate motor automation", "Intercom system"]
  },
  {
    id: "valve-water-plant",
    title: "Valve & Gasket Package",
    sector: "Water Utilities & Boreholes",
    filter: "water",
    category: "Industrial Valves",
    location: "Harare",
    year: "2024",
    featured: false,
    image: "profile-assets/gate-valves.webp",
    gallery: ["profile-assets/gate-valves.webp", "profile-assets/ball-valves.webp", "profile-assets/gaskets.webp"],
    description: "Supplied gate valves, ball valves, butterfly valves, and spiral-wound gaskets for a municipal water treatment plant upgrade project.",
    scope: ["Gate & ball valves", "Spiral-wound gaskets", "Flange sealing kits", "Technical sizing support"]
  },
  {
    id: "fasteners-bridge",
    title: "Heavy-Duty Fastener Supply",
    sector: "Construction & Infrastructure",
    filter: "construction",
    category: "Fasteners",
    location: "Mashonaland West",
    year: "2024",
    featured: false,
    image: "profile-assets/fasteners.webp",
    gallery: ["profile-assets/fasteners.webp", "profile-assets/stainless.webp"],
    description: "Delivered mill-certified hex bolts, stud bolts, stainless fasteners, and anchor systems for a bridge rehabilitation and steel structure project.",
    scope: ["Hex & stud bolts", "Stainless steel fasteners", "Anchor bolt systems", "Mill certification on request"]
  },
  {
    id: "plant-instrumentation",
    title: "Plant Instrumentation Visit",
    sector: "General Manufacturing",
    filter: "manufacturing",
    category: "Electrical, Instrumentation and Solar",
    location: "Harare",
    year: "2025",
    featured: false,
    image: "profile-assets/plant-visit.webp",
    gallery: ["profile-assets/plant-visit.webp", "profile-assets/solar-2.webp"],
    description: "On-site plant inspection and instrumentation assessment — process sensors, VSD drives, panel meters, and control consumables for a manufacturing line.",
    scope: ["Plant inspection", "Process sensor supply", "VSD drive consultation", "Panel meter installation"]
  },
  {
    id: "borehole-rehab",
    title: "Community Borehole Rehabilitation",
    sector: "Water Utilities & Boreholes",
    filter: "water",
    category: "Borehole and Pump Services",
    location: "Mashonaland East",
    year: "2024",
    featured: false,
    image: "profile-assets/pumps.webp",
    gallery: ["profile-assets/pumps.webp", "profile-assets/borehole.webp"],
    description: "Rehabilitated a community borehole with new submersible pump, suction and delivery hose, and rising main replacement across a rural water scheme.",
    scope: ["Pump replacement", "Hose & rising mains", "Borehole rehabilitation", "Water quality testing support"]
  },
  {
    id: "bearing-gasket-mining",
    title: "Bearings & Gasket Supply",
    sector: "Mining & Quarrying",
    filter: "mining",
    category: "Gaskets and Bearings",
    location: "Midlands Province",
    year: "2024",
    featured: false,
    image: "profile-assets/bearings.webp",
    gallery: ["profile-assets/bearings.webp", "profile-assets/gaskets.webp"],
    description: "Supplied SKF bearings, spiral-wound gaskets, and rubber flange seals for conveyor systems and slurry pumps at a quarry processing plant.",
    scope: ["Ball & roller bearings", "Spiral-wound gaskets", "Rubber flange seals", "SKF authorised supply"]
  },
  {
    id: "webbing-logistics",
    title: "Webbing & Load Securing Supply",
    sector: "Construction & Infrastructure",
    filter: "construction",
    category: "Webbing Tapes",
    location: "Harare",
    year: "2025",
    featured: false,
    image: "profile-assets/webbing.webp",
    gallery: ["profile-assets/webbing.webp"],
    description: "Supplied polyester webbing slings, cargo lashings, and synthetic lifting straps for a logistics and heavy equipment transport contractor.",
    scope: ["Polyester webbing slings", "Cargo lashings", "Synthetic lifting straps", "Load securing consultation"]
  }
];
