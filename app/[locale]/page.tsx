import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { SiteNavigation } from "@/components/SiteNavigation";
import { siteShell, retroButton } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { interpolate } from "@/utils/message";
import { withLocale } from "@/utils/path";
import { getArchiveGroups, getPosts } from "@/utils/posts";

const sidebarSection = "mb-3 border border-frame bg-white/35 px-2 pt-0 pb-2 text-sm";
const sidebarHeading = "-mx-2 mt-0 mb-2 border-b border-frame bg-sidebar-bar px-2 py-1 text-base font-bold tracking-normal text-black";
const sidebarList = "m-0 list-disc py-0 pr-0 pl-5 text-sm";

export default async function Home({ params }: { params: LocaleRouteParams }) {
  const { locale: localeParam } = await params;
  const locale = getLocaleOrDefault(localeParam);
  const dictionary = getDictionary(locale);
  const posts = getPosts(locale);
  const archives = getArchiveGroups(locale).slice(0, 2);
  const homePosts = posts.slice(0, 2);
  const recentPosts = posts.slice(0, 5);

  const homeFooter = (
    <footer className="px-2 pt-px pb-3 text-center text-sm">
      <SiteNavigation locale={locale} dictionary={dictionary} className="mx-0 mt-2 mb-0" />
      <p className="mx-0 mt-2 mb-0 text-xs">
        {dictionary.common.poweredBy}{" "}
        <Link href="https://www.movabletype.org/">Movable Type 2.2</Link>
      </p>
    </footer>
  );

  return (
    <main className={`${siteShell} border-y border-frame bg-paper/92 md:border-x md:border-t-0`}>
      <div className="grid grid-cols-1 items-start md:grid-cols-3">
        <section className="min-w-0 p-4 md:col-span-2 md:px-3 md:pt-3 md:pb-0" aria-labelledby="latest-posts">
          <SiteNavigation
            locale={locale}
            dictionary={dictionary}
            className="mx-0 mt-0 mb-3 px-0.5 pt-0 pb-2 text-sm sm:text-base"
            ariaLabel={dictionary.home.navigationLabel}
          />
          <h1 id="latest-posts" className="sr-only">{dictionary.home.latestPosts}</h1>
          <div>
            {homePosts.map((post) => (
              <PostCard post={post} locale={locale} dictionary={dictionary} key={post.slug} />
            ))}
          </div>
          <div className="hidden md:block">{homeFooter}</div>
        </section>

        <aside
          className="min-h-0 border-t border-frame bg-paper/45 p-4 md:min-h-screen md:border-t-0 md:border-l md:p-3"
          aria-label={dictionary.home.sidebarLabel}
        >
          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>{dictionary.home.aboutTitle}</h2>
            <p className="m-0">{dictionary.home.aboutText}</p>
            <p className="mx-0 mt-2 mb-0">
              <Link href={withLocale(locale, "/friends")}>{dictionary.home.aboutTitle}</Link>
            </p>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>{dictionary.home.searchTitle}</h2>
            <form action={withLocale(locale, "/search")} className="flex gap-1 px-0 py-0.5">
              <label className="sr-only" htmlFor="home-search">{dictionary.home.searchLabel}</label>
              <input className="h-7 min-w-0 w-full border border-neutral-400 bg-white" id="home-search" name="q" size={16} />
              <button className={retroButton} type="submit">{dictionary.home.searchButton}</button>
            </form>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>{dictionary.home.recentTitle}</h2>
            <ul className={sidebarList}>
              {recentPosts.map((post) => (
                <li className="my-1 leading-snug" key={post.slug}>
                  <Link href={withLocale(locale, `/posts/${post.slug}`)}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={sidebarSection}>
            <div className="relative">
              <h2 className={sidebarHeading}>{dictionary.home.monthlyTitle}</h2>
              <Link className="absolute top-1 right-0 text-xs" href={withLocale(locale, "/archive")}>
                {dictionary.common.all}
              </Link>
            </div>
            <ul className={sidebarList}>
              {archives.map((archive) => (
                <li className="my-1 leading-snug" key={`${archive.year}-${archive.month}`}>
                  <Link href={withLocale(locale, `/archive/${archive.year}/${archive.month}`)}>
                    {archive.year}.{String(archive.month).padStart(2, "0")}
                  </Link>
                  <span className="text-xs text-muted">
                    {" "}({interpolate(dictionary.common.articleCount, { count: archive.posts.length })})
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={sidebarSection}>
            <h2 className={sidebarHeading}>{dictionary.home.friendsTitle}</h2>
            <ul className={sidebarList}>
              <li className="my-1"><Link href={withLocale(locale, "/friends")}>{dictionary.home.friendList}</Link></li>
              <li className="my-1"><Link href={withLocale(locale, "/categories")}>{dictionary.home.categoryList}</Link></li>
              <li className="my-1"><Link href={withLocale(locale, "/tags")}>{dictionary.home.tagList}</Link></li>
            </ul>
          </section>

          <section className={`${sidebarSection} flex items-center gap-2 pt-2`}>
            <strong className="bg-xml px-1 py-px text-xs text-white">XML</strong>
            <Link href={withLocale(locale, "/rss.xml")}>{dictionary.home.syndicate}</Link>
          </section>
        </aside>
        <div className="md:hidden">{homeFooter}</div>
      </div>
    </main>
  );
}
