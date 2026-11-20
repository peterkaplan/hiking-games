import type { ReactNode } from "react";

/** One printed side of a card, with a caption saying which side it is. */
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
    <div
      className="rounded-xl border border-stone-300 bg-white p-6 text-stone-900 shadow-sm"
      lang={lang}
    >
      {children}
    </div>
    <figcaption className="mt-2 text-sm text-stone-500">{label}</figcaption>
  </figure>
);

/** Stands in for a side that hasn't been written yet. */
export const MissingCardFace = ({ label }: { label: string }) => (
  <figure>
    <div className="rounded-xl border-2 border-dashed border-stone-300 p-6 text-stone-500">
      Not written yet.
    </div>
    <figcaption className="mt-2 text-sm text-stone-500">{label}</figcaption>
  </figure>
);

export const Emoji = ({ children }: { children: string }) => (
  <span aria-hidden="true">{children}</span>
);
