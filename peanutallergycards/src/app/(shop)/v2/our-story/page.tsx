import type { Metadata } from "next";
import Link from "next/link";
import {
  ChefFrontCard,
  EmergencyFrontCard,
} from "@/components/shop/product-shots";
import { JuliasCard } from "@/components/shop/sections";
import { findDestination } from "@/content/cards";
import { LAUNCH_PREVIEW } from "@/content/launch-preview";
import { story } from "@/content/story";

export const metadata: Metadata = {
  title: "Our story: made by Julia",
  description: `${story.heading} ${story.mission}`,
};

/*
 * Structure from the reference stores' story pages: a split opener in two
 * colours, edge to edge (Great Jones), a journey in steps (Allbirds), a signed
 * note from the founder on a paper card (Ghia), named principles (Allbirds'
 * "Better Things / Better Ways", Graza's numbered list), and a way back to
 * the products (all of them).
 */

/** The chef card and the emergency card from the trip, laid out on the table. Decorative. */
const HoneymoonCards = () => {
  const thailand = findDestination("thailand");
  if (!(thailand?.chefCard.front && thailand.emergencyCard.front)) {
    return null;
  }
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[250px] w-full max-w-[560px] [--shot-zoom:0.34] sm:h-[400px] sm:[--shot-zoom:0.56] lg:h-[460px] lg:[--shot-zoom:0.62]"
    >
      <div className="absolute top-0 left-0">
        <ChefFrontCard
          className="w-[760px] -rotate-6 [zoom:var(--shot-zoom)]"
          destination={thailand}
        />
      </div>
      <div className="absolute right-0 bottom-0">
        <EmergencyFrontCard
          className="w-[620px] rotate-3 [zoom:var(--shot-zoom)]"
          destination={thailand}
        />
      </div>
    </div>
  );
};

/** A split opener, edge to edge: words on one colour, the cards on another. */
const Hero = () => (
  <section className="grid lg:grid-cols-2">
    <div className="bg-shop-highlight text-shop-on-highlight flex flex-col justify-center px-4 py-16 sm:px-10 lg:px-14 lg:py-24">
      <p className="font-mono text-xs tracking-[0.18em] uppercase">
        {story.eyebrow}
      </p>
      <h1 className="mt-5 font-serif text-5xl leading-none tracking-tight sm:text-6xl xl:text-7xl">
        {story.heading}
      </h1>
      <p className="mt-6 max-w-xl text-xl">{story.mission}</p>
    </div>
    <div className="bg-shop-band flex items-center overflow-hidden px-4 py-12 sm:px-10 lg:py-16">
      <HoneymoonCards />
    </div>
  </section>
);

const Journey = () => (
  <section
    aria-labelledby="journey-heading"
    className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-28"
  >
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
      <h2
        className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:sticky lg:top-28 lg:self-start"
        id="journey-heading"
      >
        How it started
      </h2>
      <ol className="border-shop-ink border-b-2">
        {story.journey.map((step, index) => (
          <li
            className="border-shop-ink grid gap-x-8 gap-y-2 border-t-2 py-8 sm:grid-cols-[5.5rem_1fr]"
            key={step.title}
          >
            <p
              aria-hidden="true"
              className="text-shop-cta font-serif text-6xl leading-none"
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="font-serif text-3xl leading-tight">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-xl">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/** A signed note in Julia's voice, on a paper card (as on Ghia's page). */
const Note = () => (
  <section
    aria-labelledby="note-heading"
    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6"
  >
    <div className="grid items-center gap-14 lg:grid-cols-2">
      <div className="relative">
        {story.note.approvedByJulia || LAUNCH_PREVIEW ? null : (
          <p className="bg-shop-ink text-shop-bg absolute -top-4 right-4 z-10 rounded-full px-3 py-1 font-mono text-xs uppercase">
            Draft: awaiting Julia&apos;s OK
          </p>
        )}
        <article className="bg-shop-highlight text-shop-on-highlight -rotate-1 rounded-md p-8 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] sm:p-12">
          <h2 className="font-serif text-3xl" id="note-heading">
            {story.note.greeting}
          </h2>
          <div className="mt-5 space-y-4 text-lg">
            {story.note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-3xl">{story.note.signOff}</p>
          <p className="mt-1 font-mono text-xs uppercase">{story.note.role}</p>
        </article>
      </div>
      <JuliasCard />
    </div>
  </section>
);

const principleTones = [
  "bg-shop-band text-shop-on-band",
  "bg-shop-highlight text-shop-on-highlight",
  "bg-shop-panel border-shop-ink border-2",
];

const Principles = () => (
  <section
    aria-labelledby="principles-heading"
    className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:pt-32"
  >
    <h2
      className="text-center font-serif text-4xl tracking-tight sm:text-6xl"
      id="principles-heading"
    >
      What we believe
    </h2>
    <ol className="mt-12 grid gap-6 md:grid-cols-3">
      {story.principles.map((principle, index) => (
        <li
          className={`flex min-h-80 flex-col rounded-[32px] p-8 ${principleTones.at(index % principleTones.length)}`}
          key={principle.title}
        >
          <p aria-hidden="true" className="font-serif text-6xl leading-none">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-auto pt-10 font-serif text-3xl leading-tight">
            {principle.title}
          </h3>
          <p className="mt-3 text-lg">{principle.body}</p>
        </li>
      ))}
    </ol>
  </section>
);

const BackToShop = () => (
  <section className="bg-shop-band text-shop-on-band mx-4 mt-24 rounded-[32px] sm:mx-6">
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
        The cards from the honeymoon, ready for your trip.
      </h2>
      <Link
        className="bg-shop-bg text-shop-ink hover:bg-shop-panel focus-visible:outline-shop-on-band mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold focus-visible:outline-3 focus-visible:outline-offset-4"
        href="/v2#destinations"
      >
        Shop by country <span aria-hidden="true">→</span>
      </Link>
    </div>
  </section>
);

const OurStoryPage = () => (
  <main>
    <Hero />
    <Journey />
    <Note />
    <Principles />
    <BackToShop />
  </main>
);

export default OurStoryPage;
