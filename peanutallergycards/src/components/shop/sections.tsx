import Link from "next/link";
import type { ReactNode } from "react";
import {
  AnswerVignette,
  EatVignette,
  ReadVignette,
  ShowVignette,
} from "@/components/pixel/vignettes";
import { stateLabel } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import { destinations, findDestination, frontLanguages } from "@/content/cards";
import type { Mark } from "@/content/comparison";
import { comparisonColumns, comparisonRows } from "@/content/comparison";
import type { FaqItem } from "@/content/faq";
import { displayState } from "@/content/launch-preview";
import { formatPrice, lowestPriceUsd } from "@/content/pricing";
import { placeholderReviews } from "@/content/reviews";
import { story } from "@/content/story";
import { CheckIcon } from "./bits";
import { Flag } from "./flags";
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
    <Link className="group block" href={`/v2/${destination.slug}`}>
      <div className="relative">
        <Backdrop
          className={`${destinationTint(destination.slug)} aspect-square transition duration-300 [--shot-zoom:0.4] group-hover:rounded-[40px] sm:[--shot-zoom:0.3] lg:[--shot-zoom:0.4]`}
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

/* Languages covered -------------------------------------------------------- */

const languagePill =
  "border-shop-ink rounded-full border px-2.5 py-1 font-mono text-xs uppercase";

/**
 * Which languages we cover, as flags: the destinations we have cards for
 * (with their honest state from src/content/cards), then the ones coming.
 */
export const LanguagesCovered = ({
  comingNext,
}: {
  comingNext: readonly { country: string; language: string; slug: string }[];
}) => (
  <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
    {destinations.map((destination) => {
      const [language] = frontLanguages(destination);
      return (
        <li key={destination.slug}>
          <Link
            className="group focus-visible:outline-shop-ink block rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-4"
            href={`/v2/${destination.slug}`}
          >
            <Flag
              className="border-shop-ink w-full rounded-2xl border-2 transition-transform group-hover:-rotate-2"
              country={destination.slug}
            />
            <p className="mt-4 font-serif text-2xl leading-tight group-hover:underline">
              {destination.country}
            </p>
            {language ? (
              <p className="mt-1" lang={language.code}>
                {language.nativeName} <span lang="en">· {language.name}</span>
              </p>
            ) : null}
            <p
              className={`bg-shop-highlight text-shop-on-highlight mt-3 inline-block ${languagePill}`}
            >
              {stateLabel[displayState(destination)]}
            </p>
          </Link>
        </li>
      );
    })}
    {comingNext.map((next) => (
      <li key={next.slug}>
        <Flag
          className="border-shop-ink w-full rounded-2xl border-2"
          country={next.slug}
        />
        <p className="mt-4 font-serif text-2xl leading-tight">{next.country}</p>
        <p className="mt-1">{next.language}</p>
        <p className={`bg-shop-panel mt-3 inline-block ${languagePill}`}>
          Coming next
        </p>
      </li>
    ))}
  </ul>
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
  <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => (
      <li key={step.title}>
        <div className="ring-shop-ink overflow-hidden rounded-[24px] ring-2">
          {step.scene}
        </div>
        <p className="text-shop-ink mt-5 font-mono text-xs tracking-widest uppercase">
          Step {index + 1}
        </p>
        <h3 className="mt-1 font-serif text-2xl">{step.title}</h3>
        <p className="text-shop-ink mt-2">{step.body}</p>
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

export const ComparisonTable = () => (
  <div className="border-shop-ink bg-shop-panel relative overflow-x-auto rounded-[24px] border-2">
    <table className="w-full min-w-[620px] border-collapse text-left">
      <thead>
        <tr className="border-shop-ink border-b-2">
          <th className="p-4 font-normal sm:p-5" scope="col">
            <span className="sr-only">Feature</span>
          </th>
          <th
            className="bg-shop-selected p-4 text-center font-serif text-lg sm:p-5"
            scope="col"
          >
            {comparisonColumns.us}
          </th>
          <th
            className="p-4 text-center font-mono text-sm uppercase sm:p-5"
            scope="col"
          >
            {comparisonColumns.freeCard}
          </th>
          <th
            className="p-4 text-center font-mono text-sm uppercase sm:p-5"
            scope="col"
          >
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
              className="p-4 font-medium sm:p-5 [tr:first-child>&]:font-serif [tr:first-child>&]:text-2xl [tr:first-child>&]:font-normal sm:[tr:first-child>&]:text-3xl"
              scope="row"
            >
              {row.feature}
            </th>
            <td className="bg-shop-selected p-4 text-center sm:p-5">
              <MarkCell mark={row.us} />
            </td>
            <td className="p-4 text-center sm:p-5">
              <MarkCell mark={row.freeCard} />
            </td>
            <td className="p-4 text-center sm:p-5">
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

/* Founder story: homepage teaser ---------------------------------------- */

/** Julia's original Thai chef card, staged as a product shot. */
export const JuliasCard = () => {
  const thailand = findDestination("thailand");
  if (!thailand?.chefCard.front) {
    return null;
  }
  return (
    <figure className="[--shot-zoom:0.33] sm:[--shot-zoom:0.6] lg:[--shot-zoom:0.56]">
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
    <div>
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
        href="/v2/our-story"
      >
        Read Julia&apos;s story <span aria-hidden="true">→</span>
      </Link>
    </div>
    <JuliasCard />
  </div>
);
