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
    <article className="mb-4 border-b border-frame px-2 pt-0 pb-4">
      <p className="-mx-2 m-0 border border-frame bg-date-bar px-2 py-1 text-base font-bold text-black">
        <time dateTime={post.publishedAt}>{formatMovableTypeDate(post.publishedAt)}</time>
      </p>
      <h3 className="mx-0 mt-4 mb-3 font-heading text-xl leading-tight font-normal sm:text-2xl">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="mx-0 mt-0 mb-3 font-sans text-base leading-relaxed text-neutral-800">
        {(post.homeExcerpt ?? [post.description]).map((paragraph) => (
          <p className="mx-0 mt-0 mb-3" key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mx-0 mt-0 mb-1 text-xs text-muted">
        Posted by 前端觀察站 in {post.category}
      </p>
      <p className="m-0 space-x-3 text-sm text-neutral-800">
        <Link href={`/posts/${post.slug}`}>Comments (0)</Link>{" "}
        <Link href={`/posts/${post.slug}`}>TrackBack (0)</Link>
      </p>
    </article>
  );
}
