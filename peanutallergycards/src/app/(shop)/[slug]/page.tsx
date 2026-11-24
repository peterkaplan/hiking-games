import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { PixelArt } from "@/components/pixel/pixel";
import { chef } from "@/components/pixel/sprites";
import { CheckIcon } from "@/components/shop/bits";
import type { GallerySlide } from "@/components/shop/product-gallery";
import { ProductGallery } from "@/components/shop/product-gallery";
import {
  CardSetShot,
  ChefBackCard,
  ChefFrontCard,
  destinationTint,
  EmergencyBackCard,
  EmergencyFrontCard,
  PhoneShot,
  SampleCard,
  SampleSetShot,
} from "@/components/shop/product-shots";
import {
  ComparisonTable,
  HowItWorks,
  PlaceholderReviews,
  ProductTile,
  Reading,
  readingLinks,
  ShopFaq,
} from "@/components/shop/sections";
import { BUY_BUTTON_ID, ShopBuyBox } from "@/components/shop/shop-buy-box";
import { StickyBuyBar } from "@/components/shop/sticky-buy-bar";
import { stateLabel } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import {
  assertValidContent,
  destinations,
  frontLanguages,
} from "@/content/cards";
import type { CatalogueCountry } from "@/content/catalogue";
import {
  catalogue,
  findCountry,
  productPath,
  productSegment,
  shopDestination,
  slugForSegment,
} from "@/content/catalogue";
import { faqItems } from "@/content/faq";
import { displayState, LAUNCH_PREVIEW } from "@/content/launch-preview";
import { formatPrice, formats, lowestPriceUsd } from "@/content/pricing";
import {
  breadcrumbData,
  faqData,
  pageMetadata,
  productData,
} from "@/content/seo";
import { deliveryNote } from "@/content/shipping";
import chefReads from "@/images/chef-reads.webp";
import digIn from "@/images/dig-in.webp";
import handOver from "@/images/hand-over.webp";
import hidingLettuce from "@/images/hiding-lettuce.webp";
import hidingPadThai from "@/images/hiding-pad-thai.webp";
import hidingSatay from "@/images/hiding-satay.webp";
import ramenCounter from "@/images/ramen-counter.webp";
import velvetRope from "@/images/velvet-rope.webp";
import wok from "@/images/wok.webp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

/** One page per country, at its address (see productSegment). */
export const generateStaticParams = () => {
  assertValidContent();
  return catalogue.map(({ slug }) => ({ slug: productSegment(slug) }));
};

/** The destination whose page lives at this address. */
const destinationAt = (segment: string): Destination | undefined =>
  shopDestination(slugForSegment(segment) ?? "");

/** The price of the format that is selected when the page opens. */
const defaultPrice = formats.at(0)?.priceUsd ?? lowestPriceUsd;
const defaultCompareAt = formats.at(0)?.compareAtUsd ?? defaultPrice;

/** "Where peanuts hide": one peanut tucked into each dish. */
const hidingPlaces = [
  {
    src: hidingPadThai,
    alt: "A whole peanut hiding among the noodles of a pad thai",
  },
  {
    src: hidingSatay,
    alt: "Chicken satay skewers with a whole peanut sitting on the peanut dipping sauce",
  },
  {
    src: hidingLettuce,
    alt: "A peanut peeking out from under a lettuce leaf",
  },
];

/** The card in use: handed over, read by the chef, then the meal. */
const inUse = [
  {
    src: handOver,
    alt: "A diner's hand passing a card across the table to a waiter's open hand",
  },
  {
    src: chefReads,
    alt: "A chef in a white jacket holding the card in both hands to read it",
  },
  {
    src: digIn,
    alt: "A hand lifting noodles from a yellow bowl with chopsticks, steam rising",
  },
];

/** A wide photo of the country's kitchen, where we have one. */
const kitchenPhotos: Record<string, { alt: string; src: StaticImageData }> = {
  japan: {
    src: ramenCounter,
    alt: "A chef's hands setting a steaming bowl of ramen on a wooden counter",
  },
  thailand: {
    src: wok,
    alt: "A cook tossing noodles in a blackened wok over a high gas flame",
  },
};

const languageName = (destination: Destination): string =>
  frontLanguages(destination).at(0)?.name ??
  findCountry(destination.slug)?.language ??
  "the local language";

/** Whether we have this country's own card text to show. */
const hasCards = (destination: Destination): boolean =>
  Boolean(destination.chefCard.front ?? destination.emergencyCard.front);

/** "1669" → " (1669)"; nothing when we don't hold the number yet. */
const ambulance = (destination: Destination): string =>
  destination.emergencyNumber ? ` (${destination.emergencyNumber})` : "";

