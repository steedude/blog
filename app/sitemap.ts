import type { MetadataRoute } from "next";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";
import { getArchiveGroups, getCategories, getPosts, getTags } from "@/utils/posts";

const staticRoutes = ["/", "/archive", "/categories", "/friends", "/search", "/tags"];

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      i18nConfig.locales.map((locale) => [
        locale,
        `${siteConfig.url}${withLocale(locale, path)}`,
      ]),
    ),
  };
}

function localizedSitemap(locale: Locale): MetadataRoute.Sitemap {
  const posts = getPosts(locale);
  const latestUpdate = posts.reduce(
    (latest, post) => {
      const date = new Date(post.updatedAt ?? post.publishedAt);
      return date > latest ? date : latest;
    },
    new Date(0),
  );

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${withLocale(locale, path)}`,
      lastModified: latestUpdate,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.6,
      alternates: alternates(path),
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}${withLocale(locale, `/posts/${post.slug}`)}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates(`/posts/${post.slug}`),
    })),
    ...getCategories(locale).map((category) => ({
      url: `${siteConfig.url}${withLocale(locale, `/category/${category.slug}`)}`,
      lastModified: latestUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: alternates(`/category/${category.slug}`),
    })),
    ...getTags(locale).map((tag) => ({
      url: `${siteConfig.url}${withLocale(locale, `/tag/${tag.slug}`)}`,
      lastModified: latestUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: alternates(`/tag/${tag.slug}`),
    })),
    ...getArchiveGroups(locale).map((archive) => ({
      url: `${siteConfig.url}${withLocale(locale, `/archive/${archive.year}/${archive.month}`)}`,
      lastModified: new Date(archive.posts[0].updatedAt ?? archive.posts[0].publishedAt),
      changeFrequency: "never" as const,
      priority: 0.4,
      alternates: alternates(`/archive/${archive.year}/${archive.month}`),
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return i18nConfig.locales.flatMap(localizedSitemap);
}
