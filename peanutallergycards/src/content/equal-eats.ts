/**
 * "Equal Eats vs Peanut Allergy Cards": the comparison page's words.
 *
 * Rules for this page:
 * - Every fact about Equal Eats comes from equaleats.com, read on the date in
 *   CHECKED (notes in docs/research/2026-11-24-equal-eats-site.md). Re-read
 *   their site and change CHECKED and UPDATED before editing a fact.
 * - Written to win the search and the sale: we are the answer for peanut
 *   allergy, and the page says so. But every claim must be true. Nothing
 *   about their quality or safety, and nothing we can't point to on their
 *   own pages. Opinions are labelled as our verdict.
 * - This is the one place we name another brand. The product pages' table
 *   (comparison.ts) still doesn't.
 */

import { destinations } from "./cards";
import { productPath } from "./catalogue";
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

const YEAR = UPDATED.slice(0, 4);

/** The heading on the page. */
export const pageTitle =
  "Equal Eats Alternative for Peanut Allergy: Equal Eats vs Peanut Allergy Cards";

/** The short name, for the breadcrumb trail. */
export const crumbTitle = "Equal Eats alternative";

export const metaTitle = `Equal Eats Alternative for Peanut Allergy (${YEAR} Comparison)`;

export const metaDescription = `Looking for an Equal Eats alternative? Compare Equal Eats with Peanut Allergy Cards: wording, price, emergency card and formats. Peanut sets from ${DIGITAL}.`;

export const intro = `Equal Eats sells translation cards for every diet in 58 languages. Peanut Allergy Cards does one job: a peanut allergy card written for the country you're eating in. If your allergy is to peanuts, this is the Equal Eats alternative built for you. Here is the full comparison, updated for ${YEAR}.`;

/** Our opinion, shown as such, above everything else. */
export const verdict = {
  heading: "Our verdict",
  body: `For a peanut allergy in ${EITHER_COUNTRY}, Peanut Allergy Cards is the better buy. You get a chef card written for that country's kitchens, an emergency card and a local peanut guide for ${LAMINATED}. Equal Eats charges $18.99 for a single card and sells its emergency card separately.`,
  points: [
    "Written for the country's kitchens, not only its language",
    "Asks the chef for a clear yes or no",
    "Emergency card and peanut guide included",
    `Digital set from ${DIGITAL}. No app, no subscription`,
  ],
} as const;

export interface CompareRow {
  /** Who comes out ahead for a traveller with a peanut allergy: our view. */
  edge: "us" | "them" | "tie";
  equalEats: string;
  feature: string;
  us: string;
}

export const compareRows: readonly CompareRow[] = [
  {
    feature: "Made for",
    us: "Peanut allergy, and nothing else",
    equalEats: "Every allergy, celiac disease, intolerances and special diets",
    edge: "us",
  },
  {
    feature: "Card wording",
    us: "Written for each country's kitchens: the pans, the oil, the dishes where peanuts hide",
    equalEats: "One wording per language, used in every country that speaks it",
    edge: "us",
  },
  {
    feature: "The question it asks",
    us: "“Can the restaurant make 100% safe food for us?” A yes or no from the chef",
    equalEats: "“Does this food contain peanut?”",
    edge: "us",
  },
  {
    feature: "Emergency card",
    us: "Included, with the local ambulance number",
    equalEats: "Extra: a printable add-on, $7.99",
    edge: "us",
  },
  {
    feature: "Local peanut guide",
    us: "Included: how to say peanut and where it hides",
    equalEats: "Not included",
    edge: "us",
  },
  {
    feature: "Printed card",
    us: `${LAMINATED} for both cards, laminated, with the digital set free`,
    equalEats: "$18.99 for one plastic card",
    edge: "us",
  },
  {
    feature: "Digital card",
    us: `${DIGITAL} for both cards and the guide`,
    equalEats: "Printable PDF from $9.99. The English one is free",
    edge: "us",
  },
  {
    feature: "On your phone",
    us: "Phone images and an Apple Wallet pass. No app, no account, no subscription",
    equalEats: "An app for iPhone and Android, by subscription",
    edge: "us",
  },
  {
    feature: "Refunds",
    us: `Any reason, within ${REFUND_DAYS} days`,
    equalEats: "Within 14 days of your order arriving",
    edge: "tie",
  },
  {
    feature: "Translation checks",
    us: "Every card checked by a native speaker",
    equalEats: "Translator, proofreader, then a native-speaker review",
    edge: "tie",
  },
  {
    feature: "Shipping",
    us: "Free within the United States. Digital anywhere, straight away",
    equalEats: "Worldwide. Free to some countries on orders over $25",
    edge: "tie",
  },
  {
    feature: "More than one",
    us: `Up to ${maxSaving}% off when you add a second country`,
    equalEats: "20% off 2 cards, 25% off 3, 35% off 5",
    edge: "them",
  },
  {
    feature: "Where it works",
    us: `${COUNTRIES}, with more countries on the way`,
    equalEats: "58 languages",
    edge: "them",
  },
];

