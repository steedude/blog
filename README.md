# 前端觀察站

以 Next.js App Router、TypeScript 與 MDX 製作的個人技術部落格。

## 功能

- 首頁文章列表與快速搜尋
- 文章分類、標籤與年月歸檔
- Google、DuckDuckGo 站外搜尋
- 友站連結
- MDX 文章內容與程式碼區塊
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

1. 在 `content/posts` 新增 `.mdx` 檔案。
2. 在 `lib/posts.ts` 登記文章標題、日期、分類、標籤及內容元件。
3. 執行 `npm run build` 確認文章可以正常產生。
