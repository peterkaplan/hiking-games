/**
 * "Us vs the alternatives" table, a common Shopify product-page section.
 * The first row is the headline difference and is shown largest.
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
    feature: "Made for peanuts only",
    us: "yes",
    freeCard: "varies",
    translationApp: "no",
  },
  {
    feature: "Covers shared sauces and cross-contamination",
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
    feature: "Works with no app and no wifi",
    us: "yes",
    freeCard: "yes",
    translationApp: "varies",
  },
];
