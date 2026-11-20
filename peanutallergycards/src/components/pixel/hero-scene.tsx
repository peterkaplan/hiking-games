import { palette, Sprite } from "./pixel";
import {
  bowl,
  bubbleQuestion,
  bubbleYesLeft,
  card,
  chef,
  chefMouthNeutral,
  chefMouthSmile,
  heart,
  lantern,
  steam,
  traveller,
} from "./sprites";

/*
 * The hero animation, on a 128 × 80 pixel stage. One 10-second loop, timed
 * in globals.css (the `hero-*` keyframes) to match the headline's three beats:
 *   show the card → the chef reads it and answers ✓ → the food arrives.
 * Without animation (reduced motion) every element rests in its final state.
 */

const STAGE_WIDTH = 128;
const FLOOR_Y = 76;
const COUNTER_X = 58;
const COUNTER_TOP = 56;

const Awning = () => (
  <g>
    {Array.from({ length: STAGE_WIDTH / 8 }, (_, index) => {
      const x = index * 8;
      const fill = index % 2 === 0 ? palette.r : palette.w;
      return (
        <g key={x}>
          <rect fill={fill} height={8} width={8} x={x} y={0} />
          <rect fill={fill} height={1} width={6} x={x + 1} y={8} />
          <rect fill={fill} height={1} width={4} x={x + 2} y={9} />
        </g>
      );
    })}
  </g>
);

const MenuBoard = () => (
  <g>
    <rect fill={palette.T} height={20} width={32} x={6} y={18} />
    <rect fill={palette.O} height={16} width={28} x={8} y={20} />
    <rect fill={palette.y} height={1} width={14} x={11} y={23} />
    <rect fill={palette.w} height={1} width={3} x={29} y={23} />
    <rect fill={palette.y} height={1} width={10} x={11} y={27} />
    <rect fill={palette.w} height={1} width={3} x={29} y={27} />
    <rect fill={palette.y} height={1} width={12} x={11} y={31} />
    <rect fill={palette.w} height={1} width={3} x={29} y={31} />
  </g>
);

const Counter = () => (
  <g>
    <rect
      fill={palette.T}
      height={FLOOR_Y - COUNTER_TOP}
      width={STAGE_WIDTH - COUNTER_X}
      x={COUNTER_X}
      y={COUNTER_TOP}
    />
    <rect
      fill={palette.o}
      height={1}
      width={STAGE_WIDTH - COUNTER_X}
      x={COUNTER_X}
      y={COUNTER_TOP}
    />
    <rect
      fill={palette.O}
      height={2}
      width={STAGE_WIDTH - COUNTER_X}
      x={COUNTER_X}
      y={COUNTER_TOP + 1}
    />
    {[70, 86, 102, 118].map((x) => (
      <rect fill={palette.O} height={16} key={x} width={1} x={x} y={60} />
    ))}
  </g>
);

const Floor = () => (
  <g>
    {Array.from({ length: STAGE_WIDTH / 8 }, (_, index) => index * 8).map(
      (x) => (
        <rect
          fill={x % 16 === 0 ? palette.O : palette.T}
          height={4}
          key={x}
          width={8}
          x={x}
          y={FLOOR_Y}
        />
      )
    )}
  </g>
);

export const HeroScene = () => (
  <svg
    className="block h-auto w-full"
    role="img"
    shapeRendering="crispEdges"
    viewBox="0 0 128 80"
  >
    <title>
      A traveller hands a peanut allergy card to a chef at a food stall. The
      chef reads it, answers with a green tick, and serves a bowl of noodles.
    </title>
    <rect fill={palette.c} height={FLOOR_Y} width={STAGE_WIDTH} />
    <MenuBoard />
    <Awning />
    <Sprite className="px-bob" rows={lantern} x={46} y={10} />
    <Sprite className="px-bob px-delay-half" rows={lantern} x={66} y={10} />

    {/* Chef, behind the counter. */}
    <Sprite rows={chef} x={94} y={40} />
    <Sprite className="hero-mouth" rows={chefMouthNeutral} x={99} y={49} />
    <Sprite className="hero-smile" rows={chefMouthSmile} x={99} y={49} />

    <Counter />
    <Floor />

    {/* The food, served on the counter in front of the traveller. */}
    <g transform="translate(60 48)">
      <g className="hero-bowl">
        <Sprite rows={bowl} />
        <Sprite className="px-steam" rows={steam} x={3} y={-6} />
        <Sprite className="px-steam px-delay-half" rows={steam} x={8} y={-7} />
      </g>
    </g>

    <Sprite rows={traveller} x={14} y={53} />

    {/* The card travels from the traveller's hand to the chef. */}
    <Sprite className="hero-card" rows={card} x={30} y={61} />

    <Sprite className="hero-question" rows={bubbleQuestion} x={102} y={26} />
    <Sprite className="hero-yes" rows={bubbleYesLeft} x={102} y={26} />

    <g className="hero-hearts">
      <Sprite rows={heart} x={14} y={42} />
      <Sprite rows={heart} x={24} y={38} />
    </g>
  </svg>
);
