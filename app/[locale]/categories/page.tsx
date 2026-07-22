import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { directoryCard, directoryCardMeta, directoryCardTitle, pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { formatPlural } from "@/utils/message";
import { withLocale } from "@/utils/path";
import { getCategories } from "@/utils/posts";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.categories.title, dictionary.categories.description, "/categories");
}

export default async function CategoriesPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading title={dictionary.categories.title} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {getCategories(locale).map((category) => (
          <Link className={directoryCard} href={withLocale(locale, `/category/${category.slug}`)} key={category.slug}>
            <h2 className={directoryCardTitle}>{category.name}</h2>
            <span className={directoryCardMeta}>
              {formatPlural(locale, dictionary.common.articleCount, category.count)} →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
