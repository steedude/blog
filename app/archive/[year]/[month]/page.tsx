import { PostCard } from "@/components/PostCard";
import { getArchiveGroups } from "@/lib/posts";

export function generateStaticParams() {
  return getArchiveGroups().map((group) => ({
    year: String(group.year),
    month: String(group.month),
  }));
}

export default async function ArchiveMonthPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const group = getArchiveGroups().find(
    (item) => item.year === Number(year) && item.month === Number(month),
  );
  const posts = group?.posts || [];

  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">MONTHLY ARCHIVE</p>
          <h1>
            {year}.{month.padStart(2, "0")}
          </h1>
        </div>
        <p>共 {posts.length} 篇文章</p>
      </header>
      {posts.length ? (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      ) : (
        <p className="empty-state">這個月份目前沒有文章。</p>
      )}
    </main>
  );
}
