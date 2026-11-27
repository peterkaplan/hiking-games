/** Website FAQ copy. Not card text, but keep it accurate and non-medical. */

import { catalogue, NEEDS_SEARCH } from "./catalogue";
import { CONTACT_EMAIL } from "./contact";

export interface FaqItem {
  answer: string;
  /** Shown on product pages only; the homepage keeps a shorter list. */
  productOnly?: boolean;
  question: string;
}

export const faqItems: readonly FaqItem[] = [
  {
    question: "How do I know the restaurant really understood?",
    answer:
      "The chef card ends with one clear question: can you make this meal safe for me? Staff answer yes or no, so you get a real answer, with nothing lost in translation. If the answer is no, or they hesitate, thank them and eat somewhere else.",
  },
  {
    question: "Is it just a translation?",
    productOnly: true,
    answer:
      "No. Each card is adapted to how that country cooks, not only to its language. The Thailand card asks for a clean wok and fresh oil, and tells the kitchen never to use a mortar and pestle that has been used for peanuts. Every country's card names the cooking styles and equipment your waiter and chef will recognise.",
  },
  {
    question: "Why two cards?",
    productOnly: true,
    answer:
      "The chef card is for every meal: it tells the kitchen what to avoid and asks for that yes or no. The emergency card is for if something goes wrong: it tells anyone nearby you're having a severe reaction and asks them to call the local ambulance number.",
  },
  {
    question: "Who translates the cards?",
    productOnly: true,
    answer:
      "A native speaker checks every card word by word before it goes on sale. English is on the back, so you always know what you're showing.",
  },
  {
    question: "Laminated or digital?",
    answer:
      "Most people take both: the laminated cards come with the digital set for free. The laminated cards are wipe-clean and easy to hand to a waiter. The digital set puts both cards on your phone and in Apple Wallet, with a print-ready PDF. You can also buy the digital set on its own.",
  },
  {
    question: "Do these cards replace my epinephrine or medical ID?",
    answer:
      "No. They help you explain your allergy and ask for help. Always carry your prescribed epinephrine and follow your doctor's allergy plan. First responders look for medical ID jewellery first, so wear one if your doctor recommends it.",
  },
  {
    question: "My destination isn't listed. Can I still get cards?",
    answer: NEEDS_SEARCH
      ? `We cover ${catalogue.length} countries and add more all the time. Don't see yours? Email us at ${CONTACT_EMAIL} to request a card.`
      : `We're adding cards frequently! Email us at ${CONTACT_EMAIL} to request a card.`,
  },
];

/** The short list for the homepage. */
export const homeFaqItems = faqItems.filter((item) => !item.productOnly);
