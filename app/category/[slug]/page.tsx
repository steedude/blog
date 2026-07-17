import { PostCard } from "@/components/PostCard";
import { allPosts, getCategories } from "@/lib/posts";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = allPosts.filter((post) => post.categorySlug === slug);
  const name = posts[0]?.category || slug;

  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">CATEGORY</p>
          <h1>{name}</h1>
        </div>
        <p>共 {posts.length} 篇文章</p>
      </header>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </main>
  );
}
