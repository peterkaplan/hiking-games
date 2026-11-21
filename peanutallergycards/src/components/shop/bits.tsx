import type { ReactNode } from "react";

/* Small shared pieces of the shop variant. */

const starburst = Array.from({ length: 28 }, (_, index) => {
  const radius = index % 2 === 0 ? 50 : 44;
  const angle = (Math.PI * 2 * index) / 28;
  return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

/**
 * A round, zig-zag-edged sticker badge, as stuck on DTC product shots.
 * Pass a positioning class (e.g. `absolute …` or `relative`).
 */
export const Sticker = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`grid size-28 place-items-center ${className}`}>
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full"
      viewBox="0 0 100 100"
    >
      <polygon fill="currentColor" points={starburst} />
    </svg>
    <span className="text-shop-ink relative px-4 text-center font-mono text-[11px] leading-tight uppercase">
      {children}
    </span>
  </div>
);

/** A scrolling strip of short benefits. */
export const Marquee = ({ items }: { items: readonly string[] }) => (
  <div className="border-shop-ink bg-shop-sun overflow-hidden border-y-2 py-3">
    <div className="shop-marquee flex w-max">
      {[0, 1].map((copy) => (
        <ul
          aria-hidden={copy === 1 ? true : undefined}
          className="text-shop-ink flex shrink-0 items-center gap-10 pr-10 font-mono text-sm uppercase"
          key={copy}
        >
          {items.map((item) => (
            <li className="flex items-center gap-10" key={item}>
              {item}
              <span aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export const CheckIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 20 20">
    <circle cx="10" cy="10" fill="currentColor" r="10" />
    <path
      d="m5.5 10.5 3 3 6-7"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

/** Primary and secondary pill buttons. */
export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-shop-yes px-7 py-4 font-semibold text-white shadow-[0_4px_0_0_var(--color-shop-yes-dark)] transition hover:-translate-y-px hover:shadow-[0_5px_0_0_var(--color-shop-yes-dark)] active:translate-y-1 active:shadow-none focus-visible:outline-3 focus-visible:outline-shop-ink focus-visible:outline-offset-4";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-shop-ink px-7 py-3.5 font-semibold transition hover:bg-shop-ink hover:text-shop-cream focus-visible:outline-3 focus-visible:outline-shop-ink focus-visible:outline-offset-4";

/** A small label in the mono face, e.g. "THE TRIP PACK". */
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-shop-ink/70 font-mono text-xs tracking-[0.18em] uppercase">
    {children}
  </p>
);
