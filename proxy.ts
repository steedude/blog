import { NextResponse, type NextRequest } from "next/server";
import { i18nConfig } from "@/config/i18n";
import { detectRequestLocale } from "@/utils/request-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = i18nConfig.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  const locale = detectRequestLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|sitemap.xml|robots.txt|icon.svg|og-movable-type.png).*)"],
};
