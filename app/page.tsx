import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import {
  allPosts,
  getArchiveGroups,
  getCategories,
  getTags,
} from "@/lib/posts";

export default function Home() {
  const categories = getCategories();
  const tags = getTags().slice(0, 18);
  const archives = getArchiveGroups().slice(0, 8);

  return (
    <main className="shell page-frame">
      <div className="weblog-intro">
        <h1>前端觀察站</h1>
        <p>
          把前端變化整理成可以帶走的觀察和實作筆記。
        </p>
      </div>

      <div className="content-grid">
        <section className="main-column" aria-labelledby="latest-posts">
          <div className="section-heading">
            <h2 id="latest-posts">最新文章</h2>
            <Link href="/archive">查看完整文章索引</Link>
          </div>

          <div className="post-list">
            {allPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <aside className="sidebar" aria-label="網站資訊與文章導覽">
          <section className="sidebar-section">
            <h2>搜尋本站</h2>
            <form action="/search" className="quick-search">
              <label className="sr-only" htmlFor="home-search">
                搜尋文章
              </label>
              <input id="home-search" name="q" size={18} />
              <button type="submit">搜尋</button>
            </form>
            <p className="sidebar-note">可使用 Google 或 DuckDuckGo 搜尋本站。</p>
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
              <h2>月份歸檔</h2>
              <Link href="/archive">全部</Link>
            </div>
            <ul className="sidebar-list archive-mini-list">
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
            <div className="tag-cloud">
              {tags.map((tag) => (
                <Link href={`/tag/${tag.slug}`} key={tag.slug}>
                  {tag.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="sidebar-section colophon">
            <h2>About this site</h2>
            <p>手工製作的前端技術部落格。文章以 MDX 保存。</p>
            <p><Link href="/friends">友站連結 »</Link></p>
          </section>
        </aside>
      </div>
    </main>
  );
}
