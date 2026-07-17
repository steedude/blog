import type { Metadata } from "next";
import Link from "next/link";
import { getArchiveGroups } from "@/lib/posts";

export const metadata: Metadata = { title: "文章時間軸" };

export default function ArchivePage() {
  const groups = getArchiveGroups();
  const years = [...new Set(groups.map((group) => group.year))];

  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">ARCHIVE</p>
          <h1>文章時間軸</h1>
        </div>
        <p>
          第一層先用年份快速掃描，再進入月份查看文章；比把所有年月塞進側欄更容易維護。
        </p>
      </header>
      {years.map((year) => (
        <section className="archive-year" key={year}>
          <h2>{year}</h2>
          <div className="archive-grid">
            {groups
              .filter((group) => group.year === year)
              .map((group) => (
                <Link
                  className="archive-card"
                  href={`/archive/${group.year}/${group.month}`}
                  key={`${group.year}-${group.month}`}
                >
                  <strong>{String(group.month).padStart(2, "0")} 月</strong>
                  <span>{group.posts.length} 篇文章 →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
