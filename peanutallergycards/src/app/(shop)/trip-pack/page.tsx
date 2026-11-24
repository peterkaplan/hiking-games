import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { Backdrop, CardSetShot } from "@/components/shop/product-shots";
import { ComparisonTable, ShopFaq } from "@/components/shop/sections";
import {
  savingsSummary,
  TripPackBuilder,
} from "@/components/shop/trip-pack-builder";
import { destinations } from "@/content/cards";
import { faqItems } from "@/content/faq";
import { maxSaving } from "@/content/pricing";
import { breadcrumbData, faqData, pageMetadata } from "@/content/seo";
import leftBehind from "@/images/left-behind.webp";
import securityTray from "@/images/security-tray.webp";

export const metadata: Metadata = pageMetadata({
  title: `The Trip Pack: Peanut Allergy Travel Cards, Save ${maxSaving}%`,
  titleIsComplete: true,
  description: `One pack for a multi-country trip: a chef card, an emergency card and a local peanut guide for every country you're visiting. Save up to ${maxSaving}%.`,
  path: "/trip-pack",
});

const tints = ["bg-shop-backdrop-1", "bg-shop-backdrop-2"];

const TripPackPage = () => (
  <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
    <JsonLd
      data={[
        breadcrumbData([
          { name: "Home", path: "/" },
          { name: "The Trip Pack", path: "/trip-pack" },
        ]),
        faqData(faqItems),
      ]}
    />
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="grid min-w-0 grid-cols-2 content-start gap-4 lg:col-span-7">
        <Photo
          alt="A neatly packed suitcase, with one peanut left behind on the floor outside it"
          className="col-span-2 aspect-[4/3] w-full rounded-[28px] object-cover"
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={leftBehind}
        />
        {destinations.slice(0, 2).map((destination, index) => (
          <Backdrop
            className={`${tints.at(index) ?? tints[0]} aspect-square overflow-hidden p-3 [--shot-zoom:0.13] min-[380px]:[--shot-zoom:0.16] sm:p-10 sm:[--shot-zoom:0.22] lg:[--shot-zoom:0.25]`}
            key={destination.slug}
          >
            <CardSetShot destination={destination} />
          </Backdrop>
        ))}
      </div>

      <div className="min-w-0 lg:col-span-5">
        <p className="bg-shop-highlight text-shop-on-highlight inline-block rounded-full px-3 py-1 font-mono text-xs uppercase">
          {savingsSummary}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">
          The Trip Pack
        </h1>
        <p className="mt-2 font-mono text-sm uppercase">
          Every country on your trip, in one pack
        </p>
        <p className="mt-4 text-xl">
          One trip, a few borders. A chef card, an emergency card and a peanut
          guide for every stop.
        </p>
        <div className="mt-6">
          <TripPackBuilder />
        </div>
      </div>
    </div>

    <Photo
      alt="An airport security tray holding a belt, keys, phone and sunglasses, with one peanut set apart in the corner"
      className="mt-24 aspect-[16/9] w-full rounded-[28px] object-cover sm:aspect-[21/9]"
      sizes="(min-width: 1280px) 1232px, 100vw"
      src={securityTray}
    />

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
      <div className="mt-10">
        <ComparisonTable />
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl pt-28">
      <h2 className="font-serif text-4xl sm:text-5xl" id="faq-heading">
        Good questions
      </h2>
      <div className="mt-8">
        <ShopFaq items={faqItems} />
      </div>
    </section>
  </main>
);

export default TripPackPage;
