import type { Locale } from "@/types/i18n";
import type { SearchDocument } from "@/types/search";
import { getPosts } from "@/utils/posts";

export function getSearchDocuments(locale: Locale): SearchDocument[] {
  return getPosts(locale).map(({ slug, title, description, category, tags }) => ({
    slug,
    title,
    description,
    category,
    tags,
  }));
}

export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").trim().toLocaleLowerCase();
}
