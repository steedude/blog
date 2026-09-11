import type { Metadata } from "next";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";

export function createPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  availableLocales: readonly Locale[] = i18nConfig.locales,
  options: { image?: string; publishedAt?: string; updatedAt?: string } = {},
): Metadata {
  const url = `${siteConfig.url}${withLocale(locale, path)}`;
  const image = new URL(options.image ?? siteConfig.socialImage, siteConfig.url).toString();
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      locale: i18nConfig.openGraphLocale[locale],
      images: [{ url: image }],
      ...(options.publishedAt ? {
        type: "article" as const,
        publishedTime: options.publishedAt,
        modifiedTime: options.updatedAt ?? options.publishedAt,
        authors: [siteConfig.author],
      } : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        [
          ...availableLocales.map((item) => [
            item,
            `${siteConfig.url}${withLocale(item, path)}`,
          ]),
          [
            "x-default",
            `${siteConfig.url}${withLocale(i18nConfig.defaultLocale, path)}`,
          ],
        ],
      ),
    },
  };
}
