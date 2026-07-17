import { posts } from "@/data/posts";
import type { Locale } from "@/types/i18n";
import type { ArchiveGroup, CategorySummary, Post, TagSummary } from "@/types/post";

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, "-");
}

export function getPosts(locale: Locale): Post[] {
  return posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug);
}

export function getCategories(locale: Locale): CategorySummary[] {
  const categories = new Map<string, CategorySummary>();

  for (const post of getPosts(locale)) {
    const current = categories.get(post.categorySlug);
    categories.set(post.categorySlug, {
      name: post.category,
      slug: post.categorySlug,
      count: (current?.count ?? 0) + 1,
    });
  }

  return [...categories.values()].sort((a, b) => b.count - a.count);
}

export function getTags(locale: Locale): TagSummary[] {
  const tags = new Map<string, number>();

  for (const post of getPosts(locale)) {
    for (const tag of post.tags) tags.set(tag, (tags.get(tag) ?? 0) + 1);
  }

  return [...tags.entries()]
    .map(([name, count]) => ({ name, slug: tagToSlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getArchiveGroups(locale: Locale): ArchiveGroup[] {
  const groups = new Map<string, ArchiveGroup>();

  for (const post of getPosts(locale)) {
    const date = new Date(`${post.publishedAt}T00:00:00`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    const group = groups.get(key) ?? { year, month, posts: [] };
    group.posts.push(post);
    groups.set(key, group);
  }

  return [...groups.values()].sort(
    (a, b) => b.year - a.year || b.month - a.month,
  );
}
