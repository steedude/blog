"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocaleOrDefault } from "@/utils/locale";
import { withLocale } from "@/utils/path";

export default function NotFoundPage() {
  const locale = getLocaleOrDefault(usePathname().split("/")[1]);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <p className="m-0 text-xs text-muted">404</p>
      <h1 className="font-serif text-3xl">{dictionary.notFound.title}</h1>
      <p>{dictionary.notFound.description}</p>
      <Link href={withLocale(locale)}>{dictionary.notFound.backHome}</Link>
    </main>
  );
}
