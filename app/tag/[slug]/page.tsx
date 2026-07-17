import { PostCard } from "@/components/PostCard";
import { allPosts, getTags, tagToSlug } from "@/lib/posts";

export function generateStaticParams() {
  return getTags().map((tag) => ({ slug: tag.slug }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = allPosts.filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === slug.toLowerCase()),
  );
  const tagName =
    posts.flatMap((post) => post.tags).find((tag) => tagToSlug(tag) === slug) ||
    slug;

  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">TAG</p>
          <h1>#{tagName}</h1>
        </div>
        <p>共 {posts.length} 篇相關文章</p>
      </header>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </main>
  );
}
