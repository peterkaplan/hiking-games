import type { ReactNode } from "react";

/**
 * The printed surface of a card. It's a size container, so the card's
 * content adapts to how wide the card is shown, not to the screen width.
 * (Card designs are placeholders until the real cards are designed.)
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
    className={`border-ink text-ink @container border-2 bg-white p-5 sm:p-6 ${className}`}
    lang={lang}
  >
    {children}
  </div>
);

/** Stands in for a side that hasn't been written yet. */
export const MissingCardSurface = () => (
  <div className="border-ink font-pixel flex min-h-48 items-center justify-center border-2 border-dashed bg-white/60 p-6 text-lg">
    Not written yet
  </div>
);

export const Emoji = ({ children }: { children: string }) => (
  <span aria-hidden="true">{children}</span>
);
