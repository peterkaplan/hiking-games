import Link from "next/link";
import { CardSurface } from "@/components/card-face";
import { ChefCardFace } from "@/components/chef-card";
import { EmergencyCardFace } from "@/components/emergency-card";
import { Faq } from "@/components/faq";
import { StatusBadge } from "@/components/status-badge";
import type { Destination } from "@/content/cards";
import {
  cardBacks,
  destinationState,
  destinations,
  findDestination,
  frontLanguages,
  sampleHeadline,
} from "@/content/cards";
import { faqItems } from "@/content/faq";
import { formatPrice, lowestPriceUsd } from "@/content/pricing";

/** Planned next, from the language priority in docs/strategy.md. */
const comingNext = ["China", "Mexico", "Italy"] as const;

const steps = [
  {
    title: "Pick where you're going",
    body: "Each country gets its own pair of cards, in the local language and with the right emergency number.",
  },
  {
    title: "Download or get them printed",
    body: "Print at home and keep the images on your phone, or have laminated cards posted to you.",
  },
  {
    title: "Show the card",
    body: "Hand the chef card over when you order and ask for it to go to the kitchen. Keep the emergency card with your epinephrine.",
  },
] as const;

const reasons = [
  {
    title: "Made for peanut",
    body: "Not a generic allergy list. The cards cover peanut oil, sauces and cross-contact from shared woks, pans and mortars.",
  },
  {
    title: "Checked by native speakers",
    body: "A translation app can get the most important sentence wrong. We don't sell a card until a native speaker has checked it.",
  },
  {
    title: "English on the back",
    body: "You can read what you're handing over, and staff who read English get the message too.",
  },
] as const;

const buttonPrimary =
  "inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-stone-800";
const buttonSecondary =
  "inline-flex items-center justify-center rounded-full border border-ink px-6 py-3.5 font-semibold transition hover:bg-white";

/** The Thai chef card, front on top of the English back. */
const HeroCards = () => {
  const thailand = findDestination("thailand");
  const front = thailand?.chefCard.front;
  if (!(thailand && front)) {
    return null;
  }
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative pr-4 sm:pr-8">
        {/* The English back, peeking out behind the front. */}
        <div
          aria-hidden="true"
          className="bg-peanut-50 absolute -top-3 right-0 bottom-3 left-10 rotate-[4deg] rounded-2xl border border-stone-200 shadow-lg"
        />
        <CardSurface
          className="relative -rotate-1 shadow-xl"
          lang={front.language.code}
        >
          <ChefCardFace text={front.text} />
        </CardSurface>
      </div>
      <p className="mt-12 text-center text-sm text-stone-600">
        Chef card for Thailand: Thai on the front, English on the back
      </p>
    </div>
  );
};

