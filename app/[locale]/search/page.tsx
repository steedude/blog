import { ExternalSearch } from "@/components/ExternalSearch";
import { PageHeading } from "@/components/PageHeading";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.search.title, dictionary.search.description, "/search");
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: LocaleRouteParams;
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ locale: value }, { q = "" }] = await Promise.all([params, searchParams]);
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading eyebrow="SEARCH" title={dictionary.search.title} description={dictionary.search.description} />
      <ExternalSearch initialQuery={q} dictionary={dictionary} />
    </main>
  );
}
