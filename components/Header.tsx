import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { siteShell } from "@/config/styles";
import type { Dictionary, Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";

export function Header({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <header className="mt-0 text-ink md:mt-6 lg:mt-10">
      <div className={`${siteShell} border-y border-frame bg-header-fade md:border`}>
        <div className="flex justify-end px-4 pt-3">
          <LocaleSwitcher locale={locale} />
        </div>
        <Link
          href={withLocale(locale)}
          className="block px-4 pt-2 pb-5 !text-black !no-underline"
          aria-label={dictionary.site.homeLabel}
        >
          <span className="block font-serif text-2xl leading-none font-normal tracking-normal md:text-3xl">
            {dictionary.site.name}
          </span>
          <span className="mt-1 block text-xs font-normal tracking-normal text-neutral-800 md:text-sm">
            {dictionary.site.tagline}
          </span>
        </Link>
      </div>
    </header>
  );
}
