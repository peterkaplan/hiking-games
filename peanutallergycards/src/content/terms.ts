/**
 * Terms of use. Not card text, but it sets what we promise about the cards,
 * so keep it accurate, non-medical and in step with the Disclaimer and FAQ.
 *
 * DRAFT, NOT YET REVIEWED BY A LAWYER. Still to add once decided (see
 * docs/roadmap.md): the legal name of the business, the governing law, and
 * the refunds and shipping terms. Bump TERMS_UPDATED whenever the wording
 * changes.
 */

import { CONTACT_EMAIL } from "./contact";

export const TERMS_UPDATED = "24 November 2026";

export const termsIntro =
  "These terms apply when you use this website or buy our cards. By ordering, you agree to them.";

/** The three points nobody should miss, shown above the full terms. */
export const termsSummary: readonly string[] = [
  "Our cards help you explain your allergy. They can't guarantee that a meal is safe.",
  "Always carry your prescribed medication and follow your doctor's allergy plan.",
  "If a restaurant hesitates, or you're not sure, don't eat there.",
];

export interface TermsSection {
  heading: string;
  /** A bulleted list, shown after the paragraphs. */
  list?: readonly string[];
  paragraphs: readonly string[];
}

export const termsSections: readonly TermsSection[] = [
  {
    heading: "What the cards do",
    paragraphs: [
      "Our cards are a communication aid. They tell restaurant staff about your peanut allergy in their own language and ask whether the kitchen can cook for you.",
      "They are not a guarantee. We don't control how a restaurant reads the card, what it answers, or how it prepares your food. A “yes” from the kitchen is the restaurant's answer, not ours.",
      "The decision to eat is always yours.",
    ],
  },
  {
    heading: "Not medical advice",
    paragraphs: [
      "Nothing on this website or on our cards is medical advice. The cards don't replace your epinephrine, your medical ID or your doctor's allergy plan.",
      "Always carry your prescribed medication. In an emergency, use it as your doctor has told you and call the local emergency number.",
    ],
  },
  {
    heading: "Using the cards",
    paragraphs: ["Before you rely on a card:"],
    list: [
      "Read the English on the back and make sure it describes your allergy. Our cards cover peanuts only.",
      "Check that the card is for the country and language where you'll be eating.",
      "Hand it over before you order, and wait for a clear answer.",
      "If the staff hesitate, seem unsure or can't read the card, thank them and eat somewhere else.",
    ],
  },
  {
    heading: "Our translations",
    paragraphs: [
      "A native speaker checks every card before we sell it. Even so, languages vary by region, and we can't promise that every person who reads a card will understand it in the same way.",
      `If you think something on a card is wrong or unclear, please email ${CONTACT_EMAIL} so we can check it.`,
    ],
  },
  {
    heading: "Orders",
    paragraphs: [
      "You'll see the full price before you pay. Digital sets are for download. Laminated cards are sent by post, and delivery times are estimates.",
      "If your order arrives damaged or isn't what you ordered, email us and we'll put it right.",
    ],
  },
  {
    heading: "Personal use",
    paragraphs: [
      "The cards, their wording and this website belong to Peanut Allergy Cards. When you buy a set, you may use it, and print the digital files, for yourself and the people travelling with you.",
      "Please don't resell, share or republish the cards or their wording.",
    ],
  },
  {
    heading: "Our responsibility",
    paragraphs: [
      "We take care to make every card accurate and clear. As far as the law allows:",
    ],
    list: [
      "We are not responsible for what a restaurant or its staff do or fail to do, including after reading a card.",
      "We are not responsible for losses we could not reasonably have foreseen.",
      "Our total responsibility to you for an order is limited to the amount you paid for it.",
    ],
  },
  {
    heading: "Your legal rights",
    paragraphs: [
      "Nothing in these terms takes away rights the law gives you as a consumer, or limits our responsibility where the law doesn't allow it to be limited.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update these terms. The date at the top shows the latest version, and the version in place when you order is the one that applies to that order.",
      `Questions? Email ${CONTACT_EMAIL}.`,
    ],
  },
];
