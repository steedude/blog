import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { allPosts, getArchiveGroups, getCategories, getTags } from "@/lib/posts";

export default function Home() {
  const categories = getCategories();
  const tags = getTags().slice(0, 14);
  const archives = getArchiveGroups().slice(0, 10);

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
            {allPosts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
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
            <div className="mini-heading">
              <h2>文章分類</h2>
              <Link href="/categories">全部</Link>
            </div>
            <ul className="sidebar-list">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  <span> ({category.count})</span>
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
            <div className="mini-heading">
              <h2>標籤</h2>
              <Link href="/tags">全部</Link>
            </div>
            <ul className="sidebar-list">
              {tags.map((tag) => (
                <li key={tag.slug}><Link href={`/tag/${tag.slug}`}>{tag.name}</Link></li>
              ))}
            </ul>
          </section>

          <section className="sidebar-section">
            <h2>友情連結</h2>
            <ul className="sidebar-list">
              <li><Link href="/friends">友站列表</Link></li>
              <li><Link href="/archive">文章歸檔</Link></li>
              <li><Link href="/search">進階搜尋</Link></li>
            </ul>
          </section>

          <section className="sidebar-section syndicate">
            <strong>XML</strong>
            <span>Syndicate this site</span>
          </section>
        </aside>
      </div>
    </main>
  );
}
