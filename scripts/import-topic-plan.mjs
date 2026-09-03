import { writeFile } from "node:fs/promises";

const plans = [
  ["tailwind-v4-css-first", "2025-01-21", "CSS", "css", ["Tailwind CSS", "CSS", "Design Tokens"], "從設定檔搬進 CSS，看看 Tailwind CSS v4 的 CSS-first 到底改變了什麼。"],
  ["cra-afterlife", "2025-02-14", "React", "react", ["React", "Create React App", "Vite", "Next.js"], "Create React App 退場後，依照 SPA、內容網站與 SSR 需求選擇下一套工具。"],
  ["bybit-safe-ui", "2025-02-21", "資訊安全", "security", ["Security", "Crypto Wallet", "Frontend Security", "Safe"], "從 Bybit 冷錢包事件理解簽署介面、Blind Signing 與多簽流程的前端風險。"],
  ["typescript-native-port", "2025-03-11", "TypeScript", "typescript", ["TypeScript", "Go", "Compiler", "Developer Experience"], "TypeScript 為什麼用 Go 重做編譯器，以及原生工具對大型前端專案的意義。"],
  ["custom-select", "2025-04-02", "Web Platform", "web-platform", ["CSS", "HTML", "Select", "Accessibility"], "認識可自訂的原生 select，以及漸進增強和瀏覽器相容性的實際取捨。"],
  ["angular-20", "2025-05-28", "Angular", "angular", ["Angular", "Signals", "Zoneless", "SSR", "Hydration"], "整理 Angular 20 的 Signals、incremental hydration、route-level rendering 與 zoneless。"],
  ["chrome-io-2025", "2025-05-20", "Web Platform", "web-platform", ["Chrome", "Web Platform", "CSS", "Baseline"], "從 Google I/O 2025 挑出一般前端近期真正可能用到的瀏覽器功能。"],
  ["node-24", "2025-05-06", "前端工具", "tooling", ["Node.js", "V8", "npm", "Frontend Tooling"], "Node.js 24 如何影響 Vite、Next.js、測試、CI 與前端專案的執行環境。"],
  ["vite-7-baseline", "2025-06-24", "前端工具", "tooling", ["Vite", "Baseline", "Browser Support", "Build Tools"], "用白話理解 Vite 7 的 Baseline Widely Available 與瀏覽器支援策略。"],
  ["safari-26-web-platform", "2025-06-09", "Web Platform", "web-platform", ["Safari", "WebKit", "CSS", "Web API"], "整理 Safari 26 的 Anchor Positioning、捲動動畫、HDR、憑證與安全 API。"],
  ["nuxt-4", "2025-07-15", "Nuxt", "nuxt", ["Nuxt", "Vue", "TypeScript", "Migration"], "Nuxt 4 的 app 目錄、TypeScript 專案拆分、資料請求改變與升級順序。"],
  ["tailwind-plus-vanilla-js", "2025-07-22", "CSS", "css", ["Tailwind CSS", "Vanilla JavaScript", "UI Components"], "Tailwind Plus 支援 Vanilla JavaScript 後，小型互動還需要綁定框架嗎？"],
  ["nx-s1ngularity", "2025-08-26", "資訊安全", "security", ["Security", "npm", "Supply Chain", "Nx"], "回顧 Nx S1ngularity 供應鏈攻擊，以及前端團隊真正能做的防護。"],
  ["nuxt-ui-v4", "2025-09-24", "Nuxt", "nuxt", ["Nuxt UI", "Design System", "Vue", "UI Components"], "Nuxt UI v4、Headless Components 與自建 Design System 的成本和適用情境。"],
  ["react-foundation", "2025-10-07", "React", "react", ["React", "Open Source", "Governance"], "React Foundation 不會直接改變 API，卻可能影響 React 長期的治理與資源。"],
  ["angular-21", "2025-11-19", "Angular", "angular", ["Angular", "Signal Forms", "Angular Aria", "Vitest", "MCP"], "Angular 21 如何同時更新表單、無障礙、測試與 AI 輔助開發。"],
  ["npm-classic-token", "2025-11-05", "資訊安全", "security", ["npm", "Security", "Trusted Publishing", "Supply Chain"], "npm Classic Token 退場後，套件發布流程為什麼要走向短效憑證。"],
  ["react2shell", "2025-12-03", "資訊安全", "security", ["React", "React Server Components", "Security", "RCE"], "React2Shell 為何讓前端團隊也必須理解伺服器漏洞與修補流程。"],
  ["astro-6-beta", "2026-01-13", "內容網站", "content-sites", ["Astro", "CSP", "Fonts", "Content Collections"], "Astro 6 Beta 如何處理字型、安全政策、開發伺服器與動態內容。"],
  ["matt-pocock-skills", "2026-02-18", "AI 開發工具", "ai-tooling", ["AI", "Agent Skills", "Developer Workflow", "Matt Pocock"], "Agent Skill 和普通 prompt 有什麼不同，以及團隊可以怎麼整理自己的工作方式。"],
  ["vite-8-rolldown", "2026-03-10", "前端工具", "tooling", ["Vite", "Rolldown", "Rust", "Build Tools"], "Vite 8 換用 Rolldown 的原因，以及換掉建置核心時真正要注意的相容性。"],
  ["typescript-6", "2026-03-23", "TypeScript", "typescript", ["TypeScript", "Migration", "Compiler", "Tooling"], "從 TypeScript 6 清理舊設定，逐步過渡到以 Go 打造的原生 TypeScript 7。"],
  ["chrome-147", "2026-04-07", "Web Platform", "web-platform", ["Chrome", "View Transitions", "CSS", "Animation"], "用區域 View Transitions 處理列表、卡片與元件內部的畫面變化。"],
  ["webmcp", "2026-05-19", "AI 開發工具", "ai-tooling", ["WebMCP", "AI Agent", "Web API", "Security"], "網站如何為 AI agent 提供結構化操作，同時保留授權和使用者確認。"],
  ["astro-7", "2026-06-16", "內容網站", "content-sites", ["Astro", "Rust", "MDX", "Vite"], "Astro 7 換上 Rust compiler 後，內容網站與 MDX 使用者需要注意什麼。"],
  ["angular-22", "2026-06-03", "Angular", "angular", ["Angular", "Signals", "Zoneless", "Signal Forms", "Fetch"], "從 Angular 20 到 22，回顧 Signals、zoneless、SSR、表單與資料請求的演進。"],
  ["typescript-7", "2026-07-08", "TypeScript", "typescript", ["TypeScript", "Go", "Compiler", "Migration"], "TypeScript 7 正式換上原生編譯器後，速度之外還有哪些相容性問題。"],
  ["nuxt-4-5", "2026-07-21", "Nuxt", "nuxt", ["Nuxt", "Vite", "Rspack", "SSR Streaming"], "分清楚 Nuxt 4.5 的 Vite、Rspack 與 SSR Streaming 各自在解決什麼。"],
  ["coldcard-rng", "2026-07-29", "資訊安全", "security", ["Security", "Crypto Wallet", "CSPRNG", "Seed Phrase"], "COLDCARD 弱亂數事件為什麼無法只靠更新韌體修復既有錢包。"],
  ["agent-plugins-1", "2026-08-12", "AI 開發工具", "ai-tooling", ["AI Agent", "Agent Plugins", "MCP", "Agent Skills"], "Agent Plugins 1.0 如何封裝 skill、command、hook 與 MCP server。"],
];

