import type { ReactNode } from "react";

/*
 * Small national flags, simplified (no emblems). Drawn here because flag
 * emoji don't show on every device. Decorative: always pair one with the
 * country's name. Colours are the flags' own, not the store palette.
 */

const starPoints = (cx: number, cy: number, radius: number): string =>
  Array.from({ length: 10 }, (_, index) => {
    const angle = (Math.PI / 5) * index - Math.PI / 2;
    const reach = index % 2 === 0 ? radius : radius * 0.4;
    return `${(cx + Math.cos(angle) * reach).toFixed(2)},${(cy + Math.sin(angle) * reach).toFixed(2)}`;
  }).join(" ");

const tricolour = (left: string, right: string): ReactNode => (
  <>
    <rect fill="#ffffff" height="40" width="60" />
    <rect fill={left} height="40" width="20" />
    <rect fill={right} height="40" width="20" x="40" />
  </>
);

const flags: Record<string, ReactNode> = {
  china: (
    <>
      <rect fill="#de2910" height="40" width="60" />
      <polygon fill="#ffde00" points={starPoints(11, 11, 6)} />
      <polygon fill="#ffde00" points={starPoints(21, 5, 2)} />
      <polygon fill="#ffde00" points={starPoints(25, 9, 2)} />
      <polygon fill="#ffde00" points={starPoints(25, 15, 2)} />
      <polygon fill="#ffde00" points={starPoints(21, 19, 2)} />
    </>
  ),
  italy: tricolour("#009246", "#ce2b37"),
  japan: (
    <>
      <rect fill="#ffffff" height="40" width="60" />
      <circle cx="30" cy="20" fill="#bc002d" r="12" />
    </>
  ),
  mexico: (
    <>
      {tricolour("#006847", "#ce1126")}
      <circle cx="30" cy="20" fill="#8a6d3b" r="4" />
    </>
  ),
  thailand: (
    <>
      <rect fill="#a51931" height="40" width="60" />
      <rect fill="#f4f5f8" height="26.67" width="60" y="6.67" />
      <rect fill="#2d2a4a" height="13.33" width="60" y="13.33" />
    </>
  ),
};

/** A flag by country slug ("japan"), or nothing if we haven't drawn it. */
export const Flag = ({
  className = "",
  country,
}: {
  className?: string;
  country: string;
}) => {
  const flag = flags[country];
  if (!flag) {
    return null;
  }
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-flag=""
      viewBox="0 0 60 40"
    >
      {flag}
    </svg>
  );
};
