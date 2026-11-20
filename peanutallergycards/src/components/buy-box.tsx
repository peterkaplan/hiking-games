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
    <div className="px-frame-raised bg-white p-5">
      <fieldset>
        <legend className="font-pixel text-lg">Pick a format</legend>
        <div className="mt-4 space-y-5">
          {formats.map((format) => (
            <label
              className="px-frame bg-paper has-checked:bg-butter has-focus-visible:outline-ink flex cursor-pointer gap-3 p-4 has-focus-visible:outline-3 has-focus-visible:outline-offset-8 has-focus-visible:outline-dashed"
              key={format.id}
            >
              <input
                checked={format.id === formatId}
                className="border-ink checked:bg-go mt-1 size-5 shrink-0 cursor-pointer appearance-none border-[3px] bg-white"
                name={radioName}
                onChange={handleFormatChange}
                type="radio"
                value={format.id}
              />
              <span className="flex-1">
                <span className="font-pixel flex items-baseline justify-between gap-3 text-lg">
                  <span>{format.name}</span>
                  <span>{formatPrice(format.priceUsd)}</span>
                </span>
                <span className="mt-1 block">{format.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {price === undefined ? null : (
        <p className="mt-6 flex items-baseline justify-between">
          <span className="font-pixel text-lg">Total</span>
          <span className="px-pop font-pixel text-4xl" key={price}>
            {formatPrice(price)}
          </span>
        </p>
      )}
      <button
        className="px-btn mt-5 w-full justify-center"
        disabled
        type="button"
      >
        {buttonLabel[state]}
      </button>
      {state === "ready" ? null : (
        <p className="mt-4 text-center">{notReadyNote}</p>
      )}
    </div>
  );
};
