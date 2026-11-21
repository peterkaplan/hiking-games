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
 * Multi-country savings: the more countries in the cart, the bigger the
 * discount on all of them. PLACEHOLDER discounts, like the prices above.
 */
export interface BundleTier {
  /** The smallest number of countries that earns this discount. */
  countries: number;
  discountPercent: number;
  /** Short badge, e.g. "Save 15%". */
  tag?: string;
}

export const bundleTiers: readonly BundleTier[] = [
  { countries: 1, discountPercent: 0 },
  { countries: 2, discountPercent: 15, tag: "Save 15%" },
  { countries: 3, discountPercent: 25, tag: "Save 25%" },
];

/** The discount for this many countries: the best tier they reach. */
export const discountPercentFor = (countries: number): number =>
  Math.max(
    0,
    ...bundleTiers
      .filter((tier) => countries >= tier.countries)
      .map((tier) => tier.discountPercent)
  );

/** One country's set in the cart. */
export interface CartLine {
  format: FormatId;
  /** Catalogue slug, e.g. "italy". */
  slug: string;
}

export const priceOf = (formatId: FormatId): number =>
  formats.find((format) => format.id === formatId)?.priceUsd ?? 0;

export interface CartTotals {
  discount: number;
  discountPercent: number;
  subtotal: number;
  total: number;
}

/** What a set of cart lines costs, with the multi-country discount applied. */
export const cartTotals = (lines: readonly CartLine[]): CartTotals => {
  const subtotal = lines.reduce((sum, line) => sum + priceOf(line.format), 0);
  const discountPercent = discountPercentFor(lines.length);
  const discount = Math.round((subtotal * discountPercent) / 100);
  return { subtotal, discountPercent, discount, total: subtotal - discount };
};
