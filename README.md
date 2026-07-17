# 前端觀察站

以 Next.js App Router、TypeScript、Tailwind CSS 與 MDX 製作的多語個人技術部落格。

## 功能

- 首頁文章列表與快速搜尋
- 文章分類、標籤與年月歸檔
- Google、DuckDuckGo 站外搜尋
- 友站連結
- MDX 文章內容與程式碼區塊
- 繁體中文與英文內容、語系切換及 `hreflang`
- 響應式版面與社群分享預覽圖

## 開發

```bash
npm install
npm run dev
```

開啟 <http://localhost:3000>。

## 建置

```bash
npm run build
npm start
```

專案使用標準 Next.js 建置流程，建置結果會輸出到 `.next`，可直接部署至 Vercel。

## 新增文章

1. 在 `content/posts` 新增繁體中文 `.mdx`，英文內容放在 `content/posts/en`。
2. 在 `data/posts.ts` 登記各語系文章的標題、日期、分類、標籤及內容元件。
3. 執行 `npm run build` 確認文章可以正常產生。

## 專案結構

- `config/`：站台、語系、導覽與樣式設定
- `data/`：文章登錄資料
- `i18n/`：繁中與英文字典
- `types/`：跨模組共用型別與 enum
- `utils/`：日期、路徑、文章查詢、metadata 與 XML 工具
- `hooks/`：客戶端可重用邏輯
