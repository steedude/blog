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
  return createPageMetadata(
    locale,
    dictionary.home.aboutTitle,
    dictionary.home.aboutText,
    "/about",
  );
}

export default async function AboutPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading title={dictionary.home.aboutTitle} />
      <p className="max-w-2xl font-serif text-base leading-loose">
        {dictionary.home.aboutText}
      </p>
    </main>
  );
}
