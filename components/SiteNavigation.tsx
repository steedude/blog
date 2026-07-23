import Link from "next/link";
import { navigationItems } from "@/config/navigation";
import type { Dictionary, Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";

type SiteNavigationProps = {
  locale: Locale;
  dictionary: Dictionary;
  className?: string;
  ariaLabel?: string;
};

export function SiteNavigation({
  locale,
  dictionary,
  className = "",
  ariaLabel,
}: SiteNavigationProps) {
  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}
      aria-label={ariaLabel}
    >
      <span className="hidden sm:inline">«</span>
      {navigationItems.map((item, index) => (
        <span className="inline-flex items-center gap-x-2" key={item.key}>
          <Link
            className="inline-flex min-h-8 items-center py-1 sm:min-h-0 sm:py-0"
            href={withLocale(locale, item.path)}
          >
            {dictionary.navigation[item.key]}
          </Link>
          {index < navigationItems.length - 1 && (
            <span className="hidden sm:inline" aria-hidden="true">|</span>
          )}
        </span>
      ))}
      <span className="hidden sm:inline">»</span>
    </nav>
  );
}
