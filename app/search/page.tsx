import type { Metadata } from "next";
import { ExternalSearch } from "@/components/ExternalSearch";
import {
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

export const metadata: Metadata = { title: "搜尋文章" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">SEARCH</p>
          <h1 className={pageHeadingTitle}>搜尋文章</h1>
        </div>
        <p className={pageHeadingCopy}>
          首頁提供快速入口，這裡則讓讀者選擇 Google 或 DuckDuckGo，並決定是否只搜尋本站。
        </p>
      </header>
      <ExternalSearch initialQuery={q} />
    </main>
  );
}
