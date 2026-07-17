"use client";

import { retroButton } from "@/config/styles";
import { useExternalSearch } from "@/hooks/use-external-search";
import type { Dictionary } from "@/types/i18n";
import { SearchEngine } from "@/types/search";
import { interpolate } from "@/utils/message";

export function ExternalSearch({
  initialQuery = "",
  dictionary,
}: {
  initialQuery?: string;
  dictionary: Dictionary;
}) {
  const { engine, setEngine, siteOnly, setSiteOnly, submitSearch } = useExternalSearch();

  return (
    <form
      className="max-w-xl border border-frame bg-stone-100 p-4"
      onSubmit={submitSearch}
    >
      <label className="mb-1 block font-bold" htmlFor="search-query">
        {dictionary.search.keyword}
      </label>
      <input
        className="w-full border border-neutral-400 bg-white p-1"
        id="search-query"
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder={dictionary.search.placeholder}
        autoFocus
      />

      <div className="my-3 flex flex-col gap-2 sm:flex-row" aria-label={dictionary.search.engineLabel}>
        <label className="border border-frame-soft bg-white px-2 py-1.5">
          <input
            type="radio"
            name="engine"
            checked={engine === SearchEngine.GOOGLE}
            onChange={() => setEngine(SearchEngine.GOOGLE)}
          />
          Google
        </label>
        <label className="border border-frame-soft bg-white px-2 py-1.5">
          <input
            type="radio"
            name="engine"
            checked={engine === SearchEngine.DUCK_DUCK_GO}
            onChange={() => setEngine(SearchEngine.DUCK_DUCK_GO)}
          />
          DuckDuckGo
        </label>
      </div>

      <label className="mb-3 block">
        <input
          type="checkbox"
          checked={siteOnly}
          onChange={(event) => setSiteOnly(event.target.checked)}
        />
        {dictionary.search.siteOnly}
      </label>

      <button type="submit" className={retroButton}>
        {interpolate(dictionary.search.submit, {
          engine: engine === SearchEngine.GOOGLE ? "Google" : "DuckDuckGo",
        })}
      </button>
      <p className="text-xs text-muted">
        {dictionary.search.hint}
      </p>
    </form>
  );
}
