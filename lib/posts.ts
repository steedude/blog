import type { ComponentType } from "react";
import ReactCompilerPost from "@/content/posts/react-compiler.mdx";
import ViewTransitionsPost from "@/content/posts/view-transitions.mdx";
import ModernCssPost from "@/content/posts/modern-css.mdx";
import ServerComponentsPost from "@/content/posts/server-components-retrospective.mdx";
import WebVitalsPost from "@/content/posts/web-vitals.mdx";
import BaselinePost from "@/content/posts/web-platform-baseline.mdx";

export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: string;
  homeExcerpt?: string[];
  Body: ComponentType;
};

export const allPosts: Post[] = [
  {
    slug: "react-compiler",
    title: "React Compiler 值得現在導入嗎？先看它真正解決的問題",
    description:
      "從手動 memoization、開發體驗到導入限制，整理團隊評估 React Compiler 時真正需要回答的問題。",
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-15",
    category: "React",
    categorySlug: "react",
    tags: ["React", "Compiler", "Performance"],
    readingTime: "8 分鐘",
    homeExcerpt: [
      "React Compiler 的吸引力很直觀：如果編譯器能自動完成一部分 memoization，我們就能少寫一些 useMemo、useCallback 和 memo。",
      "真正值得討論的不是能少寫多少程式碼，而是它會如何改變團隊理解效能問題的方式。Compiler 會在建置階段分析元件與資料依賴，替符合規則的程式碼加入最佳化。",
      "我會先從非核心頁面或新功能開始，保留效能量測，並觀察它是否真的降低維護成本。",
    ],
    Body: ReactCompilerPost,
  },
  {
    slug: "view-transitions",
    title: "View Transitions API：頁面轉場終於不必全靠框架",
    description:
      "以漸進增強的角度理解 View Transitions，並討論它在內容網站與產品介面中的實際取捨。",
    publishedAt: "2026-06-24",
    category: "Web Platform",
    categorySlug: "web-platform",
    tags: ["CSS", "Animation", "Web API"],
    readingTime: "6 分鐘",
    homeExcerpt: [
      "過去要做跨頁轉場，往往需要框架、動畫函式庫，甚至刻意把頁面維持在同一個 SPA 生命週期中。",
      "View Transitions API 提供了一個更接近平台層的選項。最重要的原則仍是漸進增強：沒有轉場時，導覽也要正常運作。",
      "文章列表進入內容、圖片縮圖展開成詳情頁，都是很適合的使用情境；同時也別忘了尊重使用者的 reduced motion 偏好。",
    ],
    Body: ViewTransitionsPost,
  },
  {
    slug: "modern-css",
    title: "新一代 CSS 不只是語法糖：從容器查詢到原生巢狀",
    description:
      "重新整理近年 CSS 能力的變化，以及哪些需求已經不必再交給 JavaScript 或預處理器。",
    publishedAt: "2026-06-03",
    category: "CSS",
    categorySlug: "css",
    tags: ["CSS", "Container Query", "Responsive"],
    readingTime: "7 分鐘",
    Body: ModernCssPost,
  },
  {
    slug: "server-components-retrospective",
    title: "回頭看 Server Components：當年的期待實現了多少？",
    description:
      "從早期討論回看 Server Components 的落地狀況，區分架構價值、框架實作與團隊成本。",
    publishedAt: "2025-12-18",
    updatedAt: "2026-01-04",
    category: "趨勢回顧",
    categorySlug: "retrospective",
    tags: ["React", "RSC", "Architecture"],
    readingTime: "10 分鐘",
    Body: ServerComponentsPost,
  },
  {
    slug: "web-vitals",
    title: "Core Web Vitals 之外，我會怎麼觀察真實使用體驗",
    description:
      "指標不是分數遊戲。從使用者任務、裝置差異與真實監控重新理解前端效能。",
    publishedAt: "2025-11-09",
    category: "效能",
    categorySlug: "performance",
    tags: ["Performance", "Web Vitals", "UX"],
    readingTime: "9 分鐘",
    Body: WebVitalsPost,
  },
  {
    slug: "web-platform-baseline",
    title: "Baseline 如何改變我們判斷瀏覽器支援度的方式",
    description:
      "與其只問能不能用，不如建立一致的支援基準，讓產品與工程討論更精確。",
    publishedAt: "2025-10-21",
    category: "Web Platform",
    categorySlug: "web-platform",
    tags: ["Baseline", "Compatibility", "Web API"],
    readingTime: "5 分鐘",
    Body: BaselinePost,
  },
].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function tagToSlug(tag: string) {
  return tag.toLowerCase().trim().replace(/\s+/g, "-");
}

export function getPost(slug: string) {
  return allPosts.find((post) => post.slug === slug);
}

export function getCategories() {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of allPosts) {
    const current = map.get(post.categorySlug);
    map.set(post.categorySlug, {
      name: post.category,
      slug: post.categorySlug,
      count: (current?.count || 0) + 1,
    });
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function getTags() {
  const map = new Map<string, number>();
  for (const post of allPosts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({
      name,
      slug: tagToSlug(name),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getArchiveGroups() {
  const map = new Map<string, { year: number; month: number; posts: Post[] }>();
  for (const post of allPosts) {
    const date = new Date(`${post.publishedAt}T00:00:00`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    const current = map.get(key) || { year, month, posts: [] };
    current.posts.push(post);
    map.set(key, current);
  }
  return [...map.values()].sort(
    (a, b) => b.year - a.year || b.month - a.month,
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}
