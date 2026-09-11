import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import articleSources from "@/data/article-sources.json";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { siteShell } from "@/config/styles";
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
  const availableLocales = i18nConfig.locales.filter((item) => getPost(item, slug));
  return createPageMetadata(
    locale,
    post?.title ?? dictionary.post.notFound,
    post?.description ?? dictionary.site.description,
    `/posts/${slug}`,
    availableLocales,
    {
      image: withLocale(locale, `/posts/${slug}/opengraph-image`),
      publishedAt: post?.publishedAt,
      updatedAt: post?.updatedAt,
    },
  );
}

export default async function PostPage({ params }: { params: LocaleRouteParams<{ slug: string }> }) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const post = getPost(locale, slug);

  if (!post) {
    const existsInAnotherLocale = i18nConfig.locales.some((item) => getPost(item, slug));
    if (existsInAnotherLocale) redirect(withLocale(locale));
    notFound();
  }

  const Body = post.Body;
  const sources = (articleSources as Record<string, { title: string; url: string }[]>)[post.slug] ?? [];
  const postUrl = `${siteConfig.url}${withLocale(locale, `/posts/${post.slug}`)}`;

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            inLanguage: locale,
            keywords: post.tags,
            mainEntityOfPage: postUrl,
            url: postUrl,
            image: `${postUrl}/opengraph-image`,
            author: { "@type": "Person", name: siteConfig.author, url: `${siteConfig.url}${withLocale(locale, "/about")}` },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: dictionary.navigation.main,
                item: `${siteConfig.url}${withLocale(locale)}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: post.category,
                item: `${siteConfig.url}${withLocale(locale, `/category/${post.categorySlug}`)}`,
              },
              { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
            ],
          },
        ]}
      />
      <header className={`${siteShell} border-y border-b border-dotted border-frame bg-white px-4 pt-6 pb-5 md:border-x md:border-t-0 md:px-8`}>
        <p className="m-0 text-xs text-muted">
          <span>{dictionary.post.category}</span>{" "}
          <Link href={withLocale(locale, `/category/${post.categorySlug}`)}>{post.category}</Link>
        </p>
        <h1 className="mx-0 mt-2 mb-2 font-serif text-2xl leading-tight md:text-3xl">{post.title}</h1>
        <p className="my-2 font-serif text-base leading-relaxed text-neutral-600">{post.description}</p>
        <div className="flex flex-wrap gap-x-3 text-xs text-muted">
          <span>{dictionary.common.published} {formatDate(post.publishedAt, locale)}</span>
          {post.updatedAt && <span>{dictionary.common.updated} {formatDate(post.updatedAt, locale)}</span>}
        </div>
      </header>

      <div className={`${siteShell} min-w-0 border-y border-frame bg-white px-4 pt-6 pb-12 md:border-x md:border-t-0 md:px-8`}>
        <article className="mx-auto min-w-0 max-w-3xl break-words font-serif text-base leading-loose"><Body /></article>
        {sources.length > 0 && (
          <section className="mx-auto mt-8 max-w-3xl border-t border-frame pt-4" aria-labelledby="article-sources">
            <h2 id="article-sources" className="font-serif text-lg">{dictionary.post.sources}</h2>
            <ul className="list-disc space-y-2 pl-5 break-words">
              {sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}
            </ul>
          </section>
        )}
        <aside className="mx-auto mt-8 flex max-w-3xl flex-wrap items-baseline gap-x-2 border border-frame bg-panel p-2 text-xs text-neutral-600">
          <strong className="text-neutral-800">{dictionary.post.tags}</strong>
          <div className="flex min-w-0 flex-wrap gap-x-2">
            {post.tags.map((tag) => (
              <Link href={withLocale(locale, `/tag/${tagToSlug(tag)}`)} key={tag}>#{tag}</Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
