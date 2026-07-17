import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the blog homepage and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>前端觀察站<\/title>/);
  assert.match(html, /把前端變化/);
  assert.match(html, /最新文章/);
  assert.match(html, /href="\/categories"/);
  assert.match(html, /href="\/tags"/);
  assert.match(html, /href="\/archive"/);
  assert.match(html, /href="\/friends"/);
  assert.match(html, /href="\/search"/);
  assert.match(html, /property="og:image"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("includes MDX content and project social image", async () => {
  const response = await render("/posts/react-compiler");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /React Compiler 值得現在導入嗎/);
  assert.match(html, /它試圖解決什麼/);
  assert.match(html, /useMemo/);

  const postSource = await readFile(
    new URL("../content/posts/react-compiler.mdx", import.meta.url),
    "utf8",
  );
  assert.match(postSource, /## 它試圖解決什麼？/);
  await access(new URL("../public/og.png", import.meta.url));
});