export const winsForUs = compareRows.filter((row) => row.edge === "us").length;

export interface CompareSection {
  heading: string;
  id: string;
  /** A link to the product this section is about. */
  link?: { href: string; label: string };
  paragraphs: readonly string[];
}

const productLink = (slug: string, label: string) => ({
  href: productPath(slug),
  label,
});

export const compareSections: readonly CompareSection[] = [
  {
    id: "why",
    heading: "Why travellers look for an Equal Eats alternative",
    paragraphs: [
      "Equal Eats is built to cover everyone: every allergen, every diet, 58 languages. That breadth is the product. If your only allergy is peanuts, you are buying a general card.",
      "Three things send peanut-allergic travellers looking for something else. The card is priced per language, so a two-country trip means two purchases. The emergency card costs extra. And the phone version is an app with a subscription.",
      `Peanut Allergy Cards starts from the other end: one allergy, one country at a time, everything in one set, from ${DIGITAL}.`,
    ],
  },
  {
    id: "wording",
    heading: "Equal Eats peanut allergy card vs ours: the wording",
    paragraphs: [
      "This is the difference that matters at the table. The Equal Eats peanut allergy translation card says you have a peanut allergy, lists foods peanuts can be found in, asks for clean utensils, cookware and frying oil, and ends with “Does this food contain peanut?” The same wording is used wherever that language is spoken.",
      "A waiter can answer that question with a guess. Ours is harder to dodge. The chef card names the things that actually cause reactions in that country's kitchens, then asks the chef one question: can you make this meal safe, yes or no? If they aren't sure, the card tells them to say no.",
      "A translated card tells the kitchen what you can't eat. A card written for the kitchen tells them what to do about it.",
    ],
  },
  {
    id: "thailand",
    heading: "The best peanut allergy card for Thailand",
    paragraphs: [
      "Thai food is where a general allergy card struggles. Peanuts are pounded into som tam in a shared mortar, ground into curry pastes and satay sauce, and fried in woks that cooked the dish before yours.",
      "Our Thai peanut allergy card says exactly that, in Thai: use a clean wok and fresh oil, and never a mortar and pestle that has been used for peanuts. The set includes an emergency card with Thailand's ambulance number and a guide to the dishes where peanuts hide.",
    ],
    link: productLink("thailand", "See the Thai peanut allergy cards"),
  },
  {
    id: "japan",
    heading: "The best peanut allergy card for Japan",
    paragraphs: [
      "In Japan the challenge is different: few kitchens work in English, and a spoken explanation gets lost between the table and the chef. A card in Japanese that asks for a firm yes or no, and asks the kitchen to say no if it isn't sure, gets you a real answer.",
      "Our Japanese peanut allergy cards went to Tokyo and Kyoto with us. We handed the same card over at every meal and wrote up the restaurants that said yes.",
    ],
    link: productLink("japan", "See the Japanese peanut allergy cards"),
  },
  {
    id: "price",
    heading: "Equal Eats pricing vs Peanut Allergy Cards pricing",
    paragraphs: [
      "Equal Eats: $18.99 for one plastic card in one language. The printable emergency card is another $7.99, or half that as an add-on. Printable cards start at $9.99. The app is a subscription.",
      `Peanut Allergy Cards: ${LAMINATED} for the laminated chef card and emergency card, with the peanut guide and the digital set included. The digital set alone is ${DIGITAL}. Pay once. Add a second country and save up to ${maxSaving}%.`,
      "Like for like, a chef card plus an emergency card costs less with us, and the guide is free.",
    ],
  },
  {
    id: "app",
    heading: "Equal Eats app vs a card in Apple Wallet",
    paragraphs: [
      "The Equal Eats app keeps your cards on iPhone or Android and shares them with your family. It is a subscription, and you need the app installed and signed in.",
      "Our digital set is three files: images for your camera roll, an Apple Wallet pass and a print-ready PDF. No app, no account, no subscription, no wifi at the table. Hand over your phone or the laminated card and you're done.",
    ],
  },
  {
    id: "worth-it",
    heading: "Is Equal Eats worth it?",
    paragraphs: [
      "For some travellers, yes. If you have several allergies, celiac disease or a special diet, or you're going somewhere we don't cover yet, Equal Eats is a well-established choice with 58 languages.",
      `For a peanut allergy in ${EITHER_COUNTRY}, you get more for less here: a card written for those kitchens, the emergency card, the guide, and nothing to subscribe to.`,
      "Whichever card you carry, it helps you explain your allergy. It can't guarantee a safe meal. Always carry your medication, and walk away if the answer isn't a clear yes.",
    ],
  },
];

