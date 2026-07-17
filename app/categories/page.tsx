import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/posts";
import {
  directoryCard,
  directoryCardMeta,
  directoryCardTitle,
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

export const metadata: Metadata = { title: "文章分類" };

export default function CategoriesPage() {
  return (
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">CATEGORIES</p>
          <h1 className={pageHeadingTitle}>文章分類</h1>
        </div>
        <p className={pageHeadingCopy}>用主題領域閱讀文章。每篇文章只選一個主要分類，避免分類重疊。</p>
      </header>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {getCategories().map((category) => (
          <Link
            className={directoryCard}
            href={`/category/${category.slug}`}
            key={category.slug}
          >
            <h2 className={directoryCardTitle}>{category.name}</h2>
            <span className={directoryCardMeta}>{category.count} ARTICLES →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
