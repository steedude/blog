import { PostCard } from "@/components/PostCard";
import { allPosts, getCategories } from "@/lib/posts";
import {
  pageHeading,
  pageHeadingCopy,
  pageHeadingTitle,
  pageMain,
} from "@/lib/styles";

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
    <main className={pageMain}>
      <header className={pageHeading}>
        <div>
          <p className="m-0 text-xs tracking-wider text-muted">CATEGORY</p>
          <h1 className={pageHeadingTitle}>{name}</h1>
        </div>
        <p className={pageHeadingCopy}>共 {posts.length} 篇文章</p>
      </header>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </main>
  );
}
