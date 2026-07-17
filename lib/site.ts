const vercelDomain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "前端觀察站";
export const siteDescription =
  "關於網頁標準、CSS、JavaScript 與前端開發的觀察和實作筆記。";
