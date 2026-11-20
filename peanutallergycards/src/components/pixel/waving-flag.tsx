import { palette } from "./pixel";
import type { FlagId } from "./sprites";
import { flag } from "./sprites";

const colors = new Map<string, string>(Object.entries(palette));

interface ColumnRun {
  color: string;
  height: number;
  y: number;
}

interface Column {
  runs: ColumnRun[];
  x: number;
}

/** Splits a sprite into columns of same-colour vertical runs. */
const toColumns = (rows: readonly string[]): Column[] => {
  const width = rows[0]?.length ?? 0;
  return Array.from({ length: width }, (_, x) => {
    const runs: ColumnRun[] = [];
    let y = 0;
    while (y < rows.length) {
      const key = rows[y]?.charAt(x) ?? ".";
      let end = y + 1;
      while (end < rows.length && rows[end]?.charAt(x) === key) {
        end += 1;
      }
      const color = colors.get(key);
      if (color) {
        runs.push({ color, height: end - y, y });
      }
      y = end;
    }
    return { runs, x };
  });
};

/**
 * A flag on a pole. Each column bobs a pixel out of step with its
 * neighbour, so the flag ripples.
 */
export const WavingFlag = ({
  className,
  id,
}: {
  className?: string;
  id: FlagId;
}) => {
  const columns = toColumns(flag(id));
  return (
    <svg
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
      viewBox="0 0 24 24"
    >
      <rect fill={palette.y} height={2} width={2} x={0} y={0} />
      <rect fill={palette.O} height={22} width={2} x={0} y={2} />
      {columns.map((column) => (
        <g
          className="px-wave"
          key={column.x}
          style={{ animationDelay: `${column.x * -0.09}s` }}
        >
          {column.runs.map((run) => (
            <rect
              fill={run.color}
              height={run.height}
              key={run.y}
              width={1}
              x={column.x + 3}
              y={run.y + 2}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};
