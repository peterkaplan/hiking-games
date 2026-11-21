"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useState } from "react";

export interface GallerySlide {
  /** Tailwind background class for the "studio" backdrop. */
  backdrop: string;
  content: ReactNode;
  id: string;
  label: string;
}

/** Product images with a vertical (desktop) or horizontal (mobile) thumb rail. */
export const ProductGallery = ({
  slides,
}: {
  slides: readonly GallerySlide[];
}) => {
  const [selectedId, setSelectedId] = useState(slides[0]?.id);
  const selected = slides.find((slide) => slide.id === selectedId) ?? slides[0];
  const handleSelect = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      setSelectedId(event.currentTarget.value),
    []
  );

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 overflow-x-auto pb-1 md:w-24 md:shrink-0 md:flex-col md:overflow-visible md:pb-0">
        {slides.map((slide) => (
          <button
            aria-pressed={slide.id === selected?.id}
            className={`${slide.backdrop} hover:ring-shop-ink/40 focus-visible:outline-shop-yes aria-pressed:ring-shop-ink relative size-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition focus-visible:outline-3 md:size-24`}
            key={slide.id}
            onClick={handleSelect}
            type="button"
            value={slide.id}
          >
            {/* The slide drawn at 4× the thumb's width, scaled down to fit. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 block w-[360%] -translate-x-1/2 -translate-y-1/2 scale-25 [--shot-zoom:0.36]"
            >
              {slide.content}
            </span>
            <span className="sr-only">{slide.label}</span>
          </button>
        ))}
      </div>
      <figure className="flex-1">
        <div
          className={`${selected?.backdrop ?? ""} flex aspect-[4/3] items-center justify-center rounded-[28px] p-4 sm:aspect-auto sm:min-h-[560px] sm:p-12`}
        >
          <div
            className="w-full max-w-xl [--shot-zoom:0.4] sm:[--shot-zoom:0.6] lg:[--shot-zoom:0.64]"
            key={selected?.id}
          >
            {selected?.content}
          </div>
        </div>
        <figcaption className="text-shop-ink/85 mt-3 hidden font-mono text-xs tracking-widest uppercase sm:block">
          {selected?.label}
        </figcaption>
      </figure>
    </div>
  );
};
