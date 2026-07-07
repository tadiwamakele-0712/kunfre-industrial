import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "assets");
const OUT = path.join(__dirname, "profile-assets");

const ASSETS = [
  { src: "kunfre-logo.webp", maxWidth: 220, quality: 72 },
  { src: "kunfre/download.webp", maxWidth: 300, quality: 72 },
  { src: "kunfre-pic/borehole installation.webp", out: "cover-bg.webp", maxWidth: 720, quality: 55 },
  { src: "kunfre-pic/plant visit and ins.webp", out: "plant-visit.webp", maxWidth: 480, quality: 62 },
  { src: "kunfre-pic/hex bolt & nuts.webp", out: "fasteners.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/deep groove ball bearing.webp", out: "bearings.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/ball valves.webp", out: "ball-valves.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/hydraulic hose, fittings& spares.webp", out: "hoses.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/polyester flat webbing tape.webp", out: "webbing.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/spiral wound gasket.webp", out: "gaskets.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/stainless steel fasteners.webp", out: "stainless.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/gate valves.webp", out: "gate-valves.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/mining hose.webp", out: "mining-hose.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/ptfe thread seal tape.webp", out: "ptfe-tape.webp", maxWidth: 360, quality: 62 },
  { src: "kunfre-pic/borehole installation.webp", out: "borehole.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/73a2ac42-8890-4a01-ba17-77b50bac26fd.webp", out: "solar.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/afd070ac-8ec3-455c-b27f-f6461051e897.webp", out: "solar-2.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/e8dd1a55-2873-46db-b605-203872c4778b.webp", out: "solar-3.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/1156cbd8-0a15-4c0f-ba10-134b3a556af1.webp", out: "cctv.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/borehole pumps.webp", out: "pumps.webp", maxWidth: 400, quality: 62 },
  { src: "kunfre-pic/99cc0c95-318a-44b3-948e-34ff5fef7960.webp", out: "security.webp", maxWidth: 360, quality: 62 },
  { src: "product logo/6cf65404-71f4-4fcd-91fc-65e3c1d1b7ee.webp", out: "brand-skf.webp", maxWidth: 160, quality: 75 },
  { src: "product logo/8778f40e-2f98-4313-a114-9eb1fcc8d767.webp", out: "brand-trelleborg.webp", maxWidth: 160, quality: 75 },
  { src: "product logo/b3514d9c-0205-4151-8208-8df5900e216b.webp", out: "brand-nok.webp", maxWidth: 160, quality: 75 },
  { src: "product logo/91fbe912-1f80-41e4-b5b8-42a44fac542a.webp", out: "brand-synergy.webp", maxWidth: 160, quality: 75 },
  { src: "product logo/58ee30fb-90b8-49e9-a721-73ebec9ebe74.webp", out: "brand-hilite.webp", maxWidth: 160, quality: 75 },
];

fs.mkdirSync(OUT, { recursive: true });

let beforeTotal = 0;
let afterTotal = 0;

for (const item of ASSETS) {
  const input = path.join(ROOT, item.src);
  const outputName = item.out || path.basename(item.src);
  const output = path.join(OUT, outputName);

  if (!fs.existsSync(input)) {
    console.warn(`Skip (missing): ${item.src}`);
    continue;
  }

  const before = fs.statSync(input).size;
  const buffer = await sharp(fs.readFileSync(input))
    .rotate()
    .resize({ width: item.maxWidth, withoutEnlargement: true })
    .webp({ quality: item.quality, effort: 4 })
    .toBuffer();

  fs.writeFileSync(output, buffer);
  beforeTotal += before;
  afterTotal += buffer.length;
  console.log(`  ${outputName}: ${Math.round(before / 1024)}KB → ${Math.round(buffer.length / 1024)}KB`);
}

console.log(`\nProfile assets: ${(afterTotal / 1024 / 1024).toFixed(2)} MB (was ${(beforeTotal / 1024 / 1024).toFixed(2)} MB)`);
