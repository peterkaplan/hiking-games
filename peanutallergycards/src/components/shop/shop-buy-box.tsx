"use client";

import type { ChangeEvent } from "react";
import { useCallback, useId, useState } from "react";
import type { TranslationState } from "@/content/cards";
import type { FormatId } from "@/content/pricing";
import {
  bundlePrice,
  bundleTiers,
  formatPrice,
  formats,
} from "@/content/pricing";
import { CheckIcon } from "./bits";

/** The buy button stays disabled until a destination is reviewed and checkout exists. */
const buttonLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "Available once reviewed",
  ready: "Add to cart",
};

const formatTag: Record<FormatId, string> = {
  digital: "Instant",
  printed: "+ digital",
};

const optionClass =
  "relative flex cursor-pointer flex-col rounded-2xl border-2 border-shop-ink/20 bg-white p-4 transition hover:border-shop-ink/60 has-checked:border-shop-ink has-checked:bg-shop-mint/50 has-focus-visible:outline-3 has-focus-visible:outline-shop-yes has-focus-visible:outline-offset-2";

export const BUY_BUTTON_ID = "buy-button";

export const ShopBuyBox = ({ state }: { state: TranslationState }) => {
  const [formatId, setFormatId] = useState<FormatId>("digital");
  const [countries, setCountries] = useState(1);
  const formatName = useId();
  const tierName = useId();

  const unitPrice =
    formats.find((format) => format.id === formatId)?.priceUsd ?? 0;
  const tier =
    bundleTiers.find((option) => option.countries === countries) ??
    bundleTiers[0];
  const price = tier ? bundlePrice(unitPrice, tier) : undefined;

  const handleFormat = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const chosen = formats.find((f) => f.id === event.currentTarget.value);
    if (chosen) {
      setFormatId(chosen.id);
    }
  }, []);
  const handleTier = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCountries(Number(event.currentTarget.value));
  }, []);

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
              <span className="bg-shop-ink text-shop-cream absolute -top-3 right-3 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase">
                {formatTag[format.id]}
              </span>
              <span className="font-semibold">{format.name}</span>
              <span className="text-shop-ink/70 mt-1 text-base">
                {formatPrice(format.priceUsd)} per country
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-mono text-xs tracking-widest uppercase">
          Countries
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {bundleTiers.map((option) => (
            <label
              className={`${optionClass} items-center text-center`}
              key={option.countries}
            >
              <input
                checked={option.countries === countries}
                className="sr-only"
                name={tierName}
                onChange={handleTier}
                type="radio"
                value={option.countries}
              />
              {option.tag ? (
                <span className="bg-shop-sun absolute -top-3 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase">
                  {option.tag}
                </span>
              ) : null}
              <span className="font-serif text-3xl">{option.countries}</span>
              <span className="text-shop-ink/70 text-sm">
                {option.countries === 1 ? "country" : "countries"}
              </span>
            </label>
          ))}
        </div>
        {countries > 1 ? (
          <p className="text-shop-ink/70 mt-3 text-base">
            You&apos;ll choose the other countries at checkout.
          </p>
        ) : null}
      </fieldset>

      {price ? (
        <p className="mt-7 flex items-baseline gap-3">
          <span className="font-serif text-4xl">
            {formatPrice(price.total)}
          </span>
          {price.total < price.full ? (
            <span className="text-shop-ink/50 text-xl line-through">
              {formatPrice(price.full)}
            </span>
          ) : null}
        </p>
      ) : null}

      <button
        className="bg-shop-yes disabled:bg-shop-sand disabled:text-shop-ink/60 mt-4 w-full rounded-full px-7 py-4 text-lg font-semibold text-white shadow-[0_4px_0_0_var(--color-shop-yes-dark)] disabled:cursor-not-allowed disabled:shadow-none"
        disabled
        id={BUY_BUTTON_ID}
        type="button"
      >
        {buttonLabel[state]}
      </button>
      {state === "ready" ? null : (
        <p className="text-shop-ink/70 mt-3 text-center text-base">
          We only sell a card once a native speaker has checked it.
        </p>
      )}

      <ul className="border-shop-ink/15 mt-7 grid grid-cols-3 gap-3 border-y py-5 text-center text-sm">
        {[
          "Checked by a native speaker",
          "English on the back",
          "Works offline",
        ].map((item) => (
          <li className="flex flex-col items-center gap-2" key={item}>
            <CheckIcon className="text-shop-yes size-6" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
