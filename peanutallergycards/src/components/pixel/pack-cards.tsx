import type { ReactNode } from "react";
import { palette, Sprite } from "./pixel";
import { noPeanut } from "./sprites";

/*
 * Pixel illustrations of the two cards. Every few seconds each card flips
 * from the local-language front (squiggly "script") to the English back.
 */

/** Short, heavy dashes that read as foreign script at this size. */
const scriptLines = [
  "kkk..kk..kkkk...",
  "kkk..kk..kkkk...",
  "................",
  "................",
  "kkkkk..kkk..kk..",
  "kkkkk..kkk..kk..",
  "................",
  "................",
  "kk..kkkk..kkk...",
  "kk..kkkk..kkk...",
  "................",
  "................",
  "kkkk..kk..kkkkk.",
  "kkkk..kk..kkkkk.",
] as const;

/** Thin, even lines that read as English text. */
const englishLines = [
  "WWWWWWWWWWWWWW..",
  "................",
  "................",
  "................",
  "WWWWWWWWWWWW....",
  "................",
  "................",
  "................",
  "WWWWWWWWWWWWWWW.",
  "................",
  "................",
  "................",
  "WWWWWWWWWW......",
] as const;

const ScriptLines = ({ x, y }: { x: number; y: number }) => (
  <Sprite rows={scriptLines} x={x} y={y} />
);

const EnglishLines = ({ x, y }: { x: number; y: number }) => (
  <Sprite rows={englishLines} x={x} y={y + 1} />
);

/** "EN" tag in a 3 × 5 pixel font. */
const EnTag = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect fill={palette.b} height={7} width={10} />
    <Sprite
      rows={["www.w..w", "w...ww.w", "ww..w.ww", "w...w..w", "www.w..w"]}
      x={1}
      y={1}
    />
  </g>
);

const CardBody = ({ children }: { children: ReactNode }) => (
  <g>
    <rect fill={palette.k} height={26} width={38} x={1} y={1} />
    <rect fill={palette.w} height={24} width={36} x={2} y={2} />
    {children}
  </g>
);

const Flipper = ({
  back,
  front,
  title,
}: {
  back: ReactNode;
  front: ReactNode;
  title: string;
}) => (
  <svg
    className="block h-auto w-full"
    role="img"
    shapeRendering="crispEdges"
    viewBox="0 0 40 28"
  >
    <title>{title}</title>
    <g className="px-card-flip">
      <g className="px-face-front">{front}</g>
      <g className="px-face-back">{back}</g>
    </g>
  </svg>
);

export const ChefCardPixel = () => (
  <Flipper
    back={
      <CardBody>
        <Sprite rows={noPeanut} x={4} y={6} />
        <EnglishLines x={22} y={12} />
        <EnTag x={26} y={3} />
      </CardBody>
    }
    front={
      <CardBody>
        <Sprite rows={noPeanut} x={4} y={6} />
        <ScriptLines x={22} y={7} />
      </CardBody>
    }
    title="The chef card: local language on the front, English on the back."
  />
);

const EmergencyHeader = () => (
  <g>
    <rect fill={palette.r} height={6} width={36} x={2} y={2} />
    <rect fill={palette.w} height={3} width={1} x={19} y={3} />
    <rect fill={palette.w} height={1} width={1} x={19} y={7} />
  </g>
);

export const EmergencyCardPixel = () => (
  <Flipper
    back={
      <CardBody>
        <EmergencyHeader />
        <EnglishLines x={5} y={10} />
        <rect fill={palette.g} height={4} width={10} x={25} y={19} />
        <EnTag x={25} y={9} />
      </CardBody>
    }
    front={
      <CardBody>
        <EmergencyHeader />
        <ScriptLines x={5} y={11} />
        <rect fill={palette.g} height={4} width={10} x={25} y={19} />
      </CardBody>
    }
    title="The emergency card: local language on the front, English on the back."
  />
);
