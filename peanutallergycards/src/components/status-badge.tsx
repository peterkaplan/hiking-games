import type { TranslationState } from "@/content/cards";

export const stateLabel: Record<TranslationState, string> = {
  missing: "Coming soon",
  "out-of-date": "Being updated",
  draft: "In review",
  ready: "Available",
};

const stateStyle: Record<TranslationState, string> = {
  missing: "bg-stone-100 text-stone-700",
  "out-of-date": "bg-amber-100 text-amber-900",
  draft: "bg-amber-100 text-amber-900",
  ready: "bg-emerald-100 text-emerald-900",
};

export const StatusBadge = ({ state }: { state: TranslationState }) => (
  <span
    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${stateStyle[state]}`}
  >
    {stateLabel[state]}
  </span>
);
