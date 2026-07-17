import type { Metadata } from "next";

export const metadata: Metadata = { title: "友站連結" };

const friends = [
  {
    name: "前端開發者 A",
    description: "分享 Vue、Nuxt 與前端架構實務。",
    url: "https://example.com",
  },
  {
    name: "Web Platform Notes",
    description: "關注瀏覽器 API、CSS 與無障礙設計。",
    url: "https://example.org",
  },
  {
    name: "效能筆記",
    description: "從監控資料理解真實使用者體驗。",
    url: "https://example.net",
  },
  {
    name: "你的朋友網站",
    description: "將這裡替換成真正想推薦的技術網站。",
    url: "https://example.dev",
  },
];

export default function FriendsPage() {
  return (
    <main className="page-main shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">BLOGROLL</p>
          <h1>友站連結</h1>
        </div>
        <p>推薦持續產出、有明確觀點，並且值得反覆閱讀的技術網站。</p>
      </header>
      <div className="friend-list">
        {friends.map((friend) => (
          <a
            className="friend-card"
            href={friend.url}
            target="_blank"
            rel="noreferrer"
            key={friend.name}
          >
            <h2>{friend.name}</h2>
            <p>{friend.description}</p>
            <span>{friend.url.replace(/^https?:\/\//, "")} ↗</span>
          </a>
        ))}
      </div>
    </main>
  );
}
