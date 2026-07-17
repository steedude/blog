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
      <div className="post-description">
        {(post.homeExcerpt ?? [post.description]).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="post-meta">Posted by 前端觀察站 in {post.category}</p>
      <p className="post-footer">
        <Link href={`/posts/${post.slug}`}>Comments (0)</Link>{" "}
        <Link href={`/posts/${post.slug}`}>TrackBack (0)</Link>
      </p>
    </article>
  );
}
