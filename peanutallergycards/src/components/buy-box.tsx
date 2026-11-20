"use client";

import type { ChangeEvent } from "react";
import { useCallback, useId, useState } from "react";
import type { TranslationState } from "@/content/cards";
import type { FormatId } from "@/content/pricing";
import { formatPrice, formats } from "@/content/pricing";

/**
 * What the buy button says. It stays disabled until the cards are reviewed
 * and checkout is built: we never sell an unreviewed card.
 */
const buttonLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "Available once reviewed",
  ready: "Checkout coming soon",
};

const notReadyNote =
  "We only sell a card once a native speaker has checked the translation.";

export const BuyBox = ({ state }: { state: TranslationState }) => {
  const [formatId, setFormatId] = useState<FormatId>("digital");
  const radioName = useId();
  const price = formats.find((format) => format.id === formatId)?.priceUsd;
  const handleFormatChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const chosen = formats.find(
        (format) => format.id === event.currentTarget.value
      );
      if (chosen) {
        setFormatId(chosen.id);
      }
    },
    []
  );

  return (
    <div className="border-peanut-200 rounded-2xl border bg-white p-5 shadow-sm">
      <fieldset>
        <legend className="text-sm font-semibold">Choose a format</legend>
        <div className="mt-3 space-y-3">
          {formats.map((format) => (
            <label
              className="has-checked:border-ink has-checked:bg-peanut-50 has-checked:ring-ink flex cursor-pointer gap-3 rounded-xl border border-stone-200 p-4 transition has-checked:ring-1"
              key={format.id}
            >
              <input
                checked={format.id === formatId}
                className="accent-ink mt-1"
                name={radioName}
                onChange={handleFormatChange}
                type="radio"
                value={format.id}
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3 font-semibold">
                  <span>{format.name}</span>
                  <span>{formatPrice(format.priceUsd)}</span>
                </span>
                <span className="mt-1 block text-sm text-stone-600">
                  {format.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {price === undefined ? null : (
        <p className="mt-5 flex items-baseline justify-between">
          <span className="text-stone-600">Total</span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(price)}
          </span>
        </p>
      )}
      <button
        className="bg-ink mt-4 w-full rounded-full px-6 py-3.5 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-600"
        disabled
        type="button"
      >
        {buttonLabel[state]}
      </button>
      {state === "ready" ? null : (
        <p className="mt-3 text-center text-sm text-stone-600">
          {notReadyNote}
        </p>
      )}
    </div>
  );
};
