import type { Dictionary } from "@/types/i18n";

export type NavigationKey = keyof Dictionary["navigation"];

export const navigationItems: ReadonlyArray<{
  key: NavigationKey;
  path: string;
}> = [
  { key: "recentEntries", path: "/recent" },
  { key: "main", path: "/" },
  { key: "archives", path: "/archive" },
  { key: "categories", path: "/categories" },
  { key: "tags", path: "/tags" },
  { key: "links", path: "/friends" },
];
