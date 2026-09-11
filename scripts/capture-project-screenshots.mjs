import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const directory = new URL("../public/projects/", import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [slug, url] of [
    ["zhinan-ai-bazi", "https://zhinan.3854335.com"],
    ["home-inventory", "https://inventory.3854335.com"],
    ["web-file", "https://file.3854335.com"],
    ["3854335-web-tool", "https://3854335.com"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, locale: "zh-TW", colorScheme: "light" });
    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: fileURLToPath(new URL(`${slug}.jpg`, directory)), type: "jpeg", quality: 82, animations: "disabled" });
      console.log(JSON.stringify({ slug, url: page.url(), title: await page.title(), text: (await page.locator("body").innerText()).slice(0, 1000) }));
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