export const equalEatsFaq: readonly FaqItem[] = [
  {
    question: "What is the best Equal Eats alternative for peanut allergy?",
    answer: `Peanut Allergy Cards. It makes cards only for peanut allergy, written for how each country cooks. Each set has a chef card, an emergency card and a local peanut guide, from ${DIGITAL}, with no app or subscription. It covers ${COUNTRIES} today.`,
  },
  {
    question: "Is Peanut Allergy Cards cheaper than Equal Eats?",
    answer: `For a chef card plus an emergency card, yes. Our laminated set with both cards is ${LAMINATED} and our digital set is ${DIGITAL}. When we checked on ${CHECKED}, one Equal Eats plastic card was $18.99 and its printable emergency card was $7.99 extra.`,
  },
  {
    question: "How much does an Equal Eats card cost?",
    answer: `When we checked on ${CHECKED}, an Equal Eats plastic card was $18.99, printable cards started at $9.99, and the English printable was free. Their printable emergency card was $7.99, and their app is a subscription.`,
  },
  {
    question: "What is the best peanut allergy translation card for Thailand?",
    answer:
      "One written for Thai kitchens. Our Thai peanut allergy card asks for a clean wok and fresh oil and rules out a mortar and pestle used for peanuts, then asks the chef for a clear yes or no. It comes with an emergency card and a guide to Thai dishes where peanuts hide.",
  },
  {
    question: "What is the best peanut allergy translation card for Japan?",
    answer:
      "One that gets a firm answer. Our Japanese peanut allergy card asks the chef for a clear yes or no, and asks the kitchen to say no if it isn't sure. It comes with an emergency card carrying Japan's ambulance number.",
  },
  {
    question: "Is Equal Eats legit?",
    answer:
      "Yes. Equal Eats, formerly Allergy Translation, says it has sold dietary translation cards for 20 years. This page compares what each company sells; it doesn't question their cards.",
  },
  {
    question: "Do I need an app to use an allergy translation card?",
    answer:
      "No. Our cards are images on your phone, an Apple Wallet pass and a PDF, or a laminated card in your wallet. They open without an app, an account or wifi.",
  },
  {
    question: "Is a translation app as good as a peanut allergy card?",
    answer:
      "No. A translation app turns your words into another language. It doesn't know that “I can die” has to read as serious, or which pans a kitchen shares. A card checked by a native speaker says the same thing every time, and it works when your phone has no signal.",
  },
  {
    question: "Can I use Equal Eats and Peanut Allergy Cards together?",
    answer:
      "Yes. If your trip includes a country we don't cover yet, carry ours where we do and an Equal Eats card for the rest.",
  },
];
