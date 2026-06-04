import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = "https://template-nextjs-boxing-gym.vercel.app/";

const pages = [
  "/",
  "/about",
  "/classes",
  "/offerings",
  "/join",
  "/signup",
  "/login",
  "/contact",
];

function filenameFromUrl(pagePath) {
  if (pagePath === "/") return "home.png";

  return pagePath
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replaceAll("/", "__")
    .replace(/[^a-zA-Z0-9-_]/g, "_") + ".png";
}

(async () => {
  const outputDir = path.join(__dirname, "../screenshots");
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  for (const pagePath of pages) {
    const url = BASE_URL + pagePath;
    const filePath = path.join(outputDir, filenameFromUrl(pagePath));

    console.log(`Screenshot: ${url} -> ${filePath}`);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: filePath,
      fullPage: true,
    });
  }

  await browser.close();
})();