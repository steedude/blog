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
  assert.match(html, /href="\/zh-TW\/recent"/);
  assert.match(html, /href="\/zh-TW\/tags"/);
  assert.match(html, /href="\/zh-TW\/archive"/);
  assert.match(html, /href="\/zh-TW\/friends"/);
  assert.match(html, /action="\/zh-TW\/search"/);
  assert.match(html, /hrefLang="en"/);
  assert.match(html, /property="og:image"/);
});

test("separates Recent Entries from the homepage", async () => {
  const response = await render("/zh-TW/recent");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<h1[^>]*>最近文章<\/h1>/);
  assert.match(html, /Baseline 如何改變我們判斷瀏覽器支援度的方式/);
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
    new URL("../content/posts/react-compiler.mdx", import.meta.url),
    "utf8",
  );
  assert.match(postSource, /## 它試圖解決什麼？/);

  const englishResponse = await render("/en/posts/react-compiler");
  assert.equal(englishResponse.status, 200);
  const englishHtml = await englishResponse.text();
  assert.match(englishHtml, /Is React Compiler ready to adopt/);
  assert.match(englishHtml, /What problem is it trying to solve/);
  await access(new URL("../public/og-movable-type.png", import.meta.url));
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

test("renders GitHub Flavored Markdown tables", async () => {
  const response = await render("/zh-TW/posts/modern-css");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<table\b/);
  assert.match(html, /Container Queries/);
});
