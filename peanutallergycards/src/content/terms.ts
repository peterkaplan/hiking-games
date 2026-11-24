/**
 * Terms of use. Not card text, but it sets what we promise about the cards,
 * so keep it accurate, non-medical and in step with the Disclaimer and FAQ.
 *
 * The protections follow what the largest seller of these cards (Equal Eats)
 * puts in its terms: no guarantee of being understood, the buyer confirms
 * medical advice and their own precautions, changed cards, and no liability
 * for a reaction. Written in our own words, not copied from theirs.
 *
 * DRAFT, NOT YET REVIEWED BY A LAWYER. Still to add once decided (see
 * docs/roadmap.md): the legal name of the business, the governing law, and
 * the refunds and shipping terms. Bump TERMS_UPDATED whenever the wording
 * changes.
 */

import { CONTACT_EMAIL } from "./contact";

export const TERMS_UPDATED = "24 November 2026";

export const termsIntro =
  "These terms apply when you use this website or buy our cards. By ordering, you agree to them. If you don't agree, please don't order.";

/** The points nobody should miss, shown above the full terms. */
export const termsSummary: readonly string[] = [
  "Our cards help you explain your allergy. They can't guarantee that you'll be understood or that a meal is safe.",
  "Never rely on a card alone. Always carry your prescribed medication and follow your doctor's allergy plan.",
  "If a restaurant hesitates, or you're not sure, don't eat there.",
  "Eating out with a food allergy always carries risk. That risk stays with you, not with us.",
];

export interface TermsSection {
  /** Paragraphs shown after the list. */
  after?: readonly string[];
  heading: string;
  /** A bulleted list, shown after the opening paragraphs. */
  list?: readonly string[];
  paragraphs: readonly string[];
}

export const termsSections: readonly TermsSection[] = [
  {
    heading: "What the cards do",
    paragraphs: [
      "Our cards are a communication aid. They tell restaurant staff about your peanut allergy in their own language and ask whether the kitchen can cook for you.",
      "We work hard to make every card accurate, clear and right for the country it's written for. Even so, a card can be misread, ignored or used carelessly, and we can't control that. By buying or using a card you accept the risks set out below.",
    ],
  },
  {
    heading: "No guarantee",
    paragraphs: [
      "We give no guarantee that a card will get your allergy across to the person who reads it, or that any meal will be safe. Whether a card works depends on things outside our control, including:",
    ],
    list: [
      "how well the reader knows the language, and how well they can read",
      "whether the reader understands that a food allergy can kill",
      "what you and the staff say to each other",
      "how the kitchen stores, prepares and cooks its food",
      "whether the person who read the card is the person who cooks your meal",
    ],
    after: [
      "A “yes” from the kitchen is the restaurant's answer, not ours. The decision to eat is always yours.",
    ],
  },
  {
    heading: "Not medical advice",
    paragraphs: [
      "Nothing on this website or on our cards is medical advice, and nothing here replaces your doctor, your epinephrine, your medical ID or your allergy plan.",
      "By ordering, you confirm that you have had medical advice about your allergy. If you're unsure about your allergy or how to manage it, speak to a doctor before you buy or use a card.",
    ],
  },
  {
    heading: "Your own precautions",
    paragraphs: [
      "A card on its own is not enough to keep you safe. By ordering, you agree that you won't rely on a card alone, and that you will take your own precautions every time you eat, including:",
    ],
    list: [
      "carrying your prescribed medication and knowing how to use it",
      "knowing how to call an ambulance where you are",
      "asking your own questions, and walking away if you don't get a clear answer",
      "telling the people you're travelling with about your allergy",
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
    heading: "Changed cards",
    paragraphs: [
      "Use the cards as we made them. If you edit a card, write on it, crop it or add to it, it may no longer say what we checked. We are not responsible for a card that has been changed, and you use a changed card at your own risk.",
    ],
  },
  {
    heading: "Our translations",
    paragraphs: [
      "A native speaker checks every card before we sell it. Translation is still not an exact science. Languages and dialects vary by region, some foods have no exact word, and we can't promise that every person who reads a card will understand it in the same way.",
      `If you think something on a card is wrong or unclear, please email ${CONTACT_EMAIL} so we can check it.`,
    ],
  },
  {
    heading: "Orders and this website",
    paragraphs: [
      "You'll see the full price before you pay. Digital sets are for download. Laminated cards are sent by post, and delivery times are estimates.",
      "We try to keep this website correct, but a price, a description or a picture may sometimes be wrong. We may correct mistakes, and we may refuse or cancel an order, with a full refund, if something was wrong when you placed it.",
      "The website is provided as it is. We don't promise that it will always be available or free of faults.",
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
      "Eating food prepared by someone else always carries risk when you have a food allergy, and no card can remove it. As far as the law allows:",
    ],
    list: [
      "We are not liable for any allergic reaction, illness, injury or death arising from a food allergy, whether or not a card was used.",
      "We are not responsible for what a restaurant or its staff do or fail to do, including after reading a card.",
      "We are not liable for indirect or unforeseeable losses, such as a spoiled trip, lost bookings or lost earnings.",
      "Our total liability to you for an order is limited to the amount you paid for it.",
    ],
  },
  {
    heading: "Your legal rights",
    paragraphs: [
      "Some countries and states don't allow certain limits on liability, so some of the limits above may not apply to you. Nothing in these terms takes away rights the law gives you as a consumer, or limits our responsibility where the law doesn't allow it to be limited.",
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
