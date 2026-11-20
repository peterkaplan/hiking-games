/**
 * Tiny pixel-art engine. A sprite is a list of strings, one character per
 * pixel; each character is a colour from `palette` ("." is transparent).
 * Sprites render as crisp SVG rectangles, so they scale to any size.
 */

export const palette = {
  k: "#1d1b33", // ink outline
  w: "#fff8ec", // white
  W: "#d9d2c5", // light grey
  s: "#f3b58c", // skin, traveller
  S: "#b0703f", // skin, chef
  h: "#4a3122", // hair
  b: "#3c7dd9", // shirt
  B: "#2b5ca8", // shirt shade
  n: "#2c3156", // navy
  r: "#e83a4f", // red
  R: "#b02236", // dark red
  g: "#19a35b", // green
  G: "#0f7a42", // dark green
  y: "#ffd23f", // yellow
  Y: "#fff1b8", // butter
  o: "#e39a45", // peanut
  O: "#8a5426", // wood
  T: "#5e3518", // dark wood
  c: "#ffe2b8", // peach
  l: "#ffb03a", // lantern glow
  u: "#bde3ff", // sky
  m: "#c9f0d8", // mint
} as const;

const colors = new Map<string, string>(Object.entries(palette));

interface Run {
  color: string;
  width: number;
  x: number;
  y: number;
}

/** Merges each row's same-colour neighbours into one rectangle. */
const toRuns = (rows: readonly string[]): Run[] => {
  const runs: Run[] = [];
  for (const [y, row] of rows.entries()) {
    let x = 0;
    while (x < row.length) {
      const key = row.charAt(x);
      let end = x + 1;
      while (end < row.length && row.charAt(end) === key) {
        end += 1;
      }
      const color = colors.get(key);
      if (color) {
        runs.push({ color, width: end - x, x, y });
      }
      x = end;
    }
  }
  return runs;
};

/**
 * A sprite placed inside a parent <svg>. The outer group positions it; the
 * inner group carries `className`, so CSS animations can move it without
 * overriding its position.
 */
export const Sprite = ({
  className,
  rows,
  x = 0,
  y = 0,
}: {
  className?: string;
  rows: readonly string[];
  x?: number;
  y?: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <g className={className}>
      {toRuns(rows).map((run) => (
        <rect
          fill={run.color}
          height={1}
          key={`${run.x}-${run.y}`}
          width={run.width}
          x={run.x}
          y={run.y}
        />
      ))}
    </g>
  </g>
);

const size = (rows: readonly string[]) => ({
  height: rows.length,
  width: Math.max(...rows.map((row) => row.length)),
});

/** A standalone decorative sprite. */
export const PixelArt = ({
  className,
  rows,
}: {
  className?: string;
  rows: readonly string[];
}) => {
  const { height, width } = size(rows);
  return (
    <svg
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
      viewBox={`0 0 ${width} ${height}`}
    >
      <Sprite rows={rows} />
    </svg>
  );
};

/** Builds sprite rows from a function of each pixel's position. */
export const drawRows = (
  width: number,
  height: number,
  pixel: (x: number, y: number) => string
): string[] =>
  Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (__, x) => pixel(x, y)).join("")
  );
