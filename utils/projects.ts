import { projects } from "@/data/projects";
import type { Locale } from "@/types/i18n";
import type { Project } from "@/types/project";

export function getProjects(locale: Locale): Project[] {
  return projects.filter((project) => project.locale === locale);
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}
