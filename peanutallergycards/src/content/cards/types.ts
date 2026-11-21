/**
 * Card content model.
 *
 * We sell two cards per destination:
 * - a chef card, handed to restaurant staff;
 * - an emergency card, shown to anyone nearby during a reaction.
 * Each card has the local language on the front and English on the back.
 *
 * Every page, PDF, Etsy file and wallet pass is generated from this content,
 * so card wording only ever lives in src/content/cards/.
 */

export interface Language {
  /** BCP 47 code, e.g. "th", "ja", "my". */
  code: string;
  /** English name, e.g. "Thai". */
  name: string;
  /** Name in the language itself, e.g. "ไทย". */
  nativeName: string;
}

/** Wording of the chef card, in one language. */
export interface ChefCardText {
  /** e.g. "VERY SEVERE PEANUT ALLERGY". */
  headline: string;
  /** e.g. "This is a very serious condition, and I can die if the food:". */
  intro: string;
  /** Instructions for the kitchen. */
  kitchen: readonly string[];
  /** e.g. "KITCHEN:". */
  kitchenHeading: string;
  /** The closing question to the restaurant. */
  question: string;
  /** Bullet points that finish the intro sentence. */
  risks: readonly string[];
}

/** Wording of the emergency card, in one language. */
export interface EmergencyCardText {
  /** What is happening. */
  body: string;
  /** Asks for an ambulance. Must contain the destination's emergency number. */
  call: string;
  /** e.g. "URGENT HELP!". */
  headline: string;
}

/**
 * Who checked a translation. A translation only counts as ready once a
 * native speaker has reviewed it; see docs/translation-process.md.
 */
export type Review =
  | { status: "draft"; notes?: string }
  | {
      status: "reviewed";
      /** Name or initials of the native-speaker reviewer. */
      reviewer: string;
      /** ISO date, e.g. "2026-12-01". */
      reviewedOn: string;
      notes?: string;
    };

/** Text in one language, with where it came from and who checked it. */
export interface Translation<T> {
  language: Language;
  review: Review;
  /**
   * The ENGLISH_SOURCE_VERSION this translation was made from. Write it as a
   * number, not the constant: when the English changes, older translations
   * must show as out of date.
   */
  sourceVersion: number;
  text: T;
}

/** Both cards for one destination country. */
export interface Destination {
  chefCard: {
    /** Front of the chef card. null until it's been written. */
    front: Translation<ChefCardText> | null;
    /**
     * Short extra notes on the front for kitchen staff who speak another
     * language, e.g. Burmese in Thailand.
     */
    staffNotes: readonly Translation<string>[];
  };
  /** English name, e.g. "Thailand". */
  country: string;
  emergencyCard: {
    /** Front of the emergency card. null until it's been written. */
    front: Translation<EmergencyCardText> | null;
  };
  /** The number to call for an ambulance, e.g. "1669" in Thailand. */
  emergencyNumber: string;
  /**
   * Website copy (not card text): the local cooking equipment and habits
   * this country's chef card addresses, to finish the sentence "written for
   * Thai kitchens, down to …". Leave out until the card's kitchen lines exist.
   */
  kitchenFocus?: string;
  /**
   * Website copy (not card text): where peanuts commonly turn up in local
   * food. Empty hides the section.
   */
  peanutFoods: readonly string[];
  /** URL segment, e.g. "thailand" → /thailand. */
  slug: string;
}
