import type { Metadata } from "next";
import { ExternalSearch } from "@/components/ExternalSearch";

export const metadata: Metadata = { title: "搜尋文章" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">SEARCH</p>
          <h1>搜尋文章</h1>
        </div>
        <p>
          首頁提供快速入口，這裡則讓讀者選擇 Google 或 DuckDuckGo，並決定是否只搜尋本站。
        </p>
      </header>
      <ExternalSearch initialQuery={q} />
    </main>
  );
}
