"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchDocument } from "@/types/search";
import { normalizeSearchText } from "@/utils/search-text";

export function usePostSearch(documents: SearchDocument[]) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const setQuery = (value: string) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const indexedDocuments = useMemo(() => documents.map((document) => ({
    document,
    text: normalizeSearchText([
      document.title, document.description, document.category, ...document.tags,
    ].join(" ")),
  })), [documents]);

  const results = useMemo(() => {
    const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return documents;

    return indexedDocuments
      .filter(({ text }) => terms.every((term) => text.includes(term)))
      .map(({ document }) => document);
  }, [documents, indexedDocuments, query]);

  return { query, setQuery, results };
}
