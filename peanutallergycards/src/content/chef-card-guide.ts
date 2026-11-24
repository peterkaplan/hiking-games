/**
 * Guide: how to use a chef card. Our own advice on using the cards, not card
 * text and not medical advice. Keep it in step with the Disclaimer and the
 * terms: a card helps you explain, it never guarantees a safe meal.
 */

import type { FaqItem } from "./faq";

export const CHEF_CARD_PATH = "/how-to-use-a-chef-card";

export const PUBLISHED = "2026-11-24";
export const UPDATED = "2026-11-24";

export const guideTitle = "How to use a peanut allergy chef card abroad";

export const metaTitle = "How to Use a Peanut Allergy Chef Card Abroad";

export const metaDescription =
  "What a peanut allergy chef card is, when to hand it over, what to say, and what to do when the restaurant says no. A step-by-step guide for eating abroad.";

export const guideIntro =
  "A chef card is a small card that explains your allergy to a restaurant kitchen in its own language. Used well, it gets you a straight answer before you order. Here is how to use one, step by step, and what to do when the answer is no.";

export const guideWarning =
  "A chef card helps you explain your allergy. It can't make a kitchen safe, and it is not medical advice. Always carry your prescribed medication and follow your doctor's allergy plan.";

export interface GuideSection {
  heading: string;
  id: string;
  list?: readonly string[];
  paragraphs: readonly string[];
}

export const guideSections: readonly GuideSection[] = [
  {
    id: "what",
    heading: "What is a chef card?",
    paragraphs: [
      "A chef card, also called an allergy card or allergy translation card, is a written message for the person cooking your food. It says what you're allergic to, how serious it is, and what the kitchen needs to do.",
      "Abroad, it does the job your own voice can't. A waiter who doesn't share your language can carry the card to the chef, and the chef reads it in their own words, exactly as it was written.",
    ],
  },
  {
    id: "before",
    heading: "Before you travel",
    paragraphs: [],
    list: [
      "Get a card in the language of each country you're visiting, not just English.",
      "Read the English side so you know exactly what the card says.",
      "Carry more than one copy: a laminated card in your wallet and a copy on your phone.",
      "Keep your emergency card with your medication, where someone else could find it.",
      "Look up the dishes where peanuts usually hide in that country, so you know what to steer away from.",
    ],
  },
  {
    id: "at-the-restaurant",
    heading: "At the restaurant: five steps",
    paragraphs: [],
    list: [
      "Hand the card over before you order, not after. Give it to your waiter, server or bartender as you sit down.",
      "Ask them to show it to the chef. The person who cooks your food is the one who needs to read it.",
      "Wait for the answer. A good card ends with a question, so the kitchen has to say yes or no.",
      "Order what the kitchen says it can make. If they suggest a dish, take the suggestion.",
      "When the food arrives, check again with the person who brings it: “This is the one without peanuts?”",
    ],
  },
  {
    id: "yes",
    heading: "What a real yes looks like",
    paragraphs: [
      "A real yes comes from the kitchen, not from the first person you ask. The waiter takes the card away, comes back, and tells you what the chef said. Often they'll tell you what they changed: a clean pan, fresh oil, a different sauce.",
      "Be wary of an instant yes from someone who hasn't read the card or spoken to the kitchen. Ask once more, and point to the line about cooking with peanuts.",
    ],
  },
  {
    id: "no",
    heading: "What to do when the answer is no",
    paragraphs: [
      "A no is the card working. The restaurant has told you the truth, and you've avoided a meal you shouldn't eat.",
    ],
    list: [
      "Thank them. They did the right thing, and it wasn't easy to say.",
      "Don't negotiate. If the kitchen says it can't, it can't.",
      "Treat a maybe, a shrug or a long pause as a no.",
      "Try the next place. Simple grills, and restaurants that cook one thing, are often easier than kitchens with long menus and shared sauces.",
      "Keep a safe snack with you, so a no never leaves you hungry and tempted.",
    ],
  },
  {
    id: "mistakes",
    heading: "Mistakes to avoid",
    paragraphs: [],
    list: [
      "Showing a translation app instead. An app translates your words on the spot; nobody has checked what it says.",
      "Handing over the card after you've ordered.",
      "Editing or writing on the card. It may no longer say what was checked.",
      "Using a card for the wrong country. The same language can be cooked in very different kitchens.",
      "Relying on the card alone. It is one precaution, alongside your medication and your own judgment.",
    ],
  },
];

export const guideFaq: readonly FaqItem[] = [
  {
    question: "What should a peanut allergy chef card say?",
    answer:
      "It should say that you have a severe peanut allergy, that you can't eat food that contains peanuts, is cooked with peanuts or peanut oil, or touches peanuts, and what the kitchen should do, such as using clean pans and fresh oil. It should end by asking whether the restaurant can make your meal safely.",
  },
  {
    question: "Do chef cards work?",
    answer:
      "They help you get a clear answer from the kitchen in a language you don't speak. They can't guarantee a safe meal: that depends on the restaurant. Always carry your medication, and eat somewhere else if the answer isn't a clear yes.",
  },
  {
    question: "Is a chef card the same as an allergy translation card?",
    answer:
      "Yes. Chef card, allergy card, allergy translation card and dining card all mean a card that explains your allergy to restaurant staff. A good one for travel is written in the local language, with English on the back.",
  },
  {
    question: "Should I use a paper card or my phone?",
    answer:
      "Both. A laminated card can go into the kitchen and survive it. A copy on your phone is the backup you'll always have with you.",
  },
];
