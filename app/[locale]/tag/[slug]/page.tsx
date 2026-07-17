import { PageHeading } from "@/components/PageHeading";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";
import { i18nConfig } from "@/config/i18n";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { formatPlural } from "@/utils/message";
import { getPosts, getTags, tagToSlug } from "@/utils/posts";

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    getTags(locale).map((tag) => ({ locale, slug: tag.slug })),
  );
}

export async function generateMetadata({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const tag = getTags(locale).find((item) => item.slug === slug);
  const name = tag?.name ?? slug;
  return createPageMetadata(
    locale,
    `#${name}`,
    formatPlural(locale, dictionary.common.relatedArticleCount, tag?.count ?? 0),
    `/tag/${slug}`,
  );
}

export default async function TagPage({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const posts = getPosts(locale).filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === slug.toLowerCase()),
  );
  if (!posts.length) notFound();
  const tagName = posts.flatMap((post) => post.tags).find((tag) => tagToSlug(tag) === slug) ?? slug;

  return (
    <main className={pageMain}>
      <PageHeading eyebrow="TAG" title={`#${tagName}`} description={formatPlural(locale, dictionary.common.relatedArticleCount, posts.length)} />
      <div>
        {posts.map((post) => (
          <PostCard post={post} locale={locale} dictionary={dictionary} key={post.slug} />
        ))}
      </div>
    </main>
  );
}
