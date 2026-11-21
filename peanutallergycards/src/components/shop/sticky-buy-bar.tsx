"use client";

import { useEffect, useState } from "react";

/**
 * A bar that slides up once the main buy button has scrolled out of view,
 * so the price and a way back to it are always at hand.
 */
export const StickyBuyBar = ({
  buyButtonId,
  priceLabel,
  title,
}: {
  buyButtonId: string;
  priceLabel: string;
  title: string;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(`#${buyButtonId}`);
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        // Show only after the button has scrolled up past the viewport.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [buyButtonId]);

  return (
    <div
      className={`border-shop-ink bg-shop-cream fixed inset-x-0 bottom-0 z-40 border-t-2 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      inert={!visible}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate font-serif text-xl">{title}</p>
          <p className="text-shop-ink font-mono text-sm">{priceLabel}</p>
        </div>
        <a
          className="bg-shop-ink text-shop-cream hover:bg-shop-accent hover:text-shop-ink shrink-0 rounded-full px-6 py-3 font-semibold"
          href={`#${buyButtonId}`}
        >
          Choose options
        </a>
      </div>
    </div>
  );
};
