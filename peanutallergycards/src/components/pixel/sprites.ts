import { drawRows } from "./pixel";

/* Characters. ------------------------------------------------------------ */

const travellerHead = [
  "......hhhhh.......",
  ".....hhhhhhh......",
  "....hhhhhhhhh.....",
  "....hhhssssss.....",
  "....hhssssksss....",
  "....hhsssssssss...",
  ".....hssssss......",
  "......sssss.......",
  ".......ss.........",
  "....ggbbbbbb......",
  "...gggbbbbbbb.....",
] as const;

const travellerHips = ["......nnnnnnn.....", "......nnnnnnn....."] as const;

const legsStanding = [
  "......nnn.nnn.....",
  "......nnn.nnn.....",
  "......nnn.nnn.....",
  "......nnn.nnn.....",
  "......kkk.kkkk....",
] as const;

const legsStriding = [
  "......nnn.nnn.....",
  ".....nnn...nnn....",
  ".....nnn...nnn....",
  "....nnn.....nnn...",
  "....kkk.....kkkk..",
] as const;

/** Traveller with a backpack, arm held out (to hand over a card). */
export const traveller = [
  ...travellerHead,
  "...gggbbbbbbbbbbss",
  "...GggbbbbbbbbbbSs",
  "...GggbBbbbbb.....",
  "...GggbBbbbbb.....",
  "...GGgbbbbbbb.....",
  ...travellerHips,
  ...legsStanding,
] as const;

const walkerTop = [
  ...travellerHead,
  "...gggbbbbbbb.....",
  "...GggbbbbbbB.....",
  "...GggbBbbbbB.....",
  "...GggbBbbbbs.....",
  "...GGgbbbbbbs.....",
  ...travellerHips,
] as const;

/** Two walking frames, for the footer. */
export const walkerFrames = [
  [...walkerTop, ...legsStriding],
  [...walkerTop, ...legsStanding],
] as const;

/** Chef facing left, in a tall hat. Hands are at rows 14–15, cols 1–2. */
export const chef = [
  "......wwwww.......",
  "....wwwwwwwww.....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
  "....wwwwwwwww.....",
  "....WWWWWWWWW.....",
  "....SSSSSSSShh....",
  "....SkSSSSSShh....",
  "...SSSSSSSSShh....",
  "....SSSSSSSSh.....",
  ".....SSSSSSS......",
  "......SSSS........",
  "....wwwwwwwww.....",
  "...wwwwwwwwwww....",
  ".SSwwwwwwwwwww....",
  ".SSwwwrwwwwwww....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
  "...wwwwwwwwwww....",
] as const;

/** Mouth overlays for the chef, placed at chef (5, 9). */
export const chefMouthNeutral = ["...", ".kk"] as const;
export const chefMouthSmile = ["k..", ".kk"] as const;

/* Props. ----------------------------------------------------------------- */

export const card = [
  "kkkkkkkkkk",
  "kwwwwwwwwk",
  "kwrrwkkkwk",
  "kwrrwwwwwk",
  "kwwwwkkkwk",
  "kwwwwwwwwk",
  "kkkkkkkkkk",
] as const;

export const bowl = [
  "...yoyyyoyy...",
  "..yyyyyyyyyy..",
  "kkkkkkkkkkkkkk",
  "kwwwwwwwwwwwwk",
  "kwrwwrwwrwwrwk",
  ".kwwwwwwwwwwk.",
  "..kwwwwwwwwk..",
  "...kkkkkkkk...",
] as const;

export const steam = [".w.", "w..", ".w.", "..w", ".w."] as const;

export const heart = [
  ".rr.rr.",
  "rrrrrrr",
  "rrrrrrr",
  ".rrrrr.",
  "..rrr..",
  "...r...",
] as const;

export const lantern = [
  "..k..",
  "..k..",
  ".rrr.",
  "rrlrr",
  "rrlrr",
  "rrlrr",
  ".rrr.",
  "..y..",
] as const;

export const cloud = [
  "......wwww..........",
  "....wwwwwwww..ww....",
  "..wwwwwwwwwwwwwwww..",
  ".wwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwww",
  ".WWWWWWWWWWWWWWWWWW.",
] as const;

export const peanut = [
  "..ooo..",
  ".ooooo.",
  ".oOooo.",
  ".ooooo.",
  "..ooo..",
  "..ooo..",
  ".ooooo.",
  ".ooOoo.",
  ".ooooo.",
  "..ooo..",
] as const;

