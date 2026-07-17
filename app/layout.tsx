import type { Metadata } from "next";
import { headers } from "next/headers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";
  const baseUrl = new URL(host ? `${protocol}://${host}` : "http://localhost:3000");
  const socialImage = new URL("/og-early-blog.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: { default: "前端觀察站", template: "%s | 前端觀察站" },
    description: "關於網頁標準、CSS、JavaScript 與前端開發的觀察和實作筆記。",
    openGraph: {
      title: "前端觀察站｜Frontend Notes",
      description: "關於網頁標準、CSS、JavaScript 與前端開發的觀察和實作筆記。",
      type: "website",
      locale: "zh_TW",
      images: [{ url: socialImage, width: 1536, height: 1024 }],
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
