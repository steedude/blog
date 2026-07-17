import { Locale } from "@/types/i18n";

export const i18nConfig = {
  defaultLocale: Locale.ZH_TW,
  locales: [Locale.ZH_TW, Locale.EN],
  labels: {
    [Locale.ZH_TW]: "繁體中文",
    [Locale.EN]: "English",
  },
  htmlLang: {
    [Locale.ZH_TW]: "zh-Hant",
    [Locale.EN]: "en",
  },
  openGraphLocale: {
    [Locale.ZH_TW]: "zh_TW",
    [Locale.EN]: "en_US",
  },
} as const;
