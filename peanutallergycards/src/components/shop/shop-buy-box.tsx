"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import type { TranslationState } from "@/content/cards";
import { catalogue, findCountry } from "@/content/catalogue";
import type { CartLine, FormatId } from "@/content/pricing";
import { cartTotals, formats } from "@/content/pricing";
import { CheckIcon } from "./bits";
import { addToCart } from "./cart-store";
import { CountryPicker } from "./country-picker";
import { FormatOptions, PriceLine } from "./format-options";
import { savingsSummary } from "./trip-pack-builder";

/** The buy button is only live once a destination's cards can be sold. */
const buttonLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "Available once reviewed",
  ready: "Add to cart",
};

export const BUY_BUTTON_ID = "buy-button";

/**
 * Choose a format, add any other countries on the trip, and put the lot in
 * the cart. `slug` is the country whose page this is.
 */
export const ShopBuyBox = ({
  slug,
  state,
}: {
  slug: string;
  state: TranslationState;
}) => {
  const [formatId, setFormatId] = useState<FormatId>(
    formats.at(0)?.id ?? "printed"
  );
  const [extras, setExtras] = useState<readonly string[]>([]);
  const [added, setAdded] = useState(0);

  const lines = useMemo<CartLine[]>(
    () => [slug, ...extras].map((item) => ({ slug: item, format: formatId })),
    [slug, extras, formatId]
  );
  const chosen = useMemo(() => [slug, ...extras], [slug, extras]);
  const totals = cartTotals(lines);

  const handleFormat = useCallback((format: FormatId) => {
    setFormatId(format);
    setAdded(0);
  }, []);
  const handleAddCountry = useCallback((country: string) => {
    setExtras((current) =>
      current.includes(country) ? current : [...current, country]
    );
    setAdded(0);
  }, []);
  const handleRemoveCountry = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const { slug: country } = event.currentTarget.dataset;
      setExtras((current) => current.filter((item) => item !== country));
      setAdded(0);
    },
    []
  );
  const handleAddToCart = useCallback(() => {
    addToCart(lines);
    setAdded(lines.length);
  }, [lines]);

  return (
    <div>
      <FormatOptions onChange={handleFormat} value={formatId} />

      <div className="mt-6" hidden={catalogue.length < 2}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-mono text-xs tracking-widest uppercase">
            Visiting more than one country?
          </p>
          <p className="bg-shop-highlight text-shop-on-highlight rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase">
            {savingsSummary}
          </p>
        </div>
        {extras.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {extras.map((item) => {
              const country = findCountry(item);
              return country ? (
                <li
                  className="bg-shop-selected border-shop-ink flex items-center gap-2 rounded-full border-2 py-1 pr-1 pl-4 text-base font-semibold"
                  key={item}
                >
                  {country.name}
                  <button
                    className="hover:bg-shop-panel focus-visible:outline-shop-ink grid size-7 place-items-center rounded-full focus-visible:outline-3"
                    data-slug={item}
                    onClick={handleRemoveCountry}
                    type="button"
                  >
                    <span aria-hidden="true">✕</span>
                    <span className="sr-only">Remove {country.name}</span>
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        ) : null}
        <div className="mt-3">
          <CountryPicker
            exclude={chosen}
            label="Add another country"
            onAdd={handleAddCountry}
          />
        </div>
      </div>

      <PriceLine
        compareAt={totals.compareAt}
        countries={lines.length}
        discountPercent={totals.discountPercent}
        total={totals.total}
      />

      <button
        className="bg-shop-cta disabled:bg-shop-panel disabled:text-shop-ink text-shop-on-cta mt-4 w-full rounded-full px-7 py-4 text-lg font-semibold shadow-[0_4px_0_0_var(--color-shop-ink)] disabled:cursor-not-allowed disabled:shadow-none"
        disabled={state !== "ready"}
        id={BUY_BUTTON_ID}
        onClick={handleAddToCart}
        type="button"
      >
        {buttonLabel[state]}
      </button>
      <p aria-live="polite" className="mt-3 text-center text-base">
        {added > 0 ? (
          <>
            Added {added === 1 ? "1 set" : `${added} sets`} to your cart.{" "}
            <Link
              className="font-semibold underline decoration-2 underline-offset-4"
              href="/v2/cart"
            >
              View cart <span aria-hidden="true">→</span>
            </Link>
          </>
        ) : null}
        {added === 0 && state !== "ready"
          ? "We only sell a card once a native speaker has checked it."
          : null}
      </p>

      <ul className="border-shop-ink mt-4 grid grid-cols-3 gap-3 border-y py-5 text-center text-sm">
        {[
          "Checked by a native speaker",
          "English on the back",
          "Works in Apple Wallet",
        ].map((item) => (
          <li className="flex flex-col items-center gap-2" key={item}>
            <CheckIcon className="size-6" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
