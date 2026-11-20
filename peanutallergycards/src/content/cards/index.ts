import { ENGLISH_SOURCE_VERSION, english } from "./en";
import { japanese } from "./ja";
import type { CardLanguage } from "./types";

export { ENGLISH_SOURCE_VERSION } from "./en";
export type { CardLanguage, CardText, Review, Translation } from "./types";

/** Every language, in launch-priority order (see docs/strategy.md). */
export const cardLanguages: readonly CardLanguage[] = [english, japanese];

export type TranslationState = "missing" | "draft" | "out-of-date" | "ready";

/**
 * Where a language stands. Only "ready" cards may be offered to people as
 * safe to use: reviewed by a native speaker against the current English text.
 */
export const translationState = (language: CardLanguage): TranslationState => {
  const { translation } = language;
  if (translation === null) {
    return "missing";
  }
  if (translation.sourceVersion !== ENGLISH_SOURCE_VERSION) {
    return "out-of-date";
  }
  if (translation.review.status !== "reviewed") {
    return "draft";
  }
  return "ready";
};

export const isReady = (language: CardLanguage): boolean =>
  translationState(language) === "ready";