/**
 * The page's headline, in the words people search for: "Japanese Peanut
 * Allergy Cards".
 */
const cardsHeading = (destination: Destination): string => {
  const language =
    frontLanguages(destination).at(0)?.name ??
    findCountry(destination.slug)?.language;
  return language
    ? `${language} Peanut Allergy Cards`
    : `Peanut Allergy Cards for ${destination.country}`;
};

/** The one-line pitch used for search results and link previews. */
const searchDescription = (destination: Destination): string =>
  `A ${languageName(destination)} peanut allergy card to hand your waiter: the kitchen answers yes or no. Plus an emergency card with ${destination.country}'s ambulance number${ambulance(destination)}.`;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const destination = destinationAt((await params).slug);
  if (!destination) {
    return {};
  }
  return pageMetadata({
    title: `${languageName(destination)} Peanut Allergy Card for ${destination.country}`,
    description: searchDescription(destination),
    path: productPath(destination.slug),
    shareTitle: cardsHeading(destination),
    shareDescription: `Hand it to your waiter: the kitchen answers yes or no. Plus an emergency card with ${destination.country}'s ambulance number${ambulance(destination)}.`,
  });
};

const sampleSlides = (country: CatalogueCountry): GallerySlide[] => [
  {
    id: "set",
    label: "The set: chef card and emergency card",
    backdrop: "bg-shop-backdrop-1",
    content: <SampleSetShot country={country} />,
  },
  {
    id: "chef",
    label: `Chef card (${country.language} front, English back)`,
    backdrop: "bg-shop-backdrop-3",
    content: <SampleCard country={country} kind="chef" />,
  },
  {
    id: "emergency",
    label: `Emergency card (${country.language} front, English back)`,
    backdrop: "bg-shop-backdrop-2",
    content: <SampleCard country={country} kind="emergency" />,
  },
];

const slidesFor = (destination: Destination): GallerySlide[] => {
  const country = findCountry(destination.slug);
  if (country && !hasCards(destination)) {
    return sampleSlides(country);
  }
  const language = languageName(destination);
  const tint = destinationTint(destination.slug);
  const slides: GallerySlide[] = [
    {
      id: "set",
      label: "The set: chef card and emergency card",
      backdrop: tint,
      content: <CardSetShot destination={destination} />,
    },
  ];
  if (destination.chefCard.front) {
    slides.push({
      id: "chef-front",
      label: `Chef card, front (${language})`,
      backdrop: "bg-shop-backdrop-3",
      content: <ChefFrontCard destination={destination} />,
    });
  }
  slides.push({
    id: "chef-back",
    label: "Chef card, back (English)",
    backdrop: "bg-shop-backdrop-3",
    content: <ChefBackCard destination={destination} />,
  });
  if (destination.emergencyCard.front) {
    slides.push({
      id: "emergency-front",
      label: `Emergency card, front (${language})`,
      backdrop: "bg-shop-backdrop-2",
      content: <EmergencyFrontCard destination={destination} />,
    });
  }
  slides.push(
    {
      id: "emergency-back",
      label: "Emergency card, back (English)",
      backdrop: "bg-shop-backdrop-2",
      content: <EmergencyBackCard destination={destination} />,
    },
    {
      id: "phone",
      label: "Digital: saved to your phone",
      backdrop: "bg-shop-backdrop-2",
      content: <PhoneShot destination={destination} />,
    }
  );
  return slides;
};

const Accordion = ({
  children,
  open = false,
  title,
}: {
  children: ReactNode;
  open?: boolean;
  title: string;
}) => (
  <details className="group border-shop-ink border-b" open={open}>
    <summary className="focus-visible:outline-shop-ink flex cursor-pointer list-none items-center justify-between py-4 font-semibold focus-visible:outline-3">
      {title}
      <span
        aria-hidden="true"
        className="font-mono text-xl transition group-open:rotate-45"
      >
        +
      </span>
    </summary>
    <p className="text-shop-ink pb-5 text-base">{children}</p>
  </details>
);

/** One 6px "pixel" of the speech bubble's tail. */
const tailPixels = (rows: readonly string[]) =>
  rows.flatMap((row, y) =>
    [...row].flatMap((cell, x) =>
      cell === "." ? [] : [{ ink: cell === "k", key: `${x}-${y}`, x, y }]
    )
  );

