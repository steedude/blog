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
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}${withLocale(locale, path)}`,
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
