import type { MetadataRoute } from "next";
import {
  allPosts,
  getArchiveGroups,
  getCategories,
  getTags,
} from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/archive", "/categories", "/friends", "/search", "/tags"];
  const latestUpdate = allPosts.reduce(
    (latest, post) =>
      new Date(post.updatedAt ?? post.publishedAt) > latest
        ? new Date(post.updatedAt ?? post.publishedAt)
        : latest,
    new Date(0),
  );

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: latestUpdate,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.6,
    })),
    ...allPosts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getCategories().map((category) => ({
      url: `${siteUrl}/category/${category.slug}`,
      lastModified: latestUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getTags().map((tag) => ({
      url: `${siteUrl}/tag/${tag.slug}`,
      lastModified: latestUpdate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getArchiveGroups().map((archive) => ({
      url: `${siteUrl}/archive/${archive.year}/${archive.month}`,
      lastModified: new Date(
        archive.posts[0].updatedAt ?? archive.posts[0].publishedAt,
      ),
      changeFrequency: "never" as const,
      priority: 0.4,
    })),
  ];
}
