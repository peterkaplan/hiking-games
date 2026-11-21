import type { Metadata } from "next";
import Link from "next/link";
import { PixelArt } from "@/components/pixel/pixel";
import { bubbleYesLeft, chef, noPeanut } from "@/components/pixel/sprites";
import {
  buttonPrimary,
  buttonSecondary,
  CheckIcon,
  Eyebrow,
  Marquee,
  Sticker,
} from "@/components/shop/bits";
import { CountryBrowser } from "@/components/shop/country-browser";
import { Flag } from "@/components/shop/flags";
import {
  Backdrop,
  CardSetShot,
  PhoneShot,
} from "@/components/shop/product-shots";
import {
  HowItWorks,
  PlaceholderReviews,
  ProductTile,
  ShopFaq,
  StoryTeaser,
  TripPackTile,
} from "@/components/shop/sections";
import { destinations, findDestination } from "@/content/cards";
import { englishChefCard } from "@/content/cards/english";
import {
  catalogue,
  findCountry,
  languageCount,
  NEEDS_SEARCH,
} from "@/content/catalogue";
import { homeFaqItems } from "@/content/faq";
import { LAUNCH_PREVIEW } from "@/content/launch-preview";
import {
  formatPrice,
  lowestPriceUsd,
  maxSaving,
  maxSavingCountries,
} from "@/content/pricing";

export const metadata: Metadata = {
  title: {
    absolute:
      "Peanut Allergy Cards for Restaurants Abroad: Japanese, Thai and more",
  },
  description:
    "Peanut allergy cards for eating in restaurants abroad. Hand the card to your waiter, get a clear yes or no from the kitchen, and eat with confidence. Emergency card and local peanut guide included.",
};

const benefits = [
  "Hand it to your waiter",
  "Get a straight answer from the kitchen",
  "No miscommunication",
  "No translator app",
  "No wifi",
  "Local peanut guide included",
] as const;

const Hero = () => {
  const showcase = findDestination("thailand") ?? destinations[0];
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 overflow-x-clip px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-16 lg:pb-24">
      <div>
        <Eyebrow>Peanut allergy cards for restaurants abroad</Eyebrow>
        <h1 className="mt-5 font-serif text-[3.25rem] leading-[0.98] tracking-tight sm:text-6xl xl:text-[4rem]">
          Eat in restaurants abroad with confidence.
        </h1>
        <p className="text-shop-ink mt-6 max-w-lg text-xl">
          A peanut allergy card in the local language. Hand it to your waiter,
          get a clear yes or no from the chef, and enjoy the meal. No guessing,
          no miscommunication.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link className={buttonPrimary} href="#destinations">
            Shop by country
          </Link>
          <Link className={buttonSecondary} href="#how-it-works">
            How it works
          </Link>
        </div>
        <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-base">
          {[
            "A straight yes or no from the kitchen",
            "Comes with a local peanut guide",
            `On your phone in minutes, from ${formatPrice(lowestPriceUsd)}`,
          ].map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <CheckIcon className="size-5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {showcase ? (
        <div className="relative order-first [--shot-zoom:0.4] sm:[--shot-zoom:0.62] lg:order-none lg:[--shot-zoom:0.66]">
          <Backdrop className="bg-shop-backdrop-1">
            <CardSetShot destination={showcase} />
          </Backdrop>
          <Sticker className="text-shop-highlight absolute -top-8 -left-2 z-10 size-32 rotate-[-10deg] sm:-top-8 sm:-left-10">
            No miscom&shy;munication
          </Sticker>
          <Sticker className="text-shop-panel absolute -right-1 -bottom-10 z-10 size-24 rotate-[8deg] sm:-right-6 sm:-bottom-8">
            No app. No wifi.
          </Sticker>
        </div>
      ) : null}
    </section>
  );
};

const Statement = () => (
  <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
    <div className="flex items-end justify-between gap-10">
      <p className="font-serif text-5xl leading-[1.12] tracking-tight sm:text-7xl sm:leading-[1.1]">
        One card. One question.{" "}
        <span className="bg-shop-highlight text-shop-on-highlight inline-block px-3 whitespace-nowrap">
          A clear yes.
        </span>
      </p>
      <div
        aria-hidden="true"
        className="hidden shrink-0 items-end gap-1 xl:flex"
      >
        <PixelArt className="w-20" rows={bubbleYesLeft} />
        <PixelArt className="w-28" rows={chef} />
      </div>
    </div>
    <p className="text-shop-ink mt-8 max-w-2xl text-xl">
      Hand it to your waiter, server or bartender. It tells the chef what you
      can&apos;t eat, then asks if they can cook for you. Sit down knowing, not
      hoping.
    </p>
  </section>
);

const countWords: Record<number, string> = { 2: "Two", 3: "Three" };

