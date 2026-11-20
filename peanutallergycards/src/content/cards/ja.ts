import type { CardLanguage } from "./types";

/**
 * Japanese: the first language to launch (see docs/strategy.md).
 * Not translated yet. Follow docs/translation-process.md: translate from the
 * current English source, then have a native speaker review it.
 */
export const japanese: CardLanguage = {
  code: "ja",
  name: "Japanese",
  nativeName: "日本語",
  slug: "japanese",
  translation: null,
};
