import type { Metadata } from "next";
import Link from "next/link";
import { allPosts, formatDate, getPost, tagToSlug } from "@/lib/posts";
import { contentShell, pageMain } from "@/lib/styles";

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
      <main className={pageMain}>
        <h1 className="font-serif text-2xl">找不到文章</h1>
      </main>
    );
  }

  const Body = post.Body;

  return (
    <main>
      <header
        className={`${contentShell} border-y border-b border-dotted border-frame bg-white px-4 pt-6 pb-5 md:border-x md:border-t-0 md:px-8`}
      >
        <Link href={`/category/${post.categorySlug}`}>
          {post.category}
        </Link>
        <h1 className="mx-0 mt-2 mb-2 font-serif text-2xl leading-tight md:text-3xl">
          {post.title}
        </h1>
        <p className="my-2 font-serif text-base leading-relaxed text-neutral-600">{post.description}</p>
        <div className="flex flex-wrap gap-x-3 text-xs text-muted">
          <span>發布 {formatDate(post.publishedAt)}</span>
          {post.updatedAt && <span>更新 {formatDate(post.updatedAt)}</span>}
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div
        className={`${contentShell} border-y border-frame bg-white px-4 pt-6 pb-12 md:border-x md:border-t-0 md:px-8`}
      >
        <aside className="mb-4 w-auto border border-frame bg-panel p-2 text-xs text-neutral-600 md:float-right md:ml-8 md:w-40">
          <strong className="block text-neutral-800">文章標籤</strong>
          <div className="flex flex-wrap gap-x-2 md:block md:space-y-1">
            {post.tags.map((tag) => (
              <Link href={`/tag/${tagToSlug(tag)}`} key={tag}>
                #{tag}
              </Link>
            ))}
          </div>
        </aside>
        <article className="font-serif text-base leading-loose">
          <Body />
        </article>
      </div>
    </main>
  );
}
