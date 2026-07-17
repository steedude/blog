import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { directoryCard, directoryCardMeta, pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { interpolate } from "@/utils/message";
import { withLocale } from "@/utils/path";
import { getArchiveGroups } from "@/utils/posts";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.archive.title, dictionary.archive.description, "/archive");
}

export default async function ArchivePage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const groups = getArchiveGroups(locale);
  const years = [...new Set(groups.map((group) => group.year))];

  return (
    <main className={pageMain}>
      <PageHeading eyebrow="ARCHIVE" title={dictionary.archive.title} description={dictionary.archive.description} />
      {years.map((year) => (
        <section className="mb-7" key={year}>
          <h2 className="mt-0 mb-2 border-b border-neutral-500 pb-1 font-serif text-2xl">{year}</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {groups.filter((group) => group.year === year).map((group) => (
              <Link className={directoryCard} href={withLocale(locale, `/archive/${group.year}/${group.month}`)} key={`${group.year}-${group.month}`}>
                <strong className="block font-serif text-lg text-link underline">
                  {String(group.month).padStart(2, "0")} {dictionary.archive.monthSuffix}
                </strong>
                <span className={directoryCardMeta}>
                  {interpolate(dictionary.common.articleCount, { count: group.posts.length })} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
