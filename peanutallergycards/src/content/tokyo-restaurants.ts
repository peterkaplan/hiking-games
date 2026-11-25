/**
 * "The best peanut-free restaurants in Tokyo": where the owners ate on their
 * trip, written as a travel journal: first person, one entry per meal.
 *
 * Every entry is a real meal, and the owners say every one was really good
 * (2026-11-24). The detail in each entry comes from the owners' own photo
 * of that meal (2026-11-25: "you have the pictures, you can make it a
 * journal"): what is on the table, in the bowl, on the plate. Don't add
 * conversations, prices, waits or anything else a photo doesn't show and
 * nobody told us. Never add a restaurant nobody on the team has eaten at.
 *
 * Never say a kitchen is peanut-free: we only know that it read the card
 * and said yes on the day. The yellow "read this first" box is gone (owner,
 * 2026-11-25); the same point is now the second paragraph of the opening
 * (`journalOpening`) and the first question at the bottom. Keep both.
 *
 * A miso ramen shop from the same trip is left out on purpose: nobody
 * remembers its name.
 *
 * The title uses "peanut-free restaurants" because that is what people
 * search for (owner's call, 2026-11-24).
 */

import type { FaqItem } from "./faq";

/** When the meals were eaten. */
export const VISITED = "November 2026";

/** First published; change `UPDATED` when the list changes. */
export const PUBLISHED = "2026-11-24";
export const UPDATED = "2026-11-25";

export const TOKYO_PATH = "/peanut-free-restaurants-tokyo";

export const tokyoTitle = "The best peanut-free restaurants in Tokyo";

/** The first lines of the journal. The second paragraph must stay. */
export const journalOpening: readonly string[] = [
  "Tokyo, November 2026. Julia has been allergic to peanuts her whole life, so this trip ran on one habit: the card goes to the kitchen before we order. Every place in this journal read it and said yes, and every meal was one we'd go back for.",
  "One honest note before the food. None of these are peanut-free kitchens. They are the places that said yes to us, on the day we went. Kitchens, oil and staff change, so take your own card and ask again, at every branch.",
];

/** What happened with the card. The same at every one of them. */
export const cardResult = "Showed the chef card. The kitchen said yes.";

export interface RestaurantVisit {
  /** Street address, where we are sure of the branch. */
  address?: string;
  /** The neighbourhood, or what kind of place it is for a chain. */
  area: string;
  /** The journal entry, a paragraph at a time. See the top of the file. */
  entry: readonly string[];
  /** Names the photo: src/images/<id>.webp. */
  id:
    | "kyoto-seishuan"
    | "tokyo-gyu-kaku"
    | "tokyo-kyushu-jangara"
    | "tokyo-pizza-kevelos"
    | "tokyo-sukiya";
  kind: string;
  name: string;
  /** Anything a reader should know before relying on it. */
  note?: string;
  /** The dish to ask for, in a few words. */
  order: string;
  photoAlt: string;
}

