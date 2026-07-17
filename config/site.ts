const vercelDomain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteConfig = {
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  author: "前端觀察站",
  socialImage: "/og-movable-type.png",
  socialImageWidth: 1448,
  socialImageHeight: 1086,
} as const;
