import Link from "next/link";
import { Faq } from "@/components/faq";
import { MealSteps } from "@/components/meal-steps";
import { DriftingClouds, PixelEdge } from "@/components/pixel/decor";
import { HeroScene } from "@/components/pixel/hero-scene";
import {
  ChefCardPixel,
  EmergencyCardPixel,
} from "@/components/pixel/pack-cards";
import { PixelArt, palette } from "@/components/pixel/pixel";
import type { FlagId } from "@/components/pixel/sprites";
import { check, isFlagId } from "@/components/pixel/sprites";
import { WavingFlag } from "@/components/pixel/waving-flag";
import { StatusBadge } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import {
  destinationState,
  destinations,
  frontLanguages,
} from "@/content/cards";
import { faqItems } from "@/content/faq";
import { formatPrice, lowestPriceUsd } from "@/content/pricing";

/** Planned next, from the language priority in docs/strategy.md. */
const comingNext: readonly { flag: FlagId; name: string }[] = [
  { flag: "china", name: "China" },
  { flag: "mexico", name: "Mexico" },
  { flag: "italy", name: "Italy" },
];

const Hero = () => (
  <section className="bg-sky relative overflow-x-clip">
    <DriftingClouds />
    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-10 pb-20 lg:grid-cols-[1fr_1.15fr] lg:pt-16 lg:pb-28">
      <div>
        <h1 className="font-pixel text-px2">
          <span className="beat beat-1 block w-fit">Show the card.</span>
          <span className="beat beat-2 block w-fit">Get a clear yes.</span>
          <span className="text-go-dark block">
            <span className="beat beat-3 whitespace-nowrap">Eat with</span>{" "}
            <span className="beat beat-3 whitespace-nowrap">confidence.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-md text-xl">
          A peanut allergy card in the local language. The kitchen reads exactly
          what you can&apos;t eat, then tells you yes or no. No guessing, no
          polite nods.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Link className="px-btn" href="#destinations">
            Find your destination
          </Link>
          <Link
            className="px-focus font-pixel text-px1 underline decoration-2 underline-offset-4"
            href="#how-it-works"
          >
            How it works
          </Link>
        </div>
      </div>
      <div className="px-frame-raised bg-peach mr-2">
        <HeroScene />
      </div>
    </div>
  </section>
);

const DestinationTile = ({ destination }: { destination: Destination }) => {
  const [mainLanguage] = frontLanguages(destination);
  const languages = frontLanguages(destination)
    .map((language) => language.name)
    .join(", ");
  return (
    <Link
      className="group px-frame-raised px-lift px-focus flex min-w-0 flex-col bg-white p-6"
      href={`/${destination.slug}`}
    >
      <div className="flex items-start justify-between gap-3">
        {isFlagId(destination.slug) ? (
          <WavingFlag className="size-16" id={destination.slug} />
        ) : null}
        <StatusBadge state={destinationState(destination)} />
      </div>
      <h3 className="font-pixel text-px2 mt-4">{destination.country}</h3>
      {mainLanguage ? (
        <p className="mt-1 text-xl" lang={mainLanguage.code}>
          {mainLanguage.nativeName}
        </p>
      ) : null}
      <dl className="mt-6 grid grid-cols-2 gap-4 text-base">
        <div>
          <dt className="font-tiny text-tiny2">Languages</dt>
          <dd>{languages || "—"} + English</dd>
        </div>
        <div>
          <dt className="font-tiny text-tiny2">Ambulance</dt>
          <dd>{destination.emergencyNumber}</dd>
        </div>
      </dl>
      <p className="font-pixel text-px1 mt-6 flex items-center justify-between">
        From {formatPrice(lowestPriceUsd)}
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
};

const Destinations = () => (
  <>
    <section
      aria-labelledby="destinations-heading"
      className="bg-peach scroll-mt-4"
      id="destinations"
    >
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2
          className="font-pixel text-px1 sm:text-px2"
          id="destinations-heading"
        >
          Where are you headed?
        </h2>
        <p className="mt-4 max-w-2xl text-xl">
          Each country gets its own pair of cards, in the local language, with
          the local ambulance number.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationTile destination={destination} key={destination.slug} />
          ))}
          <div className="border-ink flex flex-col justify-center border-4 border-dashed p-6">
            <p className="font-pixel text-px1">Coming next</p>
            <ul className="mt-4 space-y-3">
              {comingNext.map((country) => (
                <li className="flex items-center gap-3" key={country.name}>
                  <WavingFlag className="size-10" id={country.flag} />
                  <span className="font-pixel text-px1">{country.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <PixelEdge color={palette.c} id="edge-destinations" />
  </>
);

const Pack = () => (
  <section
    aria-labelledby="pack-heading"
    className="mx-auto max-w-6xl px-4 py-20"
  >
    <h2 className="font-pixel text-px1 sm:text-px2" id="pack-heading">
      Two cards for every trip
    </h2>
    <div className="mt-12 grid gap-14 md:grid-cols-2">
      <div>
        <div className="px-frame bg-mint p-6 sm:p-10">
          <ChefCardPixel />
        </div>
        <h3 className="font-pixel text-px1 mt-8">The chef card</h3>
        <p className="mt-2 text-xl">
          For every meal. It tells the kitchen, in their language, exactly what
          you can&apos;t eat: peanuts, peanut oil, sauces, and anything that has
          touched them. Then it asks for a clear yes or no.
        </p>
      </div>
      <div>
        <div className="px-frame bg-butter p-6 sm:p-10">
          <EmergencyCardPixel />
        </div>
        <h3 className="font-pixel text-px1 mt-8">The emergency card</h3>
        <p className="mt-2 text-xl">
          For if something goes wrong. It tells anyone nearby that you&apos;re
          having a severe reaction, and asks them to call the local ambulance
          number.
        </p>
      </div>
    </div>
    <ul className="font-pixel text-px1 mt-14 grid gap-6 md:grid-cols-2">
      <li className="flex items-center gap-4">
        <PixelArt className="w-8 shrink-0" rows={check} />
        English on the back, so you always know what you&apos;re showing
      </li>
      <li className="flex items-center gap-4">
        <PixelArt className="w-8 shrink-0" rows={check} />
        Checked by a native speaker before we sell it
      </li>
    </ul>
  </section>
);

const Home = () => (
  <main>
    <Hero />
    <PixelEdge color={palette.u} id="edge-hero" />

    <section
      aria-labelledby="how-heading"
      className="mx-auto max-w-6xl scroll-mt-4 px-4 py-20"
      id="how-it-works"
    >
      <h2 className="font-pixel text-px1 sm:text-px2" id="how-heading">
        How a meal goes
      </h2>
      <div className="mt-12">
        <MealSteps />
      </div>
    </section>

    <Destinations />
    <Pack />

    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-4xl scroll-mt-4 px-4 py-20"
      id="faq"
    >
      <h2 className="font-pixel text-px1 sm:text-px2" id="faq-heading">
        Questions
      </h2>
      <div className="mt-10">
        <Faq items={faqItems} />
      </div>
    </section>
  </main>
);

export default Home;
