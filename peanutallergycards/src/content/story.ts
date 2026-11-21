/**
 * The founder story, shown on the store homepage.
 *
 * Facts from the owner (2026-11-21): Julia has been allergic to peanuts her
 * whole life; on her honeymoon she went to Thailand and Japan and needed
 * these cards.
 *
 * Filled in by us and still TO CONFIRM with Julia:
 * - that she made her own cards for the trip (the Thai and Japanese cards
 *   in src/content/cards came from those originals);
 * - "read every label, ask every server" as her routine at home;
 * - that the language barrier in Japan made questions harder.
 * The Thailand details (satay, pad thai, curry pastes, the shared mortar)
 * come from our own "where peanuts hide" list.
 */

export const story = {
  eyebrow: "Our story",
  heading: "Made by Julia, who's been allergic to peanuts her whole life.",
  paragraphs: [
    "At home, Julia knows the drill: read every label, ask every server. Then came her honeymoon, in Thailand and Japan.",
    "Peanuts turn up all over Thai cooking, from satay and pad thai to curry pastes and the mortar used for every som tam. In Japan, the language barrier made every question harder. Asking “is there peanut in this?” wasn't enough. She needed the kitchen to understand, and to give her a clear answer.",
    "So she made her own cards: one for the chef, asking for a straight yes or no, and one for emergencies, with the local ambulance number. Peanut Allergy Cards is those cards, checked by native speakers, so you can eat abroad with confidence too.",
  ],
  /** Caption for the card shown beside the story. */
  cardCaption: "Julia's Thai chef card, from the honeymoon",
} as const;
