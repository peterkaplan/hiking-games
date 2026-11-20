/** Website FAQ copy. Not card text, but keep it accurate and non-medical. */

export interface FaqItem {
  answer: string;
  question: string;
}

export const faqItems: readonly FaqItem[] = [
  {
    question: "Why two cards?",
    answer:
      "They do different jobs. The chef card is for ordering: it tells the kitchen what to avoid and asks whether they can cook safely for you. The emergency card is for a reaction: it says you're having anaphylaxis and asks whoever reads it to call the local ambulance number.",
  },
  {
    question: "Who translates the cards?",
    answer:
      "Each card is translated from our English text and then checked by a native speaker. We don't sell a card until that check is done. The English on the back lets you read what you're handing over.",
  },
  {
    question: "What does the chef card say about peanut oil?",
    answer:
      "It asks the kitchen to avoid peanuts in every form, including peanut oil, sauces and anything that has touched peanuts. Custom cards for different needs are planned.",
  },
  {
    question: "Digital or printed?",
    answer:
      "The digital download is a print-ready PDF plus phone-sized images, so you can print at home and keep a copy on your phone. The printed set is laminated and posted to you, and includes the digital files.",
  },
  {
    question: "Do these cards replace my epinephrine or medical ID?",
    answer:
      "No. They help you explain your allergy and ask for help. Always carry your prescribed epinephrine and follow your doctor's allergy plan. First responders look for medical ID jewellery first, so wear one if your doctor recommends it.",
  },
  {
    question: "My destination isn't listed. Can I still get cards?",
    answer:
      "We're adding countries one at a time, because every card is checked by a native speaker. China, Mexico and Italy are next.",
  },
];
