import type { Destination, TranslationState } from "./cards";
import { destinationState } from "./cards";

/**
 * Launch preview: show the store as it will look on launch day, while the
 * translations are still being checked. It changes what the store *displays*
 * (status labels, notices, the buy button's look, unfinished sections).
 *
 * It does not change the card data or `isReady()`. When checkout is built it
 * must use `isReady()`, never this, so an unchecked card can't be sold.
 *
 * Set NEXT_PUBLIC_LAUNCH_PREVIEW=off to see today's real state.
 */
export const LAUNCH_PREVIEW = process.env.NEXT_PUBLIC_LAUNCH_PREVIEW !== "off";

/** The state the store shows for a destination. */
export const displayState = (destination: Destination): TranslationState =>
  LAUNCH_PREVIEW ? "ready" : destinationState(destination);
