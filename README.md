# 前端觀察站

以 Next.js／vinext、TypeScript 與 MDX 製作的個人技術部落格第一版。

## 功能

- 首頁文章列表與快速搜尋
- 文章分類與分類文章列表
- 完整標籤列表與標籤文章頁
- 依年份、月份瀏覽文章
- Google／DuckDuckGo 外部搜尋
- 友站連結
- MDX 文章內容與程式碼區塊
- 響應式版面與社群分享圖片

## 開發

```bash
npm install
npm run dev
```

## 新增文章

1. 在 `content/posts` 新增 `.mdx` 檔案。
2. 在 `lib/posts.ts` 登記文章標題、日期、分類、標籤及內容元件。
3. 執行 `npm run build` 確認文章可以正確產生。

目前文章及友站內容均為示範資料，可直接替換。
