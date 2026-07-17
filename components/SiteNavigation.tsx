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
    <nav className={className} aria-label={ariaLabel}>
      «{" "}
      {navigationItems.map((item, index) => (
        <span key={`${item.key}-${index}`}>
          {index > 0 && " | "}
          <Link href={withLocale(locale, item.path)}>
            {dictionary.navigation[item.key]}
          </Link>
        </span>
      ))}{" "}»
    </nav>
  );
}
