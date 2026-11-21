/**
 * What we sell for each destination, and for how much.
 *
 * PLACEHOLDER PRICES: not decided yet (see "Open questions" in
 * docs/strategy.md). Picked from the competitor research: digital allergy
 * cards sell for about $6–10 on Etsy, a printed card for about $19.
 */

export type FormatId = "digital" | "printed";

export interface Format {
  description: string;
  id: FormatId;
  name: string;
  priceUsd: number;
}

/** The first format is the one selected when the page opens. */
export const formats: readonly Format[] = [
  {
    id: "printed",
    name: "Laminated cards + digital",
    description:
      "Both cards printed double-sided, laminated and posted to you. The digital set comes free.",
    priceUsd: 18,
  },
  {
    id: "digital",
    name: "Digital only",
    description:
      "Both cards for your phone and Apple Wallet, plus a print-ready PDF.",
    priceUsd: 8,
  },
];

export const lowestPriceUsd = Math.min(
  ...formats.map((format) => format.priceUsd)
);

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number): string => usd.format(amount);

/**
 * Multi-country savings ("quantity breaks", as Shopify stores do them).
 * PLACEHOLDER discounts, like the prices above.
 */
export interface BundleTier {
  countries: number;
  discountPercent: number;
  label: string;
  /** Short badge shown on the option, e.g. "Save 15%". */
  tag?: string;
}

export const bundleTiers: readonly BundleTier[] = [
  { countries: 1, discountPercent: 0, label: "1 country" },
  { countries: 2, discountPercent: 15, label: "2 countries", tag: "Save 15%" },
  { countries: 3, discountPercent: 25, label: "3 countries", tag: "Save 25%" },
];

/** Price before and after the multi-country discount. */
export const bundlePrice = (
  unitPriceUsd: number,
  tier: BundleTier
): { full: number; total: number } => {
  const full = unitPriceUsd * tier.countries;
  return {
    full,
    total: Math.round(full * (1 - tier.discountPercent / 100)),
  };
};
