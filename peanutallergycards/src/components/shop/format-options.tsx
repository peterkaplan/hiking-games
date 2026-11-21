"use client";

import type { ChangeEvent } from "react";
import { useCallback, useId } from "react";
import type { FormatId } from "@/content/pricing";
import { formatPrice, formats } from "@/content/pricing";

const formatTag: Record<FormatId, string> = {
  digital: "Instant",
  printed: "Digital free",
};

export const optionClass =
  "relative flex cursor-pointer flex-col rounded-2xl border-2 border-shop-ink bg-shop-panel p-4 transition hover:border-shop-ink has-checked:border-shop-ink has-checked:bg-shop-selected has-focus-visible:outline-3 has-focus-visible:outline-shop-ink has-focus-visible:outline-offset-2";

/** Laminated + digital, or digital only. */
export const FormatOptions = ({
  onChange,
  value,
}: {
  onChange: (format: FormatId) => void;
  value: FormatId;
}) => {
  const name = useId();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const picked = formats.find((f) => f.id === event.currentTarget.value);
      if (picked) {
        onChange(picked.id);
      }
    },
    [onChange]
  );
  return (
    <fieldset>
      <legend className="font-mono text-xs tracking-widest uppercase">
        Format
      </legend>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {formats.map((format) => (
          <label className={optionClass} key={format.id}>
            <input
              checked={format.id === value}
              className="sr-only"
              name={name}
              onChange={handleChange}
              type="radio"
              value={format.id}
            />
            <span className="bg-shop-ink text-shop-bg absolute -top-3 right-3 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase">
              {formatTag[format.id]}
            </span>
            <span className="font-semibold">{format.name}</span>
            <span className="text-shop-ink mt-1 text-base">
              {formatPrice(format.priceUsd)}{" "}
              {format.compareAtUsd ? (
                <s>
                  <span className="sr-only">instead of </span>
                  {formatPrice(format.compareAtUsd)}
                </s>
              ) : null}{" "}
              per country
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

/** The total, its struck-through full price and the trip-pack saving. */
export const PriceLine = ({
  compareAt,
  countries,
  discountPercent,
  total,
}: {
  compareAt: number;
  countries: number;
  discountPercent: number;
  total: number;
}) => (
  <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
    <span className="font-serif text-4xl">{formatPrice(total)}</span>
    {compareAt > total ? (
      <s className="text-shop-ink text-xl">
        <span className="sr-only">instead of </span>
        {formatPrice(compareAt)}
      </s>
    ) : null}
    {discountPercent > 0 ? (
      <span className="bg-shop-highlight text-shop-on-highlight rounded-full px-2.5 py-0.5 font-mono text-xs uppercase">
        {discountPercent}% off {countries} countries
      </span>
    ) : null}
  </p>
);
