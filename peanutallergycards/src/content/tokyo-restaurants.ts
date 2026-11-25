/**
 * "The best peanut-free restaurants in Tokyo": where the owners ate on their
 * trip, written as a travel journal: first person, one entry per meal.
 *
 * Every entry is a real meal, and the owners say every one was really good
 * (2026-11-24). The detail in each entry comes from the owners' own photo
 * of that meal (2026-11-25: "you have the pictures, you can make it a
 * journal"): what is on the table, in the bowl, on the plate. Write it the
 * way a person writes a trip diary: plain, a bit uneven, short verdicts, no
 * clever comparisons or sayings. The first draft "sounded AI" (owner). Don't add
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
  "We were in Tokyo in November 2026. Julia has had a peanut allergy her whole life, so before every meal we handed the staff her card and waited to hear back from the kitchen. These are the places that said yes. We'd eat at all of them again.",
  "Quick note before the food: none of these are peanut-free kitchens. They said yes to us, on the day we went. Bring your own card and ask again, every time, at every branch.",
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
      "Pizza in Tokyo, we know. But it was really good.",
      "It's in Harajuku and we sat outside on the terrace, red checked tablecloths and everything. We gave them the card, they took it to the kitchen, and it was a yes.",
      "We got the marinara, which is the one with no cheese: tomato, garlic, oregano, olive oil and one basil leaf in the middle. The crust was properly charred from the wood oven. With an allergy it's about as easy as a dish gets, because you can see everything that's on it.",
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
      "This one is in Ginza. We really wanted ramen on this trip, so the card went over first, before we ordered. The kitchen said yes.",
      "We got the spicy ramen. It comes in a bright red, green and yellow bowl with red chopsticks, and the broth is very orange. Thin noodles, big pieces of pork, a soft-boiled egg, those dark wood-ear mushrooms, spring onion, and chilli on top.",
      "Really good. Get the spicy one. Also the placemat is the menu, with the prices on it, which was handy.",
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
      "Gyu-Kaku is yakiniku. There's a grill in the middle of the table, the meat comes out raw and you cook it yourself. They're all over Tokyo.",
      "We ordered a few plates of beef, plus rice and edamame, and it came with chopped spring onion and a couple of sauces. The marbled beef was the best thing on the table. All of it was delicious though.",
      "With an allergy, the thing to ask about here is the sauces and marinades, so that's what we used the card for. They said yes.",
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
      "Sukiya is basically fast food. Beef bowls. It's a chain and you'll walk past one most days.",
      "We had the regular beef bowl, which is thin simmered beef and onions on rice and that's it. It was on the table in a couple of minutes and it's filling. Not fancy, but it tasted great.",
      "We still showed the card, same as everywhere else, and the kitchen said yes.",
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
    "We did a day in Kyoto and went out to Arashiyama to walk across the Togetsukyo bridge. This place is right next to the bridge, about two minutes from the station.",
    "We had the oyakodon, which is chicken and egg over rice. It came on a tray in a red bowl with miso soup, pickles and green tea. And a Coke Zero in a glass bottle.",
    "Card to the kitchen, yes from the kitchen. It was delicious, and a good place to sit down after the walk.",
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
    "Wait for the answer to come back from the kitchen.",
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
