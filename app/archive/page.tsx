import type { Metadata } from "next";
import Link from "next/link";
import { getArchiveGroups } from "@/lib/posts";
import {
  directoryCard,
  directoryCardMeta,
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

export const metadata: Metadata = { title: "文章時間軸" };

export default function ArchivePage() {
  const groups = getArchiveGroups();
  const years = [...new Set(groups.map((group) => group.year))];

  return (
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">ARCHIVE</p>
          <h1 className={pageHeadingTitle}>文章時間軸</h1>
        </div>
        <p className={pageHeadingCopy}>
          第一層先用年份快速掃描，再進入月份查看文章；比把所有年月塞進側欄更容易維護。
        </p>
      </header>
      {years.map((year) => (
        <section className="mb-7" key={year}>
          <h2 className="mt-0 mb-2 border-b border-neutral-500 pb-1 font-serif text-2xl">{year}</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {groups
              .filter((group) => group.year === year)
              .map((group) => (
                <Link
                  className={directoryCard}
                  href={`/archive/${group.year}/${group.month}`}
                  key={`${group.year}-${group.month}`}
                >
                  <strong className="block font-serif text-lg text-link underline">
                    {String(group.month).padStart(2, "0")} 月
                  </strong>
                  <span className={directoryCardMeta}>{group.posts.length} 篇文章 →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
