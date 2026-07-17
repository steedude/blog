import type { Locale, PluralMessage } from "@/types/i18n";

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

export function formatPlural(
  locale: Locale,
  messages: PluralMessage,
  count: number,
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  return interpolate(rule === "one" ? messages.one : messages.other, { count });
}
