import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { withLocale } from "@/utils/path";
import { getTags } from "@/utils/posts";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.tags.title, dictionary.tags.description, "/tags");
}

export default async function TagsPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading eyebrow="TAGS" title={dictionary.tags.title} description={dictionary.tags.description} />
      <div className="flex flex-wrap gap-x-4 gap-y-2 leading-loose">
        {getTags(locale).map((tag) => (
          <Link href={withLocale(locale, `/tag/${tag.slug}`)} key={tag.slug}>
            #{tag.name} · {tag.count}
          </Link>
        ))}
      </div>
    </main>
  );
}
