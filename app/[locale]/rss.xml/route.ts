import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { withLocale } from "@/utils/path";
import { getPosts } from "@/utils/posts";
import { escapeXml } from "@/utils/xml";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [];
}

export async function GET(_: Request, { params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const channelUrl = `${siteConfig.url}${withLocale(locale)}`;
  const items = getPosts(locale).map((post) => {
    const url = `${siteConfig.url}${withLocale(locale, `/posts/${post.slug}`)}`;
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(dictionary.site.name)}</title>
    <link>${channelUrl}</link>
    <description>${escapeXml(dictionary.site.description)}</description>
    <language>${locale}</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
