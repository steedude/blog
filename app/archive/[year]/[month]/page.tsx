import { PostCard } from "@/components/PostCard";
import { getArchiveGroups } from "@/lib/posts";
import {
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

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
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">MONTHLY ARCHIVE</p>
          <h1 className={pageHeadingTitle}>
            {year}.{month.padStart(2, "0")}
          </h1>
        </div>
        <p className={pageHeadingCopy}>共 {posts.length} 篇文章</p>
      </header>
      {posts.length ? (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      ) : (
        <p className="px-0 py-9 text-muted">這個月份目前沒有文章。</p>
      )}
    </main>
  );
}
