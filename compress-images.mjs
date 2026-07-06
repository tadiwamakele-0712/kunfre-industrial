import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve("assets");

const PROFILES = [
  { dir: "kunfre-pic", maxWidth: 960, quality: 74 },
  { dir: "product logo", maxWidth: 420, quality: 80 },
  { dir: "social icon", maxWidth: 128, quality: 80 },
  { dir: "kunfre", maxWidth: 480, quality: 80 },
];

const ROOT_FILES = [
  { file: "kunfre-logo.jpg", maxWidth: 320, quality: 80 },
  { file: "logo.png", maxWidth: 512, quality: 80 },
];

function toWebpPath(filePath) {
  return filePath.replace(/\.(jpe?g|png)$/i, ".webp");
}

async function compressToWebp(filePath, maxWidth, quality) {
  const before = fs.statSync(filePath).size;
  const inputBuffer = fs.readFileSync(filePath);
  const meta = await sharp(inputBuffer).metadata();
  const pipeline = sharp(inputBuffer).rotate();

  if (meta.width && meta.width > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const webpPath = toWebpPath(filePath);
  const buffer = await pipeline.webp({ quality, effort: 4 }).toBuffer();
  fs.writeFileSync(webpPath, buffer);

  return { before, after: buffer.length, webpPath };
}

async function walkDir(dirPath, maxWidth, quality, results) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, maxWidth, quality, results);
      continue;
    }
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;
    const result = await compressToWebp(fullPath, maxWidth, quality);
    results.push({ file: fullPath, ...result });
  }
}

const results = [];

for (const profile of PROFILES) {
  const dirPath = path.join(ROOT, profile.dir);
  if (!fs.existsSync(dirPath)) continue;
  await walkDir(dirPath, profile.maxWidth, profile.quality, results);
}

for (const item of ROOT_FILES) {
  const filePath = path.join(ROOT, item.file);
  if (!fs.existsSync(filePath)) continue;
  const result = await compressToWebp(filePath, item.maxWidth, item.quality);
  results.push({ file: filePath, ...result });
}

const beforeTotal = results.reduce((sum, r) => sum + r.before, 0);
const afterTotal = results.reduce((sum, r) => sum + r.after, 0);

console.log(`Created ${results.length} WebP images`);
console.log(`Original JPEG/PNG: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`WebP total:        ${(afterTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved:             ${((beforeTotal - afterTotal) / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - afterTotal / beforeTotal) * 100)}%)`);

results
  .sort((a, b) => b.before - b.after - (a.before - a.after))
  .slice(0, 12)
  .forEach((r) => {
    const name = path.basename(r.file);
    console.log(`  ${name}: ${Math.round(r.before / 1024)}KB → ${Math.round(r.after / 1024)}KB`);
  });
