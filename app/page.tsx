import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { allPosts, getArchiveGroups } from "@/lib/posts";

const recentPostLabels: Record<string, string> = {
  "react-compiler": "React Compiler 導入筆記",
  "view-transitions": "View Transitions API",
  "modern-css": "新一代 CSS 原生能力",
  "server-components-retrospective": "Server Components 回顧",
  "web-vitals": "Core Web Vitals 觀察",
};

export default function Home() {
  const archives = getArchiveGroups().slice(0, 2);
  const homePosts = allPosts.slice(0, 2);
  const recentPosts = allPosts.slice(0, 5);

  return (
    <main className="shell page-frame">
      <div className="content-grid">
        <section className="main-column" aria-labelledby="latest-posts">
          <nav className="home-nav" aria-label="首頁導覽">
            « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
            <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
            <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
          </nav>
          <h1 id="latest-posts" className="sr-only">最新文章</h1>
          <div className="post-list">
            {homePosts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
          <footer className="home-inline-footer">
            <p>
              « <Link href="/">Recent Entries</Link> | <Link href="/">Main</Link> |{" "}
              <Link href="/archive">Archives</Link> | <Link href="/categories">Categories</Link> |{" "}
              <Link href="/tags">Tags</Link> | <Link href="/friends">Links</Link> »
            </p>
            <p>Powered by <Link href="https://www.movabletype.org/">Movable Type 2.2</Link></p>
          </footer>
        </section>

        <aside className="sidebar" aria-label="網站資訊與文章導覽">
          <section className="sidebar-section colophon">
            <h2>關於本站</h2>
            <p>記錄一些關於網頁標準、瀏覽器、CSS 與程式開發的觀察筆記。</p>
            <p><Link href="/friends">關於本站</Link></p>
          </section>

          <section className="sidebar-section search-sidebar">
            <h2>搜尋本站</h2>
            <form action="/search" className="quick-search">
              <label className="sr-only" htmlFor="home-search">搜尋文章</label>
              <input id="home-search" name="q" size={16} />
              <button type="submit">搜尋</button>
            </form>
          </section>

          <section className="sidebar-section">
            <h2>最近文章</h2>
            <ul className="sidebar-list">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`} aria-label={post.title}>
                    {recentPostLabels[post.slug] ?? post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="sidebar-section">
            <div className="mini-heading">
              <h2>每月彙整</h2>
              <Link href="/archive">全部</Link>
            </div>
            <ul className="sidebar-list">
              {archives.map((archive) => (
                <li key={`${archive.year}-${archive.month}`}>
                  <Link href={`/archive/${archive.year}/${archive.month}`}>
                    {archive.year} 年 {archive.month} 月
                  </Link>
                  <span> ({archive.posts.length})</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="sidebar-section">
            <h2>友情連結</h2>
            <ul className="sidebar-list">
              <li><Link href="/friends">友站列表</Link></li>
              <li><Link href="/categories">文章分類</Link></li>
              <li><Link href="/tags">所有標籤</Link></li>
              <li><Link href="/friends">CSS Zen Garden</Link></li>
            </ul>
          </section>

          <section className="sidebar-section syndicate">
            <strong>XML</strong>
            <Link href="/rss.xml">Syndicate this site</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
