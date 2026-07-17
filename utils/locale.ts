import { i18nConfig } from "@/config/i18n";
import { Locale } from "@/types/i18n";

export function isLocale(value: string): value is Locale {
  return i18nConfig.locales.some((locale) => locale === value);
}

export function getLocaleOrDefault(value?: string): Locale {
  return value && isLocale(value) ? value : i18nConfig.defaultLocale;
}
