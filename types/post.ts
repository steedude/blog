import type { ComponentType } from "react";
import type { Locale } from "@/types/i18n";

export type Post = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  homeExcerpt?: string[];
  Body: ComponentType;
};

export type CategorySummary = {
  name: string;
  slug: string;
  count: number;
};

export type TagSummary = {
  name: string;
  slug: string;
  count: number;
};

export type ArchiveGroup = {
  year: number;
  month: number;
  posts: Post[];
};
