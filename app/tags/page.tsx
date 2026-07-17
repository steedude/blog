import type { Metadata } from "next";
import Link from "next/link";
import { getTags } from "@/lib/posts";
import {
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

export const metadata: Metadata = { title: "所有標籤" };

export default function TagsPage() {
  return (
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">TAGS</p>
          <h1 className={pageHeadingTitle}>所有標籤</h1>
        </div>
        <p className={pageHeadingCopy}>標籤可以跨分類描述文章中的框架、API、方法或議題。</p>
      </header>
      <div className="flex flex-wrap gap-x-4 gap-y-2 leading-loose">
        {getTags().map((tag) => (
          <Link href={`/tag/${tag.slug}`} key={tag.slug}>
            #{tag.name} · {tag.count}
          </Link>
        ))}
      </div>
    </main>
  );
}
