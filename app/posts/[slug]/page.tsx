import type { Metadata } from "next";
import Link from "next/link";
import { allPosts, formatDate, getPost, tagToSlug } from "@/lib/posts";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post?.title || "找不到文章",
    description: post?.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <main className="page-main shell">
        <h1>找不到文章</h1>
      </main>
    );
  }

  const Body = post.Body;

  return (
    <main>
      <header className="article-header shell">
        <Link className="post-category" href={`/category/${post.categorySlug}`}>
          {post.category}
        </Link>
        <h1>{post.title}</h1>
        <p className="article-description">{post.description}</p>
        <div className="article-meta">
          <span>發布 {formatDate(post.publishedAt)}</span>
          {post.updatedAt && <span>更新 {formatDate(post.updatedAt)}</span>}
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="article-layout shell">
        <aside className="article-aside">
          <strong>文章標籤</strong>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <Link href={`/tag/${tagToSlug(tag)}`} key={tag}>
                #{tag}
              </Link>
            ))}
          </div>
        </aside>
        <article className="prose">
          <Body />
        </article>
      </div>
    </main>
  );
}
