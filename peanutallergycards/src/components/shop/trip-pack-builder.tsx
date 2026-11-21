"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { catalogue, findCountry, NEEDS_SEARCH } from "@/content/catalogue";
import type { CartLine, FormatId } from "@/content/pricing";
import { availableTiers, cartTotals, formats } from "@/content/pricing";
import { addToCart } from "./cart-store";
import { CountryPicker } from "./country-picker";
import { FormatOptions, optionClass, PriceLine } from "./format-options";

const MIN_COUNTRIES = 2;

/** With a short list, start with every country ticked; otherwise none. */
const initialCountries = NEEDS_SEARCH
  ? []
  : catalogue.map((country) => country.slug);

/**
 * The trip pack: pick the countries on your trip and a format, and add them
 * all at once. Tick boxes while the list is short; search once it is long.
 */
export const TripPackBuilder = () => {
  const [formatId, setFormatId] = useState<FormatId>(
    formats.at(0)?.id ?? "printed"
  );
  const [chosen, setChosen] = useState<readonly string[]>(initialCountries);
  const [added, setAdded] = useState(0);

  const lines = useMemo<CartLine[]>(
    () => chosen.map((slug) => ({ slug, format: formatId })),
    [chosen, formatId]
  );
  const totals = cartTotals(lines);
  const enough = chosen.length >= MIN_COUNTRIES;

  const handleFormat = useCallback((format: FormatId) => {
    setFormatId(format);
    setAdded(0);
  }, []);
  const handleToggle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.currentTarget;
    setChosen((current) =>
      checked
        ? [...current.filter((slug) => slug !== value), value]
        : current.filter((slug) => slug !== value)
    );
    setAdded(0);
  }, []);
  const handleAdd = useCallback((slug: string) => {
    setChosen((current) =>
      current.includes(slug) ? current : [...current, slug]
    );
    setAdded(0);
  }, []);
  const handleRemove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { slug } = event.currentTarget.dataset;
    setChosen((current) => current.filter((item) => item !== slug));
    setAdded(0);
  }, []);
  const handleAddToCart = useCallback(() => {
    addToCart(lines);
    setAdded(lines.length);
  }, [lines]);

  return (
    <div>
      <fieldset>
        <legend className="font-mono text-xs tracking-widest uppercase">
          Countries on your trip
        </legend>
        {NEEDS_SEARCH ? (
          <div className="mt-3">
            <ul className="flex flex-wrap gap-2 empty:hidden">
              {chosen.map((slug) => (
                <li
                  className="bg-shop-selected border-shop-ink flex items-center gap-1 rounded-full border-2 py-1 pr-1 pl-4 text-base font-semibold"
                  key={slug}
                >
                  {findCountry(slug)?.name}
                  <button
                    className="hover:bg-shop-panel focus-visible:outline-shop-ink grid size-7 place-items-center rounded-full focus-visible:outline-3"
                    data-slug={slug}
                    onClick={handleRemove}
                    type="button"
                  >
                    <span aria-hidden="true">✕</span>
                    <span className="sr-only">
                      Remove {findCountry(slug)?.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <CountryPicker
                exclude={chosen}
                label="Add a country"
                onAdd={handleAdd}
              />
            </div>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {catalogue.map((country) => (
              <label className={optionClass} key={country.slug}>
                <input
                  checked={chosen.includes(country.slug)}
                  className="sr-only"
                  onChange={handleToggle}
                  type="checkbox"
                  value={country.slug}
                />
                <span className="font-semibold">{country.name}</span>
                <span className="text-shop-ink mt-1 text-base">
                  {country.language} and English
                </span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <div className="mt-6">
        <FormatOptions onChange={handleFormat} value={formatId} />
      </div>

      <PriceLine
        compareAt={totals.compareAt}
        countries={lines.length}
        discountPercent={totals.discountPercent}
        total={totals.total}
      />

      <button
        className="bg-shop-cta disabled:bg-shop-panel disabled:text-shop-ink text-shop-on-cta mt-4 w-full rounded-full px-7 py-4 text-lg font-semibold shadow-[0_4px_0_0_var(--color-shop-ink)] disabled:cursor-not-allowed disabled:shadow-none"
        disabled={!enough}
        onClick={handleAddToCart}
        type="button"
      >
        {enough ? "Add trip pack to cart" : "Choose 2 or more countries"}
      </button>
      <p aria-live="polite" className="mt-3 text-center text-base">
        {added > 0 ? (
          <>
            Added {added} sets to your cart.{" "}
            <Link
              className="font-semibold underline decoration-2 underline-offset-4"
              href="/cart"
            >
              View cart <span aria-hidden="true">→</span>
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
};

/** "2 countries: 15% off · 3+ countries: 25% off", for the tiers on offer. */
export const savingsSummary = availableTiers
  .filter((tier) => tier.discountPercent > 0)
  .map(
    (tier, index, tiers) =>
      `${tier.countries}${index === tiers.length - 1 ? "+" : ""} countries: ${tier.discountPercent}% off`
  )
  .join(" · ");
