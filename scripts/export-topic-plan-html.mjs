import { readFile, writeFile } from "node:fs/promises";

const planUrl = new URL("../frontend-topic-plan-2025-2026.html", import.meta.url);
let document = await readFile(planUrl, "utf8");
const slugs = [...document.matchAll(/<article class="draft" id="([^"]+)">/g)].map((match) => match[1]);

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function inline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown) {
  const output = [];
  let list = [];
  let code = [];
  let inCode = false;
  const flushList = () => {
    if (!list.length) return;
    output.push(`<ul>\n${list.map((item) => `  <li>${inline(item)}</li>`).join("\n")}\n</ul>`);
    list = [];
  };

  for (const line of markdown.trim().split(/\r?\n/)) {
    if (line.startsWith("```")) {
      if (inCode) {
        output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) { code.push(line); continue; }
    if (line.startsWith("- ")) { list.push(line.slice(2)); continue; }
    flushList();
    if (line.startsWith("## ")) output.push(`<h4>${inline(line.slice(3))}</h4>`);
    else if (line.trim()) output.push(`<p>${inline(line)}</p>`);
  }
  flushList();
  return output.join("\n          ");
}

for (const slug of slugs) {
  const mdx = await readFile(new URL(`../content/posts/${slug}/zh-TW.mdx`, import.meta.url), "utf8");
  const body = mdx.replace(/^export const metadata = \{[\s\S]*?^\}\s*/m, "");
  const pattern = new RegExp(`(<article class="draft" id="${slug}">[\\s\\S]*?<h3>[\\s\\S]*?<\\/h3>)[\\s\\S]*?(\\s*<\\/article>)`);
  document = document.replace(pattern, `$1\n          ${markdownToHtml(body)}$2`);
}

await writeFile(planUrl, document, "utf8");
console.log(`Exported ${slugs.length} Traditional Chinese articles to ${planUrl.pathname}.`);
