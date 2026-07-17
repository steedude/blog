import Link from "next/link";
import type { Metadata } from "next";
import { i18nConfig } from "@/config/i18n";
import { contentShell, pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { formatDate } from "@/utils/date";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { withLocale } from "@/utils/path";
import { getPost, getPosts, tagToSlug } from "@/utils/posts";

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: LocaleRouteParams<{ slug: string }>;
}): Promise<Metadata> {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const post = getPost(locale, slug);
  return createPageMetadata(
    locale,
    post?.title ?? dictionary.post.notFound,
    post?.description ?? dictionary.site.description,
    `/posts/${slug}`,
  );
}

export default async function PostPage({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const post = getPost(locale, slug);

  if (!post) {
    return <main className={pageMain}><h1 className="font-serif text-2xl">{dictionary.post.notFound}</h1></main>;
  }

  const Body = post.Body;

  return (
    <main>
      <header className={`${contentShell} border-y border-b border-dotted border-frame bg-white px-4 pt-6 pb-5 md:border-x md:border-t-0 md:px-8`}>
        <Link href={withLocale(locale, `/category/${post.categorySlug}`)}>{post.category}</Link>
        <h1 className="mx-0 mt-2 mb-2 font-serif text-2xl leading-tight md:text-3xl">{post.title}</h1>
        <p className="my-2 font-serif text-base leading-relaxed text-neutral-600">{post.description}</p>
        <div className="flex flex-wrap gap-x-3 text-xs text-muted">
          <span>{dictionary.common.published} {formatDate(post.publishedAt, locale)}</span>
          {post.updatedAt && <span>{dictionary.common.updated} {formatDate(post.updatedAt, locale)}</span>}
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className={`${contentShell} border-y border-frame bg-white px-4 pt-6 pb-12 md:border-x md:border-t-0 md:px-8`}>
        <aside className="mb-4 w-auto border border-frame bg-panel p-2 text-xs text-neutral-600 md:float-right md:ml-8 md:w-40">
          <strong className="block text-neutral-800">{dictionary.post.tags}</strong>
          <div className="flex flex-wrap gap-x-2 md:block md:space-y-1">
            {post.tags.map((tag) => (
              <Link href={withLocale(locale, `/tag/${tagToSlug(tag)}`)} key={tag}>#{tag}</Link>
            ))}
          </div>
        </aside>
        <article className="font-serif text-base leading-loose"><Body /></article>
      </div>
    </main>
  );
}
