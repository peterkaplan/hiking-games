/**
 * "Us vs the alternatives" table, a common Shopify product-page section.
 * The first row is the headline difference and is shown largest.
 * "Other cards" means the typical generic allergy card. Rows are worded as
 * things our set does that a generic card does not; never name a brand here.
 * (The one page that names a competitor is equal-eats.ts.)
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
  freeCard: "Other cards",
  translationApp: "Translation app",
} as const;

export const comparisonRows: readonly ComparisonRow[] = [
  {
    feature: "Made for peanuts only",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Adapted to each country's cooking style and equipment",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Spells out shared sauces, woks and cross-contamination",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Ends with a yes-or-no question for the chef",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Every card checked by a native speaker",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Local ambulance number on the card",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "High-quality laminate, plus a copy for your phone",
    us: "yes",
    freeCard: "no",
    translationApp: "no",
  },
  {
    feature: "Comes with a local peanut guide",
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
