import type { ReactNode } from "react";

/**
 * The printed surface of a card. It's a size container, so the card's
 * content adapts to how wide the card is shown, not to the screen width.
 */
export const CardSurface = ({
  children,
  className = "",
  lang,
}: {
  children: ReactNode;
  className?: string;
  lang: string;
}) => (
  <div
    className={`text-ink @container rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    lang={lang}
  >
    {children}
  </div>
);

/** One side of a card, with a caption saying which side it is. */
export const CardFace = ({
  children,
  label,
  lang,
}: {
  children: ReactNode;
  label: string;
  lang: string;
}) => (
  <figure>
    <CardSurface lang={lang}>{children}</CardSurface>
    <figcaption className="mt-2 text-sm text-stone-500">{label}</figcaption>
  </figure>
);

/** Stands in for a side that hasn't been written yet. */
export const MissingCardSurface = () => (
  <div className="flex min-h-48 items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 p-6 text-stone-500">
    Not written yet.
  </div>
);

export const Emoji = ({ children }: { children: string }) => (
  <span aria-hidden="true">{children}</span>
);
