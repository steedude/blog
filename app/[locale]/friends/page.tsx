import { PageHeading } from "@/components/PageHeading";
import { friendsByLocale } from "@/config/friends";
import { directoryCard, directoryCardMeta, directoryCardTitle, pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(locale, dictionary.friends.title, dictionary.friends.description, "/friends");
}

export default async function FriendsPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading title={dictionary.friends.title} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {friendsByLocale[locale].map((friend) => (
          <a className={directoryCard} href={friend.url} target="_blank" rel="noreferrer" key={friend.name}>
            <h2 className={directoryCardTitle}>{friend.name}</h2>
            <p className="my-1 text-ink">{friend.description}</p>
            <span className={directoryCardMeta}>{friend.url.replace(/^https?:\/\//, "")} ↗</span>
          </a>
        ))}
      </div>
    </main>
  );
}
