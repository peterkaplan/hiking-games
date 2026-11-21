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
import {
  Backdrop,
  CardSetShot,
  PhoneShot,
} from "@/components/shop/product-shots";
import {
  ComparisonTable,
  HowItWorks,
  PlaceholderReviews,
  ProductTile,
  ShopFaq,
} from "@/components/shop/sections";
import { destinations, findDestination } from "@/content/cards";
import { faqItems } from "@/content/faq";
import { bundleTiers, formatPrice, lowestPriceUsd } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Shop peanut allergy cards (variant 2)",
};

const benefits = [
  "Checked by native speakers",
  "English on the back",
  "Local ambulance number",
  "Instant download",
  "Works with no signal",
  "Made for peanut",
] as const;

const comingNext = ["China", "Mexico", "Italy"] as const;

const maxSaving = Math.max(...bundleTiers.map((tier) => tier.discountPercent));

const Hero = () => {
  const showcase = findDestination("thailand") ?? destinations[0];
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 overflow-x-clip px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-16 lg:pb-24">
      <div>
        <Eyebrow>Peanut allergy cards for travel</Eyebrow>
        <h1 className="mt-5 font-serif text-[3.25rem] leading-[0.98] tracking-tight sm:text-7xl">
          Eat abroad with confidence.
        </h1>
        <p className="text-shop-ink/85 mt-6 max-w-lg text-xl">
          A peanut allergy card in the local language. Show it, get a clear yes
          or no from the kitchen, and enjoy the meal.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link className={buttonPrimary} href="#destinations">
            Shop destinations
          </Link>
          <Link className={buttonSecondary} href="#how-it-works">
            How it works
          </Link>
        </div>
        <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-base">
          {[
            "Checked by native speakers",
            "English on the back",
            `From ${formatPrice(lowestPriceUsd)}`,
          ].map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <CheckIcon className="text-shop-yes size-5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {showcase ? (
        <div className="relative [--shot-zoom:0.4] sm:[--shot-zoom:0.62] lg:[--shot-zoom:0.66]">
          <Backdrop className="bg-shop-mint">
            <CardSetShot destination={showcase} />
          </Backdrop>
          <Sticker className="text-shop-sun absolute -top-6 -left-4 rotate-[-10deg] sm:-left-8">
            Checked by a native speaker
          </Sticker>
          <Sticker className="absolute -right-3 -bottom-8 size-24 rotate-[8deg] text-white sm:-right-6">
            English on the back
          </Sticker>
        </div>
      ) : null}
    </section>
  );
};

const Statement = () => (
  <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
    <div className="relative">
      <p className="max-w-5xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
        One card. One question.{" "}
        <span className="text-shop-yes">A clear yes.</span>
      </p>
      <div
        aria-hidden="true"
        className="absolute -top-10 right-0 hidden items-end gap-1 md:flex"
      >
        <PixelArt className="w-20" rows={bubbleYesLeft} />
        <PixelArt className="w-28" rows={chef} />
      </div>
    </div>
    <p className="text-shop-ink/80 mt-8 max-w-2xl text-xl">
      Translation apps can tell a kitchen what you can&apos;t eat. Our cards
      also ask the question that matters: can you make this safe for me? So you
      sit down knowing, not hoping.
    </p>
  </section>
);

const TripPack = () => {
  const showcase = findDestination("thailand") ?? destinations[0];
  return (
    <section className="bg-shop-yes mx-4 rounded-[32px] text-white sm:mx-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-white/80 uppercase">
            The trip pack
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
            Going to more than one country?
          </h2>
          <p className="mt-6 max-w-md text-xl text-white/90">
            Add up to three destinations and save {maxSaving}%. Each comes with
            both cards, printed or digital.
          </p>
          <Link
            className="bg-shop-cream text-shop-ink mt-9 inline-flex rounded-full px-7 py-4 font-semibold hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#destinations"
          >
            Build your trip pack
          </Link>
        </div>
        {showcase ? (
          <div className="grid items-center gap-10 sm:grid-cols-2 sm:gap-6">
            <PhoneShot destination={showcase} />
            <div className="bg-shop-cream text-shop-ink -rotate-2 rounded-[24px] p-5">
              <PixelArt className="size-12" rows={noPeanut} />
              <p className="mt-3 font-serif text-2xl">Printed + laminated</p>
              <p className="text-shop-ink/80 mt-1 text-base">
                Wipe-clean cards for your wallet, plus the digital files.
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
          Shop by destination
        </h2>
        <p className="text-shop-ink/70 font-mono text-sm uppercase">
          Coming next: {comingNext.join(" · ")}
        </p>
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <ProductTile destination={destination} key={destination.slug} />
        ))}
      </div>
    </section>

    <Statement />

    <section
      aria-labelledby="how-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6"
      id="how-it-works"
    >
      <h2 className="font-serif text-4xl sm:text-5xl" id="how-heading">
        How a meal goes
      </h2>
      <div className="mt-10">
        <HowItWorks />
      </div>
    </section>

    <TripPack />

    <section
      aria-labelledby="compare-heading"
      className="mx-auto max-w-5xl px-4 pt-24 sm:px-6"
    >
      <h2
        className="text-center font-serif text-4xl sm:text-5xl"
        id="compare-heading"
      >
        Why not just use an app?
      </h2>
      <div className="mt-10">
        <ComparisonTable />
      </div>
    </section>

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

    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-24 sm:px-6"
      id="faq"
    >
      <h2 className="font-serif text-4xl sm:text-5xl" id="faq-heading">
        Questions
      </h2>
      <div className="mt-8">
        <ShopFaq items={faqItems} />
      </div>
    </section>
  </main>
);

export default ShopHome;
