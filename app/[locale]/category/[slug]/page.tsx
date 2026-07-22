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
import { getCategories, getPosts } from "@/utils/posts";

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    getCategories(locale).map((category) => ({ locale, slug: category.slug })),
  );
}

export async function generateMetadata({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const category = getCategories(locale).find((item) => item.slug === slug);
  const title = category?.name ?? slug;
  return createPageMetadata(
    locale,
    title,
    formatPlural(locale, dictionary.common.articleCount, category?.count ?? 0),
    `/category/${slug}`,
  );
}

export default async function CategoryPage({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const posts = getPosts(locale).filter((post) => post.categorySlug === slug);
  if (!posts.length) notFound();
  const name = posts[0]?.category ?? slug;

  return (
    <main className={pageMain}>
      <PageHeading title={name} />
      <div>
        {posts.map((post) => (
          <PostCard post={post} locale={locale} dictionary={dictionary} key={post.slug} />
        ))}
      </div>
    </main>
  );
}
