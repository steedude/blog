import Link from "next/link";
import type { Post } from "@/lib/posts";

function formatMovableTypeDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <p className="post-date">
        <time dateTime={post.publishedAt}>{formatMovableTypeDate(post.publishedAt)}</time>
      </p>
      <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
      <p className="post-description">{post.description}</p>
      <p className="post-meta">Posted in {post.category} · {post.readingTime}</p>
      <p className="post-footer">
        <Link href={`/category/${post.categorySlug}`}>Category</Link>{" "}
        <Link href={`/posts/${post.slug}`}>Read Entry</Link>
      </p>
    </article>
  );
}
