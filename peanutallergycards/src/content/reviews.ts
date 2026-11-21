/**
 * PLACEHOLDER reviews, only to show the reviews layout.
 *
 * These are not real customers. Every one is shown with a visible
 * "Placeholder" label, and they must be replaced with real, verified reviews
 * (or the section removed) before the store goes live.
 */

export interface PlaceholderReview {
  quote: string;
  title: string;
  trip: string;
}

export const placeholderReviews: readonly PlaceholderReview[] = [
  {
    title: "A real answer, not a nod",
    quote:
      "Placeholder: what a traveller might say about the kitchen confirming their meal was safe.",
    trip: "Placeholder · Japan",
  },
  {
    title: "Used it at every meal",
    quote:
      "Placeholder: a parent describing showing the chef card before every order on a family trip.",
    trip: "Placeholder · Thailand",
  },
  {
    title: "Glad I had the emergency card",
    quote:
      "Placeholder: someone describing why carrying the emergency card gave them peace of mind.",
    trip: "Placeholder · Thailand",
  },
];
