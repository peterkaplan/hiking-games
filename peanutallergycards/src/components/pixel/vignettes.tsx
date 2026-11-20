import type { ReactNode } from "react";
import { palette, Sprite } from "./pixel";
import {
  bowl,
  bubbleBlankRight,
  bubbleYesRight,
  card,
  chef,
  chefMouthNeutral,
  chefMouthSmile,
  heart,
  steam,
  traveller,
} from "./sprites";

/** Small looping scenes, 48 × 32, one per step of a meal. */

const Stage = ({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) => (
  <svg
    aria-hidden="true"
    className="block h-auto w-full"
    shapeRendering="crispEdges"
    viewBox="0 0 48 32"
  >
    <rect fill={background} height={32} width={48} />
    {children}
  </svg>
);

export const ShowVignette = () => (
  <Stage background={palette.u}>
    <rect fill={palette.m} height={2} width={48} y={30} />
    <Sprite rows={traveller} x={8} y={8} />
    <Sprite className="px-bob" rows={card} x={24} y={15} />
  </Stage>
);

export const ReadVignette = () => (
  <Stage background={palette.c}>
    <Sprite rows={chef} x={24} y={10} />
    <Sprite rows={chefMouthNeutral} x={29} y={19} />
    <Sprite rows={card} x={16} y={22} />
    <Sprite rows={bubbleBlankRight} x={10} y={0} />
    <rect
      className="px-dot-1"
      fill={palette.k}
      height={1}
      width={1}
      x={14}
      y={5}
    />
    <rect
      className="px-dot-2"
      fill={palette.k}
      height={1}
      width={1}
      x={17}
      y={5}
    />
    <rect
      className="px-dot-3"
      fill={palette.k}
      height={1}
      width={1}
      x={20}
      y={5}
    />
  </Stage>
);

export const AnswerVignette = () => (
  <Stage background={palette.m}>
    <Sprite rows={chef} x={24} y={10} />
    <Sprite rows={chefMouthSmile} x={29} y={19} />
    <Sprite rows={card} x={16} y={22} />
    <Sprite className="px-bob" rows={bubbleYesRight} x={10} y={0} />
  </Stage>
);

export const EatVignette = () => (
  <Stage background={palette.Y}>
    <rect fill={palette.O} height={4} width={48} y={28} />
    <Sprite rows={bowl} x={17} y={20} />
    <Sprite className="px-steam" rows={steam} x={20} y={13} />
    <Sprite className="px-steam px-delay-half" rows={steam} x={25} y={12} />
    <Sprite className="px-rise" rows={heart} x={33} y={6} />
  </Stage>
);
