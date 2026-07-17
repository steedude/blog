import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { directoryCard, directoryCardMeta, directoryCardTitle, pageMain } from "@/config/styles";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";
import { createPageMetadata } from "@/utils/metadata";
import { withLocale } from "@/utils/path";
import { getProjects } from "@/utils/projects";

export async function generateMetadata({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);
  return createPageMetadata(
    locale,
    dictionary.projects.title,
    dictionary.projects.description,
    "/projects",
  );
}

export default async function ProjectsPage({ params }: { params: LocaleRouteParams }) {
  const { locale: value } = await params;
  const locale = getLocaleOrDefault(value);
  const dictionary = getDictionary(locale);

  return (
    <main className={pageMain}>
      <PageHeading
        eyebrow="PROJECTS"
        title={dictionary.projects.title}
        description={dictionary.projects.description}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {getProjects(locale).map((project) => (
          <Link
            className={directoryCard}
            href={withLocale(locale, `/projects/${project.slug}`)}
            key={project.slug}
          >
            <h2 className={directoryCardTitle}>{project.name}</h2>
            <p className="my-2 text-ink">{project.summary}</p>
            <span className={directoryCardMeta}>{project.url.replace(/^https?:\/\//, "")} →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
