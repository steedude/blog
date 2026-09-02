import { HomeContent } from "@/components/HomeContent";
import type { LocaleRouteParams } from "@/types/route";
import { getLocaleOrDefault } from "@/utils/locale";

export default async function Home({ params }: { params: LocaleRouteParams }) {
  const { locale: localeParam } = await params;
  return <HomeContent locale={getLocaleOrDefault(localeParam)} currentPage={1} />;
}
