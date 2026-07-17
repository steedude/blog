"use client";

import { type FormEvent, useState } from "react";
import { SearchEngine } from "@/types/search";

export function useExternalSearch() {
  const [engine, setEngine] = useState(SearchEngine.GOOGLE);
  const [siteOnly, setSiteOnly] = useState(true);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get("q") ?? "").trim();
    if (!query) return;

    const { hostname } = window.location;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const scopedQuery = siteOnly && !isLocal ? `site:${hostname} ${query}` : query;
    const baseUrl =
      engine === SearchEngine.GOOGLE
        ? "https://www.google.com/search?q="
        : "https://duckduckgo.com/?q=";

    window.location.href = `${baseUrl}${encodeURIComponent(scopedQuery)}`;
  }

  return { engine, setEngine, siteOnly, setSiteOnly, submitSearch };
}
