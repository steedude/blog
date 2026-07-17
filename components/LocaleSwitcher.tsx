"use client";

import Link from "next/link";
import { i18nConfig } from "@/config/i18n";
import { useLocalePath } from "@/hooks/use-locale-path";
import type { Locale } from "@/types/i18n";

function LocaleOption({ locale, currentLocale }: { locale: Locale; currentLocale: Locale }) {
  const href = useLocalePath(locale);
  const isCurrent = locale === currentLocale;

  return isCurrent ? (
    <strong aria-current="page">{i18nConfig.labels[locale]}</strong>
  ) : (
    <Link href={href}>{i18nConfig.labels[locale]}</Link>
  );
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="flex gap-2 text-xs" aria-label="Language">
      {i18nConfig.locales.map((item) => (
        <LocaleOption currentLocale={locale} locale={item} key={item} />
      ))}
    </div>
  );
}
