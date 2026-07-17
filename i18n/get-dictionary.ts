import { enDictionary } from "@/i18n/dictionaries/en";
import { zhTWDictionary } from "@/i18n/dictionaries/zh-TW";
import { Locale, type Dictionary } from "@/types/i18n";

const dictionaries: Record<Locale, Dictionary> = {
  [Locale.ZH_TW]: zhTWDictionary,
  [Locale.EN]: enDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
