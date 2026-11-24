/**
 * "Equal Eats vs Peanut Allergy Cards": the comparison page's words.
 *
 * Rules for this page:
 * - Every fact about Equal Eats comes from equaleats.com, read on the date in
 *   CHECKED (notes in docs/research/2026-11-24-equal-eats-site.md). Re-read
 *   their site and change CHECKED and UPDATED before editing a fact.
 * - Be fair. Say plainly where they are the better choice. No claims about
 *   their quality, and nothing we can't point to on their own pages.
 * - This is the one place we name another brand. The product pages' table
 *   (comparison.ts) still doesn't.
 */

import { destinations } from "./cards";
import type { FaqItem } from "./faq";
import { formatPrice, formats, maxSaving } from "./pricing";
import { REFUND_DAYS } from "./shipping";

export const EQUAL_EATS_PATH = "/equal-eats-alternative";

export const PUBLISHED = "2026-11-24";
export const UPDATED = "2026-11-24";
/** When Equal Eats' site was last read, as shown on the page. */
export const CHECKED = "24 November 2026";

const priceOf = (id: "digital" | "printed"): string =>
  formatPrice(formats.find((format) => format.id === id)?.priceUsd ?? 0);

const LAMINATED = priceOf("printed");
const DIGITAL = priceOf("digital");

const countryNames = destinations.map((destination) => destination.country);
const COUNTRIES = new Intl.ListFormat("en", { type: "conjunction" }).format(
  countryNames
);
const EITHER_COUNTRY = new Intl.ListFormat("en", {
  type: "disjunction",
}).format(countryNames);

export const pageTitle = "Equal Eats vs Peanut Allergy Cards";

export const metaTitle = "Equal Eats vs Peanut Allergy Cards: Compared";

export const metaDescription =
  "Equal Eats or Peanut Allergy Cards? An honest comparison of the two allergy translation cards: wording, price, languages, formats and who each one suits.";

export const intro =
  "Both are allergy translation cards you hand to a waiter abroad. Equal Eats covers every allergy in 58 languages. We make one thing: peanut allergy cards written for how each country cooks. Here is how they compare, and which one fits your trip.";

export interface Verdict {
  heading: string;
  points: readonly string[];
}

export const verdicts: readonly Verdict[] = [
  {
    heading: "Choose Peanut Allergy Cards if",
    points: [
      "your allergy is to peanuts",
      `you're eating in ${EITHER_COUNTRY}`,
      "you want a card written for that country's kitchens, not only its language",
      "you want the chef card, the emergency card and a local peanut guide in one set",
    ],
  },
  {
    heading: "Choose Equal Eats if",
    points: [
      "you have another allergy, celiac disease or a special diet",
      "you need several allergens on one card",
      "you're going somewhere we don't cover yet",
      "you'd like an app, or a plastic card posted outside the United States",
    ],
  },
];

export interface CompareRow {
  equalEats: string;
  feature: string;
  us: string;
}

export const compareRows: readonly CompareRow[] = [
  {
    feature: "Made for",
    us: "Peanut allergy only",
    equalEats: "Food allergies, celiac disease, intolerances and special diets",
  },
  {
    feature: "Where it works",
    us: `${COUNTRIES}, with more countries on the way`,
    equalEats: "58 languages",
  },
  {
    feature: "Card wording",
    us: "Written for each country's kitchens: the pans, the oil, the dishes where peanuts hide",
    equalEats: "One wording per language, used in every country that speaks it",
  },
  {
    feature: "The question it asks",
    us: "“Can the restaurant make 100% safe food for us?” A yes or no from the chef",
    equalEats: "“Does this food contain peanut?”",
  },
  {
    feature: "Emergency card",
    us: "Included, with the local ambulance number",
    equalEats: "Sold separately: a printable add-on, $7.99",
  },
  {
    feature: "Local peanut guide",
    us: "Included: how to say peanut and where it hides",
    equalEats: "Not included",
  },
  {
    feature: "Printed card",
    us: `${LAMINATED} for both cards, laminated, with the digital set free`,
    equalEats: "$18.99 for one plastic card",
  },
  {
    feature: "Digital card",
    us: `${DIGITAL} for both cards and the guide`,
    equalEats: "Printable PDF from $9.99. The English one is free",
  },
  {
    feature: "On your phone",
    us: "Phone images and an Apple Wallet pass. No app, no account",
    equalEats: "An app for iPhone and Android, by subscription",
  },
  {
    feature: "More than one",
    us: `Up to ${maxSaving}% off when you add a second country`,
    equalEats: "20% off 2 cards, 25% off 3, 35% off 5",
  },
  {
    feature: "Translation checks",
    us: "Every card checked by a native speaker",
    equalEats:
      "Professional translator, proofreader, then a native-speaker review",
  },
  {
    feature: "Shipping",
    us: "Free within the United States. Digital anywhere, straight away",
    equalEats: "Worldwide. Free to some countries on orders over $25",
  },
  {
    feature: "Refunds",
    us: `Any reason, within ${REFUND_DAYS} days`,
    equalEats: "Within 14 days of your order arriving",
  },
];

