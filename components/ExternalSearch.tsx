"use client";

import { FormEvent, useState } from "react";

export function ExternalSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [engine, setEngine] = useState<"google" | "duckduckgo">("google");
  const [siteOnly, setSiteOnly] = useState(true);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get("q") || "").trim();
    if (!query) return;

    const hostname = window.location.hostname;
    const canScopeToSite = hostname !== "localhost" && hostname !== "127.0.0.1";
    const scopedQuery =
      siteOnly && canScopeToSite ? `site:${hostname} ${query}` : query;
    const target =
      engine === "google"
        ? `https://www.google.com/search?q=${encodeURIComponent(scopedQuery)}`
        : `https://duckduckgo.com/?q=${encodeURIComponent(scopedQuery)}`;

    window.location.href = target;
  }

  return (
    <form className="search-panel" onSubmit={submitSearch}>
      <label htmlFor="search-query">搜尋關鍵字</label>
      <input
        id="search-query"
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="輸入技術、框架或文章名稱"
        autoFocus
      />

      <div className="engine-options" aria-label="搜尋引擎">
        <label className="engine-option">
          <input
            type="radio"
            name="engine"
            checked={engine === "google"}
            onChange={() => setEngine("google")}
          />
          Google
        </label>
        <label className="engine-option">
          <input
            type="radio"
            name="engine"
            checked={engine === "duckduckgo"}
            onChange={() => setEngine("duckduckgo")}
          />
          DuckDuckGo
        </label>
      </div>

      <label className="scope-option">
        <input
          type="checkbox"
          checked={siteOnly}
          onChange={(event) => setSiteOnly(event.target.checked)}
        />
        只搜尋本站內容
      </label>

      <button type="submit" className="engine-button">
        使用 {engine === "google" ? "Google" : "DuckDuckGo"} 搜尋
      </button>
      <p className="search-hint">
        正式部署後，「只搜尋本站」會自動使用目前網域。開發環境則會進行一般網路搜尋。
      </p>
    </form>
  );
}
