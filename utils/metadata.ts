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
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}${withLocale(locale, path)}`,
      languages: Object.fromEntries(
        i18nConfig.locales.map((item) => [
          item,
          `${siteConfig.url}${withLocale(item, path)}`,
        ]),
      ),
    },
  };
}
