import type { StaticImageData } from "next/image";
import { getImageProps } from "next/image";
import { PreloadImage } from "@/components/preload-image";
import { avifLoader } from "@/image-loader";

/**
 * One of our photos (src/images), at the right size for the screen and in
 * the smallest format the browser reads: AVIF first, WebP for older phones.
 *
 * Use it like an <img>: `className` styles the image itself. The <picture>
 * wrapper takes no space of its own, so layout classes (grid, order, span)
 * behave as if the image were there directly.
 */
export const Photo = ({
  alt,
  className,
  priority = false,
  sizes,
  src,
}: {
  alt: string;
  className?: string;
  /** For the one photo at the top of a page: load it first. */
  priority?: boolean;
  /** How wide the photo is shown, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  src: StaticImageData;
}) => {
  const common = {
    alt,
    sizes,
    src,
    ...(priority
      ? { fetchPriority: "high" as const, loading: "eager" as const }
      : {}),
  };
  const { props: webp } = getImageProps(common);
  const { props: avif } = getImageProps({ ...common, loader: avifLoader });
  const hasAvif = avif.srcSet?.includes(".avif") ?? false;

  return (
    <picture className="contents">
      {priority && hasAvif && avif.srcSet ? (
        <PreloadImage
          sizes={sizes}
          src={avif.src}
          srcSet={avif.srcSet}
          type="image/avif"
        />
      ) : null}
      {hasAvif ? (
        <source sizes={sizes} srcSet={avif.srcSet} type="image/avif" />
      ) : null}
      <img
        {...webp}
        alt={alt}
        className={className}
        height={webp.height}
        width={webp.width}
      />
    </picture>
  );
};
