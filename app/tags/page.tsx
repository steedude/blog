import type { Metadata } from "next";
import Link from "next/link";
import { getTags } from "@/lib/posts";

export const metadata: Metadata = { title: "所有標籤" };

export default function TagsPage() {
  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">TAGS</p>
          <h1>所有標籤</h1>
        </div>
        <p>標籤可以跨分類描述文章中的框架、API、方法或議題。</p>
      </header>
      <div className="all-tags">
        {getTags().map((tag) => (
          <Link href={`/tag/${tag.slug}`} key={tag.slug}>
            #{tag.name} · {tag.count}
          </Link>
        ))}
      </div>
    </main>
  );
}
