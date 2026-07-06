import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "company-profile.html");
const pdfPath = path.join(__dirname, "Kunfre-Enterprise-Company-Profile.pdf");

console.log("Compressing profile images…");
const compress = spawnSync(process.execPath, ["compress-profile-images.mjs"], {
  cwd: __dirname,
  stdio: "inherit",
});

if (compress.status !== 0) {
  process.exit(compress.status ?? 1);
}

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  process.env.PROGRAMFILES + "\\Google\\Chrome\\Application\\chrome.exe",
  process.env["PROGRAMFILES(X86)"] + "\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const browser = edgePaths.find((p) => existsSync(p));
if (!browser) {
  console.error("No Edge or Chrome installation found for PDF export.");
  process.exit(1);
}

const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
console.log("Generating PDF…");
const result = spawnSync(
  browser,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    fileUrl,
  ],
  { stdio: "inherit" }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const sizeMb = (existsSync(pdfPath) ? statSync(pdfPath).size : 0) / 1024 / 1024;
console.log(`PDF saved: ${pdfPath} (${sizeMb.toFixed(2)} MB)`);
