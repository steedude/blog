declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { PostMetadata } from "@/types/post";

  export const metadata: PostMetadata;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
