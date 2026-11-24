"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import { useCallback, useId, useMemo, useState } from "react";
import type { RegionId } from "@/content/catalogue";
import { catalogue, productPath, regions } from "@/content/catalogue";
import { CONTACT_EMAIL } from "@/content/contact";
import { searchCountries } from "./country-picker";
import { Flag } from "./flags";

type RegionFilter = RegionId | "all";

const chipClass =
  "cursor-pointer rounded-full border-2 border-shop-ink bg-shop-panel px-4 py-2 text-base font-semibold has-checked:bg-shop-selected has-focus-visible:outline-3 has-focus-visible:outline-shop-ink has-focus-visible:outline-offset-2";

const byName = [...catalogue].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Every country we sell, searchable and filterable by region. The whole
 * list is in the page (so it works for search engines and without scripts);
 * typing or picking a region narrows it.
 */
export const CountryBrowser = () => {
  const searchId = useId();
  const regionName = useId();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");

  const shown = useMemo(() => {
    const inRegion =
      region === "all"
        ? byName
        : byName.filter((country) => country.region === region);
    return query.trim() ? searchCountries(query, inRegion) : inRegion;
  }, [query, region]);

  const handleQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  }, []);
  const handleRegion = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setRegion(regions.find((item) => item.id === value)?.id ?? "all");
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:w-96">
          <label className="sr-only" htmlFor={searchId}>
            Search countries
          </label>
          <input
            autoComplete="off"
            className="border-shop-ink bg-shop-panel placeholder:text-shop-ink focus-visible:outline-shop-ink w-full rounded-full border-2 px-5 py-3.5 focus-visible:outline-3 focus-visible:outline-offset-2"
            id={searchId}
            onChange={handleQuery}
            placeholder="Where are you eating next?"
            type="search"
            value={query}
          />
        </div>
        <fieldset>
          <legend className="sr-only">Region</legend>
          <div className="flex flex-wrap gap-2">
            {[{ id: "all", name: "All" }, ...regions].map((item) => (
              <label className={chipClass} key={item.id}>
                <input
                  checked={region === item.id}
                  className="sr-only"
                  name={regionName}
                  onChange={handleRegion}
                  type="radio"
                  value={item.id}
                />
                {item.name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs uppercase">
        {shown.length === 1 ? "1 country" : `${shown.length} countries`}
      </p>
      {shown.length > 0 ? (
        <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((country) => (
            <li className="border-shop-ink border-b" key={country.slug}>
              <Link
                className="group focus-visible:outline-shop-ink flex items-center gap-3 rounded-sm py-3 focus-visible:outline-3"
                href={productPath(country.slug)}
              >
                <Flag
                  className="border-shop-ink h-7 w-auto shrink-0 rounded-md border"
                  code={country.code}
                />
                <span className="min-w-0 flex-1 truncate font-semibold group-hover:underline">
                  {country.name}
                </span>
                <span className="font-mono text-xs uppercase">
                  {country.language}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xl">
          No match. Email {CONTACT_EMAIL} and we&apos;ll add it.
        </p>
      )}
    </div>
  );
};
