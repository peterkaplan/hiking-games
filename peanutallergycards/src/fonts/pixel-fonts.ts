import localFont from "next/font/local";

/*
 * Fonts for variant 1 (pixel). Loaded with next/font so they're preloaded
 * and the fallback font is sized to match, which stops text jumping when the
 * real font arrives (layout shift).
 */

export const atkinson = localFont({
  src: "./atkinson-hyperlegible-next-latin-wght-normal.woff2",
  variable: "--font-atkinson",
  weight: "200 800",
  display: "swap",
});

/** Headings and buttons. 27px grid: use at 27px or 54px only. */
export const jersey15 = localFont({
  src: "./jersey-15-latin-400-normal.woff2",
  variable: "--font-jersey-15",
  weight: "400",
  display: "swap",
});

/** Small labels. 8px grid: use at 16px or 24px only. */
export const tiny5 = localFont({
  src: "./tiny5-latin-400-normal.woff2",
  variable: "--font-tiny5",
  weight: "400",
  display: "swap",
});

export const pixelFontVariables = `${atkinson.variable} ${jersey15.variable} ${tiny5.variable}`;