const componentName = (slug) => slug
  .split("-")
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("")
  .replace(/^(\d)/, "Post$1");

const imports = plans.map(([slug]) => {
  const name = componentName(slug);
  return `import ${name}Zh, { metadata as ${name}ZhMetadata } from "@/content/posts/${slug}/zh-TW.mdx";\nimport ${name}En, { metadata as ${name}EnMetadata } from "@/content/posts/${slug}/en.mdx";`;
}).join("\n");
const entries = plans.map(([slug]) => {
  const name = componentName(slug);
  return `  createPost(Locale.ZH_TW, ${name}Zh, ${name}ZhMetadata),\n  createPost(Locale.EN, ${name}En, ${name}EnMetadata),`;
}).join("\n");
const registry = `// Generated by scripts/import-topic-plan.mjs.\nimport type { ComponentType } from "react";\n${imports}\nimport { Locale } from "@/types/i18n";\nimport type { Post, PostMetadata } from "@/types/post";\n\nfunction createPost(locale: Locale, Body: ComponentType, metadata: PostMetadata): Post {\n  return { ...metadata, locale, Body };\n}\n\nexport const topicPosts: Post[] = [\n${entries}\n];\n`;
await writeFile(new URL("../data/topic-posts.ts", import.meta.url), registry, "utf8");

console.log(`Generated the bilingual registry for ${plans.length} topic articles.`);
