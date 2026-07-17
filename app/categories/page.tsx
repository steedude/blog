import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/posts";

export const metadata: Metadata = { title: "文章分類" };

export default function CategoriesPage() {
  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">CATEGORIES</p>
          <h1>文章分類</h1>
        </div>
        <p>用主題領域閱讀文章。每篇文章只選一個主要分類，避免分類重疊。</p>
      </header>
      <div className="directory-grid">
        {getCategories().map((category) => (
          <Link
            className="directory-card"
            href={`/category/${category.slug}`}
            key={category.slug}
          >
            <h2>{category.name}</h2>
            <span>{category.count} ARTICLES →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
