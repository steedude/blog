import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";

const textOf = (node) => node.type === "text" ? node.value : (node.children ?? []).map(textOf).join("");
const text = (value) => ({ type: "text", value });
const element = (tagName, properties, children) => ({ type: "element", tagName, properties, children });

// Generate links from the compiled heading tree, so inline markup, duplicate
// headings and the table of contents always share exactly the same IDs.
export default function rehypeArticleNavigation() {
  return (tree, file) => {
    const english = /(?:^|[/\\])en\.mdx$/.test(file.path ?? "");
    const slugger = new GithubSlugger();
    const headings = [];
    visit(tree, "element", (node) => {
      if (node.tagName === "pre") {
        node.properties ??= {};
        node.properties["data-raw-code"] = textOf(node);
      }
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const title = textOf(node);
      const id = `section-${slugger.slug(title)}`;
      node.properties ??= {};
      node.properties.id = id;
      headings.push({ title, id, depth: node.tagName });
      node.children.push(element("a", {
        href: `#${id}`, className: ["heading-anchor"],
        ariaLabel: english ? `Link to ${title}` : `連結至「${title}」`,
      }, [text("#")]));
    });
    if (headings.length < 2) return;
    tree.children.unshift(element("details", { className: ["article-toc"] }, [
      element("summary", {}, [text(english ? "On this page" : "文章目錄")]),
      element("nav", { ariaLabel: english ? "Table of contents" : "文章目錄" }, [
        element("ul", {}, headings.map(({ title, id, depth }) =>
          element("li", { className: [depth === "h3" ? "toc-subheading" : "toc-heading"] }, [
            element("a", { href: `#${id}` }, [text(title)]),
          ]))),
      ]),
    ]));
  };
}
