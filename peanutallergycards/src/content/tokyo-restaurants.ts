/**
 * "The best peanut-free restaurants in Tokyo": where the owners ate on their
 * trip, and what happened when they showed the chef card.
 *
 * Every entry is a real meal. Never add a restaurant nobody on the team has
 * eaten at, and never say a kitchen is peanut-free: we only know that it
 * read the card and said yes on the day. The page says so at the top
 * (`tokyoWarning`); keep that notice.
 *
 * A miso ramen shop from the same trip is left out on purpose: nobody
 * remembers its name.
 *
 * The title uses "peanut-free restaurants" because that is what people
 * search for (owner's call, 2026-11-24).
 */

/** When the meals were eaten. */
export const VISITED = "November 2026";

/** First published; change `UPDATED` when the list changes. */
export const PUBLISHED = "2026-11-24";
export const UPDATED = "2026-11-24";

export const TOKYO_PATH = "/peanut-free-restaurants-tokyo";

export const tokyoTitle = "The best peanut-free restaurants in Tokyo";

export const tokyoIntro =
  "Four places in Tokyo, and one in Kyoto, where we handed the kitchen our card and got a yes.";

export const tokyoWarning =
  "These are not peanut-free kitchens. They are places that read our chef card and said yes on the day we went. Menus, oil and staff change, so show your card every time, at every branch.";

/** What happened with the card. The same at every one of them. */
export const cardResult = "Showed the chef card. The kitchen said yes.";

export interface RestaurantVisit {
  /** Street address, where we are sure of the branch. */
  address?: string;
  /** The neighbourhood, or what kind of place it is for a chain. */
  area: string;
  /** What was on the table. Only what the photo shows. */
  ate: string;
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
  photoAlt: string;
}

export const tokyoVisits: readonly RestaurantVisit[] = [
  {
    id: "tokyo-pizza-kevelos",
    name: "Pizza Kevelos",
    area: "Harajuku",
    kind: "Neapolitan pizza",
    address: "6-12-4 Jingumae, Shibuya",
    ate: "The marinara: tomato, garlic and basil on a wood-fired base, no cheese. Eaten on the terrace.",
    photoAlt:
      "A wood-fired marinara pizza with tomato, garlic and basil on a red checked tablecloth",
  },
  {
    id: "tokyo-kyushu-jangara",
    name: "Kyushu Jangara",
    area: "Ginza",
    kind: "Kyushu-style ramen",
    address: "6-12-17 Ginza, Chuo",
    ate: "Spicy ramen with pork, a soft-boiled egg and wood-ear mushrooms.",
    photoAlt:
      "A bowl of spicy red ramen with pork, a soft-boiled egg and wood-ear mushrooms",
  },
  {
    id: "tokyo-gyu-kaku",
    name: "Gyu-Kaku",
    area: "Branches across Tokyo",
    kind: "Yakiniku: grill it at your table",
    ate: "Beef to grill ourselves, with rice and edamame.",
    note: "A chain. We can only speak for the branch we ate at, so show the card at yours.",
    photoAlt:
      "Plates of raw marbled beef ready to grill, with rice, edamame and dipping sauces",
  },
  {
    id: "tokyo-sukiya",
    name: "Sukiya",
    area: "Branches across Tokyo",
    kind: "Gyudon: beef bowls",
    ate: "A beef bowl: simmered beef and onion over rice.",
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
  ate: "Oyakodon (chicken and egg over rice) with miso soup and pickles.",
  photoAlt:
    "A red lacquer bowl of chicken and egg over rice, with miso soup and pickles on a tray",
};