/** Each card is adapted to how that country cooks, not only its language. */
const LocalKitchen = () => {
  const example = findDestination("thailand");
  return (
    <section
      aria-labelledby="kitchen-heading"
      className="mx-auto max-w-7xl px-4 pb-24 sm:px-6"
    >
      <div className="bg-shop-panel border-shop-ink grid items-center gap-10 rounded-[32px] border-2 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div>
          <h2
            className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
            id="kitchen-heading"
          >
            Written for the kitchen, not just the language.
          </h2>
          <p className="mt-5 max-w-lg text-xl">
            Every country cooks differently, so every card is different. Each
            one names the cooking styles and equipment your waiter and chef
            actually use, so there&apos;s no doubt about what you mean.
          </p>
        </div>
        {example ? (
          <figure className="bg-shop-highlight text-shop-on-highlight rotate-1 rounded-[24px] p-6 sm:p-8">
            <figcaption className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase">
              <Flag
                className="border-shop-ink w-10 rounded-md border"
                code={findCountry(example.slug)?.code ?? "th"}
              />
              On the {example.country} card
            </figcaption>
            <ul className="mt-5 space-y-4 font-serif text-2xl leading-snug sm:text-3xl">
              {englishChefCard.kitchen.map((line) => (
                <li key={line}>“{line}”</li>
              ))}
            </ul>
          </figure>
        ) : null}
      </div>
    </section>
  );
};

/** Wider screens only: on phones the Trip Pack tile above does this job. */
const TripPack = () => {
  const showcase = findDestination("thailand") ?? destinations[0];
  return (
    <section
      className="bg-shop-band text-shop-on-band mx-4 hidden scroll-mt-24 rounded-[32px] sm:mx-6 md:block"
      id="trip-pack"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12">
        <div>
          <p className="text-shop-on-band font-mono text-xs tracking-[0.18em] uppercase">
            The trip pack
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
            {countWords[maxSavingCountries] ?? maxSavingCountries} countries.{" "}
            {maxSaving}% off.
          </h2>
          <p className="text-shop-on-band mt-6 max-w-md text-xl">
            One trip, a few borders. Both cards for every stop, printed or
            digital.
          </p>
          <Link
            className="bg-shop-bg text-shop-ink hover:bg-shop-panel focus-visible:outline-shop-on-band mt-9 inline-flex rounded-full px-7 py-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-4"
            href="/v2/trip-pack"
          >
            Build your trip pack
          </Link>
        </div>
        {showcase ? (
          <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-6">
            <PhoneShot destination={showcase} />
            <div className="bg-shop-bg text-shop-ink -rotate-2 rounded-[24px] p-5">
              <PixelArt className="size-12" rows={noPeanut} />
              <p className="mt-3 font-serif text-2xl">Laminated + digital</p>
              <p className="text-shop-ink mt-1 text-base">
                Wipe-clean cards for your wallet. The digital set comes free.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const ShopHome = () => (
  <main>
    <Hero />
    <Marquee items={benefits} />

    <section
      aria-labelledby="destinations-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-24 sm:px-6"
      id="destinations"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          className="font-serif text-5xl tracking-tight sm:text-6xl"
          id="destinations-heading"
        >
          Shop by country
        </h2>
        <p className="text-shop-ink font-mono text-sm uppercase">
          {NEEDS_SEARCH
            ? `${catalogue.length} countries · ${languageCount} languages`
            : "More countries added all the time"}
        </p>
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <ProductTile destination={destination} key={destination.slug} />
        ))}
        <TripPackTile />
      </div>
      {NEEDS_SEARCH ? (
        <>
          <h3 className="mt-20 font-serif text-3xl sm:text-4xl">
            Now speaking {languageCount} languages.
          </h3>
          <div className="mt-6">
            <CountryBrowser />
          </div>
        </>
      ) : null}
    </section>

    <Statement />

    <LocalKitchen />

    <section
      aria-labelledby="how-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6"
      id="how-it-works"
    >
      <h2 className="font-serif text-4xl sm:text-5xl" id="how-heading">
        Show it. Hear yes. Dig in.
      </h2>
      <div className="mt-10">
        <HowItWorks />
      </div>
    </section>

    <TripPack />

    <section
      aria-labelledby="story-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 sm:px-6"
      id="story"
    >
      <StoryTeaser />
    </section>

    {LAUNCH_PREVIEW ? null : (
      <section
        aria-labelledby="reviews-heading"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-24 sm:px-6"
        id="reviews"
      >
        <h2 className="font-serif text-4xl sm:text-5xl" id="reviews-heading">
          From travellers
        </h2>
        <div className="mt-6">
          <PlaceholderReviews />
        </div>
      </section>
    )}

    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-24 sm:px-6"
      id="faq"
    >
      <h2 className="font-serif text-4xl sm:text-5xl" id="faq-heading">
        Good questions
      </h2>
      <div className="mt-8">
        <ShopFaq items={homeFaqItems} />
      </div>
    </section>
  </main>
);

export default ShopHome;
