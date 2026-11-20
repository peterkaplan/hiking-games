import type { CardLanguage } from "./types";

/**
 * Bump this whenever the English wording below changes. Every translation
 * made from an older version then shows as out of date until it is redone
 * and re-reviewed.
 */
export const ENGLISH_SOURCE_VERSION = 1;

/**
 * The English source text that every translation is made from.
 * Still a draft: the wording should be checked before launch (for example
 * against FARE's chef card, or by an allergist).
 */
export const english: CardLanguage = {
  code: "en",
  name: "English",
  nativeName: "English",
  slug: "english",
  translation: {
    sourceVersion: ENGLISH_SOURCE_VERSION,
    review: {
      status: "draft",
      notes:
        "Default card avoids all peanut oil. Refined-oil tolerance varies, so a custom card option is planned.",
    },
    text: {
      headline: "I have a severe peanut allergy",
      lines: [
        "I cannot eat peanuts or any food that contains peanuts.",
        "This includes peanut oil, peanut butter, peanut sauce, satay sauce and groundnuts.",
        "Even a very small amount can cause a life-threatening reaction.",
        "Please make sure my food, and the pans, utensils and surfaces used to prepare it, have not touched peanuts.",
        "If you are not sure whether a dish is safe, please tell me and I will order something else.",
        "Thank you for your help.",
      ],
      emergency: "If I have a reaction, please call an ambulance immediately.",
    },
  },
};
