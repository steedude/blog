import type { Locale } from "@/types/i18n";

function parseDate(date: string): Date {
  return new Date(`${date}T00:00:00`);
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parseDate(date));
}

export function formatLongDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parseDate(date));
}
