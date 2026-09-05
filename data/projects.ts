import { Locale } from "@/types/i18n";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    locale: Locale.ZH_TW,
    slug: "home-inventory",
    name: "庫存管理系統",
    summary: "集中管理居家備品的數量、分類與存放位置，並在庫存不足時寄送 Email 通知。",
    url: "https://inventory.3854335.com",
    features: [
      "記錄物品數量、分類與存放位置",
      "設定低庫存門檻並寄送 Email 通知",
      "快速查看家中備品目前的庫存狀態",
      "繁體中文與英文介面",
    ],
    technologies: ["Nuxt", "Supabase", "Email notification", "i18n"],
  },
  {
    locale: Locale.ZH_TW,
    slug: "web-file",
    name: "Web File",
    summary: "本機優先的瀏覽器檔案工具，使用 WASM 處理圖片轉檔、壓縮與 PDF 工作流程，也能安裝成 PWA 離線使用。",
    url: "https://file.3854335.com",
    features: [
      "在瀏覽器端完成圖片轉檔與壓縮",
      "提供常用的 PDF 處理流程",
      "檔案留在本機處理，減少不必要的上傳",
      "支援安裝成 PWA 並離線使用",
    ],
    technologies: ["Nuxt", "WebAssembly", "PWA", "Browser File APIs"],
  },
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
    slug: "home-inventory",
    name: "Home Inventory",
    summary: "A home inventory system for tracking quantities, categories, and storage locations, with email alerts when an item runs low.",
    url: "https://inventory.3854335.com",
    features: [
      "Track item quantities, categories, and storage locations",
      "Set low-stock thresholds and receive email alerts",
      "See the current status of household supplies at a glance",
      "Traditional Chinese and English interfaces",
    ],
    technologies: ["Nuxt", "Supabase", "Email notification", "i18n"],
  },
  {
    locale: Locale.EN,
    slug: "web-file",
    name: "Web File",
    summary: "A local-first browser file utility that uses WASM for image conversion, compression, and PDF workflows, with offline PWA support.",
    url: "https://file.3854335.com",
    features: [
      "Convert and compress images directly in the browser",
      "Handle common PDF workflows",
      "Keep files on the device instead of uploading them unnecessarily",
      "Install as a PWA for offline use",
    ],
    technologies: ["Nuxt", "WebAssembly", "PWA", "Browser File APIs"],
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