export const tokyoVisits: readonly RestaurantVisit[] = [
  {
    id: "tokyo-pizza-kevelos",
    name: "Pizza Kevelos",
    area: "Harajuku",
    kind: "Neapolitan pizza",
    address: "6-12-4 Jingumae, Shibuya",
    order: "The marinara",
    entry: [
      "Harajuku. We took a table on the terrace, red checked tablecloth and all, and the card went to the kitchen before we ordered. It came back with a yes.",
      "We had the marinara, and it is a pizza with nothing to hide: crushed tomato, slivers of garlic, a shake of oregano, one basil leaf in the middle and a slick of olive oil, on a crust blistered black by the wood oven. No cheese. You can count the ingredients from your chair, which is a good feeling when you've spent your life reading ingredient lists.",
      "Simple, and delicious. If you only eat one pizza in Tokyo, this is the one to order.",
    ],
    photoAlt:
      "A wood-fired marinara pizza with tomato, garlic and basil on a red checked tablecloth",
  },
  {
    id: "tokyo-kyushu-jangara",
    name: "Kyushu Jangara",
    area: "Ginza",
    kind: "Kyushu-style ramen",
    address: "6-12-17 Ginza, Chuo",
    order: "The spicy ramen",
    entry: [
      "Ginza. Ramen was the meal we most wanted to get right in Japan, so the card went over the counter first. Yes again.",
      "The bowl arrives loud: a red, green and yellow rim, red chopsticks, a red spoon, and a broth the colour of a traffic cone. Under it are thin, straight noodles, the Kyushu way, with chunks of soft pork, a whole soft-boiled egg, wood-ear mushrooms, spring onion and a dusting of chilli.",
      "We ordered the spicy one and would do it again tomorrow. The paper placemat is also the menu, prices and all, so you can plan the next bowl while you finish this one.",
    ],
    photoAlt:
      "A bowl of spicy red ramen with pork, a soft-boiled egg and wood-ear mushrooms",
  },
  {
    id: "tokyo-gyu-kaku",
    name: "Gyu-Kaku",
    area: "Branches across Tokyo",
    kind: "Yakiniku: grill it at your table",
    order: "Marbled beef, rice and edamame",
    entry: [
      "Yakiniku night. At Gyu-Kaku the grill is set into the table and the meat arrives raw, so you cook every piece yourself, right in front of you.",
      "Our table filled up fast: a plate of marbled beef laid on a green leaf, a darker cut scattered with sesame seeds, another in a glossy sauce, a bowl of chopped spring onion, edamame, and rice in bowls stamped with the restaurant's name. Then tongs, and off you go.",
      "All of it was delicious. The marinades and dipping sauces are the part a kitchen has to answer for, so that is exactly what the card is for here. Ours came back with a yes.",
    ],
    note: "A chain. We can only speak for the branch we ate at, so show the card at yours.",
    photoAlt:
      "Plates of raw marbled beef ready to grill, with rice, edamame and dipping sauces",
  },
  {
    id: "tokyo-sukiya",
    name: "Sukiya",
    area: "Branches across Tokyo",
    kind: "Gyudon: beef bowls",
    order: "The beef bowl",
    entry: [
      "Not every meal on a trip is an occasion. Sukiya is where you go when you're hungry now.",
      "We had the beef bowl: thin slices of simmered beef and soft, sweet onion piled over white rice, in a bowl with an orange pattern, on a brown tray. That's the whole dish. It comes fast, it fills you up, and it tasted great.",
      "It's a counter-and-tray kind of place, and we still handed over the card before ordering, the same as everywhere else. The kitchen said yes.",
    ],
    note: "A chain. We can only speak for the branch we ate at, so show the card at yours.",
    photoAlt: "A bowl of simmered beef and onion over rice",
  },
];

/** A day out of Tokyo. Listed apart, because it isn't in Tokyo. */
export const kyotoVisit: RestaurantVisit = {
  id: "kyoto-seishuan",
  name: "Kazurano Seishuan",
  area: "Arashiyama",
  kind: "Soba and rice bowls",
  address: "Beside Togetsukyo bridge, two minutes from Arashiyama station",
  order: "The oyakodon",
  entry: [
    "A day in Kyoto. We walked the Togetsukyo bridge in Arashiyama and stopped at Kazurano Seishuan, right beside it, two minutes from the station.",
    "The oyakodon came on a black tray in a red lacquer bowl with its lid set to one side: chicken and soft-set egg over rice, with spring onion through it. Around it, a bowl of miso soup, a little dish of purple pickles, a cup of green tea, and a Coke Zero in a glass bottle.",
    "Delicious, and a good stop after the walk. The card went to the kitchen first here too, and the answer was yes.",
  ],
  photoAlt:
    "A red lacquer bowl of chicken and egg over rice, with miso soup and pickles on a tray",
};

/** How every meal started. Our own routine, not medical advice. */
export const routine = {
  heading: "How we ordered, every time",
  steps: [
    "Sit down, and hand the card to the first member of staff, before the menu and before ordering.",
    "Ask them to show it to the kitchen. The chef is the one who needs to read it.",
    "Wait. A real yes comes back from the kitchen, not from the doorway.",
    "Order what the kitchen says it can make, and check again when the food arrives.",
  ],
} as const;

export const tokyoFaq: readonly FaqItem[] = [
  {
    question: "Are these restaurants peanut-free?",
    answer:
      "No. None of them is a peanut-free kitchen. They are restaurants that read our Japanese chef card and told us they could cook for a peanut allergy on the day we visited. Always show your own card and ask again.",
  },
  {
    question: "How do you order in Tokyo with a peanut allergy?",
    answer:
      "We hand a chef card in Japanese to the staff before we order and ask them to show the kitchen. The card says what we can't eat and asks whether they can cook for us, yes or no. If the answer isn't a clear yes, we eat somewhere else.",
  },
  {
    question: "Where in Tokyo are these restaurants?",
    answer:
      "Pizza Kevelos is in Harajuku and Kyushu Jangara is in Ginza. Gyu-Kaku and Sukiya are chains with branches across the city. Kazurano Seishuan is in Arashiyama, Kyoto, for a day trip.",
  },
  {
    question: "Does a yes at one branch of a chain count at another?",
    answer:
      "No. Gyu-Kaku and Sukiya have many branches, and we can only speak for the ones we ate at. Show your card at every branch, every time.",
  },
  {
    question: "Which card did you use?",
    answer:
      "Our own Japanese peanut allergy chef card: Japanese on the front for the kitchen, English on the back so we know what it says.",
  },
];
