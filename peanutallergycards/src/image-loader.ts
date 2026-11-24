import variants from "@/images/variants.json" with { type: "json" };

/** Where static files live: the site root, unless a preview build moves it. */
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/";

/** "/_next/static/media/wok.0abc.webp" -> "wok" */
const PHOTO_NAME = /\/(?<name>[a-z0-9-]+)\.[^/]*\.webp$/u;

const known: Record<string, { hash: string; widths: number[] } | undefined> =
  variants;

type Loader = (image: { src: string; width: number }) => string;

/**
 * Picks the resized copy of a photo for the width the browser asked for, in
 * one format. The copies are made by scripts/build-images.mjs; anything
 * that isn't one of our photos is returned untouched.
 */
const loaderFor =
  (format: "avif" | "webp"): Loader =>
  ({ src, width }) => {
    const name = PHOTO_NAME.exec(src)?.groups?.name;
    const photo = name ? known[name] : undefined;
    if (!(name && photo)) {
      return src;
    }
    const fitting =
      photo.widths.find((candidate) => candidate >= width) ??
      photo.widths.at(-1);
    return `${ASSET_BASE}img/${name}.${photo.hash}.${fitting}.${format}`;
  };

/** The smaller, newer format. Offered first; see src/components/photo.tsx. */
export const avifLoader = loaderFor("avif");

/** The default for next/image: WebP, which every browser we support reads. */
export default loaderFor("webp");
