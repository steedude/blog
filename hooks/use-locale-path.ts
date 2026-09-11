"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/types/i18n";
import { replacePathLocale } from "@/utils/path";

export function useLocalePath(locale: Locale): string {
  const path = replacePathLocale(usePathname(), locale);
  const query = useSearchParams().toString();
  return query ? `${path}?${query}` : path;
}
