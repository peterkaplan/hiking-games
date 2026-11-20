import type { ChefCardText, EmergencyCardText } from "./types";

/**
 * Bump this whenever the English wording below changes. Every translation
 * made from an older version then shows as out of date until it is redone
 * and re-reviewed.
 *
 * v2 (2026-11-20): replaced the first draft with the owner's card wording.
 */
export const ENGLISH_SOURCE_VERSION = 2;

/**
 * English chef card: the back of every chef card, and the source for every
 * translation.
 */
export const englishChefCard: ChefCardText = {
  headline: "VERY SEVERE PEANUT ALLERGY",
  intro: "This is a very serious condition, and I can die if the food:",
  risks: [
    "Has peanut ingredients",
    "Is cooked with peanuts in any form (including peanut oil and sauces)",
    "Touches peanuts",
  ],
  kitchenHeading: "KITCHEN:",
  kitchen: [
    "Please use a clean wok, pot, spatula, and fresh oil",
    "Strictly do NOT use a mortar and pestle that has ever been used for peanuts",
  ],
  question:
    "Can the restaurant make 100% safe food for us? (If you are not sure, please tell us you cannot do it. Thank you very much)",
};

/**
 * English emergency card: the back of every emergency card. Generated per
 * destination so the emergency number always matches the country.
 */
export const englishEmergencyCard = (
  emergencyNumber: string
): EmergencyCardText => ({
  headline: "URGENT HELP!",
  body: "I am undergoing anaphylactic shock from a severe peanut allergy. I cannot breathe and I can die.",
  call: `Please call ${emergencyNumber} for an ambulance right now!`,
});
