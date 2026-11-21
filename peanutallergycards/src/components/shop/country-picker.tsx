"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useId, useMemo, useState } from "react";
import type { CatalogueCountry } from "@/content/catalogue";
import { catalogue, NEEDS_SEARCH } from "@/content/catalogue";
import { CONTACT_EMAIL } from "@/content/contact";

const MAX_RESULTS = 6;

const DIACRITICS = /\p{Diacritic}/gu;

const normalise = (text: string): string =>
  text.normalize("NFD").replace(DIACRITICS, "").toLowerCase().trim();

/** Countries whose name or language matches what was typed, best first. */
export const searchCountries = (
  query: string,
  pool: readonly CatalogueCountry[]
): CatalogueCountry[] => {
  const wanted = normalise(query);
  if (!wanted) {
    return pool.filter((country) => country.popular);
  }
  const starts: CatalogueCountry[] = [];
  const contains: CatalogueCountry[] = [];
  for (const country of pool) {
    const name = normalise(country.name);
    if (name.startsWith(wanted)) {
      starts.push(country);
    } else if (
      name.includes(wanted) ||
      normalise(country.language).includes(wanted)
    ) {
      contains.push(country);
    }
  }
  return [...starts, ...contains];
};

/**
 * Search the whole catalogue and add a country with one tap. Built for a
 * long list: nothing is shown until you type, apart from a few popular
 * countries.
 */
export const CountryPicker = ({
  exclude,
  label,
  onAdd,
}: {
  /** Slugs already chosen, left out of the results. */
  exclude: readonly string[];
  label: string;
  onAdd: (slug: string) => void;
}) => {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      searchCountries(
        query,
        catalogue.filter((country) => !exclude.includes(country.slug))
      ).slice(0, MAX_RESULTS),
    [query, exclude]
  );

  const handleQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  }, []);
  const handleAdd = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { slug } = event.currentTarget.dataset;
      if (slug) {
        onAdd(slug);
        setQuery("");
      }
    },
    [onAdd]
  );

  return (
    <div>
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        autoComplete="off"
        className="border-shop-ink bg-shop-panel placeholder:text-shop-ink focus-visible:outline-shop-ink w-full rounded-full border-2 px-5 py-3 focus-visible:outline-3 focus-visible:outline-offset-2"
        hidden={!NEEDS_SEARCH}
        id={inputId}
        onChange={handleQuery}
        placeholder={`Search ${catalogue.length} countries…`}
        type="search"
        value={query}
      />
      {results.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {results.map((country) => (
            <li key={country.slug}>
              <button
                className="border-shop-ink bg-shop-panel hover:bg-shop-selected focus-visible:outline-shop-ink flex items-center gap-2 rounded-full border px-4 py-1.5 text-base focus-visible:outline-3 focus-visible:outline-offset-2"
                data-slug={country.slug}
                onClick={handleAdd}
                type="button"
              >
                <span aria-hidden="true">+</span>
                <span className="sr-only">Add</span>
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {results.length === 0 && query.trim() ? (
        <p className="mt-3 text-base" role="status">
          No match. Email {CONTACT_EMAIL} and we&apos;ll add it.
        </p>
      ) : null}
    </div>
  );
};