export interface CompareSection {
  heading: string;
  id: string;
  paragraphs: readonly string[];
}

export const compareSections: readonly CompareSection[] = [
  {
    id: "wording",
    heading: "The card itself: translated, or written for the kitchen?",
    paragraphs: [
      "This is the real difference. An Equal Eats peanut allergy card says you have a peanut allergy, lists foods peanuts can be found in, asks the kitchen to use clean utensils, cookware and frying oil, and ends with “Does this food contain peanut?” The same wording is used wherever that language is spoken.",
      "Our chef card is written country by country. The Thai card asks for a clean wok and fresh oil, and tells the kitchen never to use a mortar and pestle that has been used for peanuts, because that is where peanuts get into Thai food. Then it asks the chef one question: can you make this meal safe, yes or no? If they're not sure, the card asks them to say no.",
      "If you want one card that covers many allergens anywhere, theirs does that. If you want a card that talks to a Thai or Japanese kitchen about peanuts in its own terms, that's what we make.",
    ],
  },
  {
    id: "price",
    heading: "Price: Equal Eats vs Peanut Allergy Cards",
    paragraphs: [
      "An Equal Eats plastic card is $18.99. That is one card, in one language. Their printable emergency card is a separate $7.99, or half that when you add it to a plastic card. Printable cards start at $9.99, and the English printable is free. Their app is a subscription.",
      `Our laminated set is ${LAMINATED}. That is the chef card, the emergency card and the local peanut guide, and the digital set comes free with it. The digital set on its own is ${DIGITAL}. There is no subscription.`,
    ],
  },
  {
    id: "languages",
    heading: "Languages and countries",
    paragraphs: [
      "Equal Eats wins on reach: 58 languages, from Albanian to Vietnamese. If you're travelling somewhere we don't cover, buy theirs.",
      `We cover ${COUNTRIES} today and add countries one at a time, because each card is researched and written for that country's food before it is translated.`,
    ],
  },
  {
    id: "formats",
    heading: "Plastic, printable, app or wallet",
    paragraphs: [
      "Equal Eats sells a credit-card-size plastic card, a printable PDF, and an app for iPhone and Android with family sharing.",
      "We sell laminated cards and a digital set: images for your phone, an Apple Wallet pass and a print-ready PDF. There's no app to download and no account to make. Nothing needs wifi at the table.",
    ],
  },
  {
    id: "translation",
    heading: "Who checks the translations?",
    paragraphs: [
      "Equal Eats describes a three-step process: professional translators, then proofreaders, then third-party native speakers.",
      "Every one of our cards is checked by a native speaker, with English on the back so you always know what you're showing.",
      "Whichever card you carry, it helps you explain your allergy. It can't guarantee a safe meal. Always carry your medication, and walk away if the answer isn't a clear yes.",
    ],
  },
];

export const equalEatsFaq: readonly FaqItem[] = [
  {
    question: "Is there an alternative to Equal Eats for peanut allergy?",
    answer: `Yes. Peanut Allergy Cards makes cards only for peanut allergy, written for how each country cooks. Each set has a chef card, an emergency card and a local peanut guide, from ${DIGITAL}. We cover ${COUNTRIES} today.`,
  },
  {
    question: "How much does an Equal Eats card cost?",
    answer: `When we checked on ${CHECKED}, an Equal Eats plastic card was $18.99, printable cards started at $9.99, and the English printable was free. Their printable emergency card was $7.99. Check their website for current prices.`,
  },
  {
    question: "What is the best peanut allergy translation card?",
    answer: `It depends on where you're going. For ${COUNTRIES}, our cards are written for those kitchens and ask the chef for a clear yes or no. For other countries, or for allergies other than peanut, Equal Eats covers 58 languages.`,
  },
  {
    question: "Does Peanut Allergy Cards have an app?",
    answer:
      "No, on purpose. Your cards are images on your phone, an Apple Wallet pass and a PDF. They open without an app, an account or wifi.",
  },
  {
    question: "Can I use both?",
    answer:
      "Yes. Plenty of travellers carry more than one card. If your trip includes a country we don't cover, take ours where we do and an Equal Eats card for the rest.",
  },
  {
    question: "Can I just use a translation app?",
    answer:
      "A translation app turns your words into another language. It doesn't know that “I can die” has to read as serious, or which pans a kitchen shares. A card that a native speaker has checked says the same thing every time, and it works when your phone has no signal.",
  },
];
