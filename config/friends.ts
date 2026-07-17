import { Locale } from "@/types/i18n";

type Friend = {
  name: string;
  description: string;
  url: string;
};

export const friendsByLocale: Record<Locale, Friend[]> = {
  [Locale.ZH_TW]: [
    { name: "前端開發者 A", description: "分享 Vue、Nuxt 與前端架構實務。", url: "https://example.com" },
    { name: "Web Platform Notes", description: "關注瀏覽器 API、CSS 與無障礙設計。", url: "https://example.org" },
    { name: "效能筆記", description: "從監控資料理解真實使用者體驗。", url: "https://example.net" },
    { name: "你的朋友網站", description: "將這裡替換成真正想推薦的技術網站。", url: "https://example.dev" },
  ],
  [Locale.EN]: [
    { name: "Frontend Developer A", description: "Practical notes on Vue, Nuxt, and frontend architecture.", url: "https://example.com" },
    { name: "Web Platform Notes", description: "Browser APIs, CSS, and accessible interface design.", url: "https://example.org" },
    { name: "Performance Notes", description: "Understanding real user experience through monitoring data.", url: "https://example.net" },
    { name: "Your Friend's Site", description: "Replace this entry with a technical site you genuinely recommend.", url: "https://example.dev" },
  ],
};
