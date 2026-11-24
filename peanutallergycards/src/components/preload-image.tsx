"use client";

import { preload } from "react-dom";

/**
 * Tells the browser about a page's top photo before it has read the page.
 *
 * It is a client component on purpose: it then only runs for the page that
 * really shows the photo. (As server code it also ran for the "not found"
 * page, which Next.js prepares behind every page.)
 */
export const PreloadImage = ({
  sizes,
  src,
  srcSet,
  type,
}: {
  sizes: string;
  src: string;
  srcSet: string;
  type: string;
}) => {
  preload(src, {
    as: "image",
    fetchPriority: "high",
    imageSizes: sizes,
    imageSrcSet: srcSet,
    type,
  });
  return null;
};
