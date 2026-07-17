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

test("server-renders the blog homepage and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>前端觀察站<\/title>/);
  assert.match(html, /關於網頁標準、瀏覽器與前端開發/);
  assert.match(html, /最新文章/);
  assert.match(html, /href="\/categories"/);
  assert.match(html, /href="\/tags"/);
  assert.match(html, /href="\/archive"/);
  assert.match(html, /href="\/friends"/);
  assert.match(html, /action="\/search"/);
  assert.match(html, /property="og:image"/);
});

test("server-renders MDX content and the social image", async () => {
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
  await access(new URL("../public/og-movable-type.png", import.meta.url));
});
