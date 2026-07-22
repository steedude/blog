import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const projectDirectory = fileURLToPath(new URL("..", import.meta.url));
const port = 3137;
let server;

before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    { cwd: projectDirectory, stdio: ["ignore", "pipe", "pipe"] },
  );

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Next.js test server did not start in time")),
      20_000,
    );
    const inspectOutput = (chunk) => {
      if (!String(chunk).includes("Ready")) return;
      clearTimeout(timeout);
      resolve();
    };
    server.stdout.on("data", inspectOutput);
    server.stderr.on("data", inspectOutput);
    server.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Next.js test server exited with code ${code}`));
    });
  });
});

after(() => server?.kill());

async function render(pathname = "/") {
  return fetch(`http://127.0.0.1:${port}${pathname}`, {
    headers: { accept: "text/html" },
  });
}

function mainOf(html) {
  const start = html.indexOf("<main");
  return html.slice(start, html.indexOf("</main>", start) + 7);
}

test("redirects the root route to the default locale", async () => {
  const response = await fetch(`http://127.0.0.1:${port}/`, {
    redirect: "manual",
  });
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/zh-TW");

  const legacyRoute = await fetch(`http://127.0.0.1:${port}/archive`, {
    redirect: "manual",
  });
  assert.equal(legacyRoute.status, 307);
  assert.equal(legacyRoute.headers.get("location"), "/zh-TW/archive");
});

test("uses the request language for unlocalized routes", async () => {
  const response = await fetch(`http://127.0.0.1:${port}/`, {
    headers: { "accept-language": "en-US,en;q=0.9,zh-TW;q=0.5" },
    redirect: "manual",
  });
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/en");
});

test("server-renders the Traditional Chinese homepage and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.url, /\/zh-TW$/);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>前端觀察站<\/title>/);
  assert.match(html, /關於網頁標準、瀏覽器與前端開發/);
  assert.match(html, /最新文章/);
  assert.match(html, /href="\/zh-TW\/categories"/);
  assert.doesNotMatch(html, /href="\/zh-TW\/recent"/);
  assert.match(html, /href="\/zh-TW\/tags"/);
  assert.match(html, /href="\/zh-TW\/archive"/);
  assert.match(html, /href="\/zh-TW\/friends"/);
  assert.match(html, /href="\/zh-TW\/about"/);
  assert.match(html, />首頁<\/a>/);
  assert.match(html, />文章彙整<\/a>/);
  assert.match(html, />作品集<\/a>/);
  assert.match(html, />友情連結<\/a>/);
  assert.match(html, /href="https:\/\/example\.com"/);
  assert.match(html, /前端開發者 A/);
  assert.doesNotMatch(html, /友站列表/);
  assert.match(html, /action="\/zh-TW\/search"/);
  assert.match(html, /class="h-7 min-w-0 flex-1[^"]*" id="home-search"/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /hrefLang="x-default"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /"@type":"WebSite"/);
});

test("does not expose the removed recent page", async () => {
  const response = await render("/zh-TW/recent");
  assert.equal(response.status, 404);
});

test("server-renders the English homepage", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<title>Frontend Observer<\/title>/);
  assert.match(html, /Latest posts/);
  assert.match(html, /Search this site/);
  assert.match(html, /href="\/en\/categories"/);
  assert.match(html, />Main<\/a>/);
  assert.match(html, />Archives<\/a>/);
  assert.match(html, />Projects<\/a>/);
});

test("keeps archive implementation notes out of the page", async () => {
  const response = await render("/zh-TW/archive");
  assert.equal(response.status, 200);
  const main = mainOf(await response.text());
  assert.doesNotMatch(main, /第一層先用年份快速掃描/);
  assert.doesNotMatch(main, /比把所有年月塞進側欄更容易維護/);
  assert.doesNotMatch(main, />ARCHIVE</);
});

test("renders a real localized about page", async () => {
  const [chineseResponse, englishResponse] = await Promise.all([
    render("/zh-TW/about"),
    render("/en/about"),
  ]);
  assert.equal(chineseResponse.status, 200);
  assert.match(await chineseResponse.text(), /<h1[^>]*>關於本站<\/h1>/);
  assert.equal(englishResponse.status, 200);
  assert.match(await englishResponse.text(), /<h1[^>]*>About this site<\/h1>/);
});