/** The bubble's tail, drawn in pixels like the chef: k is ink, w is paper. */
const BubbleTail = ({
  className,
  rows,
}: {
  className: string;
  rows: readonly string[];
}) => (
  <svg
    aria-hidden="true"
    className={className}
    shapeRendering="crispEdges"
    viewBox={`0 0 ${rows.at(0)?.length ?? 0} ${rows.length}`}
  >
    {tailPixels(rows).map((pixel) => (
      <rect
        className={pixel.ink ? "fill-shop-ink" : "fill-shop-panel"}
        height="1"
        key={pixel.key}
        width="1"
        x={pixel.x}
        y={pixel.y}
      />
    ))}
  </svg>
);

/** Notched corners, so the bubble's outline is pixel-stepped like the chef. */
const bubbleCorners = [
  "-top-[6px] -left-[6px]",
  "-top-[6px] -right-[6px]",
  "-bottom-[6px] -left-[6px]",
  "-right-[6px] -bottom-[6px]",
];

/** Tail pointing down to the chef (phones) and left to the chef (wide). */
const tailDown = ["kwwwk", "kwwk.", "kwk..", "kk..."] as const;
const tailLeft = ["...kw", "..kww", ".kwww", "kkkkw", "....k"] as const;

/** The pixel chef teaching the local word for peanut, in a speech bubble. */
const SayPeanut = ({
  entries,
  language,
  languageCode,
}: {
  entries: NonNullable<Destination["sayPeanut"]>;
  language: string;
  languageCode?: string;
}) => (
  <section aria-labelledby="say-heading" className="pt-28">
    <div className="bg-shop-band text-shop-on-band overflow-hidden rounded-[32px] px-6 pt-12 sm:px-12 sm:pt-14">
      <h2 className="font-serif text-4xl sm:text-5xl" id="say-heading">
        Learn to say “peanut” in {language}
      </h2>
      <div className="mt-10 flex flex-col gap-x-10 lg:flex-row lg:items-end">
        <PixelArt
          className="order-last mt-6 w-36 shrink-0 sm:w-44 lg:order-none lg:mt-0 lg:w-56"
          rows={chef}
        />
        <div className="bg-shop-panel text-shop-ink border-shop-ink relative w-fit max-w-full border-[6px] lg:mb-28">
          <ul className="divide-shop-ink grid divide-y-[6px] sm:auto-cols-fr sm:grid-flow-col sm:divide-x-[6px] sm:divide-y-0">
            {entries.map((entry) => (
              <li className="p-6 sm:p-9" key={entry.word}>
                <p
                  className="font-serif text-5xl leading-tight whitespace-nowrap sm:text-7xl"
                  lang={languageCode}
                >
                  {entry.word}
                </p>
                <p className="mt-3 font-serif text-3xl">{entry.romanised}</p>
                <p className="bg-shop-highlight text-shop-on-highlight mt-3 inline-block px-3 py-1 font-mono text-sm uppercase">
                  Say: {entry.soundsLike}
                </p>
                <p className="mt-4 max-w-xs text-base">{entry.note}</p>
              </li>
            ))}
          </ul>
          {bubbleCorners.map((corner) => (
            <span
              aria-hidden="true"
              className={`bg-shop-band absolute size-[6px] ${corner}`}
              key={corner}
            />
          ))}
          <BubbleTail
            className="absolute top-full left-10 -mt-[6px] h-8 w-10 lg:hidden"
            rows={tailDown}
          />
          <BubbleTail
            className="absolute right-full bottom-10 -mr-[8px] hidden size-10 lg:block"
            rows={tailLeft}
          />
        </div>
      </div>
    </div>
  </section>
);

