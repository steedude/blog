import type { Dictionary } from "@/types/i18n";

export type NavigationKey = keyof Dictionary["navigation"];

export const navigationItems: ReadonlyArray<{
  key: NavigationKey;
  path: string;
}> = [
  { key: "main", path: "/" },
  { key: "archives", path: "/archive" },
  { key: "categories", path: "/categories" },
  { key: "projects", path: "/projects" },
  { key: "tags", path: "/tags" },
  { key: "about", path: "/about" },
  { key: "links", path: "/friends" },
];
