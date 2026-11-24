import Link from "next/link";
import type { ReactNode } from "react";
import { Photo } from "@/components/photo";
import {
  AnswerVignette,
  EatVignette,
  ReadVignette,
  ShowVignette,
} from "@/components/pixel/vignettes";
import { stateLabel } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import { findDestination, frontLanguages } from "@/content/cards";
import { productPath } from "@/content/catalogue";
import type { Mark } from "@/content/comparison";
import { comparisonColumns, comparisonRows } from "@/content/comparison";
import type { FaqItem } from "@/content/faq";
import { displayState } from "@/content/launch-preview";
import { formatPrice, lowestPriceUsd, maxSaving } from "@/content/pricing";
import { placeholderReviews } from "@/content/reviews";
import { story } from "@/content/story";
import leftBehind from "@/images/left-behind.webp";
import { CheckIcon } from "./bits";
import {
  Backdrop,
  CardSetShot,
  ChefFrontCard,
  destinationTint,
} from "./product-shots";

/* Product tile ------------------------------------------------------------ */

export const ProductTile = ({ destination }: { destination: Destination }) => {
  const languages = frontLanguages(destination)
    .map((language) => language.name)
    .join(" + ");
  return (
    <Link className="group block" href={productPath(destination.slug)}>
      <div className="relative">
        <Backdrop
          className={`${destinationTint(destination.slug)} aspect-square overflow-hidden transition duration-300 [--shot-zoom:0.32] group-hover:rounded-[40px] min-[380px]:[--shot-zoom:0.4] sm:[--shot-zoom:0.3] lg:[--shot-zoom:0.4]`}
        >
          <div className="transition duration-300 group-hover:scale-[1.03]">
            <CardSetShot destination={destination} />
          </div>
        </Backdrop>
        <span className="border-shop-ink bg-shop-bg absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-xs uppercase">
          {stateLabel[displayState(destination)]}
        </span>
        <span className="border-shop-ink bg-shop-bg absolute top-4 right-4 rounded-full border px-3 py-1 font-mono text-sm">
          from {formatPrice(lowestPriceUsd)}
        </span>
      </div>
      <p className="text-shop-ink mt-5 font-mono text-xs tracking-widest uppercase">
        {languages || "Local language"} + English
      </p>
      <h3 className="mt-1 font-serif text-3xl underline-offset-4 group-hover:underline">
        {destination.country}
      </h3>
      <p className="text-shop-ink mt-1">
        Chef card + emergency card · ambulance {destination.emergencyNumber}
      </p>
      <span className="border-shop-ink group-hover:bg-shop-ink group-hover:text-shop-bg mt-5 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition">
        See the {destination.country} cards <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
};

/* Trip pack tile ----------------------------------------------------------- */

/** The bundle, as a product tile beside the countries. */
export const TripPackTile = () => (
  <Link className="group block" href="/trip-pack">
    <div className="relative">
      <div className="overflow-hidden rounded-[28px] transition-all duration-300 group-hover:rounded-[40px]">
        <Photo
          alt="A neatly packed suitcase, with one peanut left behind on the floor outside it"
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={leftBehind}
        />
      </div>
      <span className="border-shop-ink bg-shop-bg absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-xs uppercase">
        Save {maxSaving}%
      </span>
    </div>
    <p className="text-shop-ink mt-5 font-mono text-xs tracking-widest uppercase">
      Every country on your trip
    </p>
    <h3 className="mt-1 font-serif text-3xl underline-offset-4 group-hover:underline">
      The Trip Pack
    </h3>
    <p className="text-shop-ink mt-2">
      Both cards and a peanut guide for every stop
    </p>
    <span className="border-shop-ink group-hover:bg-shop-ink group-hover:text-shop-bg mt-4 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition">
      Build your trip pack <span aria-hidden="true">→</span>
    </span>
  </Link>
);

/* How it works ------------------------------------------------------------ */

const steps: readonly { body: string; scene: ReactNode; title: string }[] = [
  {
    title: "Hand it to your waiter",
    body: "At the restaurant, before you order. Ask your waiter or server to take it to the chef.",
    scene: <ShowVignette tint="var(--color-shop-panel)" />,
  },
  {
    title: "The chef reads it",
    body: "In their own language: peanuts, peanut oil, sauces, shared woks.",
    scene: <ReadVignette tint="var(--color-shop-backdrop-1)" />,
  },
  {
    title: "They say yes or no",
    body: "One clear question gets a real answer. No miscommunication.",
    scene: <AnswerVignette tint="var(--color-shop-highlight)" />,
  },
  {
    title: "You eat with confidence",
    body: "A yes means it's confirmed. A no means you find somewhere that can.",
    scene: <EatVignette tint="var(--color-shop-backdrop-1)" />,
  },
];

export const HowItWorks = () => (
  <ol className="grid gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
    {steps.map((step, index) => (
      // On phones each step is a row (picture beside the words) to save height.
      <li
        className="grid grid-cols-[7.5rem_1fr] items-center gap-4 sm:block"
        key={step.title}
      >
        <div className="ring-shop-ink overflow-hidden rounded-2xl ring-2 sm:rounded-[24px]">
          {step.scene}
        </div>
        <div className="min-w-0">
          <p className="text-shop-ink font-mono text-xs tracking-widest uppercase sm:mt-5">
            Step {index + 1}
          </p>
          <h3 className="mt-1 font-serif text-2xl">{step.title}</h3>
          <p className="text-shop-ink mt-1 text-base sm:mt-2 sm:text-lg">
            {step.body}
          </p>
        </div>
      </li>
    ))}
  </ol>
);

/* Comparison table -------------------------------------------------------- */

const MarkCell = ({ mark }: { mark: Mark }) => {
  if (mark === "yes") {
    return (
      <span className="inline-flex">
        <CheckIcon className="size-6" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (mark === "no") {
    return (
      <span className="text-shop-ink font-mono text-xl">
        <span aria-hidden="true">✕</span>
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className="text-shop-ink font-mono text-sm">Varies</span>;
};

const markCell = "px-1 py-3 text-center sm:p-5";
const otherColumn =
  "px-1 py-3 text-center font-mono text-[10px] uppercase sm:p-5 sm:text-sm";

/** Narrow enough for a phone: nothing is hidden off to the side. */
export const ComparisonTable = () => (
  <div className="border-shop-ink bg-shop-panel overflow-hidden rounded-[24px] border-2">
    <table className="w-full table-fixed border-collapse text-left sm:table-auto">
      <caption className="sr-only">
        How {comparisonColumns.us} compare with other allergy cards and with a
        translation app
      </caption>
      <colgroup>
        <col className="w-[37%] sm:w-auto" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr className="border-shop-ink border-b-2">
          <th className="p-3 font-normal sm:p-5" scope="col">
            <span className="sr-only">Feature</span>
          </th>
          <th
            className="bg-shop-selected px-1 py-3 text-center font-serif text-sm leading-tight sm:p-5 sm:text-lg"
            scope="col"
          >
            {comparisonColumns.us}
          </th>
          <th className={otherColumn} scope="col">
            {comparisonColumns.freeCard}
          </th>
          <th className={otherColumn} scope="col">
            {comparisonColumns.translationApp}
          </th>
        </tr>
      </thead>
      <tbody>
        {comparisonRows.map((row) => (
          <tr
            className="border-shop-ink border-b last:border-b-0"
            key={row.feature}
          >
            <th
              className="p-3 text-sm font-medium sm:p-5 sm:text-lg [tr:first-child>&]:font-serif [tr:first-child>&]:text-xl [tr:first-child>&]:font-normal sm:[tr:first-child>&]:text-3xl"
              scope="row"
            >
              {row.feature}
            </th>
            <td className={`bg-shop-selected ${markCell}`}>
              <MarkCell mark={row.us} />
            </td>
            <td className={markCell}>
              <MarkCell mark={row.freeCard} />
            </td>
            <td className={markCell}>
              <MarkCell mark={row.translationApp} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* Reviews (placeholders) -------------------------------------------------- */

export const PlaceholderReviews = () => (
  <div>
    <p className="bg-shop-highlight text-shop-on-highlight inline-block rounded-full px-3 py-1 font-mono text-xs uppercase">
      Placeholder reviews: replace with real ones before launch
    </p>
    <ul className="mt-8 grid gap-6 md:grid-cols-3">
      {placeholderReviews.map((review) => (
        <li
          className="border-shop-ink bg-shop-panel flex flex-col rounded-[24px] border-2 border-dashed p-6"
          key={review.title}
        >
          <p className="font-serif text-2xl">{review.title}</p>
          <p className="text-shop-ink mt-3 flex-1 italic">{review.quote}</p>
          <p className="text-shop-ink mt-6 font-mono text-xs uppercase">
            {review.trip}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

/* FAQ --------------------------------------------------------------------- */

export const ShopFaq = ({ items }: { items: readonly FaqItem[] }) => (
  <div className="divide-shop-ink border-shop-ink divide-y-2 border-y-2">
    {items.map((item) => (
      <details className="group" key={item.question}>
        <summary className="focus-visible:outline-shop-ink flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl focus-visible:outline-3 sm:text-2xl">
          {item.question}
          <span
            aria-hidden="true"
            className="border-shop-ink group-open:bg-shop-ink group-open:text-shop-bg grid size-9 shrink-0 place-items-center rounded-full border-2 font-mono text-xl transition group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <p className="text-shop-ink max-w-3xl pb-6">{item.answer}</p>
      </details>
    ))}
  </div>
);

/* Guides: links between pages --------------------------------------------- */

export interface ReadingLink {
  blurb: string;
  href: string;
  title: string;
}

export const readingLinks = {
  chefCard: {
    href: "/how-to-use-a-chef-card",
    title: "How to use a peanut allergy chef card",
    blurb: "When to hand it over, and what to do when the answer is no.",
  },
  tokyo: {
    href: "/peanut-free-restaurants-tokyo",
    title: "The best peanut-free restaurants in Tokyo",
    blurb: "Where we ate, and what happened when we showed the card.",
  },
  equalEats: {
    href: "/equal-eats-alternative",
    title: "Equal Eats vs Peanut Allergy Cards",
    blurb: "Wording, price and what's included, side by side.",
  },
} as const satisfies Record<string, ReadingLink>;

/** A row of links to our guides, so readers and search engines find them. */
export const Reading = ({ links }: { links: readonly ReadingLink[] }) => (
  <ul className="grid gap-6 md:grid-cols-3">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          className="border-shop-ink bg-shop-panel hover:bg-shop-highlight focus-visible:outline-shop-ink flex h-full flex-col rounded-[24px] border-2 p-6 transition focus-visible:outline-3 focus-visible:outline-offset-4"
          href={link.href}
        >
          <span className="font-serif text-2xl leading-tight">
            {link.title}
          </span>
          <span className="mt-3 text-base">{link.blurb}</span>
          <span aria-hidden="true" className="mt-auto pt-6 font-mono text-sm">
            READ →
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

/* Founder story: homepage teaser ---------------------------------------- */

/** Julia's original Thai chef card, staged as a product shot. */
export const JuliasCard = () => {
  const thailand = findDestination("thailand");
  if (!thailand?.chefCard.front) {
    return null;
  }
  return (
    <figure className="min-w-0 [--shot-zoom:0.27] min-[380px]:[--shot-zoom:0.33] sm:[--shot-zoom:0.6] lg:[--shot-zoom:0.56]">
      <div className="bg-shop-backdrop-3 border-shop-ink flex justify-center rounded-[28px] border p-6 sm:p-10">
        <div className="w-fit">
          <ChefFrontCard
            className="w-[760px] rotate-2 [zoom:var(--shot-zoom)]"
            destination={thailand}
          />
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-xs tracking-widest uppercase">
        {story.cardCaption}
      </figcaption>
    </figure>
  );
};

/** A short band on the homepage that points to the full story page. */
export const StoryTeaser = () => (
  <div className="bg-shop-panel border-shop-ink grid items-center gap-10 rounded-[32px] border-2 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:p-14">
    <div className="min-w-0">
      <p className="bg-shop-highlight text-shop-on-highlight inline-block rounded-full px-3 py-1 font-mono text-xs uppercase">
        {story.eyebrow}
      </p>
      <h2
        className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
        id="story-heading"
      >
        {story.heading}
      </h2>
      <p className="mt-5 max-w-lg text-xl">{story.teaser}</p>
      <Link
        className="bg-shop-cta text-shop-on-cta focus-visible:outline-shop-ink mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-4"
        href="/our-story"
      >
        Read Julia&apos;s story <span aria-hidden="true">→</span>
      </Link>
    </div>
    <JuliasCard />
  </div>
);
