"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "@/components/SiteNavigation";
import { siteShell } from "@/config/styles";
import type { Dictionary, Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  if (pathname === withLocale(locale)) return null;

  return (
    <footer className="pb-6 text-center text-xs text-neutral-800">
      <div className={`${siteShell} border-y border-frame bg-paper/85 p-3 md:border-x md:border-t-0`}>
        <SiteNavigation locale={locale} dictionary={dictionary} className="my-0.5" />
        <p className="my-0.5">Powered by Next.js · Content in MDX</p>
      </div>
    </footer>
  );
}
