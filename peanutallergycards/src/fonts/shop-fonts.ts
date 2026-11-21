import localFont from "next/font/local";

/*
 * Fonts for variant 2 (shop). Loaded with next/font so they're preloaded
 * and the fallback font is sized to match (no layout shift).
 */

export const instrumentSans = localFont({
  src: "./instrument-sans-latin-wght-normal.woff2",
  variable: "--font-instrument-sans",
  weight: "400 700",
  display: "swap",
});

export const youngSerif = localFont({
  src: "./young-serif-latin-400-normal.woff2",
  variable: "--font-young-serif",
  weight: "400",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const dmMono = localFont({
  src: "./dm-mono-latin-400-normal.woff2",
  variable: "--font-dm-mono",
  weight: "400",
  display: "swap",
});

export const shopFontVariables = `${instrumentSans.variable} ${youngSerif.variable} ${dmMono.variable}`;