const DestinationTile = ({ destination }: { destination: Destination }) => {
  const sample = sampleHeadline(destination);
  const languages = frontLanguages(destination)
    .map((language) => language.name)
    .join(", ");
  return (
    <Link
      className="group border-peanut-200 flex min-w-0 flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      href={`/${destination.slug}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-bold">
          {destination.country}
        </h3>
        <StatusBadge state={destinationState(destination)} />
      </div>
      {sample ? (
        <p
          className="mt-3 truncate text-lg text-stone-600"
          lang={sample.language.code}
        >
          {sample.text}
        </p>
      ) : null}
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-stone-500">Languages</dt>
          <dd className="font-medium">{languages || "—"} + English</dd>
        </div>
        <div>
          <dt className="text-stone-500">Ambulance</dt>
          <dd className="font-medium">{destination.emergencyNumber}</dd>
        </div>
      </dl>
      <p className="mt-6 font-semibold">
        From {formatPrice(lowestPriceUsd)}{" "}
        <span
          aria-hidden="true"
          className="inline-block transition group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
};

const Home = () => {
  const japanEmergency = findDestination("japan")?.emergencyCard.front;
  const thailand = findDestination("thailand");

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 overflow-x-clip px-4 pt-12 pb-16 lg:grid-cols-2 lg:pt-20 lg:pb-24">
        <div>
          <p className="text-peanut-700 text-sm font-semibold tracking-widest uppercase">
            Peanut allergy cards for travel
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Tell the kitchen about your peanut allergy, in their language.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-700">
            Two cards for every country you visit: a chef card to hand to
            restaurant staff, and an emergency card in case you react. The local
            language is on the front, English on the back.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className={buttonPrimary} href="#destinations">
              Choose your destination
            </Link>
            <Link className={buttonSecondary} href="/thailand">
              See the Thailand cards
            </Link>
          </div>
        </div>
        <HeroCards />
      </section>

      {/* Destinations */}
      <section
        aria-labelledby="destinations-heading"
        className="bg-peanut-100/60 scroll-mt-8 py-20"
        id="destinations"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            className="font-display text-4xl font-bold tracking-tight"
            id="destinations-heading"
          >
            Where are you going?
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-700">
            Each destination comes with both cards and the local ambulance
            number.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationTile
                destination={destination}
                key={destination.slug}
              />
            ))}
            <div className="border-peanut-200 flex flex-col justify-center rounded-2xl border-2 border-dashed p-6">
              <p className="font-display text-xl font-bold">Coming next</p>
              <p className="mt-2 text-stone-700">{comingNext.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-heading"
        className="mx-auto max-w-6xl scroll-mt-8 px-4 py-20"
        id="how-it-works"
      >
        <h2
          className="font-display text-4xl font-bold tracking-tight"
          id="how-heading"
        >
          How it works
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="bg-ink font-display flex size-10 items-center justify-center rounded-full font-bold text-white">
                {index + 1}
              </span>
              <h3 className="font-display mt-4 text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-stone-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* The two cards */}
      <section
        aria-labelledby="two-cards-heading"
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2
          className="font-display text-4xl font-bold tracking-tight"
          id="two-cards-heading"
        >
          Two cards, two jobs
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold">The chef card</h3>
            <p className="mt-2 text-stone-700">
              For ordering. It tells the kitchen the allergy can kill, lists
              peanut oil and sauces, asks for clean pans and fresh oil, and asks
              whether they can make 100% safe food, with an easy way to say no.
            </p>
            {thailand ? (
              <CardSurface className="mt-6" lang="en">
                <ChefCardFace text={cardBacks(thailand).chef} />
              </CardSurface>
            ) : null}
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">
              The emergency card
            </h3>
            <p className="mt-2 text-stone-700">
              For a reaction. It says you&apos;re having anaphylaxis and asks
              whoever reads it to call the local ambulance number, so anyone
              nearby can act fast.
            </p>
            {japanEmergency ? (
              <figure className="mt-6">
                <CardSurface lang={japanEmergency.language.code}>
                  <EmergencyCardFace text={japanEmergency.text} />
                </CardSurface>
                <figcaption className="mt-2 text-sm text-stone-500">
                  Emergency card for Japan, front
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      {/* Why */}
      <section
        aria-labelledby="why-heading"
        className="bg-ink py-20 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            className="font-display text-4xl font-bold tracking-tight"
            id="why-heading"
          >
            Why these cards
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {reasons.map((reason) => (
              <div
                className="border-peanut-400 border-t-2 pt-5"
                key={reason.title}
              >
                <h3 className="font-display text-xl font-bold">
                  {reason.title}
                </h3>
                <p className="mt-2 text-stone-300">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl scroll-mt-8 px-4 py-20"
        id="faq"
      >
        <h2
          className="font-display text-4xl font-bold tracking-tight"
          id="faq-heading"
        >
          Questions
        </h2>
        <div className="mt-8">
          <Faq items={faqItems} />
        </div>
      </section>
    </main>
  );
};

export default Home;
