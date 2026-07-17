import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate, tagToSlug } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
      <p className="post-meta">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {" | "}
        <Link href={`/category/${post.categorySlug}`}>{post.category}</Link>
      </p>
      <p className="post-description">{post.description}</p>
      <p className="post-footer">
        <Link href={`/posts/${post.slug}`}>繼續閱讀 »</Link>
        <span className="tag-row">
          標籤：{" "}
          {post.tags.map((tag, index) => (
            <span key={tag}>
              {index > 0 ? ", " : ""}
              <Link href={`/tag/${tagToSlug(tag)}`}>{tag}</Link>
            </span>
          ))}
        </span>
      </p>
    </article>
  );
}
