"use client";

import { useMemo, useState } from "react";
import type { SearchDocument } from "@/types/search";
import { normalizeSearchText } from "@/utils/search";

export function usePostSearch(documents: SearchDocument[], initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return documents;

    return documents.filter((document) => {
      const searchableText = normalizeSearchText(
        [
          document.title,
          document.description,
          document.category,
          ...document.tags,
        ].join(" "),
      );
      return terms.every((term) => searchableText.includes(term));
    });
  }, [documents, query]);

  return { query, setQuery, results };
}
