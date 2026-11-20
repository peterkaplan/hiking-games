/**
 * Card content model. Every page, PDF, Etsy file and wallet pass is generated
 * from these types, so card wording only ever lives in src/content/cards/.
 */

/** The words printed on a card, in one language. */
export interface CardText {
  /** What to do if a reaction happens. */
  emergency: string;
  /** Large line at the top, e.g. "I have a severe peanut allergy". */
  headline: string;
  /** Body sentences, printed in order. */
  lines: readonly string[];
}

/**
 * Who checked a translation. A translation is only shown as ready once a
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

export interface Translation {
  review: Review;
  /**
   * The ENGLISH_SOURCE_VERSION this translation was made from. When the
   * English source changes, older translations are treated as out of date.
   */
  sourceVersion: number;
  text: CardText;
}

export interface CardLanguage {
  /** BCP 47 code, e.g. "ja", "zh-Hans", "es-MX". */
  code: string;
  /** English name, e.g. "Japanese". */
  name: string;
  /** Name in the language itself, e.g. "日本語". */
  nativeName: string;
  /** URL segment, e.g. "japanese" → /japanese. */
  slug: string;
  /** null until someone has translated the card. */
  translation: Translation | null;
}
