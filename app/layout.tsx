import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export function generateMetadata(): Metadata {
  const baseUrl = new URL(siteUrl);
  const socialImage = new URL("/og-movable-type.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: { default: siteName, template: `%s | ${siteName}` },
    description: siteDescription,
    alternates: {
      types: { "application/rss+xml": `${siteUrl}/rss.xml` },
    },
    openGraph: {
      title: "前端觀察站｜Frontend Notes",
      description: siteDescription,
      type: "website",
      locale: "zh_TW",
      images: [{ url: socialImage, width: 1448, height: 1086 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "前端觀察站｜Frontend Notes",
      description: "CSS · JavaScript · Web Standards",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
