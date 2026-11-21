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
import { destinationState, frontLanguages } from "@/content/cards";
import type { Mark } from "@/content/comparison";
import { comparisonColumns, comparisonRows } from "@/content/comparison";
import type { FaqItem } from "@/content/faq";
import { formatPrice, lowestPriceUsd } from "@/content/pricing";
import { placeholderReviews } from "@/content/reviews";
import { CheckIcon } from "./bits";
import { Backdrop, CardSetShot, destinationTint } from "./product-shots";

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
        <span className="border-shop-ink bg-shop-cream absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-xs uppercase">
          {stateLabel[destinationState(destination)]}
        </span>
        <span className="absolute top-4 right-4 font-mono text-sm">
          from {formatPrice(lowestPriceUsd)}
        </span>
      </div>
      <p className="text-shop-ink/60 mt-5 font-mono text-xs tracking-widest uppercase">
        {languages || "Local language"} + English
      </p>
      <h3 className="mt-1 font-serif text-3xl underline-offset-4 group-hover:underline">
        {destination.country}
      </h3>
      <p className="text-shop-ink/80 mt-1">
        Chef card + emergency card · ambulance {destination.emergencyNumber}
      </p>
    </Link>
  );
};

/* How it works ------------------------------------------------------------ */

const steps: readonly { body: string; scene: ReactNode; title: string }[] = [
  {
    title: "Show the card",
    body: "Hand it over before you order and ask for it to go to the kitchen.",
    scene: <ShowVignette />,
  },
  {
    title: "They read it",
    body: "In their own language: peanuts, peanut oil, sauces, shared woks.",
    scene: <ReadVignette />,
  },
  {
    title: "They say yes or no",
    body: "One clear question gets a real answer, not a polite nod.",
    scene: <AnswerVignette />,
  },
  {
    title: "You eat with confidence",
    body: "A yes means it's confirmed. A no means you find somewhere that can.",
    scene: <EatVignette />,
  },
];

export const HowItWorks = () => (
  <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => (
      <li key={step.title}>
        <div className="ring-shop-ink overflow-hidden rounded-[24px] ring-2">
          {step.scene}
        </div>
        <p className="text-shop-yes-dark mt-5 font-mono text-xs tracking-widest uppercase">
          Step {index + 1}
        </p>
        <h3 className="mt-1 font-serif text-2xl">{step.title}</h3>
        <p className="text-shop-ink/80 mt-2">{step.body}</p>
      </li>
    ))}
  </ol>
);

/* Comparison table -------------------------------------------------------- */

const MarkCell = ({ mark }: { mark: Mark }) => {
  if (mark === "yes") {
    return (
      <span className="text-shop-yes inline-flex">
        <CheckIcon className="size-6" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (mark === "no") {
    return (
      <span className="text-shop-ink/40 font-mono text-xl">
        <span aria-hidden="true">✕</span>
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className="text-shop-ink/60 font-mono text-sm">Varies</span>;
};

export const ComparisonTable = () => (
  <div className="border-shop-ink relative overflow-x-auto rounded-[24px] border-2 bg-white">
    <table className="w-full min-w-[620px] border-collapse text-left">
      <thead>
        <tr className="border-shop-ink border-b-2">
          <th className="p-4 font-normal sm:p-5" scope="col">
            <span className="sr-only">Feature</span>
          </th>
          <th
            className="bg-shop-mint p-4 text-center font-serif text-lg sm:p-5"
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
            className="border-shop-ink/15 border-b last:border-b-0"
            key={row.feature}
          >
            <th className="p-4 font-medium sm:p-5" scope="row">
              {row.feature}
            </th>
            <td className="bg-shop-mint/60 p-4 text-center sm:p-5">
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
    <p className="bg-shop-sun inline-block rounded-full px-3 py-1 font-mono text-xs uppercase">
      Placeholder reviews: replace with real ones before launch
    </p>
    <ul className="mt-8 grid gap-6 md:grid-cols-3">
      {placeholderReviews.map((review) => (
        <li
          className="border-shop-ink/80 flex flex-col rounded-[24px] border-2 border-dashed bg-white p-6"
          key={review.title}
        >
          <p className="font-serif text-2xl">{review.title}</p>
          <p className="text-shop-ink/70 mt-3 flex-1 italic">{review.quote}</p>
          <p className="text-shop-ink/60 mt-6 font-mono text-xs uppercase">
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
        <summary className="focus-visible:outline-shop-yes flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl focus-visible:outline-3 sm:text-2xl">
          {item.question}
          <span
            aria-hidden="true"
            className="border-shop-ink group-open:bg-shop-ink group-open:text-shop-cream grid size-9 shrink-0 place-items-center rounded-full border-2 font-mono text-xl transition group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <p className="text-shop-ink/80 max-w-3xl pb-6">{item.answer}</p>
      </details>
    ))}
  </div>
);
