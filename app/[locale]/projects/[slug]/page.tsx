import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { withLocale } from "@/utils/path";
import { getProject, getProjects } from "@/utils/projects";

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: LocaleRouteParams<{ slug: string }>;
}) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const project = getProject(locale, slug);
  return createPageMetadata(
    locale,
    project?.name ?? dictionary.projects.title,
    project?.summary ?? dictionary.projects.description,
    `/projects/${slug}`,
  );
}

export default async function ProjectPage({
  params,
}: {
  params: LocaleRouteParams<{ slug: string }>;
}) {
  const { locale: value, slug } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();

  return (
    <main className={pageMain}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.summary,
          url: project.url,
          applicationCategory: "WebApplication",
          inLanguage: locale,
          mainEntityOfPage: `${siteConfig.url}${withLocale(locale, `/projects/${project.slug}`)}`,
        }}
      />
      <p className="m-0 text-xs tracking-wider text-muted">PROJECT / LIVE</p>
      <h1 className="mt-1 mb-3 font-serif text-3xl">{project.name}</h1>
      <p className="max-w-2xl text-base leading-relaxed">{project.summary}</p>

      <section className="my-6 border-y border-frame py-4">
        <h2 className="font-serif text-xl">{dictionary.projects.features}</h2>
        <ul className="list-disc space-y-2 pl-5">
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </section>

      <section className="my-6">
        <h2 className="font-serif text-xl">{dictionary.projects.technologies}</h2>
        <p>{project.technologies.join(" · ")}</p>
      </section>

      <Link
        className="inline-block border border-frame bg-neutral-200 px-3 py-2 font-bold"
        href={project.url}
        target="_blank"
        rel="noreferrer"
      >
        {dictionary.projects.visitSite} ↗
      </Link>
    </main>
  );
}
