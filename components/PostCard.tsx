import Link from "next/link";
import type { Dictionary, Locale } from "@/types/i18n";
import type { Post } from "@/types/post";
import { formatLongDate } from "@/utils/date";
import { interpolate } from "@/utils/message";
import { withLocale } from "@/utils/path";

export function PostCard({
  post,
  locale,
  dictionary,
}: {
  post: Post;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const postPath = withLocale(locale, `/posts/${post.slug}`);

  return (
    <article className="mb-4 border-b border-frame px-2 pt-0 pb-4">
      <p className="-mx-2 m-0 border border-frame bg-date-bar px-2 py-1 text-base font-bold text-black">
        <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt, locale)}</time>
      </p>
      <h3 className="mx-0 mt-4 mb-3 font-heading text-xl leading-tight font-normal sm:text-2xl">
        <Link href={postPath}>{post.title}</Link>
      </h3>
      <div className="mx-0 mt-0 mb-3 font-sans text-base leading-relaxed text-neutral-800">
        {(post.homeExcerpt ?? [post.description]).map((paragraph) => (
          <p className="mx-0 mt-0 mb-3" key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mx-0 mt-0 mb-1 text-xs text-muted">
        {dictionary.common.postedBy} {interpolate(dictionary.common.inCategory, { category: post.category })}
      </p>
      <p className="m-0 space-x-3 text-sm text-neutral-800">
        <Link href={postPath}>{dictionary.common.comments}</Link>{" "}
        <Link href={postPath}>{dictionary.common.trackbacks}</Link>
      </p>
    </article>
  );
}
