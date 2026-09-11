# jason's blog

以 Next.js App Router、TypeScript、Tailwind CSS 與 MDX 製作的多語個人技術部落格。

## 功能

- 首頁文章列表與快速搜尋
- 文章分類、標籤與年月歸檔
- 即時站內文章搜尋
- 雙語作品集
- 友站連結
- MDX 文章內容與程式碼區塊
- 繁體中文與英文內容、語系切換及 `hreflang`
- 響應式版面與社群分享預覽圖
- 可收合文章目錄、段落連結與程式碼複製
- 作品實際截圖、實作案例與獨立分享資訊
- 搜尋網址保留關鍵字，支援重新整理與語言切換

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

1. 在 `content/posts/<slug>` 建立 `zh-TW.mdx` 與 `en.mdx`。
2. 在各 MDX 的 `metadata` export 登記標題、日期、分類與標籤。
3. 在 `data/posts.ts` 匯入兩種語系的文章元件。
4. 在 `data/article-sources.json` 以 slug 登記原始來源或官方文件；兩種語系共用來源連結。
5. 執行 `npm test` 確認文章與互動功能正常。標題連結和目錄會在建置時自動產生。

## 檢查與測試

首次執行瀏覽器測試前，先執行 `npx playwright install chromium`。

- `npm run lint`：程式碼檢查。
- `npm test`：建置、目錄單元測試、HTML 檢查與桌面／手機 Chromium 互動測試。
- `npm run test:html`、`npm run test:browser`：使用最近一次建置結果執行指定測試。

GitHub Actions 會在 main 推送及 pull request 時執行相同檢查，失敗時保存瀏覽器追蹤與截圖。

## 更新作品

在 `data/projects.ts` 維護中英文功能、案例及截圖說明。案例應描述已完成的功能，不填入未量測的效能或使用人數。

`npm run screenshots:projects` 會以獨立、未登入的瀏覽器擷取四個公開網站的首頁，更新 `public/projects/`。截圖後請檢查畫面是否完整；登入後的資料不要直接放入公開作品集。

## 搜尋與分享資料

`utils/search.ts` 和文章讀取工具只供伺服器使用；客戶端的文字處理放在 `utils/search-text.ts`，避免把 MDX 正文打包到搜尋頁。

正式環境請設定 `NEXT_PUBLIC_SITE_URL` 為部落格的公開網址，讓 canonical、RSS 和社群分享網址使用同一個網域。

## 專案結構

- `config/`：站台、語系、導覽與樣式設定
- `data/`：文章登錄資料
- `i18n/`：繁中與英文字典
- `types/`：跨模組共用型別與 enum
- `utils/`：日期、路徑、文章查詢、metadata 與 XML 工具
- `hooks/`：客戶端可重用邏輯
