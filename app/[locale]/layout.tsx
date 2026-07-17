import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { i18nConfig } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import type { LocaleRouteParams } from "@/types/route";
import { isLocale } from "@/utils/locale";
import { withLocale } from "@/utils/path";
import "../globals.css";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleRouteParams;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const locale = localeParam;
  const dictionary = getDictionary(locale);
  const canonicalUrl = `${siteConfig.url}${withLocale(locale)}`;
  const socialImage = new URL(siteConfig.socialImage, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dictionary.site.name, template: `%s | ${dictionary.site.name}` },
    description: dictionary.site.description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        [
          ...i18nConfig.locales.map((item) => [item, `${siteConfig.url}${withLocale(item)}`]),
          ["x-default", `${siteConfig.url}${withLocale(i18nConfig.defaultLocale)}`],
        ],
      ),
      types: { "application/rss+xml": `${siteConfig.url}${withLocale(locale, "/rss.xml")}` },
    },
    openGraph: {
      title: dictionary.site.name,
      description: dictionary.site.description,
      type: "website",
      locale: i18nConfig.openGraphLocale[locale],
      url: canonicalUrl,
      images: [{
        url: socialImage,
        width: siteConfig.socialImageWidth,
        height: siteConfig.socialImageHeight,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.site.name,
      description: dictionary.site.description,
      images: [socialImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LocaleRouteParams;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam;
  const dictionary = getDictionary(locale);

  return (
    <html lang={i18nConfig.htmlLang[locale]}>
      <body className="min-w-80 bg-page bg-page-glow font-sans text-sm text-ink md:px-4 [&_a]:text-link [&_a]:underline [&_a]:visited:text-link-visited [&_a]:hover:text-link-hover">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: dictionary.site.name,
            description: dictionary.site.description,
            url: `${siteConfig.url}${withLocale(locale)}`,
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}${withLocale(locale, "/search")}?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <Header locale={locale} dictionary={dictionary} />
        {children}
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
