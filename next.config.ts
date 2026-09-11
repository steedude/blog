import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      path.resolve("plugins/rehype-article-navigation.mjs"),
      [
        "rehype-pretty-code",
        {
          theme: "github-light",
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