export const check = [
  "........gg",
  ".......ggg",
  "gg....ggg.",
  "ggg..ggg..",
  ".gggggg...",
  "..gggg....",
  "...gg.....",
] as const;

/* Speech bubbles: 13 × 12, with a tail pointing down-left or down-right. --- */

const bubble = (
  fill: string,
  inner: readonly string[],
  tail: "left" | "right"
) => {
  const tailRows =
    tail === "left"
      ? ["..kkk........", "..k.........."]
      : ["........kkk..", "..........k.."];
  return [
    ".kkkkkkkkkkk.",
    ...inner.map((row) => `k${row.replaceAll(".", fill)}k`),
    ".kkkkkkkkkkk.",
    ...tailRows,
  ];
};

const questionMark = [
  "...........",
  "....kkk....",
  "...k...k...",
  ".......k...",
  "......k....",
  ".....k.....",
  "...........",
  ".....k.....",
] as const;

const tick = [
  "...........",
  ".........w.",
  "........ww.",
  ".......ww..",
  ".ww...ww...",
  "..ww.ww....",
  "...www.....",
  "....w......",
] as const;

const blank = Array.from({ length: 8 }, () => "...........");

export const bubbleQuestion = bubble("w", questionMark, "left");
export const bubbleYesLeft = bubble("g", tick, "left");
export const bubbleYesRight = bubble("g", tick, "right");
export const bubbleBlankRight = bubble("w", blank, "right");

/** The logo: a peanut behind a red "no" sign. 16 × 16. */
export const noPeanut = [
  "......rrrr......",
  "....rrrrrrrr....",
  "...rrrwwwwrrr...",
  "..rrrwwwOOoorr..",
  ".rrwrrwwOoooorr.",
  ".rrwwrrwOoooorr.",
  "rrwwwwrrOoooOwrr",
  "rrwwwwwrrOOOOwrr",
  "rrwOOOOOrrwwwwrr",
  "rrwOoooOwrrwwwrr",
  ".rrooooOwwrrwrr.",
  ".rrooooOwwwrrrr.",
  "..rrooOOwwwwrr..",
  "...rrrwwwwrrr...",
  "....rrrrrrrr....",
  "......rrrr......",
] as const;

/* Generated sprites. ------------------------------------------------------ */

export const flagIds = [
  "japan",
  "thailand",
  "china",
  "mexico",
  "italy",
] as const;

export type FlagId = (typeof flagIds)[number];

/** True when there's a pixel flag for this destination slug. */
export const isFlagId = (value: string): value is FlagId =>
  flagIds.some((id) => id === value);

const thirds = (x: number, left: string, middle: string, right: string) => {
  if (x < 6) {
    return left;
  }
  return x < 12 ? middle : right;
};

const thaiStripe = (y: number) => {
  if (y < 2 || y >= 10) {
    return "r";
  }
  return y < 4 || y >= 8 ? "w" : "n";
};

const bigStar = ["..y..", "yyyyy", ".yyy.", ".y.y."] as const;
const smallStars = new Set(["8,1", "9,3", "9,5", "8,7"]);

const chinaPixel = (x: number, y: number) => {
  const star = bigStar[y - 1]?.charAt(x - 1);
  if (star === "y" || smallStars.has(`${x},${y}`)) {
    return "y";
  }
  return "r";
};

/** Flag pixel colour at inner position (x, y) of an 18 × 12 field. */
const flagPixel: Record<FlagId, (x: number, y: number) => string> = {
  japan: (x, y) => (Math.hypot(x - 8.5, y - 5.5) <= 3.6 ? "r" : "w"),
  thailand: (_x, y) => thaiStripe(y),
  china: chinaPixel,
  mexico: (x, y) => {
    if ((x === 8 || x === 9) && (y === 5 || y === 6)) {
      return "O";
    }
    return thirds(x, "G", "w", "r");
  },
  italy: (x) => thirds(x, "G", "w", "r"),
};

/** A flag with an ink border: 20 × 14. */
export const flag = (id: FlagId): string[] =>
  drawRows(20, 14, (x, y) => {
    if (x === 0 || y === 0 || x === 19 || y === 13) {
      return "k";
    }
    return flagPixel[id](x - 1, y - 1);
  });
