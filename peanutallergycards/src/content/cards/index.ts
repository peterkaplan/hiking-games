import {
  ENGLISH_SOURCE_VERSION,
  englishChefCard,
  englishEmergencyCard,
} from "./english";
import { japan } from "./japan";
import { thailand } from "./thailand";
import type {
  ChefCardText,
  Destination,
  EmergencyCardText,
  Language,
  Translation,
} from "./types";

/** Every destination, in launch-priority order (see docs/strategy.md). */
export const destinations: readonly Destination[] = [japan, thailand];

export const findDestination = (slug: string): Destination | undefined =>
  destinations.find((destination) => destination.slug === slug);

/** The English backs of a destination's two cards. */
export const cardBacks = (
  destination: Destination
): { chef: ChefCardText; emergency: EmergencyCardText } => ({
  chef: englishChefCard,
  emergency: englishEmergencyCard(destination.emergencyNumber),
});

/** The languages on a destination's card fronts, main language first. */
export const frontLanguages = (destination: Destination): Language[] => {
  const languages = [
    destination.chefCard.front?.language,
    destination.emergencyCard.front?.language,
    ...destination.chefCard.staffNotes.map((note) => note.language),
  ].filter((language) => language !== undefined);
  return languages.filter(
    (language, index) =>
      languages.findIndex((other) => other.code === language.code) === index
  );
};

/** A line of local-language text to show off a destination, if any exists. */
export const sampleHeadline = (
  destination: Destination
): { language: Language; text: string } | null => {
  const chef = destination.chefCard.front;
  if (chef) {
    return { language: chef.language, text: chef.text.headline };
  }
  const emergency = destination.emergencyCard.front;
  if (emergency) {
    return { language: emergency.language, text: emergency.text.headline };
  }
  return null;
};

export type TranslationState = "missing" | "draft" | "out-of-date" | "ready";

/** Worst first: a destination takes the worst state of any of its parts. */
const stateOrder: readonly TranslationState[] = [
  "missing",
  "out-of-date",
  "draft",
  "ready",
];

/**
 * Where one translation stands. "ready" means reviewed by a native speaker
 * against the current English text.
 */
export const translationState = <T>(
  translation: Translation<T> | null
): TranslationState => {
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

/** The worst state across every translated part of a destination's cards. */
export const destinationState = (
  destination: Destination
): TranslationState => {
  const states = [
    translationState(destination.chefCard.front),
    translationState(destination.emergencyCard.front),
    ...destination.chefCard.staffNotes.map(translationState),
  ];
  return stateOrder.find((state) => states.includes(state)) ?? "ready";
};

const countProblem = (
  part: string,
  actual: number,
  expected: number
): string[] =>
  actual === expected
    ? []
    : [`${part} has ${actual} lines but the English has ${expected}`];

/**
 * Mistakes that must never reach a printed card, such as the wrong emergency
 * number. Pages refuse to build while any destination has problems.
 */
export const contentProblems = (destination: Destination): string[] => {
  const { country, emergencyNumber } = destination;
  const problems: string[] = [];
  const emergency = destination.emergencyCard.front;
  if (emergency && !emergency.text.call.includes(emergencyNumber)) {
    problems.push(
      `${country}: the ${emergency.language.name} emergency card doesn't mention ${emergencyNumber}`
    );
  }
  const chef = destination.chefCard.front;
  if (chef) {
    const label = `${country}: ${chef.language.name} chef card`;
    problems.push(
      ...countProblem(
        `${label} risks`,
        chef.text.risks.length,
        englishChefCard.risks.length
      ),
      ...countProblem(
        `${label} kitchen`,
        chef.text.kitchen.length,
        englishChefCard.kitchen.length
      )
    );
  }
  return problems;
};

/** Throws if any destination has content problems. Called at build time. */
export const assertValidContent = (): void => {
  const problems = destinations.flatMap(contentProblems);
  if (problems.length > 0) {
    throw new Error(`Card content problems:\n- ${problems.join("\n- ")}`);
  }
};

/** Only offer a destination's cards to people as ready when this is true. */
export const isReady = (destination: Destination): boolean =>
  destinationState(destination) === "ready" &&
  contentProblems(destination).length === 0;

export { ENGLISH_SOURCE_VERSION } from "./english";
export type {
  ChefCardText,
  Destination,
  EmergencyCardText,
  Language,
  Review,
  Translation,
} from "./types";
