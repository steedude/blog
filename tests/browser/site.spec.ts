import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("search survives reload, language switching, clearing, and browser back", async ({ page }) => {
  await page.goto("/en/search?q=Compiler");
  const input = page.getByRole("searchbox");
  await expect(input).toHaveValue("Compiler");
  await input.fill("CSS");
  await expect(page).toHaveURL(/q=CSS/);
  await expect(page.locator("main article")).not.toHaveCount(0);
  await page.reload();
  await expect(input).toHaveValue("CSS");
  await page.getByRole("link", { name: "繁體中文", exact: true }).click();
  await expect(page).toHaveURL(/\/zh-TW\/search\?q=CSS/);
  await expect(input).toHaveValue("CSS");
  await page.locator("main article a").first().click();
  await expect(page).toHaveURL(/\/posts\//);
  await page.goBack();
  await expect(input).toHaveValue("CSS");
  await page.getByRole("button", { name: "清除", exact: true }).click();
  await expect(page).toHaveURL(/\/zh-TW\/search$/);
  await expect(input).toHaveValue("");
  await page.reload();
  await expect(input).toHaveValue("");
  await expect(page.locator("main article")).toHaveCount(31);
});

test("search handles Chinese, Unicode normalization, and no results", async ({ page }) => {
  await page.goto("/zh-TW/search");
  const input = page.getByRole("searchbox");
  await input.fill("資安");
  await expect(input).toHaveValue("資安");
  await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe("資安");
  await input.fill("ＣＳＳ");
  await expect(page.locator("main article")).not.toHaveCount(0);
  await input.fill("no-such-post-987654321");
  await expect(page.getByText("找不到符合條件的文章。", { exact: true })).toBeVisible();
});

test("table of contents and heading permalinks navigate to real sections", async ({ page }) => {
  await page.goto("/zh-TW/posts/view-transitions");
  await page.locator("summary", { hasText: "文章目錄" }).click();
  const target = page.getByRole("navigation", { name: "文章目錄" }).getByRole("link").first();
  const href = await target.getAttribute("href");
  await target.click();
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe(href);
  await expect(page.locator("h2[id]").first()).toBeInViewport();
  await page.reload();
  await expect(page.locator("h2[id]").first()).toBeInViewport();
  await expect(page.locator("h2[id]").first().getByRole("link")).toHaveAttribute("href", href!);
});

test("copies code with line breaks and reports clipboard failure", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/posts/view-transitions");
  await page.getByRole("button", { name: "Copy code", exact: true }).first().click();
  await expect(page.getByRole("status").first()).toHaveText("Copied");
  // The Windows clipboard exposes CRLF even when writeText receives LF.
  const clipboard = (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n");
  expect(clipboard).toContain("@view-transition {\n");
  expect(clipboard).toContain("navigation: auto;");
  expect(clipboard).not.toContain("Copy code");
  const source = (await readFile("content/posts/view-transitions/en.mdx", "utf8")).replace(/\r\n/g, "\n");
  expect(clipboard).toBe(source.match(/```css\n([\s\S]*?)```/)![1]);
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", { value: () => Promise.reject(new Error("Denied")), configurable: true });
  });
  await page.getByRole("button", { name: "Copy code", exact: true }).first().click();
  await expect(page.getByRole("status").first()).toHaveText("Copy failed. Select and copy the code.");
});

test("project pages show screenshots, case studies and working demo links", async ({ page }, testInfo) => {
  await page.goto("/zh-TW/projects");
  await expect(page.locator("main img")).toHaveCount(4);
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `test-results/projects-${testInfo.project.name}.png`, fullPage: true });
  await page.locator('main a[href="/zh-TW/projects/web-file"]').click();
  await expect(page.getByRole("heading", { name: /實作案例/ })).toBeVisible();
  const image = page.locator("main img");
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: /開啟網站/ })).toHaveAttribute("href", "https://file.3854335.com");
  await page.screenshot({ path: `test-results/project-detail-${testInfo.project.name}.png`, fullPage: true });
});

test("article and search layouts fit the viewport without page overflow", async ({ page }, testInfo) => {
  for (const path of ["/zh-TW/posts/view-transitions", "/en/search?q=CSS", "/en/projects/web-file"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.goto("/zh-TW/posts/view-transitions");
  await page.locator("summary", { hasText: "文章目錄" }).click();
  await page.screenshot({ path: `test-results/article-${testInfo.project.name}.png`, fullPage: true });
});

test("article navigation and sources work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3139/en/posts/view-transitions");
    await page.locator("summary", { hasText: "On this page" }).click();
    await expect(page.getByRole("navigation", { name: "Table of contents" }).getByRole("link").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "View Transition API" })).toBeVisible();
  } finally {
    await context.close();
  }
});
