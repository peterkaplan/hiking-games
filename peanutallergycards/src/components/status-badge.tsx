import type { TranslationState } from "@/content/cards";

export const stateLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "In review",
  ready: "Available",
};

const stateStyle: Record<TranslationState, string> = {
  missing: "bg-paper",
  "out-of-date": "bg-butter",
  draft: "bg-butter",
  ready: "bg-go text-white",
};

export const StatusBadge = ({ state }: { state: TranslationState }) => (
  <span
    className={`px-frame font-pixel inline-flex shrink-0 items-center px-2 py-0.5 text-sm ${stateStyle[state]}`}
  >
    {stateLabel[state]}
  </span>
);
