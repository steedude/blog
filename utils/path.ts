import { i18nConfig } from "@/config/i18n";
import type { Locale } from "@/types/i18n";

export function withLocale(locale: Locale, path = "/"): string {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  const hasLocale = i18nConfig.locales.some((item) => item === segments[1]);

  if (hasLocale) segments[1] = locale;
  else segments.splice(1, 0, locale);

  return segments.join("/") || withLocale(locale);
}
