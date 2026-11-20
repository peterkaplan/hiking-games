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

export const formats: readonly Format[] = [
  {
    id: "digital",
    name: "Digital download",
    description:
      "Print-ready PDF of both cards, plus phone-sized images to show on your screen.",
    priceUsd: 8,
  },
  {
    id: "printed",
    name: "Printed and laminated",
    description:
      "Both cards printed double-sided, laminated and posted to you. Includes the digital download.",
    priceUsd: 18,
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
