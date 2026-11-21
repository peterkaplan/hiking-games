/**
 * "Us vs the alternatives" table, a common Shopify product-page section.
 * Keep comparisons fair: describe kinds of alternatives, not named brands.
 */

export type Mark = "yes" | "no" | "varies";

export interface ComparisonRow {
  feature: string;
  freeCard: Mark;
  translationApp: Mark;
  us: Mark;
}

export const comparisonColumns = {
  us: "Peanut Allergy Cards",
  freeCard: "Free printable card",
  translationApp: "Translation app",
} as const;

export const comparisonRows: readonly ComparisonRow[] = [
  {
    feature: "Written for peanut (oil, sauces, cross-contact)",
    us: "yes",
    freeCard: "varies",
    translationApp: "no",
  },
  {
    feature: "Asks the kitchen for a clear yes or no",
    us: "yes",
    freeCard: "varies",
    translationApp: "no",
  },
  {
    feature: "Checked by a native speaker",
    us: "yes",
    freeCard: "varies",
    translationApp: "no",
  },
  {
    feature: "Local ambulance number on the card",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Works with no signal",
    us: "yes",
    freeCard: "yes",
    translationApp: "varies",
  },
];
