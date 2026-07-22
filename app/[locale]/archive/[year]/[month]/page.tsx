import { PageHeading } from "@/components/PageHeading";
import { PostCard } from "@/components/PostCard";
import { notFound } from "next/navigation";
import { i18nConfig } from "@/config/i18n";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { getArchiveGroups } from "@/utils/posts";

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    getArchiveGroups(locale).map((group) => ({
      locale,
      year: String(group.year),
      month: String(group.month),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: LocaleRouteParams<{ year: string; month: string }>;
}) {
  const { locale: value, year, month } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const title = `${year}.${month.padStart(2, "0")}`;
  return createPageMetadata(locale, title, dictionary.archive.title, `/archive/${year}/${month}`);
}

export default async function ArchiveMonthPage({
  params,
}: {
  params: LocaleRouteParams<{ year: string; month: string }>;
}) {
  const { locale: value, year, month } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const group = getArchiveGroups(locale).find(
    (item) => item.year === Number(year) && item.month === Number(month),
  );
  if (!group) notFound();
  const posts = group?.posts ?? [];

  return (
    <main className={pageMain}>
      <PageHeading title={`${year}.${month.padStart(2, "0")}`} />
      {posts.length ? (
        <div>
          {posts.map((post) => (
            <PostCard post={post} locale={locale} dictionary={dictionary} key={post.slug} />
          ))}
        </div>
      ) : (
        <p className="px-0 py-9 text-muted">{dictionary.archive.empty}</p>
      )}
    </main>
  );
}
