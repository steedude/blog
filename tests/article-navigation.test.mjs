import assert from "node:assert/strict";
import { test } from "node:test";
import rehypeArticleNavigation from "../plugins/rehype-article-navigation.mjs";

test("headings with inline code and duplicates get distinct, matching links", () => {
  const heading = () => ({ type: "element", tagName: "h2", properties: {}, children: [
    { type: "text", value: "使用 " },
    { type: "element", tagName: "code", children: [{ type: "text", value: "CSS" }] },
  ] });
  const first = heading();
  const second = heading();
  const tree = { type: "root", children: [first, second] };
  rehypeArticleNavigation()(tree, { path: "C:\\posts\\example\\zh-TW.mdx" });
  assert.equal(first.properties.id, "section-使用-css");
  assert.equal(second.properties.id, "section-使用-css-1");
  assert.equal(first.children.at(-1).properties.href, "#section-使用-css");
  const contents = tree.children[0];
  assert.equal(contents.children[0].children[0].value, "文章目錄");
  assert.equal(contents.children[1].children[0].children[1].children[0].properties.href, "#section-使用-css-1");
});
