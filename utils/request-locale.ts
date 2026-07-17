import { i18nConfig } from "@/config/i18n";
import { Locale } from "@/types/i18n";

export function detectRequestLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return i18nConfig.defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((entry) => {
      const [language, quality = "q=1"] = entry.trim().toLowerCase().split(";");
      return { language, quality: Number(quality.replace("q=", "")) || 0 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferences) {
    if (preference.language.startsWith("zh")) return Locale.ZH_TW;
    if (preference.language.startsWith("en")) return Locale.EN;
  }

  return i18nConfig.defaultLocale;
}
