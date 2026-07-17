"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/types/i18n";
import { replacePathLocale } from "@/utils/path";

export function useLocalePath(locale: Locale): string {
  return replacePathLocale(usePathname(), locale);
}
