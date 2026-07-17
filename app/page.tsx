import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { allPosts, getArchiveGroups } from "@/lib/posts";
import { retroButton, siteShell } from "@/lib/styles";

const recentPostLabels: Record<string, string> = {
  "react-compiler": "React Compiler 導入筆記",
  "view-transitions": "View Transitions API",
  "modern-css": "新一代 CSS 原生能力",
  "server-components-retrospective": "Server Components 回顧",
  "web-vitals": "Core Web Vitals 觀察",
};

const sidebarSection =
  "mb-3 border border-frame bg-white/35 px-2 pt-0 pb-2 text-sm";
const sidebarHeading =
  "-mx-2 mt-0 mb-2 border-b border-frame bg-sidebar-bar px-2 py-1 text-base font-bold tracking-normal text-black";
const sidebarList =
  "m-0 list-disc py-0 pr-0 pl-5 text-sm";

function HomeFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`px-2 pt-px pb-3 text-center text-sm ${className}`}>
      <p className="mx-0 mt-2 mb-0">
        « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
        <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
        <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
      </p>
      <p className="mx-0 mt-2 mb-0 text-xs">
        Powered by <Link href="https://www.movabletype.org/">Movable Type 2.2</Link>
      </p>
    </footer>
  );
}

export default function Home() {
  const archives = getArchiveGroups().slice(0, 2);
  const homePosts = allPosts.slice(0, 2);
  const recentPosts = allPosts.slice(0, 5);

  return (
    <main
      className={`${siteShell} border-y border-frame bg-paper/92 md:border-x md:border-t-0`}
    >
      <div className="grid grid-cols-1 items-start md:grid-cols-3">
        <section className="min-w-0 p-4 md:col-span-2 md:px-3 md:pt-3 md:pb-0" aria-labelledby="latest-posts">
          <nav className="mx-0 mt-0 mb-3 px-0.5 pt-0 pb-2 text-sm sm:text-base" aria-label="首頁導覽">
            « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
            <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
            <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
          </nav>
          <h1 id="latest-posts" className="sr-only">最新文章</h1>
          <div className="post-list">
            {homePosts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
          <HomeFooter className="hidden md:block" />
        </section>

        <aside
          className="min-h-0 border-t border-frame bg-paper/45 p-4 md:min-h-screen md:border-t-0 md:border-l md:p-3"
          aria-label="網站資訊與文章導覽"
        >
          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>關於本站</h2>
            <p className="m-0">記錄一些關於網頁標準、瀏覽器、CSS 與程式開發的觀察筆記。</p>
            <p className="mx-0 mt-2 mb-0"><Link href="/friends">關於本站</Link></p>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>搜尋本站</h2>
            <form action="/search" className="flex gap-1 px-0 py-0.5">
              <label className="sr-only" htmlFor="home-search">搜尋文章</label>
              <input
                className="h-7 min-w-0 w-full border border-neutral-400 bg-white"
                id="home-search"
                name="q"
                size={16}
              />
              <button className={retroButton} type="submit">搜尋</button>
            </form>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>最近文章</h2>
            <ul className={sidebarList}>
              {recentPosts.map((post) => (
                <li className="my-1 leading-snug" key={post.slug}>
                  <Link href={`/posts/${post.slug}`} aria-label={post.title}>
                    {recentPostLabels[post.slug] ?? post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={sidebarSection}>
            <div className="relative">
              <h2 className={sidebarHeading}>每月彙整</h2>
              <Link className="absolute top-1 right-0 text-xs" href="/archive">全部</Link>
            </div>
            <ul className={sidebarList}>
              {archives.map((archive) => (
                <li className="my-1 leading-snug" key={`${archive.year}-${archive.month}`}>
                  <Link href={`/archive/${archive.year}/${archive.month}`}>
                    {archive.year} 年 {archive.month} 月
                  </Link>
                  <span className="text-xs text-muted"> ({archive.posts.length})</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>友情連結</h2>
            <ul className={sidebarList}>
              <li className="my-1 leading-snug"><Link href="/friends">友站列表</Link></li>
              <li className="my-1 leading-snug"><Link href="/categories">文章分類</Link></li>
              <li className="my-1 leading-snug"><Link href="/tags">所有標籤</Link></li>
              <li className="my-1 leading-snug"><Link href="/friends">CSS Zen Garden</Link></li>
            </ul>
          </section>

          <section className={`${sidebarSection} flex items-center gap-2 pt-2`}>
            <strong className="bg-xml px-1 py-px font-sans text-xs font-bold text-white">XML</strong>
            <Link href="/rss.xml">Syndicate this site</Link>
          </section>
        </aside>
        <HomeFooter className="md:hidden" />
      </div>
    </main>
  );
}
