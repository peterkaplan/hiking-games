"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { findCountry } from "@/content/catalogue";
import type { CartLine, FormatId } from "@/content/pricing";
import {
  bundleTiers,
  cartTotals,
  formatPrice,
  formats,
  priceOf,
} from "@/content/pricing";
import { buttonPrimary } from "./bits";
import {
  addToCart,
  removeFromCart,
  setCartFormat,
  useCart,
} from "./cart-store";
import { CountryPicker } from "./country-picker";
import { Flag } from "./flags";

/** "Add 1 more country to save 15%", or nothing at the top tier. */
const nextSaving = (count: number): string | null => {
  const next = bundleTiers.find((tier) => tier.countries > count);
  if (!next) {
    return null;
  }
  const more = next.countries - count;
  return `Add ${more} more ${more === 1 ? "country" : "countries"} to save ${next.discountPercent}% on everything.`;
};

const Line = ({ line }: { line: CartLine }) => {
  const country = findCountry(line.slug);
  const handleFormat = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const picked = formats.find((f) => f.id === event.currentTarget.value);
      if (picked) {
        setCartFormat(line.slug, picked.id);
      }
    },
    [line.slug]
  );
  const handleRemove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { slug } = event.currentTarget.dataset;
    if (slug) {
      removeFromCart(slug);
    }
  }, []);
  if (!country) {
    return null;
  }
  const selectId = `format-${line.slug}`;
  return (
    <li className="border-shop-ink grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 border-b py-5">
      <Flag
        className="border-shop-ink w-16 rounded-lg border-2"
        code={country.code}
      />
      <div className="min-w-0">
        <Link
          className="font-serif text-2xl leading-tight hover:underline"
          href={`/v2/${country.slug}`}
        >
          The {country.name} Set
        </Link>
        <p className="font-mono text-xs uppercase">
          {country.language} and English
        </p>
      </div>
      <p className="font-serif text-2xl">{formatPrice(priceOf(line.format))}</p>
      <div className="col-span-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <label className="sr-only" htmlFor={selectId}>
            Format for {country.name}
          </label>
          <select
            className="border-shop-ink bg-shop-panel focus-visible:outline-shop-ink rounded-full border-2 px-4 py-2 text-base focus-visible:outline-3 focus-visible:outline-offset-2"
            id={selectId}
            onChange={handleFormat}
            value={line.format}
          >
            {formats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="focus-visible:outline-shop-ink rounded-sm text-base underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-4"
          data-slug={line.slug}
          onClick={handleRemove}
          type="button"
        >
          Remove<span className="sr-only"> {country.name}</span>
        </button>
      </div>
    </li>
  );
};

export const CartView = () => {
  const lines = useCart();
  const [checkoutTried, setCheckoutTried] = useState(false);
  const totals = cartTotals(lines);
  const chosen = useMemo(() => lines.map((line) => line.slug), [lines]);
  const defaultFormat: FormatId =
    lines.at(-1)?.format ?? formats.at(0)?.id ?? "printed";

  const handleAdd = useCallback(
    (slug: string) => {
      addToCart([{ slug, format: defaultFormat }]);
    },
    [defaultFormat]
  );
  const handleCheckout = useCallback(() => {
    setCheckoutTried(true);
  }, []);

  if (lines.length === 0) {
    return (
      <div className="bg-shop-panel border-shop-ink rounded-[32px] border-2 p-8 text-center sm:p-14">
        <p className="font-serif text-3xl">Your cart is empty.</p>
        <p className="mt-3 text-xl">Where are you eating next?</p>
        <div className="mx-auto mt-6 max-w-md text-left">
          <CountryPicker
            exclude={chosen}
            label="Find your country"
            onAdd={handleAdd}
          />
        </div>
      </div>
    );
  }

  const saving = nextSaving(lines.length);
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <ul className="border-shop-ink border-t">
          {lines.map((line) => (
            <Line key={line.slug} line={line} />
          ))}
        </ul>
        <div className="mt-8">
          <h2 className="font-mono text-xs tracking-widest uppercase">
            Add another country
          </h2>
          {saving ? <p className="mt-2 text-base">{saving}</p> : null}
          <div className="mt-3">
            <CountryPicker
              exclude={chosen}
              label="Add another country"
              onAdd={handleAdd}
            />
          </div>
        </div>
      </div>

      <div className="bg-shop-panel border-shop-ink rounded-[28px] border-2 p-6 sm:p-8">
        <h2 className="font-serif text-3xl">Summary</h2>
        <dl className="mt-5 space-y-3">
          <div className="flex justify-between gap-4">
            <dt>
              {lines.length === 1 ? "1 country" : `${lines.length} countries`}
            </dt>
            <dd>{formatPrice(totals.subtotal)}</dd>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between gap-4">
              <dt>Trip pack: {totals.discountPercent}% off</dt>
              <dd>−{formatPrice(totals.discount)}</dd>
            </div>
          ) : null}
          <div className="border-shop-ink flex items-baseline justify-between gap-4 border-t pt-4">
            <dt className="font-semibold">Total</dt>
            <dd className="font-serif text-4xl">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
        <button
          className={`${buttonPrimary} mt-6 w-full justify-center`}
          onClick={handleCheckout}
          type="button"
        >
          Checkout
        </button>
        <p aria-live="polite" className="mt-3 text-center text-base">
          {checkoutTried
            ? "Checkout isn't connected yet. Your cart is saved on this device."
            : "Shipping is worked out at checkout."}
        </p>
      </div>
    </div>
  );
};

/** The cart icon's count in the header. */
export const CartCount = () => {
  const count = useCart().length;
  return (
    <>
      <span className="sr-only">
        Cart, {count === 1 ? "1 item" : `${count} items`}
      </span>
      <span
        aria-hidden="true"
        className="bg-shop-cta text-shop-on-cta absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full font-mono text-[10px]"
      >
        {count}
      </span>
    </>
  );
};