test("shows only localized page titles without heading descriptions", async () => {
  const pages = [
    ["/zh-TW/categories", "文章分類", /CATEGORIES|用主題領域閱讀文章/],
    ["/zh-TW/projects", "作品集", /PROJECTS|實際上線的網站與前端實作/],
    ["/zh-TW/tags", "所有標籤", /TAGS|標籤可以跨分類描述文章/],
    ["/zh-TW/friends", "友站連結", /BLOGROLL|推薦持續產出/],
    ["/zh-TW/search", "搜尋文章", /SEARCH|搜尋本站文章的標題/],
  ];

  for (const [pathname, title, removedText] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const main = mainOf(await response.text());
    assert.match(main, new RegExp(`<h1[^>]*>${title}</h1>`));
    assert.doesNotMatch(main, removedText);
  }
});

test("server-renders localized MDX content and the social image", async () => {
  const response = await render("/zh-TW/posts/react-compiler");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /React Compiler 值得現在導入嗎/);
  assert.match(html, /它試圖解決什麼/);
  assert.match(html, /useMemo/);
  assert.match(html, /data-rehype-pretty-code-figure/);
  const postSource = await readFile(
    new URL("../content/posts/react-compiler/zh-TW.mdx", import.meta.url),
    "utf8",
  );
  assert.match(postSource, /## 它試圖解決什麼？/);

  const englishResponse = await render("/en/posts/react-compiler");
  assert.equal(englishResponse.status, 200);
  const englishHtml = await englishResponse.text();
  assert.match(englishHtml, /Is React Compiler ready to adopt/);
  assert.match(englishHtml, /What problem is it trying to solve/);
  assert.match(englishHtml, /"@type":"BlogPosting"/);
  assert.match(englishHtml, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(englishHtml, /TrackBack|Comments \(/);

  const imageResponse = await render("/en/posts/react-compiler/opengraph-image");
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get("content-type") ?? "", /^image\/png/);
  await access(new URL("../public/og-movable-type.png", import.meta.url));
});

test("searches posts locally without external search engines", async () => {
  const response = await render("/en/search?q=Compiler");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /1 post found/);
  assert.match(html, /Is React Compiler ready to adopt/);
  assert.doesNotMatch(html, /google\.com\/search|duckduckgo\.com/);
});

test("renders the localized portfolio and project detail", async () => {
  const [listResponse, detailResponse] = await Promise.all([
    render("/en/projects"),
    render("/en/projects/3854335-web-tool"),
  ]);
  assert.equal(listResponse.status, 200);
  assert.match(await listResponse.text(), /3854335 WEB TOOL/);
  assert.equal(detailResponse.status, 200);
  const detail = await detailResponse.text();
  assert.match(detail, /https:\/\/3854335\.com/);
  assert.match(detail, /WebRTC/);
  assert.match(detail, /"@type":"SoftwareApplication"/);
});

test("returns a localized 404 for missing content", async () => {
  for (const pathname of [
    "/en/posts/not-a-post",
    "/en/projects/not-a-project",
    "/en/category/not-a-category",
    "/en/tag/not-a-tag",
    "/en/archive/1999/1",
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, pathname);
    assert.match(await response.text(), /Page not found/);
  }
});

test("serves sitemap, robots, and RSS discovery files", async () => {
  const [sitemapResponse, robotsResponse, rssResponse] = await Promise.all([
    render("/sitemap.xml"),
    render("/robots.txt"),
    render("/zh-TW/rss.xml"),
  ]);

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /\/zh-TW\/posts\/react-compiler/);
  assert.match(sitemap, /\/en\/posts\/react-compiler/);
  assert.match(sitemap, /\/en\/projects\/3854335-web-tool/);
  assert.match(sitemap, /hreflang="x-default"/);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: .*\/sitemap\.xml/);

  assert.equal(rssResponse.status, 200);
  assert.match(rssResponse.headers.get("content-type") ?? "", /application\/rss\+xml/);
  const rss = await rssResponse.text();
  assert.match(rss, /<title>前端觀察站<\/title>/);
  assert.match(rss, /<guid isPermaLink="true">.*\/zh-TW\/posts\/react-compiler<\/guid>/);

  const englishRss = await render("/en/rss.xml");
  assert.equal(englishRss.status, 200);
  assert.match(await englishRss.text(), /<title>Frontend Observer<\/title>/);
});

test("serves the branded favicon and English plural forms", async () => {
  const [iconResponse, archiveResponse] = await Promise.all([
    render("/icon.svg"),
    render("/en/archive"),
  ]);
  assert.equal(iconResponse.status, 200);
  assert.match(iconResponse.headers.get("content-type") ?? "", /image\/svg\+xml/);
  const archive = await archiveResponse.text();
  assert.match(archive, /1 article/);
  assert.doesNotMatch(archive, /1 articles/);
});

test("renders GitHub Flavored Markdown tables", async () => {
  const response = await render("/zh-TW/posts/modern-css");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<table\b/);
  assert.match(html, /Container Queries/);
});
