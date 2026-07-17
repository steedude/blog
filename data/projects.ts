import { Locale } from "@/types/i18n";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    locale: Locale.ZH_TW,
    slug: "3854335-web-tool",
    name: "3854335 WEB TOOL",
    summary: "把常用工具放進瀏覽器的多功能網站，提供即時互動、點對點傳檔與連結分享工具。",
    url: "https://3854335.com",
    features: [
      "雙人你畫我猜，透過 QR Code 加入房間並即時同步",
      "使用 WebRTC 在同一房間交換文字與檔案",
      "建立短網址、QR Code 與密碼保護圖片分享頁",
      "繁體中文與英文介面",
    ],
    technologies: ["Nuxt", "WebRTC", "QR Code", "Realtime interaction"],
  },
  {
    locale: Locale.EN,
    slug: "3854335-web-tool",
    name: "3854335 WEB TOOL",
    summary: "A browser-based toolbox for real-time interaction, peer-to-peer file transfer, and link sharing.",
    url: "https://3854335.com",
    features: [
      "Two-player drawing game with QR-code room joining and live synchronization",
      "WebRTC text and file transfer between peers in the same room",
      "Short URLs, QR codes, and password-protected image sharing",
      "Traditional Chinese and English interfaces",
    ],
    technologies: ["Nuxt", "WebRTC", "QR Code", "Realtime interaction"],
  },
];
