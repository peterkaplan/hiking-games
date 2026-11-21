import type { ReactNode } from "react";

export interface GallerySlide {
  /** Tailwind background class for the "studio" backdrop. */
  backdrop: string;
  content: ReactNode;
  id: string;
  label: string;
}

/*
 * Which slide shows is decided in CSS from the checked thumbnail, so the
 * gallery works before (and without) any script. Tailwind needs the class
 * names written out, hence one per position.
 */
const showWhenChecked = [
  "group-has-[[data-slide='0']:checked]/gallery:block",
  "group-has-[[data-slide='1']:checked]/gallery:block",
  "group-has-[[data-slide='2']:checked]/gallery:block",
  "group-has-[[data-slide='3']:checked]/gallery:block",
  "group-has-[[data-slide='4']:checked]/gallery:block",
  "group-has-[[data-slide='5']:checked]/gallery:block",
  "group-has-[[data-slide='6']:checked]/gallery:block",
  "group-has-[[data-slide='7']:checked]/gallery:block",
];

/** Product images with a vertical (desktop) or horizontal (mobile) thumb rail. */
export const ProductGallery = ({
  name,
  slides,
}: {
  /** Groups the thumbnails; unique per gallery on a page. */
  name: string;
  slides: readonly GallerySlide[];
}) => {
  const shown = slides.slice(0, showWhenChecked.length);
  return (
    <div className="group/gallery flex flex-col-reverse gap-4 md:flex-row">
      <fieldset className="flex min-w-0 gap-3 overflow-x-auto p-1 md:w-26 md:shrink-0 md:flex-col md:overflow-visible">
        <legend className="sr-only">Product images</legend>
        {shown.map((slide, index) => (
          <label
            className={`${slide.backdrop} hover:ring-shop-ink has-checked:ring-shop-ink has-focus-visible:outline-shop-ink relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-2xl ring-2 ring-transparent transition has-focus-visible:outline-3 md:size-24`}
            key={slide.id}
          >
            <input
              className="sr-only"
              data-slide={index}
              defaultChecked={index === 0}
              name={name}
              type="radio"
            />
            {/* The slide drawn at 4× the thumb's width, scaled down to fit. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 block w-[360%] -translate-x-1/2 -translate-y-1/2 scale-25 [--shot-zoom:0.36]"
            >
              {slide.content}
            </span>
            <span className="sr-only">{slide.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="min-w-0 flex-1">
        {shown.map((slide, index) => (
          <figure
            className={`hidden ${showWhenChecked.at(index) ?? ""}`}
            key={slide.id}
          >
            <div
              className={`${slide.backdrop} flex aspect-[4/3] items-center justify-center rounded-[28px] p-4 sm:aspect-auto sm:min-h-[560px] sm:p-12`}
            >
              <div className="w-full max-w-xl [--shot-zoom:0.4] sm:[--shot-zoom:0.6] lg:[--shot-zoom:0.64]">
                {slide.content}
              </div>
            </div>
            <figcaption className="text-shop-ink mt-3 hidden font-mono text-xs tracking-widest uppercase sm:block">
              {slide.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
