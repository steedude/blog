import { PageHeading } from "@/components/PageHeading";
import { PostCard } from "@/components/PostCard";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { getPosts } from "@/utils/posts";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return createPageMetadata(
    locale,
    dictionary.recent.title,
    dictionary.recent.description,
    "/recent",
  );
}

export default async function RecentPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading
        eyebrow="RECENT ENTRIES"
        title={dictionary.recent.title}
        description={dictionary.recent.description}
      />
      <div>
        {getPosts(locale).map((post) => (
          <PostCard
            post={post}
            locale={locale}
            dictionary={dictionary}
            key={post.slug}
          />
        ))}
      </div>
    </main>
  );
}
