"use client";

import Link from "next/link";
import { usePostSearch } from "@/hooks/use-post-search";
import type { Dictionary, Locale } from "@/types/i18n";
import type { SearchDocument } from "@/types/search";
import { formatPlural } from "@/utils/message";
import { withLocale } from "@/utils/path";

type PostSearchProps = {
  locale: Locale;
  dictionary: Dictionary;
  documents: SearchDocument[];
  initialQuery?: string;
};

export function PostSearch({
  locale,
  dictionary,
  documents,
  initialQuery = "",
}: PostSearchProps) {
  const { query, setQuery, results } = usePostSearch(documents, initialQuery);

  return (
    <section aria-label={dictionary.search.title}>
      <label className="mb-1 block font-bold" htmlFor="search-query">
        {dictionary.search.keyword}
      </label>
      <input
        className="w-full max-w-xl border border-neutral-400 bg-white p-2"
        id="search-query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={dictionary.search.placeholder}
        autoFocus
      />

      <p className="my-4 text-xs text-muted" aria-live="polite">
        {formatPlural(locale, dictionary.search.resultCount, results.length)}
      </p>

      {results.length ? (
        <div className="space-y-3">
          {results.map((post) => (
            <article className="border border-frame bg-stone-100 p-3" key={post.slug}>
              <h2 className="mt-0 mb-2 font-serif text-lg">
                <Link href={withLocale(locale, `/posts/${post.slug}`)}>{post.title}</Link>
              </h2>
              <p className="my-2">{post.description}</p>
              <p className="m-0 text-xs text-muted">
                {post.category} · {post.tags.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-8 text-muted">{dictionary.search.empty}</p>
      )}
    </section>
  );
}
