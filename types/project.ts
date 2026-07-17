import type { Locale } from "@/types/i18n";

export type Project = {
  locale: Locale;
  slug: string;
  name: string;
  summary: string;
  url: string;
  features: string[];
  technologies: string[];
};
