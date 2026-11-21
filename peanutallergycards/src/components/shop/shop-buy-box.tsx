"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useId, useMemo, useState } from "react";
import type { TranslationState } from "@/content/cards";
import { catalogue, findCountry } from "@/content/catalogue";
import type { CartLine, FormatId } from "@/content/pricing";
import {
  availableTiers,
  cartTotals,
  formatPrice,
  formats,
} from "@/content/pricing";
import { CheckIcon } from "./bits";
import { addToCart } from "./cart-store";
import { CountryPicker } from "./country-picker";
import { Flag } from "./flags";

/** The buy button is only live once a destination's cards can be sold. */
const buttonLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "Available once reviewed",
  ready: "Add to cart",
};

const formatTag: Record<FormatId, string> = {
  digital: "Instant",
  printed: "Digital free",
};

const optionClass =
  "relative flex cursor-pointer flex-col rounded-2xl border-2 border-shop-ink bg-shop-panel p-4 transition hover:border-shop-ink has-checked:border-shop-ink has-checked:bg-shop-selected has-focus-visible:outline-3 has-focus-visible:outline-shop-ink has-focus-visible:outline-offset-2";

const savings = availableTiers
  .filter((tier) => tier.discountPercent > 0)
  .map(
    (tier, index, tiers) =>
      `${tier.countries}${index === tiers.length - 1 ? "+" : ""} countries: ${tier.discountPercent}% off`
  )
  .join(" · ");

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
  const formatName = useId();

  const lines = useMemo<CartLine[]>(
    () => [slug, ...extras].map((item) => ({ slug: item, format: formatId })),
    [slug, extras, formatId]
  );
  const chosen = useMemo(() => [slug, ...extras], [slug, extras]);
  const totals = cartTotals(lines);

  const handleFormat = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const picked = formats.find((f) => f.id === event.currentTarget.value);
    if (picked) {
      setFormatId(picked.id);
      setAdded(0);
    }
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
      <fieldset>
        <legend className="font-mono text-xs tracking-widest uppercase">
          Format
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {formats.map((format) => (
            <label className={optionClass} key={format.id}>
              <input
                checked={format.id === formatId}
                className="sr-only"
                name={formatName}
                onChange={handleFormat}
                type="radio"
                value={format.id}
              />
              <span className="bg-shop-ink text-shop-bg absolute -top-3 right-3 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase">
                {formatTag[format.id]}
              </span>
              <span className="font-semibold">{format.name}</span>
              <span className="text-shop-ink mt-1 text-base">
                {formatPrice(format.priceUsd)} per country
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6" hidden={catalogue.length < 2}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-mono text-xs tracking-widest uppercase">
            Visiting more than one country?
          </h3>
          <p className="bg-shop-highlight text-shop-on-highlight rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase">
            {savings}
          </p>
        </div>
        {extras.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {extras.map((item) => {
              const country = findCountry(item);
              return country ? (
                <li
                  className="bg-shop-selected border-shop-ink flex items-center gap-2 rounded-full border-2 py-1 pr-1 pl-2 text-base font-semibold"
                  key={item}
                >
                  <Flag
                    className="border-shop-ink h-5 w-auto rounded-sm border"
                    code={country.code}
                  />
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

      <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-4xl">{formatPrice(totals.total)}</span>
        {totals.discount > 0 ? (
          <>
            <span className="text-shop-ink text-xl line-through">
              {formatPrice(totals.subtotal)}
            </span>
            <span className="bg-shop-highlight text-shop-on-highlight rounded-full px-2.5 py-0.5 font-mono text-xs uppercase">
              {totals.discountPercent}% off {lines.length} countries
            </span>
          </>
        ) : null}
      </p>

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
