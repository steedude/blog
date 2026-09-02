import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { HomeContent } from "@/components/HomeContent";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { withLocale } from "@/utils/path";
import { pageCount } from "@/utils/pagination";
import { getPosts } from "@/utils/posts";

type PageParams = LocaleRouteParams<{ page: string }>;

function totalPagesFor(locale: (typeof i18nConfig.locales)[number]): number {
  return pageCount(getPosts(locale).length, siteConfig.postsPerPage);
}

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    Array.from({ length: Math.max(0, totalPagesFor(locale) - 1) }, (_, index) => ({
      locale,
      page: String(index + 2),
    })),
  );
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { locale: value, page: pageValue } = await params;
  const locale = getLocaleOrDefault(value);
  const page = Number(pageValue);
  const dictionary = getDictionary(locale);
  const path = `/page/${page}`;
  const availableLocales = i18nConfig.locales.filter((item) => totalPagesFor(item) >= page);

  return createPageMetadata(
    locale,
    `${dictionary.home.latestPosts} — ${dictionary.home.pageCount.replace("{current}", String(page)).replace("{total}", String(totalPagesFor(locale)))}`,
    dictionary.site.description,
    path,
    availableLocales,
  );
}

export default async function PaginatedHome({ params }: { params: PageParams }) {
  const { locale: value, page: pageValue } = await params;
  const locale = getLocaleOrDefault(value);
  const page = Number(pageValue);
  const isValidPage = Number.isInteger(page) && page >= 2 && page <= totalPagesFor(locale);

  if (!isValidPage) {
    const existsInAnotherLocale = Number.isInteger(page) && page >= 2
      && i18nConfig.locales.some((item) => totalPagesFor(item) >= page);
    if (existsInAnotherLocale) redirect(withLocale(locale));
    notFound();
  }

  return <HomeContent locale={locale} currentPage={page} />;
}
