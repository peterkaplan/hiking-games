/** Website FAQ copy. Not card text, but keep it accurate and non-medical. */

export interface FaqItem {
  answer: string;
  question: string;
}

export const faqItems: readonly FaqItem[] = [
  {
    question: "How do I know the restaurant really understood?",
    answer:
      "The chef card ends with one clear question: can you make this meal safe for me? Staff answer yes or no, so you get a real answer, with nothing lost in translation. If the answer is no, or they hesitate, thank them and eat somewhere else.",
  },
  {
    question: "Why two cards?",
    answer:
      "The chef card is for every meal: it tells the kitchen what to avoid and asks for that yes or no. The emergency card is for if something goes wrong: it tells anyone nearby you're having a severe reaction and asks them to call the local ambulance number.",
  },
  {
    question: "Who translates the cards?",
    answer:
      "Each card is translated from our English text, then checked by a native speaker. We don't sell a card until that check is done. English is on the back, so you always know what you're showing.",
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