const ProductPage = async ({ params }: PageProps) => {
  const destination = destinationAt((await params).slug);
  if (!destination) {
    notFound();
  }
  const state = displayState(destination);
  const kitchenPhoto = kitchenPhotos[destination.slug];
  const language = languageName(destination);
  const title = `The ${destination.country} Set`;
  const others = destinations.filter(
    (other) => other.slug !== destination.slug
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <JsonLd
        data={[
          productData({
            destination,
            language,
            description: searchDescription(destination),
          }),
          breadcrumbData([
            { name: "Home", path: "/" },
            {
              name: destination.country,
              path: productPath(destination.slug),
            },
          ]),
          faqData(faqItems),
        ]}
      />
      <nav
        aria-label="Breadcrumb"
        className="text-shop-ink hidden font-mono text-xs uppercase sm:block"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link className="inline-block py-1 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              className="inline-block py-1 hover:underline"
              href="/#destinations"
            >
              Shop by country
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{destination.country}</li>
        </ol>
      </nav>

      {state === "ready" ? null : (
        <p className="bg-shop-highlight text-shop-on-highlight rounded-2xl px-4 py-2 text-sm sm:mt-5 sm:px-5 sm:py-3 sm:text-base">
          <strong>Preview:</strong> not yet checked by a native speaker, so not
          on sale.
        </p>
      )}

      <div className="mt-4 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="lg:sticky lg:top-24">
            <ProductGallery
              name="product-images"
              slides={slidesFor(destination)}
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <p className="border-shop-ink hidden rounded-full border px-3 py-1 font-mono text-xs uppercase sm:inline-block">
            {stateLabel[state]}
          </p>
          <h1 className="font-serif text-4xl leading-[1.02] tracking-tight sm:mt-4 sm:text-5xl">
            {cardsHeading(destination)}
          </h1>
          <p className="mt-2 font-mono text-sm uppercase">
            Chef card + emergency card + peanut guide · {language} and English
          </p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-3xl">
              {formatPrice(defaultPrice)}
            </span>
            {defaultCompareAt > defaultPrice ? (
              <s className="text-shop-ink text-xl">
                <span className="sr-only">instead of </span>
                {formatPrice(defaultCompareAt)}
              </s>
            ) : null}
            <span className="text-shop-ink font-mono text-sm uppercase">
              Digital only {formatPrice(lowestPriceUsd)}
            </span>
            {LAUNCH_PREVIEW ? null : (
              <span className="text-shop-ink font-mono text-sm">
                No reviews yet
              </span>
            )}
          </p>
          <p className="text-shop-ink mt-4 text-xl">
            Hand one to your waiter. Get a clear yes or no from the chef.
          </p>

          <div className="mt-6">
            <ShopBuyBox slug={destination.slug} state={state} />
          </div>

          <h2 className="mt-8 font-semibold">Three things in every set</h2>
          <ul className="mt-3 space-y-2.5">
            {[
              `Chef card: written for how ${destination.country} cooks${destination.kitchenFocus ? `, down to ${destination.kitchenFocus}` : ""}. It asks if they can cook for you`,
              `Emergency card: gets someone to call an ambulance${ambulance(destination)}, fast`,
              `Peanut guide: how to say it and where it hides in ${destination.country}`,
            ].map((point) => (
              <li className="flex gap-3" key={point}>
                <CheckIcon className="mt-1 size-5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Accordion open title="What's inside">
              {`Two cards and a guide. The chef card and emergency card are in ${language}, with English on the back. Your peanut guide to ${destination.country} covers how to say and spot "peanut", and the dishes where it hides. Go laminated and we print, laminate and post both cards, and the digital set comes free. Or go digital only: on your phone and in Apple Wallet in minutes.`}
            </Accordion>
            <Accordion title="Details">
              {`Includes: 1 chef card, 1 emergency card and 1 local peanut guide (PDF). Digital set: phone images, an Apple Wallet pass and a print-ready PDF. Languages: ${language} on the front, English on the back. Emergency number: the local ambulance number${ambulance(destination)}. Card size: 85.6 × 54 mm, the size of a bank card. Printed cards are laminated and wipe-clean.`}
            </Accordion>
            <Accordion title="Delivery">
              {deliveryNote}{" "}
              <Link
                className="underline decoration-2 underline-offset-4"
                href="/shipping"
              >
                Shipping and refunds
              </Link>
            </Accordion>
            <Accordion title="How to use them">
              Hand the chef card to your waiter, server or bartender before you
              order and ask them to show the chef. A yes means dig in. A no, or
              a maybe, means try next door. Keep the emergency card with your
              epinephrine.
            </Accordion>
            <Accordion title="How we check translations">
              Native speakers check every card, word by word, against the
              English on the back.
            </Accordion>
          </div>
        </div>
      </div>

      {kitchenPhoto ? (
        <Photo
          alt={kitchenPhoto.alt}
          className="mt-24 aspect-[16/9] w-full rounded-[28px] object-cover sm:aspect-[21/9]"
          sizes="(min-width: 1280px) 1232px, 100vw"
          src={kitchenPhoto.src}
        />
      ) : null}

      {/* One card, two languages: the explainer section. */}
      <section
        aria-labelledby="two-sides-heading"
        className="pt-28"
        hidden={!hasCards(destination)}
      >
        <h2
          className="text-center font-serif text-4xl sm:text-6xl"
          id="two-sides-heading"
        >
          One card, two sides
        </h2>
        <p className="text-shop-ink mx-auto mt-4 max-w-xl text-center text-xl">
          Written for how {destination.country} cooks, not just translated. The
          kitchen reads {language}. You read English. Nothing gets lost.
        </p>
        <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
          <figure>
            <p className="mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Front · for the kitchen
            </p>
            <div
              className={`${destinationTint(destination.slug)} rounded-[28px] p-6 sm:p-10`}
            >
              {destination.chefCard.front ? (
                <ChefFrontCard destination={destination} />
              ) : (
                <EmergencyFrontCard destination={destination} />
              )}
            </div>
          </figure>
          <figure>
            <p className="mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Back · for you
            </p>
            <div className="bg-shop-backdrop-3 rounded-[28px] p-6 sm:p-10">
              {destination.chefCard.front ? (
                <ChefBackCard destination={destination} />
              ) : (
                <EmergencyBackCard destination={destination} />
              )}
            </div>
          </figure>
        </div>
      </section>

      {destination.sayPeanut ? (
        <SayPeanut
          entries={destination.sayPeanut}
          language={language}
          languageCode={frontLanguages(destination).at(0)?.code}
        />
      ) : null}

      {destination.peanutFoods.length > 0 ? (
        <section aria-labelledby="foods-heading" className="pt-28">
          <div className="bg-shop-band text-shop-on-band rounded-[32px] px-6 py-14 sm:px-12">
            <p className="text-shop-highlight font-mono text-xs tracking-[0.18em] uppercase">
              A taste of your peanut guide
            </p>
            <h2
              className="mt-4 font-serif text-4xl sm:text-5xl"
              id="foods-heading"
            >
              Where peanuts hide in {destination.country}
            </h2>
            <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
              {hidingPlaces.map((place) => (
                <li key={place.alt}>
                  <Photo
                    alt={place.alt}
                    className="aspect-square w-full rounded-2xl object-cover sm:rounded-[24px]"
                    sizes="(min-width: 1280px) 380px, 30vw"
                    src={place.src}
                  />
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-3">
              {destination.peanutFoods.map((food) => (
                <li
                  className="border-shop-on-band rounded-full border px-5 py-2.5 text-base"
                  key={food}
                >
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="how-heading" className="pt-28">
        <h2 className="font-serif text-4xl sm:text-5xl" id="how-heading">
          Show it. Hear yes. Dig in.
        </h2>
        <div className="mt-10">
          <HowItWorks />
        </div>
        <ul className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">
          {inUse.map((photo) => (
            <li key={photo.alt}>
              <Photo
                alt={photo.alt}
                className="aspect-square w-full rounded-2xl object-cover sm:aspect-[4/3] sm:rounded-[24px]"
                sizes="(min-width: 1280px) 400px, 33vw"
                src={photo.src}
              />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="compare-heading"
        className="mx-auto max-w-5xl pt-28"
      >
        <h2
          className="text-center font-serif text-4xl sm:text-5xl"
          id="compare-heading"
        >
          An app translates. A card asks.
        </h2>
        <Photo
          alt="A peanut stopped at a red velvet rope, with a candlelit restaurant table beyond it"
          className="mt-10 aspect-[16/9] w-full rounded-[28px] object-cover sm:aspect-[21/9]"
          sizes="(min-width: 1024px) 1024px, 100vw"
          src={velvetRope}
        />
        <div className="mt-8">
          <ComparisonTable />
        </div>
      </section>

      {LAUNCH_PREVIEW ? null : (
        <section aria-labelledby="reviews-heading" className="pt-28">
          <h2 className="font-serif text-4xl sm:text-5xl" id="reviews-heading">
            Reviews
          </h2>
          <div className="mt-6">
            <PlaceholderReviews />
          </div>
        </section>
      )}

      {others.length > 0 ? (
        <section aria-labelledby="more-heading" className="pt-28">
          <h2 className="font-serif text-4xl sm:text-5xl" id="more-heading">
            More stamps in the passport?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <ProductTile destination={other} key={other.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="guides-heading" className="pt-28">
        <h2 className="font-serif text-4xl sm:text-5xl" id="guides-heading">
          Before you go
        </h2>
        <div className="mt-10">
          <Reading
            links={
              destination.slug === "japan"
                ? [
                    readingLinks.tokyo,
                    readingLinks.chefCard,
                    readingLinks.equalEats,
                  ]
                : [readingLinks.chefCard, readingLinks.equalEats]
            }
          />
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl pt-28"
      >
        <h2 className="font-serif text-4xl sm:text-5xl" id="faq-heading">
          Good questions
        </h2>
        <div className="mt-8">
          <ShopFaq items={faqItems} />
        </div>
      </section>

      <StickyBuyBar
        buyButtonId={BUY_BUTTON_ID}
        priceLabel={formatPrice(defaultPrice)}
        title={title}
      />
    </main>
  );
};

export default ProductPage;
