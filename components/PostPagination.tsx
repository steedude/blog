import Link from "next/link";
import type { Dictionary, Locale } from "@/types/i18n";
import { withLocale } from "@/utils/path";

function pageHref(locale: Locale, page: number): string {
  return page === 1 ? withLocale(locale) : withLocale(locale, `/page/${page}`);
}

export function PostPagination({
  locale,
  currentPage,
  totalPages,
  dictionary,
}: {
  locale: Locale;
  currentPage: number;
  totalPages: number;
  dictionary: Dictionary;
}) {
  if (totalPages <= 1) return null;

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pageCountLabel = dictionary.home.pageCount
    .replace("{current}", String(currentPage))
    .replace("{total}", String(totalPages));

  return (
    <nav className="my-5 border-t border-frame px-2 pt-4 text-sm" aria-label={pageCountLabel}>
      <div className="flex items-center justify-between gap-3 md:hidden">
        {previousPage >= 1 ? (
          <Link href={pageHref(locale, previousPage)}>« {dictionary.home.previousPage}</Link>
        ) : <span />}
        <span>{pageCountLabel}</span>
        {nextPage <= totalPages ? (
          <Link href={pageHref(locale, nextPage)}>{dictionary.home.nextPage} »</Link>
        ) : <span />}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 md:flex">
        {previousPage >= 1 && <>
          <Link href={pageHref(locale, previousPage)}>« {dictionary.home.previousPage}</Link>
          <span aria-hidden="true">|</span>
        </>}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          page === currentPage ? (
            <strong aria-current="page" key={page}>{page}</strong>
          ) : (
            <Link href={pageHref(locale, page)} key={page}>{page}</Link>
          )
        ))}
        {nextPage <= totalPages && <>
          <span aria-hidden="true">|</span>
          <Link href={pageHref(locale, nextPage)}>{dictionary.home.nextPage} »</Link>
        </>}
      </div>
    </nav>
  );
}
